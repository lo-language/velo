/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Define = require('../../ast/Define');

module.exports["json"] = {

    "basic": function (test) {

        var val = new Define('foo', 3);

        test.deepEqual(val.toJSON(), ['define', 'foo', 3]);
        test.done();
    }
};

module.exports["render"] = {

    "base": function (test) {

        test.expect(2);

        var define = new Define("foo", 5);

        var scope = {
            define: function (name, value) {
                test.equal(name, 'foo');
                test.equal(value, 5);
            }
        };

        define.render(scope);

        test.done();
    }
};