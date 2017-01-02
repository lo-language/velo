/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * A connector to rejoin discontinuous branches.
 *
 * Created by seth on 1/2/17.
 */

"use strict";

const JS = require('./JsPrimitives');


var __ = function () {

    this.call = null;
};


__.prototype.setContinuation = function (contRef) {

    this.call = JS.stmtList(JS.exprStmt(JS.fnCall(contRef, [])));
};


__.prototype.renderTree = function () {

    if (this.call) {
        return this.call.renderTree();
    }
};


__.prototype.renderJs = function () {

    if (this.call) {
        return this.call.renderJs();
    }

    return '';
};

module.exports = __;