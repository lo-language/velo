# Objects

An **object** is an independent, isolated, sequential process with internal state. It is a special case of an action.

2. An object's internal state cannot be directly observed or modified by any other object.
3. The only way to interact with an object is to send a message to an action associated with the object.
3. To send a message to an action requires the sender to have been given an **action reference**.
1. All messages between two objects are asynchronous.
1. Every action has an associated object context.


two kinds of actions - root and non-root?

a constructor is a root action that creates a bunch of actions and a record

there needs to be some way for actions to directly create new objects, since constructors/factories have to do this - how?


are just lists of phone numbers
or are they telephones with speed dial set up?
are they single phone numbers you can send messages to? or lists of phone numbers that can go multiple places?
if the former, how does faceting work? how does delete work?
if a list of phone numbers, delete can be a number to tell the super system to destroy the object.

or we can make a special function to share a phone (send a phone over a phone call) that provides an easy way to create a facet.

A process is created when you start your program.
Objects are processes.

You can't directly access the internal state of another object.
All actions exist in the context of an object.

When you create an object, you get back a record containing addresses - not the actual object; there is no way to refer directly to an object.

You never hold a reference to an object - you can only hold addresses of actions. These can only be copied by the system. Only valid addresses can be called - not made up numbers. Addresses can only be created and copied by the system, like keys.

Objects are created by the system and a record is returned containing references. A reference might labeled "destroy"; this is put on by the system?

we have FOUR layers due to failed isolation: hardware, VM (isolating OS's), OS (isolating processes), Object-oriented application (isolating separable concerns) - what we want are Object-processes running directly on the hardware.

you can only allocate memory on the heap as objects.
memory management and authority are thus related.