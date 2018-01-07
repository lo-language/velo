/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * A CF graph node that is terminal (can't be appended to).
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const CFNode = require('./CFNode');


class TerminalNode extends CFNode {

    /**
     *
     * @param js
     * @param intact
     */
    constructor(js, intact = true) {

        super(js, intact);
    }


    /**
     * no-op
     */
    setNext(next) {

    }

    /**
     * no-op
     */
    append (node) {

        return this;
    }
}

module.exports = TerminalNode;

