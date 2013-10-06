## Concurrency + Security + Testability

Opake is a simple language designed to make it *easy* to write secure, concurrent, completely tested software. While most programming languages ignore these, Opake elevates them to primary concerns - and it does so by leaving things *out*.

This is accomplished primarily by two mechanisms:

- total encapsulation
- purely asynchronous communication

Total encapsulation entails:

- no global symbols - not just global variables, but global symbols.
- no direct access of attributes.

Not only can nothing reach directly into an object, but objects can't reach out.

The last one achieves locality independence:

 3. any dependency can be replaced with something remote without breaking abstraction

Tickets

Built-in datatypes

