/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var Context = require('../../codegen/Context');

module.exports["identifiers"] = {

    "explicit namespace": function (test) {

        var node = new Lo.moduleRef('Node', 'HTTP');

        var parent = new Context();
        var context = parent.createInner();

        test.deepEqual(parent.getDeps(), {});

        test.deepEqual(node.compile(context).renderTree(),
            [ 'subscript',
                [ 'subscript',
                    [ 'select', [ 'id', 'module' ], 'deps' ],
                    [ 'string', 'Node' ] ],
                [ 'string', 'HTTP' ] ]);

        // should have the side effect of declaring a dependency
        test.deepEqual(parent.getDeps(), {
            'Node': {'HTTP': 'HTTP'}
        });

        test.done();
    },

    "local module ref": function (test) {

        // should resolve to external, not local def

        var node = new Lo.moduleRef(null, 'Moon');

        var parent = new Context();
        var context = parent.createInner();

        context.define("Moon", 42);
        test.deepEqual(parent.getDeps(), {});

        test.deepEqual(node.compile(context).renderTree(),
            [ 'subscript',
                [ 'subscript',
                    [ 'select', [ 'id', 'module' ], 'deps' ],
                    [ 'string', '__local' ] ],
                [ 'string', 'Moon' ] ]);

        // should have the side effect of declaring a dependency
        test.deepEqual(parent.getDeps(), {
            '__local': {'Moon': 'Moon'}
        });

        // deps only get registered on the root context
        test.deepEqual(context.getDeps(), {});

        test.done();
    }
};
