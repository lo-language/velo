## ExaJS: The Exa-to-JavaScript Compiler

To run a program:

    exa [source file]


To run the tests:

    npm test


To generate the parser,

    cd parser
    ./generate


#### How it works

The compiler works in two phases: compile and render.

In the compile phase, the AST is traversed and each node is compiled into a structure that can be rendered into JS. Simple nodes, such as literals, can return bare JS strings. More complex nodes return wrapper objects that can be rendered to produce JS; these objects can embed the results of compiling sub nodes.

In the render phase, the wrapper objects are rendered into JS.

The trick is that some nodes are *deferred*, which means they can't be used directly in expressions, they must first be "resolved" into a value. For instance every request e.g. foo() is a deferred expression since all messages are async; to use its value in an expression, we need to evaluate that expression inside a "resolver" which is a JS wrapper that calls foo() and then picks up the rest of the expression with the result.
