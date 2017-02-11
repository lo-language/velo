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
        ctx.alias().map(alias => alias.accept(this)),
        ctx.definition().map(def => def.accept(this))
    );
};

__.prototype.visitReferences = function(ctx) {

    var refs = [];

    var offset = 0;

    while (ctx.ID(offset)) {

        refs.push({
            id: ctx.ID(offset).getText(),
            ref: ctx.MODREF(offset).getText()
        });

        offset++;
    }

    return refs;
};

__.prototype.visitStatementList = function(ctx) {

    var subList = ctx.statementList();

    return new Lo.stmtList(
        ctx.statement().accept(this),
        subList ? subList.accept(this) : null
    );
};



// statements


__.prototype.visitDefStmt = function(ctx) {

    return ctx.definition().accept(this);
};

__.prototype.visitDefinition = function(ctx) {

    return new Lo.constant(
        ctx.ID().getText(),
        ctx.expr().accept(this)
    );
};


__.prototype.visitExternalRef = function(ctx) {

    return new Lo.identifier(
        ctx.ID().getText(),
        ctx.modref().getText()
    );
};

__.prototype.visitLiteralExpr = function(ctx) {

    return ctx.literal().accept(this);
};

__.prototype.visitAssignment = function(ctx) {

    return new Lo.assignment(
        ctx.assignment_op().getText(),
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitIncDec = function(ctx) {

    return new Lo.incrDecr(
        ctx.op.text == '++' ? 'increment' : 'decrement',
        ctx.expr().accept(this)
    );
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
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
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

__.prototype.visitExprList = function(ctx) {

    var _this = this;

    return ctx.expr().map(function (item) {
        return item.accept(_this);
    });
};

__.prototype.visitId = function(ctx) {

    return new Lo.identifier(ctx.ID().getText());
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
    var handlers = ctx.handlers().accept(this);

    return new Lo.requestStmt(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        handlers.subsequent,
        handlers.contingency,
        true
    );
};

__.prototype.visitAsyncRequest = function(ctx) {

    var args = ctx.exprList();
    var handlers = ctx.handlers().accept(this);

    return new Lo.requestStmt(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        handlers.subsequent,
        handlers.contingency,
        false
    );
};

__.prototype.visitSink = function (ctx) {

    return ctx.procedure().accept(this);
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

    return ctx.sink().accept(this);
};


__.prototype.visitFailHandler = function(ctx) {

    return ctx.sink().accept(this);
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

    return new Lo.literal('boolean', ctx.BOOL().getText() == 'true');
};

__.prototype.visitNumber = function(ctx) {

    return new Lo.literal('number', ctx.NUMBER().getText());
};

__.prototype.visitString = function(ctx) {

    return new Lo.literal('string', ctx.STRING().getText());
};

__.prototype.visitDynastring = function(ctx) {

    return new Lo.interpolation(
        ctx.INTER_BEGIN().getText(),
        ctx.interpolated().accept(this),
        ctx.INTER_END().getText()
    );
};

__.prototype.visitInterpolated = function(ctx) {

    var mid = ctx.INTER_MID();

    if (mid) {

        return new Lo.dynaString(
            ctx.expr().accept(this),
            mid.getText(),
            ctx.interpolated().accept(this)
        );
    }

    return ctx.expr().accept(this);
};

__.prototype.visitService = function(ctx) {

    var proc = ctx.procedure().accept(this);

    proc.isService = true;

    return proc;
};

__.prototype.visitProcedure = function(ctx) {

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

    if (ctx.exprList()) {

        return new Lo.setLiteral(ctx.exprList().accept(this));
    }

    if (ctx.pairList()) {

        return new Lo.mapLiteral(ctx.pairList().accept(this));
    }

    if (ctx.colon) {

        return new Lo.mapLiteral([]);
    }

    return new Lo.setLiteral([]);
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

    return new Lo.binaryOpExpr(
        'concat',
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


module.exports = __;