%lex
%%

\s+                     /* skip whitespace */
\".*\"                  yytext = yytext.substr(1, yyleng-2); return 'STRING_LITERAL';
"("                     return '('
")"                     return ')'
","                     return ','
"{"                     return '{'
"}"                     return '}'
":"                     return ':'
"=>"                    return '=>'
"->"                    return '->'
'~'                     return '~'
'>>'                    return '>>'
[a-zA-Z][a-zA-Z0-9]*    return 'ID'
.                       return 'INVALID'

/lex

%%

process
    : '(' params ')' '{' sequence '}'
    ;

params
    :
    | expr
    | params ',' expr
    ;

expr
    : ID
    | STRING_LITERAL
    ;

sequence
    :
    | sequence statement
    ;

statement
    : capture
    | chain
    ;

capture
    : chain '=>' ID
    ;

chain
    : source
    | chain connector sink
    ;

sink
    : ID
    | command
    | process
    ;

source
    : expr
    | command
    | command '(' params ')'
    ;

command
    : ID ':' ID
    ;

connector
    : '->'
    | '~'
    | '>>'
    ;
