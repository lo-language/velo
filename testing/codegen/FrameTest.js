/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

var Frame = require('../../codegen/Frame');

module.exports["basics"] = {

    'define var': function (test) {

        var scope = new Frame();

        scope.define('foo', true);

        test.equal(scope.getStatus('foo'), true);
        test.throws(function () {scope.getStatus('bar');});

        test.done();
    },

    'define arg': function (test) {

        var scope = new Frame();

        scope.defineArg('foo');

        test.equal(scope.getStatus('foo'), true);
        test.throws(function () {scope.getStatus('bar');});

        test.done();
    }
};

module.exports["child scope"] = {

    'define var in parent': function (test) {

        var parent = new Frame();

        parent.define('foo', true);

        var child = parent.bud();

        test.equal(parent.getStatus('foo'), true);

        // should be defined in the child as well
        test.equal(child.getStatus('foo'), true);
        test.throws(function () {child.getStatus('bar');});

        // define bar in the child
        child.defineArg('bar');
        test.equal(child.getStatus('bar'), true);

        // should not be defined in the parent
        test.throws(function () {parent.getStatus('bar');});

        test.done();
    }
};