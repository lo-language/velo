/**
 * A JsConstruct that resolves promises within it.
 *
 * Created by: spurcell
 * 3/1/15
 */

"use strict";

var JsConstruct = require('./JsConstruct');
var util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parts     an array of strings or JsConstructs
 * @param addReturn
 */
var __ = function (parts, addReturn) {

    JsConstruct.call(this, parts);

    if (addReturn === undefined) {
        addReturn = true;
    }

    // detects async parts and resolve them for this construct by swapping in placeholders
    // and wrapping in a resolver such as Q.spread

    var asyncParts = [];

    this.parts = this.parts.reduce(function (accum, current) {

        if (typeof current === 'string') {
            return accum.concat(current);
        }

        if (typeof current === 'object' && current instanceof JsConstruct) {

            if (current.async) {

                asyncParts.push(current);
                return accum.concat('x' + asyncParts.length);
            }
            else {
                return accum.concat(current);
            }
        }

        throw new Error("unexpected JS part: " + util.inspect(current, {depth: null}));

    },[]);

    // render a resolver if necessary

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

            this.parts = JsConstruct.flatten(['Q.spread([', {csv: asyncParts}, '], function (', args, ') {'].concat(this.parts).concat(['})']));
        }
    }
};

// subclass extends superclass
__.prototype = Object.create(JsConstruct.prototype);
__.prototype.constructor = __;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this construct is async.
 */
__.prototype.isAsync = function () {

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

module.exports = __;