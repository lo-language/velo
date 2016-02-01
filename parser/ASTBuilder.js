/**
 * Created by spurcell on 1/10/16.
 */

const antlr4 = require('antlr4');
const Lexer = require('./exaLexer');
const Parser = require('./exaParser');
const BaseVisitor = require('./exaVisitor').exaVisitor;


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

    return {type: 'module', service: {type: 'procedure', body: this.visit(ctx.statement_list())}};
};


// Visit a parse tree produced by exaParser#statement_list.
__.prototype.visitStatement_list = function(ctx) {

    var subList = ctx.statement_list();

    return {type: 'stmt_list', head: this.visit(ctx.statement()), tail: subList ? this.visit(subList) : null};
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// statements


// Visit a parse tree produced by exaParser#receive.
__.prototype.visitReceive = function(ctx) {

    return {
        type: 'receive',
        names: ctx.ID().map(function (token) {return token.getText()})
    };
};


// Visit a parse tree produced by exaParser#assignment.
__.prototype.visitAssignment = function(ctx) {

    return {
        type: 'assign',
        op: ctx.assignment_op().getText(),
        left: this.visit(ctx.expr(0)),
        right: this.visit(ctx.expr(1))
    };
};


__.prototype.visitIncDec = function(ctx) {

    return {
        type: ctx.op.text == '++' ? 'increment' : 'decrement',
        operand: this.visit(ctx.expr())
    };
};


__.prototype.visitCondStmt = function(ctx) {

    return this.visit(ctx.conditional());
};


__.prototype.visitIfOnly = function(ctx) {

    return {
        type: 'conditional',
        predicate: this.visit(ctx.expr()),
        consequent: this.visit(ctx.block())
    };
};


__.prototype.visitIfElse = function(ctx) {

    return {
        type: 'conditional',
        predicate: this.visit(ctx.expr()),
        consequent: this.visit(ctx.block(0)),
        otherwise: this.visit(ctx.block(1))
    };
};


__.prototype.visitNestedIf = function(ctx) {

    return {
        type: 'conditional',
        predicate: this.visit(ctx.expr()),
        consequent: this.visit(ctx.block()),
        otherwise: this.visit(ctx.conditional())
    };
};


__.prototype.visitExprStmt = function(ctx) {

    return {
        type: 'application_stmt',   // todo should arguably be expr_stmt
        application: this.visit(ctx.expr())
    };
};


__.prototype.visitResponse = function(ctx) {

    return {
        type: 'response',
        channel: ctx.channel.text,
        args: this.visit(ctx.exprList())
    };
};


__.prototype.visitDestructure = function(ctx) {

    return {
        type: 'destructure',
        members: ctx.ID().map(function (token) {return token.getText()})
    };
};


__.prototype.visitSkip = function(ctx) {

    return {type: 'skip'};
};


__.prototype.visitIteration = function(ctx) {

    return {
        type: 'iteration',
        condition: this.visit(ctx.expr()),
        statements: this.visit(ctx.block())
    };
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// expressions


__.prototype.visitMulDiv = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: this.visit(ctx.expr(0)),
        right: this.visit(ctx.expr(1))
    };
};


__.prototype.visitAddSub = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: this.visit(ctx.expr(0)),
        right: this.visit(ctx.expr(1))
    };
};


__.prototype.visitCompare = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: this.visit(ctx.expr(0)),
        right: this.visit(ctx.expr(1))
    };
};


__.prototype.visitWrap = function(ctx) {

    return this.visit(ctx.expr());
};


__.prototype.visitLitExpr = function(ctx) {

    return this.visit(ctx.literal());
};


__.prototype.visitValExpr = function(ctx) {

    return this.visit(ctx.lvalue());
};


// Visit a parse tree produced by exaParser#exprList.
__.prototype.visitExprList = function(ctx) {

    return this.visit(ctx.expr());
};


__.prototype.visitPairList = function(ctx) {

    return this.visit(ctx.pair());
};


__.prototype.visitPair = function(ctx) {

    return {
        type: 'dyad',
        key: this.visit(ctx.expr(0)),
        value: this.visit(ctx.expr(1))
    };
};


__.prototype.visitId = function(ctx) {
    return {type: "id", name: ctx.ID().getText()};
};


__.prototype.visitConstant = function(ctx) {

    return {type: 'constant', name: ctx.ID().getText(), value: this.visit(ctx.literal()) };
};


__.prototype.visitDimension = function(ctx) {

    return {type: 'range', variants: ctx.ID().map(function (token) {return token.getText()}) };
};


__.prototype.visitDynastring = function(ctx) {

    return {type: 'interpolation', left: ctx.INTER_BEGIN().getText(), middle: this.visit(ctx.interpolated()), right: ctx.INTER_END().getText()};
};


__.prototype.visitInterpolated = function(ctx) {

    var mid = ctx.INTER_MID();

    if (mid) {
        return {
            type: 'dynastring', // todo change to interpolated
            left: this.visit(ctx.expr()),
            middle: mid.getText(),
            right: this.visit(ctx.interpolated())
        };
    }

    return this.visit(ctx.expr());
};


__.prototype.visitCall = function(ctx) {

    var args = ctx.exprList();

    var res = {
        type: 'application',
        address: this.visit(ctx.expr()),
        args: args ? this.visit(args) : []
    };

    if (ctx.failHandler()) {
        res.recover = this.visit(ctx.failHandler());
    }

    return res;
};


__.prototype.visitDispatch = function(ctx) {

    var args = ctx.exprList();

    var res = {
        type: 'message',
        address: this.visit(ctx.expr()),
        args: args ? this.visit(args) : []
    };

    if (ctx.replyHandler()) {
        res.subsequent = this.visit(ctx.replyHandler());
    }

    if (ctx.failHandler()) {
        res.contingency = this.visit(ctx.failHandler());
    }

    return res;
};


__.prototype.visitReplyHandler = function(ctx) {

    return {
        type: 'handler',
        channel: 'reply',
        body: this.visit(ctx.block())
    };
};


__.prototype.visitFailHandler = function(ctx) {

    return {
        type: 'handler',
        channel: 'fail',
        body: this.visit(ctx.block())
    };
};


__.prototype.visitBlock = function(ctx) {

    return this.visit(ctx.statement_list());
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// literals


// Visit a parse tree produced by exaParser#nil.
__.prototype.visitNil = function(ctx) {
};


// Visit a parse tree produced by exaParser#bool.
__.prototype.visitBool = function(ctx) {

    // ??? might not want to return an actual bool here - number literals are kept as strings
    return {
        type: 'boolean',
        val: ctx.BOOL().getText() == 'true'};
};


// Visit a parse tree produced by exaParser#number.
__.prototype.visitNumber = function(ctx) {

    return {
        type: 'number',
        val: ctx.NUMBER().getText()};
};


// Visit a parse tree produced by exaParser#string.
__.prototype.visitString = function(ctx) {

    return {
        type: 'string',
        val: ctx.STRING().getText()
    };
};


__.prototype.visitModref = function(ctx) {

    return {
        type: 'modref',
        val: ctx.MODREF().getText()
    };
};


__.prototype.visitRecord = function(ctx) {

    return {
        type: 'record',
        fields: this.visit(ctx.field())
    };
};


__.prototype.visitField = function(ctx) {

    return {
        type: 'field',
        name: ctx.ID().getText(),
        value: this.visit(ctx.expr())
    };
};


__.prototype.visitService = function(ctx) {

    return {
        type: 'procedure',
        body: this.visit(ctx.block())
    };
};


__.prototype.visitMeasure = function(ctx) {

    return {
        type: 'cardinality',
        operand: this.visit(ctx.expr())
    };
};


__.prototype.visitCollection = function(ctx) {

    if (ctx.exprList()) {

        return {
            type: 'array',
            elements: this.visit(ctx.exprList())
        };
    }

    if (ctx.pairList()) {

        return {
            type: 'map',
            elements: this.visit(ctx.pairList())
        };
    }

    if (ctx.colon) {
        return {type: 'map', elements: []};
    }

    return {type: 'array', elements: []};
};


////////////////////////////////////////////////////////////////////////////////////////////////////


__.prototype.visitSplice = function(ctx) {

    return { type: 'splice', item: this.visit(ctx.expr(0)), list: this.visit(ctx.expr(1))};
};


__.prototype.visitSubscript = function(ctx) {

    return { type: 'subscript', list: this.visit(ctx.expr(0)), index: this.visit(ctx.expr(1))};
};


__.prototype.visitSelect = function(ctx) {

    return { type: 'select', set: this.visit(ctx.expr()), member: ctx.ID().getText()};
};


__.prototype.visitSlice = function(ctx) {

    var start = ctx.expr(1);
    var end = ctx.expr(2);

    var res = {
        type: 'slice',
        list: this.visit(ctx.expr(0))
    };

    if (start) {
        res.start = this.visit(start);
    }

    if (end) {
        res.end = this.visit(end);
    }

    return res;
};


__.prototype.visitExtraction = function(ctx) {

    return { type: 'extraction', list: this.visit(ctx.expr(0)), index: this.visit(ctx.expr(1))};
};


__.prototype.visitExcision = function(ctx) {

    var start = ctx.expr(1);
    var end = ctx.expr(2);

    var res = {
        type: 'excision',
        list: this.visit(ctx.expr(0))
    };

    if (start) {
        res.start = this.visit(start);
    }

    if (end) {
        res.end = this.visit(end);
    }

    return res;
};

module.exports = __;