/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Created by spurcell on 4/10/16.
 */

const fs = require('fs');
const Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param ctx
 * @returns {*}
 */
__.prototype.buildFile = function (ctx) {

    // todo slap the runtime in there

    return this.compile(path).then(main => {

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
    });
};

module.exports = __;

