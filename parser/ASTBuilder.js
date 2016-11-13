/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Created by spurcell on 1/10/16.
 */

const antlr4 = require('antlr4');
const Lexer = require('./exaLexer');
const Parser = require('./exaParser');
const BaseVisitor = require('./exaVisitor').exaVisitor;

const Literal = require('../constructs/Literal');
const Identifier = require('../constructs/Identifier');
const Constant = require('../constructs/Constant');

const Array = require('../constructs/Array');
const Record = require('../constructs/Record');
const Set = require('../constructs/Set');
const MapLiteral = require('../constructs/MapLiteral');
const Pair = require('../constructs/Pair');
const Field = require('../constructs/Field');

const Assignment = require('../constructs/Assignment');
const Destructure = require('../constructs/Destructure');

const IncrDecr = require('../constructs/IncrDecr');
const Conditional = require('../constructs/Conditional');
const BinaryOpExpr = require('../constructs/BinaryOpExpr');
const UnaryOpExpr = require('../constructs/UnaryOpExpr');
const While = require('../constructs/While');
const Scan = require('../constructs/Scan');
const MapExpr = require('../constructs/MapExpr');

const Response = require('../constructs/Response');
const Procedure = require('../constructs/Procedure');
const Module = require('../constructs/Module');
const StmtList = require('../constructs/StmtList');
const Subscript = require('../constructs/Subscript');
const Membership = require('../constructs/Membership');
const Slice = require('../constructs/Slice');
const Select = require('../constructs/Select');
const DynaString = require('../constructs/DynaString');
const Interpolation = require('../constructs/Interpolation');
const RequestExpr = require('../constructs/RequestExpr');
const RequestStmt = require('../constructs/RequestStmt');
const EventDef = require('../constructs/EventDef');


var __ = function () {
    BaseVisitor.call(this);
};

__.prototype = Object.create(BaseVisitor.prototype);
__.prototype.constructor = __;

////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.parse = function (input) {

    var chars = new antlr4.InputStream(input);
    var lexer = new Lexer.exaLexer(chars);
    var tokens  = new antlr4.CommonTokenStream(lexer);

    var parser = new Parser.exaParser(tokens);
    parser.buildParseTrees = true;

    var tree = parser.module();
    return this.visit(tree);
};

////////////////////////////////////////////////////////////////////////////////////////////////////


// Visit a parse tree produced by exaParser#module.
__.prototype.visitModule = function(ctx) {

    return new Module(
        ctx.references() ? ctx.references().accept(this) : null, // todo make this [] not null
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

    return new StmtList(
        ctx.statement().accept(this),
        subList ? subList.accept(this) : null
    );
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// statements


__.prototype.visitDefStmt = function(ctx) {

    return ctx.definition().accept(this);
};

__.prototype.visitConstant = function(ctx) {

    return new Constant(
        ctx.ID().getText(),
        ctx.literal().accept(this)
    );
};

__.prototype.visitAssignment = function(ctx) {

    return new Assignment(
        ctx.assignment_op().getText(),
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitIncDec = function(ctx) {

    return new IncrDecr(
        ctx.op.text == '++' ? 'increment' : 'decrement',
        ctx.expr().accept(this)
    );
};

// conditional statement

__.prototype.visitCondStmt = function(ctx) {

    return ctx.conditional().accept(this);
};

__.prototype.visitIfOnly = function(ctx) {

    return new Conditional(
        ctx.expr().accept(this),
        ctx.block().accept(this)
    );
};

__.prototype.visitIfElse = function(ctx) {

    return new Conditional(
        ctx.expr().accept(this),
        ctx.block(0).accept(this),
        ctx.block(1).accept(this)
    );
};

__.prototype.visitNestedIf = function(ctx) {

    return new Conditional(
        ctx.expr().accept(this),
        ctx.block().accept(this),
        ctx.conditional().accept(this)
    );
};

__.prototype.visitIteration = function(ctx) {

    return new While(
        ctx.expr().accept(this),
        ctx.block().accept(this));
};

__.prototype.visitScan = function(ctx) {

    return new Scan(
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitMap = function(ctx) {

    return new MapExpr(
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

// messages

__.prototype.visitResponse = function(ctx) {

    return new Response(
        ctx.channel.text,
        ctx.exprList() ? ctx.exprList().accept(this) : []
    );
};

__.prototype.visitDestructure = function(ctx) {

    return new Destructure(
        ctx.ID().map(token => token.getText())
    );
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// basic expressions


__.prototype.visitMulDiv = function(ctx) {

    return new BinaryOpExpr(
        ctx.op.text,
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this));
};

__.prototype.visitAddSub = function(ctx) {

    return new BinaryOpExpr(
        ctx.op.text,
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this));
};

__.prototype.visitCompare = function(ctx) {

    return new BinaryOpExpr(
        ctx.op.text,
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this));
};

__.prototype.visitLogical = function(ctx) {

    return new BinaryOpExpr(
        ctx.op.text,
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this));
};

////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.visitWrap = function(ctx) {

    return ctx.expr().accept(this);
};

__.prototype.visitLitExpr = function(ctx) {

    return ctx.literal().accept(this);
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

    return new Identifier(ctx.ID().getText());
};

__.prototype.visitExternalId = function(ctx) {

    return new Identifier(
        ctx.ID(1).getText(),
        ctx.ID(0).getText()
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// request expressions

__.prototype.visitSyncCall = function(ctx) {

    var args = ctx.exprList();

    return new RequestExpr(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        false
    );
};

__.prototype.visitAsyncCall = function(ctx) {

    var args = ctx.exprList();

    return new RequestExpr(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        true
    );
};

// request statements

__.prototype.visitSyncRequest = function(ctx) {

    var args = ctx.exprList();
    var handlers = ctx.handlers().accept(this);

    return new RequestStmt(
        ctx.expr().accept(this),
        args ? args.accept(this) : [],
        handlers.subsequent,
        handlers.contingency,
        false
    );
};

__.prototype.visitAsyncRequest = function(ctx) {

    var args = ctx.exprList();
    var handlers = ctx.handlers().accept(this);

    return new RequestStmt(
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

    return new EventDef(ctx.paramList() ? ctx.paramList().accept(this) : []);
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


////////////////////////////////////////////////////////////////////////////////////////////////////
// literals

__.prototype.visitNil = function(ctx) {
};

__.prototype.visitBool = function(ctx) {

    return new Literal('boolean', ctx.BOOL().getText() == 'true');
};

__.prototype.visitNumber = function(ctx) {

    return new Literal('number', ctx.NUMBER().getText());
};

__.prototype.visitString = function(ctx) {

    return new Literal('string', ctx.STRING().getText());
};

__.prototype.visitDynastring = function(ctx) {

    return new Interpolation(
        ctx.INTER_BEGIN().getText(),
        ctx.interpolated().accept(this),
        ctx.INTER_END().getText()
    );
};

__.prototype.visitInterpolated = function(ctx) {

    var mid = ctx.INTER_MID();

    if (mid) {

        return new DynaString(
            ctx.expr().accept(this),
            mid.getText(),
            ctx.interpolated().accept(this)
        );
    }

    return ctx.expr().accept(this);
};

__.prototype.visitService = function(ctx) {

    return ctx.procedure().accept(this);
};

__.prototype.visitProcedure = function(ctx) {

    return new Procedure(
        ctx.paramList() ? ctx.paramList().accept(this) : [],
        ctx.block().accept(this)
    );
};

// collections

__.prototype.visitArray = function(ctx) {

    if (ctx.exprList()) {

        return new Array(ctx.exprList().accept(this));
    }

    return new Array([]);
};

__.prototype.visitRecord = function(ctx) {

    return new Record(ctx.fieldList().accept(this));
};

__.prototype.visitSet = function (ctx) {

    if (ctx.exprList()) {

        return new Set(ctx.exprList().accept(this));
    }

    if (ctx.pairList()) {

        return new MapLiteral(ctx.pairList().accept(this));
    }

    if (ctx.colon) {

        return new MapLiteral([]);
    }

    return new Set([]);
};


__.prototype.visitPairList = function(ctx) {

    var pairs = [];

    var offset = 0;

    while (ctx.expr(offset)) {

        pairs.push(new Pair(
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

        fields.push(new Field(
            ctx.ID(offset).getText(),
            ctx.expr(offset).accept(this)
        ));

        offset++;
    }

    return fields;
};

// __.prototype.visitPair = function(ctx) {
//
//     return {
//         type: 'dyad',
//         key: ctx.expr(0).accept(this),
//         value: ctx.expr(1).accept(this)
//     };
// };

////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.visitBlock = function(ctx) {

    var stmtList = ctx.statementList();

    if (stmtList) {
        return stmtList.accept(this);
    }

    return new StmtList(null, null);
};

////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.visitCardinality = function(ctx) {

    return new UnaryOpExpr(
        'cardinality',
        ctx.expr().accept(this)
    );
};

__.prototype.visitConcat = function(ctx) {

    return new BinaryOpExpr(
        'concat',
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitMembership = function(ctx) {

    return new Membership(
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitSubscript = function(ctx) {

    return new Subscript(
        ctx.expr(0).accept(this),
        ctx.expr(1).accept(this)
    );
};

__.prototype.visitSelect = function(ctx) {

    return new Select(
        ctx.expr().accept(this),
        ctx.ID().getText()
    );
};

__.prototype.visitSlice = function(ctx) {

    var start = ctx.expr(1);
    var end = ctx.expr(2);

    return new Slice(
        ctx.expr(0).accept(this),
        start ? start.accept(this) : null,
        end ? end.accept(this) : null
    );
};


module.exports = __;