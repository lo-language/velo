/**
 * Created by: spurcell
 * 7/6/14
 *
 * wraps a node writable stream
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param system
 * @param def
 * @private
 */
var __ = function () {
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Factory
 *
 * @param system
 * @param stream
 * @return {Object}
 */
__.create = function (system, stream) {

    this.system = system;

    return {
        $writeLine: function (line) {
            stream.write(line + '\n');
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.action = function (message) {

};

module.exports = __;