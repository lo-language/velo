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


"use strict";

var JsConstruct = require('./JsConstruct');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param address
 * @param args
 * @param subsequent
 * @param contingency
 * @private
 */
var __ = function (address, args, subsequent, contingency, replyParams, failParams) {

    // render an async call

    if (replyParams === undefined) {
        replyParams = 'args';
    }

    if (failParams === undefined) {
        failParams = 'args';
    }

    var parts = ['this.sendMessage(', address, ', [', {csv: args}, ']'];

    if (subsequent) {
        parts.push([', ', 'function (', replyParams, ') ', {block: subsequent}]);
    }
    else {
        parts.push(', null');
    }

    if (contingency) {
        parts.push([', ', 'function (', failParams, ') ', {block: contingency}]);
    }
    else {
        parts.push(', null');
    }

    parts.push(');\n\n');

    JsConstruct.call(this, parts);
};

__.prototype = Object.create(JsConstruct.prototype);
__.prototype.constructor = __;

module.exports = __;