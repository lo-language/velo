/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Here's how this works:
 *
 * Constructs contain fragments of JS, some with annotations, that can be rendered into JS
 *
 * A construct can be attach()ed to another one, assuming they're both statements. In the
 * simple case this just concatenates them, but it could also infix the following statement.
 */

"use strict";

const Call = require('./Call');
const Future = require('./Future');
const util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parts     an array of strings or JsConstructs
 * @param post      any parts of this construct that need to come *after* following statements
 */
var JsConstruct = function (parts, post) {

    // enable a single fragment to be passed in directly

    this.parts = Array.isArray(parts) ? parts : (parts ? [parts] : []);
    this.post = Array.isArray(post) ? post : (post ? [post] : []);

    this.async = post ? (post.length > 0) : false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a JsConstruct with embedded Calls resolved by wrapping the construct in as many Messages as required.
 */
JsConstruct.prototype.resolve = function () {

    var wrappers = [];
    var placeholderName;

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

            if (part instanceof Call) {
                placeholderName = 'P' + wrappers.length;
                wrappers.push(part);
                return placeholderName;
            }

            if (part instanceof Future) {
                placeholderName = 'F' + wrappers.length;
                wrappers.push(part);
                return placeholderName;
            }

            if (part instanceof JsConstruct) {
                // try flattening for now
                return analyze(part.parts);
            }

            if (part.csv !== undefined) {
                return {csv: analyze(part.csv)};
            }

            if (part.block !== undefined) {
                return {block: analyze(part.block)};
            }
        }

        throw new Error("unexpected JS part in resolve: " + util.inspect(part, {depth: null}));
    };

    // filter the parts
    // could we lose our async flag here?
    var stmt = new JsConstruct(this.parts.reduce(function (accum, current) {
        return accum.concat(analyze(current));
    }, []), this.post);

    if (wrappers.length == 0) {
        return this;
    }

    // todo clean this up, probably as a reduce

    var wrap = function (stmt, wrappers, index) {

        if (index === undefined) {
            index = 0;
        }

        // base case
        if (index == wrappers.length) {
            return stmt;
        }

        var sm = wrappers[index];
        var pre, post;

        if (sm instanceof Call) {

            pre = ['task.sendMessage(',
                sm.address, ', [', {csv: sm.args}, '], function (P' + index + ') {'];

            post = ['}, null);\n\n'];
        }
        else {

            // so it's a future

            pre = ['$' + sm.name + '.await(function (F' + index + ') {'];

            post = ['});\n'];
        }

        var wrapper = new JsConstruct(pre, post);

        return wrapper.attach(wrap(stmt, wrappers, index + 1));
    };

    return wrap(stmt, wrappers).resolve();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Attach the given statement to this statement.
 *
 * @param stmt
 */
JsConstruct.prototype.attach = function (stmt) {

    this.parts = this.parts.concat(stmt.parts);
    this.post = stmt.post.concat(this.post);

    this.async = this.async || stmt.async;

    // be fluent
    // could alternatively be functional about it and return a new construct
    return this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders this construct into JS source.
 */
JsConstruct.prototype.render = function () {

    //console.log(util.inspect(this, {depth: null}));
    return JsConstruct.renderFragment(this.parts) +
        JsConstruct.renderFragment(this.post);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the given JS code fragment.
 *
 * Could potentially save a traverse of the IR by doing this in the constructor, but hey.
 *
 * todo - should we factor out the traversal, since resolver uses it, too?
 */
JsConstruct.renderFragment = function (fragment) {

    if (typeof fragment == 'string') {
        return fragment;
    }

    if (Array.isArray(fragment)) {

        return fragment.reduce(function (accum, current) {
            return accum + JsConstruct.renderFragment(current);
        }, '');
    }

    if (typeof fragment === 'object') {

        if (typeof fragment.render === 'function') {
            return fragment.render();
        }

        // expand annotation objects

        // todo rename to join? or args?
        if (fragment.csv !== undefined) {

            return JsConstruct.renderFragment(fragment.csv.reduce(function (accum, current, index) {

                if (index > 0) {
                    return accum.concat(', ').concat(current);
                }

                return accum.concat(current);

            }, []));
        }

        if (fragment.block !== undefined) {
            return '{' + JsConstruct.renderFragment(fragment.block) + '}';
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
 * @param replyHandler
 * @param failHandler
 * @return {*}
 */
JsConstruct.buildMessage = function (address, args, replyHandler, failHandler) {

    return new JsConstruct([
        'task.sendMessage(', address, ', [', {csv: args}, '], ',
        replyHandler ? replyHandler : 'null', ', ',
        failHandler ? failHandler : 'null', ')'
    ]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param pre
 * @param post
 */
JsConstruct.makeStatement = function (pre, post) {

    return new JsConstruct(pre, post).resolve();
};

module.exports = JsConstruct;