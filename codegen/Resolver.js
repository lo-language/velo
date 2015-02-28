/**
 * A JsWrapper that renders its JS within a sync barrier (if necessary).
 *
 * Created by: spurcell
 * 2/21/15
 */

"use strict";

var JsWrapper = require('./JsWrapper');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param js    either a JsWrapper or a bare string
 * @private
 */
var __ = function (js) {

    this.numPromises = 0;
    this.promises = {};
    this.wrapped = js;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Resolves deferred expressions to a placeholder var.
 *
 * @param js    either a JsWrapper or a bare string
 */
__.prototype.resolve = function (js) {

    // if it's a literal JS expression, just pass through

    if (typeof js == 'string') {
        return js;
    }

    // if the JS is a deferred, we'll swap it with a placeholder var inside the resolver
    // and hold onto the original for rendering with the resolver later

    if (js.isDeferred) {

        var placeholder = 'ph' + this.numPromises;
        this.numPromises++;

        this.promises[placeholder] = js;
        return placeholder;
    }

    // convenience method
    if (Array.isArray(js)) {
        var self = this;
        return js.map(function (item) { return self.resolve(item); })
    }

    // otherwise just render the expression within the barrier
    return js.render(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sets a following statement.
 *
 * @param next    either a bare string or another resolver containing the next statement in a block
 */
__.prototype.setNext = function (next) {

    this.next = next;

    // be fluent
    return this;
};

__.prototype.renderNext = function () {

    if (typeof this.next == 'string') {
        return this.next;
    }

    return this.next.render();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the JS wrapped in a resolver if necessary.
 *
 * @return {*}
 */
__.prototype.render = function () {

    var js = (typeof this.wrapped == 'string') ?
        this.wrapped :
        this.wrapped.render(this);

    if (this.next) {
        js += '\n' + this.renderNext();
    }

    // if the JS had no deferreds, can just return it

    if (this.numPromises == 0) {
        return js;
    }

    // wrap the JS

    // in case there are sub-deferreds, we need to create a new resolver,
    // since each env can only resolve one layer of deferreds

    var self = this;
    var placeholders = Object.keys(this.promises);

    var resolver = new __(new JsWrapper(function (env) {

        var deferreds = placeholders.map(function (name) {
            return self.promises[name].render(env);
        });

        return 'Q.spread([' + deferreds.join(',') + '], function (' + placeholders.join(',') + ') {\n' + js + '\n}, result.reject);';
    }));

    return resolver.render();
};

module.exports = __;