/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const LoContext = require('../../compiler/LoContext');

module.exports["identifiers"] = {

    "explicit namespace": function (test) {

        // test.expect(3);

        var node = new Lo.moduleRef('Node', 'HTTP');

        var context = new LoContext();

        // var registry = {
        //     include: function (ns, id) {
        //
        //         test.equal(ns, 'Node');
        //         test.equal(id, 'HTTP');
        //     }
        // };

        // context.setRegistry(registry);

        test.deepEqual(node.compile(context).renderTree(),
                    [ 'subscript', [ 'id', 'Node' ], [ 'string', 'HTTP' ] ]);
        test.done();
    },

    "local module ref": function (test) {

        // should resolve to external, not local def

        var node = new Lo.moduleRef(null, 'Moon');

        var context = new LoContext();

        // var registry = {
        //     include: function (ns, id) {
        //
        //         test.equal(ns, '__local');
        //         test.equal(id, 'Moon');
        //     }
        // };
        //
        // context.setRegistry(registry);

        context.define("Moon", 42);

        test.deepEqual(node.compile(context).renderTree(),
                    [ 'subscript', [ 'id', '__local' ], [ 'string', 'Moon' ] ]);

        test.done();
    }
};
