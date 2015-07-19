/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
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

        var obj = Compiler.compile(node);

        // important! - procedures are never async objects, regardless of whether they contain async statements
        test.equal(obj.isAsync(), false);
        test.equal(obj.render(),
            "function ($recur, args) {var $result;\n\nvar $next = args.shift();\n\n$bar($bar, [42]).then(function (x1) {$result *= x1;\n})\n\nthis.tryClose();}");
        test.done();
    }
};
