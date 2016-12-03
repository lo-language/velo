/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Models a JS function def so we can futz with it.
 *
 * Created by spurcell on 7/24/16.
 */

const JS = require('./JsPrimitives');

/**
 * todo support providing a name for functions
 *
 * @param params    array of param names
 * @param body          a JsStmt
 * @private
 */
var __ = function (params, body, name) {

    this.params = params;
    this.body = body;
    this.name = name;
};

/**
 * Like attach, but adds to the body of this function.
 *
 * @param stmt
 * @returns {*}
 */
__.prototype.append = function (stmt) {

    this.body.attach(stmt);
};


__.prototype._getAst = function () {

    return JS.fnDef(this.params, this.body, this.name);
};

__.prototype.renderTree = function () {

    return this._getAst().renderTree();
};

__.prototype.renderJs = function () {

    return this._getAst().renderJs();
};

module.exports = __;