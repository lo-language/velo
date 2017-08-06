/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

const antlr4 = require('antlr4');
const Lexer = require('./loLexer');
const Parser = require('./loParser');
const BaseVisitor = require('./loVisitor').loVisitor;
const Lo = require('../constructs');


var __ = function () {
    BaseVisitor.call(this);
};

__.prototype = Object.create(BaseVisitor.prototype);
__.prototype.constructor = __;



__.prototype.parse = function (input) {

    var chars = new antlr4.InputStream(input);
    var lexer = new Lexer.loLexer(chars);
    var tokens  = new antlr4.CommonTokenStream(lexer);

    var parser = new Parser.loParser(tokens);
    parser.buildParseTrees = true;

    var tree = parser.module();
    return this.visit(tree);
};




// Visit a parse tree produced by exaParser#module.

__.prototype.visitModule = function(ctx) {

    return new Lo.module(
        ctx.definition().map(def => def.accept(this)),
        ctx.dependency().map(def => def.accept(this))
    );
};



__.prototype.visitStatementList = function(ctx) {

    var subList = ctx.statementList();

    return new Lo.stmtList(
        ctx.statement().accept(this),
        subList ? subList.accept(this) : null
    );
};



__.prototype.visitDependency = function(ctx) {

    var moduleId = ctx.ID().getText();

    return new Lo.constant(
        moduleId,
        ctx.locator() ? ctx.locator().accept(this) : new Lo.moduleRef(null, moduleId)
    );
};

// statements


__.prototype.visitDefStmt = function(ctx) {

    return ctx.definition().accept(this);
};

__.prototype.visitDefinition = function(ctx) {

    // if (ctx.locator()) {
    //     return new Lo.constant(
    //         ctx.ID().getText(),
    //         ctx.locator().accept(this)
    //     );
    // }

    return new Lo.constant(
        ctx.ID().getText(),
        ctx.expr().accept(this)
    );
};

__.prototype.visitLocator = function(ctx) {

    var ids = ctx.ID().map(id => id.getText());

    return new Lo.moduleRef(
        ids[1] ? ids[0] : null,
        ids[1] ? ids[1] : ids[0]
    );
};

__.prototype.visitLiteralExpr = function(ctx) {

    return ctx.literal().accept(this);
};

__.prototype.visitAssignment = function(ctx) {

    const left = ctx.expr(0).accept(this);
    var right = ctx.expr(1).accept(this);

    // desugar compound assignment operators

    switch (ctx.op.text) {

        case '+=':
            right = new Lo.binaryOpExpr('+', left, right);
            break;

        case '-=':
            right = new Lo.binaryOpExpr('-', left, right);
            break;

        case '*=':
            right = new Lo.binaryOpExpr('*', left, right);
            break;

        case '/=':
            right = new Lo.binaryOpExpr('/', left, right);
            break;

        case '%=':
            right = new Lo.binaryOpExpr('%', left, right);
            break;
    }

    return new Lo.assign(left, right);
};

__.prototype.visitIncDec = function(ctx) {

    // desugar increment/decrement operators

    const left = ctx.expr().accept(this);
    const right = new Lo.binaryOpExpr(
        ctx.op.text == '++' ? '+' : '-', left, new Lo.number('1'));

    return new Lo.assign(left, right);
};

// conditional statement

__.prototype.visitCondStmt = function(ctx) {

    return ctx.conditional().accept(this);
};

__.prototype.visitIfOnly = function(ctx) {

    return new Lo.conditional(
        ctx.expr().accept(this),
        ctx.block().accept(this)
    );
};

__.prototype.visitIfElse = function(ctx) {

    return new Lo.conditional(
        ctx.expr().accept(this),
        ctx.block(0).accept(this),
        ctx.block(1).accept(this)
    );
};

__.prototype.visitNestedIf = function(ctx) {

    return new Lo.conditional(
        ctx.expr().accept(this),
        ctx.block().accept(this),
        ctx.conditional().accept(this)
    );
};

__.prototype.visitIteration = function(ctx) {

    return new Lo.while(
        ctx.expr().accept(this),
        ctx.block().accept(this));
};

__.prototype.visitScan = function(ctx) {

    return new Lo.scan(
        ctx.expr().accept(this),
        ctx.proc().accept(this)
    );
};

__.prototype.visitMap = function(ctx) {

    return new Lo.mapExpr(
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

// messages

__.prototype.visitResponse = function(ctx) {

    return new Lo.response(
        ctx.channel.text,
        ctx.exprList() ? ctx.exprList().accept(this) : []
    );
};

__.prototype.visitDestructure = function(ctx) {

    return new Lo.destructure(
        ctx.ID().map(token => token.getText())
    );
};



// basic expressions


__.prototype.visitMulDiv = function(ctx) {

    return new Lo.binaryOpExpr(
        ctx.op.text,
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this));
};

__.prototype.visitAddSub = function(ctx) {

    return new Lo.binaryOpExpr(
        ctx.op.text,
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this));
};

__.prototype.visitCompare = function(ctx) {

    return new Lo.binaryOpExpr(
        ctx.op.text,
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this));
};

__.prototype.visitLogical = function(ctx) {

    return new Lo.binaryOpExpr(
        ctx.op.text,
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this));
};


__.prototype.visitWrap = function(ctx) {

    return ctx.expr().accept(this);
};

__.prototype.visitConstExpr = function(ctx) {

    return ctx.constant().accept(this);
};

__.prototype.visitValExpr = function(ctx) {

    return ctx.lvalue().accept(this);
};

__.prototype.visitCondExpr = function(ctx) {

    var exprs = ctx.expr().map(expr => expr.accept(this));

    return new Lo.condExpr(exprs[0], exprs[1], exprs[2]);
};

__.prototype.visitExprList = function(ctx) {

    var _this = this;

    return ctx.expr().map(function (item) {
        return item.accept(_this);
    });
};

__.prototype.visitId = function(ctx) {

    return new Lo.identifier(ctx.ID().getText(), ctx.ID().symbol.line);
};


// request expressions

__.prototype.visitSyncCall = function(ctx) {

    var args = ctx.exprList();

    return new Lo.requestExpr(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        true
    );
};

__.prototype.visitAsyncCall = function(ctx) {

    var args = ctx.exprList();

    return new Lo.requestExpr(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        false
    );
};

// request statements

__.prototype.visitSyncRequest = function(ctx) {

    var args = ctx.exprList();

    return new Lo.requestStmt(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        null,
        null,
        true
    );
};

__.prototype.visitInvocation = function(ctx) {

    var args = ctx.exprList();
    var handlers = ctx.handlers() ? ctx.handlers().accept(this) : null;

    return new Lo.requestStmt(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        handlers ? handlers.subsequent : null,
        handlers ? handlers.contingency : null,
        ctx.ASYNC() ? false : true
    );
};

__.prototype.visitSink = function (ctx) {

    return ctx.proc().accept(this);
};

__.prototype.visitEvent = function (ctx) {

    return new Lo.eventDef(ctx.paramList() ? ctx.paramList().accept(this) : []);
};

__.prototype.visitHandler = function (ctx) {

    return ctx.sink().accept(this);
};

__.prototype.visitHandlers = function (ctx) {

    var res = {};

    if (ctx.replyHandler()) {
        res.subsequent = ctx.replyHandler().accept(this);
    }

    if (ctx.failHandler()) {
        res.contingency = ctx.failHandler().accept(this);
    }

    return res;
};

__.prototype.visitReplyHandler = function(ctx) {

    // todo mark the proc as a replyhandler
    return ctx.proc().accept(this);
};


__.prototype.visitFailHandler = function(ctx) {

    // todo mark the proc as a failhandler
    return ctx.proc().accept(this);
};


__.prototype.visitParamList = function(ctx) {

    return ctx.ID().map(function (item) {
        return item.getText();
    });
};



// literals

__.prototype.visitNil = function(ctx) {
};

__.prototype.visitBool = function(ctx) {

    return new Lo.boolean(ctx.BOOL().getText() == 'true');
};

__.prototype.visitNumber = function(ctx) {

    return new Lo.number(ctx.NUMBER().getText());
};

__.prototype.visitString = function(ctx) {

    return new Lo.string(ctx.STRING().getText());
};

__.prototype.visitInterpolated = function(ctx) {

    var mid = ctx.INTER_MID();

    if (mid) {

        return new Lo.concat(
            new Lo.concat(
                new Lo.coercion(ctx.expr().accept(this)),
                new Lo.string(mid.getText())),
            ctx.interpolated().accept(this)
        );
    }

    return new Lo.coercion(ctx.expr().accept(this));
};

__.prototype.visitStringify = function(ctx) {

    return new Lo.coercion(ctx.expr().accept(this));
};

__.prototype.visitMixedString = function(ctx) {

    return new Lo.concat(
        new Lo.concat(
            new Lo.string(ctx.INTER_BEGIN().getText()),
            new Lo.coercion(ctx.interpolated().accept(this))),
        new Lo.string(ctx.INTER_END().getText())
    );
};

__.prototype.visitService = function(ctx) {

    var proc = ctx.proc().accept(this);

    proc.isService = true;

    return proc;
};

__.prototype.visitProc = function(ctx) {

    return new Lo.procedure(
        ctx.paramList() ? ctx.paramList().accept(this) : [],
        ctx.block().accept(this)
    );
};

// collections

__.prototype.visitArray = function(ctx) {

    if (ctx.exprList()) {

        return new Lo.array(ctx.exprList().accept(this));
    }

    return new Lo.array([]);
};

__.prototype.visitRecord = function(ctx) {

    if (ctx.fieldList()) {
        return new Lo.record(ctx.fieldList().accept(this));
    }

    return new Lo.record(ctx.exprList().accept(this));
};

__.prototype.visitSet = function (ctx) {

    if (ctx.memberList()) {

        return new Lo.setLiteral(ctx.memberList().accept(this));
    }

    if (ctx.pairList()) {

        return new Lo.mapLiteral(ctx.pairList().accept(this));
    }

    if (ctx.colon) {

        return new Lo.mapLiteral([]);
    }

    return new Lo.setLiteral([]);
};


__.prototype.visitMemberList = function(ctx) {

    var _this = this;

    return ctx.expr().map(function (item) {
        return item.accept(_this);
    });
};


__.prototype.visitPairList = function(ctx) {

    var pairs = [];

    var offset = 0;

    while (ctx.expr(offset)) {

        pairs.push(new Lo.pair(
            ctx.expr(offset).accept(this),
            ctx.expr(offset + 1).accept(this)
        ));

        offset += 2;
    }

    return pairs;
};

__.prototype.visitFieldList = function(ctx) {

    var fields = [];

    var offset = 0;

    while (ctx.ID(offset)) {

        fields.push(new Lo.field(
            ctx.ID(offset).getText(),
            ctx.expr(offset).accept(this)
        ));

        offset++;
    }

    return fields;
};



__.prototype.visitBlock = function(ctx) {

    var stmtList = ctx.statementList();

    if (stmtList) {
        return stmtList.accept(this);
    }

    return new Lo.stmtList(null, null);
};



__.prototype.visitCardinality = function(ctx) {

    return new Lo.unaryOpExpr(
        'cardinality',
        ctx.expr().accept(this)
    );
};

__.prototype.visitConcat = function(ctx) {

    return new Lo.concat(
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitPush = function(ctx) {

    return new Lo.arrayPush(
        ctx.op.text == '<+' ? 'push-back' : 'push-front',
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};


__.prototype.visitMembership = function(ctx) {

    return new Lo.membership(
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitSubscript = function(ctx) {

    return new Lo.subscript(
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitSelect = function(ctx) {

    return new Lo.select(
        ctx.expr().accept(this),
        ctx.ID().getText()
    );
};

__.prototype.visitSlice = function(ctx) {

    var start = ctx.expr(1);
    var end = ctx.expr(2);

    return new Lo.slice(
        ctx.expr(0).accept(this),
        start ? start.accept(this) : null,
        end ? end.accept(this) : null
    );
};

__.prototype.visitExistence = function(ctx) {

    return new Lo.existence(
        ctx.expr().accept(this),
        ctx.op.text == 'undefined'
    );
};


module.exports = __;