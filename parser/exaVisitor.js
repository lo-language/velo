// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by exaParser.

function exaVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

exaVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
exaVisitor.prototype.constructor = exaVisitor;

// Visit a parse tree produced by exaParser#module.
exaVisitor.prototype.visitModule = function(ctx) {
};


// Visit a parse tree produced by exaParser#statement_list.
exaVisitor.prototype.visitStatement_list = function(ctx) {
};


// Visit a parse tree produced by exaParser#receive.
exaVisitor.prototype.visitReceive = function(ctx) {
};


// Visit a parse tree produced by exaParser#constant.
exaVisitor.prototype.visitConstant = function(ctx) {
};


// Visit a parse tree produced by exaParser#dimension.
exaVisitor.prototype.visitDimension = function(ctx) {
};


// Visit a parse tree produced by exaParser#response.
exaVisitor.prototype.visitResponse = function(ctx) {
};


// Visit a parse tree produced by exaParser#assignment.
exaVisitor.prototype.visitAssignment = function(ctx) {
};


// Visit a parse tree produced by exaParser#incDec.
exaVisitor.prototype.visitIncDec = function(ctx) {
};


// Visit a parse tree produced by exaParser#splice.
exaVisitor.prototype.visitSplice = function(ctx) {
};


// Visit a parse tree produced by exaParser#condStmt.
exaVisitor.prototype.visitCondStmt = function(ctx) {
};


// Visit a parse tree produced by exaParser#iteration.
exaVisitor.prototype.visitIteration = function(ctx) {
};


// Visit a parse tree produced by exaParser#skip.
exaVisitor.prototype.visitSkip = function(ctx) {
};


// Visit a parse tree produced by exaParser#exprStmt.
exaVisitor.prototype.visitExprStmt = function(ctx) {
};


// Visit a parse tree produced by exaParser#assignment_op.
exaVisitor.prototype.visitAssignment_op = function(ctx) {
};


// Visit a parse tree produced by exaParser#ifOnly.
exaVisitor.prototype.visitIfOnly = function(ctx) {
};


// Visit a parse tree produced by exaParser#ifElse.
exaVisitor.prototype.visitIfElse = function(ctx) {
};


// Visit a parse tree produced by exaParser#nestedIf.
exaVisitor.prototype.visitNestedIf = function(ctx) {
};


// Visit a parse tree produced by exaParser#block.
exaVisitor.prototype.visitBlock = function(ctx) {
};


// Visit a parse tree produced by exaParser#inverse.
exaVisitor.prototype.visitInverse = function(ctx) {
};


// Visit a parse tree produced by exaParser#excision.
exaVisitor.prototype.visitExcision = function(ctx) {
};


// Visit a parse tree produced by exaParser#dynastring.
exaVisitor.prototype.visitDynastring = function(ctx) {
};


// Visit a parse tree produced by exaParser#compare.
exaVisitor.prototype.visitCompare = function(ctx) {
};


// Visit a parse tree produced by exaParser#dispatch.
exaVisitor.prototype.visitDispatch = function(ctx) {
};


// Visit a parse tree produced by exaParser#select.
exaVisitor.prototype.visitSelect = function(ctx) {
};


// Visit a parse tree produced by exaParser#subscript.
exaVisitor.prototype.visitSubscript = function(ctx) {
};


// Visit a parse tree produced by exaParser#addSub.
exaVisitor.prototype.visitAddSub = function(ctx) {
};


// Visit a parse tree produced by exaParser#membership.
exaVisitor.prototype.visitMembership = function(ctx) {
};


// Visit a parse tree produced by exaParser#extraction.
exaVisitor.prototype.visitExtraction = function(ctx) {
};


// Visit a parse tree produced by exaParser#mulDiv.
exaVisitor.prototype.visitMulDiv = function(ctx) {
};


// Visit a parse tree produced by exaParser#logical.
exaVisitor.prototype.visitLogical = function(ctx) {
};


// Visit a parse tree produced by exaParser#call.
exaVisitor.prototype.visitCall = function(ctx) {
};


// Visit a parse tree produced by exaParser#measure.
exaVisitor.prototype.visitMeasure = function(ctx) {
};


// Visit a parse tree produced by exaParser#slice.
exaVisitor.prototype.visitSlice = function(ctx) {
};


// Visit a parse tree produced by exaParser#id.
exaVisitor.prototype.visitId = function(ctx) {
};


// Visit a parse tree produced by exaParser#wrap.
exaVisitor.prototype.visitWrap = function(ctx) {
};


// Visit a parse tree produced by exaParser#litExpr.
exaVisitor.prototype.visitLitExpr = function(ctx) {
};


// Visit a parse tree produced by exaParser#destructure.
exaVisitor.prototype.visitDestructure = function(ctx) {
};


// Visit a parse tree produced by exaParser#replyHandler.
exaVisitor.prototype.visitReplyHandler = function(ctx) {
};


// Visit a parse tree produced by exaParser#failHandler.
exaVisitor.prototype.visitFailHandler = function(ctx) {
};


// Visit a parse tree produced by exaParser#interpolated.
exaVisitor.prototype.visitInterpolated = function(ctx) {
};


// Visit a parse tree produced by exaParser#exprList.
exaVisitor.prototype.visitExprList = function(ctx) {
};


// Visit a parse tree produced by exaParser#nil.
exaVisitor.prototype.visitNil = function(ctx) {
};


// Visit a parse tree produced by exaParser#bool.
exaVisitor.prototype.visitBool = function(ctx) {
};


// Visit a parse tree produced by exaParser#number.
exaVisitor.prototype.visitNumber = function(ctx) {
};


// Visit a parse tree produced by exaParser#string.
exaVisitor.prototype.visitString = function(ctx) {
};


// Visit a parse tree produced by exaParser#modref.
exaVisitor.prototype.visitModref = function(ctx) {
};


// Visit a parse tree produced by exaParser#service.
exaVisitor.prototype.visitService = function(ctx) {
};


// Visit a parse tree produced by exaParser#collection.
exaVisitor.prototype.visitCollection = function(ctx) {
};


// Visit a parse tree produced by exaParser#record.
exaVisitor.prototype.visitRecord = function(ctx) {
};


// Visit a parse tree produced by exaParser#field.
exaVisitor.prototype.visitField = function(ctx) {
};


// Visit a parse tree produced by exaParser#pairList.
exaVisitor.prototype.visitPairList = function(ctx) {
};


// Visit a parse tree produced by exaParser#pair.
exaVisitor.prototype.visitPair = function(ctx) {
};



exports.exaVisitor = exaVisitor;