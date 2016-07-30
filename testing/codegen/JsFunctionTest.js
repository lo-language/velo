/**
 * Created by spurcell on 7/30/16.
 */

const JsFunction = require('../../codegen/JsFunction');
const JS = require('../../codegen/JsKit');

module.exports["basics"] = {

    "simple fn": function (test) {

        var fn = new JsFunction(['a', 'b'], JS.stmtList(JS.assign(JS.ID('$foo'), JS.ID('a'))));

        test.deepEqual(fn.getTree(),
            JS.fnDef(
                ['a', 'b'],
                JS.stmtList(JS.assign(JS.ID('$foo'), JS.ID('a')))).getTree());

        test.equal(fn.getBody(), fn.body);
        test.done();
    }
};