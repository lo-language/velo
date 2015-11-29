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
        test.equal(expr.async, false);
        test.done();
    },

    "several parts": function (test) {

        var expr = new JsConstruct(['var x = ', '42', ';']);

        test.equal(expr.render(), 'var x = 42;');
        test.equal(expr.async, false);
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
        test.equal(expr.async, false);
        test.done();
    },

    "nested constructs": function (test) {

        var expr = new JsConstruct(['(', new JsConstruct(['42']), ')']);

        test.equal(expr.render(), '(42)');
        test.equal(expr.async, false);
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

        var expr = new JsConstruct(['var x = args.shift();']).resolve();

        test.equal(expr.render(), 'var x = args.shift();');
        test.equal(expr.async, false);
        test.done();
    },

    "several parts passthrough": function (test) {

        var expr = new JsConstruct(['var x = ', '42', ';']).resolve();

        test.equal(expr.render(), 'var x = 42;');
        test.equal(expr.async, false);
        test.done();
    },

    "one blocker": function (test) {

        var expr = new JsConstruct([new SyncMessage('$foo'), ' + ', '3']).resolve();

        test.equal(expr.render(), 'task.sendMessage($foo, [], function (P0) {P0 + 3}, null, true);\n\n');
        test.equal(expr.async, true);
        test.done();
    },

    "bare blocker": function (test) {

        var expr = new JsConstruct([new SyncMessage('$foo'), ';']).resolve();

        test.equal(expr.render(), 'task.sendMessage($foo, [], function (P0) {P0;}, null, true);\n\n');
        test.equal(expr.async, true);
        test.done();
    },

    "two blockers": function (test) {

        var expr = new JsConstruct([new SyncMessage('$foo'), ' + ', new SyncMessage('$bar')]).resolve();

        test.equal(expr.render(), "task.sendMessage($foo, [], function (P0) {task.sendMessage($bar, [], function (P1) {P0 + P1}, null, true);\n\n}, null, true);\n\n");
        test.equal(expr.async, true);
        test.done();
    },

    "can resolve within annotation objects": function (test) {

        var expr = new JsConstruct(['Math.min(', {csv: [new SyncMessage('$foo'), new SyncMessage('$bar')]}, ')']).resolve();

        test.equal(expr.render(), "task.sendMessage($foo, [], function (P0) {task.sendMessage($bar, [], function (P1) {Math.min(P0, P1)}, null, true);\n\n}, null, true);\n\n");
        test.equal(expr.async, true);
        test.done();
    },

    "resolves sets": function (test) {

        var expr = new JsConstruct(['{', {csv: [['foo', ':', '18'], ['bar', ':', '25']]}, '}']).resolve();

        test.equal(expr.render(), '{foo:18, bar:25}');
        test.equal(expr.async, false);
        test.done();
    },

    "nested blockers": function (test) {

        var expr = new JsConstruct([new SyncMessage('$foo', [new SyncMessage('$bar')]), ';']).resolve();

        test.equal(expr.render(), 'task.sendMessage($bar, [], function (P0) {task.sendMessage($foo, [P0], function (P0) {P0;}, null, true);\n\n}, null, true);\n\n');
        test.equal(expr.async, true);
        test.done();
    },

    "multiple nested blockers": function (test) {

        var expr = new JsConstruct([
            new SyncMessage('$foo', [
                new SyncMessage('$bar', [new SyncMessage('$baz')]),
                new SyncMessage('$quux', [new SyncMessage('$snux')])
            ]), ';']).resolve();

        test.equal(expr.render(), 'task.sendMessage($baz, [], function (P0) {task.sendMessage($snux, [], function (P1) {task.sendMessage($bar, [P0], function (P0) {task.sendMessage($quux, [P1], function (P1) {task.sendMessage($foo, [P0, P1], function (P0) {P0;}, null, true);\n\n}, null, true);\n\n}, null, true);\n\n}, null, true);\n\n}, null, true);\n\n');
        test.equal(expr.async, true);
        test.done();
    }
};

module.exports["attach"] = {

    "sync head and tail": function (test) {

        var a = new JsConstruct('var x = args.shift();');
        var b = new JsConstruct('var y = args.shift();');

        a.attach(b);

        test.equal(a.render(), 'var x = args.shift();var y = args.shift();');
        test.equal(a.async, false);
        test.done();
    },

    "sync head async tail": function (test) {

        var a = new JsConstruct('var x = args.shift();');
        var b = new JsConstruct('task.sendMessage([], function (p0) {p0;', '});');

        a.attach(b);

        test.equal(a.render(), 'var x = args.shift();task.sendMessage([], function (p0) {p0;});');
        test.equal(a.async, true);
        test.done();
    },

    "async head sync tail": function (test) {

        var a = new JsConstruct('task.sendMessage([], function (p0) {p0;', '});');
        var b = new JsConstruct('var x = args.shift();');

        a.attach(b);

        test.equal(a.render(), 'task.sendMessage([], function (p0) {p0;var x = args.shift();});');
        test.equal(a.async, true);
        test.done();
    },

    "async head and tail": function (test) {

        var a = new JsConstruct('task.sendMessage([], function (p0) {p0;', '});');
        var b = new JsConstruct('task.sendMessage([], function (p1) {p1;', '});');

        a.attach(b);

        test.equal(a.render(), 'task.sendMessage([], function (p0) {p0;task.sendMessage([], function (p1) {p1;});});');
        test.equal(a.async, true);
        test.done();
    },

    "triple threat": function (test) {

        var a = new JsConstruct('task.sendMessage([], function (p0) {p0;', '});');
        var b = new JsConstruct('task.sendMessage([], function (p1) {p1;', '});');
        var c = new JsConstruct('task.sendMessage([], function (p2) {p2;', '});');

        // the compiler would do them in this order
        b.attach(c);
        a.attach(b);

        test.equal(a.render(), 'task.sendMessage([], function (p0) {p0;task.sendMessage([], function (p1) {p1;task.sendMessage([], function (p2) {p2;});});});');
        test.equal(a.async, true);
        test.done();
    }
};

module.exports["build message"] = {

    "no handlers": function (test) {

        var msg = JsConstruct.buildMessage('$foo', []);

        test.equal(msg.render(), 'task.sendMessage($foo, [], null, null);\n\n');
        //test.equal(msg.isSync(), false);
        test.done();
    },

    "success handler": function (test) {

        var msg = JsConstruct.buildMessage('$foo', [], "x = 1;", null, 'scragh', 'args');

        test.equal(msg.render(), 'task.sendMessage($foo, [], function (scragh) {x = 1;}, null);\n\n');
        //test.equal(msg.isSync(), false);
        test.done();
    },

    "sync wrapper": function (test) {

        var msg = JsConstruct.buildMessage('$foo', [], "x = 1;", null, 'scragh', 'args');

        test.equal(msg.render(), 'task.sendMessage($foo, [], function (scragh) {x = 1;}, null);\n\n');
        //test.ok(msg.isSync());
        test.done();
    }
};