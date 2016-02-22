/**
 * Created by spurcell on 2/21/16.
 */

var __ = function (service, args, onReply, onFail) {

    this.service = service;
    this.args = args;
    this.onReply = onReply;
    this.onFail = onFail;

    this.active = true;
    this.hasResponded = false;
    this.pendingRequests = 0;
};

__.prototype.respond = function (channel, args) {

    if (this.hasResponded) {
        return;
    }

    this.hasResponded = true;
    this.response = {channel: channel, args: args};

    if (channel == 'reply') {

        // yes, we intentionally call onReply with this task as 'this'
        this.onReply(args);
    }
    else {
        this.onFail(args);
    }
};

__.prototype.await = function (cont) {

    // can only happen on success

    if (this.hasResponded) {
        cont(this.response.args);
    }
    else {
        // we want the listener to fire *after* the handler does its thing
        this.listener = cont;
    }
};

__.prototype.sendMessage = function (service, args, replyHandler, failHandler) {

    // wrap replyHandler and failHandler to do some bookkeeping
    // we do this even if there aren't handlers because a future listener might
    // be attached later

    var _this = this;

    var task = new __(service, args,
        function (reply) {
            var savedState = _this.active;
            _this.active = true;
            _this.pendingRequests--;
            replyHandler && replyHandler(reply);
            this.listener && this.listener(reply);
            _this.active = savedState;
            _this.checkFinished();
        }, function (reason) {
            _this.pendingRequests--;
            failHandler && failHandler(reason);
            _this.checkFinished();
        });

    // send the message

    this.pendingRequests++;
    service(task);
    task.deactivate();

    return task;
};

__.prototype.deactivate = function () {

    this.active = false;
    this.checkFinished();
};

__.prototype.checkFinished = function () {

    if (this.active == false && this.pendingRequests == 0) {

        // issue default response
        this.respond("reply");
    }
};

__.prototype.doAsync = function (cb) {

    this.pendingRequests++;

    var _this = this;

    return function () {
        _this.pendingRequests--;
        cb();
    };
};




// todo clean these up, also stop passing block/nonblock flag to sendmessage
__.prototype.processResponses = function () {

};

__.prototype.wait = __.prototype.await;




__.sendRootRequest = function (service, args, onReply, onFail) {

    var root = new __(service, args, onReply, onFail);

    service(root);
    root.deactivate();
};

module.exports = __;