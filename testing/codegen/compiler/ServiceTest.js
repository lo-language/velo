/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
var util = require('util');

module.exports["service"] = {

    "basic": function (test) {

        var node = {
            type: 'procedure',
            params: ['next'],
            body: {
                type: 'stmt_list',
                head:
                    { type: 'assign',
                        op: '*=',
                        left: { type: 'id', name: 'result' },
                        right: {
                            type: 'application',
                            address: {type: 'id', name: 'bar'},
                            args: [
                                {type: 'number', val: '42'}
                            ]} },
                tail: null}
        };

        // create a higher-level 'service' construct?

        var result = JS.fnDef([JS.ID('task')], [

        ]);

        test.equal(new Context().compile(node).getTree(), result);

        // test.equal(new Context().compile(node),
        //     'function (task) {var $recur = task.service;\nvar $next, $result;\n\n$next = task.args[0];\n\n' +
        //     'task.sendMessage($bar, [42], function (res) {\nvar P0 = res ? res[0] : null;\n$result *= P0;\n}, null);\n\n}');
        test.done();
    }
};
