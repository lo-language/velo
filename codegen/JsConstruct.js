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
 */
var JsConstruct = function (parts) {

    // expand any annotation objects
    this.parts = flatten(Array.isArray(parts) ? parts : [parts]);
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