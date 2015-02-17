/**
 * Wraps a JS expression to provide a synchronization barrier if needed.
 *
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var SyncEnv = require('./SyncEnv');

/**
 *
 * @param template
 * @param deferred
 * @private
 */
var __ = function (template, deferred) {

    this.template = template;
    this.deferred = deferred;
};

/**
 * Renders the JS expression in the given environment, or a syncbarrier if none given.
 *
 * @outerEnv
 * @return {String}
 */
__.prototype.render = function (outerEnv) {

    var env = new SyncEnv();

    // render the template in the given environment
    // this loads up the env with sync mappings
    var js = this.template.call(null, env);

    if (outerEnv) {

        // we have to "wrap" the outer env so that async calls are made from the inside out
        outerEnv.setWrapper(env);

        return js;
    }

    // renders a synchronization barrier if necessary
    return env.render(js);
};

module.exports = __;