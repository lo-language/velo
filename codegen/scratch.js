/**
 * Created by: spurcell
 * 2/15/15
 */

"use strict";

Q.spread([bar()], function (tmp_0) {
    Q.spread([foo([tmp_0])], function (tmp_0) {
        tmp_0;
    }, result.reject);
}, result.reject);


Q.spread([bar()], function (tmp_0) {
    Q.spread([foo([tmp_0])], function (tmp_0) {
        tmp_0;
    }, result.reject);
    ;
}, result.reject);
