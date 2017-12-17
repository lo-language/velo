/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const Lo = require('../../constructs');


module.exports["basics"] = {

    "array scan": function (test) {
        
        var node = new Lo.scan(
            new Lo.identifier('foo'),
            new Lo.procedure(['item'],
            new Lo.stmtList(new Lo.assign(new Lo.identifier('count'), new Lo.number('1'))))
        );

        test.deepEqual(node.compile2(new LoContext()).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'Util' ], 'scan' ],
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
