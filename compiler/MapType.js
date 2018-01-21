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


class MapType extends Type {

    /**
     * Does a map have one elementType or a keyType and valueType??
     */
    constructor(keyType, valueType) {

        super('{' + keyType.toString() + ' => ' + valueType.toString() + '}');
        this.keyType = keyType;
        this.valueType = valueType;
    }
}


module.exports = MapType;
