/**
 * Wraps a JS construct in a request context. Requests can only be unwrapped in the context of a statement.
 *
 * Created by: spurcell
 * 3/1/15
 */

"use strict";

var JsConstruct = require('./JsConstruct');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param parts     an array of strings or constructs
 */
var __ = function (parts) {

    this.construct = new JsConstruct(parts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the wrapped construct.
 */
__.prototype.getConstruct = function () {

    return this.construct;
};

module.exports = __;