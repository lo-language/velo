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
const path = require('path');
const fs = require('fs');
const vm = require('vm');


class LoModule {

    // could alternatively have a subclass for each module stage...

    /**
     *
     * @param name
     * @param ns
     * @param sourceDir    source root directory
     */
    constructor (name, ns, sourceDir) {

        this.name = name;
        this.ns = ns || '__local';

        // create the canonical reference
        this.ref = this.ns + '::' + name;

        this.sourceDir = sourceDir;
        this.source = null;
        this.ast = null;
        this.deps = [];
        this.js = null;
        this.loaded = null;
    }

    setSource (source) {

        this.source = source;
        return this;
    }

    /**
     * Parses the module, returning any errors. Fluent interface.
     *
     * @param source
     */
    parse (source) {

        // hang onto the source
        if (this.source == null) {
            this.source = source;
        }

        this.ast = new Parser().parse(this.source);

        // extract the deps from the AST

        this.deps = this.ast.deps.map(constant => {
            return {
                ns: constant.value.namespace || '__local',
                name: constant.value.id
            };
        });

        return this;
    }

    /**
     * Compiles the module with a fluent interface.
     *
     * @returns {LoModule}
     */
    compile (errorListener) {

        this.js = this.ast.compile(errorListener).renderJs();
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
     * Acquires the source of this module and parses it so its dependencies
     * are visible (but does nothing with its dependencies).
     */
    acquire () {

        return new Promise((resolve, reject) => {

            if (this.source) {
                resolve(this.source);
                return;
            }

            var fileName = path.basename(this.name, '.lo') + '.lo';

            fs.readFile(this.sourceDir + '/' + fileName, 'utf8', (err, source) => {

                if (err) {
                    reject("Failed to locate module " + this.name + ' in ' + this.sourceDir);
                    return;
                }

                this.setSource(source);
                resolve();
            });
        }).then(() => {

            // parse that bad boy so its dependencies are visible
            return this.parse();
        });
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