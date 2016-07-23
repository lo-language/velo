/**
 * Created by spurcell on 6/25/16.
 */

const StmtList = require('./StmtList');

/**
 *
 * @param params    list of param names
 * @param body      StmtList
 * @private
 */

var __ = function (params, body) {

    this.params = params;
    this.body = body;
};


/**
 * Renders the function with optional following statements appended to the bottom.
 */
__.prototype.render = function (following) {

    return ['fnDef', this.params, this.body.render()];
};

/**
 *
 * @returns {__}
 */
__.DEFAULT_FAIL_HANDLER = new __(['err'], StmtList.createFail([]));

module.exports = __;