/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param expr
 * @private
 */
var __ = function (expr, trueBlock, falseBlock) {

    this.expr = expr;
    this.trueBlock = trueBlock || [];
    this.falseBlock = falseBlock || [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
__.prototype.compile = function (target) {

    // compile the expression to select from
    var expr = this.expr.compile(target);

    // compile the block - the block may or may not end up in its own closure
    // expressions shouldn't write themselves into the target scope, but maybe statements should?
    // but if a statement is also an expression, it doesn't know it's at the top level - only the block does

    // passing target allows access to the scope - should it be read-only?
    var trueBlock = this.trueBlock.map(function (stmt) {
        return stmt.compile(target).getCode();
    }).join('\n');

    var falseBlock = this.falseBlock.map(function (stmt) {
        return stmt.compile(target).getCode();
    }).join('\n');

    // should we not generate the code above, but instead pass just expressions?

    return target.createStatement(function (args) {

        var result = 'if (' + args[0] + ') { ' + trueBlock + ' }';

        if (falseBlock.length > 0) {
            result += ' else { ' + falseBlock + ' }';
        }

        return result;
    }, [expr]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    if (this.falseBlock.length == 0) {
        return ['if', this.expr, this.trueBlock];
    }
    else {
        return ['if', this.expr, this.trueBlock, this.falseBlock];
    }
};

module.exports = __;