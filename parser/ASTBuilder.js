/**
 * Created by spurcell on 1/10/16.
 */

const antlr4 = require('antlr4');
const Lexer = require('./exaLexer');
const Parser = require('./exaParser');
const BaseVisitor = require('./exaVisitor').exaVisitor;

const fs = require('fs');
const util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////

var ASTBuilder = function () {
    BaseVisitor.call(this);
};

ASTBuilder.prototype = Object.create(BaseVisitor.prototype);
ASTBuilder.prototype.constructor = ASTBuilder;

////////////////////////////////////////////////////////////////////////////////////////////////////

ASTBuilder.prototype.parse = function (input) {

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
ASTBuilder.prototype.visitModule = function(ctx) {
    return {type: 'module', service: {type: 'procedure', body: this.visit(ctx.statement_list())}};
};


// Visit a parse tree produced by exaParser#statement_list.
ASTBuilder.prototype.visitStatement_list = function(ctx) {

    var subList = ctx.statement_list();

    return {type: 'stmt_list', head: this.visit(ctx.statement()), tail: subList ? this.visit(subList) : null};
};


// Visit a parse tree produced by exaParser#receive.
ASTBuilder.prototype.visitReceive = function(ctx) {

    return {type: 'receive', names: ctx.ID().map(function (token) {return token.getText()})};
};


// Visit a parse tree produced by exaParser#assignment.
ASTBuilder.prototype.visitAssignment = function(ctx) {
    return {
        type: 'assign',
        op: ctx.assignment_op().getText(),
        left: this.visit(ctx.lvalue()),
        right: this.visit(ctx.expr())
    };
};


// Visit a parse tree produced by exaParser#expr.
ASTBuilder.prototype.visitMulDiv = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: this.visit(ctx.expr(0)),
        right: this.visit(ctx.expr(1))
    };
};


// Visit a parse tree produced by exaParser#expr.
ASTBuilder.prototype.visitAddSub = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: this.visit(ctx.expr(0)),
        right: this.visit(ctx.expr(1))
    };
};


// Visit a parse tree produced by exaParser#expr.
ASTBuilder.prototype.visitCompare = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: this.visit(ctx.expr(0)),
        right: this.visit(ctx.expr(1))
    };
};


// Visit a parse tree produced by exaParser#expr.
ASTBuilder.prototype.visitIncDec = function(ctx) {

    return {
        type: ctx.op.text == '++' ? 'increment' : 'decrement',
        operand: this.visit(ctx.lvalue())
    };
};


// Visit a parse tree produced by exaParser#expr.
ASTBuilder.prototype.visitWrap = function(ctx) {

    return this.visit(ctx.expr());
};


// Visit a parse tree produced by exaParser#expr.
ASTBuilder.prototype.visitLitExpr = function(ctx) {

    return this.visit(ctx.literal());
};


// Visit a parse tree produced by exaParser#expr.
ASTBuilder.prototype.visitValExpr = function(ctx) {

    return this.visit(ctx.lvalue());
};


// Visit a parse tree produced by exaParser#exprList.
ASTBuilder.prototype.visitExprList = function(ctx) {
};


// Visit a parse tree produced by exaParser#lvalue.
ASTBuilder.prototype.visitId = function(ctx) {
    return {type: "id", name: ctx.ID().getText()};
};


// Visit a parse tree produced by exaParser#nil.
ASTBuilder.prototype.visitConstant = function(ctx) {

    return {type: 'constant', name: ctx.ID().getText(), value: this.visit(ctx.literal()) };
};

// Visit a parse tree produced by exaParser#nil.
ASTBuilder.prototype.visitDimension = function(ctx) {

    return {type: 'range', variants: ctx.ID().map(function (token) {return token.getText()}) };
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// literals


// Visit a parse tree produced by exaParser#nil.
ASTBuilder.prototype.visitNil = function(ctx) {
};


// Visit a parse tree produced by exaParser#bool.
ASTBuilder.prototype.visitBool = function(ctx) {

    // ??? might not want to return an actual bool here - number literals are kept as strings
    return {type: 'boolean', val: ctx.BOOL().getText() == 'true'};
};


// Visit a parse tree produced by exaParser#number.
ASTBuilder.prototype.visitNumber = function(ctx) {

    return { type: 'number', val: ctx.NUMBER().getText()};
};


// Visit a parse tree produced by exaParser#string.
ASTBuilder.prototype.visitString = function(ctx) {

    return { type: 'string', val: ctx.STRING().getText()};
};


ASTBuilder.prototype.visitModref = function(ctx) {

    return { type: 'modref', val: ctx.MODREF().getText()};
};


////////////////////////////////////////////////////////////////////////////////////////////////////


ASTBuilder.prototype.visitSplice = function(ctx) {

    return { type: 'splice', item: this.visit(ctx.expr()), list: this.visit(ctx.lvalue())};
};


ASTBuilder.prototype.visitSubscript = function(ctx) {

    return { type: 'subscript', list: this.visit(ctx.lvalue()), index: this.visit(ctx.expr())};
};


ASTBuilder.prototype.visitSelect = function(ctx) {

    return { type: 'select', set: this.visit(ctx.lvalue()), member: ctx.ID().getText()};
};


ASTBuilder.prototype.visitSlice = function(ctx) {

    var start = ctx.expr(0);
    var end = ctx.expr(1);

    var res = {
        type: 'slice',
        list: this.visit(ctx.lvalue())
    };

    if (start) {
        res.start = this.visit(start);
    }

    if (end) {
        res.end = this.visit(end);
    }

    return res;
};


ASTBuilder.prototype.visitExtraction = function(ctx) {

    return { type: 'extraction', list: this.visit(ctx.lvalue()), index: this.visit(ctx.expr())};
};


ASTBuilder.prototype.visitExcision = function(ctx) {

    var start = ctx.expr(0);
    var end = ctx.expr(1);

    var res = {
        type: 'excision',
        list: this.visit(ctx.lvalue())
    };

    if (start) {
        res.start = this.visit(start);
    }

    if (end) {
        res.end = this.visit(end);
    }

    return res;
};


//var builder = new ASTBuilder();
//var input = fs.readFileSync(__dirname + '/../examples/while.exa', 'utf8');
//console.log(util.inspect(builder.parse(input), {depth: null, colors: true}));

module.exports = ASTBuilder;