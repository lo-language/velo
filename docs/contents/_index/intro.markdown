## Concurrency + Security + Testability

Download Opake v0.1 Here (MIT License)

Opake is a simple general-purpose programming language designed to make writing secure, concurrent software intuitive and easy.

While most programming languages ignore these, Opake elevates them to primary concerns - and it does so by leaving things *out*.

Opake is secretly a dataflow language.

This is accomplished primarily by two mechanisms:

- total encapsulation
- purely asynchronous communication

Total encapsulation entails:

- no global symbols - not just global variables, but global symbols.
- no direct access of attributes.

Not only can nothing reach directly into an object, but objects can't reach out.

The last one achieves locality independence:

 3. any dependency can be replaced with something remote without breaking abstraction

instead of referential transparency we have locality transparency.

#### Example 1: Hello World


    (args, io) {

        io.stdout:write("Hello, world!\n")
    }

#### Example 2: A trivial web app using the bundled HTTP library

    (args, io, env, shop) {

        shop:make('Http/Server') => server

        server:accept(8080) >> (request) {}

        server:accept(8080) >> (request) {

            request:end("hi there!")
        }
        ~> (err) {

            io.stderr:write("error in server: " + err)

            result ->

            err ~>
        }
    }

#### Example 3: A better web app with logging and graceful exit

    (args, io, env, shop) {

        port = 8080

        shop:make('Http/Logger/ELF', io.stdout) => logger
        shop:make('Http/Server', logger) => server

        server:onRequest >> (request) {
            request:end("hi there!")
        }

        server:open(port) -> {
            io.stderr:write("server running on port |port");
        },
        (err) {
            io.stderr:write("failed to open port |port: " + err);
        }

        io.signaller:trap('SIGINT') >> {
            io.stderr:write("received SIGINT")
            server:close
        }
    }

#### Example: Streaming Base16 Encoding

    // every tape is just a string of bytes at base, but there's metadata as well
    // the type is attached to the NAME, not the tape?

    symbols = "0123456789ABCDEF" // utf-8
    strBytes = symbols as byte* // uses the same underlying memory in a different way

    typeof symbols == bytes

    (symbols as int*)[0]

    symbols[0] // this is a unicode char

    bytes >> (byte) {

        chunk += byte

        if (#chunk == 5) {


        }
    }


#### Example 4: Loops

#### Example 5: Iterations

    // call a block for every element of stringList

    iter stringList >> (msg) {
        io.stderr:write(msg)
    }

    // this would be interesting sugar

    stringList >> io.stderr:write

#### Protocols

    protocol {

        init: () {

        }

        write: () {

        }
    }

Send-message operator is : - creates and sends a message

#### Channels

These are routing operators: >>, ->, ~>
>> means accept multiple messages
-> means accept one message
send message using target:message(args) syntax
a send-message statement doesn't evaluate to a value; it produces 0-n messages that can be routed with a routing operator
likewise a handler block doesn't evaluate to a value; it handles and produces messages

#### Visibility

data is invisible to everyone. messages are dynamic visibility

Reply/error syntax?

every block could name its own caller, and thus respond to an outer block's caller


Tickets

Built-in datatypes

atoms:
number
string
array

collections:
set
list
index

table? with multiple indices? {key1a,key1b:value1,value2,value3; key2a:key2b:valueX}

Runtime Environment

Opake Standard Libraries

 // have a higher-level way to report/join errors than this
io.stderr:write("failed to listen on port 8080: " + err);
