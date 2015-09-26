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
 * Here's how this works:
 *
 * constructs contain fragments of JS, some with annotations, that can be rendered into JS
 *
 * for sync message expressions, we need to wrap the enclosing JS in a callback
 */

"use strict";

var util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parts     an array of strings or JsConstructs
 * @param sync      true if this construct contains or implements sync calls
 */
var JsConstruct = function (parts, sync) {

    // enable a single fragment to be passed in directly
    this.parts = Array.isArray(parts) ? parts : [parts];

    this.sync = sync || false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {Boolean}
 */
JsConstruct.prototype.isSync = function () {
    return this.sync;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a JsConstruct with SyncMessages resolved by wrapping the construct in as many Messages as required.
 */
JsConstruct.prototype.resolve = function (placeholderNum) {

    var wrappers = [];

    if (placeholderNum === undefined) {
        placeholderNum = 0;
    }

    // scan the fragments swapping SyncMessages for placeholders

    var analyze = function (part) {

        if (typeof part === 'string') {
            return part;
        }

        if (Array.isArray(part)) {

            // explore but don't flatten sub-array structure here!
            return part.reduce(function (accum, current) {
                // this is a bit ugly but we can't use concat without flattening arrays
                accum.push(analyze(current));
                return accum;
            }, []);
        }

        if (typeof part === 'object') {

            if (part instanceof SyncMessage) {
                wrappers.unshift(part);
                part.placeholder = 'P' + placeholderNum++;
                return part.placeholder; // todo - maybe we can let the wrapper know its position here?
            }
            else if (part instanceof JsConstruct) {
                // try flattening for now
                return analyze(part.parts);
            }
            else if (part.csv !== undefined) {
                return {csv: analyze(part.csv)};
            }

            if (part.block !== undefined) {
                return {block: analyze(part.block)};
            }
        }

        throw new Error("unexpected JS part in resolve: " + util.inspect(part, {depth: null}));
    };

    var parts = this.parts.reduce(function (accum, current) {
        return accum.concat(analyze(current));
    }, []);

    // no change

    if (wrappers.length == 0) {
        return this;
    }

    // render any necessary wrappers

    wrappers.forEach(function (sm) {
        parts = sm.wrap(parts).resolve(placeholderNum);
    });

    return new JsConstruct(parts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders this construct into JS source.
 *
 * @param {boolean} pretty    format the code to make it more human-readable (default false)
 */
JsConstruct.prototype.render = function (pretty) {

    return JsConstruct.renderFragment(this.parts, pretty);
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

        if (typeof fragment.render === 'function') {
            return fragment.render(pretty);
        }

        // expand annotation objects

        // todo rename to join? or args?
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

    throw new Error("unexpected JS part: " + util.inspect(fragment));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Builds a message.
 *
 * @param address
 * @param args
 * @param subsequent
 * @param contingency
 * @param replyParams
 * @param failParams
 * @param syncWrapper
 * @return {*}
 */
JsConstruct.buildMessage = function (address, args, subsequent, contingency, replyParams, failParams, syncWrapper) {

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

    return new JsConstruct(parts, syncWrapper);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param body
 */
JsConstruct.makeContinuation = function (body) {

    return new JsConstruct(["var cc = function () {\n", body, "\n};\n"]);
};

module.exports = JsConstruct;

// escape the cyclic dependency
var SyncMessage = require('./SyncMessage');