/**
 * Wraps a deferred object that needs to be resolved by a barrier.
 *
 * Created by: spurcell
 * 2/21/15
 */

"use strict";

var __ = function (template) {

    // should a deferred have a wrapper? and/or a barrier?
    this.template = template;
};

/**
 * Renders the deferred by getting a temp var from the given barrier.
 *
 * @param env
 */
__.prototype.render = function (env) {

    // put something in the env

    return env.resolve(this.template.call(null, env));
};