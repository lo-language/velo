/**
 * Models a general JS construct.
 *
 * Created by: spurcell
 * 3/1/15
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * We could instead have a separate method to make a request.
 *
 * @param isRequest
 * @param js
 */
var __ = function (isRequest, js) {

    this.request = isRequest;
    this.pieces = js ? [js] : [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this construct is a request.
 *
 * @return {Boolean}
 */
__.prototype.isRequest  = function () {
    return this.request;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Writes JS pieces into the container.
 *
 * Could imagine this taking AST nodes and doing the compilation itself, without embed.
 * But if we want to compile a different structure based on whether we contain remotes or not,
 * we'll have to call embed first.
 *
 * @param piece     a piece of JS logic or an array of pieces
 */
__.prototype.write = function (piece) {

    // convenience method

    var self = this;

    if (arguments.length > 1) {

        Array.prototype.slice.call(arguments).map(function (p) {
            return self.write(p);
        });

        return this;
    }

    // another convenience method:
    // if we're given an array, flatten it down

    if (Array.isArray(piece)) {

        this.pieces = this.pieces.concat(piece);
        return this;
    }

    // another convenience method:
    // if we're given an object with a csv property, flatten it down separated by commas

    if (typeof piece == 'object') {

        if (piece.csv) {

            piece.csv.forEach(function (p, index) {

                if (index > 0) {
                    self.write(',');
                }

                self.write(p);
            });

            return this;
        }
    }

    this.pieces.push(piece);

    return this;
};

__.prototype.join = function (construct) {

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders this construct into JS source.
 *
 * @return {String}
 */
__.prototype.render = function () {

    var requests = [];
    var placeholders = [];

    // iterate through the pieces

    var result = this.pieces.map(function (piece) {

        if (typeof piece == 'string') {
            return piece;
        }

        if (piece.isRequest()) {

            var name = 'PH' + requests.length;

            placeholders.push(name);

            // flatten the request
            requests.push(piece.pieces);

            return name;
        }

        // render nested constructs

        if (piece instanceof __) {
            return piece.render();
        }

    }).join('');

    // see if there were any requests found in rendering this construct
    // if there were, we have to render a resolver around the result

    if (requests.length > 0) {

        // create a new JSConstruct for the resolver
        return __.createResolver(result, requests, placeholders).render();
    }

    return result;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a block of JS to resolve requests within it.
 *
 * @param wrapped
 * @param requests
 * @param placeholders
 * @return {*}
 */
__.createResolver = function (wrapped, requests, placeholders) {

    var resolver = new __();

    resolver.write('Q.spread([', {csv: requests}, '], function (', {csv: placeholders}, ') {\n',
        wrapped,
        '\n}, result.reject);');

    return resolver;
};


module.exports = __;