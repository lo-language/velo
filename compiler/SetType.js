/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const Type = require('../compiler/Type');


class SetType extends Type {

    /**
     *
     */
    constructor(elemType) {

        super('{' + elemType.toString() + '}');
        this.elemType = elemType;
    }
}


module.exports = SetType;
