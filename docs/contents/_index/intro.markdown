## Concurrency + Security + Testability

Download Opake v0.1 Here (MIT License)

Opake is a simple general-purpose programming language designed to make writing secure, concurrent, completely tested software intuitively easy. While most programming languages ignore these, Opake elevates them to primary concerns - and it does so by leaving things *out*.

This is accomplished primarily by two mechanisms:

- total encapsulation
- purely asynchronous communication

Total encapsulation entails:

- no global symbols - not just global variables, but global symbols.
- no direct access of attributes.

Not only can nothing reach directly into an object, but objects can't reach out.

The last one achieves locality independence:

 3. any dependency can be replaced with something remote without breaking abstraction

#### Example 1: Hello World



    (args, io, env) {

        io.stdout:write("Hello, world!\n")
    }

#### Example 2: A trivial web app using the bundled HTTP library

    (args, io, env, shop) {

        shop:make('Http/Server') => server

        server:listen(8080) >> (request) {

            request:end("hi there!")
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

        server:open(port) -> () {
            io.stderr:write("server running on port |port");
        },
        (err) {
            io.stderr:write("failed to open port |port: " + err);
        }

        io.ipc:trap('SIGINT') >> () {
            io.stderr:write("received SIGINT")
            server:close
        }
    }

#### Protocols

    protocol {

        init: () {

        }

        write: () {

        }
    }

Tickets

Built-in datatypes

Runtime Environment

Opake Standard Libraries

 // have a higher-level way to report/join errors than this
io.stderr:write("failed to listen on port 8080: " + err);
