"use strict";

/**
 * Created by: spurcell
 * 2/6/16
 */

"use strict";

var Future = require('../../runtime/Future');

module.exports["basics"] = {

    'resolve first': function (test) {

        test.expect(1);

        var f = new Future();

        f.resolve('boo');

        f.onResolve(function (val) {

            test.equal(val, 'boo');
            test.done();
        });
    },

    'setup first': function (test) {

        test.expect(1);

        var f = new Future();

        f.onResolve(function (val) {

            test.equal(val, 'snooks');
            test.done();
        });

        f.resolve('snooks');
    }
};
