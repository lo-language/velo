/**
 * Created by spurcell on 7/24/16.
 */

const JS = require('./JsPrimitives');

/**
 * Models a JS function def so we can futz with it.
 *
 * todo support providing a name for functions
 *
 * @param params    array of param names
 * @param body          a JsStmt
 * @private
 */
var __ = function (params, body) {

    this.params = params;
    this.body = body;
};

__.prototype.getBody = function () {

    return this.body;
};

__.prototype.getAst = function () {

    return JS.fnDef(this.params, this.body);
};

__.prototype.getTree = function () {

    return this.getAst().getTree();
};

module.exports = __;