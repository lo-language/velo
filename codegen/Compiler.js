/**
 * The Exa-to-JS compiler
 */

'use strict';

var Q = require('q');
var Scope = require('./Scope');
var JsWrapper = require('./JsWrapper');

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

//    console.error('compiling ' + node.type);
    return this[node.type](node, scope);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['procedure'] = function (node, scope) {

    var localScope;

    // if there's no enclosing scope, we're at the root of the scope tree
    if (scope === undefined) {
        localScope = new Scope();
    }
    else {
        // create a nested scope for the procedure's statements
        localScope = scope.bud();
    }

    // define the envelope args - might not want to do this statically, btw
    // since we might not get them with each request

    localScope.defineArg('recur');
    localScope.defineArg('__out');
    localScope.defineArg('__err');

    // compile the statement(s) in the context of the local scope
    return this.compile(node.body, localScope);

    // compile the statements in the context of the local scope
//    var stmts = node.statements.map(function (stmt) {
//        return self.compile(stmt, localScope);
//    });

//    return new JsFunction(stmts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['stmt_list'] = function (node, scope) {

    // hooray for Lisp!

    var head = this.compile(node.head, scope);

    if (node.tail) {
        return head.continue(this.compile(node.tail, scope));
    }

    return head;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Statements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param scope
 * @param node
 */
__.prototype['receive'] = function (node, scope) {

    return 'var ' + node.names.map(function (name) {
        return '$_' + name + ' = ' + 'args.shift()';
    }).join(',\n') + ';';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype['expr_stmt'] = function (node, scope) {

    return this.compile(node.expr, scope).asStatement();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['result'] = function (node, scope) {

    // should this node type be renamed response?

    var name = 'result.realize';

    if (node.channel === 'fail') {
        name = 'result.reject';
    }

    var self = this;

    var args = node.args.map(function (arg) {
        return self.compile(arg, scope);
    });

    return new JsWrapper(function (env) {
        return name + '(' + env.realize(args).join(',') +
            ');\nreturn result.promise;';
    });
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
//    if (node.left.type == 'id') {
//        scope.define(node.left.name, right.isReady());
//    }

    return new JsWrapper(function (env) {
        return env.realize(left) + ' ' + node.op + ' ' + env.realize(right) + ';';
    });
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
    var consequent = this.compile(node.consequent, scope);
    var negBlock = false;

    if (node.otherwise) {
        negBlock = this.compile(node.otherwise, scope);
    }

    // todo we might want to rewrite this to only realize the blocks after evaluating the predicate

    return new JsWrapper(function (env) {

        var stmt = 'if (' + env.realize(predicate) + ') {\n' +
            env.realize(consequent).replace(/\n/g, '\n') + '\n' + '}';

        if (negBlock) {
            stmt += '\nelse {\n' + env.realize(negBlock).replace(/\n/g, '\n') + '\n}';
        }

        return stmt;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loops while a condition is true.
 *
 * @param scope
 * @param node
 */
__.prototype['iteration'] = function (node, scope) {

    var condition = this.compile(node.condition, scope);
//    var statements = this.compile(node.statements, scope);

    return new JsWrapper(function (stmtContext) {
//        return source.renderExpr(stmtContext) + '.call(null,' + sink.renderExpr(stmtContext) + ')'
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Selective synchronization barrier.
 *
 * @param scope
 * @param node
 */
__.prototype['complete'] = function (node, scope) {

    // complete always needs to wrap its followers (children)

    // should we pass each node a parse tree for it to subsume when we compile it?
    // or should it pass back something that can subsume a node?

    var self = this;

    var promises = node.promises.map(function (expr) {
        return self.compile(expr, scope);
    });

    return new Complete(promises);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Requests
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A request can be part of an expression or a standalone statement.
 *
 * Requests always compile to async calls:
 *
 * - if result ignored, we don't do anything
 * - if result directly asssigned, we can return a promise
 * - if part of any other expression, we need to invert the parse tree to do the call first
 * - if handed a callback, wire it up to the promise
 *
 * @param scope
 * @param node
 */
__.prototype['request'] = function (node, scope) {

    var target = this.compile(node.to, scope);
    var self = this;

    var args = node.args.map(function (arg) {
        return self.compile(arg, scope);
    });

    return new JsWrapper(function (env) {

        // call realize() once since it's not idempotent (probably should be)
        var targetId = env.realize(target);

        return targetId + '(' + targetId + ',[' + env.realize(args).join(',') + '])';

    }, true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Expressions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['id'] = function (node) {

    return '$_' + node.name;
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

    return new JsWrapper(
        function (env) {
            return 'function (val) {' +
                "if (typeof val === 'string') return val.length;" +
                "else if (Array.isArray(val)) return val.length;" +
                "else if (typeof val === 'object') return Object.keys(val).length;" +
                "}(" + env.realize(right) + ")"});
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['complement'] = function (node, scope) {

    var right = this.compile(node.operand, scope);

    return new JsWrapper(
        function (env) {
            return '!' + env.realize(right)
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

    // todo - what if the list expression is a request or somesuch? can't realize it twice
    // wrap it in a helper function?

    return new JsWrapper(function (env) {

        var listRef = env.realize(list); // realize should be idempotent...

        return listRef + '[' +
            (index === undefined ? listRef + '.length - 1' : env.realize(index)) + ']';
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

    return new JsWrapper(
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

    return new JsWrapper(function (env) {

        return 'function (first, last, action) {\n' +
            'for (var num = first; num <= last; num++) { action(num); }' +
        "}.bind(null," + env.realize(first) + ',' + env.realize(last) + ")";
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

    return new JsWrapper(function (env) {
        return env.realize(source) + '.call(null,' + env.realize(sink) + ')'
    });
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

        return new JsWrapper(function (env) {
            return 'function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {' +
                'return left.concat(right);} else return left + right;}(' +
                env.realize(left) + ',' + env.realize(right) + ')'});
    }

//    make sure both sides are defined
//    could relax this if we want to allow declaration after usage
//    should also factor this out into a getValue() maybe

//    if (node.left.jsVal === undefined) {
//        throw new Error("left operand not defined");
//    }
//
//    if (node.right.jsVal === undefined) {
//        throw new Error("right operand not defined");
//    }

    return new JsWrapper(function (env) {

        // use parens to be safe
        return '(' + env.realize(left) + ' ' + op + ' ' + env.realize(right) + ')';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Literals
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['boolean'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return node.val ? 'true' : 'false';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['number'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return node.val;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['string'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return "'" + node.val.replace(/'/g, "\\'") + "'";
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['list'] = function (node, scope) {

    // list literals might have members that need to be realized

    var self = this;

    var items = node.elements.map(function (item) {
        return self.compile(item, scope);
    });

    return new JsWrapper(function (stmtContext) {
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

    // list literals might have members that need to be realized

    var self = this;

    var members = node.members.map(function (member) {
        return self.compile(member, scope);
    });

    return new JsWrapper(function (stmtContext) {
        return '{' + members.map(function (member) {
            return member.renderExpr(stmtContext)
        }).join(',') + '}';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__.prototype['dyad'] = function (node, scope) {

    var key = this.compile(node.key, scope);
    var value = this.compile(node.value, scope);

    return new JsWrapper(function (stmtContext) {
        return key.renderExpr(stmtContext) + ':' + value.renderExpr(stmtContext);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles a symbol into a string literal for now.
 *
 * @param scope
 * @param node
 */
__.prototype['symbol'] = function (node) {

    return new JsWrapper("'<" + node.name + ">'");
};

module.exports = __;