/**
 * Here's how this works:
 *
 * Constructs contain fragments of JS, some with annotations, that can be rendered into JS
 *
 * A construct can be attach()ed to another one, assuming they're both statements. In the
 * simple case this just concatenates them, but it could also infix the following statement.
 */

"use strict";

var util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parts     an array of strings or JsConstructs
 * @param post      any parts of this construct that need to come *after* following statements
 * @param async
 */
var JsConstruct = function (parts, post, async) {

    // enable a single fragment to be passed in directly

    this.parts = Array.isArray(parts) ? parts : (parts ? [parts] : []);
    this.post = Array.isArray(post) ? post : (post ? [post] : []);

    // do we need this explicit, or can we infer from looking at post?
    this.async = async || false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a JsConstruct with SyncMessages resolved by wrapping the construct in as many Messages as required.
 */
JsConstruct.prototype.resolve = function () {

    var wrappers = [];

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
                var placeholderName = 'P' + wrappers.length;
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

    // might be a nicer way to do this using reduce

    var wrap = function (stmt, wrappers, index) {

        if (index === undefined) {
            index = 0;
        }

        if (index == wrappers.length) {
            return stmt;
        }

        var sm = wrappers[index];

        var parts = ['task.sendMessage(',
            sm.address, ', [', {csv: sm.args}, '], function (P' + index + ') {'];

        var post = ['}, null);\n\n'];

        var wrapper = new JsConstruct(parts, post, true);

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
 *
 * @param {boolean} pretty    format the code to make it more human-readable (default false)
 */
JsConstruct.prototype.render = function (pretty) {

    //console.log(util.inspect(this, {depth: null}));
    return JsConstruct.renderFragment(this.parts, pretty) +
        JsConstruct.renderFragment(this.post, pretty);
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
 * @return {*}
 */
JsConstruct.buildMessage = function (address, args, subsequent, contingency, replyParams, failParams) {

    if (replyParams === undefined) {
        replyParams = 'args';
    }

    if (failParams === undefined) {
        failParams = 'args';
    }

    var parts = ['task.sendMessage(', address, ', [', {csv: args}, ']'];

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

    return new JsConstruct(parts);
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

// end the cycle of dependency
var SyncMessage = require('./SyncMessage');