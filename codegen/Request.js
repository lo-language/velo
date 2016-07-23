/**
 * Created by spurcell on 6/25/16.
 */

const JsFunction = require('./JsFunction');

/**
 * Constructor
 *
 * @param address       JS construct
 * @param args          array of JS constructs
 * @param replyHandler  JsFunction
 * @param failHandler   JsFunction
 * @param blocking      boolean if this is a blocking request
 */
var __ = function (address, args, replyHandler, failHandler, blocking) {

    this.address = address;
    this.args = args;
    this.replyHandler = replyHandler;
    this.failHandler = failHandler;
    this.blocking = blocking || false;
};

/**
 *
 * @param following
 * @returns {*[]}
 */
__.prototype.render = function (following) {

    // here's where we figure out our handlers

    var onReply;
    var onFail;

    if (this.blocking) {

        // we're gonna need both handlers

        if (this.failHandler == null) {

            // whip up the default fail handler
            onFail = JsFunction.DEFAULT_FAIL_HANDLER.render(following);
        }

        // what should the default reply handler be?

        if (this.replyHandler == null) {

            onReply = new JsFunction(['res'], following).render();
        }
        else {

            // we want to open up the function

            console.log(this.replyHandler.body);

            // this.replyHandler.body.attach(following);

            // console.log(this.replyHandler.body);
            
            // see if the handler is final

            onReply = this.replyHandler.render(following);
        }
    }
    else {

        // we're non-blocking, so we just use the handlers provided

        onReply = this.replyHandler ? this.replyHandler.render() : ['null'];
        onFail = this.failHandler ? this.failHandler.render() : ['defaultFailHandler'];
    }

    return ['message', this.address, this.args, onReply, onFail];
};

module.exports = __;