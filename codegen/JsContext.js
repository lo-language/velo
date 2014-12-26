/**
 * Models a JS context - what vars we have available.
 *
 * should the context be on the stmt object?
 *
 * Created by: spurcell
 * 12/26/14
 */

"use strict";

var __ = function () {

    this.subs = [];
};

/**
 * Pushes a JsCall node into the context.
 *
 * @param call
 */
__.prototype.addPromise = function (call) {

    var subVarName = 'tmp_' + this.subs.length;

    this.subs.push(call);

    return subVarName;
};

/**
 * Renders the given statement in this context.
 */
__.prototype.render = function (stmt) {

    // return the bare statement if there's no reason to wrap it
    if (this.subs.length == 0) {
        return stmt;
    }

    var nested = new __();  // the inner expr context becomes the OUTER function

    var args = [];
    var promises = this.subs.map(function (sub, index) {

        args.push('tmp_' + index);

        return sub.renderCall(nested);
    });

    // could alternatively create a new rejection handler here, rather than reusing the parent context's
    return nested.render('Q.spread([' + promises.join(',') + '], function (' + args.join(',') + ') {\n\n'
        + stmt + '}, result.reject);');
};

module.exports = __;