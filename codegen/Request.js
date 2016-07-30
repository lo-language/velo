/**
 * Created by spurcell on 6/25/16.
 */

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');

/**
 * Constructor
 *
 * @param address       JS part
 * @param args          array of JS parts
 * @param replyHandler  JsFunction
 * @param failHandler   JsFunction
 */
var __ = function (address, args, replyHandler, failHandler) {

    this.address = address;
    this.args = args;
    this.replyHandler = replyHandler;
    this.failHandler = failHandler;
};

// extend JsStmt?
__.prototype.attach = function (stmtList) {
    
    // if we have a replyHandler, extend it, otherwise create one

    if (this.replyHandler == null) {
        this.replyHandler = new JsFunction('res', stmtList);
    }

    this.replyHandler.getBody().attach(stmtList);

    // this.replyHandler = JS.fnDef('res', this.next);

    return this;
};

__.prototype.getAst = function () {

    return JS.runtimeCall('sendMessage', [this.address, JS.arrayLiteral(this.args)].concat(this.replyHandler ? this.replyHandler : []));
};

__.prototype.getTree = function () {

    return this.getAst().getTree();
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