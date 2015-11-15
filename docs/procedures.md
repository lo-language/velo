## Program Structures

The levels of structure in Exa are statements, procedures, modules, and programs. Objects are a *pattern* built using these concepts.

A **procedure** is an ordered list of statements that is invoked by sending a request to the service to which it is bound - it is the specification of a service. Procedures can be nested - that is, a procedure can define procedures within it, in the context of creating a service.

A **module** is a stand-alone procedure, meaning it has no parent procedure.

A **program** consists of a **root module** to which a **root request** is sent to invoke the program, and any modules reachable by an `acquire` sequence leading from the root module (explained below).

### Modules

A module always occupies its own file and is simply a list of statements:

```
// say hello

receive args, io;
io.stdout.write("Hello, `name`!");
```
The `receive` statement maps the request body onto one or more parameter names.

A **nested procedure** is always defined by creating a service using the `service` keyword.

```
receive name, x, y;

getLuckyNumber = service:
    receive scalar;
	reply scalar * (x + y);
	
reply "Hello, `name` - your lucky number is `getLuckyNumber(42)`;
```

Note how a nested procedure can refer to its own task's state *as well as the state of any parent tasks*. However, it can't refer to any other state - it is totally cut off from the world otherwise. Therefore, anything required by a procedure must be provided in a request or in the parent request.

### Objects

A `service` statement creates a service having the specified procedure but is also an expression with a value of the address of the resulting service, which can then be held and transferred like any other value - i.e. assigned to a variable or data structure element, or passed in a message. In this way a procedure can be defined in one module but invoked by another - and thus provide mediated external access to the state of its parent procedure - and thus become a stateful service. This provides the mechanism by which we construct objects in Exa:

```
// a Person constructor

receive name, birthday;

reply {

    getName: service:
	    reply name;
	    
	getBirthday: service:
	    reply birthday;
};
```

Though possible in the language, it obviously doesn't make sense to create a service without retaining its address - this would be doing the work of setting up a new inbox and then throwing away its address.

### Acquire

A special service is provided in the root request to every program at inception, which by convention is known as `acquire`. This service bundles some authority to read Exa modules – whether from memory, the local file system, or over the network – with the ability to compile and load them, ready to use in the current context. Note that the authority of this service is carefully scoped to only be able to read Exa modules from predefined locations, not arbitrary files on the file system.

```
receive num, acquire;

isPrime = acquire("math/primality");

if isPrime(num):
    // do something
```

Note that there's nothing special about acquire - it's just a service that can be called synchronously or asynchronously like any other, assigned to variables or passed between services  – the name `acquire` is just a convention. It's usually called synchronously because the module is needed immediately, but it can be called asynchronously just fine:

```
after acquire ~ "math/primality" => isPrime:

    if isPrime(foo):
        // do something
```

The `acquire` service is the only way to get modules, and it's only provided in the root request. If you want a module to be able to use acquire, you need to pass it in explicitly. This allows you to control access to modules without needing to break the abstraction of whatever you're passing in. And since you're passing in acquire, you can pass whatever you want - including a fake or modified version, which is a powerful tool for testing.

Note that modules should only provide ability, not authority. Authority is delegated and attenuated top-down through the request tree; ability is pulled in bottom-up through `acquire`. Embedding authority in a module - for instance, by including keys or credentials in a module - is an anti-pattern in Exa; modules should be purely logic.
