// Generated from /Users/seth/devel/velo/parser/lo.g4 by ANTLR 4.7
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
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#statementList.
loVisitor.prototype.visitStatementList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#defStmt.
loVisitor.prototype.visitDefStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#response.
loVisitor.prototype.visitResponse = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#assignment.
loVisitor.prototype.visitAssignment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#incDec.
loVisitor.prototype.visitIncDec = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#condStmt.
loVisitor.prototype.visitCondStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#push.
loVisitor.prototype.visitPush = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#syncRequest.
loVisitor.prototype.visitSyncRequest = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#subscribe.
loVisitor.prototype.visitSubscribe = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#invocation.
loVisitor.prototype.visitInvocation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#invocation2.
loVisitor.prototype.visitInvocation2 = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#iteration.
loVisitor.prototype.visitIteration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#scan.
loVisitor.prototype.visitScan = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#definition.
loVisitor.prototype.visitDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#dependency.
loVisitor.prototype.visitDependency = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#locator.
loVisitor.prototype.visitLocator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#handlers.
loVisitor.prototype.visitHandlers = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#replyHandler.
loVisitor.prototype.visitReplyHandler = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#failHandler.
loVisitor.prototype.visitFailHandler = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#ifOnly.
loVisitor.prototype.visitIfOnly = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#ifElse.
loVisitor.prototype.visitIfElse = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#nestedIf.
loVisitor.prototype.visitNestedIf = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#block.
loVisitor.prototype.visitBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#negation.
loVisitor.prototype.visitNegation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#compare.
loVisitor.prototype.visitCompare = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#select.
loVisitor.prototype.visitSelect = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#subscript.
loVisitor.prototype.visitSubscript = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#condExpr.
loVisitor.prototype.visitCondExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#existence.
loVisitor.prototype.visitExistence = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#addSub.
loVisitor.prototype.visitAddSub = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#membership.
loVisitor.prototype.visitMembership = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#concat.
loVisitor.prototype.visitConcat = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#cardinality.
loVisitor.prototype.visitCardinality = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#mulDiv.
loVisitor.prototype.visitMulDiv = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#logical.
loVisitor.prototype.visitLogical = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#asyncCall.
loVisitor.prototype.visitAsyncCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#slice.
loVisitor.prototype.visitSlice = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#bytes.
loVisitor.prototype.visitBytes = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#literalExpr.
loVisitor.prototype.visitLiteralExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#syncCall.
loVisitor.prototype.visitSyncCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#id.
loVisitor.prototype.visitId = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#stringify.
loVisitor.prototype.visitStringify = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#wrap.
loVisitor.prototype.visitWrap = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#destructure.
loVisitor.prototype.visitDestructure = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#mixedString.
loVisitor.prototype.visitMixedString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#interpolated.
loVisitor.prototype.visitInterpolated = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#exprList.
loVisitor.prototype.visitExprList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#nil.
loVisitor.prototype.visitNil = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#bool.
loVisitor.prototype.visitBool = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#number.
loVisitor.prototype.visitNumber = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#string.
loVisitor.prototype.visitString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#array.
loVisitor.prototype.visitArray = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#compound.
loVisitor.prototype.visitCompound = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#set.
loVisitor.prototype.visitSet = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#service.
loVisitor.prototype.visitService = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#event.
loVisitor.prototype.visitEvent = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#proc.
loVisitor.prototype.visitProc = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#memberList.
loVisitor.prototype.visitMemberList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#paramList.
loVisitor.prototype.visitParamList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#fieldList.
loVisitor.prototype.visitFieldList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by loParser#pairList.
loVisitor.prototype.visitPairList = function(ctx) {
  return this.visitChildren(ctx);
};



exports.loVisitor = loVisitor;