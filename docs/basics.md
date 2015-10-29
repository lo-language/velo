# Language Basics

Exa has a concise syntax that should be familiar to most users. Statements are separated by semicolons and indentation is used to delimit blocks.

##### Numbers

Exa supports signed integers and IEEE-794 floating point numbers and provides the literal values `true` and `false` for booleans.

```
myInt = 42;
myFloat = 2.71828;
myHexInt = 0x2A;
```
*Note: assignments in Exa are statements, not expressions.*

##### Operators

Exa provides the usual operators for:

- Algebraic expressions: `+` `-` `*` `/` `%`
- Logical expressions: `and` `or`
- Comparison: `==` `>` `<` `>=` `<=`
- Increment: `++` and decrement: `--`

*Note: since the increment and decrement operators are just syntactic sugar for assignments of the form `x = x +/- 1` and assignments are statements, not expressions, these operators cannot be used in expressions.*

Exa also provides a few operators for working with collections; these will be explained below.

##### Strings

Strings are arrays of Unicode characters with literals defined using double quotes.

```
name = "Pirate Prentice";

```
Expressions can be interpolated into string literals using backticks.

```
message = "You circle has area `PI * r * r`";
```

And converted to strings with bare backticks.**

```
write(`height`);
```

##### Collections

Collections in Exa are not objects; they're local values that can be directly modified by the current procedure. For this reason, if you pass a collection to a different context in an async message, it may need to be copied.

**Arrays** are ordered collections of any number of homogeneous elements, retrievable in constant time by zero-based integer index. Arrays dynamically expand and contract as necessary in constant time and support literals delimited by square brackets. 

```
fibs = [0, 1, 1, 2, 3, 5, 8];
articles = ["a", "an", "the"];

fibs[3];		// 2
fibs[fibs[3]]	// 1
fibs[-1];		// syntactic sugar for terminal value (8) **
fibs[-2];		// syntactic sugar for 2nd-to-last element **

fibs <+ 13;		// pushes a value onto the back of the array **
0 +> fibs;		// pushes a value onto the front of the array **
```

**Maps** are unordered collections of any number of homogeneous elements which are retrievable by unique scalar index (string or number). Map literals are also delimited by square brackets.

```
greats = [
	"Benny Goodman":		"Clarinet"
	"Fats Waller":			"Piano"
	"Fletcher Henderson":	"Clarinet"
	"Jelly Roll Morton":	"Piano"
	"Louis Armstrong":		"Trumpet"
];

bennyInstrument = greats["Benny Goodman"]; // Clarinet
```

You can get the length of any collection in constant time with the cardinality operator `#`.

```
numFibs = #fibs; // 7
numPlayers = #greats; // 5
```

The unary operator `cut`** removes the specified element from a collection and evaluates to the value of the removed element. If an array, the collection then resizes - there can't be "gaps" in arrays.

```
x = cut fibs[0];	// snip off the first element
y = cut fibs[-1];	// snip off the last element
```

##### Records

Records provide a way to create structures of heterogeneous data elements. Fields are accessed using dot notation. Literals are delimited by braces. Records can be nested.

```
student = {

	name: {
		first: "Alyssa",
		last: "Hacker"
	},
	
	course: 6
};

fullName = "`student.name.first` `student.name.last`";
```

##### Conditionals and Iteration

Exa provides the usual `if`/`else if`/`else` construct.

```
if x == 42:
	success = true;
else if x < 42 and x > 14:
	success = false;
else:
	success = true;
```

And the familiar `while` construct for loops.

```
while z > 0:
	fibs <+ fibs[-1] + fibs[-2];
	z--;
```

##### Procedure Invocation

A procedure is invoked by sending a request to an address. A request can be sent synchronously with the usual function application syntax:

```
doSomething(arg1, arg2);
```

or asynchronously using `dispatch` or `after` (explained below).

```
dispatch doSomething(arg1, arg2);	// we don't care about any reply
```

If a request is sent synchronously, the next statement won't be executed until a reply is received. *Note: if there is no reply to a synchronous request, the next statement will never be executed.*

As you'd expect, a synchronous request is an expression that evaluates to the value of the reply. 

```
foo = sqrt(25);	// foo will be assigned 5
```

If a request is sent asynchronously, the next statement will be executed immediately, without waiting for a reply, but a **continuation** to be executed after a reply is received can be attached to the request using the `after` construct.

```
after readFile(fileName):
	log("done reading `fileName`");

log("this will be logged first");
```

*Note: all statements following an asynchronous request are executed before any continuation is run. Replies to async requests are enqueued as they are received.*

Like most protocols, but unlike most languages, Exa has a clear and explicit concept of failure: *every request can succeed or fail.* This is implemented not by [somehow](https://en.wikipedia.org/wiki/Semipredicate_problem) marking or categorizing a reply as success or failure, but by providing a dedicated channel for failure replies: every request includes neither, either, or both of two distinct continuations - a success continuation, introduced by the `after` construct, and a failure continuation, introduced by the `failure` construct.

```
after readFile(fileName):
	log("done reading `fileName`")
failure => error:
	log("error reading `fileName`: `error`");
```

An async request can be thought of as a hybrid language construct that fuses a message dispatch with a specialized conditional.

A failure continuation can easily swap in its own value for one that was expected from a success reply using `substitute`.**

```
after getAnswer => answer:
	write("the answer is... `answer`");
failure:
	substitute 42;
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

** not yet implemented and design subject to change