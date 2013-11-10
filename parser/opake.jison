%lex

%s comment

%%


"//".*                  /* line comment */
"/*"                    this.begin("comment");
<comment>"*/"           this.popState();
<comment>.              /* skip comment */
\s+                     /* skip whitespace */
[0-9]+("."[0-9]+)?\b    return 'CONSTANT'
\".*\"                  yytext = yytext.substr(1, yyleng-2); return 'STRING_LITERAL';
\'.*\'                  yytext = yytext.substr(1, yyleng-2); return 'STRING_LITERAL';
"("                     return '('
")"                     return ')'
","                     return ','
"{"                     return '{'
"}"                     return '}'
":"                     return ':'
"=>"                    return '=>'
"->"                    return '->'
"~"                     return '~'
">>"                    return '>>'
"="                     return '='
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
'is'                    return 'IS'
"break"                 return 'BREAK'
"true"|"false"          return 'BOOLEAN'
[a-zA-Z][a-zA-Z0-9]*    return 'ID'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%%

module
    : procedure EOF
        { $$ = $1; return $$; }
    ;

procedure
    : block
        { $$ = ['procedure', [], $1]; }
    | '(' format ')' block
        { $$ = ['procedure', $2, $4]; }
    ;

block
    : '{' '}'
        { $$ = []; }
    | '{' sequence '}'
        { $$ = $2; }
    ;

// todo allow capture into formats and assignment to formats
format
    : ID
        { $$ = [$1]; }
    | format ',' ID
        { $$ = $1; $1.push($3); }
    ;

expr
    : assignment
    ;

// technically we don't need assignment since we have capture. i'm tempted to drop it, unless it's somehow differentiated
// also, it's not really assignment - more like overwrite
assignment
    : additive_expr
    | ID '=' assignment
        { $$ = ['assign', $1, $3]; }
    ;

additive_expr
    : multiplicative_expr
    | additive_expr '+' multiplicative_expr
        { $$ = ['add', $1, $3]; }
    | additive_expr '-' multiplicative_expr
        { $$ = ['sub', $1, $3]; }
    ;

multiplicative_expr
    : primitive_expr
    | multiplicative_expr '*' primitive_expr
        { $$ = ['mul', $1, $3]; }
    | multiplicative_expr '/' primitive_expr
        { $$ = ['div', $1, $3]; }
    | multiplicative_expr '%' primitive_expr
        { $$ = ['mod', $1, $3]; }
    ;

primitive_expr
    : ID
        { $$ = ['access', $1]; }
    | CONSTANT
        { $$ = parseFloat($1); }
    | STRING_LITERAL
    | BOOLEAN
        { $$ = ($1 === 'true' ? true : false); }
    | '(' expr ')'
        { $$ = $2; }
    ;

sequence
    : statement
        { $$ = [$1]; }
    | sequence statement
        { $$ = $1; $$.push($2); }
    ;

statement
    : ID IS primitive_expr
        { $$ = ['define', $1, $3]; }
    | capture
    | chain
    | BREAK
    ;

capture
    : chain '=>' ID
    ;

chain
    : source
    | chain connector sink
    ;

// is a request not an expression?? probably should be, right? to allow nesting

source
    : expr
    | request
    ;

request
    : action '(' ')'
    | action '(' params ')'
    ;

params
    : expr
        { $$ = [$1]; }
    | params ',' expr
        { $$ = $1; $$.push($3); }
    ;

action
    : ID ':' ID
        { $$ = $1 + ':' + $3; }
    ;

connector
    : '~'
    | '->'
    | '>>'
    ;

sink
    : ID
    | action
    | procedure
    ;

// todo: add form, set, list literals?
// add parens for grouping expressions