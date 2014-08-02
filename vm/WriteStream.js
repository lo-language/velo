/**
 * Created by: spurcell
 * 7/6/14
 *
 * Factory for wraping node writable streams
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
        // todo - make this take an args array like a proper action - this is a fake pass-through right now
        $writeLine: function (line) {
            stream.write(line + '\n');
        }
    };
};

module.exports = __;