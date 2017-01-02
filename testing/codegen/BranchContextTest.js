/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

const BranchContext = require('../../codegen/BranchContext');


module.exports["basics"] = {

    "isBranch": function (test) {

        var bc = new BranchContext();

        // we want to only check parents up to the service context
        test.ok(bc.inBranch());

        test.done();
    }
};