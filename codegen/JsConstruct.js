/*
 * Copyright (C) 2014 by Seth Purcell
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
 */

/**
 * Models a general JS construct as a list of fragments, which can be strings, sub-constructs,
 * or utility objects that wrap constructs.
 *
 * Created by: spurcell
 * 3/1/15
 */

"use strict";

var util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param fragments an array of strings or JsConstructs
 * @param async     explicity set the async status
 */
var JsConstruct = function (fragments, async) {

    this.fragments = Array.isArray(fragments) ? fragments : [fragments];

    // if async is set, use it; otherwise it'll be inherited from our fragments - one async fragment makes the construct async
    if (async !== undefined) {
        this.async = async;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders this construct into JS source.
 *
 * @param {boolean} pretty    format the code to make it more human-readable (default false)
 */
JsConstruct.prototype.render = function (pretty) {

    return JsConstruct.renderFragment(this.fragments, pretty);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the given JS code fragment.
 *
 * Could potentially save a traverse of the IR by doing this in the constructor, but hey.
 *
 * todo - should we factor out the traversal, since resolver uses it, too?
 */
JsConstruct.renderFragment = function (fragment, pretty) {

    if (typeof fragment == 'string') {
        return fragment;
    }

    if (Array.isArray(fragment)) {

        return fragment.reduce(function (accum, current) {
            return accum + JsConstruct.renderFragment(current, pretty);
        }, '');
    }

    if (typeof fragment === 'object') {

        if (fragment instanceof JsConstruct) {
            return fragment.render(pretty);
        }

        // expand annotation objects

        // todo rename to join?
        if (fragment.csv !== undefined) {

            return JsConstruct.renderFragment(fragment.csv.reduce(function (accum, current, index) {

                if (index > 0) {
                    return accum.concat(', ').concat(current);
                }

                return accum.concat(current);

            }, []), pretty);
        }

        if (fragment.block !== undefined) {
            // todo - render the block and see if it's a one-liner before determining how many newlines?
            // would have to move this expansion to the render phase then

            if (pretty) {
                return '{\n\n    ' + JsConstruct.renderFragment(fragment.block, pretty).replace(/\n/g, '\n    ') + '\n}';
            }
            else {
                return '{' + JsConstruct.renderFragment(fragment.block, pretty) + '}';
            }
        }
    }

    throw new Error("unexpected JS part: " + fragment);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this construct is async; traverses the fragments if not explicitly set.
 */
JsConstruct.prototype.isAsync = function () {

    if (this.async !== undefined) {
        return this.async;
    }

    var self = this;

    this.async = false;

    this.fragments.forEach(function (part) {

        if (typeof part === 'object' && part instanceof JsConstruct && part.isAsync()) {
            self.async = true;
        }
    });

    return this.async;
};

module.exports = JsConstruct;