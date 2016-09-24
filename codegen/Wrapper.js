/**
 * Created by spurcell on 8/21/16.
 */

"use strict";

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const Request = require('./Request');
const JsStmt = require('./JsStmt');

/**
 * Constructor
 *
 * todo should Wrapper just extend context??
 *
 * or should a wrapper be a statement we attach other stmts to?
 */
var __ = function () {

    this.placeHolders = 0;
    this.requests = null;
};

__.prototype.isEmpty = function () {

    return this.placeHolders == 0;
};

/**
 * Pushes a request onto the stack and returns a placeholder.
 **
 * @param request
 */
__.prototype.pushRequest = function (request) {

    if (request.getReplyHandler() == null) {

        // create a reply handler taking the placeholder as its param and with an empty body

        var placeholderName = 'res' + this.placeHolders++;
        request.setReplyHandler(new JsFunction([placeholderName], new JsStmt()));
    }

    if (this.requests) {
        this.requests.attach(request);
    }
    else {
        this.requests = request;
    }

    return JS.subscript(JS.ID(placeholderName), JS.num('0'));
};

/**
 * Returns the given statement wrapped.
 *
 * @param stmt
 */
__.prototype.wrap = function (stmt) {

    if (this.requests) {
        return this.requests.attach(stmt);
    }

    return stmt;
};

module.exports = __;