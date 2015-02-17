/**
 * Implements a synchronization barrier.
 *
 * When compiling, we traverse the AST top-down and render barriers coming up.
 * Should we wait to render the templates, or render them right away?
 *
 * Created by: spurcell
 * 2/15/15
 */

"use strict";

var __ = function (template) {

    this.numPromises = 0;
    this.promises = {};

    this.js = template.call(this);
};

/**
 * Synchronizes the given JS expression behind this barrier.
 *
 * Returns an expression that represents the synchronized version of the input.
 *
 * @param jsExpr
 * @return {String}
 */
__.prototype.renderSync = function (jsExpr) {

    // if it's a literal expression, just pass through

    if (typeof jsExpr == 'string') {
        return jsExpr;
    }

    // if we're trying to use a deferred, we'll have to use a temp var inside the barrier

    if (jsExpr instanceof Deferred) {

        var temp = 'tmp_' + this.numPromises;
        this.numPromises++;

        this.promises[temp] = jsExpr;
        return temp;
    }

    // if it's another barrier, we know there are no deferreds in it
    // so we can just use the JS directly but remember to wrap our result in it

    if (jsExpr instanceof __) {

        this.wrapper = jsExpr;
        return jsExpr.getJs();
    }
};

/**
 *
 * @param jsExpr
 */
__.prototype.renderAsync = function (jsExpr) {

};

__.prototype.getJs = function () {

    if (this.wrapper) {
        return this.wrapper.wrap(this.js);
    }

    return this.wrap(this.js);
};

__.prototype.wrap = function (inner) {

    if (this.numPromises == 0) {

        // don't have to wrap it
        return inner;
    }

    // wrap the JS

    var self = this;
    var tempVars = Object.keys(this.promises);
    var promises = tempVars.map(function (varName) {
        return self.promises[varName].getJs();
    });

    return 'Q.spread([' + promises.join(',') + '], function (' + tempVars.join(',') + ') {\n' + inner + ';\n}, result.reject);';
};

/**
 * Adds dependent statements.
 */
__.prototype.continue = function (stmt) {

    this.following = stmt;
};

module.exports = __;

var Deferred = require('./Deferred');