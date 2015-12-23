/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["procedure"] = {

    "basic": function (test) {

        var node = {
            type: 'procedure',
            body: {
                type: 'stmt_list',
                head:
                    { type: 'receive', names: [ 'next' ] }, tail: { type: 'stmt_list', head:
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
            }
        };

        var obj = new Scope().compile(node);

        test.equal(obj.render(),
            'function (task) {var $next, $result;\n\nvar $recur = task.service;\n$next = task.args.shift();\n\n' +
            'task.sendMessage($bar, [42], function (P0) {$result *= P0;\ntask.pickupReplies();\n}, null, true);\n\n}');
        test.done();
    }
};
