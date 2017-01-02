// Generated from /Users/seth/devel/velo/parser/lo.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by loParser.

function loVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

loVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
loVisitor.prototype.constructor = loVisitor;

// Visit a parse tree produced by loParser#module.
loVisitor.prototype.visitModule = function(ctx) {
};


// Visit a parse tree produced by loParser#references.
loVisitor.prototype.visitReferences = function(ctx) {
};


// Visit a parse tree produced by loParser#statementList.
loVisitor.prototype.visitStatementList = function(ctx) {
};


// Visit a parse tree produced by loParser#defStmt.
loVisitor.prototype.visitDefStmt = function(ctx) {
};


// Visit a parse tree produced by loParser#response.
loVisitor.prototype.visitResponse = function(ctx) {
};


// Visit a parse tree produced by loParser#assignment.
loVisitor.prototype.visitAssignment = function(ctx) {
};


// Visit a parse tree produced by loParser#incDec.
loVisitor.prototype.visitIncDec = function(ctx) {
};


// Visit a parse tree produced by loParser#condStmt.
loVisitor.prototype.visitCondStmt = function(ctx) {
};


// Visit a parse tree produced by loParser#syncRequest.
loVisitor.prototype.visitSyncRequest = function(ctx) {
};


// Visit a parse tree produced by loParser#asyncRequest.
loVisitor.prototype.visitAsyncRequest = function(ctx) {
};


// Visit a parse tree produced by loParser#send.
loVisitor.prototype.visitSend = function(ctx) {
};


// Visit a parse tree produced by loParser#iteration.
loVisitor.prototype.visitIteration = function(ctx) {
};


// Visit a parse tree produced by loParser#scan.
loVisitor.prototype.visitScan = function(ctx) {
};


// Visit a parse tree produced by loParser#constant.
loVisitor.prototype.visitConstant = function(ctx) {
};


// Visit a parse tree produced by loParser#handlers.
loVisitor.prototype.visitHandlers = function(ctx) {
};


// Visit a parse tree produced by loParser#replyHandler.
loVisitor.prototype.visitReplyHandler = function(ctx) {
};


// Visit a parse tree produced by loParser#failHandler.
loVisitor.prototype.visitFailHandler = function(ctx) {
};


// Visit a parse tree produced by loParser#assignment_op.
loVisitor.prototype.visitAssignment_op = function(ctx) {
};


// Visit a parse tree produced by loParser#ifOnly.
loVisitor.prototype.visitIfOnly = function(ctx) {
};


// Visit a parse tree produced by loParser#ifElse.
loVisitor.prototype.visitIfElse = function(ctx) {
};


// Visit a parse tree produced by loParser#nestedIf.
loVisitor.prototype.visitNestedIf = function(ctx) {
};


// Visit a parse tree produced by loParser#block.
loVisitor.prototype.visitBlock = function(ctx) {
};


// Visit a parse tree produced by loParser#negation.
loVisitor.prototype.visitNegation = function(ctx) {
};


// Visit a parse tree produced by loParser#dynastring.
loVisitor.prototype.visitDynastring = function(ctx) {
};


// Visit a parse tree produced by loParser#compare.
loVisitor.prototype.visitCompare = function(ctx) {
};


// Visit a parse tree produced by loParser#select.
loVisitor.prototype.visitSelect = function(ctx) {
};


// Visit a parse tree produced by loParser#subscript.
loVisitor.prototype.visitSubscript = function(ctx) {
};


// Visit a parse tree produced by loParser#externalId.
loVisitor.prototype.visitExternalId = function(ctx) {
};


// Visit a parse tree produced by loParser#addSub.
loVisitor.prototype.visitAddSub = function(ctx) {
};


// Visit a parse tree produced by loParser#membership.
loVisitor.prototype.visitMembership = function(ctx) {
};


// Visit a parse tree produced by loParser#concat.
loVisitor.prototype.visitConcat = function(ctx) {
};


// Visit a parse tree produced by loParser#cardinality.
loVisitor.prototype.visitCardinality = function(ctx) {
};


// Visit a parse tree produced by loParser#mulDiv.
loVisitor.prototype.visitMulDiv = function(ctx) {
};


// Visit a parse tree produced by loParser#logical.
loVisitor.prototype.visitLogical = function(ctx) {
};


// Visit a parse tree produced by loParser#asyncCall.
loVisitor.prototype.visitAsyncCall = function(ctx) {
};


// Visit a parse tree produced by loParser#slice.
loVisitor.prototype.visitSlice = function(ctx) {
};


// Visit a parse tree produced by loParser#bytes.
loVisitor.prototype.visitBytes = function(ctx) {
};


// Visit a parse tree produced by loParser#syncCall.
loVisitor.prototype.visitSyncCall = function(ctx) {
};


// Visit a parse tree produced by loParser#id.
loVisitor.prototype.visitId = function(ctx) {
};


// Visit a parse tree produced by loParser#wrap.
loVisitor.prototype.visitWrap = function(ctx) {
};


// Visit a parse tree produced by loParser#map.
loVisitor.prototype.visitMap = function(ctx) {
};


// Visit a parse tree produced by loParser#litExpr.
loVisitor.prototype.visitLitExpr = function(ctx) {
};


// Visit a parse tree produced by loParser#destructure.
loVisitor.prototype.visitDestructure = function(ctx) {
};


// Visit a parse tree produced by loParser#interpolated.
loVisitor.prototype.visitInterpolated = function(ctx) {
};


// Visit a parse tree produced by loParser#exprList.
loVisitor.prototype.visitExprList = function(ctx) {
};


// Visit a parse tree produced by loParser#nil.
loVisitor.prototype.visitNil = function(ctx) {
};


// Visit a parse tree produced by loParser#bool.
loVisitor.prototype.visitBool = function(ctx) {
};


// Visit a parse tree produced by loParser#number.
loVisitor.prototype.visitNumber = function(ctx) {
};


// Visit a parse tree produced by loParser#string.
loVisitor.prototype.visitString = function(ctx) {
};


// Visit a parse tree produced by loParser#array.
loVisitor.prototype.visitArray = function(ctx) {
};


// Visit a parse tree produced by loParser#record.
loVisitor.prototype.visitRecord = function(ctx) {
};


// Visit a parse tree produced by loParser#set.
loVisitor.prototype.visitSet = function(ctx) {
};


// Visit a parse tree produced by loParser#handler.
loVisitor.prototype.visitHandler = function(ctx) {
};


// Visit a parse tree produced by loParser#service.
loVisitor.prototype.visitService = function(ctx) {
};


// Visit a parse tree produced by loParser#event.
loVisitor.prototype.visitEvent = function(ctx) {
};


// Visit a parse tree produced by loParser#subscribe.
loVisitor.prototype.visitSubscribe = function(ctx) {
};


// Visit a parse tree produced by loParser#sink.
loVisitor.prototype.visitSink = function(ctx) {
};


// Visit a parse tree produced by loParser#procedure.
loVisitor.prototype.visitProcedure = function(ctx) {
};


// Visit a parse tree produced by loParser#paramList.
loVisitor.prototype.visitParamList = function(ctx) {
};


// Visit a parse tree produced by loParser#fieldList.
loVisitor.prototype.visitFieldList = function(ctx) {
};


// Visit a parse tree produced by loParser#pairList.
loVisitor.prototype.visitPairList = function(ctx) {
};



exports.loVisitor = loVisitor;