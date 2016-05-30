/**
 * Created by spurcell on 5/28/16.
 */


const Loader = require('../../pipeline/Loader');
const util = require('util');

module.exports['basics'] = {

    "success": function (test) {


        test.done();
    },

    "failure": function (test) {

        test.done();
    }
};