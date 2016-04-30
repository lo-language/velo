# Language Basics

Exa has a concise, C-like syntax that should be familiar to most users. Statements are separated by semicolons and braces are used to delimit blocks.


## Data Types

Exa supports signed integers and IEEE-794 floating point numbers and provides the literal values `true` and `false` for booleans.

```
myInt = 42;
myFloat = 2.71828;
```
*Note: assignments in Exa are statements and not expressions.*

Exa provides the usual operators for:

- Algebraic expressions: `+` `-` `*` `/` `%`
- Logical expressions: `and` `or`
- Comparison: `==` `>` `<` `>=` `<=`
- Increment/decrement: `++` `--`
- Modify `+=` `-=` `*=` `/=`

*Note: since the increment and decrement operators are just syntactic sugar for assignments of the form `x = x +/- 1` and assignments are statements, not expressions, these operators cannot be used in expressions.*

A **character** value holds a single Unicode code point. Character literals can be specified with single quotes. Characters may consume more than one byte.

```
letterA = 'A';
aleph = 'א';
```


## Data Structures

Collections in Exa are not remote objects; they're local values that can be directly accessed and modified by the current procedure. So if you pass a collection to a procedure, it may need to be copied.

An **array** is a sequence of any number of same-type elements, which can be thought of as a strip of sticky tape with bits of paper stuck to it, one per element. An array can't have "blank" elements. Elements can be addressed (in constant time) using zero-based subscript notation. Array literals can be expressed with square brackets.

```
fibs = [0, 1, 1, 2, 3, 5, 8];
articles = ["a", "an", "the"];
empty = [];

fibs[3];		// 2
fibs[fibs[3]];	// 1
fibs[-1];		// syntactic sugar for terminal element (8)
fibs[-2];		// syntactic sugar for 2nd-to-last element
```

The range index notation `..` addresses a portion of an array from a starting index *up to and including* an ending index, which can be omitted to indicate "to the end of the array".

```
fibs[1..4];     // [1, 1, 2, 3]
fibs[4..];		// [3, 5, 8]
```


A **string** is simply an array of characters; literals are defined using double quotes.

```
name = "Pirate Prentice";

```
Expressions can be interpolated into string literals using backticks...

```
message = "Your circle has area `PI * r * r`";
```

and converted to strings with bare backticks.**

```
write(`height`);
```



The concatenation operator `><` joins two elements or arrays together as if they were strips of paper. Since arrays don't have "internal structure", concatenating two arrays produces a single array containing the elements of the left array followed by the elements of the right array, not an array containing the two arrays.

```
western = ["K2", "Nanga Parbat"];
eastern = ["Everest", "Lhotse", "Kangchenjunga"];

mountains = western >< eastern;        // combine two arrays

// Q: why does the statement below add one string element instead of
// six character elements to the back of the array?

mountains ><= "Denali";                // insert a value at the back

// A: because it's an array of strings, not characters
```

The `cut` operator removes the specified element or range from a collection and evaluates to the value of the removed element. If an array, the length is decreased -- extraction doesn't leave a "hole" in an array.

```
x = cut fibs[0];	// extract the first element
y = cut fibs[-1];	// extract the last element
z = cut fibs[1..4];	// extract from index 1 up to but not including index 4
```



A **record** is similar to an array: a sequence of one or more labeled *components* which can be of any type, including collections or other records. Record components are accessed using either dot notation or subscript notation.

```
student = [
	name: [first: "Alyssa", middle: "P", last: "Hacker"]
	course: 6
	year: 2001
];

// access components by label
fullName = "`student.name.first` `student.name.last`";

// access component by position
course = student[1];
```


A **set** is an unordered collection of same-type values. Set literals are delimited by braces.

```
crew = {"Leela", "Fry", "Bender"};
```


A **map** is a set of *keys*, each with an associated value. A map thus defines a mapping from the set of keys onto the set of values. Map literals are also delimited by braces, being an extension of the set concept.

```
greats = {
	"Benny Goodman"      : "Clarinet"
	"Fats Waller"        : "Piano"
	"Fletcher Henderson" : "Clarinet"
	"Jelly Roll Morton"  : "Piano"
};

// access a value
instrument = greats["Benny Goodman"]; // Clarinet

// add a new key
greats["Louis Armstrong"] = "Trumpet, Vocals";

// remove a key, returning the value
cut greats["Jelly Roll Morton"];

emptyMap = {:};    // to distinguish from an empty set

// get the set of keys
artists = keys(greats);

// get the set of values
values = values(greats);
```


#### Collection Operators

You can get the cardinality (number of elements) of any collection in constant time with the cardinality operator `#`.

```
numFibs = #fibs;
```

And you can search a collection with the search operator `?`.
