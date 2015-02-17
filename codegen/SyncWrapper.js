/**
 * Wraps synchronous JS logic in a sync barrier.
 *
 * Created by: spurcell
 * 2/15/15
 */

"use strict";

/**
 * Wraps the given template function.
 *
 * @param template  function that returns JS logic as a string
 * @param async     flag indicating if this logic is async
 * @private
 */
var __ = function (template, async) {

    this.numPromises = 0;
    this.promises = {};
    this.async = async;

    // render the template
    this.js = template.call(this);
};

/**
 * Renders the given JS expr as synchronous logic in this context.
 *
 * @param jsExpr
 * @return {String}
 */
__.prototype.renderSync = function (jsExpr) {

    // if it's a literal expression, just pass through

    if (typeof jsExpr == 'string') {
        return jsExpr;
    }

    // if it's an async expression we'll have to replace it with a temp var
    // and stash it for rendering later

    if (jsExpr instanceof __ && jsExpr.async) {

        var temp = 'tmp_' + this.numPromises;
        this.numPromises++;

        this.promises[temp] = jsExpr; // need to get the *async* JS here
        return temp;
    }
};

/**
 * Returns the JS.
 *
 * @return {*}
 */
__.prototype.getJs = function () {

    return this.js;
};

module.exports = __;