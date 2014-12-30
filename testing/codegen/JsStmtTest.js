/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

var JsStmt = require('../../codegen/JsStmt');
var JsExpr = require('../../codegen/JsExpr');

module.exports["basics"] = {

    'trivial case': function (test) {

        var stmt = new JsStmt('var x = 42;');

        test.equal(stmt.renderStmt(), 'var x = 42;');

        test.done();
    },

    'const function': function (test) {

        var stmt = new JsStmt(function () {return 'var x = 52;'});

        test.equal(stmt.renderStmt(), 'var x = 52;');

        test.done();
    },

    'with prereqs': function (test) {

        var stmt = new JsStmt(function (stmtContext) {
            return stmtContext.definePrereq('function () {return "yoohoo";}') + ' == ' +
                stmtContext.definePrereq('function () {return "boo";}') + ';'
        });

        test.equal(stmt.renderStmt(), 'var tmp_0 = function () {return \"yoohoo\";};\nvar tmp_1 = function () {return \"boo\";};\ntmp_0 == tmp_1;');

        test.done();
    },

    'with promises': function (test) {

        var callA = new JsExpr(function (stmtContext) {
            return 'foo()';
        });

        var callB = new JsExpr(function (stmtContext) {
            return 'bar()';
        });

        var stmt = new JsStmt(function (stmtContext) {
            return stmtContext.definePrereq(callA, true) + ' == ' +
                stmtContext.definePrereq(callB, true) + ';'
        });

        test.equal(stmt.renderStmt(), 'Q.spread([foo(),bar()], function (tmp_0,tmp_1) {\n    tmp_0 == tmp_1;\n}, result.reject);');

        test.done();
    },

    'with nested promises': function (test) {

        var callA = new JsExpr(function (stmtContext) {
            return 'foo(' + stmtContext.definePrereq('bar()', true) + ')';
        });

        var callB = new JsExpr(function (stmtContext) {
            return 'baz()';
        });

        var stmt = new JsStmt(function (stmtContext) {
            return stmtContext.definePrereq(callA, true) + ' == ' +
                stmtContext.definePrereq(callB, true) + ';'
        });

        test.equal(stmt.renderStmt(), 'Q.spread([bar()], function (tmp_0) {\n    Q.spread([foo(tmp_0),baz()], function (tmp_0,tmp_1) {\n    tmp_0 == tmp_1;\n}, result.reject);\n}, result.reject);');

        test.done();
    }

    // todo prereqs + promises
}