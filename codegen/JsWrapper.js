/**
 * Wraps a JS expression to provide a synchronization barrier if needed.
 *
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var SyncEnv = require('./SyncEnv');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param template
 * @param deferred
 * @private
 */
var __ = function (template, deferred) {

    // should we instead have a deferred wrapper class?
    // and have it implement different render functions?
    // or have it support asStatement whereas vanilla JSWrapper wouldn't?

    this.template = template;
    this.deferred = deferred;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the JS expression in the given environment, or a syncbarrier if none given.
 *
 * Should we instead have two methods, to explicitly separate rendering as a stmt from rendering as an expr?
 * I suspect something will force that in not too long.
 *
 * could also have options for pretty-printing here
 *
 * @outerEnv
 * @return {String}
 */
__.prototype.render = function (outerEnv) {

    var env = new SyncEnv();

    // render the template in the given environment - this loads up the env with sync mappings
    var js = typeof this.template == 'string' ? this.template : this.template.call(null, env);

    if (this.next) {
        js += '\n' + this.next.render(outerEnv);
    }

    if (outerEnv) {

        // we have to "wrap" the outer env so that async calls are made from the inside out
        outerEnv.setWrapper(env);

        return js;
    }

    // renders a synchronization barrier if necessary
    return env.render(js);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * If this wrapper is wrapping something deferred
 *
 * @param next  A JsWrapper for the next statement
 * @return {*}
 */
__.prototype.continue = function (next) {

    this.next = next;

    return this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a statement form of the wrapped JS.
 * Not every expr can be rendered as a statement, might want to make a subclass here.
 *
 * @return {*}
 */
__.prototype.asStatement = function () {

    var self = this;

    return new __(function (env) {
        return self.render(env) + ';'
    });
};

module.exports = __;