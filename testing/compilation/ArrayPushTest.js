/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../codegen/LoContext');
const JsContext = require('../../codegen/JsContext');
const Lo = require('../../constructs');

module.exports["basics"] = {

    "push front": function (test) {

        var node = new Lo.arrayPush('push-front',
            new Lo.string('kiwi'), new Lo.identifier('foo'));

        var context = new LoContext().createInner();

        test.deepEqual(node.compile2(context, new JsContext()).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', '$foo' ], 'unshift' ],
                    [ [ 'string', 'kiwi' ] ] ] ]);

        test.done();
    },

    "push back": function (test) {

        var node = new Lo.arrayPush('push-back',
            new Lo.identifier('foo'), new Lo.number('57'));

        var context = new LoContext().createInner();

        test.deepEqual(node.compile2(context, new JsContext()).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', '$foo' ], 'push' ],
                    [ [ 'num', '57' ] ] ] ]);

        test.done();
    }
};
