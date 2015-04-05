/**
 * Created by: spurcell
 * 4/3/15
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var util = require('util');

var ast = { type: 'procedure',
    body:
    { type: 'stmt_list',
        head:
        { type: 'assign',
            op: '=',
            left: { type: 'id', name: 'foo' },
            right:
            { type: 'procedure',
                body:
                { type: 'stmt_list',
                    head:
                    { type: 'result',
                        channel: 'reply',
                        args: [ { type: 'number', val: '14' } ] },
                    tail: null } } },
        tail:
        { type: 'stmt_list',
            head:
            { type: 'assign',
                op: '=',
                left: { type: 'id', name: 'x' },
                right:
                { type: 'request',
                    to: { type: 'id', name: 'foo' },
                    args: [] } },
            tail:
            { type: 'stmt_list',
                head:
                { type: 'result',
                    channel: 'reply',
                    args: [ { type: 'id', name: 'x' } ] },
                tail: null } } } };

module.exports["basics"] = {

    "full": function (test) {

        var js = Compiler.compile(ast);

        console.log(require('util').inspect(js, {depth: null, colors: true}), '\n\n');
        console.log(js.render());

        test.done();
    }
};