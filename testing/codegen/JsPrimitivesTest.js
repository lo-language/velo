/**
 * Created by spurcell on 8/6/16.
 */

const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');

module.exports['basics'] = {

    "null": function (test) {

        var n = JS.NULL;

        test.deepEqual(n.getTree(), ['null']);
        test.equal(n.getJs(), 'null');

        test.done();
    },

    "use strict": function (test) {

        var n = JS.USE_STRICT;

        test.deepEqual(n.getTree(), ['use-strict']);
        test.equal(n.getJs(), "'use strict';\n");

        test.done();
    },

    "ID": function (test) {

        var n = JS.ID('snooks');

        test.deepEqual(n.getTree(), ['id', 'snooks']);
        test.equal(n.getJs(), "snooks");

        test.done();
    },

    "bool": function (test) {

        var n = JS.bool('true');

        test.deepEqual(n.getTree(), ['bool', 'true']);
        test.equal(n.getJs(), "true");

        test.done();
    },

    "num": function (test) {

        var n = JS.num('7');

        test.deepEqual(n.getTree(), ['num', '7']);
        test.equal(n.getJs(), "7");

        test.done();
    },

    "string": function (test) {

        var n = JS.string('digga digga doo');

        test.deepEqual(n.getTree(), ['string', 'digga digga doo']);
        test.equal(n.getJs(), "'digga digga doo'");

        test.done();
    },

    "string with quotes": function (test) {

        var n = JS.string("I'm ok");

        test.deepEqual(n.getTree(), ['string', "I'm ok"]);
        test.equal(n.getJs(), "'I\\'m ok'");

        test.done();
    },

    "array literal": function (test) {

        var n = JS.arrayLiteral([JS.ID('foo'), JS.num('42')]);

        test.deepEqual(n.getTree(), ['arrayLiteral', [['id', 'foo'], ['num', '42']]]);
        test.equal(n.getJs(), "[foo, 42]");

        test.done();
    },

    "obj literal": function (test) {

        var n = JS.objLiteral([[JS.string('foo'), JS.num('42')], [JS.string('bar'), JS.num('57')]]);

        test.deepEqual(n.getTree(), ['objLiteral', [
            [['string', 'foo'], ['num', '42']],
            [['string', 'bar'], ['num', '57']]]]);
        test.equal(n.getJs(), "{'foo': 42,'bar': 57}");

        test.done();
    },

    "subscript": function (test) {

        var n = JS.subscript(JS.ID('foo'), JS.ID('length'));

        test.deepEqual(n.getTree(), ['subscript', ['id', 'foo'], ['id', 'length']]);
        test.equal(n.getJs(), "foo[length]");

        test.done();
    },

    "select": function (test) {

        var n = JS.select(JS.ID('foo'), 'length');

        test.deepEqual(n.getTree(), ['select', ['id', 'foo'], 'length']);
        test.equal(n.getJs(), "foo.length");

        test.done();
    }
};

module.exports["operators"] = {

    "logicalAnd": function (test) {

        var n = JS.logicalAnd(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.getTree(), [ '&&', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.getJs(), "foo && bar");

        test.done();
    },

    "logicalOr": function (test) {

        var n = JS.logicalOr(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.getTree(), [ '||', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.getJs(), "foo || bar");

        test.done();
    },

    "strict equal": function (test) {

        var n = JS.strictEqual(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.getTree(), [ 'strict-equal', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.getJs(), "foo === bar");

        test.done();
    },

    "add": function (test) {

        var n = JS.add(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.getTree(), [ 'add', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.getJs(), "(foo + bar)");

        test.done();
    },

    "sub": function (test) {

        var n = JS.sub(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.getTree(), [ 'sub', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.getJs(), "(foo - bar)");

        test.done();
    },

    "mul": function (test) {

        var n = JS.mul(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.getTree(), [ 'mul', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.getJs(), "(foo * bar)");

        test.done();
    },

    "div": function (test) {

        var n = JS.div(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.getTree(), [ 'div', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.getJs(), "(foo / bar)");

        test.done();
    },

    "mod": function (test) {

        var n = JS.mod(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.getTree(), [ 'mod', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.getJs(), "(foo % bar)");

        test.done();
    },

    "inc": function (test) {

        var n = JS.inc(JS.ID('foo'));

        test.deepEqual(n.getTree(), [ 'inc', [ 'id', 'foo' ] ]);
        test.equal(n.getJs(), "(foo++)");

        test.done();
    },

    "dec": function (test) {

        var n = JS.dec(JS.ID('foo'));

        test.deepEqual(n.getTree(), [ 'dec', [ 'id', 'foo' ] ]);
        test.equal(n.getJs(), "(foo--)");

        test.done();
    },

    "not": function (test) {

        var n = JS.not(JS.ID('foo'));

        test.deepEqual(n.getTree(), [ 'not', [ 'id', 'foo' ] ]);
        test.equal(n.getJs(), "(!foo)");

        test.done();
    },

    "assign": function (test) {

        var n = JS.assign(JS.ID('foo'), JS.num('57'));

        test.deepEqual(n.getTree(), [ 'assign', [ 'id', 'foo' ], [ 'num', '57' ] ]);
        test.equal(n.getJs(), "foo = 57");

        test.done();
    },

    "mul assign": function (test) {

        var n = JS.mulAssign(JS.ID('foo'), JS.num('57'));

        test.deepEqual(n.getTree(), [ 'mul-assign', [ 'id', 'foo' ], [ 'num', '57' ] ]);
        test.equal(n.getJs(), "foo *= 57");

        test.done();
    }
};

module.exports["cn calls"] = {

    "fn call with one arg": function (test) {

        var n = JS.fnCall(JS.ID('foo'), [JS.num('57')]);

        test.deepEqual(n.getTree(), [ 'call', [ 'id', 'foo' ], [ [ 'num', '57' ] ] ]);
        test.equal(n.getJs(), "foo(57)");

        test.done();
    },

    "fn call with no args": function (test) {

        var n = JS.fnCall(JS.ID('foo'), []);

        test.deepEqual(n.getTree(), [ 'call', [ 'id', 'foo' ], [ ] ]);
        test.equal(n.getJs(), "foo()");

        test.done();
    },

    "fn call with several args": function (test) {

        var n = JS.fnCall(JS.ID('foo'), [JS.num('57'), JS.add(JS.ID('bar'), JS.ID('baz'))]);

        test.deepEqual(n.getTree(), [ 'call',
            [ 'id', 'foo' ],
            [ [ 'num', '57' ], [ 'add', [ 'id', 'bar' ], [ 'id', 'baz' ] ] ] ]);
        test.equal(n.getJs(), "foo(57, (bar + baz))");

        test.done();
    }
};

module.exports["fn defs"] = {

    "anonymous fn def": function (test) {

        var n = JS.fnDef(['bar', 'baz'], new JsStmt(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz')))));

        test.deepEqual(n.getTree(), [ 'function', null,
            [ 'bar', 'baz' ],
            [ 'stmtList', [ 'expr-stmt', [ 'assign', [ 'id', 'bar' ], [ 'id', 'baz' ] ] ] ] ]);
        test.equal(n.getJs(), "function (bar, baz) {\n\nbar = baz;\n}");

        test.done();
    },

    "named fn def": function (test) {

        var n = JS.fnDef(['bar', 'baz'], new JsStmt(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz')))), 'foo');

        test.deepEqual(n.getTree(), [ 'function', 'foo',
            [ 'bar', 'baz' ],
            [ 'stmtList', [ 'expr-stmt', [ 'assign', [ 'id', 'bar' ], [ 'id', 'baz' ] ] ] ] ]);
        test.equal(n.getJs(), "function (bar, baz) {\n\nbar = baz;\n}");

        test.done();
    }
};

module.exports["statements"] = {

    "var declaration": function (test) {

        var n = JS.varDecl('baz');

        test.deepEqual(n.getTree(), [ 'var', 'baz' ]);
        test.equal(n.getJs(), "var baz;");

        // with initializer

        n = JS.varDecl('fish', JS.string("Lauwiliwilinukunuku'oio'oi"));

        test.deepEqual(n.getTree(), [ 'var', 'fish', [ 'string', "Lauwiliwilinukunuku'oio'oi" ] ]);
        test.equal(n.getJs(), "var fish = 'Lauwiliwilinukunuku\\'oio\\'oi';");

        test.done();
    },

    "const declaration": function (test) {

        var n = JS.constDecl('pi', JS.num('3.14159'));

        test.deepEqual(n.getTree(), [ 'const', 'pi', [ 'num', '3.14159' ] ]);
        test.equal(n.getJs(), "const pi = 3.14159;");

        test.done();
    },

    "return": function (test) {

        var n = JS.return(JS.ID('baz'));

        test.deepEqual(n.getTree(), [ 'return', [ 'id', 'baz' ] ]);
        test.equal(n.getJs(), "return baz;");

        test.done();
    },

    "expr stmt": function (test) {

        var n = JS.exprStmt(JS.assign(JS.ID('baz'), JS.num('48')));

        test.deepEqual(n.getTree(), [ 'expr-stmt', [ 'assign', [ 'id', 'baz' ], [ 'num', '48' ] ] ]);
        test.equal(n.getJs(), "baz = 48;");

        test.done();
    },

    "stmt list": function (test) {

        var n = JS.stmtList(
            JS.exprStmt(JS.assign(JS.ID('foo'), JS.ID('bar'))),
            JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz')))));

        test.deepEqual(n.getTree(), [ 'stmtList',
            [ 'expr-stmt', [ 'assign', [ 'id', 'foo' ], [ 'id', 'bar' ] ] ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', 'bar' ], [ 'id', 'baz' ] ] ] ] ]);

        test.equal(n.getJs(), "foo = bar;\nbar = baz;");

        test.done();
    }
};