# Modules

Modules are stateless, isolated actions. (orphan/dangling/unlinked actions)

Could there be some way to define a module that's just a list of stateless methods, like a library? Or should that just be a singleton?

Most module systems let the engineer delegate requests for functionality to modules. Modules often provide functionality and authority; we should decouple these because they're very different. Functionality should be optimized for convenience; authority should be subject to maximum control.

But many times the engineer has to be in the loop anyway - you have to download and install the required libraries.

In any delegation, there's a tradeoff between convenience and control. You could let modules request anything they like, and thus not have to know what they need, but then you don't get to validate their requests.

In schematics, you'd have blocks that refer to part numbers. To test the device, you'd intercept signals at the interfaces to these other parts.

The library only needs to be passed to constructors - they can stash their own copy. But then we're potentially creating the same problem of lots of copies of the library. If we have some explicit way of creating new isolated objects we could pass the library in there. Or maybe the lib could (by convention) pass itself in as an arg to any action it calls? Then you can't override it, though. Having immutable records (constants) might help a lot in letting them share memory.

###### Accessing the library

	// this takes a URL, relative or absolute
	// a package has a mime type? or just json? text/haiku?
    lib.create("models/Shape")
    

Are modules actions, or classes? We need to be able to create ad hoc objects that have no predefined class. Do we already have that capability? An object is just a collection of actions that share persistent state, and we can achieve that by defining a bunch of actions that share an action context, and thus a task. When I stop executing the action that creates an object, who picks up the calls to the closures? Who owns those? Let's say I create an object this way that binds up my local object state - then they're coupled. As in, they must be handled by the same object since they can directly reference the same state. This can be thought of as a pseudo-object. If in a stateless action (module action), this doesn't matter, but does that mean all the objects created by a stateless action necessarily share a process? Or would the system be smart enough to recognize a stateless action (I think it could) or even just an independent pseudo-object that can be promoted to a real object.

Let's assume modules are (stateless) actions for the time being. Then how could you do a singleton? Some init system would call the singleton constructor and then stash it in the lib. OR root object defines a method on the lib to lazy-construct a singleton and return it.

Normally, when an action defines a sub-action, it's handled as a sub-task. What if you return state?

If an object action wants to create a new object that runs in its own process.

So it seems we could either load modules into their own processes, or into a single process, since they don't share any state (actually are stateless). Or we could just move them around between processes however it suits us - or processes could have their own copies.


If actions, then all objects must be created by actions - I don't think that's terrible.
If class, then all actions must be part of an object.

If class definitions we could potentially define more methods than "main", e.g. signal. Could potentially be more cross-platform this way.

	object () {

		main: action ()
		signal: action (signal)
	}


What does a full subaction address look like? task.action? process.task.action?

Normally these actions are defined in an object and run by that same object.

You get a message. You have some subactions defined and record their addresses. You return their addresses to your caller.

It's not clear who runs the module actions; it could be a special process. 
