/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');


class Identifier extends LoConstruct {

    /**
     * An identifier
     */
    constructor(name, ns, isLvalue) {

        super();
        this.name = name;
        this.ns = ns;
        this.line = '??';
        this.isLvalue = isLvalue || false;
    }

    setLvalue() {
        this.isLvalue = true;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return this.ns ?
        {
            type: "external-id",
            ns: this.ns,
            name: this.name
        }
        : {
            type: "id",
            name: this.name
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        // should this behave differently as lvalue or rvalue?

        return ["id", this.name];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

        // see if the identifier is defined

        if (sourceCtx.has(this.name)) {

            // if we're a constant, do the old switcheroo
            if (sourceCtx.isModule(this.name)) {
                return sourceCtx.resolve(this.name);
            }

            return JS.ID('$' + this.name);
        }

        // of course, we need to see inside a conditional to know if it's been defined...
        if (this.isLvalue == false) {
            sourceCtx.reportError(this, "identifier \"" + this.name + "\" used but not bound in this context");
            // return JS.NOOP; // not sure what else to do here
        }

        return JS.ID('$' + this.name);
    }
}


module.exports = Identifier;