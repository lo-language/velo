/**
 * Created by spurcell on 6/25/16.
 */

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const JsStmt = require('./JsStmt');

/**
 * A while statement with an async body. Attaching statements to it stuffs them inside a callback.
 *
 * @param cond
 * @param body
 * @private
 */
var __ = function (cond, body, wrapper) {

    JsStmt.call(this);
    
    this.cond = cond;
    this.body = body;
    this.wrapper = wrapper;

    this.next = null;

    // join the body to the wrapper function via setImmediate to form a loop in a way that won't break the stack
    // (this is me trying to emulate tail-recursion)
    this.body.attach(new JsStmt(JS.exprStmt(
        JS.fnCall(JS.ID("setImmediate"), [JS.runtimeCall('doAsync', [JS.ID('loop')])]))));
};

__.prototype = Object.create(JsStmt.prototype);
__.prototype.constructor = __;

/**
 */
__.prototype._getAst = function () {

    // see if there's a next statement
    var cond = this.next ? JS.cond(this.cond, this.body, this.next) : JS.cond(this.cond, this.body);

    var loopDecl = new JsStmt(JS.letDecl('loop', JS.fnDef([], this.wrapper.wrap(new JsStmt(cond)))));

    return loopDecl.attach(new JsStmt(JS.exprStmt(JS.fnCall(JS.ID('loop'), []))));
};

module.exports = __;