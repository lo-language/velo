/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 1/6/18.
 */

"use strict";

const LoModule = require('../LoModule');

class LibModule extends LoModule {

    constructor (name, ns) {

        super(name, ns);
    }

    /**
     * no-op
     */
    compile () {

    }
}


module.exports = LibModule;