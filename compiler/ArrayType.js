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


class ArrayType extends Type {

    /**
     *
     */
    constructor(elemType, name) {

        super(name || (elemType.toString() + '*'));
        this.elemType = elemType;
    }
}

ArrayType.STRING = new ArrayType(Type.CHAR, 'string');


module.exports = ArrayType;
