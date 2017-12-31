/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');


class Connector {

    /**
     *
     */
    constructor(nameForm, callForm) {

        this.fnName = nameForm;
        this.stmt = callForm || JS.stmtList(JS.exprStmt(JS.fnCall(nameForm, [])));
    }

    renderTree () {

        return this.stmt.renderTree();
    }

    /**
     */
    renderJs () {

        return this.stmt.renderJs();
    }
}

module.exports = Connector;
