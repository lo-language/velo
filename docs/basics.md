# Language Basics

Exa has a concise syntax that should be familiar to most users. As in Python, indentation is used to indicate the level of nesting.

###### Numbers

Exa supports signed integers and IEEE-794 floating point numbers and provides the literal values `true` and `false` for booleans.

```
myInt = 42;
myFloat = 2.71828;
myHexInt = 0x2A;
```
*Note: assignments in Exa are statements, not expressions.*

###### Operators

Exa provides the usual operators for:

- Algebraic expressions: `+` `-` `*` `/` `%`
- Logical expressions: `and` `or`
- Comparison: `==` `>` `<` `>=` `<=`
- Increment: `++` and decrement: `--`

*Note: since the increment and decrement operators are just syntactic sugar for assignments of the form `x = x +/- 1` and assignments are statements, not expressions, these operators cannot be used in expressions.*

Exa also provides a few operators for working with collections; these will be explained below.

###### Strings

Strings are arrays of Unicode characters with literals defined using double quotes.

```
name = "Pirate Prentice";

```
Expressions can be interpolated into string literals using backticks.

```
message = "You circle has area `PI * r * r`";
```

And converted to strings with bare backticks.

```
foo(`height`);
```

###### Collections

Collections in Exa are not objects; they're local values that can be directly modified by the current procedure. For this reason, if you pass a collection to a different context in an async message, it may need to be copied.

**Arrays** are ordered collections of any number of homogeneous elements, retrievable in constant time by an integer index (zero-based). Arrays dynamically expand and contract as necessary in constant time and support literals delimited by square brackets. 

```
fibs = [0, 1, 1, 2, 3, 5, 8];
articles = ["a", "an", "the"];

fibs[3];		// 2
fibs[fibs[3]]	// 1
fibs[-1];		// syntactic sugar for terminal value (8)
fibs[-2];		// syntactic sugar for 2nd-to-last element

fibs <+ 13;		// pushes a value onto the back of the array
0 +> fibs;		// pushes a value onto the front of the array
```

**Maps** are unordered collections of any number of heterogeneous elements which are retrievable in constant time by unique scalar index (string or number). Map literals are also delimited by square brackets.

```
greats = [
	"Benny Goodman":		"Clarinet"
	"Fats Waller":			"Piano"
	"Fletcher Henderson":	"Clarinet"
	"Jelly Roll Morton":	"Piano"
	"Louis Armstrong":		"Trumpet"
];
```

You can get the length of any collection in constant time with the cardinality operator `#`.

```
numPlayers = #greats; // 5
```

And the unary operator `cut` removes the specified element from a collection and evaluates to the value of the removed element. If an array, the collection then resizes - there can't be "gaps" in arrays.

```
x = cut fibs[0];	// snip off the first element
y = cut fibs[];		// snip off the last element
```

###### Records

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

###### Conditionals and Iteration

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

In addition, Exa provides a facility for the common task of iterating over the elements of a collection - the `walk` function.

```
nodes = [0 1 2 3];

walk(nodes) >>:
	receive node;
	path[] = node;

```

###### Procedure Invocation

A procedure is invoked by sending a request to an address. A request can be sent synchronously in the function application style

```
doSomething(arg1, arg2);
```

or asynchronously using `dispatch` or `after`

```
dispatch doSomething(arg1, arg2);

after readFile(fileName):
	log("done reading `fileName`");

log("this will be logged first");
```

If a request is sent synchronously, the next statement won't be executed until a reply is received. Note: if there is no reply to a synchronous request, the next statement will never be executed.

A synchronous request is an expression that evaluates to the value of the reply. 

```
foo = sqrt(25);	// foo will be assigned 5
```

If a request is sent asynchronously, the next statement will be executed immediately, without waiting for a reply, but a **continuation** to be executed after a reply is received can be attached to the request using the `after` construct.


Note: *all* statements following an asynchronous request are executed before *any* continuation is run. Replies to async requests are enqueued as they are received.

An asynchronous request is not an expression, but its eventual reply can be represented by a **future** using the capture operator `=>`.

```
@ doSomething(arg1) => foo; // foo now holds a future
```

Every request can succeed or fail, and every request can be attached to a failure continuation using the `glitch` construct.

```
after readFile(fileName):
	log("done reading file")
snafu => error:
	log("failed to read the file");
```

If no failure continuation is provided,

A failure continuation can replace a value.

```
after getAnswer => answer:
	write("the answer is... `answer`");
>_<:
	provide 42;
```

See [messages](messages.md) for more information on how messages work in Exa.