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
const vm = require('vm');


class LoModule {

    // could alternatively have a subclass for each module stage...

    /**
     *
     * @param name
     * @param ns
     */
    constructor (name, ns) {

        this.name = name;
        this.ns = ns || '__local';

        // create the canonical reference
        this.ref = this.ns + '::' + name;

        this.source = null;
        this.ast = null;
        this.deps = [];
        this.js = null;
        this.loaded = null;
    }

    /**
     * Parses the module, returning any errors.
     *
     * @param source
     */
    parse (source) {

        // hang onto the source
        this.source = source;

        // todo catch parser errors here and report them

        this.ast = new Parser().parse(source);

        // extract the deps from the AST

        this.deps = this.ast.deps.map(constant => {
            return new LoModule(constant.value.id, constant.value.namespace);
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

        // console.log(this.js.replace(/(\n|\r)+/g, ''));

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

    /**
     * Loads this module into its own JS context, ready for execution.
     *
     * @param sandbox
     * @returns {*}
     */
    load (sandbox) {

        // wrap the generated JS in a strict-mode function and execute it to yield
        // a JS object containing the compiled module constants

        return this.loaded = vm.runInNewContext(
            "(function() {'use strict';" + this.js + '\n\n})',
            sandbox)();
    }
}

module.exports = LoModule;