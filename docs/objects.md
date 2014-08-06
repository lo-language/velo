# Objects

An **object** is an independent, isolated, sequential process with internal state and one or more actions that share this state and are guaranteed to be non-concurrent.

1. There is no way to refer directly to an object; the only way to interact with an object is to send a message to one of its actions. Ergo, an object's internal state cannot be directly observed or modified by any other object.

2. All messages between objects are asynchronous.

A **constructor** is any action that creates an object and returns a **handle** to it - a record containing one or more action keys.

Note: it's not accurate to say a constructor returns an object because there's no way to directly refer to an object, only its actions.

	// create an object via a constructor
	server = createServer()
	
	// invoke an action on the object
	server.start()

#### Dynamic Visibility

Unlike OOP languages where a class statically defines the visibility of its members, leading to a proliferation of things like public, private, protected, package, friend - visibility is dynamic.

You can use record operations to create "facets" of objects with a subset of the object's full functionality.

	// blacklist style
	fixedSizeRect = myRect - "resize"
	fixedPosRect = myRect - "move"
	
	// whitelist style
	simpleRect = myRect & []

#### Concurrency

Objects are *sequential processes*; they are the smallest unit of concurrency. Actions on the same object are guaranteed to be non-concurrent. Since they're sequential and encapsulated, so you can never have memory shared between processes - things that share memory (methods on an object) are sequential, and things that are concurrent are opaque.

#### Inheritance

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

##### Priority/Scheduling

Is there any way to specify the running priority of an object? As in, the order in which messages are consumed from the queue. Maybe just as higher/lower priority than the creating object?

We probably want this to be pretty granular, just like authority.

##### Patterns

reactive programming:

	foo.getBar() >> {
	
		// react
	}



we have FOUR layers due to failed isolation: hardware, VM (isolating OS's), OS (isolating processes), Object-oriented application (isolating separable concerns) - what we want are Object-processes running directly on the hardware.

you can only allocate memory on the heap as objects. actually I think there is no heap, or stack. memory management and authority are thus interrelated. yet objects separate modularity from security because there are no visibility rules - visibility is dynamic. so all of an object's methods can be visible to a test program that needs to test its 'private' methods, but for non-test uses the visible methods can be reduced.