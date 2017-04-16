/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["basics"] = {

    "push front": function (test) {

        var node = new Lo.arrayPush('push-front',
            new Lo.string('kiwi'), new Lo.identifier('foo'));

        var context = new Context().createInner();

        test.deepEqual(node.compile(context).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', '$foo' ], 'unshift' ],
                    [ [ 'string', 'kiwi' ] ] ] ]);

        test.done();
    },

    "push back": function (test) {

        var node = new Lo.arrayPush('push-back',
            new Lo.identifier('foo'), new Lo.number('57'));

        var context = new Context().createInner();

        test.deepEqual(node.compile(context).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', '$foo' ], 'push' ],
                    [ [ 'num', '57' ] ] ] ]);

        test.done();
    }
};
