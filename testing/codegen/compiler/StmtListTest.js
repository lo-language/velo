/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["statement lists"] = {

    "independent": function (test) {

        var node = {
            type: "stmt_list",
            head: {
                type: 'assign',
                op: '=',
                left: {type: 'id', name: 'foo'},
                right: {type: 'number', val: '42'}
            },
            tail: {
                type: "stmt_list",
                head: {
                    type: 'assign',
                    op: '=',
                    left: {type: 'id', name: 'bar'},
                    right: {type: 'number', val: '57'}
                },
                tail: null
            }
        };

        test.equal(Compiler.compile(node).render(), '$foo = 42;\n$bar = 57;\n');
        test.done();
    },

    "dependent": function (test) {

        var node = {
            type: "stmt_list",
            head: {
                type: "assign",
                op: '=',
                left: {type: 'id', name: 'foo'},
                right: {
                    type: 'application',
                    address: {type: 'id', name: 'bar'},
                    args: [
                        {type: 'number', val: '42'}
                    ]}
            },
            tail: {
                type: "stmt_list",
                head: {
                    type: 'assign',
                    op: '=',
                    left: {type: 'id', name: 'baz'},
                    right: {type: 'number', val: '57'}
                },
                tail: null
            }
        };

        test.equal(Compiler.compile(node).render(), 'return $bar($bar, [42]).then(function (x1) {$foo = x1;\n}).then(function () {$baz = 57;\n})');
        test.done();
    }
};
