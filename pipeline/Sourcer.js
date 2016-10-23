/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Created by spurcell on 4/10/16.
 */

const fs = require('fs');
const Q = require('q');
const Module = require('../codegen/Module');

////////////////////////////////////////////////////////////////////////////////////////////////////

var __ = function (basePath) {

    this.basePath = basePath;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Acquires the specified module.
 *
 * @param modRef
 * @return {String}
 */
__.prototype.acquire = function (modRef) {

    var path = this.basePath + '/' + modRef + '.lo';

    // read the file
    return Q.denodeify(fs.readFile)(path, 'utf8').then(source => {
        return new Module(source, modRef);
    },

    function () {
        throw new Error("couldn't find module " + path);
    });
};

module.exports = __;

