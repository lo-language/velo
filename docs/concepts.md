## Exa Concepts

Imagine a worker – let's call her Rosie – with an inbox having an **address**, and a **procedure** to be performed for each message received. Assume there's a mail system that routes messages into the inbox. Rosie attends the inbox, pulling messages out in the order in which they arrive and performing her procedure for each one as a distinct **task**. In doing so, she's performing a **service** defined by the procedure and accessible via the address, as shown below. If there are no messages she sits idly.

![an exa service](images/concepts1.png "an exa service")

Rosie also has access to an outbox where she can drop messages for delivery, so long as she has an address to send them to. These messages are always either a **request** to be sent to another service or a **reply** in response to a request made of her service. Whenever she sends a reply she indicates either success or failure, and she can only send one reply per request; *success or failure is indicated by the address to which her reply is sent* – every request can include two reply addresses, one for reporting success and one for reporting failure.

Since a person can only do one thing at a time, Rosie is only ever working on one task at a time, and as a **sequential** process – one instruction at a time. So if she is occupied with a task when more messages arrive, those messages will sit in her inbox until she has time to get to them. This will either be when she's done with her current task or when that task becomes *blocked*, meaning she can't do anything more on it until she receives a reply to a request she sent. If it's the latter situation, she'll temporarily set her current task aside and pick up the next message in her queue, if any.

Rosie is very organized, so when she starts on a task she prepares a space called a **frame** to keep track of the state of the task; if she has to put the task aside, the frame keeps everything in place, ready to be picked up again.
