# Actions

An action is a sequence of statements that has a unique **key** by which it can be invoked. Every action has its own scope in which variables can be defined.

Every action has a unique **key** and its own queue. An action definition is actually an expression whose value is the address of the action.

	myAction = action () {
	
		// do something
	}
	
	// myAction now holds a key

### Invocation


Returning results.

Single/multiple values

Every action is variadic; argument lists are syntactic sugar. You can refer to the arguments of the most local enclosing function via the list @[index].

Have a convention for calling actions with records instead of lists?

##### Generators