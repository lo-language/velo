// Generated from /Users/seth/devel/exa/parser/exa.g4 by ANTLR 4.5.3
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


// Visit a parse tree produced by exaParser#references.
exaVisitor.prototype.visitReferences = function(ctx) {
};


// Visit a parse tree produced by exaParser#statementList.
exaVisitor.prototype.visitStatementList = function(ctx) {
};


// Visit a parse tree produced by exaParser#defStmt.
exaVisitor.prototype.visitDefStmt = function(ctx) {
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


// Visit a parse tree produced by exaParser#condStmt.
exaVisitor.prototype.visitCondStmt = function(ctx) {
};


// Visit a parse tree produced by exaParser#syncRequest.
exaVisitor.prototype.visitSyncRequest = function(ctx) {
};


// Visit a parse tree produced by exaParser#asyncRequest.
exaVisitor.prototype.visitAsyncRequest = function(ctx) {
};


// Visit a parse tree produced by exaParser#send.
exaVisitor.prototype.visitSend = function(ctx) {
};


// Visit a parse tree produced by exaParser#iteration.
exaVisitor.prototype.visitIteration = function(ctx) {
};


// Visit a parse tree produced by exaParser#scan.
exaVisitor.prototype.visitScan = function(ctx) {
};


// Visit a parse tree produced by exaParser#constant.
exaVisitor.prototype.visitConstant = function(ctx) {
};


// Visit a parse tree produced by exaParser#handlers.
exaVisitor.prototype.visitHandlers = function(ctx) {
};


// Visit a parse tree produced by exaParser#replyHandler.
exaVisitor.prototype.visitReplyHandler = function(ctx) {
};


// Visit a parse tree produced by exaParser#failHandler.
exaVisitor.prototype.visitFailHandler = function(ctx) {
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


// Visit a parse tree produced by exaParser#negation.
exaVisitor.prototype.visitNegation = function(ctx) {
};


// Visit a parse tree produced by exaParser#dynastring.
exaVisitor.prototype.visitDynastring = function(ctx) {
};


// Visit a parse tree produced by exaParser#compare.
exaVisitor.prototype.visitCompare = function(ctx) {
};


// Visit a parse tree produced by exaParser#select.
exaVisitor.prototype.visitSelect = function(ctx) {
};


// Visit a parse tree produced by exaParser#subscript.
exaVisitor.prototype.visitSubscript = function(ctx) {
};


// Visit a parse tree produced by exaParser#externalId.
exaVisitor.prototype.visitExternalId = function(ctx) {
};


// Visit a parse tree produced by exaParser#addSub.
exaVisitor.prototype.visitAddSub = function(ctx) {
};


// Visit a parse tree produced by exaParser#membership.
exaVisitor.prototype.visitMembership = function(ctx) {
};


// Visit a parse tree produced by exaParser#concat.
exaVisitor.prototype.visitConcat = function(ctx) {
};


// Visit a parse tree produced by exaParser#cardinality.
exaVisitor.prototype.visitCardinality = function(ctx) {
};


// Visit a parse tree produced by exaParser#mulDiv.
exaVisitor.prototype.visitMulDiv = function(ctx) {
};


// Visit a parse tree produced by exaParser#logical.
exaVisitor.prototype.visitLogical = function(ctx) {
};


// Visit a parse tree produced by exaParser#asyncCall.
exaVisitor.prototype.visitAsyncCall = function(ctx) {
};


// Visit a parse tree produced by exaParser#slice.
exaVisitor.prototype.visitSlice = function(ctx) {
};


// Visit a parse tree produced by exaParser#bytes.
exaVisitor.prototype.visitBytes = function(ctx) {
};


// Visit a parse tree produced by exaParser#syncCall.
exaVisitor.prototype.visitSyncCall = function(ctx) {
};


// Visit a parse tree produced by exaParser#id.
exaVisitor.prototype.visitId = function(ctx) {
};


// Visit a parse tree produced by exaParser#wrap.
exaVisitor.prototype.visitWrap = function(ctx) {
};


// Visit a parse tree produced by exaParser#map.
exaVisitor.prototype.visitMap = function(ctx) {
};


// Visit a parse tree produced by exaParser#litExpr.
exaVisitor.prototype.visitLitExpr = function(ctx) {
};


// Visit a parse tree produced by exaParser#destructure.
exaVisitor.prototype.visitDestructure = function(ctx) {
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


// Visit a parse tree produced by exaParser#array.
exaVisitor.prototype.visitArray = function(ctx) {
};


// Visit a parse tree produced by exaParser#record.
exaVisitor.prototype.visitRecord = function(ctx) {
};


// Visit a parse tree produced by exaParser#set.
exaVisitor.prototype.visitSet = function(ctx) {
};


// Visit a parse tree produced by exaParser#handler.
exaVisitor.prototype.visitHandler = function(ctx) {
};


// Visit a parse tree produced by exaParser#service.
exaVisitor.prototype.visitService = function(ctx) {
};


// Visit a parse tree produced by exaParser#event.
exaVisitor.prototype.visitEvent = function(ctx) {
};


// Visit a parse tree produced by exaParser#subscribe.
exaVisitor.prototype.visitSubscribe = function(ctx) {
};


// Visit a parse tree produced by exaParser#sink.
exaVisitor.prototype.visitSink = function(ctx) {
};


// Visit a parse tree produced by exaParser#procedure.
exaVisitor.prototype.visitProcedure = function(ctx) {
};


// Visit a parse tree produced by exaParser#paramList.
exaVisitor.prototype.visitParamList = function(ctx) {
};


// Visit a parse tree produced by exaParser#fieldList.
exaVisitor.prototype.visitFieldList = function(ctx) {
};


// Visit a parse tree produced by exaParser#pairList.
exaVisitor.prototype.visitPairList = function(ctx) {
};



exports.exaVisitor = exaVisitor;