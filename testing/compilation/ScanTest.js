/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');


module.exports["basics"] = {

    "array scan": function (test) {
        
        var node = new Lo.scan(
            new Lo.identifier('foo'),
            new Lo.procedure(['item'],
            new Lo.stmtList(new Lo.incrDecr('increment', new Lo.identifier('count'))))
        );

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'scan' ],
                [ [ 'id', '$foo' ],
                    [ 'function',
                        null,
                        [ 'args' ],
                        [ 'stmtList',
                            [ 'var', '$item' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'assign',
                                        [ 'id', '$item' ],
                                        [ 'subscript', [ 'id', 'args' ], [ 'num', '0' ] ] ] ],
                                [ 'stmtList', [ 'expr-stmt', [ 'inc', [ 'id', '$count' ] ] ] ] ] ] ] ] ]);

        test.done();
    }
};
