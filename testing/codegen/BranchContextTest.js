/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

const BranchContext = require('../../codegen/BranchContext');
const Context = require('../../codegen/Context');


module.exports["basics"] = {

    "passes declarations through": function (test) {

        var parent = new Context();
        var bc = new BranchContext(parent);

        bc.declare('herzog');

        test.ok(parent.has('herzog'));

        test.done();
    }
};