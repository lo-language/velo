# Records

A record is a set of named values (fields) which can be of any type, including records. Field names can be any valid character string.

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
	
An important use of records is as a projection of an object.