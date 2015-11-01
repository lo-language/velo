## Program Structures

A **procedure** is an ordered list of statements that is invoked by sending a request to a service. A procedure can be defined as a stand-alone **module**, meaning it has no parent procedure, or as a **nested procedure** defined within another procedure.

A module always occupies its own file and is simply a list of statements:

```
// say hello

receive name;
reply "Hello, `name`!";
```
The `receive` statement maps one or more parameter names onto the request body; it must be the first statement in a procedure.

A nested procedure is always defined along with an implied inbox to create a **service**.

```
receive name, timeOfDay;

greeting = service:
	reply num * num;
	
reply "Hello, `name`!";
```

Note that a nested procedure can refer to its own state as well as the state of any enclosing procedures. However, it can't refer to *any* other state - it is totally cut off from the world. Therefore, anything required by a procedure must be provided in the request or in a parent request.

A service definition is statement but also an expression with a value of the inbox address that can be used like any other value - e.g. assigned to a variable, a map index, or a record item. If we pass an address to another procedure. In this way a procedure can be defined in one module but used in another. We can pass a service address in a reply. (example) - or in a a request.

```
receive name, timeOfDay;

result = {

    getName: service:
	    reply num * num;
};
	
reply "Hello, `name`!";
```
And since the procedure can access not just its own state but the state of its enclosing frame, this provides a way to give access to internal state.

Note that it wouldn't make sense to create a service without assigning its address to anything - this would be doing the work of setting up a new inbox and then throwing away its address.

Modules only provide ability, not authority.

### Acquire

A special service is provided in the root request to every program at inception, which by convention is known as `acquire`. This service bundles the authority to read Exa modules – whether from memory, the local file system, or over the network – with the ability to compile and load them, ready to use in the current context. Note that the authority of this service is carefully scoped to only be able to read Exa modules, not arbitrary files on the file system.

```
receive env, acquire;

isPrime = acquire("math/primality");

if isPrime(17):
    // do something
```
Note that there's nothing special about acquire - it's just a service that can be called sync or async like any other, assigned to variables or passed between services  – the name `acquire` is just a convention. It's usually called synchronously because the module is needed immediately.

```
after acquire ~ "math/primality" => isPrime:

    if isPrime(foo):
        // do something
```

The `acquire` service is the only way to get modules, and it's only provided in the root request. If you want a module to be able to use acquire, you need to pass it in explicitly. This allows you to control access to modules without needing to break the abstraction of whatever you're passing in.

Since you're passing in acquire, you can pass whatever you want - including a fake or modified version, and this is helpful for testing.

An Exa program can be compiled into a bundle where all the modules are compiled as well, in which case the execution environment will know this and `acquire` will simply load the pre-compiled modules.
