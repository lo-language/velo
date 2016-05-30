/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Supplies our load-and-go behavior by loading compiled code into the current JS environment.
 *
 * Created by spurcell on 4/28/16.
 */

const Task = require('../runtime/Task');
const Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads the given context into our JS environment, ready to run.
 *
 * @param module
 */
var __ = function (module) {

    var body =
        "'use strict';\n\n" +
        module.render() +
        "\n\n console.log('running main');\n\n" +
        module.resolve('main') + '(rootTask);\n\n';

    try {
        this.main = new Function("rootTask", body);
    }
    catch (err) {
        console.log(body);
        throw err;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @returns {promise}
 */
__.prototype.run = function (args) {

    var d = Q.defer();

    Task.sendRootRequest(this.main, args, d.resolve.bind(d), d.reject.bind(d));

    return d.promise;
};

module.exports = __;