/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../codegen/LoContext');
const JsContext = require('../../codegen/JsContext');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["select"] = {

    "basics": function (test) {

        var node = new Lo.select(
            new Lo.identifier('foo'),
            'bar'
        );

        test.deepEqual(node.compile2(new LoContext(), new JsContext()).renderTree(),
            JS.select(JS.ID('$foo'), 'bar').renderTree());
        test.done();
    }
};
