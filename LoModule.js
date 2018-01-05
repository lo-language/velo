/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Wraps a Lo module through the translation and build process.
 *
 * A module always has a reference; it may or may not have source & compiled forms.
 *
 * Created by seth on 1/2/18.
 */

"use strict";

const Parser = require('./parser/Parser');


class LoModule {

    // could alternatively have a subclass for each module stage...

    /**
     *
     * @param ref
     * @param source
     */
    constructor (ref, source) {

        this.ref = ref;
        this.source = source;
        this.ast = null;
        this.js = null;
    }

    /**
     * Parses the module, returning any errors.
     *
     * @param errorReport   report to add parse errors to
     */
    parse (errorReport) {

        // todo catch parser errors here and report them
        this.ast = new Parser().parse(this.source);

        // extract the deps
        this.deps = this.ast.deps.map(constant => {
            return constant.value.getCanonical();
        });

        return this;
    }

    /**
     * Compiles the module
     *
     * @param registry   root symbol table for cross-references
     * @returns {LoModule}
     */
    compile (registry) {

        this.js = this.ast.compile(registry, (node, error) => {
            // this.emit("error", moduleId, node, error);
        }).renderJs();

        console.log(this.js.replace(/(\n|\r)+/g, ''));

        return this;
    }

    /**
     * Sets the Lo AST for this module
     *
     * @param moduleAst
     */
    setAST (moduleAst) {

        this.ast = moduleAst;
        return this;
    }

    /**
     * Returns the dependencies of this module
     *
     * @return {Array} of module refs
     */
    getDeps () {

        return this.deps;
    }

    /**
     * Sets the JS code.
     *
     * @param js
     */
    setJs (js) {

        this.js = js;
    }
}

module.exports = LoModule;