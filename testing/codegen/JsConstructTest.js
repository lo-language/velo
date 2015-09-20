/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsConstruct = require('../../codegen/JsConstruct');
var SyncMessage = require('../../codegen/SyncMessage');

module.exports["construction"] = {

    "one part": function (test) {

        var expr = new JsConstruct('var x = args.shift();');

        test.equal(expr.render(), 'var x = args.shift();');
        test.done();
    },

    "several parts": function (test) {

        var expr = new JsConstruct(['var x = ', '42', ';']);

        test.equal(expr.render(), 'var x = 42;');
        test.done();
    },

    "csv annotations": function (test) {

        test.deepEqual(new JsConstruct([{csv: ['leeloo']}]).render(), 'leeloo');
        test.deepEqual(new JsConstruct([{csv: ['leeloo', 'dallas']}]).render(), 'leeloo, dallas');
        test.deepEqual(new JsConstruct(['leeloo', 'dallas', {csv: ['multi', 'pass']}]).render(), 'leeloodallasmulti, pass');
        test.deepEqual(new JsConstruct([{csv: ['leeloo', 'dallas', {csv: ['multi', 'pass']}]}]).render(), 'leeloo, dallas, multi, pass');

        test.deepEqual(new JsConstruct([{csv: [
            'corbin', 'dallas', ['leeloo', 'dallas', {csv: [
                'multi', 'pass']}]]}]).render(), 'corbin, dallas, leeloodallasmulti, pass');

        var expr = new JsConstruct(['{', {csv: [['foo', ':', '18'], ['bar', ':', '25']]}, '}']);

        test.equal(expr.render(), '{foo:18, bar:25}');

        test.done();
    },

    "nested constructs": function (test) {

        var expr = new JsConstruct(['(', new JsConstruct(['42']), ')']);

        test.equal(expr.render(), '(42)');
        test.done();
    },

    "block annotations": function (test) {

        var expr = new JsConstruct(['if (x == 42) ', {block: ['var z = 15;']}]);
        test.equal(expr.render(), 'if (x == 42) {var z = 15;}');


        expr = new JsConstruct(['if (x == 42) ', {block: ['var z = 15;\n', 'var y = 47;']}]);
        test.equal(expr.render(), 'if (x == 42) {var z = 15;\nvar y = 47;}');

        test.done();
    },

    "block annotations - pretty": function (test) {

        var expr = new JsConstruct(['if (x == 42) ', {block: ['var z = 15;']}]);

        test.equal(expr.render(true), 'if (x == 42) {\n\n    var z = 15;\n}');


        expr = new JsConstruct(['if (x == 42) ', {block: ['var z = 15;\n', 'var y = 47;']}]);

        test.equal(expr.render(true), 'if (x == 42) {\n\n    var z = 15;\n    var y = 47;\n}');

        test.done();
    }
};


module.exports["resolve"] = {

    "one part passthrough": function (test) {

        var expr = new JsConstruct('var x = args.shift();').resolve();

        test.equal(expr.render(), 'var x = args.shift();');
        test.done();
    },

    "several parts passthrough": function (test) {

        var expr = new JsConstruct(['var x = ', '42', ';']).resolve();

        test.equal(expr.render(), 'var x = 42;');
        test.done();
    },

    "one blocker": function (test) {

        var expr = new JsConstruct([new SyncMessage('$foo'), ' + ', '3']).resolve();

        test.equal(expr.render(), 'this.sendMessage($foo, [], function (P0) {P0 + 3}, null);\n\n');
        test.done();
    },

    "bare blocker": function (test) {

        var expr = new JsConstruct([new SyncMessage('$foo'), ';']).resolve();

        test.equal(expr.render(), 'this.sendMessage($foo, [], function (P0) {P0;}, null);\n\n');
        test.done();
    },

    "two blockers": function (test) {

        var expr = new JsConstruct([new SyncMessage('$foo'), ' + ', new SyncMessage('$bar')]).resolve();

        test.equal(expr.render(), "this.sendMessage($foo, [], function (P0) {this.sendMessage($bar, [], function (P1) {P0 + P1}, null);\n\n}, null);\n\n");
        test.done();
    },

    "can resolve within annotation objects": function (test) {

        var expr = new JsConstruct(['Math.min(', {csv: [new SyncMessage('$foo'), new SyncMessage('$bar')]}, ')']).resolve();

        test.equal(expr.render(), "this.sendMessage($foo, [], function (P0) {this.sendMessage($bar, [], function (P1) {Math.min(P0, P1)}, null);\n\n}, null);\n\n");
        test.done();
    },

    "resolves sets": function (test) {

        var expr = new JsConstruct(['{', {csv: [['foo', ':', '18'], ['bar', ':', '25']]}, '}']).resolve();

        test.equal(expr.render(), '{foo:18, bar:25}');
        test.done();
    },

    "nested blockers": function (test) {

        var expr = new JsConstruct([new SyncMessage('$foo', [new SyncMessage('$bar')]), ';']).resolve();

        test.equal(expr.render(), 'this.sendMessage($bar, [], function (P1) {this.sendMessage($foo, [P1], function (P0) {P0;}, null);\n\n}, null);\n\n');
        test.done();
    },

    "multiple nested blockers": function (test) {

        var expr = new JsConstruct([
            new SyncMessage('$foo', [
                new SyncMessage('$bar', [new SyncMessage('$baz')]),
                new SyncMessage('$quux', [new SyncMessage('$snux')])
            ]), ';']).resolve();

        test.equal(expr.render(), 'this.sendMessage($baz, [], function (P3) {this.sendMessage($bar, [P3], function (P1) {this.sendMessage($snux, [], function (P3) {this.sendMessage($quux, [P3], function (P2) {this.sendMessage($foo, [P1, P2], function (P0) {P0;}, null);\n\n}, null);\n\n}, null);\n\n}, null);\n\n}, null);\n\n');
        test.done();
    }
};

module.exports["build message"] = {

    "no handlers": function (test) {

        var msg = JsConstruct.buildMessage('$foo', []);

        test.equal(msg.render(), 'this.sendMessage($foo, [], null, null);\n\n');
        test.done();
    },

    "success handler": function (test) {

        var msg = JsConstruct.buildMessage('$foo', [], "x = 1;");

        test.equal(msg.render(), 'this.sendMessage($foo, [], function (args) {x = 1;}, null);\n\n');
        test.done();
    }
};