/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

/**
 * Exposes JS built-in objects as modules.
 *
 * Created by spurcell on 3/6/17.
 */

var __ = function () {

};


/**
 * Registers the given module ID as a dependency.
 */
__.prototype.register = function (id) {

    // no-op; could optionally do some validation here
};


/**
 *
 */
__.prototype.getModules = function () {

    // todo - have a factory to create these wrapped methods

    return {

        Math: {

            $E: Math.E,

            $PI: Math.PI,

            $sin: function (task) {
                task.respond('reply', [Math.sin(task.args[0])]);
            },

            $cos: function (task) {
                task.respond('reply', [Math.cos(task.args[0])]);
            },

            $random: function (task) {
                task.respond('fail', ["naughty!"]);
            }
        }
    };
};


module.exports = __;

