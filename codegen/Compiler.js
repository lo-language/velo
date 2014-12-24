/**
 * The Exa-to-Node compiler/VM
 *
 * the design of this language is predicated on automated testing -
 * errors that could conceivably be detected at compile-time ARE NOT
 */

'use strict';

var Q = require('q');
var util = require('util');

var __ = function () {

};
/*

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

var handlers = {};

var compile = function (node, context) {

    if (context == undefined) {
        context = {$_recur: true, $_reply: true, $_fail: true, temps: 0};
    }

//    console.error('compiling ' + node.type + '; context = ' + util.inspect(context));
    handlers[node.type](node, context);

    return node.code;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['program'] = function (node, context) {

    // load the user arguments into args
    node.code = 'var args = Array.prototype.slice.call(arguments, 2);\n';
    node.code += 'var result = Q.defer();\n';
//    node.code += 'console.log(arguments);\n';

    node.statements.forEach(function (stmt) {

        var code = compileChildStatement(node, stmt, context);

        if (code !== undefined) {
            node.code += code + '\n';
        }
    });

    node.code += 'return result.promise;\n'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['receive'] = function (node, context) {

    node.code = '';

    node.names.forEach(function (id, index) {
        context['$_' + id] = true;
        node.code += 'var $_' + id + ' = args[' + index + '];\n';
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['conditional'] = function (node, context) {

    // select needs cond to be ready

    compileChild(node, node.predicate, context);

    node.code = 'if (' + node.predicate.code + ') {\n';

    node.positive.forEach(function (stmt) {
        var code = compileChildStatement(node, stmt, context);
        node.code += indent(code) + '\n';
    });

    node.code += '}\n';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['op'] = function (node, context) {

    // op needs left and right to be ready
    // so if the context has them as 'not ready', then it needs to record its needs for the next level up to provide them
    // and it also needs to use temp vars for its immediate needs

    var leftCode = compileChild(node, node.left, context);
    var rightCode = compileChild(node, node.right, context);

    // use parens to be safe
    node.code = '(' + leftCode + ' ' + node.op + ' ' + rightCode + ')';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['id'] = function (node, context) {

    // atom - no children
    node.code = '$_' + node.name;

    if (context['$_' + node.name] === undefined) {
        node.status = 'undefined';
    }
    else if (context['$_' + node.name] === true) {
        node.ready = true;
    }
    else {
        node.ready = false;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['boolean'] = function (node, context) {

    // atom - no children
    node.code = node.val;
    node.ready = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['number'] = function (node, context) {

    // atom - no children
    node.code = node.val;
    node.ready = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['string'] = function (node, context) {

    // atom - no children
    node.code = "'" + node.val + "'";
    node.ready = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['request'] = function (node, context) {

    // can be part of an expression or a stand-alone statement
    node.code = compileChild(node, node.to, context) + '(';

    node.message.forEach(function (arg) {
        node.code += compileChild(node, arg, context);
    });

    node.code += ')';
    node.ready = false; // for if this send is used in an expression
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
handlers['termination'] = function (node, context) {

    // guaranteed to be statements

    if (node.channel === 'reply') {
        node.code = 'result.resolve('
    }
    else {
        node.code = 'result.reject('
    }

    var args = node.message.map(function (arg) {
        return compileChild(node, arg, context);
    });

    node.code += args.join(',') + ');\nreturn result.promise';
    node.ready = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current context by creating a variable in the context - if the LHS of the assign
 * is a simple identifier.
 *
 * @param node
 * @param context
 */
handlers['assign'] = function (node, context) {

    // this is guaranteed to be a statement
    compileChild(node, node.left, context);
    compileChild(node, node.right, context);

    if (node.left.type == 'id') {
        context['$_' + node.left.name] = node.right.ready || 'unknown';
    }

    node.code = node.left.code + ' ' + node.op + ' ' + node.right.code;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current context by creating a variable in the context - if the LHS of the assign
 * is a simple identifier.
 *
 * @param node
 * @param context
 */
handlers['subscript'] = function (node, context) {

    // this is guaranteed to be a statement
    compileChild(node, node.list, context);
    compileChild(node, node.index, context);

    node.code = node.list.code + '[' + node.index.code + ']';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent
 * @param child
 * @param context
 */
function compileChild(parent, child, context) {

    compile(child, context);

    // inherit child's preconditions

    if (child.preCond !== undefined) {

        if (parent.preCond === undefined) {
            parent.preCond = {};
        }

        Object.keys(child.preCond).forEach(function (tempVar) {
            parent.preCond[tempVar] = child.preCond[tempVar];
        });
    }

    // see if the child needs to be replaced with a temp var

    if (child.ready === false) {

        var tempVarName = 'tmp_' + context.temps;
        context.temps++;

        if (parent.preCond === undefined) {
            parent.preCond = {};
        }

        parent.preCond[tempVarName] = child.code;

        return tempVarName;
    }

    return child.code;
}

function compileChildStatement(parent, child, context) {

    compile(child, context);

    // render child's preconditions

    if (child.preCond !== undefined) {

        var args = Object.keys(child.preCond);
        var promises = args.map(function (tempVar) {
            return child.preCond[tempVar];
        });

        // could alternatively create a new rejection handler here, rather than reusing the parent context's
        return 'Q.spread([' + promises.join(',') + '], function (' + args.join(',') + ') {\n\n' + child.code + '}, result.reject);'
    }

    return child.code;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Pretty-prints the given JS code.
 *
 * @param code
 * @return {String}
 */
__.prototype.prettyPrint = function (code) {

    // parse the JS

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param stmt
 * @return {String}
 */
function indent(code) {

    // just make a pretty-print function instead, when we want to look at code?

    var code = code.replace(/\n/gm, '\n    ');

//    if (stmt.type !== 'select' && stmt.type !== 'receive') {
        code += ';';
//    }

    return '    ' + code;
}

module.exports = {
    compile: compile,
    handlers: handlers
};