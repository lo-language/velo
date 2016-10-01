/**
 * Created by spurcell on 6/25/16.
 */

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const JsStmt = require('./JsStmt');

/**
 * A Request is a special kind of statement that attaching things to puts them inside it rather than after it.
 *
 * todo support properly async requests
 *
 * @param address       JS part
 * @param args          array of JS parts
 * @param replyHandler  JsFunction
 * @param failHandler   JsFunction
 * @param async
 */
var __ = function (address, args, replyHandler, failHandler, async) {

    this.address = address;
    this.args = args;
    this.replyHandler = replyHandler;
    this.failHandler = failHandler;
    this.async = async || false;

    this.ast = JS.runtimeCall('sendMessage', [
        this.address,
        JS.arrayLiteral(this.args)].concat(replyHandler ? replyHandler : [JS.NULL]).concat(failHandler ? failHandler : []));

    if (this.async) {
        this.ast = JS.exprStmt(this.ast);
    }
};

__.prototype = Object.create(JsStmt.prototype);
__.prototype.constructor = __;


__.prototype.getReplyHandler = function () {
    return this.replyHandler;
};

__.prototype.setReplyHandler = function (handler) {

    this.replyHandler = handler;

    this.ast = JS.runtimeCall('sendMessage', [this.address, JS.arrayLiteral(this.args)].concat(this.replyHandler ? this.replyHandler : []));

    if (this.async) {
        this.ast = JS.exprStmt(this.ast);
    }
};


/**
 * Overrides base class to attach statements to its reply handler's body.
 *
 * @param stmt
 * @returns this    fluent interface
 */
__.prototype.attach = function (stmt) {

    if (this.async == false) {
        return JsStmt.prototype.attach.call(this, stmt);
    }

    // if we have a replyHandler, extend it, otherwise create one

    if (this.replyHandler == null) {
        // this.replyHandler = new JsFunction('res', stmt);
        // this.ast = JS.exprStmt(JS.runtimeCall('sendMessage', [this.address, JS.arrayLiteral(this.args), this.replyHandler]));
    }
    else {
        this.replyHandler.append(stmt);
    }

    return this;
};

module.exports = __;