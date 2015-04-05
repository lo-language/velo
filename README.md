## ExaJS: The Exa-to-JavaScript Compiler

This system compiles Exa programs into JavaScript.

#### To run the tests 

In the project root folder:

    npm test

#### How code generation works

The compiler generates JavaScript source from the AST bottom-up by snapping together chunks of JS wrapped in the following classes, almost like assembling a JS AST.

**JsConstruct**

Base class for holding chunks of JS; expands helper objects such as "csv lists".

**JsResolver**

Extends JsConstruct; detects promises within its parts and swaps them with placeholders and then wraps the whole thing in a promise-resolving callback passed to a Q.spread() or then().

**JsRequest**

Extends JsResolver to resolve its contents, so that the arguments to a call are never promises, but always values. Models a request by flagging itself as async regardless of its contents. To put it another way, makes sure its arguments are ready and marks itself as a promise.

**JsStatement**

Extends JsConstruct to provide a statement context; that is, it can't be used in expressions, but can be appended to preceding statements or have following statements appended to it, potentially requiring the construction of promise chains.
