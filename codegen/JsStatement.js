/**
 * Models a JS statement - a special case of a JSConstruct that wraps its contents in a Q.spread block
 * (multiple if necessary) to resolve any requests into values.
 *
 * Created by: spurcell
 * 3/1/15
 */

"use strict";

var JsConstruct = require('./JsConstruct');
var JsRequest = require('./JsRequest');
var util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param parts     an array of strings or constructs
 */
var __ = function (parts) {

    // we need to alternate - flatten, resolve, flatten, resolve
    // we achieve this by having our parent constructor flatten,
    // then calling resolve - and if it creates a wrapper statement, it will first be flattened, etc.

    // flatten - replace with call to superclass
    JsConstruct.call(this, parts);

    // resolve any requests
    this.resolve();
};

var JsStatement = __;

// subclass extends superclass
__.prototype = Object.create(JsConstruct.prototype);
__.prototype.constructor = __;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Resolves any requests into placeholders.
 */
__.prototype.resolve = function () {

    var self = this;

    self.requests = [];
    self.placeholders = [];

    this.parts = this.parts.reduce(function (prev, current) {

        // swap requests for placeholder variables, and stash the request for later utilization

        if (current instanceof JsRequest) {

            // flag that we're async
            self.async = true;

            // swap a placeholder name for the request used in the expression

            var name = 'PH' + self.requests.length;

            self.placeholders.push(name);

            // stash the unwrapped request
            self.requests.push(current.getConstruct());

            return prev.concat(name);
        }

        // pass through otherwise
        return prev.concat(current);

    }, []);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Overrides the base class.
 */
__.prototype.render = function () {

    // should we always wrap a construct?


    // if there were any requests in this statement, we have to render a resolver around the result

    if (this.requests.length > 0) {

        // create a wrapper statement to resolve the requests
        return new JsStatement(['Q.spread([', {csv: this.requests}, '], function (', {csv: this.placeholders}, ') {',
            this.parts,
            '}, result.reject);']).render();
    }

    return this.parts;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sets the statement to follow this one.
 */
__.prototype.setNext = function (stmt) {

    this.parts = this.parts.concat(stmt.render());
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
__.prototype.isAsync = function () {

    return this.async || false;
};

module.exports = __;