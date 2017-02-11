/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var Context = require('../../codegen/Context');

module.exports["identifiers"] = {

    "normal var": function (test) {

        var node = new Lo.identifier('foo');

        test.deepEqual(node.compile(new Context()).renderTree(),
            ['id', '$foo']);
        test.done();
    },

    "external ID": function (test) {

        var node = new Lo.identifier('foo', 'HTTP');

        var parent = new Context();
        var context = parent.createInner();

        test.deepEqual(parent.getDeps(), {});

        test.deepEqual(node.compile(context).renderTree(), [ 'subscript',
            [ 'subscript',
                [ 'select', [ 'id', 'module' ], 'deps' ],
                [ 'string', 'HTTP' ] ],
            [ 'string', '$foo' ] ]);

        // should have the side effect of declaring a dependency
        test.deepEqual(parent.getDeps(), {
            'HTTP': 'HTTP'
        });

        test.done();
    },

    "external ID with local counterpart": function (test) {

        // should resolve to external, not local def

        var node = new Lo.identifier('foo', 'HTTP');

        var parent = new Context();
        var context = parent.createInner();

        context.define("foo", 42);
        test.deepEqual(parent.getDeps(), {});

        test.deepEqual(node.compile(context).renderTree(), [ 'subscript',
            [ 'subscript',
                [ 'select', [ 'id', 'module' ], 'deps' ],
                [ 'string', 'HTTP' ] ],
            [ 'string', '$foo' ] ]);

        // should have the side effect of declaring a dependency
        test.deepEqual(parent.getDeps(), {
            'HTTP': 'HTTP'
        });

        // deps only get registered on the root context
        test.deepEqual(context.getDeps(), {});

        test.done();
    }
};
