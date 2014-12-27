/**
 * Wraps a JS statement with async needs in a Q.spread to make its needs available.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var __ = function (stmts) {

    this.stmts = stmts;
};

/**
 * Renders the function body for use with new Function();
 *
 * @return {String}
 */
__.prototype.renderBody = function () {

    // maybe we should render statements INTO the js context? let it decide how to wrap them?

    var body = [

        // load the user arguments into args
        'var args = Array.prototype.slice.call(arguments, 2);',
        'var result = Q.defer();'
    ];

    this.stmts.forEach(function (stmt) {
        body.push(stmt.renderStmt());
    });

    body.push('\nreturn result.promise;');

    return body.join('\n') + '\n';
};

module.exports = __;

