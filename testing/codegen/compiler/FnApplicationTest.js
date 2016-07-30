/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["application"] = {

    "no args": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'foo'},
            args: []
        };

        var result = new Context().compile(node);

        // test.ok(result instanceof Blocker);
        // test.equal(JsConstruct.makeStatement(result).render(), 'task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n');
        test.done();
    },

//     "one arg": function (test) {
//
//         var node = {
//             type: 'application',
//             address: {type: 'id', name: 'foo'},
//             args: [
//                 {type: 'number', val: '42'}
//             ]
//         };
//
//         var result = new Context().compile(node);
//
//         test.ok(result instanceof Blocker);
//         test.equal(JsConstruct.makeStatement(result).render(), 'task.sendMessage($foo, [42], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n');
//         test.done();
//     },
//
//     "two args": function (test) {
//
//         var node = {
//             type: 'application',
//             address: {type: 'id', name: 'foo'},
//             args: [
//                 {type: 'number', val: '42'},
//                 {type: 'string', val: 'hi there'}
//             ]
//         };
//
//         var result = new Context().compile(node);
//
//         test.ok(result instanceof Blocker);
//         test.equal(JsConstruct.makeStatement(result).render(), "task.sendMessage($foo, [42, 'hi there'], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n");
//         test.done();
//     },
//
//     "with nested requests": function (test) {
//
//         var node = {
//             type: 'application',
//             address: {type: 'id', name: 'baz'},
//             args: [{
//                 type: 'application',
//                 address: {type: 'id', name: 'foo'},
//                 args: []
//             },{
//                 type: 'application',
//                 address: {type: 'id', name: 'bar'},
//                 args: []
//             }]
//         };
//
//         var result = new Context().compile(node);
//
//         test.ok(result instanceof Blocker);
//         test.equal(JsConstruct.makeStatement(result).render(), "task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($bar, [], function (res) {\nvar P1 = res ? res[0] : null;\ntask.sendMessage($baz, [P0, P1], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n}, null);\n\n}, null);\n\n");
//         test.done();
//     }
// };
//
// module.exports["application statements"] = {
//
//     "application with one arg": function (test) {
//
//         var node = {
//             type: 'application_stmt',
//             application: {
//                 type: 'application',
//                 address: {type: 'id', name: 'foo'},
//                 args: [
//                     {type: 'number', val: '42'}
//                 ]}
//         };
//
//         var a = new Context().compile(node);
//         test.equal(a.render(), 'task.sendMessage($foo, [42], function (res) {\nvar P0 = res ? res[0] : null;\n}, null);\n\n');
//         test.ok(a.async);
//
//         // we don't have a good interaction between resolve & attach because of nesting
//         // attach only looks at the top structure to see if it has pre and post; but resolve
//         // creates nested structures
//         // what does resolving do to a sync message?
//
//         // add a statement after resolving
//         a.attach(new JsConstruct("foo = bar;"));
//         test.equal(a.render(), 'task.sendMessage($foo, [42], function (res) {\nvar P0 = res ? res[0] : null;\nfoo = bar;}, null);\n\n');
//
//         test.done();
//     },
//
//     "with nested applications": function (test) {
//
//         var node = {
//             type: 'application_stmt',
//             application: {
//                 type: 'application',
//                 address: {type: 'id', name: 'baz'},
//                 args: [{
//                     type: 'op',
//                     op: '-',
//                     left: {
//                         type: 'application',
//                         address: {type: 'id', name: 'foo'},
//                         args: []
//                     },
//                     right: {
//                         type: 'application',
//                         address: {type: 'id', name: 'bar'},
//                         args: []
//                     }
//                 }]}
//         };
//
//         test.equal(new Context().compile(node).render(),
//             "task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($bar, [], function (res) {\nvar P1 = res ? res[0] : null;\ntask.sendMessage($baz, [(P0 - P1)], function (res) {\nvar P0 = res ? res[0] : null;\n}, null);\n\n}, null);\n\n}, null);\n\n");
//         test.done();
//     },
//
//     "several nested applications": function (test) {
//
//         var node = {
//             type: 'application_stmt',
//             application: {
//                 type: 'application',
//                 address: {type: 'id', name: 'quux'},
//                 args: [{
//                     type: 'application',
//                     address: {type: 'id', name: 'baz'},
//                     args: [{
//                         type: 'op',
//                         op: '-',
//                         left: {
//                             type: 'application',
//                             address: {type: 'id', name: 'foo'},
//                             args: []
//                         },
//                         right: {
//                             type: 'application',
//                             address: {type: 'id', name: 'bar'},
//                             args: []
//                         }
//                     }]}]}
//         };
//
//         test.equal(new Context().compile(node).render(),
//             "task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($bar, [], function (res) {\nvar P1 = res ? res[0] : null;\ntask.sendMessage($baz, [(P0 - P1)], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($quux, [P0], function (res) {\nvar P0 = res ? res[0] : null;\n}, null);\n\n}, null);\n\n}, null);\n\n}, null);\n\n");
//         test.done();
//     },
//
//     "application in async message": function (test) {
//
//         var node = {
//             type: 'application_stmt',
//             application: {
//                 type: 'message',
//                 address: {
//                     type: 'select',
//                     set: {
//                         type: 'select',
//                         set: {type: 'id', name: 'io'},
//                         member: 'stdout'
//                     },
//                     member: 'write'
//                 },
//                 args: [{
//                     type: 'interpolation',
//                     left: '',
//                     middle: {
//                         type: 'application',
//                         address: {type: 'id', name: 'factorial'},
//                         args: [{
//                             type: 'subscript',
//                             list: {type: 'id', name: 'args'},
//                             index: {type: 'number', val: '0'}
//                         }]
//                     },
//                     right: '\\n'
//                 }]
//             }
//         };
//
//         test.equal(new Context().compile(node).render(),
//             "task.sendMessage($factorial, [$args[0]], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($io.stdout.write, ['' + P0 + '\\n'], null, null);\n}, null);\n\n");
//
//         test.done();
//     }
};
