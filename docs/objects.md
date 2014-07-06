# Objects

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