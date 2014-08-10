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
var __ = function (expr, statements) {

    this.expr = expr;
    this.statements = statements || [];
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
        return stmt.getCode();
    }).join('\n');

    return target.createCompound(function (args) {
        return 'if (' + args[0] + ') { ' + block + ' }'
    }, [expr]);

    // just pass a different codegen callback rather than making two different calls to createCompound?
    // or can we somehow use the same codegen callback?
//    return target.createCompound(function (args) {
//        return 'if (val) { ' + block + '}';
//    }, [expr]);
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