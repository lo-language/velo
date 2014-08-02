#### Language

- [Basics](/intro) - everything you can do without calls
- [Expressions](/expressions) - everything you can do without calls
- [Objects](/intro)
- [Streamlines](/calls) - stateless actions, recursion, concurrency
- [Modules](/modules)
- [Events](/events)
- [Syntax Reference](/syntax) - railroad diagrams

#### Reference

- [Strings](/strings)
- [Lists](/lists)
- [Records](/records)
- [Environment](/env)
- [Calendar](/calendar)

###### Example: Hello World

    action (args, io, env, lib) {
    
    	io.out.writeLine("Hello, world!")
    }
    
Ok, nothing new here.

###### Example: Echoing Input

    action (args, io, env, lib) {
	
		// this will echo every line
		io.in.readLines() >> io.out.writeLine
	}
	
Now this is slightly odd - what's going on here?

###### Example: Simple Web Server

	action (args, io, env, lib) {
	
		lib.create("/http/server") => server
		
		server.start(io.port) >> (request) {
		
			request.respond(200, "Hello, world!")
		}
	}
	
This example demonstrates some core concepts.

1. you don't include libs
2. you can't access ports directly. io.port is not an int; it's a record
3. everything gets its own reference to an action. ref count bookkeeping
4. action references aren't shared memory, they're queues - there is zero shared mem between processes

#### Expressions

Action calls are expressions? They resolve asynchronously to their first returned value, as in =>.

so x = y + doSomething() will call doSomething and then take the first result returned and add it to y and then set x to that. So to the extent it's "replace with returned value", it's the *first* returned value, asynchronously. So it kind of reduces to the common use case.

#### Definitions - Runtime Concepts

###### System

- 1-N processors

###### Processor

- 0-N objects (objects can hop around processors since they're perfectly encapsulated/isolated)

###### Object: isolated sequential process

- state
- 1-N actions

Objects are sets of actions with shared state. They are sequential processes: only ever working on one task (for one action) at a time.

Is the set of actions immutable? Must a process be defined all at once? There can be many objects of the same kind.

###### Action

- 1 inbox (queue with an address)
- 1 program - can reference object state
- 0-N suspended tasks
- 0-1 active task

###### Task

- message body
- state
- program status
- 0-N subtasks

###### Message

- body
- envelope

###### Example: Simple Web Server

	action (args, io, env, lib) {
	
		lib.create("/http/logger/elf", io.err) => logger
		lib.create("/http/server", logger) => server
		
		server.listen(io.port) >> (request) {
		
			request.respond(200, "Hello, world!")
		}

    	env.on('SIGINT') -> {
    	
        	io.err.writeLine("received SIGINT")
        	server.stop()
    	}
    }


###### Example: Interactive Input

    action (args, io, env, lib) {
	
		io.ask("What's your name?") => name
		"Hello, _name_!" -> io.out.writeLine
	}
	
###### Example: Acrostic

    action (args, io, env) {
	
		io.in.readLines() >> (line) {
		
			line.split(',') >> (token) {
			
				token.unquote()
			}
		}
	}
    
###### Example: Traversal

    scan(items) >> action (item) {
    	// do something
    }
    
    fields << action (name, value) {
    	// do something
    }
    
    tree.inOrder() >> action () {
    
    }



Cli stuff

	cli.args
	args.getOpts()
	io.in
	io.out
	io.err
	env.on(signalName)
	env.get(varName)
	env.set(varName)
	kit.create("calendar")
	
Lists

	x[i] is shorthand for x.getItem(i) or x.setItem(i, j)?
	
	push() - inserts at front of list
	pop() - item zero
	insert()
	
Protocols

	Anything order-dependent with names on one side is a protocol.
	
	
	
###### Example: Date Arithmetic

    stateless action (args, io, env) {
	
		env.getCalendar() => cal
		
		env.ask("What's your birthday? (dd/mm/yyyy)") ->
			cal.parseDate => birthday
		
		cal.elapsedYears(birthday) => age
		
		if age.elapsedYears() > 1 {
			env.out("You are __age.elapsedYears()__ years old")
		}
		else if age.elapsedMonths() > 0 {
			env.out("You are __age.elapsedMonths()__ months old")
		}
		else if age.elapsedDays() > 0 {
			env.out("You are __age.elapsedDays()__ days old")
		}
		else {
			env.out("You are quite precocious.")
		}
	}
	