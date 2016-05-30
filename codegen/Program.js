/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Models an Exa program, which is mostly a service space.
 */

'use strict';

const Module = require('./../codegen/Module');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Constructor
 */
var __ = function (sourcer) {

    this.sourcer = sourcer;
    this.modules = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Incorporates the specified module into this program.
 *
 * @param modRef    module reference
 * @returns         promise for a module ID
 */
__.prototype.include = function (modRef) {

    // todo check module cache here!

    return this.sourcer.acquire(modRef).then(module => {

        var id = this.modules.length;

        return module.compileSelf(this).then(result => {

            this.modules.push(result);

            return id;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Builds the program target code.
 *
 * @returns {string}
 */
__.prototype.render = function () {

    // render each module in the graph

    // services are constants defined in a shared namespace for all modules


    return this.modules.map((def, index) => {

            var id = "S" + index;

            // todo put the const name in as the fn name for JS
            return "const " + id + " = " + def.render() + ";";
        }
        ).join("\n\n");
};

module.exports = __;