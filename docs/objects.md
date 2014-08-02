# Objects

An **object** is a set of actions that share persistent state. It is an independent, isolated, sequential process with internal state.

2. An object's internal state cannot be directly observed or modified by any other object.
3. The only way to interact with an object is to send a message to one of the object's actions.
3. To send a message to an action requires the sender to have been given an **action reference**.
1. All messages between two objects are asynchronous.


Topic: the tension between encapsulation (I don't want to know how you work) and control (I need to sign off on or effect how you work). The tension of convenience (pass in everything) versus security (pass in only what's needed).

A **constructor** is a special case of an action that creates a bunch of actions that share state and returns references to one or more of those actions.


or we can make a special function to share a phone (send a phone over a phone call) that provides an easy way to create a facet.

A process is created when you start your program.
Objects are processes.

When you create an object, you get back a record containing action addresses - not the actual object; there is no way to refer directly to an object.

You never hold a reference to an object - you can only hold addresses of actions. These can only be copied by the system. Only valid addresses can be called - not made up numbers. Addresses can only be created and copied by the system, like keys.


we have FOUR layers due to failed isolation: hardware, VM (isolating OS's), OS (isolating processes), Object-oriented application (isolating separable concerns) - what we want are Object-processes running directly on the hardware.

you can only allocate memory on the heap as objects. actually I think there is no heap, or stack. memory management and authority are thus interrelated. yet objects separate modularity from security because there are no visibility rules - visibility is dynamic. so all of an object's methods can be visible to a test program that needs to test its 'private' methods, but for non-test uses the visible methods can be reduced.

#### Visibility

#### Concurrency

Objects can be thought of as processes; they are the unit of concurrency. They're sequential and encapsulated, so you can never have memory shared between processes - things that share memory (methods on an object) are sequential, and things that are concurrent are opaque.

	CreateShape = action (top, left) {

		var shape = {
		
			// public methods
			
			getTopLeft: action () {
				return (top, left)
			}
		
			move: action (x, y) {
				left += x
				top += y
			}
		}
		
		return shape
	}
	
But how does CreateCircle get access to CreateShape? Via the passed-in library.
	
###### CircleFactory

	action (lib) {
	
		CreateCircle = action (centerX, centerY, radius) {
		
			lib.create('Shape') => circle
	
			top = centerY - radius
			left = centerX - radius
		
			// public methods
		
			circle.getRadius = action () {
				return radius
			}
		
			circle.resize = action (newRad) {
				radius = newRad
			}
		
			return circle
		}

		// just return the constructed constructor, why not?
		return CreateCircle
	}
	
	// to use
	CircleFactory(lib)


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

We need to be able to pass action addresses around to enable async/events "when you're ready, call this".

What does a full subaction address look like? task.action? process.task.action?

Normally these actions are defined in an object and run by that same object.

You get a message. You have some subactions defined and record their addresses. You return their addresses to your caller.

It's not clear who runs the module actions; it could be a special process. 


##### Delegation

You can use record operations to create "facets" of objects with a subset of the object's functionality.

	myRect & ["move"] => fixedSizeRect
	myRect - ["resize"]


##### Priority/Scheduling

Is there any way to specify the running priority of an object? As in, the order in which messages are consumed from the queue. Maybe just as higher/lower priority than the creating object?

We probably want this to be pretty granular, just like authority.

morpho
mecha
gizmo
blueprint
gadget