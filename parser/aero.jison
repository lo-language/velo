/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

"//".*                /* ignore comment */
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
\".*\"                yytext = yytext.substr(1,yyleng-2); return 'STRING_LITERAL';
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"!"                   return '!'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"="                   return '='
">>"                  return '>>'
"true"|"false"        return 'BOOLEAN'
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>               return 'EOF'
"reply"               return 'REPLY'
';'                   return ';'
[a-zA-Z][a-zA-Z0-9]*  return 'IDENTIFIER'
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
	| compound_statement
	| iteration_statement
	| REPLY expression ';' { $$ = new yy.ASTNode('reply', $2); }
	;

expression_statement
	: ';'
	| expression ';'
	;

compound_statement
    : '{' statement_list '}' { $$ = new yy.Procedure($2); }
    ;

iteration_statement
    : expression '>>' '(' ')' statement { console.log('iteration'); }
    ;

primary_expression
	: IDENTIFIER { $$ = new yy.Identifier($1); }
	| NUMBER { $$ = parseFloat($1); }
	| STRING_LITERAL
	| BOOLEAN { $$ = ($1 === 'true' ? true : false); }
	| set
	| list
	| '(' expression ')' { $$ = $2; }
	;

postfix_expression
    : postfix_expression '.' primary_expression
    ;

set
    : '{' '}' { $$ = {}; }
    | '{' expression_list '}' { $$ = $2; }
    ;

list
    : '[' ']' { $$ = []; }
    | '[' expression_list ']' { $$ = $2; }
    ;

multiplicative_expression
	: primary_expression
	| multiplicative_expression '*' primary_expression { $$ = new yy.ASTNode($2, $1, $3); }
	| multiplicative_expression '/' primary_expression { $$ = new yy.ASTNode($2, $1, $3); }
	| multiplicative_expression '%' primary_expression { $$ = new yy.ASTNode($2, $1, $3); }
	;

additive_expression
	: multiplicative_expression
	| additive_expression '+' multiplicative_expression { $$ = new yy.ASTNode($2, $1, $3); }
	| additive_expression '-' multiplicative_expression { $$ = new yy.ASTNode($2, $1, $3); }
	;

/* should it just be IDENTIFIER for the left of assignment_expression? */
assignment_expression
	: additive_expression
	| primary_expression assignment_operator assignment_expression { $$ = new yy.ASTNode($2, $1, $3); }
	;

expression_list
    : expression { $$ = [$1]; }
    | expression_list ',' expression { $1.push($3); $$ = $1; }
    ;

assignment_operator
	: '='
	;

expression
	: assignment_expression
	;