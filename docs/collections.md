# Lists and Records

## Lists

A list is an ordered collection of values of any type.

	// create a list
	myList = [1 2 3]
	
	// access an element of a list
	first = myList[0]
	
	// remove a list element - following values shift down
	first = remove myList[0]
	
	// the last element of a list can be accessed with no index
	last = myList[]
	
	// push an element onto the end of a list
	myList += 17
	
	// remove matching items from a list
	myList -= 20
	
#### Operations on Lists
	
	// concatenate two lists (non-commutative)
	combined = listA + listB
	
	// set difference of values
	diff = listA - listB
	
	// find the common values
	common = listA & listB

#### Scanning Lists

A list can easily be scanned to access each of its elements in order.

	list >>
	    receive item, index;
		// do something for each item
		next();

#### Functional helpers

map(list, fn);
reduce(list, fn);
any(list, fn);
every(list, fn);
filter();

## Maps

A map is a set of named values (fields) which can be of any type, including records. Field names can be any valid character string.

	// create a map
	student =
		name:
			first: "Alyssa" 
			middle: "P"
			last: "Hacker"
		dob:	"2/22/1960"
		course:	"XVI"
		
	// access a field
	firstName = student.name.first
	
	// modify a field
	student.course = "VI-2"
	
	// remove a field
	birthday = remove student.dob
	
An important use of records is as a handle to an object.

##### Set Operations on Records

	// non-commutative; right values clobber left values w/same key
    merged = left + right
    
    // merges freshmen into students
    students += freshmen
        
	// get the intersection of two records
	intersection = left & right
	
	// diff two records
	students -= seniors
	
#### Scanning Records

The fields of a map can easily be scanned to access each field (in no particular order).

	env >> (name, value) {
	}
	
#### Functional helpers

keys(map) // produces a set
values(map) // produces a list
filter()

Maps can be filtered by lists.

	// blacklist fields
	properties -= []
	
	// whitelist fields
	properties &= []

