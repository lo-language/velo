/**
 * Created by spurcell on 6/25/16.
 */

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const JsStmt = require('./JsStmt');

/**
 * A Request is a special kind of statement that attaching things to puts them inside it rather than after it.
 *
 * todo support properly async requests
 *
 * @param address       JS part
 * @param args          array of JS parts
 * @param replyHandler  JsFunction
 * @param failHandler   JsFunction
 * @param async
 */
var __ = function (address, args, replyHandler, failHandler, async) {

    this.address = address;
    this.args = args;
    this.replyHandler = replyHandler;
    this.failHandler = failHandler;
    this.async = async || false;

    this.ast = JS.runtimeCall('sendMessage', [this.address, JS.arrayLiteral(this.args)].concat(this.replyHandler ? this.replyHandler : []));

};

__.prototype = Object.create(JsStmt.prototype);
__.prototype.constructor = __;


/**
 * Overrides base class to attach statements to its reply handler's body.
 *
 * @param stmt
 * @returns this    fluent interface
 */
__.prototype.attach = function (stmt) {

    if (this.async == false) {
        return JsStmt.prototype.attach.call(this, stmt);
    }

    // if we have a replyHandler, extend it, otherwise create one

    if (this.replyHandler == null) {
        this.replyHandler = new JsFunction('res', stmt);
        this.ast = JS.runtimeCall('sendMessage', [this.address, JS.arrayLiteral(this.args), this.replyHandler]);
    }
    else {
        this.replyHandler.append(stmt);
    }

    return this;
};


// /**
//  *
//  * @param following
//  * @returns {*[]}
//  */
// __.prototype.render = function (following) {
//
//     // here's where we figure out our handlers
//
//     var onReply;
//     var onFail;
//
//     if (this.blocking) {
//
//         // we're gonna need both handlers
//
//         if (this.failHandler == null) {
//
//             // whip up the default fail handler
//             onFail = JsFunction.DEFAULT_FAIL_HANDLER.render(following);
//         }
//
//         // what should the default reply handler be?
//
//         if (this.replyHandler == null) {
//
//             onReply = new JsFunction(['res'], following).render();
//         }
//         else {
//
//             // we want to open up the function
//
//             console.log(this.replyHandler.body);
//
//             // this.replyHandler.body.attach(following);
//
//             // console.log(this.replyHandler.body);
//
//             // see if the handler is final
//
//             onReply = this.replyHandler.render(following);
//         }
//     }
//     else {
//
//         // we're non-blocking, so we just use the handlers provided
//
//         onReply = this.replyHandler ? this.replyHandler.render() : ['null'];
//         onFail = this.failHandler ? this.failHandler.render() : ['defaultFailHandler'];
//     }
//
//     return ['message', this.address, this.args, onReply, onFail];
// };

module.exports = __;