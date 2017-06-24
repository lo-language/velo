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
            new Lo.stmtList(new Lo.assign(new Lo.identifier('count'), new Lo.number('1'))))
        );

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'scan' ],
                    [ [ 'id', '$foo' ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', [ '$item', '$count' ] ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'assign',
                                            [ 'id', '$item' ],
                                            [ 'subscript', [ 'id', 'args' ], [ 'num', '0' ] ] ] ],
                                    [ 'stmtList', [ 'expr-stmt', [ 'assign', [ 'id', '$count' ], [ 'num', '1' ] ] ] ] ] ] ] ] ] ]);

        test.done();
    }
};
