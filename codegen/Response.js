/**
 * Created by spurcell on 6/25/16.
 */

const JS = require('./JsPrimitives');
const JsStmt = require('./JsStmt');

/**
 *
 * @param channel
 * @param args
 * @private
 */
var __ = function (channel, args) {

    var ast = JS.exprStmt(JS.runtimeCall('respond', [JS.string(this.channel), this.args]));

    JsStmt.call(this, ast, true);
};

__.prototype = Object.create(JsStmt.prototype);
__.prototype.constructor = __;

module.exports = __;