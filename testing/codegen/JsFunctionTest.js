/**
 * Created by spurcell on 7/30/16.
 */

const JS = require('../../codegen/JsPrimitives');
const JsFunction = require('../../codegen/JsFunction');

module.exports["basics"] = {

    "simple fn": function (test) {

        var fn = new JsFunction(['a', 'b'], JS.stmtList(JS.assign(JS.ID('$foo'), JS.ID('a'))));

        test.deepEqual(fn.renderTree(),
            JS.fnDef(
                ['a', 'b'],
                JS.stmtList(JS.assign(JS.ID('$foo'), JS.ID('a')))).renderTree());

        test.equal(fn.getBody(), fn.body);
        test.done();
    }
};