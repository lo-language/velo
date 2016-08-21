/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Builds a Node executable from a program.
 *
 * Created by spurcell on 4/10/16.
 */

const Sourcer = require('./Sourcer');
const fs = require('fs');
const Q = require('q');

var __ = function () {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param program
 * @param path
 * @returns {promise}
 */
__.prototype.build = function (program, path) {

    var target = fs.createWriteStream(path);

    var d = Q.defer();

    // todo put runtime libs in one file

    target.on('open', function () {

        Q.denodeify(fs.readFile)(__dirname + '/../runtime/Task.js', 'utf8').then(code => {

            target.write(code);

            return Q.denodeify(fs.readFile)(__dirname + '/../runtime/IO.js', 'utf8');

        }).then(function (runtime) {

                var body = runtime + '\n\n' + program.render() +
                    '__.sendRootRequest(M0["main"], [process.args], function () {process.exit(0);}, function () {process.exit(1);});\n';

                target.write(body, function () {
                    target.end();
                })
            })
        });

    target.on('finish', function () {
        d.resolve();
    });

    return d.promise;
};

module.exports = __;
