/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 1/2/18.
 */

"use strict";

const LoModule = require('../../LoModule');
const LoContext = require('../../compiler/LoContext');
const JsWriter = require('../../codegen/JsWriter');
const Program = require('../../Program');

module.exports["acquire"] = {

    "fails on missing module": function (test) {

        var program = new Program({name: 'rootModule'});

        program.acquire('missing').catch(function (err) {
            test.done();
        });
    },

    "success": function (test) {

        var program = new Program({name: 'rootModule'});
        program.sourceDir = __dirname + '/../programs/';

        var path = 'fail.lo';
        var ref = '__local::fail.lo';
        var modName = {name: path, ref: ref};

        program.acquire(modName).then(function (module) {

            // should have stashed the module
            var modules = program.getModules();

            test.deepEqual(Object.keys(modules), [ref]);
            test.ok(module instanceof LoModule);
            test.equal(modules[ref], module);
            test.ok(module.mark == undefined);

            // mark the module
            modules[ref].mark = true;

            return program.acquire(modName);
        }).then(function (module) {

            // should not have reacquired the module
            var modules = program.getModules();

            test.deepEqual(Object.keys(modules), [ref]);
            test.ok(module instanceof LoModule);
            test.equal(modules[ref], module);
            test.ok(module.mark);

            test.done();
        });
    },

    "resolve deps with cycles": function (test) {

        var modName = {name: 'main.lo', ref: '__local::main.lo'};
        var program = new Program(modName);
        program.sourceDir = __dirname + '/';

        program.acquire(modName).then(function () {

            test.deepEqual(Object.keys(program.getModules()).sort(), [
                '__local::main.lo',
                '__local::modA.lo',
                '__local::modB.lo',
                '__local::modC.lo' ]);
            test.done();
        });
    }
};


module.exports["run"] = {

    "basic success": function (test) {

        var program = new Program({name: '../programs/fail.lo', ref: '__local::../programs/fail.lo'});
        program.sourceDir = __dirname + '/';


        program.compile().then(function () {
            test.done();
        });
    }
};