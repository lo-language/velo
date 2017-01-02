/**
 * Created by spurcell on 8/6/16.
 */

const JS = require('../../codegen/JsPrimitives');

module.exports['basics'] = {

    "null": function (test) {

        var n = JS.NULL;

        test.deepEqual(n.renderTree(), ['null']);
        test.equal(n.renderJs(), 'null');

        test.done();
    },

    "use strict": function (test) {

        var n = JS.USE_STRICT;

        test.deepEqual(n.renderTree(), ['use-strict']);
        test.equal(n.renderJs(), "'use strict';\n");

        test.done();
    },

    "ID": function (test) {

        var n = JS.ID('snooks');

        test.deepEqual(n.renderTree(), ['id', 'snooks']);
        test.equal(n.renderJs(), "snooks");

        test.done();
    },

    "bool": function (test) {

        var n = JS.bool('true');

        test.deepEqual(n.renderTree(), ['bool', 'true']);
        test.equal(n.renderJs(), "true");

        test.done();
    },

    "num": function (test) {

        var n = JS.num('7');

        test.deepEqual(n.renderTree(), ['num', '7']);
        test.equal(n.renderJs(), "7");

        test.done();
    },

    "string": function (test) {

        var n = JS.string('digga digga doo');

        test.deepEqual(n.renderTree(), ['string', 'digga digga doo']);
        test.equal(n.renderJs(), "'digga digga doo'");

        test.done();
    },

    "string with quotes": function (test) {

        var n = JS.string("I'm ok");

        test.deepEqual(n.renderTree(), ['string', "I'm ok"]);
        test.equal(n.renderJs(), "'I\\'m ok'");

        test.done();
    },

    "array literal": function (test) {

        var n = JS.arrayLiteral([JS.ID('foo'), JS.num('42')]);

        test.deepEqual(n.renderTree(), ['arrayLiteral', [['id', 'foo'], ['num', '42']]]);
        test.equal(n.renderJs(), "[foo, 42]");

        test.done();
    },

    "obj literal": function (test) {

        var n = JS.objLiteral([[JS.string('foo'), JS.num('42')], [JS.string('bar'), JS.num('57')]]);

        test.deepEqual(n.renderTree(), ['objLiteral', [
            [['string', 'foo'], ['num', '42']],
            [['string', 'bar'], ['num', '57']]]]);
        test.equal(n.renderJs(), "{'foo': 42,'bar': 57}");

        test.done();
    },

    "subscript": function (test) {

        var n = JS.subscript(JS.ID('foo'), JS.ID('length'));

        test.deepEqual(n.renderTree(), ['subscript', ['id', 'foo'], ['id', 'length']]);
        test.equal(n.renderJs(), "foo[length]");

        test.done();
    },

    "select": function (test) {

        var n = JS.select(JS.ID('foo'), 'length');

        test.deepEqual(n.renderTree(), ['select', ['id', 'foo'], 'length']);
        test.equal(n.renderJs(), "foo.length");

        test.done();
    }
};

module.exports["operators"] = {

    "logicalAnd": function (test) {

        var n = JS.logicalAnd(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ '&&', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "foo && bar");

        test.done();
    },

    "logicalOr": function (test) {

        var n = JS.logicalOr(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ '||', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "foo || bar");

        test.done();
    },

    "strict equal": function (test) {

        var n = JS.strictEqual(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'strict-equal', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "foo === bar");

        test.done();
    },

    "not equal": function (test) {

        var n = JS.notEqual(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'not-equal', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "foo != bar");

        test.done();
    },

    "lt": function (test) {

        var n = JS.lt(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'lt', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "foo < bar");

        test.done();
    },

    "gt": function (test) {

        var n = JS.gt(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'gt', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "foo > bar");

        test.done();
    },

    "lte": function (test) {

        var n = JS.lte(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'lte', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "foo <= bar");

        test.done();
    },

    "gte": function (test) {

        var n = JS.gte(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'gte', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "foo >= bar");

        test.done();
    },

    "add": function (test) {

        var n = JS.add(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'add', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "(foo + bar)");

        test.done();
    },

    "sub": function (test) {

        var n = JS.sub(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'sub', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "(foo - bar)");

        test.done();
    },

    "mul": function (test) {

        var n = JS.mul(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'mul', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "(foo * bar)");

        test.done();
    },

    "div": function (test) {

        var n = JS.div(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'div', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "(foo / bar)");

        test.done();
    },

    "mod": function (test) {

        var n = JS.mod(JS.ID('foo'), JS.ID('bar'));

        test.deepEqual(n.renderTree(), [ 'mod', [ 'id', 'foo' ], ['id', 'bar'] ]);
        test.equal(n.renderJs(), "(foo % bar)");

        test.done();
    },

    "inc": function (test) {

        var n = JS.inc(JS.ID('foo'));

        test.deepEqual(n.renderTree(), [ 'inc', [ 'id', 'foo' ] ]);
        test.equal(n.renderJs(), "foo++");

        test.done();
    },

    "dec": function (test) {

        var n = JS.dec(JS.ID('foo'));

        test.deepEqual(n.renderTree(), [ 'dec', [ 'id', 'foo' ] ]);
        test.equal(n.renderJs(), "foo--");

        test.done();
    },

    "not": function (test) {

        var n = JS.not(JS.ID('foo'));

        test.deepEqual(n.renderTree(), [ 'not', [ 'id', 'foo' ] ]);
        test.equal(n.renderJs(), "(!foo)");

        test.done();
    },

    "assign": function (test) {

        var n = JS.assign(JS.ID('foo'), JS.num('57'));

        test.deepEqual(n.renderTree(), [ 'assign', [ 'id', 'foo' ], [ 'num', '57' ] ]);
        test.equal(n.renderJs(), "foo = 57");

        test.done();
    },

    "mul assign": function (test) {

        var n = JS.assign(JS.ID('foo'), JS.num('57'), '*=');

        test.deepEqual(n.renderTree(), [ 'assign', [ 'id', 'foo' ], [ 'num', '57' ], '*=' ]);
        test.equal(n.renderJs(), "foo *= 57");

        test.done();
    }
};

module.exports["fn calls"] = {

    "fn call with one arg": function (test) {

        var n = JS.fnCall(JS.ID('foo'), [JS.num('57')]);

        test.deepEqual(n.renderTree(), [ 'call', [ 'id', 'foo' ], [ [ 'num', '57' ] ] ]);
        test.equal(n.renderJs(), "foo(57)");

        test.done();
    },

    "fn call with no args": function (test) {

        var n = JS.fnCall(JS.ID('foo'), []);

        test.deepEqual(n.renderTree(), [ 'call', [ 'id', 'foo' ], [ ] ]);
        test.equal(n.renderJs(), "foo()");

        test.done();
    },

    "fn call with several args": function (test) {

        var n = JS.fnCall(JS.ID('foo'), [JS.num('57'), JS.add(JS.ID('bar'), JS.ID('baz'))]);

        test.deepEqual(n.renderTree(), [ 'call',
            [ 'id', 'foo' ],
            [ [ 'num', '57' ], [ 'add', [ 'id', 'bar' ], [ 'id', 'baz' ] ] ] ]);
        test.equal(n.renderJs(), "foo(57, (bar + baz))");

        test.done();
    }
};

module.exports["fn defs"] = {

    "anonymous fn def": function (test) {

        var n = JS.fnDef(['bar', 'baz'], JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz')))));

        test.deepEqual(n.renderTree(), [ 'function', null,
            [ 'bar', 'baz' ],
            [ 'stmtList', [ 'expr-stmt', [ 'assign', [ 'id', 'bar' ], [ 'id', 'baz' ] ] ] ] ]);
        test.equal(n.renderJs(), "function (bar, baz) {\n\nbar = baz;\n}");

        test.done();
    },

    "named fn def": function (test) {

        var n = JS.fnDef(['bar', 'baz'], JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz')))), 'foo');

        test.deepEqual(n.renderTree(), [ 'function', 'foo',
            [ 'bar', 'baz' ],
            [ 'stmtList', [ 'expr-stmt', [ 'assign', [ 'id', 'bar' ], [ 'id', 'baz' ] ] ] ] ]);
        
        test.equal(n.renderJs(), "function foo (bar, baz) {\n\nbar = baz;\n}");

        test.done();
    }
};

module.exports["statements"] = {

    "var declaration": function (test) {

        var n = JS.varDecl('baz');

        test.deepEqual(n.renderTree(), [ 'var', 'baz' ]);
        test.equal(n.renderJs(), "var baz;");

        // with initializer

        n = JS.varDecl('fish', JS.string("Lauwiliwilinukunuku'oio'oi"));

        test.deepEqual(n.renderTree(), [ 'var', 'fish', [ 'string', "Lauwiliwilinukunuku'oio'oi" ] ]);
        test.equal(n.renderJs(), "var fish = 'Lauwiliwilinukunuku\\'oio\\'oi';");

        test.done();
    },

    "let declaration": function (test) {

        var n = JS.letDecl('baz');

        test.deepEqual(n.renderTree(), [ 'let', 'baz' ]);
        test.equal(n.renderJs(), "let baz;");

        // with initializer

        n = JS.letDecl('fish', JS.string("Lauwiliwilinukunuku'oio'oi"));

        test.deepEqual(n.renderTree(), [ 'let', 'fish', [ 'string', "Lauwiliwilinukunuku'oio'oi" ] ]);
        test.equal(n.renderJs(), "let fish = 'Lauwiliwilinukunuku\\'oio\\'oi';");

        test.done();
    },

    "const declaration": function (test) {

        var n = JS.constDecl('pi', JS.num('3.14159'));

        test.deepEqual(n.renderTree(), [ 'const', 'pi', [ 'num', '3.14159' ] ]);
        test.equal(n.renderJs(), "const pi = 3.14159;");

        test.done();
    },

    "return": function (test) {

        var n = JS.return(JS.ID('baz'));

        test.deepEqual(n.renderTree(), [ 'return', [ 'id', 'baz' ] ]);
        test.equal(n.renderJs(), "return baz;");

        test.done();
    },

    "expr stmt": function (test) {

        var n = JS.exprStmt(JS.assign(JS.ID('baz'), JS.num('48')));

        test.deepEqual(n.renderTree(), [ 'expr-stmt', [ 'assign', [ 'id', 'baz' ], [ 'num', '48' ] ] ]);
        test.equal(n.renderJs(), "baz = 48;");

        test.done();
    },

    "stmt list": function (test) {

        var n = JS.stmtList(
            JS.exprStmt(JS.assign(JS.ID('foo'), JS.ID('bar'))),
            JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz')))));

        test.deepEqual(n.renderTree(), [ 'stmtList',
            [ 'expr-stmt', [ 'assign', [ 'id', 'foo' ], [ 'id', 'bar' ] ] ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', 'bar' ], [ 'id', 'baz' ] ] ] ] ]);

        test.equal(n.renderJs(), "foo = bar;\nbar = baz;");

        test.equal(n.isAsync(), false);

        test.done();
    },

    "direct async stmt list": function (test) {

        var n = JS.stmtList(
            JS.exprStmt(JS.assign(JS.ID('foo'), JS.ID('bar'))),
            JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz')))), true);

        test.equal(n.isAsync(), true);

        test.done();
    },

    "indirect async stmt list": function (test) {

        var n = JS.stmtList(
            JS.exprStmt(JS.assign(JS.ID('foo'), JS.ID('bar'))),
            JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz'))), null, true));

        test.equal(n.isAsync(), true);

        test.done();
    },

    "appended async stmt list": function (test) {

        var n = JS.stmtList(
            JS.exprStmt(JS.assign(JS.ID('foo'), JS.ID('bar'))));

        test.equal(n.isAsync(), false);

        n.append(JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.ID('baz'))), null, true));

        test.equal(n.isAsync(), true);

        test.done();
    },

    "cond stmt": function (test) {

        // consequent only - no else

        var n = JS.cond(JS.bool('true'), JS.stmtList(JS.exprStmt(JS.assign(JS.ID('baz'), JS.num('48')))));

        test.deepEqual(n.renderTree(), [ 'if',
            [ 'bool', 'true' ],
            [ 'stmtList', [ 'expr-stmt', [ 'assign', [ 'id', 'baz' ], [ 'num', '48' ] ] ] ] ]);

        test.equal(n.renderJs(), "if (true) {\nbaz = 48;\n}");

        // now with alt branch

        n = JS.cond(JS.bool('true'),
            JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bazball'), JS.num('48')))),
                JS.stmtList(JS.exprStmt(JS.assign(JS.ID('frobozz'), JS.num('64')))));

        test.deepEqual(n.renderTree(), [ 'if',
            [ 'bool', 'true' ], [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', 'bazball' ], [ 'num', '48' ] ] ] ], [ 'stmtList',
                    [ 'expr-stmt', [ 'assign', [ 'id', 'frobozz' ], [ 'num', '64' ] ] ] ] ]);

        test.equal(n.renderJs(), "if (true) {\nbazball = 48;\n} else {\nfrobozz = 64;\n}");

        test.done();
    },

    "while stmt": function (test) {

        var n = JS.while(JS.bool('true'), JS.exprStmt(JS.assign(JS.ID('baz'), JS.num('48'))));

        test.deepEqual(n.renderTree(), [ 'while',
            [ 'bool', 'true' ],
            [ 'expr-stmt', [ 'assign', [ 'id', 'baz' ], [ 'num', '48' ] ] ] ]);
        test.equal(n.renderJs(), "while (true) {\nbaz = 48;\n}");

        test.done();
    }
};