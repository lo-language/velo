/**
 * Created by spurcell on 6/26/16.
 */

const JsStmt = require('./JsStmt');

/**
 *
 * @param head  statement
 * @param tail  statement list
 * @private
 */
var __ = function (head, tail) {

    this.head = head;
    this.tail = tail;
};

/**
 * Returns true if this statement list is final (always ends in a return).
 */
__.prototype.isFinal = function () {

    if (this.head.isFinal()) {

        if (this.tail) {
            throw new Error("malformed statement list detected");
        }

        return true;
    }

    if (this.tail) {
        return this.tail.isFinal();
    }

    return false;
};

/**
 * Attaches a statement to the tail of this stmt list.
 *
 * @param stmt
 */
__.prototype.attach = function (stmt) {

    // find the tail

    if (this.tail) {
        return this.tail.attach(stmt);
    }

    this.tail = new __(stmt);

    // be fluent
    return this;
};

/**
 * Renders an AST for this statement list by rendering up from the tail.
 *
 * @param following
 * @returns {*[]}
 */
__.prototype.render = function (following) {

    if (this.tail) {
        return this.head.render(this.tail.render(following));
    }

    return this.head.render(following);
};


// canned constructs

__.createReply = function (args) {

    var stmtList = new __(new JsStmt(
        ['exprStmt', ['fnCall', 'task.respond', [['string', 'reply'], ['arrayLiteral', args]]]]));

    return stmtList.attach(JsStmt.RETURN);
};

__.createFail = function (args) {

    var stmtList = new __(new JsStmt(
        ['exprStmt', ['fnCall', 'task.respond', [['string', 'fail'], ['arrayLiteral', args]]]]));

    return stmtList.attach(JsStmt.RETURN);
};



module.exports = __;