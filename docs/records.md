# Records

A record is a set of named values (fields). Records can be nested. Field names can be any valid string.

	// create a record
	student = [
		name:	[first: "Alyssa" middle: "P" last: "Hacker"]
		dob:	"2/22/1960"
		course:	"XVI"
	]
	
	// change a field
	student.course = "VI-2"
	
	// remove a field
	delete student.dob