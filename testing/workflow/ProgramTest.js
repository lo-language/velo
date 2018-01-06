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

        var program = new Program('rootModule');

        program.acquire('missing').catch(function (err) {
            test.done();
        });
    },

    "success": function (test) {

        var program = new Program('rootModule', __dirname + '/../programs');

        var path = 'fail.lo';
        var module = new LoModule(path);

        program.acquire(module).then(function (module) {

            // should have stashed the module
            var modules = program.getModules();

            test.deepEqual(Object.keys(modules), [module.ref]);
            test.ok(module instanceof LoModule);
            test.equal(modules[module.ref], module);
            test.ok(module.mark == undefined);

            // mark the module
            modules[module.ref].mark = true;

            // test idempotency
            return program.acquire(module);
        }).then(function (module) {

            // should not have reacquired the module
            var modules = program.getModules();

            test.deepEqual(Object.keys(modules), [module.ref]);
            test.ok(module instanceof LoModule);
            test.equal(modules[module.ref], module);
            test.ok(module.mark);

            test.done();
        });
    },

    "resolve deps with cycles": function (test) {

        var program = new Program('main.lo', __dirname);

        program.acquire(program.rootModule).then(function () {

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

        var program = new Program('factorial.lo', __dirname + '/../programs');

        program.run([10]).then(function (result) {
            test.deepEqual(result, [ 3628800 ]);
            test.done();
        });
    }
};