/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Created by spurcell on 4/10/16.
 */

const fs = require('fs');
const Q = require('q');
const ASTBuilder = require('./../parser/ASTBuilder');


////////////////////////////////////////////////////////////////////////////////////////////////////

var __ = function (basePath) {

    this.basePath = basePath;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Acquires the specified module.
 *
 * @param modRef
 * @return {Module}
 */
__.prototype.acquire = function (modRef) {

    var path = this.basePath + '/' + modRef + '.lo';

    // read the file
    return Q.denodeify(fs.readFile)(path, 'utf8').then(source => {

        process.stderr.write("PARSING   " + this.name);
        var start = new Date();
        var module = new ASTBuilder().parse(source);
        process.stderr.write(" [" + (new Date().getTime() - start.getTime()) + "ms]\n");

        return module;
    },

    function () {
        throw new Error("couldn't find module " + path);
    });
};

module.exports = __;

