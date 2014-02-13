/**
 * Created by: spurcell
 * 2/11/14
 */

"use strict";

// every request has a task and vice-versa, without exception
// but is a request created with a task, or is the task created later?

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param to
 * @param body
 * @param intros
 * @private
 */
var Message = function (isRequest, body, intros) {

    this.isRequest = isRequest;
    this.isResponse = !isRequest;

    this.body = body;
    this.intros = intros;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param to
 */
exports.createRequest = function (body, intros) {

    var m = new Message(true, body, intros);

    return m;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
Message.prototype.createResponse = function (body, intros) {

    var m = new Message(false, body, intros);

    return m;
};