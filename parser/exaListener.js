// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by exaParser.
function exaListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

exaListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
exaListener.prototype.constructor = exaListener;

// Enter a parse tree produced by exaParser#module.
exaListener.prototype.enterModule = function(ctx) {
};

// Exit a parse tree produced by exaParser#module.
exaListener.prototype.exitModule = function(ctx) {
};


// Enter a parse tree produced by exaParser#statement_list.
exaListener.prototype.enterStatement_list = function(ctx) {
};

// Exit a parse tree produced by exaParser#statement_list.
exaListener.prototype.exitStatement_list = function(ctx) {
};


// Enter a parse tree produced by exaParser#receive.
exaListener.prototype.enterReceive = function(ctx) {
};

// Exit a parse tree produced by exaParser#receive.
exaListener.prototype.exitReceive = function(ctx) {
};


// Enter a parse tree produced by exaParser#constant.
exaListener.prototype.enterConstant = function(ctx) {
};

// Exit a parse tree produced by exaParser#constant.
exaListener.prototype.exitConstant = function(ctx) {
};


// Enter a parse tree produced by exaParser#dimension.
exaListener.prototype.enterDimension = function(ctx) {
};

// Exit a parse tree produced by exaParser#dimension.
exaListener.prototype.exitDimension = function(ctx) {
};


// Enter a parse tree produced by exaParser#response.
exaListener.prototype.enterResponse = function(ctx) {
};

// Exit a parse tree produced by exaParser#response.
exaListener.prototype.exitResponse = function(ctx) {
};


// Enter a parse tree produced by exaParser#assignment.
exaListener.prototype.enterAssignment = function(ctx) {
};

// Exit a parse tree produced by exaParser#assignment.
exaListener.prototype.exitAssignment = function(ctx) {
};


// Enter a parse tree produced by exaParser#incDec.
exaListener.prototype.enterIncDec = function(ctx) {
};

// Exit a parse tree produced by exaParser#incDec.
exaListener.prototype.exitIncDec = function(ctx) {
};


// Enter a parse tree produced by exaParser#splice.
exaListener.prototype.enterSplice = function(ctx) {
};

// Exit a parse tree produced by exaParser#splice.
exaListener.prototype.exitSplice = function(ctx) {
};


// Enter a parse tree produced by exaParser#condStmt.
exaListener.prototype.enterCondStmt = function(ctx) {
};

// Exit a parse tree produced by exaParser#condStmt.
exaListener.prototype.exitCondStmt = function(ctx) {
};


// Enter a parse tree produced by exaParser#iteration.
exaListener.prototype.enterIteration = function(ctx) {
};

// Exit a parse tree produced by exaParser#iteration.
exaListener.prototype.exitIteration = function(ctx) {
};


// Enter a parse tree produced by exaParser#skip.
exaListener.prototype.enterSkip = function(ctx) {
};

// Exit a parse tree produced by exaParser#skip.
exaListener.prototype.exitSkip = function(ctx) {
};


// Enter a parse tree produced by exaParser#exprStmt.
exaListener.prototype.enterExprStmt = function(ctx) {
};

// Exit a parse tree produced by exaParser#exprStmt.
exaListener.prototype.exitExprStmt = function(ctx) {
};


// Enter a parse tree produced by exaParser#assignment_op.
exaListener.prototype.enterAssignment_op = function(ctx) {
};

// Exit a parse tree produced by exaParser#assignment_op.
exaListener.prototype.exitAssignment_op = function(ctx) {
};


// Enter a parse tree produced by exaParser#ifOnly.
exaListener.prototype.enterIfOnly = function(ctx) {
};

// Exit a parse tree produced by exaParser#ifOnly.
exaListener.prototype.exitIfOnly = function(ctx) {
};


// Enter a parse tree produced by exaParser#ifElse.
exaListener.prototype.enterIfElse = function(ctx) {
};

// Exit a parse tree produced by exaParser#ifElse.
exaListener.prototype.exitIfElse = function(ctx) {
};


// Enter a parse tree produced by exaParser#nestedIf.
exaListener.prototype.enterNestedIf = function(ctx) {
};

// Exit a parse tree produced by exaParser#nestedIf.
exaListener.prototype.exitNestedIf = function(ctx) {
};


// Enter a parse tree produced by exaParser#block.
exaListener.prototype.enterBlock = function(ctx) {
};

// Exit a parse tree produced by exaParser#block.
exaListener.prototype.exitBlock = function(ctx) {
};


// Enter a parse tree produced by exaParser#inverse.
exaListener.prototype.enterInverse = function(ctx) {
};

// Exit a parse tree produced by exaParser#inverse.
exaListener.prototype.exitInverse = function(ctx) {
};


// Enter a parse tree produced by exaParser#excision.
exaListener.prototype.enterExcision = function(ctx) {
};

// Exit a parse tree produced by exaParser#excision.
exaListener.prototype.exitExcision = function(ctx) {
};


// Enter a parse tree produced by exaParser#dynastring.
exaListener.prototype.enterDynastring = function(ctx) {
};

// Exit a parse tree produced by exaParser#dynastring.
exaListener.prototype.exitDynastring = function(ctx) {
};


// Enter a parse tree produced by exaParser#compare.
exaListener.prototype.enterCompare = function(ctx) {
};

// Exit a parse tree produced by exaParser#compare.
exaListener.prototype.exitCompare = function(ctx) {
};


// Enter a parse tree produced by exaParser#dispatch.
exaListener.prototype.enterDispatch = function(ctx) {
};

// Exit a parse tree produced by exaParser#dispatch.
exaListener.prototype.exitDispatch = function(ctx) {
};


// Enter a parse tree produced by exaParser#select.
exaListener.prototype.enterSelect = function(ctx) {
};

// Exit a parse tree produced by exaParser#select.
exaListener.prototype.exitSelect = function(ctx) {
};


// Enter a parse tree produced by exaParser#subscript.
exaListener.prototype.enterSubscript = function(ctx) {
};

// Exit a parse tree produced by exaParser#subscript.
exaListener.prototype.exitSubscript = function(ctx) {
};


// Enter a parse tree produced by exaParser#addSub.
exaListener.prototype.enterAddSub = function(ctx) {
};

// Exit a parse tree produced by exaParser#addSub.
exaListener.prototype.exitAddSub = function(ctx) {
};


// Enter a parse tree produced by exaParser#membership.
exaListener.prototype.enterMembership = function(ctx) {
};

// Exit a parse tree produced by exaParser#membership.
exaListener.prototype.exitMembership = function(ctx) {
};


// Enter a parse tree produced by exaParser#extraction.
exaListener.prototype.enterExtraction = function(ctx) {
};

// Exit a parse tree produced by exaParser#extraction.
exaListener.prototype.exitExtraction = function(ctx) {
};


// Enter a parse tree produced by exaParser#mulDiv.
exaListener.prototype.enterMulDiv = function(ctx) {
};

// Exit a parse tree produced by exaParser#mulDiv.
exaListener.prototype.exitMulDiv = function(ctx) {
};


// Enter a parse tree produced by exaParser#logical.
exaListener.prototype.enterLogical = function(ctx) {
};

// Exit a parse tree produced by exaParser#logical.
exaListener.prototype.exitLogical = function(ctx) {
};


// Enter a parse tree produced by exaParser#call.
exaListener.prototype.enterCall = function(ctx) {
};

// Exit a parse tree produced by exaParser#call.
exaListener.prototype.exitCall = function(ctx) {
};


// Enter a parse tree produced by exaParser#measure.
exaListener.prototype.enterMeasure = function(ctx) {
};

// Exit a parse tree produced by exaParser#measure.
exaListener.prototype.exitMeasure = function(ctx) {
};


// Enter a parse tree produced by exaParser#slice.
exaListener.prototype.enterSlice = function(ctx) {
};

// Exit a parse tree produced by exaParser#slice.
exaListener.prototype.exitSlice = function(ctx) {
};


// Enter a parse tree produced by exaParser#id.
exaListener.prototype.enterId = function(ctx) {
};

// Exit a parse tree produced by exaParser#id.
exaListener.prototype.exitId = function(ctx) {
};


// Enter a parse tree produced by exaParser#wrap.
exaListener.prototype.enterWrap = function(ctx) {
};

// Exit a parse tree produced by exaParser#wrap.
exaListener.prototype.exitWrap = function(ctx) {
};


// Enter a parse tree produced by exaParser#litExpr.
exaListener.prototype.enterLitExpr = function(ctx) {
};

// Exit a parse tree produced by exaParser#litExpr.
exaListener.prototype.exitLitExpr = function(ctx) {
};


// Enter a parse tree produced by exaParser#destructure.
exaListener.prototype.enterDestructure = function(ctx) {
};

// Exit a parse tree produced by exaParser#destructure.
exaListener.prototype.exitDestructure = function(ctx) {
};


// Enter a parse tree produced by exaParser#interpolated.
exaListener.prototype.enterInterpolated = function(ctx) {
};

// Exit a parse tree produced by exaParser#interpolated.
exaListener.prototype.exitInterpolated = function(ctx) {
};


// Enter a parse tree produced by exaParser#exprList.
exaListener.prototype.enterExprList = function(ctx) {
};

// Exit a parse tree produced by exaParser#exprList.
exaListener.prototype.exitExprList = function(ctx) {
};


// Enter a parse tree produced by exaParser#nil.
exaListener.prototype.enterNil = function(ctx) {
};

// Exit a parse tree produced by exaParser#nil.
exaListener.prototype.exitNil = function(ctx) {
};


// Enter a parse tree produced by exaParser#bool.
exaListener.prototype.enterBool = function(ctx) {
};

// Exit a parse tree produced by exaParser#bool.
exaListener.prototype.exitBool = function(ctx) {
};


// Enter a parse tree produced by exaParser#number.
exaListener.prototype.enterNumber = function(ctx) {
};

// Exit a parse tree produced by exaParser#number.
exaListener.prototype.exitNumber = function(ctx) {
};


// Enter a parse tree produced by exaParser#string.
exaListener.prototype.enterString = function(ctx) {
};

// Exit a parse tree produced by exaParser#string.
exaListener.prototype.exitString = function(ctx) {
};


// Enter a parse tree produced by exaParser#modref.
exaListener.prototype.enterModref = function(ctx) {
};

// Exit a parse tree produced by exaParser#modref.
exaListener.prototype.exitModref = function(ctx) {
};


// Enter a parse tree produced by exaParser#service.
exaListener.prototype.enterService = function(ctx) {
};

// Exit a parse tree produced by exaParser#service.
exaListener.prototype.exitService = function(ctx) {
};


// Enter a parse tree produced by exaParser#collection.
exaListener.prototype.enterCollection = function(ctx) {
};

// Exit a parse tree produced by exaParser#collection.
exaListener.prototype.exitCollection = function(ctx) {
};


// Enter a parse tree produced by exaParser#record.
exaListener.prototype.enterRecord = function(ctx) {
};

// Exit a parse tree produced by exaParser#record.
exaListener.prototype.exitRecord = function(ctx) {
};


// Enter a parse tree produced by exaParser#field.
exaListener.prototype.enterField = function(ctx) {
};

// Exit a parse tree produced by exaParser#field.
exaListener.prototype.exitField = function(ctx) {
};


// Enter a parse tree produced by exaParser#pairList.
exaListener.prototype.enterPairList = function(ctx) {
};

// Exit a parse tree produced by exaParser#pairList.
exaListener.prototype.exitPairList = function(ctx) {
};


// Enter a parse tree produced by exaParser#pair.
exaListener.prototype.enterPair = function(ctx) {
};

// Exit a parse tree produced by exaParser#pair.
exaListener.prototype.exitPair = function(ctx) {
};



exports.exaListener = exaListener;