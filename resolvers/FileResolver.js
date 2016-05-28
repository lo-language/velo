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

var __ = function (basePath) {

    this.basePath = basePath;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Resolves the given module reference into Exa source.
 *
 * @param ref
 * @return {String}
 */
__.prototype.resolve = function (ref) {

    var path = this.basePath + '/' + ref + '.exa';

    // load the source
    return Q(path).then(
        function (fullPath) {

            console.log("reading " + path);

            // read the file
            return Q.denodeify(fs.readFile)(fullPath, 'utf8');
        },
        function () {
            throw new Error("couldn't find module " + path);
        }
    );
};

module.exports = __;

