/**
 * The Exa-to-JS compiler
 */

'use strict';

var Q = require('q');
var Context = require('./ExaContext');
var JsExpr = require('./JsExpr');
var JsStmt = require('./JsStmt');
var JsConditional = require('./JsConditional');
var JsFunction = require('./JsFunction');
var JsStmtList = require('./JsStmtList');
var JsCall = require('./JsCall');
var util = require('util');

var __ = function () {

    // just merge context into this class?
    // should we call compile on a context or on an AST node? going with context for now
    this.context = new Context();
};

/*

approach
go through the AST and determine for each node:
- whether it's a publisher or a subscriber or both or neither
- how to capture the value of that node in JS
- how to capture any side effects of that node in JS
- what async preconditions must be met before the value is available

have each node record whether it's an expression or has one or more statements
in general, have each node record its *requirements*, and then gather the requirements to write the code
also, save codegen for last - construct a JS AST?

optimization idea: detect synchronous functions at their first invocation and short-circuit the promise check?
only works if we don't switch fn ptrs around


 */
// forget about JS initially, transform into an exa program description, with explicit sequencing
// semantic phase I guess
// then compile into js?
// first pass, go through the AST and tag with deps?
// chain statements as nesting, because each statement kind of defines the context for lower statements?
// then do we not need a separate context idea besides the enclosing node??

/**
 * Takes an Exa AST node and returns a JS AST node. Code isn't generated until renderStmt is called on
 * JS nodes.
 *
 * @param node
 * @return {*}
 */
__.prototype.compile = function (node) {

    if (this[node.type] === undefined) {
        throw new Error("don't know how to compile node type '" + node.type + "'");
    }

    return this[node.type](node);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['boolean'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr(node.val ? 'true' : 'false', 'ready');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['number'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr("" + node.val, 'ready');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['string'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr("'" + node.val.replace(/'/g, "\\'") + "'", 'ready');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['list'] = function (node) {

    // list literals might have members that need to be resolved

    var self = this;

    var items = node.elements.map(function (item) {
        return self.compile(item);
    });

    return new JsExpr(function (jsContext) {
        return '[' + items.map(function (item) {
            return item.renderExpr(jsContext)
        }).join(',') + ']';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['set'] = function (node) {

    // list literals might have members that need to be resolved

    var self = this;

    var members = node.members.map(function (member) {
        return self.compile(member);
    });

    return new JsExpr(function (jsContext) {
        return '{' + members.map(function (member) {
            return member.renderExpr(jsContext) + ': true'
        }).join(',') + '}';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['id'] = function (node) {

    return new JsExpr('$_' + node.name, this.context.getStatus(node.name));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['cardinality'] = function (node) {

    var right = this.compile(node.operand);

    // wrap in small function? inspects type then gets size?

    // make a general JS code class? that can hold string and expr parts?
    // do we really need the JS AST level? or could we compile directly in one pass?

    return new JsExpr(
        function (jsContext) {
            return 'function (val) {' +
            "if (typeof val === 'string') return val.length;" +
            "else if (Array.isArray(val)) return val.length;" +
            "else if (typeof val === 'object') return Object.keys(val).length;" +
            "}(" + right.renderExpr(jsContext) + ")"});
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['complement'] = function (node) {

    var right = this.compile(node.operand);

    return new JsExpr(
        function (jsContext) {
            return '!' + right.renderExpr(jsContext)
        });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['in'] = function (node) {

    // should holds apply to strings? maybe as 'contains'? or some non-word operator?

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    return new JsExpr(
        function (jsContext) {
            return 'function (item, collection) {' +
                "if (Array.isArray(collection)) return collection.indexOf(item) >= 0;" +
                "else if (typeof val === 'object') return collection.hasOwnProperty(item);" +
                "}(" + left.renderExpr(jsContext) + ',' + right.renderExpr(jsContext) + ")"});
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['sequence'] = function (node) {

    var first = this.compile(node.first);
    var last = this.compile(node.last);

    // renders an expression that is a function that takes a single arg -
    // the action to be performed

    return new JsExpr(
        function (stmtContext) {

            // inject a var into the context
            return stmtContext.definePrereq(
                'function (first, last, action) {' +
                "for (var num = first; num <= last; num++) {" +
                "action(num);" +
                "}}.bind(null," + first.renderExpr(stmtContext) + ',' + last.renderExpr(stmtContext) + ")");
        });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['connection'] = function (node) {

    // how to handle multiple connectors?

    // sources and sinks are like calls in that they generate both statements and expressions
    // they have expressions but inject statements into the context

    var source = this.compile(node.source);
    var sink = this.compile(node.sink);

    return new JsExpr(function (stmtContext) {
        return source.renderExpr(stmtContext) + '.call(null,' + sink.renderExpr(stmtContext) + ')'
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['closure'] = function (node) {

    var self = this;

    var stmts = node.statements.map(function (stmt) {
        return self.compile(stmt);
    });

    return new JsExpr(
        function (stmtContext) {

            // inject a var into the context
            return stmtContext.definePrereq(
                'function () {' + stmts.map(function (stmt) {
                    return stmt.renderStmt(stmtContext);
                }).join('\n') + '}');
        });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A request can be part of an expression or a standalone statement.
 *
 * @param node
 */
__.prototype['request'] = function (node) {

    var fnId = this.compile(node.to);

    var self = this;
    var args = node.args.map(function (arg) {
        return self.compile(arg);
    });

    return new JsCall(fnId, args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['op'] = function (node) {

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    // make sure both sides are defined
    // could relax this if we want to allow declaration after usage
    // should also factor this out into a getValue() maybe

//    if (node.left.jsVal === undefined) {
//        throw new Error("left operand not defined");
//    }
//
//    if (node.right.jsVal === undefined) {
//        throw new Error("right operand not defined");
//    }

    return new JsExpr(function (stmtContext) {

        // use parens to be safe
        return '(' + left.renderExpr(stmtContext) + ' ' + node.op + ' ' + right.renderExpr(stmtContext) + ')';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['program'] = function (node) {

    var self = this;

    var stmts = node.statements.map(function (stmt) {
        return self.compile(stmt);
    });

    return new JsFunction(stmts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['receive'] = function (node) {

    var self = this;

    var vars = [];

    node.names.forEach(function (name) {

        // alter the context for following statements
        var argNum = self.context.defineArg(name);

        vars.push('$_' + name + ' = ' + 'args[' + argNum + ']');
    });

    var stmt = 'var ' + vars.join(',\n') + ';';

    return new JsStmt(stmt);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['conditional'] = function (node) {

    var self = this;

    // needs predicate to be ready

    var predicate = this.compile(node.predicate);

    var posBlock = node.positive.map(function (stmt) {
        return self.compile(stmt);
    });

    var negBlock;

    if (node.negative !== undefined) {

        if (Array.isArray(node.negative)) {
            negBlock = node.negative.map(function (stmt) {
                return self.compile(stmt);
            });
        }
        else {
            negBlock = this.compile(node.negative);
        }
    }

    return new JsConditional(predicate, posBlock, negBlock);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['termination'] = function (node) {

    var name = 'result.resolve';

    if (node.channel === 'fail') {
        name = 'result.reject';
    }

    var self = this;

    var args = node.args.map(function (arg) {
        return self.compile(arg);
    });

    return new JsStmtList([new JsCall(new JsExpr(name), args), 'return result.promise;']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current context by creating a variable in the context - if the LHS of the assign
 * is a simple identifier.
 *
 * @param node
 */
__.prototype['assign'] = function (node) {

    // this is guaranteed to be a statement

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    // is being ready a property of an AST node + exa context?
    // is tracking ready state just an optimization? or do we need it to not have turtles all the way down?
    // can we 'ask' the ast node if it's ready?
    // the compilation result should know that already, right?

    // modify the exa context

    if (node.left.type == 'id') {
        this.context.define(node.left.name, right.getStatus());
    }

    return new JsStmt(function (stmtContext) {
        return left.renderExpr(stmtContext) + ' ' + node.op + ' ' + right.renderExpr(stmtContext) + ';';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current context by creating a variable in the context - if the LHS of the assign
 * is a simple identifier.
 *
 * @param node
 */
__.prototype['subscript'] = function (node) {

    // this is guaranteed to be a statement

    var left = this.compile(node.list);
    var right = this.compile(node.index);

    return new JsExpr(function (stmtContext) {
        return left.renderExpr(stmtContext) + '[' + right.renderExpr(stmtContext) + ']';
    });
};

module.exports = __;