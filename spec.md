## Tasks

A **task** is created when a message is received by a procedure.

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

## Messages

A message consists of a body and an envelope. The body contains arguments to a procedure. The envelope contains addresses for responses as well as the `connect` procedure.

A message can be sent as `no-reply` in which case no response addresses are included with the message, precluding any response. Otherwise, two response addresses are created, one for success and the other for failure, and included with the message. These addresses can be mapped to subprocedures that receive the message response.

Messages can be synchronous or asynchronous.

**Synchronous messages** are messages for which the sending procedure will wait for a response before executing the next statement.

**Asynchronous messages** are messages for which the sending procedure will *not* wait for a response before executing the next statement.