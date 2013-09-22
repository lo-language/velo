/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"!"                   return '!'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>               return 'EOF'
"reply"               return 'REPLY'
';'                   return ';'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start process

%% /* language grammar */

process
    : stmt EOF { return $1; }
    ;

stmt
    : expr ';'
    ;

expr
    : REPLY mathexp { $$ = new yy.OpNode('reply', $2); }
    ;

mathexp
    : NUMBER '*' NUMBER { $$ = new yy.OpNode('mult', $1, $3); }
    ;