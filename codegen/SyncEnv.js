/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var __ = function () {

    this.numPromises = 0;
    this.promises = {};
};

/**
 * Returns a synchronous form of the given expression for use within this environment.
 *
 * @param expr
 * @return {String}
 */
__.prototype.syncrify = function (expr) {

    // if it's a literal JS expression, just pass through

    if (typeof expr == 'string') {
        return expr;
    }

    // if expr is wrapping a deferred, we'll have to use a temp var inside the barrier

    if (expr.deferred) {

        var temp = 'tmp_' + this.numPromises;
        this.numPromises++;

        this.promises[temp] = expr.render(this);
        return temp;
    }

    // otherwise just render the expression in the env
    return expr.render(this);
};

/**
 * Wraps this environment.
 *
 * @param env
 */
__.prototype.setWrapper = function (env) {
    this.wrapper = env;
};

/**
 * Renders the given JS within this sync environment.
 *
 * @param js
 * @return {*}
 */
__.prototype.render = function (js) {

    var result = js;

    if (this.numPromises > 0) {

        // wrap the JS

        var self = this;
        var tempVars = Object.keys(this.promises);
        var promises = tempVars.map(function (varName) {
            return self.promises[varName];
        });

        result = 'Q.spread([' + promises.join(',') + '], function (' + tempVars.join(',') + ') {\n' + js + '\n}, result.reject);';
    }

    // render the wrapper env if there is one

    if (this.wrapper) {
        return this.wrapper.render(result);
    }

    return result;
};

module.exports = __;