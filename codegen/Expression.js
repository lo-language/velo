/**
 * Created by: spurcell
 * 8/9/14
 */

"use strict";

/**
 *
 * @param code
 * @param deps  subexpressions for this expression
 * @private
 */
var __ = function () {
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a literal expression.
 *
 * @param value
 */
__.createLiteral = function (value) {

    var x = new __();

    x.code = (typeof value === 'string' ? '"' + value + '"' : value);
    x.immediate = true;

    return x;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a simple reference expression.
 *
 * @param name
 */
__.createParam = function (name) {

    var x = new __();

    x.code = name;
    x.immediate = true;

    return x;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a simple reference expression.
 *
 * @param ref
 * @param immediate
 */
__.createTempVar = function (ref, immediate) {

    var x = new __();

    x.code = ref;
    x.immediate = immediate || false;

    return x;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a compound expression (having subexpressions)
 *
 * @param code
 * @param subExpr
 * @param isExpr HACK ALERT
 */
__.createCompound = function (codeGen, subExpr, isStmt) {

    // if any sub expressions are deferred, so is this one

    var x = new __();
    var promises = [];

    subExpr.forEach(function (expr) {
        if (expr.isImmediate() == false) {
            promises.push(expr);
        }
    });

    if (promises.length == 0) {
        x.immediate = true;
        x.code = codeGen(subExpr.map(function (expr) {
            return expr.getCode();
        }));
    }
    else if (promises.length == 1) {

        x.code = promises[0].getCode() + '.then(function (val) {' + (isStmt ? '' : 'return ') +
            codeGen(subExpr.map(function (expr) {

                if (expr.isImmediate()) {
                    return expr.getCode();
                }
                else {
                    x.immediate = false;
                    return 'val'; // possible name collision? or not since there's no $?
                }
            })) + (isStmt ? '' : ';') + '})';
    }
    else {

        var promiseCount = 0;

        x.code = 'Q.all([' + promises.map(function (expr) {return expr.getCode();}).join(', ') + ']).then(function (args) {'  + (isStmt ? '' : 'return ') +
            codeGen(subExpr.map(function (expr) {

                if (expr.isImmediate()) {
                    return expr.getCode();
                }
                else {
                    x.immediate = false;
                    return 'args[' + promiseCount++ + ']';
                }
            })) + (isStmt ? '' : ';') + '})';
    }

    return x;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this expression has an immediate value
 *
 * @return {*}
 */
__.prototype.isImmediate = function () {
    return this.immediate;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.getCode = function () {
    return this.code;
};

module.exports = {
    createLiteral: __.createLiteral,
    createRef: __.createRef,
    createCompound: __.createCompound
};