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
    this.statements = trueBlock || [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
__.prototype.compile = function (target) {

    var expr = this.expr.compile(target);

    // compile the block - the block may or may not end up in its own closure
    // expressions shouldn't write themselves into the target scope, but maybe statements should?
    // but if a statement is also an expression, it doesn't know it's at the top level - only the block does

    // passing target allows access to the scope - should it be read-only?
    var block = this.statements.map(function (stmt) {
        return stmt.compile(target).getCode();
    }).join('\n');

    // should we not generate the code above, but instead pass just expressions?

    return target.createStatement(function (args) {
        return 'if (' + args[0] + ') { ' + block + ' }'
    }, [expr]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    if (typeof this.id == 'string') {
        return ['id', this.id];
    }

    return ['id', this.id.toJSON(), this.selector];
};

module.exports = __;