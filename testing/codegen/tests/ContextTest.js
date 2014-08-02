/**
 * Created by: spurcell
 * 8/2/14
 */

"use strict";

var Context = require('../../../codegen/Context');

exports["basics"] = {

    "declare": function (test) {

        var context = new Context();

        context.declare('foo');

        test.equal(context.vars['foo'], undefined);

        test.done();
    }
};