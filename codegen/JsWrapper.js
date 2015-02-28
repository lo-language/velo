/**
 * Wraps a chunk of JS.
 *
 * Created by: spurcell
 * 2/21/15
 */

"use strict";

var __ = function (template, isDeferred) {

    this.template = template;
    this.isDeferred = isDeferred;
};

/**
 * Renders the template using the given resolver.
 */
__.prototype.render = function (resolver) {

    if (typeof this.template == 'string') {
        return this.template;
    }

    if (resolver === undefined) {
        throw new Error("need a resolver to render JS");
    }

    return this.template.call(null, resolver);
};

module.exports = __;
