/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Supplies our load-and-go behavior by loading compiled code into the JS environment, ready to run.
 *
 * Created by spurcell on 4/28/16.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads the given context into our JS environment, ready to run.
 *
 * @param ctx
 * @returns {Function}
 */
module.exports.load = function (ctx) {

    // todo slap the runtime in here?

    var body = "'use strict';\n\n" + this.modules.map(scope => {
        return scope.services.join("\n\n");

    }).join("\n\n") + "\n\n console.log('running main');\n\n" + main.resolve('main') + '(rootTask);\n\n';

    try {
        // console.log(body);
        return new Function("rootTask", body);
    }
    catch (err) {
        console.log(body);
        throw err;
    }
};
