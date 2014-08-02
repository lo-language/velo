#### Modules

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
    