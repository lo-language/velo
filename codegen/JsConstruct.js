/**
 * Models a general JS construct as a list of parts, which can be strings, sub-constructs,
 * or utility objects that wrap constructs.
 *
 * Created by: spurcell
 * 3/1/15
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parts     an array of strings, objects or arrays
 */
var JsConstruct = function (parts) {

    // flatten the parts
    this.parts = flatten(parts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An augmented flatten.
 *
 * @param list
 */
var flatten = function (list) {

    return list.reduce(function (accum, current) {

        // recursively flatten arrays
        if (Array.isArray(current)) {
            return accum.concat(flatten(current));
        }

        // render nested constructs
        if (current instanceof JsConstruct) {
            return accum.concat(flatten(current.parts));
        }

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
 * Renders out the parts so they can be merged into another construct.
 */
JsConstruct.prototype.render = function () {

    return this.parts;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Flattens this construct into JS source.
 */
JsConstruct.prototype.toString = function () {

    // concatenate the parts as a string

    return this.render().reduce(function (prev, current) {

        if (typeof current == 'string') {
            return prev + current;
        }

        // render line breaks

        if (typeof current == 'object' && current.br == 1) {
            return prev + '\n';
        }

        console.log(current);
        throw new Error("unexpected JS part: " + current);
    }, '');
};

module.exports = JsConstruct;