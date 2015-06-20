/*
 * Copyright (C) 2014 by Seth Purcell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Author: Seth Purcell
 * 5/17/15
 */

// this file tests the template for compiled procedures

"use strict";

var Compiler = require('../../codegen/Compiler');
var JsConstruct = require('../../codegen/JsConstruct');
var JsStatement = require('../../codegen/JsStatement');

module.exports = {

    "reply terminates procedure": function (test) {

        test.expect(1);

        // AST for a proc that tries to reply twice - first reply should cut off processing before we hit second

        // todo have a test where the calls are triggered by responses
        // this is a trivial test because the calls to reply follow sequentially

        var ast = { type: 'procedure',
            body:
            { type: 'stmt_list',
                head:
                {
                    type: 'response',
                    channel: 'reply',
                    args: [
                        {type: 'number', val: '42'}
                    ]},
                tail:
                {
                    type: 'response',
                    channel: 'fail',
                    args: [
                        {type: 'number', val: '52'}
                    ]} } };

        // compile that bad boy into JS

        var js = Compiler.compile(ast).render();

        var body = '"use strict";\n\nvar root = ' + js +
            ';\n\nreturn root(args, root, root_reply, root_fail)';

        var procedure = new Function('args, recur, root_reply, root_fail', body);

        procedure([], null,
            function (val) {

                test.equal(val, 42);
                test.done();
        },
        function (val) {

            test.fail();
        });
    },

    "fail terminates procedure": function (test) {

        test.expect(1);

        // AST for a proc that tries to reply twice - first reply should cut off processing before we hit second

        // todo have a test where the calls are triggered by responses
        // this is a trivial test because the calls to reply follow sequentially

        var ast = { type: 'procedure',
            body:
            { type: 'stmt_list',
                head:
                {
                    type: 'response',
                    channel: 'fail',
                    args: [
                        {type: 'number', val: '42'}
                    ]},
                tail:
                {
                    type: 'response',
                    channel: 'reply',
                    args: [
                        {type: 'number', val: '52'}
                    ]} } };

        // compile that bad boy into JS

        var js = Compiler.compile(ast).render();

        var body = '"use strict";\n\nvar root = ' + js +
            ';\n\nreturn root(args, root, root_reply, root_fail)';

        var procedure = new Function('args, recur, root_reply, root_fail', body);

        procedure([], null,
            function (val) {

                test.fail();
            },
            function (val) {

                test.equal(val, 42);
                test.done();
            });
    },

    "sync async call": function (test) {

        // define a procedure that makes an async call synchronously

        var ast = { type: 'procedure',
            body:
            { type: 'stmt_list',
                head:
                {
                    type: 'request',
                    to: {type: 'id', name: 'foo'},
                    args: [
                        {type: 'number', val: '42'}
                    ]},
                tail:
                {
                    type: 'response',
                    channel: 'reply',
                    args: [
                        {type: 'number', val: '42'}
                    ]} } };

        var js = Compiler.compile(ast).render();

        console.log(js);

        test.done();
    }

//    "reply is idempotent": function (test) {
//
//        test.done();
//    },
//
//    "fail is idempotent": function (test) {
//
//        test.done();
//    },
//
//    "reply precludes fail": function (test) {
//
//        test.done();
//    },
//
//    "fail precludes reply": function (test) {
//
//        test.done();
//    },
//
//    "implicit reply": function (test) {
//
//        test.done();
//    },
//
//    "double reply is prevented": function (test) {
//
//        test.done();
//    },
//
//    "double fail is prevented": function (test) {
//
//        test.done();
//    },
//
//    "works async": function (test) {
//
//        test.done();
//    }
};

// patch out proc

Compiler['procedure'] = function (node, scope) {

    var localScope;

    // if there's no enclosing scope, we're at the root of the scope tree
    if (scope === undefined) {
        localScope = new Scope();
    }
    else {
        // create a nested scope for the procedure's statements
        localScope = scope.bud();
    }

    // compile the statement(s) in the context of the local scope
    var body = Compiler.compile(node.body, localScope);

    var vars = Object.keys(localScope.vars);
    var varNames = vars.map(function (key) {
        return localScope.vars[key];
    });

    if (vars.length > 0) {
        body = ['var ' + varNames.join(', ') + ';\n\n', body];
    }

    return new JsConstruct(['function foo(args, $recur, reply, fail) ',
        {block: [procHeader, body, procFooter]}], false);
};

// patch out response

Compiler['response'] = function (node, scope) {

    var args = node.args.map(function (arg) {
        return Compiler.compile(arg, scope);
    });

    // might need to process.nextTick() these guys
    if (node.channel === 'fail') {
        return new JsStatement(['if (fail !== null) { var temp = fail; reply = fail = null; temp(', {csv: args}, '); }\nreturn;\n\n']);
    }

    return new JsStatement(['if (reply !== null) { var temp = reply; reply = fail = null; temp(', {csv: args}, '); }\nreturn;\n\n']);
};

// patch out request

Compiler['request'] = function (node, scope) {

    var target = Compiler.compile(node.to);

    // todo add convenience method for compiling arrays?
    var args = node.args.map(function (arg) {
        return Compiler.compile(arg);
    });

    var parts = [];

    // if we're looking for a response of either type, we need to track it
    if (node.handler || node.catcher) {
        parts = ['tasks++;\n'];
    }

    var handler = '';
    var catcher = '';

    // send message template
    return new JsStatement([target, '(', {csv: [args, target, handler, catcher]}, ');\n\n']);
};

// template for a *request* handler

var procHeader = "\
\n\n\
    var tasks = 1; // this handler counts as a task\
\n\n\
    var completeTask = function () {\
\n\n\
        tasks--;\
\n\n\
        if (tasks == 0 && reply !== null) {\
\n\n\
            // implicit reply\
            var temp = reply;\
            reply = fail = null; // self-destruct\
            temp();\n\
        }\n\
    };\n\n";
/*
    // an async message 42 -> foo => x becomes:
    // 42 -> foo ~>

    $x = Q.defer();

    foo([42], foo, collectResponse.bind(null, function (args) { // recur, reply, fail left off responses for now

        $x.resolve(args);

    }), collectResponse.bind(null, function (args) {
    }));

    // response handlers receive the args sent via reply()/fail()
    // reply handlers are either continuations or promise resolvers

    // a sync message x = foo(42) becomes:

    foo([42], foo, collectResponse.bind(null, function (args) {

        x = args;

        // the rest of the procedure goes right here as a continuation

    });

*/
var procFooter = '\n\
    // implicit reply at the end of every procedure\n\
    completeTask();\n';
