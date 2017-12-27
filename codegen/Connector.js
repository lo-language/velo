/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Success is finding something you really like to do and caring enough about it
 * to do it well.
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
     * @param name
     */
    constructor(name) {

        this.name = name;
        this.stmt = JS.stmtList(JS.exprStmt(JS.fnCall(JS.ID(this.name), [])));
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
