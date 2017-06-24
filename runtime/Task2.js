/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/*

1. there's always a task in scope. even a one-way message gets a task.
2. a handler should thus get its own task? that makes sense
3. here's the bug: a handler defined in a task attaches its requests to its parent task. bad.

API:

// doesn't wait for any response

task.sendOneWay(target, args);


// records that we're awaiting a response

task.sendRequest(target, args);



// only works in a request context

task.sendResponse(args);

 */