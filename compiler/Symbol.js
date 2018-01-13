/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";


class Symbol {

    /**
     *
     */
    constructor(name) {

    }


    /**
     * @return {Boolean}
     */
    isConstant() {

    }

    /**
     * Returns true if the given name refers to a future.
     *
     * @param name
     */
    isFuture(name) {

        if (this.symbols['@' + name] !== undefined
            && this.symbols['@' + name].type == 'future') {
            return true;
        }
    }
}


module.exports = Symbol;
