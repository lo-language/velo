# Language Basics

Exa was designed semantics-first. Since that's how it was designed and I was poorly served learning the other way around, that's how it will be presented here.

n't designed by bolting together various language features or fiddling with different ideas for syntax; it was designed semantics-first. A conceptual framework that was then embodied in a syntax. The language design is a mapping from semantics to syntax; the implementation is a further mapping to a target language.

In compilation every module is

Exa has a concise syntax that should be familiar to most users. Statements are separated by semicolons and braces are used to delimit blocks.

## Primitive Data Types

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
- Successor (increment): `++` and predecessor (decrement): `--`

*Note: since the increment and decrement operators are just syntactic sugar for assignments of the form `x = x +/- 1` and assignments are statements, not expressions, these operators cannot be used in expressions.*

Exa also provides a few operators for working with collections; these will be explained below.

A **character** value holds a Unicode code point. Character literals can be specified with single quotes. Characters may consume more than one byte.

```
letterA = 'A';
aleph = 'א';
```

A **string** is a sequence of characters with literals defined using double quotes.

```
name = "Pirate Prentice";

```
Expressions can be interpolated into string literals using backticks...

```
message = "You circle has area `PI * r * r`";
```

and converted to strings with bare backticks.**

```
write(`height`);
```

## Data Structures

### Collections

Collections in Exa are not objects; they're strictly local values that can be directly accessed and modified by the current procedure. For this reason, if you pass a collection to a different context in an async message, it may need to be copied.

An **array** is an ordered list of any number of same-type elements that can be addressed in constant time by zero-based integer subscript. Arrays dynamically expand and contract as necessary in constant time and support literals delimited by square brackets. 

```
fibs = [0, 1, 1, 2, 3, 5, 8];
articles = ["a", "an", "the"];

fibs[3];		// 2
fibs[fibs[3]];	// 1
fibs[-1];		// syntactic sugar for terminal value (8) **
fibs[-2];		// syntactic sugar for 2nd-to-last element **

fibs[1:4];      // [1, 1, 2]
fibs[:3];		// [0, 1, 1]
fibs[5:];		// [5, 8]
copy = fibs[:]; // create a shallow copy

mountains = [];                // create an empty array
"Denali" -> mountains;         // insert a value at the back
"Everest" -> mountains[0];     // insert a value at the front **
"Kanchenjunga" -> mountains[1] // insert a value between elements 0 and 1 **

x = cut fibs[0];	// extract the first element
y = cut fibs[-1];	// extract the last element
z = cut fibs[1:4];	// extract from index 1 up to but not including index 4
```

The splice operator `->` splices elements and lists together as if they were pieces of paper. Elements and arrays can be spliced into arrays at the front, back, or in the middle.

The `cut` operator removes the specified element or range from a collection and evaluates to the value of the removed element. If an array, the length is decreased -- extraction doesn't leave a "hole" in an array.

The slice operator `:` retrieves a portion of an array from the first index up to but not including the second index.  The indices can be omitted as a shorthand for the beginning and end of the array.  When used within square brackets, the array is not modified, but when used within the extraction operator `{}`, the specified slice is removed.

A **set** is an unordered collection of same-type values. Set literals are delimited by braces.

```
crew = {"Leela", "Fry", "Bender"};
```

A **map** is a set of *keys*, each with an associated value. A map thus defines a mapping from the set of keys onto the set of values. Map literals are also delimited by braces, being an extension of the set concept.

```
greats = {
	"Benny Goodman"      => "Clarinet"
	"Fats Waller"        => "Piano"
	"Fletcher Henderson" => "Clarinet"
	"Jelly Roll Morton"  => "Piano"
};

// access a value
instrument = greats["Benny Goodman"]; // Clarinet

// add a new key
greats["Louis Armstrong"] = "Trumpet, Vocals";

// remove a key, returning the value
greats[cut "Jelly Roll Morton"];

emptyMap = {=>};    // arrow to distinguish from an empty set

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

```
fibs @ 
```

### Frames

A **frame** is a composite of one or more optionally-labeled *components* which can be accessed using either dot notation or subscript notation. Frame components can be of any type, including collections or other frames. A frame is not a collection since it is semantically closer to one thing, not many things being considered together. Frame literals are delimited by parentheses. 

```
student = (
	name: (first: "Alyssa", middle: "P", last: "Hacker")
	course: 6
	year: 2001
);

// access components by label
fullName = "`student.name.first` `student.name.last`";

// access component by position
course = student[1];
```

A frame without labels is simply a list.

## Control Structures

### Conditionals and Iteration

Exa provides the usual `if`/`else if`/`else` construct. Predicates need not be enclosed in parentheses.

```
if x == 42 {
	success = true;
}
else if x < 42 and x > 14 {
	success = false;
}
else {
	success = true;
}
```

The familiar `while` loop provides indefinite iteration.

```
while z > 0 {
	fibs[-1] + fibs[-2] -> fibs;
	z--;
}
```

To iterate over the elements of a collection, use the scan operator: `>>`.

```
greats >> service {

    receive key, value;
    
    // do stuff
};
```

There are no other looping constructs.

## Requests

A [service](procedures.md) is invoked by sending a request to an address. A request can be sent synchronously with the familiar function application syntax:

```
doSomething(arg1, arg2);
```

or asynchronously with the addition of an asterisk:

```
doSomething<arg1, arg2>;	// we don't care about any reply
```

If a request is sent synchronously, the next statement won't be executed until a reply is received. *Note: if there is no reply to a synchronous request, the next statement will never be executed.*

As you'd expect, a synchronous request is an expression that evaluates to the value of the reply. 

```
foo = sqrt(25);	// foo will be assigned 5
```

If a request is sent asynchronously, the next statement will be executed immediately, without waiting for a reply. If you'd like to do something after a response is received, a **handler**  can be attached to the request using a `then` clause (to handle a success response) or a `catch` clause (to handle a failure).

```
readFile<fileName> then {
	log("done reading `fileName`");
};

log<"this will be logged first">;
```

*Note: all statements following an asynchronous request are executed before any handler is run except in the case of futures (see below). Replies to async requests are enqueued as they are received.*

Like most protocols, but unlike most languages, Exa has a clear and explicit concept of failure: *every request can succeed or fail.* This is implemented not by [somehow](https://en.wikipedia.org/wiki/Semipredicate_problem) marking or categorizing a reply as success or failure, but by providing a second channel for failure responses: every request includes neither, either, or both of two distinct handlers - a success handler, introduced by the `after` construct, and a failure handler, introduced by the `failure` construct.

```
readFile<fileName> then {
	log<"done reading `fileName`">;
}
catch => error {
	log<"error reading `fileName`: `error`">;
}
```

An async request can be thought of as a hybrid language construct that fuses a message dispatch with a specialized conditional; if you've worked with promises this approach will feel familiar to you.

A failure handler can easily swap in its own value for one that was expected from a success reply using `substitute`.**

```
getAnswer<> => answer then {
	write("the answer is... `answer`");
}
catch {
	substitute 42;
}
```

To handle the case where a reply was expected but not received within a certain amount of time, requests can also have timeouts**:

```
after getAnswer => answer:
	write("the answer is... `answer`");
failure:
	provide 42;
timeout 5ms:
	log("failed to read the file");
```

### Handlers

Think of handlers as part of the main flow of the procedure, like an if/else block, rather than as a sub-procedure. They share the same scope as their enclosing procedure.

Modules only provide ability, not authority.

** not yet implemented and design subject to change
