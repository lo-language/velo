/**
 * Created by spurcell on 6/25/16.
 */

const StmtList = require('./StmtList');


/**
 *
 * @param {JsConstruct} channel
 * @param {JsConstruct} args
 */
var __ = function (channel, args) {

    this.channel = channel;
    this.args = args;
};

/**
 *
 * @return {StmtList}
 */
__.prototype.attach = function (stmtList) {

    // no-op since we're a terminal statement
    return new StmtList(this);
};

__.prototype.getAst = function () {

    return [
        'stmtList',
        ['exprStmt', ['fnCall', 'task.respond', [this.channel, ['arrayLiteral', this.args]]]],
        'returnStmt'
    ];
};

module.exports = __;