# The OS Interface

Exa adheres to the Principle of Least Authority (PoLA) generally, but especially at the interface to the operating system. Like all modules, the root module of a program is restricted to the capabilities provided to it in a request – in this case, the root request, which provides the OS interface.

By default, an Exa program receives only capabilities allowing it to inspect its environment and manipulate the standard I/O streams – all other access must be explicitly delegated to the program by the user via the command line. Since modules don't confer authority, Exa modules are handled by a separate mechanism – you don't have to explicitly grant read access to them.

Every Exa program receives three parameters in its root request, conventionally referred to as:

1. **args**: arguments provided on the command line
1. **io**: the standard input, output, and error streams
1. **system**: environment variables and all other system capabilities provided by the user

### Command Line Arguments

Command line arguments are available in the `args` array.

    receive args, io, system;
    
    io.stdout.write ~ "num args: `#args`\n";

### Standard I/O Streams

The `io` parameter is a record with the following format.

    receive args, io, system;
    
    io.stdin.readLine
    
    io.stdout.write ~ "message for standard output\n";
    io.stderr.write ~ "message for standard error\n";
    
### Environment Variables

Environment variables are accessible via the `env` map on the `system` parameter and can be read or written.

    receive args, io, system;
    
    io.stdout.write ~ system.env["HOME"];
    
    system.env["ARTIST"] = "Delgados";
    
### Receiving Signals

Signals can be received via the signal interface.

    receive args, io, system;
    
    system.signals[SIGHUP] = service:
        io.stderr.write ~ "got a HUP\n";
        
### Interprocess Communication
    
To send signals to another process, the capability must be granted on the command line via the `p` flag *and* the system permission requirements must be met.

    receive args, io, system;
    
    system.processes[0].send ~ SIGKILL;

### Timers

Unlike JavaScript, timers are not part of the Exa language but part of the system interface.

    receive args, io, system;
    
    // sets a timer for 10ms
    timer = system.timer.set(10);


### Accessing the Filesystem

You can grant permission to read files:

    $ exa -r ./config.json helloWorld.exa
    
Write files:

    $ exa -w ./log.txt myServer.exa
    
Or create files within a specified directory:

    $ exa -c ./sessions/ myWebApp.exa
    
Or delete files within a specified directory:

    $ exa -d ./sessions/ myWebApp.exa
    
Can pass in executables with -x:

    $ exa -x /usr/bin/whois myProgram.exa

myProgram will now be able to execute the whois command.

Note that this is how you grant access to virtual filesystems such as Linux devfs as well. And also UNIX domain sockets etc.

### Accessing the Network

You can pass in ports to enable listening for TCP connections on one or more ports:

    $ exa --incoming=8080,8081 server.exa
    
The program server.exa will now be able to listen on ports 8080 and 8081 when it runs. The port numbers are not available to the Exa program, just the ability to use the ports.

    receive args, io, system;
    
    system.ports[0].listen = service:
        // do something here
        
Note: some systems require special privileges to bind to ports below 1024.

To enable outgoing connections, pass in the `outgoing` capability:

    $ exa --outgoing server.exa

Which can be accessed as

    receive args, io, system;
    
    // for connection-mode sockets
    
    socket1 = system.outgoing.connect("127.0.0.1:8080");
    socket2 = system.outgoing.connect("127.0.0.1:8081");
    
    socket1.write("GET / HTTP/1.1\n\n");

    // for connectionless-mode sockets
    