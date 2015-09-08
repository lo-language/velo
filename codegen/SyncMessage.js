/*
 * Copyright (C) 2015 by Seth Purcell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Author: Seth Purcell
 * 7/26/15
 */

/**
 * A Wrapper can be attached to an arbitrary JsConstruct and moved around.
 */

"use strict";

var Message = require('./Message');

/**
 * Models a synchronous message.
 *
 * @param address
 * @param args
 * @private
 */
var __ = function (address, args) {

    this.address = address;
    this.args = args || [];
    this.sm = true;
};

/**
 * Returns a message construct wrapped around the
 *
 * @param blocked   JsConstruct
 * @return {*}
 */
__.prototype.wrap = function (blocked) {

    // at some point we need to scan this message args & address for wrappers
    // should this happen here, on wrapper construction, or after this returns?
    return new Message(this.address, this.args, blocked);
};


module.exports = __;