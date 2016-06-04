/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Models an Exa program, which is mostly a collection of modules and an address space for services.
 * Also supplies our load-and-go behavior by loading compiled code into the current JS environment.
 *
 * Author: Seth Purcell
 * Date: 5/28/16
 */

'use strict';

const Module = require('../codegen/Module');
const Task = require('../runtime/Task');
const Q = require('q');

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

        // module ID is its index in our list
        module.id = 'M' + this.modules.length;

        return module.compileSelf(this).then(result => {

            this.modules.push(result);

            return module;
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

    // render each module in the program

    return this.modules.map((def, index) => {

        // todo put the const name in as the fn name for JS
        return "const " + "M" + index + " = " + def.render() + "();";
    }
    ).join("\n\n");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads and runs this program.
 */
__.prototype.run = function (args) {

    var body =
        "'use strict';\n\n" +
        this.render() +
        '\n\nM0["main"](rootTask);\n\n';

    try {
        // console.log(body);
        var main = new Function("rootTask", body);

        var d = Q.defer();

        Task.sendRootRequest(main, args, d.resolve.bind(d), d.reject.bind(d));

        return d.promise;
    }
    catch (err) {
        console.log(body);
        throw err;
    }
};

module.exports = __;