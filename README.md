## A [Lo](http://lolang.org)-to-JavaScript compiler, written in JavaScript.

Can operate as a load-and-go compiler to seamlessly compile, load, and run a Lo program, or be used to build statically-linked JavaScript files for execution in Node.js or browser contexts.

## Installation

Clone the repo then in the project root folder do:

    $ npm install -g
    
#### To run the project tests 

In the project root folder:

    $ npm test
    
## Usage

#### To compile and run a program

    $ lo <root module>


#### To build a Node executable

    $ lo --build <root module>


## Implementation

#### Parsing

Scanning and parsing are handled by a parser generated by ANTLR; a Lo AST is constructed and handed to the backend.

#### Code Generation

Each node in the Lo AST compiles itself to a JavaScript AST which is then rendered into JavaScript. By default the compiler will cache compiled modules on disk (similar to make).

#### Runtime

The runtime consists of Task.js, which models the Lo task tree.

## License

Copyright (c) Seth Purcell

Licensed under Apache License v2.0 with Runtime Library Exception

See LICENSE.txt in the project root for license information.