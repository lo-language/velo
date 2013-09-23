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
"="                   return '='
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>               return 'EOF'
"reply"               return 'REPLY'
[a-zA-Z][a-zA-Z0-9]*  return 'IDENTIFIER'
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
    : statement_list EOF { $$ = $1; return $$; }
    ;

statement_list
	: statement { $$ = [$1]; }
	| statement_list statement { $$ = $1; $1.push($2); }
	;

statement
	: expression_statement
	| REPLY expression ';' { $$ = new yy.OpNode('reply', $2); }
	;

expression_statement
	: ';'
	| expression ';'
	;

primary_expression
	: IDENTIFIER { $$ = ['id', $1]; }
	| NUMBER { $$ = parseFloat($1); }
	| STRING_LITERAL
	| '(' expression ')' { $$ = $2; }
	;

multiplicative_expression
	: primary_expression
	| multiplicative_expression '*' primary_expression { $$ = new yy.OpNode($2, $1, $3); }
	| multiplicative_expression '/' primary_expression { $$ = new yy.OpNode($2, $1, $3); }
	| multiplicative_expression '%' primary_expression { $$ = new yy.OpNode($2, $1, $3); }
	;

additive_expression
	: multiplicative_expression
	| additive_expression '+' multiplicative_expression { $$ = new yy.OpNode($2, $1, $3); }
	| additive_expression '-' multiplicative_expression { $$ = new yy.OpNode($2, $1, $3); }
	;

/* should it just be IDENTIFIER for the left of assignment_expression? */
assignment_expression
	: additive_expression
	| primary_expression assignment_operator assignment_expression { $$ = new yy.OpNode($2, $1, $3); }
	;

assignment_operator
	: '='
	;

expression
	: assignment_expression
	| expression ',' assignment_expression
	;