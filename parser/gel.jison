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

%% /* language grammar */

procedure
    : statement_list EOF { return $1; }
    ;

statement_list
	: statement { $$ = [$1]; }
	| statement_list statement { $$ = $1; $1.push($2); }
	;

statement
	: expression_statement { $$ = $1; }
	;

expression_statement
	: ';'
	| expression ';' { $$ = $1; }
	;

expression
    : REPLY mathexp { $$ = new yy.OpNode('reply', $2); }
    ;

mathexp
    : NUMBER '*' NUMBER { $$ = new yy.OpNode('mult', $1, $3); }
    ;