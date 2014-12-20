%lex

%s comment
%x indent

digit                       [0-9]
number                      {digit}+("."{digit}+)?\b
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
"true"|"false"          return 'BOOLEAN'
{number}                return 'NUMBER'
\"[^\"]*\"              yytext = yytext.substr(1, yyleng-2); return 'STRING';
\'[^\']*\'              yytext = yytext.substr(1, yyleng-2); return 'STRING';
"["                     return '['
"]"                     return ']'
"("                     return '('
")"                     return ')'
"{"                     return '{'
"}"                     return '}'
","                     return ','
":"                     return ':'
";"                     return ';'
".."                    return '..'
"."                     return '.'
"<="                    return '<='
">="                    return '>='
"=="                    return '=='
"!="                    return '!='
"&&"|"and"              return 'AND'
"||"|"or"               return 'OR'
"++"                    return '++'
"--"                    return '--'
"+="                    return '+='
"-="                    return '-='
"*="                    return '*='
"/="                    return '/='
"%="                    return '%='
"->"                    return '->'
">>"                    return '>>'
"=>"                    return '=>'
"><"                    return '><'
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
"!"                     return '!'
"if"                    return 'IF'
"else"                  return 'ELSE'
"receive"               return 'RECEIVE'
"skip"                  return 'SKIP'
"break"                 return 'BREAK'
"try"                   return 'TRY'
"in"                    return 'IN'
{id}                    return 'ID'
.                       return 'INVALID'

/lex

%{
    indents = [''];

    ast = require('../ast');
    util = require('util');
%}

/* enable EBNF grammar syntax */
%ebnf

%options token-stack

%left '+' '-'
%left '*' '/' '%'
%left '<' '>' '<=' '>='
%left '==' '!='
%nonassoc IN
%left 'AND' 'OR'

%%

/**

grammar to-dos

blocks need to be generally assignable - currently only allowed in dyads
chains need to be built out

would like semicolons to be replaced with newlines
would like commas in list & set literals to be optional

have an "is" keyword for testing whether two ref sheets point to the same object?
this is tough, since it would break the abstraction of facades etc. and two action
pointers may be different but call the same action. this is the problem with
actually having a totally black box system.
*/

////////////////////////////////////////////////////////////////////////////////
// STRUCTURE

program
    : statement* EOF
        { return {type: 'program', statements: $1}; }
    ;

block
    : BEGIN statement* END -> $2
    ;

////////////////////////////////////////////////////////////////////////////////
// STATEMENTS

statement
    : RECEIVE ID (',' ID)* ';' -> {type: "receive", names: $3 ? [$2].concat($3): [$2]}
    | message ';'
    | assignment ';'
    | selection
    | source '>>' block -> ["pipe", $1, $3]
    | TRY block '><' block -> ["try", $2, $4]
    | SKIP ';' -> ["skip"]
    ;

assignment
    : atom '++' -> ["inc", $1]
    | atom '--' -> ["dec", $1]
    | atom assignment_op expr -> {type: "assign", op: $2, left: $1, right: $3}
    ;

// assignments are not expressions
assignment_op
    : '='
    | '+='
    | '-='
    | '*='
    | '/='
    | '%='
    ;

selection
    : IF expr block -> {type: "select", cond: $2, block: $3}
    | IF expr block ELSE block -> {type: "select", cond: $2, block: $3, else: $5}
    | IF expr block ELSE selection -> ["select", $2, $3, $5]
    ;

////////////////////////////////////////////////////////////////////////////////
// EXPRESSIONS

atom
    : ID -> {type: "id", name: $1};
    | literal
    | atom '[' expr? ']' -> ["subscript", $1, $3]
    | atom '.' ID -> ["access", $1, $3]
    | '(' expr ')' -> $2
    | message
    ;

literal
    : BOOLEAN -> $1 == 'true'
    | NUMBER -> {type: 'number', val: parseFloat($1)}
    | STRING -> {type: 'string', val: $1}
    | '[' (expr ',')* expr? ']' -> ["list", $2 ? $2.concat($3): $3]
    | '[' BEGIN (expr ',')* expr? END ']' -> ["list", $2 ? $2.concat($3): $3]
    | '{' (dyad ',')* dyad? '}' -> ["set", $2 ? $2.concat($3): $3]
    | '{' BEGIN (dyad ',')* dyad? END '}' -> ["set", $2 ? $2.concat($3): $3]
    ;

dyad
    : expr
    | expr ':' expr -> ["dyad", $1, $3];
    | expr ':' block -> ["dyad", $1, $3]; // this isn't general enough
    ;

// messages are the only expressions that can also be statements
message
    : atom '(' (expr ',')* expr? ')' -> {type: "send", to: $1, message: $4 ? $3.concat([$4]) : [$3]}
    ;

// regexes too, probably
source
    : expr '..' expr -> ["count", $1, $3]
    ;

unary_expr
    : atom
    | '#' atom -> {type: "unary_op", op: $1, right: $2}
    | '!' atom -> {type: "unary_op", op: $1, right: $2}
    ;

expr
    : unary_expr
    | expr '+' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '-' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '*' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '/' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '%' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '<' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '>' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '<=' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '>=' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '==' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr '!=' expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr IN expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr AND expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr OR expr -> {type: "op", op: $2, left: $1, right: $3}
    ;
