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


class ProductType extends Type {

    /**
     * todo types can't be figured out at parse time and fed to constructors like this
     * because service literals won't know their types until compile time!
     */
    constructor(types) {

        super('(' + types.map(type => type ? type.toString() : '??').join(',') + ')');
    }
}


module.exports = ProductType;
