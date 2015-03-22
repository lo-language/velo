## ExaJS: The Exa-to-JavaScript Compiler


#### How code generation works

The compiler generates JavaScript source from the AST bottom-up: 

1. Leaf nodes compile to bare JS strings
2. Simple non-leaf nodes compile to JS constructs represented as lists containing strings and sub-node results. E.g. an addition expression could compile to: ['(', leftOperand, ' + ', rightOperand, ')'] where leftOperand and rightOperand are compilation results, perhaps lists.
3. More complex nodes compile to wrapper objects such as JsConstruct, JsRequest, or JsStatement. These objects just wrap lists of parts in order to expand helper objects or render transforms.

