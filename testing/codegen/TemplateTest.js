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

module.exports = {

    "response": function (test) {




        test.done();
    }
};

// compiled procedure template
function foo(args, $recur, reply, fail) {

    var complete = false;
    var responded = false;
    var pendingResponses = 0;
    var runningSubtasks = 0;

    var checkStatus = function () {

        if (!responded && complete && pendingResponses == 0) {

            responded = true;

            // default reply
            reply();
        }
    };

    var collectResponse = function (handler, args) {

        pendingResponses--;

        if (handler !== null) {
            handler(args);
        }
        else {
            // since we won't check on the completion of the handler
            checkStatus();
        }
    };

    // send message template
    pendingResponses++;
    bar(args, bar, collectResponse.bind(null, onSuccess), collectResponse.bind(null, onFailure));


    // response handlers receive the args sent via reply()/fail()
    // reply handlers are either continuations or promise resolvers

    var onSuccess = function (args) {

    };

    var onFailure = function (args) {

    };


    // reply A;
    if (!responded) { responded = true; reply($a); }
    return;

    // fail B;
    if (!responded) { responded = true; fail($b); }
    return;

    // implicit reply at the end of every procedure
    complete = true;
    checkStatus();
}