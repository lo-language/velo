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
var __ = function (cond, body) {

    this.cond = cond;
    this.body = body;
    this.next = null;

    // join the body to the wrapper function via setImmediate to form a loop in a way that won't break the stack
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

    // define a wrapper function called "loop"
    var stmt = new JsStmt(JS.letDecl('loop', new JsFunction([], cond)));

    // enter the loop
    return stmt.attach(new JsStmt(JS.exprStmt(JS.fnCall(JS.ID('loop'), []))));
};

module.exports = __;