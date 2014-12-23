/**
 * The Exa-to-Node compiler/VM
 *
 * we need the ability to compile dynamically loaded files
 * compiles provided source file, evals it to create an object
 */

'use strict';

var Q = require('q');
var util = require('util');

var __ = function () {

};

// forget about JS initially, transform into an exa program description, with explicit sequencing
// semantic phase I guess
// then compile into js?
// first pass, go through the AST and tag with deps?
// chain statements as nesting, because each statement kind of defines the context for lower statements?
// then do we not need a separate context idea besides the enclosing node??

var compilers = {};

var compile = function (node, context) {

    if (context == undefined) {
        context = {$_recur: true, $_reply: true, $_fail: true, temps: 0};
    }

//    console.error('compiling ' + node.type + '; context = ' + util.inspect(context));
    compilers[node.type](node, context);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
compilers['program'] = function (node, context) {

    node.code = 'function (args, $_recur, $_reply, $_fail) {\n\n';

    node.statements.forEach(function (stmt) {

        var code = compileChildStatement(node, stmt, context);

        if (code !== undefined) {
            node.code += code + '\n';
        }
    });

    node.code += '}\n';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
compilers['receive'] = function (node, context) {

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
compilers['conditional'] = function (node, context) {

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
compilers['op'] = function (node, context) {

    // op needs left and right to be ready
    // so if the context has them as 'not ready', then it needs to record its needs for the next level up to provide them
    // and it also needs to use temp vars for its immediate needs

    var leftCode = compileChild(node, node.left, context);
    var rightCode = compileChild(node, node.right, context);

    node.code = '(' + leftCode + ' ' + node.op + ' ' + rightCode + ')';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
compilers['id'] = function (node, context) {

    // atom - no children
    node.code = '$_' + node.name;

    if (context['$_' + node.name] === undefined) {
//                throw new Error(node.name + " is undefined at line");
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
compilers['number'] = function (node, context) {

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
compilers['string'] = function (node, context) {

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
compilers['termination'] = function (node, context) {

    // guaranteed to be statements

    node.code = '$_' + node.channel + '(';

    var args = node.message.map(function (arg) {
        return compileChild(node, arg, context);
    });

    node.code += args.join(',') + ');\nreturn';
    node.ready = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @param context
 */
compilers['request'] = function (node, context) {

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
compilers['assign'] = function (node, context) {

    // this is guaranteed to be a statement
    compileChild(node, node.left, context);
    compileChild(node, node.right, context);

    if (node.left.type == 'id') {
        context['$_' + node.left.name] = node.right.ready;
    }

    node.code = node.left.code + ' ' + node.op + ' ' + node.right.code;
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

        return 'Q.spread([' + promises.join(',') + '], function (' + args.join(',') + ') {\n\n' + child.code + '}, $_fail);'
    }

    return child.code;
}

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
    compile: compile
};