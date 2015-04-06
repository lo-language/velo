/**
 * Extends JsResolver and models a request by flagging itself as async regardless of its contents.
 *
 * Created by: spurcell
 * 3/1/15
 */

"use strict";

var JsResolver = require('./JsResolver');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param parts     an array of strings or constructs
 */
var __ = function (parts) {

    JsResolver.call(this, parts);

    this.async = true;
};

// subclass extends superclass
__.prototype = Object.create(JsResolver.prototype);
__.prototype.constructor = __;


module.exports = __;