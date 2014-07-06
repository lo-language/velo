#### Language

- [Basics](/intro) - everything you can do without calls
- [Objects](/intro) - root process
- [Streamlines](/calls) - stateless actions, recursion, concurrency
- [Modules](/modules)
- [Events](/events)
- [Syntax Reference](/syntax) - railroad diagrams

#### Libs

- [Environment](/env)
- [Calendar](/calendar)
- [Strings](/strings)
- [Arrays](/arrays)
- [Records](/records)
- [Lists](/lists)

###### Example: Hello World

    action (args, io, env, kit) {
    
    	io.out.writeLine("Hello, world!")
    }
    
Ok, nothing new here.

###### Example: Echoing Input

    action (args, io, env, kit) {
	
		// this will echo every line
		io.in.readLines() >> io.out.writeLine
	}
	
Now this is slightly odd - what's going on here?

###### Example: Simple Web Server

	action (args, io, env, kit) {
	
		kit.create("/http/server") => server
		
		server.start(io.port) >> (request) {
		
			request.respond(200, "Hello, world!")
		}
	}
	
This example demonstrates some core concepts.

1. you don't include libs
2. you can't access ports directly. io.port is not an int; it's a record
3. everything gets its own reference to an object. ref count bookkeeping


###### Example: Simple Web Server

	action (args, io, env, kit) {
	
		kit.create("/http/logger/elf", io.err) => logger
		kit.create("/http/server", logger) => server
		
		server.listen(io.port) >> (request) {
		
			request.respond(200, "Hello, world!")
		}

    	env.on('SIGINT') -> {
    	
        	io.err.writeLine("received SIGINT")
        	server.stop()
    	}
    }


###### Example: Interactive Input

    action (args, io, env, kit) {
	
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

##### Delegation

Streamline provides syntactic sugar for creating projections

	myRect allow ["move"] => fixedSizeRect
	myRect deny ["resize"]



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
	