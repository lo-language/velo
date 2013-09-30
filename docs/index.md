=Gel=
Security Concurrency Testability

Gel is a simple language designed to make it easy to write secure, concurrent, testable software.

This is achieved through three key differences from most languages:

- Gel has no global symbols - not just global variables, but global symbols.
- Objects are totally opaque - only messages, no direct read/write of attributes.
- All function calls are asynchronous.

The first two ensure *perfect encapsulation*:

 1. modules can't reach arbitrarily out
 2. nor can anything reach arbitrarily in.

The last one achieves locality independence:
 3. any dependency can be replaced with something remote without breaking abstraction

Built-in datatypes

