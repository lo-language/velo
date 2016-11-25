
/**
 * Models a statement that's continued. This entails defining a continuation.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const JsStmt = require('../codegen/JsStmt');
const JsFunction = require('../codegen/JsFunction');


/**
 * We want to provide the stmt, but the statement needs to know the name of the cont.
 * chicken/egg
 * could add the statement later
 */
var __ = function (name) {

    this.name = name;
    this.cont = new JsFunction([], new JsStmt(), name);
};

/**
 * Returns JS for a call to the continuation for this unit.
 *
 * @returns {*}
 */
__.prototype.getCall = function () {

    return JS.fnCall(JS.ID(this.name), []);
};

/**
 *
 * @param stmt
 */
__.prototype.setStmt = function (stmt) {

    this.stmt = stmt.attach(new JsStmt(this.cont._getAst()));
};

/**
 * Attaches a JS statement to this continuation by appending to its function body.
 *
 * @param stmt
 */
__.prototype.attach = function (stmt) {

    this.cont.append(stmt);
};

/**
 *
 */
__.prototype._getAst = function () {

    return this.stmt._getAst();
};

__.prototype.renderTree = function () {

    return this._getAst().renderTree();
};

__.prototype.renderJs = function () {

    var ast = this._getAst();

    return ast ? ast.renderJs() : '';
};

module.exports = __;
