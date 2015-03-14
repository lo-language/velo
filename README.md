## ExaJS: The Exa-to-JavaScript Compiler

To run a program:

    exa [source file]


To run the tests:

    npm test


To generate the parser,

    cd parser
    ./generate


#### How it works

Each AST node is compiled into either a bare JS string or an array of strings, arrays, and objects.

In the compile phase, the AST is traversed and each node is compiled into either a bare JS string or a JS "construct" which is a list of JS strings and sub-constructs produced by compiling sub-nodes. Simple nodes, such as literals, compile into bare JS strings. More complex nodes compile into constructs, e.g. an addition node would compile into the construct ['(', leftOperand, ' + ', rightOperand, ')']

In the render phase, the JS constructs are recursively rendered into strings.

The trick is that some nodes are *deferred*, which means they can't be used directly in expressions, they must first be "resolved" into a value. For instance every request e.g. foo() is a deferred expression since all messages are async; to use its value in an expression, we need to evaluate that expression inside a "resolver" which is a JS wrapper that calls foo() and then picks up the rest of the expression with the result.
