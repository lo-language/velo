/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

const fs = require('fs');
const path = require('path');
const Parser = require('../../parser/Parser');
const util = require('util');

module.exports["params"] = {

    "one param": function (test) {

        test.deepEqual(new Parser("id_list").parse("foo"), ['foo']);

        test.done();
    },

    "multiple params": function (test) {

        test.deepEqual(new Parser("id_list").parse("foo, bar, baz"), ['foo', 'bar', 'baz']);

        test.done();
    }
};

module.exports["procs"] = {

    "no args, one stmt": function (test) {

        test.deepEqual(new Parser("proc").parse("(){foo = bar;}").getAst(),
            { type: 'procedure',
                params: [],
                body:
                { type: 'stmt_list',
                    head:
                    { type: 'assign',
                        left: { type: 'id', name: 'foo' },
                        right: { type: 'id', name: 'bar' } },
                    tail: null },
                isService: false });

        test.done();
    },

    "one arg, two stmts": function (test) {

        test.deepEqual(new Parser("proc").parse("(foo) { bar++; bar--; }").getAst(),
            { type: 'procedure',
                params: [ 'foo' ],
                body:
                { type: 'stmt_list',
                    head:
                    { type: 'assign',
                        left: { type: 'id', name: 'bar' },
                        right:
                        { type: 'op',
                            op: '+',
                            left: { type: 'id', name: 'bar' },
                            right: { type: 'number', val: '1' } } },
                    tail:
                    { type: 'stmt_list',
                        head:
                        { type: 'assign',
                            left: { type: 'id', name: 'bar' },
                            right:
                            { type: 'op',
                                op: '-',
                                left: { type: 'id', name: 'bar' },
                                right: { type: 'number', val: '1' } } },
                        tail: null } },
                isService: false });

        test.done();
    }
};