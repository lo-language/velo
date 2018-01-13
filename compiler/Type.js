/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Black care rarely sits behind a rider whose pace is fast enough. -- T.R.
 *
 =============================================================================*/

"use strict";


class Type {

    /**
     *
     */
    constructor(name) {

        this.name = name;
    }

    toString () {
        return this.name;
    }
}

Type.DYN    = new Type('dyn');
Type.BOOL   = new Type('boolean');
Type.CHAR   = new Type('char');
Type.INT    = new Type('integer');
Type.FLOAT  = new Type('float');
Type.DEC    = new Type('decimal');
Type.NUM    = new Type('number');


module.exports = Type;
