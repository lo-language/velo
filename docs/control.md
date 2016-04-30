## Control Structures

### Conditionals and Iteration

Exa provides the usual `if`/`else if`/`else` construct. Predicates need not be enclosed in parentheses.

```
if x == 42 {
	success = true;
}
else if x < 42 and x > 14 {
	success = false;
}
else {
	success = true;
}
```

The familiar `while` loop provides indefinite iteration.

```
while z > 0 {
	fibs[-1] + fibs[-2] -> fibs;
	z--;
}
```

To iterate over the elements of a collection, use the scan operator: `>>`.

```
greats >> {

    receive key, value;
    
    // do stuff
};
```

There are no other looping constructs.




## Requests

A [service](procedures.md) is invoked by sending a request to an address. A request can be sent synchronously with the familiar function application syntax:

```
doSomething(arg1, arg2);
```

or asynchronously with the addition of an asterisk:

```
doSomething<arg1, arg2>;	// we don't care about any reply
```

If a request is sent synchronously, the next statement won't be executed until a reply is received. *Note: if there is no reply to a synchronous request, the next statement will never be executed.*

As you'd expect, a synchronous request is an expression that evaluates to the value of the reply. 

```
foo = sqrt(25);	// foo will be assigned 5
```

If a request is sent asynchronously, the next statement will be executed immediately, without waiting for a reply. If you'd like to do something after a response is received, a **handler**  can be attached to the request using a `then` clause (to handle a success response) or a `catch` clause (to handle a failure).

```
readFile<fileName> then {
	log("done reading `fileName`");
};

log<"this will be logged first">;
```

*Note: all statements following an asynchronous request are executed before any handler is run except in the case of futures (see below). Replies to async requests are enqueued as they are received.*

Like most protocols, but unlike most languages, Exa has a clear and explicit concept of failure: *every request can succeed or fail.* This is implemented not by [somehow](https://en.wikipedia.org/wiki/Semipredicate_problem) marking or categorizing a reply as success or failure, but by providing a second channel for failure responses: every request includes neither, either, or both of two distinct handlers - a success handler, introduced by the `after` construct, and a failure handler, introduced by the `failure` construct.

```
readFile<fileName> then {
	log<"done reading `fileName`">;
}
catch => error {
	log<"error reading `fileName`: `error`">;
}
```

An async request can be thought of as a hybrid language construct that fuses a message dispatch with a specialized conditional; if you've worked with promises this approach will feel familiar to you.

A failure handler can easily swap in its own value for one that was expected from a success reply using `substitute`.**

```
getAnswer<> => answer then {
	write("the answer is... `answer`");
}
catch {
	substitute 42;
}
```

To handle the case where a reply was expected but not received within a certain amount of time, requests can also have timeouts**:

```
after getAnswer => answer:
	write("the answer is... `answer`");
failure:
	provide 42;
timeout 5ms:
	log("failed to read the file");
```

### Handlers

Think of handlers as part of the main flow of the procedure, like an if/else block, rather than as a sub-procedure. They share the same scope as their enclosing procedure.

Modules only provide ability, not authority.

** not yet implemented and design subject to change
