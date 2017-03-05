/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const fs = require('fs');
const Q = require('q');
const ASTBuilder = require('./../parser/ASTBuilder');
const Module = require('./../constructs/Module');


var __ = function (basePath) {

    this.basePath = basePath;
};


/**
 * Acquires the specified module as an AST, ready to compile.
 *
 * @param namespace
 * @param name
 * @return {Module}
 */
__.prototype.acquire = function (namespace, name) {

    // see if the modref is a built-in

    if (namespace == 'JS') {

        if (name == 'Math') {

            // HACK ALERT!
            return Q().then(function () {

                var mod = new Module([]);

                mod.load = function () {

                    return {

                        $E: Math.E,

                        $PI: Math.PI,

                        $sin: function (task) {
                            task.respond('reply', [Math.sin(task.args[0])]);
                        },

                        $cos: function (task) {
                            task.respond('reply', [Math.cos(task.args[0])]);
                        },

                        $random: function (task) {
                            task.respond('fail', ["naughty!"]);
                        }
                    };
                };

                return mod;
            });
        }
    }

    var path = this.basePath + '/' + name + '.lo';

    // read the file
    return Q.denodeify(fs.readFile)(path, 'utf8').then(source => {

        process.stderr.write("PARSING   " + name);

        var start = new Date();
        var module = new ASTBuilder().parse(source);

        module.setName(name);

        process.stderr.write(" [" + (new Date().getTime() - start.getTime()) + "ms]\n");

        return module;
    },

    function () {
        throw new Error("couldn't find module " + path);
    });
};

module.exports = __;

