/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Base class for Lo constructs
 * 
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


class LoConstruct {

    /**
     * Adds a source location
     *
     * @param line OR token
     * @param col
     */
    setSourceLoc(line, col) {

        if (col !== undefined) {
            this.sourceLoc = [line, col];
        }
        else {
            this.sourceLoc = [line.line, line.col];
        }
        
        return this;
    }

    getSourceLoc() {

        return this.sourceLoc;
    }
}

module.exports = LoConstruct;