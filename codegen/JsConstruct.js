/**
 * Models a general JS construct as a list of parts, which can be strings, sub-constructs,
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
 * @param parts     an array of strings or JsConstructs
 * @param resolve   set true to resolve async parts within the construct (default true)
 * @param async     flag indicating this is an async part (default false)
 */
var JsConstruct = function (parts, resolve, async) {

    // expand any annotation objects
    this.parts = flatten(parts);

    if (resolve || resolve === undefined) {
        this.resolve(true);
    }

    // allow the param to override for inherently async constructs
    if (async !== undefined) {
        this.async = async;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An augmented flatten.
 *
 * @param list
 */
var flatten = function (list) {

    return list.reduce(function (accum, current) {

//        // recursively flatten arrays
//        if (Array.isArray(current)) {
//            return accum.concat(flatten(current));
//        }
//
//        // render nested constructs
//        if (current instanceof JsConstruct) {
//            return accum.concat(flatten(current.parts));
//        }

        // flatten CSV objects
        if (typeof current == 'object' && current.csv !== undefined) {

            return flatten(accum.concat(current.csv.reduce(function (accum, current, index) {

                if (index > 0) {
                    accum.push(',');
                }

                return accum.concat(current);
            }, [])));
        }

        // base case
        return accum.concat(current);
    }, []);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Detects async parts and resolves them for this construct by wrapping the construct in a promise-resolving call.
 */
JsConstruct.prototype.resolve = function (addReturn) {

    // analyze the construct to identify any async parts, and conditionally
    // swap in placeholders for them

    var asyncParts = [];

    this.parts = this.parts.reduce(function (accum, current) {

        if (typeof current === 'string') {
            return accum.concat(current);
        }

        if (typeof current === 'object' && current instanceof JsConstruct) {

            // todo - do we need to call render here?
            if (current.async) {

                asyncParts.push(current.render());
                return accum.concat('x' + asyncParts.length);
            }
            else {
                return accum.concat(current.render());
            }
        }

        throw new Error("unexpected JS part: " + util.inspect(current, {depth: null}));

    },[]);

    // render a resolver if necessary
    // maybe have a 'makewrapper' call??

    if (asyncParts.length > 0) {

        this.async = true;

        if (addReturn) {
            this.parts = ['return '].concat(this.parts).concat(';');
        }

        if (asyncParts.length == 1) {

            // use a 'then' to resolve the single promise
            this.parts = asyncParts.concat('.then(function (x1) {').concat(this.parts).concat(['})']);
        }
        else {

            // use Q.spread to resolve all promises

            var args = asyncParts.map(function (part, index) {
                return 'x' + (index + 1);
            }).join(', ');

            this.parts = ['Q.spread([', asyncParts.join(', '), '], function (', args, ') {'].concat(this.parts).concat(['})']);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this construct is async.
 */
JsConstruct.prototype.isAsync = function () {

    if (this.async !== undefined) {
        return this.async;
    }

    var self = this;

    this.async = false;

    this.parts.forEach(function (part) {

        if (typeof part === 'object' && part instanceof JsConstruct && part.isAsync()) {
            self.async = true;
        }
    });

    return this.async;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders this construct into JS source.
 */
JsConstruct.prototype.render = function () {

    return this.parts.reduce(function (prev, current) {

        if (typeof current == 'string') {
            return prev + current;
        }

        if (typeof current === 'object' && current instanceof JsConstruct) {
            return prev + current.render();
        }

        // render line breaks

//        if (typeof current == 'object' && current.br == 1) {
//            return prev + '\n';
//        }

        throw new Error("unexpected JS part: " + current);
    }, '');
};

module.exports = JsConstruct;