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
 * @param fragments     an array of strings or JsConstructs
 * @param addReturn
 */
var __ = function (fragments, addReturn) {

    JsConstruct.call(this, fragments);

    if (addReturn === undefined) {
        addReturn = true;
    }

    // filter out async fragments, swapping in placeholders and resolving them via Q.spread (or then)
    // and wrap the construct in a callback

    var asyncfragments = [];

    var analyze = function (fragment) {

        if (typeof fragment === 'string') {
            return fragment;
        }

        if (Array.isArray(fragment)) {

            // explore but don't flatten sub-array structure here!
            return fragment.reduce(function (accum, current) {
                // this is a bit ugly but we can't use concat without flattening arrays
                accum.push(analyze(current));
                return accum;
            }, []);
        }

        // identify async sub-constructs

        if (typeof fragment === 'object' && fragment instanceof JsConstruct) {

            if (fragment.isAsync()) {

                // tuck it away and replace with a placeholder var
                asyncfragments.push(fragment);
                return 'x' + asyncfragments.length;
            }
            else {
                return fragment;
            }
        }

        // peer into annotation objects
        // todo - i don't like how intrusive this is

        if (typeof fragment === 'object') {

            if (fragment.csv !== undefined) {
                return {csv: analyze(fragment.csv)};
            }

            if (fragment.block !== undefined) {
                return {block: analyze(fragment.block)};
            }
        }

        throw new Error("unexpected JS part: " + util.inspect(fragment, {depth: null}));
    };

    this.fragments = this.fragments.reduce(function (accum, current) {
        return accum.concat(analyze(current));
    }, []);

    // render a resolver if necessary
    // NB - this has the effect of turning *statements* into *expressions*

    if (asyncfragments.length > 0) {

        this.async = true;

        if (addReturn) {
            this.fragments = ['return '].concat(this.fragments).concat(';');
        }

        if (asyncfragments.length == 1) {

            // use a 'then' to resolve the single promise
            this.fragments = asyncfragments.concat('.then(function (x1) {').concat(this.fragments).concat(['})']);
        }
        else {

            // use Q.spread to resolve all promises

            var args = asyncfragments.map(function (part, index) {
                return 'x' + (index + 1);
            }).join(', ');

            this.fragments = ['Q.spread([', {csv: asyncfragments}, '], function (', args, ') {'].concat(this.fragments).concat(['})']);
        }
    }
};

// subclass extends superclass
__.prototype = Object.create(JsConstruct.prototype);
__.prototype.constructor = __;

module.exports = __;