/**
 * Created by: spurcell
 * 2/11/14
 */

"use strict";

var Message = require('../../Message');

module.exports["createRequest"] = {

    "success": function (test) {

        var body = {};
        var intros = {};
        var req = Message.createRequest(body, intros);

        test.ok(req.isRequest);
        test.equal(req.isResponse, false);

        test.equal(req.body, body);
        test.equal(req.intros, intros);

        test.done();
    }
};

module.exports["createResponse"] = {

    "success": function (test) {

        var body = {};
        var intros = {};

        var req = Message.createRequest();
        var res = req.createResponse(body, intros);

        test.ok(res.isResponse);
        test.equal(res.isRequest, false);

        test.done();
    }
};