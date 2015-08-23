## Tasks

A **task** is created when a message is received by a procedure. 

Tasks form a tree. 

Responses to requests sent from a terminated task get routed to the "dead letter queue".

A Task tree consists of a root task and all its subtasks, their subtasks, etc. The root task is always created to serve a request; a subtask is always created to handle a response. The tree is thus a tree of activation records, but it doesn't extend to other requests.

A Task tree does **not** include the messages sent from its tasks. Messages are the connections between task trees - one tree sends a request the spawns another tree, which can send requests of its own etc. and then finally a response back to the original task tree.


When a task is created, its pending response count is zero. When a message is sent from a task, the pending response count is incremented. When a response is received, the pending response count is decremented. A task has pending responses if its pending response count > 0.

A **subtask** is created when a message is received by a sub-procedure.

A task is *complete* when:

- the last statement of the procedure has been executed
- it has no pending responses
- it has no incomplete subtasks

#### Responses

When a task invokes `reply` or `fail`, a message is immediately sent on the appropriate channel, and any later attempt to invoke either `reply` or `fail` will be ignored.

Any responses that arrive after the task's own response has been sent are still processed, but any later attempt to invoke `reply` or `fail` will be ignored. 

##### Alternative: delayed replies from tasks with pending responses

If a reply is sent by a task with pending responses, the reply is held until all pending responses are received. If a reply is being held and, in processing a response `fail` is invoked, the reply is canceled and a failure message is sent.

#### Implicit Replies

If a procedure concludes and its pending response count is zero, or if the final response is received after a procedure has concluded, if no response has yet been sent by the procedure, an empty `reply` message is sent by the procedure.

#### Failures

Failures go to the root of a task tree. What happens to sibling branches? Do they even receive their replies? Do they receive them and not do anything? Or do they keep processing? What if there's cleanup that needs to be done? Can we signal failure but keep processing?



The Role of Mathematics in Software

Automatic computation is about automation, not computation.

It's about automation of processes via
a) manipulation of symbols and
b) communication with external systems

Those symbols can be numbers, and the processes can be numerical, but that's a subset. We're confused because the first tasks we wanted to automate were numerical, so computing has a long history of association with math in this regard. But it gets even more confusing in the languages, where, because we're often using math, algebraic expressions are nice, and functions are nice, and then we take that idea and run with it - too far. And then there's the lambda calc, which is a formalization. 

And a lot of code is *doing* math.

Automatic computation is the application of a mechanism to math.

It's not the math that matters; it's the *mechanism*.

But Turing's model was entirely different - it was *physical* - it had tape. This physicality is crucial - we can't sweep it under the rug. Embrace it. Like any engineering discipline, math provides crucial analytical tools to our discipline. But our discipline is engineering - machines, not math.







This is not an academic language, nor an experimental language. I got sucked into programming when I was 12 years old (a long time ago now) and after decades of frustration with my tools, with occasional moments of "wow, that's slick" I challenged myself to put my money where my mouth is. I created this language for myself, to be a real tool for industrial-grade application development.

It has taken me an embarrassingly long time to get this far, but Exa is still in a draft stage - I'm sure there are many obvious points of improvement you could steer me towards.

I didn't do this because I thought it would be "fun" to design or implement a language, I did it because, in my hubris, I thought a saw a better way to do it.

I'm asking for your feedback because a) the things I learned from this community fed directly into the development of this language and b) there's a lot I don't have to explain to this group - namely, the value of capabilities and how familiarity with the concept colors one's way of thinking about software.


## Messages

A message consists of a body and an envelope. The body contains arguments to a procedure. The envelope contains addresses for responses as well as the `connect` procedure.

A message can be sent as `no-reply` in which case no response addresses are included with the message, precluding any response. Otherwise, two response addresses are created, one for success and the other for failure, and included with the message. These addresses can be mapped to subprocedures that receive the message response.

Messages can be synchronous or asynchronous.

**Synchronous messages** are messages for which the sending procedure will wait for a response before executing the next statement.

**Asynchronous messages** are messages for which the sending procedure will *not* wait for a response before executing the next statement.