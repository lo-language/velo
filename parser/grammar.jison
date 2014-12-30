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
".."                    return 'SEQ'
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
"~>"                    return '~>'
">>"                    return '>>'
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
"holds"                 return 'HOLDS'
"skip"                  return 'SKIP'
"reply"|"fail"          return 'CHANNEL'
"stop"                  return 'STOP'
"try"                   return 'TRY'
{id}                    return 'ID'
.                       return 'INVALID'

/lex

%{
    indents = [''];
%}

/* enable EBNF grammar syntax */
%ebnf

%options token-stack

%left '->' '~>' '>>'
%left 'SEQ' 'AND' 'OR' 'HOLDS'
%left '+' '-'
%left '*' '/' '%'
%left '<' '>' '<=' '>='
%left '==' '!='

%%

/**

grammar to-dos

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
    : RECEIVE (ID ',')* ID ';' -> {type: "receive", names: $2.concat($3)}
    | expr ';'
    | termination ';'    // to prevent usage of fail() and reply() in expressions - might want to change this, though
    | assignment ';'
    | conditional
    | SKIP ';' -> ["skip"]
    ;

termination
    : CHANNEL '(' (expr ',')* expr? ')' -> {type: "termination", channel: $1, args: $4 ? $3.concat([$4]) : []}
    ;

// assignments are not expressions
assignment
    : atom '++' -> {type: "assign", op: $2, left: $1}
    | atom '--' -> {type: "assign", op: $2, left: $1}
    | atom assignment_op expr -> {type: "assign", op: $2, left: $1, right: $3}
    ;

assignment_op
    : '='
    | '+='
    | '-='
    | '*='
    | '/='
    | '%='
    ;

conditional
    : IF expr block -> {type: "conditional", predicate: $2, positive: $3}
    | IF expr block ELSE block -> {type: "conditional", predicate: $2, positive: $3, negative: $5}
    | IF expr block ELSE conditional -> {type: "conditional", predicate: $2, positive: $3, negative: $5}
    ;

////////////////////////////////////////////////////////////////////////////////
// EXPRESSIONS

atom
    : literal
    | ID -> {type: "id", name: $1}
    | atom '[' expr? ']' -> {type: "subscript", list: $1, index: $3}
    | atom '.' ID -> {type: "select", set: $1, member: $3}
    | '(' expr ')' -> $2
    | request
    ;

literal
    : BOOLEAN -> {type: 'boolean', val: $1 == 'true'}
    | NUMBER -> {type: 'number', val: parseFloat($1)}
    | STRING -> {type: 'string', val: $1}
    | '[' (expr ',')* expr? ']' -> {type: "list", elements: $3 ? $2.concat([$3]): []}
    | '{' (dyad ',')* dyad? '}' -> {type: "set", members: $3 ? $2.concat([$3]): []}
    | block -> {type: "block", statements: $1}
    ;

dyad
    : expr
    | expr ':' expr -> ["dyad", $1, $3];
    ;

// requests are the only expressions that can also be stand-alone statements
// or are they the only statements that can be expressions?
request
    : atom '(' (expr ',')* expr? ')' -> {type: "request", to: $1, args: $4 ? $3.concat([$4]) : []}
    ;

unary_expr
    : atom
    | '#' atom -> {type: "cardinality", operand: $2}
    | '!' atom -> {type: "complement", operand: $2}
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
    | expr AND expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr OR expr -> {type: "op", op: $2, left: $1, right: $3}
    | expr HOLDS expr -> {type: "holds", left: $1, right: $3}
    | expr SEQ expr -> {type: "sequence", left: $1, right: $3}
    | connection
    ;

connection
    : expr '->' expr -> {type: "connection", connector: $2, source: $1, sink: $3}
    | expr '~>' expr -> {type: "connection", connector: $2, source: $1, sink: $3}
    | expr '>>' expr -> {type: "connection", connector: $2, source: $1, sink: $3}
    ;
