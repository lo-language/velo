%lex
%%

\s+                     /* skip whitespace */
[0-9]+("."[0-9]+)?\b    return 'NUMBER'
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
        { $$ = new yy.ASTNode([], $1); }
    | '(' format ')' block
        { $$ = new yy.ASTNode($2, $4); }
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
    : ID { $$ = ['access', $1]; }
    | NUMBER
    | STRING_LITERAL
    | BOOLEAN
    | assignment
    ;

assignment
    : ID '=' expr
        { $$ = new yy.ASTNode('assign', [$1, $3]); }
    ;

sequence
    : statement
        { $$ = [$1]; }
    | sequence statement
        { $$ = $1; $$.push($2); }
    ;

statement
    : capture
    | chain
    | BREAK
    ;

capture
    : chain '=>' ID
        { $$ = new yy.ASTNode('capture', [$1, $3]); }
    ;

chain
    : source
        { $$ = [$1]; }
    | chain connector sink
        { $$ = new yy.ASTNode($2, [$1, $3]); }
    ;

// is a request not an expression?? probably should be, right? to allow nesting

source
    : expr
    | request
    ;

request
    : message
        { $$ = new yy.ASTNode('invoke', [$1]); }
    | message '(' params ')'
        { $$ = new yy.ASTNode('invoke', [$1, $3]); }
    ;

params
    : expr
        { $$ = [$1]; }
    | params ',' expr
        { $$ = $1; $$.push($3); }
    ;

message
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
    | message
    | procedure
    ;
