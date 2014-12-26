/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../codegen/Context');
var util = require('util');

module.exports["basics"] = {

    "defines builtins as ready": function (test) {

        var context = new Context();

        test.ok(context.isValue('recur'));
        test.ok(context.isValue('reply'));
        test.ok(context.isValue('fail'));

        test.equal(context.isValue('foo'), false);
        test.equal(context.isPromise('foo'), false);

        test.done();
    },

    "define value": function (test) {

        var context = new Context();

        context.defineValue('foo');

        test.ok(context.isValue('foo'));
        test.equal(context.isPromise('foo'), false);
        test.done();
    },

    "define promise": function (test) {

        var context = new Context();

        context.definePromise('foo');

        test.ok(context.isPromise('foo'));
        test.equal(context.isValue('foo'), false);
        test.done();
    }
};
