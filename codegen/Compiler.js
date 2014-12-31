/**
 * The Exa-to-JS compiler
 */

'use strict';

var Q = require('q');
var Scope = require('./Scope');
var JsExpr = require('./JsExpr');
var JsStmt = require('./JsStmt');
var JsConditional = require('./JsConditional');
var JsFunction = require('./JsFunction');
var JsStmtList = require('./JsStmtList');
var JsCall = require('./JsCall');
var util = require('util');

var __ = function () {

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
 * @param scope
 * @return {*}
 */
__.prototype.compile = function (node, scope) {

    if (this[node.type] === undefined) {
        throw new Error("don't know how to compile node type '" + node.type + "'");
    }

    return this[node.type](node, scope);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['boolean'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr(node.val ? 'true' : 'false', true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['number'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr("" + node.val, true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['string'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr("'" + node.val.replace(/'/g, "\\'") + "'", true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['list'] = function (node, scope) {

    // list literals might have members that need to be resolved

    var self = this;

    var items = node.elements.map(function (item) {
        return self.compile(item, scope);
    });

    return new JsExpr(function (stmtContext) {
        return '[' + items.map(function (item) {
            return item.renderExpr(stmtContext)
        }).join(',') + ']';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['set'] = function (node, scope) {

    // list literals might have members that need to be resolved

    var self = this;

    var members = node.members.map(function (member) {
        return self.compile(member, scope);
    });

    return new JsExpr(function (stmtContext) {
        return '{' + members.map(function (member) {
            return member.renderExpr(stmtContext) + ': true'
        }).join(',') + '}';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['id'] = function (node) {

    return new JsExpr('$_' + node.name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['cardinality'] = function (node, scope) {

    var right = this.compile(node.operand, scope);

    // wrap in small function? inspects type then gets size?

    // make a general JS code class? that can hold string and expr parts?
    // do we really need the JS AST level? or could we compile directly in one pass?

    return new JsExpr(
        function (stmtContext) {
            return 'function (val) {' +
            "if (typeof val === 'string') return val.length;" +
            "else if (Array.isArray(val)) return val.length;" +
            "else if (typeof val === 'object') return Object.keys(val).length;" +
            "}(" + right.renderExpr(stmtContext) + ")"});
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['complement'] = function (node, scope) {

    var right = this.compile(node.operand, scope);

    return new JsExpr(
        function (stmtContext) {
            return '!' + right.renderExpr(stmtContext)
        });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['in'] = function (node, scope) {

    // should holds apply to strings? maybe as 'contains'? or some non-word operator?

    var left = this.compile(node.left, scope);
    var right = this.compile(node.right, scope);

    return new JsExpr(
        function (stmtContext) {
            return 'function (item, collection) {' +
                "if (Array.isArray(collection)) return collection.indexOf(item) >= 0;" +
                "else if (typeof val === 'object') return collection.hasOwnProperty(item);" +
                "}(" + left.renderExpr(stmtContext) + ',' + right.renderExpr(stmtContext) + ")"});
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['sequence'] = function (node, scope) {

    var first = this.compile(node.first, scope);
    var last = this.compile(node.last, scope);

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
 * @param scope
 * @param node
 */
__.prototype['connection'] = function (node, scope) {

    // how to handle multiple connectors?

    // sources and sinks are like calls in that they generate both statements and expressions
    // they have expressions but inject statements into the context

    var source = this.compile(node.source, scope);
    var sink = this.compile(node.sink, scope);

    return new JsExpr(function (stmtContext) {
        return source.renderExpr(stmtContext) + '.call(null,' + sink.renderExpr(stmtContext) + ')'
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['closure'] = function (node, scope) {

    var self = this;

    // create a nested scope for the closure's statements
    var localScope = scope.bud();

    var stmts = node.statements.map(function (stmt) {
        return self.compile(stmt, localScope);
    });

    return new JsExpr(
        function (stmtContext) {

            // inject a var into the context
            return stmtContext.definePrereq(
                'function () {\n' +
                    'var args = Array.prototype.slice.call(arguments);' +
                    stmts.map(function (stmt) {
                    return stmt.renderStmt(stmtContext);
                }).join('\n') + '}');
        });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A request can be part of an expression or a standalone statement.
 *
 * @param scope
 * @param node
 */
__.prototype['request'] = function (node, scope) {

    var fnId = this.compile(node.to, scope);

    var self = this;
    var args = node.args.map(function (arg) {
        return self.compile(arg, scope);
    });

    return new JsCall(fnId, args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['op'] = function (node, scope) {

    var left = this.compile(node.left, scope);
    var right = this.compile(node.right, scope);

    var op = node.op;

    if (op === 'and') {
        op = '&&';
    }
    else if (op === 'or') {
        op = '||';
    }
    else if (op == '+') {

        return new JsExpr(function (stmtContext) {
            return 'function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {' +
            'return left.concat(right);} else return left + right;}(' +
            left.renderExpr(stmtContext) + ',' + right.renderExpr(stmtContext) + ')'});
    }

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
        return '(' + left.renderExpr(stmtContext) + ' ' + op + ' ' + right.renderExpr(stmtContext) + ')';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['program'] = function (node) {

    var self = this;

    // the root scope for this program
    var scope = new Scope();

    // define the envelope args - might not want to do this statically, btw
    // since we might not get them with each request

    scope.define('recur', true);
    scope.define('reply', true);
    scope.define('fail', true);

    var stmts = node.statements.map(function (stmt) {
        return self.compile(stmt, scope);
    });

    return new JsFunction(stmts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param scope
 * @param node
 */
__.prototype['receive'] = function (node, scope) {

    var vars = [];

    // todo - shift args off instead of tracking count

    node.names.forEach(function (name) {

        // alter the scope for following statements
        var argNum = scope.defineArg(name);

        vars.push('$_' + name + ' = ' + 'args[' + argNum + ']');
    });

    var stmt = 'var ' + vars.join(',\n') + ';';

    return new JsStmt(stmt);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['conditional'] = function (node, scope) {

    var self = this;

    // needs predicate to be ready

    var predicate = this.compile(node.predicate);

    var posBlock = node.positive.map(function (stmt) {
        return self.compile(stmt, scope);
    });

    var negBlock;

    if (node.negative !== undefined) {

        if (Array.isArray(node.negative)) {
            negBlock = node.negative.map(function (stmt) {
                return self.compile(stmt, scope);
            });
        }
        else {
            negBlock = this.compile(node.negative, scope);
        }
    }

    return new JsConditional(predicate, posBlock, negBlock);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['termination'] = function (node, scope) {

    // should this node type be renamed response?

    var name = 'result.resolve';

    if (node.channel === 'fail') {
        name = 'result.reject';
    }

    var self = this;

    var args = node.args.map(function (arg) {
        return self.compile(arg, scope);
    });

    return new JsStmtList([new JsCall(new JsExpr(name), args), 'return result.promise;']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current scope by defining a variable in it if the LHS of the assign
 * is a simple identifier.
 *
 * @param scope
 * @param node
 */
__.prototype['assign'] = function (node, scope) {

    // this is guaranteed to be a statement

    var left = this.compile(node.left, scope);
    var right = this.compile(node.right, scope);

    // is being ready a property of an AST node + exa scope?
    // is tracking ready state just an optimization? or do we need it to not have turtles all the way down?
    // can we 'ask' the ast node if it's ready?
    // the compilation result should know that already, right?

    // modify the local scope
    // todo we can't really do this, since we might be inside a conditional!
    // maybe we could track if we're in a conditional scope??
    if (node.left.type == 'id') {
        scope.define(node.left.name, right.isReady());
    }

    return new JsStmt(function (stmtContext) {
        return left.renderExpr(stmtContext) + ' ' + node.op + ' ' + right.renderExpr(stmtContext) + ';';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['subscript'] = function (node, scope) {

    // this is guaranteed to be a statement

    var list = this.compile(node.list, scope);
    var index = undefined;

    if (node.index !== undefined) {
        index = this.compile(node.index, scope);
    }

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?

    return new JsExpr(function (stmtContext) {

        return list.renderExpr(stmtContext) + '[' +
            (index === undefined ? list.renderExpr(stmtContext) + '.length - 1' : index.renderExpr(stmtContext)) + ']';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['skip'] = function (node, scope) {

    return new JsStmt('return;');
};

module.exports = __;