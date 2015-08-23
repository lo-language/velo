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
"nil"                   return 'NIL' // none, null, void, empty, blank, nada, nothing, zip, nil, missing, undefined, undef? some symbol? () empty parens?
"true"|"false"          return 'BOOLEAN'
{number}                return 'NUMBER'
\"[^\"]*\"              yytext = yytext.substr(1, yyleng-2); return 'STRING';
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
"~"                     return '~'
"\\"                    return 'BS'
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
"define"                return 'DEFINE'
"distinguish"           return 'DISTINGUISH'
"is"                    return 'IS'
"receive"               return 'RECEIVE'
"if"                    return 'IF'
"else"                  return 'ELSE'
"catch"                 return 'CATCH'      // failed?
"while"                 return 'WHILE'
"after"                 return 'AFTER'      // when, on, release, send, dispatch, fire?
"in"                    return 'IN'
"skip"                  return 'SKIP'
"reply"                 return 'REPLY'
"fail"                  return 'FAIL'
"mute"                  return 'MUTE'
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

responses via callbacks as foo<arg1, arg2> to differentiate from requests which are foo(arg1, arg2)

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

// I'm not convinced application expressions should be allowed to have contingencies attached

statement
    : RECEIVE (ID ',')* ID ';' -> {type: 'receive', names: $2.concat($3)}
    | DEFINE ID (NUMBER|STRING) ';' -> {type: 'constant', name: $2, value: $3}
    | DISTINGUISH (ID ','?)+ ID ';' -> {type: 'range', variants: $2.concat($3)}
    | application contingency? ';' -> {type: 'application_stmt', application: $1, contingency: $2}
    | response ';'
    | assignment
    | step ';'
    | lvalue ';'    // this is an attempt to be able to send messages just by using the procvar
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
// todo multiple lvalues separated by commas for destructuring
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

step
    : lvalue '++' -> {type: 'increment', op: $2, left: $1}
    | lvalue '--' -> {type: 'decrement', op: $2, left: $1}
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
    | '(' lvalue (',' lvalue)+ ')' -> {type: 'destructure', members: $3.concat([$2])}
    ;

literal
    : NIL -> {type: 'nil'}
    | BOOLEAN -> {type: 'boolean', val: $1 == 'true'}
    | NUMBER -> {type: 'number', val: $1}
    | STRING -> {type: 'string', val: $1}
    | '[' BEGIN? (dyad ',')* dyad? END? ']' -> {type: 'list', elements: $4 ? $3.concat([$4]): []}
    | '{' BEGIN? (attribute ',')* attribute? END? '}' -> {type: 'record', attributes: $4 ? $3.concat([$4]): []}
    | '::' block
    ;

dyad
    : expr -> {type: 'dyad', key: $1, value: {type: 'boolean', val: true}};
    | expr ':' expr -> {type: 'dyad', key: $1, value: $3};
    ;

attribute
    : ID ':' expr -> {type: 'field', name: $1, value: $3}
    ;

// applications ARE expressions

application
    : value '(' (expr ',')* expr? ')' -> {type: 'application', address: $1, args: $4 ? $3.concat([$4]) : []}
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

// a dispatch is like a switch statement
// the subsequent/contingency blocks are not strictly procedures,
// if we define procedures as having to receive requests, since sub/cont blocks receive responses

dispatch
    : future ';'
    | future contingency
    | AFTER future ':' block contingency? -> {type: 'message', address: $2.address, args: $2.args, subsequent: $4, contingency: $5}
    ;

// a future is like an IOU for a value - *any* lvalue can be a future
// if the future is abandoned, any code referring to it will see it as *undefined*

future
    : message
    | message '=>' (lvalue ',')* lvalue -> $2
    | value '=>'  (lvalue ',')* lvalue
    ;

// messages are NOT expressions

message
    : value '~' (expr ',')* expr -> {type: 'message', address: $1, args: $3.concat([$4])}
    ;

// todo: mute
contingency
    : CATCH ':' block -> $3
    ;