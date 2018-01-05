/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 8/29/17.
 */

"use strict";

const nearley = require("nearley");
const grammar = require("./grammar.js");
const util = require('util');
const fs = require('fs');

/**
 *
 * @param start     optional start symbol
 * @constructor
 */
const Parser = function (start) {

    var lo = nearley.Grammar.fromCompiled(grammar);

    if (start) {
        lo.start = start;
    }

    this.parser = new nearley.Parser(lo);
};

Parser.prototype.parse = function (input) {

    this.parser.feed(input);

    if (this.parser.results.length > 1) {

        if (this.parser.results.length < 5) {
            this.parser.results.forEach((res, index) => {

                console.error("PARSE", index + 1);
                console.error(util.inspect(res.getAst(), {depth: null}));
            });
        }

        throw new Error("ambiguous parse detected (" + this.parser.results.length + " parsings)");
    }

    return this.parser.results[0];
};

module.exports = Parser;