/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Combines a context and a construct.
 *
 * Created by seth on 12/25/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const Context = require('./Context');


var __ = function (parent) {

    Context.call(this, parent);
};

// inheritance
__.prototype = Object.create(Context.prototype);
__.prototype.constructor = Context;


__.prototype.isRValue = function () {
    return true;
};


module.exports = __;