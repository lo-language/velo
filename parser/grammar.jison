%lex

%s comment
%x indent

digit                       [0-9]
number                      \-?{digit}+("."{digit}+)?\b
id                          [_a-zA-Z][_a-zA-Z0-9]*

%%

"//".*                  /* line comment */
"/*"                    this.begin("comment");
<comment><<EOF>>        throw new Error("unclosed block comment");
<comment>"*/"           this.popState();
<comment>.              /* skip comment */
\s*<<EOF>>              %{

    var tokens = [];

    while (indents.length > 1) {
        tokens.unshift('END');
        indents.shift();
    }

    tokens.unshift('EOF');
    return tokens;
				        %}
<INITIAL>\n+            this.begin("indent");
<indent>\s*\n+          /* ignore blank lines */
<indent>\s*             %{

    // process indentation

    this.popState();

    if (yyleng > indents[0].length) {
        indents.unshift(yytext);
        return 'BEGIN';
    }

    if (yyleng < indents[0].length) {

        // todo throw on mismatch between indent and what we pop?

        var tokens = [];

        while (yyleng < indents[0].length) {

            indents.shift();
            tokens.push('END');
        }

        return tokens;
    }
                        %}
\s+                     /* ignore all other whitespace */
"`"                     return '`'
"nil"                   return 'NIL' // null, void, empty, blank, nil?
"true"|"false"          return 'BOOLEAN'
{number}                return 'NUMBER'
\"[^\"]*\"              yytext = yytext.substr(1, yyleng-2); return 'STRING';
//\'[^\']*\'              yytext = yytext.substr(1, yyleng-2); return 'STRING';
"["                     return '['
"]"                     return ']'
"("                     return '('
")"                     return ')'
"{"                     return '{'
"}"                     return '}'
","                     return ','
"::"                    return '::'
":"                     return ':'
";"                     return ';'
".."                    return 'SEQ'
"."                     return '.'
"<="                    return '<='
">="                    return '>='
"=="                    return '=='
"!="                    return '!='
"&&"|"and"              return 'AND'
"||"|"or"               return 'OR'
"!"|"not"               return 'NOT'
"++"                    return '++'
"--"                    return '--'
"+="                    return '+='
"-="                    return '-='
"*="                    return '*='
"/="                    return '/='
"%="                    return '%='
"->"                    return '->'
"=>"                    return '=>' // future connector
">>"                    return '>>' // stream connector
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
"<"                     return '<'
">"                     return '>'
"="                     return '='
"?"                     return '?'
"#"                     return '#'
"is"                    return 'IS'
"receive"               return 'RECEIVE'
"if"                    return 'IF'
"else"                  return 'ELSE'
"catch"                 return 'CATCH'
"while"                 return 'WHILE'
"complete"              return 'COMPLETE'
"in"                    return 'IN'
"skip"                  return 'SKIP'
"reply"                 return 'REPLY'
"fail"                  return 'FAIL'
"replace"               return 'REPLACE'    // recovers from an error. recover? rebound?
{id}                    return 'ID'
.                       return 'INVALID'

/lex

%{
    indents = [''];
%}

/* enable EBNF grammar syntax */
%ebnf

%options token-stack

%left '->' '=>'
%left 'SEQ' 'AND' 'OR' 'IN'
%left '==' '!=' '<' '>' '<=' '>='
%left '+' '-'
%left '*' '/' '%'
%nonassoc '#' 'NOT'

%%

/**

grammar to-dos:

chains need to be built out

would like semicolons to be replaced with newlines
would like commas in list & set literals to be optional

if/else could be followed by colons or commas, like:
if parent, do something;
else, do some other thing;

is keyword:
- could assign constant values
- could be a synonym for ==
- could test undefined

receive:
- if we can call receive multiple times, and in a loop, does that make it feel like we're
receiving multiple messages?

testing binding:
- could use "no" or "missing", e.g.:

     if no parent, do something;
     if missing parent
         fail();

- could use "exists", e.g.:
    if parent exists:

ideas:

separate reply() and fail() from the addresses since these calls terminate execution
maybe the addresses are __reply and __fail or __out and __err?

for defining+assigning procedures: ':' instead of 'is' would be consistent with the map syntax so it
would look the same to define procedures in maps, but is that something we want?? or would that just confuse noobs?
we could also have 'to' ID ':' which could be nice - to getItems: to splitResults: but is more opinionated, because
to work your procname needs to be a verb, but I like the "teaching" connotations of "to x, ..."
could also be "on foo:"

*/

////////////////////////////////////////////////////////////////////////////////
// STRUCTURE

program
    : statement_list EOF
        { return {type: 'procedure', body: $1}; }
    ;

block
    : BEGIN statement_list END -> $2
    ;

////////////////////////////////////////////////////////////////////////////////
// STATEMENTS

statement_list
    : statement -> {type: 'stmt_list', head: $1, tail: null}
    | statement statement_list -> {type: 'stmt_list', head: $1, tail: $2}
    ;

statement
    : RECEIVE (ID ',')* ID ';' -> {type: 'receive', names: $2.concat($3)}
    | application contingency? ';' -> {type: 'application_stmt', application: $1, contingency: $2}
    | response ';'
    | assignment
    | incdec ';'
    | dispatch
    | conditional
    | iteration
    | ID 'IS' ':' block -> {type: 'assign', op: '=', left: {type: 'id', name: $1}, right: {type: 'procedure', body: $4}}
    | COMPLETE (expr ',')* expr ';' -> {type: 'complete', futures: $2.concat([$3])}
    | SKIP ';' -> {type: 'skip'}
    | STOP ';' -> {type: 'stop'}
    ;

response
    : REPLY (expr ',')* expr? -> {type: 'response', channel: $1, args: $3 ? $2.concat([$3]) : []}
    | FAIL (expr ',')* expr? -> {type: 'response', channel: $1, args: $3 ? $2.concat([$3]) : []}
    | REPLACE (expr ',')* expr? -> {type: 'response', channel: $1, args: $3 ? $2.concat([$3]) : []}
    ;

// assignments are statements, not expressions!
assignment
    : lvalue assignment_op expr ';' -> {type: 'assign', op: $2, left: $1, right: $3}
    | lvalue assignment_op application contingency -> {type: 'recovery', op: $2, left: $1, application: $3, contingency: $4}
    ;

assignment_op
    : '='
    | '+='
    | '-='
    | '*='
    | '/='
    | '%='
    ;

incdec
    : lvalue '++' -> {type: 'assign', op: $2, left: $1}
    | lvalue '--' -> {type: 'assign', op: $2, left: $1}
    ;

conditional
    : IF expr ':' block -> {type: 'conditional', predicate: $2, consequent: $4}
    | IF expr ':' block ELSE ':' block -> {type: 'conditional', predicate: $2, consequent: $4, otherwise: $7}
    | IF expr ':' block ELSE conditional -> {type: 'conditional', predicate: $2, consequent: $4, otherwise: $6}
    ;

iteration
    : WHILE expr ':' block -> {type: 'iteration', condition: $2, statements: $4}
    ;

////////////////////////////////////////////////////////////////////////////////
// EXPRESSIONS

value
    : lvalue
    | literal
    | '(' expr ')' -> $2
    | application
    ;

lvalue
    : ID -> {type: 'id', name: $1}
    | value '[' expr? ']' -> {type: 'subscript', list: $1, index: $3}
    | value '.' ID -> {type: 'select', set: $1, member: $3}
    ;

literal
    : NIL
    | '<' ID '>' -> {type: 'symbol', name: $2}
    | BOOLEAN -> {type: 'boolean', val: $1 == 'true'}
    | NUMBER -> {type: 'number', val: $1}
    | STRING -> {type: 'string', val: $1}
    | '[' (expr ',')* expr? ']' -> {type: 'list', elements: $3 ? $2.concat([$3]): []}
    | '{' BEGIN* (dyad ',')* dyad? END* '}' -> {type: 'set', members: $4 ? $3.concat([$4]): []}
    | '::' block
    ;

dyad
    : expr -> {type: 'dyad', key: $1, value: {type: 'boolean', val: true}};
    | expr ':' expr -> {type: 'dyad', key: $1, value: $3};
    ;

// applications ARE expressions

application
    : value '(' (expr ',')* expr? ')' -> {type: 'application', procedure: $1, args: $4 ? $3.concat([$4]) : []}
    ;

unary_expr
    : value
    | '#' unary_expr -> {type: 'cardinality', operand: $2}
    | 'NOT' unary_expr -> {type: 'complement', operand: $2}
    ;

expr
    : unary_expr
    | expr '+' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '-' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '*' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '/' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '%' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '<' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '>' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '<=' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '>=' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '==' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr '!=' expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr AND expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr OR expr -> {type: 'op', op: $2, left: $1, right: $3}
    | expr IN expr -> {type: 'in', left: $1, right: $3}
    | expr SEQ expr -> {type: 'sequence', first: $1, last: $3}
    ;

// messages are NOT expressions

message
    : expr '->' value -> {type: 'message', body: $1, to: $3}
    ;

contingency
    : CATCH ':' block -> $3
    ;

// a future is like an IOU for a value - *any* lvalue can be a future
// if the future is abandoned, any code referring to it will see it as *undefined*

future
    : '=>' lvalue -> $2
    ;

// a dispatch is almost like a switch statement

dispatch
    : message ';'
    | message contingency -> {type: 'message', body: $1.body, to: $1.to, contingency: $2}
    | message future ';' -> {type: 'message', body: $1.body, to: $1.to, future: $2}
    | message future contingency -> {type: 'message', body: $1.body, to: $1.to, future: $2, contingency: $3}
    | message ':' block contingency? -> {type: 'message', body: $1.body, to: $1.to, subsequent: $3, contingency: $4}
    ;