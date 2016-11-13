/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A subscript expression
 *
 * @param array
 * @param start
 * @param end
 */
var __ = function (array, start, end) {

    this.array = array;
    this.start = start;
    this.end = end;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    var res = {
        type: 'slice',
        list: this.array.getAst()
    };

    if (this.start) {
        res.start = this.start.getAst();
    }

    if (this.end) {
        res.end = this.end.getAst();
    }

    return res;
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // lean on JS slice since it has the same semantics

    var list = this.array.compile(context);
    var start = this.start ? this.start.compile(context) : JS.num('0');
    var end = this.end ? this.end.compile(context) : null;

    return JS.fnCall(
        JS.select(list, 'slice'),
        end ? [start, JS.add(end, JS.num('1'))] : [start]
    );
};

module.exports = __;