/**
 * The Exa-to-JS compiler
 *
 * How it works:
 *
 * Each AST node is compiled into either a bare JS string or an array of strings, arrays, and objects.
 *
 * In the compile phase, the AST is traversed and each node is compiled into either a bare JS string or a JS "construct" which is a list of JS strings and sub-constructs produced by compiling sub-nodes. Simple nodes, such as literals, compile into bare JS strings. More complex nodes compile into constructs, e.g. an addition node would compile into the construct ['(', leftOperand, ' + ', rightOperand, ')']
 *
 * Note:
 * To compile an expression containing a request, we have to do a trick where we create a "resolver" block to wrap the expression.
 */

'use strict';

var Q = require('q');
var Scope = require('./Scope');
var JsConstruct = require('./JsConstruct');

var __ = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the given AST into JS source.
 *
 * @param ast
 * @return {String}
 */
__.getJs = function (ast) {

    return __.render(__.compile(ast));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Dispatches to the appropriate node type handler.
 *
 * @param node
 * @param scope
 * @return {*}
 */
__.compile = function (node, scope) {

    if (this[node.type] === undefined) {
        throw new Error("don't know how to compile node type '" + node.type + "'");
    }

//    console.error('compiling ' + node.type);

    // dispatch to the appropriate handler
    return __[node.type](node, scope);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the given construct into JS source. A construct can be a string, a request,
 * or an array of strings and constructs.
 *
 * @param jsConstruct   either a string or an array
 * @return {String}
 */
__.render = function (jsConstruct) {

    if (typeof jsConstruct == 'string') {
        return jsConstruct;
    }

    // catch barriers
    if (typeof jsConstruct == 'object' && jsConstruct.stmt !== undefined) {
        return __.render(jsConstruct.stmt);
    }

    // flatten any sub-arrays or comma-separated-value lists before we begin

    function flatten (list) {

        // flatten CSVs
        if (typeof list == 'object' && list.csv !== undefined) {

            return flatten(list.csv.reduce(function (prev, current, index) {

                if (index > 0) {
                    prev.push(',');
                }

                return prev.concat(current);
            }, []));
        }

        // flatten arrays
        if (Array.isArray(list)) {

            return list.reduce(function (prev, current) {
                return prev.concat(flatten(current));
            }, []);
        }

        // base case
        return list;
    };

    // concatenate the parts as a string

    var requests = [];
    var placeholders = [];

    var result = flatten(jsConstruct).reduce(function (prev, current) {

        if (typeof current == 'string') {
            return prev + current;
        }

        // swap requests for placeholder variables, and stash the request for later utilization

        if (typeof current == 'object' && current.req !== undefined) {

            // do a switcheroo - save the request, return a placeholder name to be used in the expression

            var name = 'PH' + requests.length;

            placeholders.push(name);

            // stash the request
            requests.push(current.req);

            return prev + name;
        }

        // catch sync barriers
        if (typeof current == 'object' && current.stmt !== undefined) {
            return prev + __.render(current.stmt);
        }

        console.log(jsConstruct);
        console.log(current);
        throw new Error("unexpected JS part: " + current);
    }, '');

    // if there were any requests in this construct, we have to render a resolver around the result

    if (requests.length > 0) {

        // create a new JSConstruct for the resolver

        var resolver = ['Q.spread([', {csv: requests}, '], function (', {csv: placeholders}, ') {\n',
            result,
            '\n}, result.reject);'];

        return __.render(resolver);
    }

    return result;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A procedure is an expression.
 *
 * @param scope
 * @param node
 */
__['procedure'] = function (node, scope) {

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
    var body = __.compile(node.body, localScope);

    return ['function ($recur, args) {\n\n    ',
            'var result = Q.defer();\n\n    ',
            body,
            'return result.promise;\n}'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['stmt_list'] = function (node, scope) {

    // hooray for Lisp!

    var head = {stmt: __.compile(node.head, scope)};

    if (node.tail) {
        return {stmt: [head, __.compile(node.tail, scope)]};
    }

    return {stmt: head};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Statements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param scope
 * @param node
 */
__['receive'] = function (node, scope) {

    return 'var ' + node.names.map(function (name) {
        return '$' + name + ' = ' + 'args.shift()';
    }).join(',\n') + ';';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['expr_stmt'] = function (node, scope) {

    var expr = __.compile(node.expr, scope);

    // optimization/hack - unwrap the request so it doesn't render an unnecessary resolver

    // and slap a semicolon on that bad boy

    return expr.req.concat(';');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['result'] = function (node, scope) {

    // should this node type be renamed response?

    var name = 'result.resolve';

    if (node.channel === 'fail') {
        name = 'result.reject';
    }

    var self = this;

    var args = node.args.map(function (arg) {
        return self.compile(arg, scope);
    });

    return [name, '(', {csv: args}, ');\nreturn result.promise;'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current scope by defining a variable in it if the LHS of the assign
 * is a simple identifier.
 *
 * @param scope
 * @param node
 */
__['assign'] = function (node, scope) {

    // this is guaranteed to be a statement

    var left = __.compile(node.left, scope);
    var right = __.compile(node.right, scope);

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

    return [left, ' ' + node.op + ' ', right, ';'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['conditional'] = function (node, scope) {

    // needs predicate to be ready

    var predicate = __.compile(node.predicate);
    var consequent = __.compile(node.consequent, scope);
    var negBlock = false;

    if (node.otherwise) {
        negBlock = __.compile(node.otherwise, scope);
    }

    // todo we might want to rewrite this to only resolve the blocks after evaluating the predicate

    var stmt = ['if (', predicate, ') {\n', consequent, '\n', '}'];

    if (negBlock) {
        stmt.push('\nelse {\n', negBlock, '\n}');
    }

    return stmt;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loops while a condition is true.
 *
 * @param scope
 * @param node
 */
__['iteration'] = function (node, scope) {

    var condition = __.compile(node.condition, scope);
//    var statements = __.compile(node.statements, scope);

    return new JsWrapper(function (resolver) {
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
__['complete'] = function (node, scope) {

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
__['request'] = function (node, scope) {

    var target = __.compile(node.to);

    // todo add convenience method for compiling arrays?
    var args = node.args.map(function (arg) {
        return __.compile(arg);
    });

    return {req: [target, '(', target, ',[', {csv: args}, '])']};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Expressions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['id'] = function (node) {

    return '$' + node.name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['cardinality'] = function (node, scope) {

    var right = __.compile(node.operand, scope);

    // wrap in small function? inspects type then gets size?

    // make a general JS code class? that can hold string and expr parts?
    // do we really need the JS AST level? or could we compile directly in one pass?

    return [
        'function (val) {' +
            "if (typeof val === 'string') return val.length;" +
            "else if (Array.isArray(val)) return val.length;" +
            "else if (typeof val === 'object') return Object.keys(val).length;" +
            "}(", right, ")"];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['complement'] = function (node, scope) {

    return ['!', __.compile(node.operand, scope)];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['subscript'] = function (node, scope) {

    // this is guaranteed to be a statement

    var list = __.compile(node.list, scope);
    var index = undefined;

    if (node.index !== undefined) {
        index = __.compile(node.index, scope);
    }

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?

    return [list, '[', (index === undefined ? list + '.length - 1' : index), ']'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['in'] = function (node, scope) {

    // should holds apply to strings? maybe as 'contains'? or some non-word operator?

    var left = __.compile(node.left, scope);
    var right = __.compile(node.right, scope);

    return ['function (item, collection) {' +
            "if (Array.isArray(collection)) return collection.indexOf(item) >= 0;" +
            "else if (typeof val === 'object') return collection.hasOwnProperty(item);" +
            "}(", left, ',', right, ")"];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['sequence'] = function (node, scope) {

    var first = __.compile(node.first, scope);
    var last = __.compile(node.last, scope);

    // renders an expression that is a function that takes a single arg -
    // the action to be performed

    return ['function (first, last, action) {\n' +
            'for (var num = first; num <= last; num++) { action(num); }' +
        "}.bind(null,", first, ',', last, ')'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['connection'] = function (node, scope) {

    // how to handle multiple connectors?

    // sources and sinks are like calls in that they generate both statements and expressions
    // they have expressions but inject statements into the context

    var source = __.compile(node.source, scope);
    var sink = __.compile(node.sink, scope);

    return [source, '.call(null,', sink, ')'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['op'] = function (node, scope) {

    var left = __.compile(node.left, scope);
    var right = __.compile(node.right, scope);

    var op = node.op;

    if (op === 'and') {
        op = '&&';
    }
    else if (op === 'or') {
        op = '||';
    }
    else if (op == '+') {

        // todo drop this in favor of combination operator ><
        return ['function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {' +
                'return left.concat(right);} else return left + right;}(',
                left, ',', right, ')'];
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

    // use parens to be safe
    return ['(', left, ' ', op, ' ', right, ')'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Literals
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['boolean'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return node.val ? 'true' : 'false';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['number'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return node.val;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['string'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return "'" + node.val.replace(/'/g, "\\'") + "'";
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['list'] = function (node, scope) {

    // list literals might have members that need to be realized

    var self = this;

    var items = node.elements.map(function (item) {
        return self.compile(item, scope);
    });


    return ['[', {csv: items}, ']'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['set'] = function (node, scope) {

    // list literals might have members that need to be realized

    var self = this;

    var members = node.members.map(function (member) {
        return self.compile(member, scope);
    });

    return ['{', {csv: members}, '}'];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['dyad'] = function (node, scope) {

    var key = __.compile(node.key, scope);
    var value = __.compile(node.value, scope);

    return [key, ':', value];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles a symbol into a string literal for now.
 *
 * @param scope
 * @param node
 */
__['symbol'] = function (node) {

    return "'<" + node.name + ">'";
};

module.exports = __;