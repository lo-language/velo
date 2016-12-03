/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Models a future so we can recognize and handle them in compilation.
 *
 * this is another kind of blocker, right? should it extend blocker?
 */

"use strict";

/**
 * @param name
 */
var __ = function (name) {

    this.name = name;
};

module.exports = __;