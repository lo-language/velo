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
 * The Lo standard library
 *
 * Created by spurcell on 8/19/17.
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

        String: {

            // params: string, delimiter
            // returns: array

            $split: function (args, succ, fail) {

                // we want to return an array of one element, which is an array of strings
                succ([String(args[0]).split("\n")]);
            }
        }
    };
};


module.exports = __;

