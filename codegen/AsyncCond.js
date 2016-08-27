/**
 * Created by spurcell on 6/25/16.
 */

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const JsStmt = require('./JsStmt');

/**
 * A while statement with an async body. Attaching statements to it stuffs them inside a callback.
 *
 * @param pred      predicate expr
 * @param cons      consequent stmt
 * @param alt       alternate stmt
 * @param wrapper   async wrapper
 * @private
 */
var __ = function (pred, cons, alt, wrapper) {

    JsStmt.call(this);

    this.pred = pred;
    this.cons = cons;
    this.alt = alt;
    this.wrapper = wrapper;

    this.next = null;

    this.async = true;

    // todo make utility for defining continuations in a context?
    // how do we manage loop/continuation names??

};

__.prototype = Object.create(JsStmt.prototype);
__.prototype.constructor = __;

/**
 */
__.prototype._getAst = function () {

    if (this.next) {

        // create a continuation for the following statements
        var contDecl = new JsStmt(JS.letDecl('cont', JS.fnDef([], this.next)));

        if (this.alt == null) {
            this.alt = new JsStmt();
        }

        // add continuation call to tip of both branches
        this.cons.attach(new JsStmt(JS.exprStmt(JS.fnCall(JS.ID('cont'), []))));
        this.alt.attach(new JsStmt(JS.exprStmt(JS.fnCall(JS.ID('cont'), []))));

        // put the continuation def inside the wrapper
        return this.wrapper.wrap(contDecl.attach(JsStmt.cond(this.pred, this.cons, this.alt)));
    }

    // we're the tip; don't need to bother with a continuation
    return this.wrapper.wrap(JsStmt.cond(this.pred, this.cons, this.alt));
};

module.exports = __;