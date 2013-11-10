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
    ;

procedure
    : '(' format ')' '{' sequence '}' { $$ = new yy.Procedure($2, $5); return $$; }
    ;

format
    : ID
    | format ',' ID
    ;

expr
    : ID
    | NUMBER
    | STRING_LITERAL
    | BOOLEAN
    | assignment
    ;

assignment
    : ID '=' expr
    ;

sequence
    : statement { $$ = [$1]; }
    | sequence statement { $$ = $1; $1.push($2); }
    ;

statement
    : capture
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

source
    : expr
    | command
    | command '(' params ')'
    ;

params
    :
    | expr
    | params ',' expr
    ;

command
    : ID ':' ID
    ;

connector
    : '~'
    | '->'
    | '>>'
    ;

sink
    : ID
    | command
    | procedure
    ;
