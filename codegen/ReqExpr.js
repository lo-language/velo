/**
 * Created by spurcell on 6/25/16.
 */

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const JsStmt = require('./JsStmt');
const Response = require('./Response');

/**
 * Generates the code for *async* request expressions, which evaluate to futures.
 * Sync request expressions are turned into wrappers, which are request statements.
 *
 * @param address       JS part
 * @param args          array of JS parts
 */
var __ = function (address, args) {

    this.address = address;
    this.args = args;

    this.replyHandler = new JsFunction('res', new JsStmt());
    this.failHandler = new JsFunction('err', new Response("fail", [JS.ID('err')]));

    this.cont = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype._getAst = function () {

    return JS.runtimeCall('sendMessage', [
        this.address, JS.arrayLiteral(this.args), this.replyHandler, this.failHandler]);
};

__.prototype.renderTree = function () {

    return this._getAst().renderTree();
};

__.prototype.renderJs = function () {

    return this._getAst().renderJs();
};

module.exports = __;