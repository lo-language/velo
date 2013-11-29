%lex

%s comment

%%


"//".*                  /* line comment */
"/*"                    this.begin("comment");
<comment>"*/"           this.popState();
<comment>.              /* skip comment */
\s+                     /* skip whitespace */
";"                     return ';'
[0-9]+("."[0-9]+)?\b    return 'CONSTANT'
\".*\"                  yytext = yytext.substr(1, yyleng-2); return 'STRING_LITERAL';
\'.*\'                  yytext = yytext.substr(1, yyleng-2); return 'STRING_LITERAL';
"["                     return '['
"]"                     return ']'
"("                     return '('
")"                     return ')'
","                     return ','
"{"                     return '{'
"}"                     return '}'
"."                     return '.'
"=="                    return '=='
"!="                    return '!='
"<="                    return '<='
">="                    return '>='
":"                     return ':'
"=>"                    return '=>'
"->"                    return '->'
"||"                    return '||'
"&&"                    return '&&'
"&"                     return '&'
"|"                     return '|'
"^"                     return '^'
"~"                     return '~'
">>"                    return '>>'
"<"                     return '<'
">"                     return '>'
"="                     return '='
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
"?"                     return '?'
"#"                     return '#'
"if"                    return 'IF'
"else"                  return 'ELSE'
"is"                    return 'IS'
"fail"                  return 'FAIL'
"break"                 return 'BREAK'
"action"                return 'ACTION'
"true"|"false"          return 'BOOLEAN'
[a-zA-Z][a-zA-Z0-9]*    return 'NAME'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%%

module
    : action_definition EOF
        { $$ = $1; return $$; }
    ;

action_definition
    : ACTION block
        { $$ = ['action', [], $2]; }
    | ACTION '(' ')' block
        { $$ = ['action', [], $4]; }
    | ACTION '(' name_list ')' block
        { $$ = ['action', $3, $5]; }
    ;

name_list
    : NAME
        { $$ = [$1]; }
    | name_list ',' NAME
        { $$ = $1; $$.push($3); }
    ;

block
    : '{' '}'
        { $$ = []; }
    | '{' statement_list '}'
        { $$ = $2; }
    ;

statement_list
    : statement
        { $$ = [$1]; }
    | statement_list statement
        { $$ = $1; $$.push($2); }
    ;

statement
    : expression ';'
    | NAME IS literal ';'
        { $$ = ['define', $1, $3]; }
    | FAIL expression ';'
        { $$ = ['fail', $2]; }
    | sequence_statement
    | sequence_statement ';'
    | selection_statement
    ;

selection_statement
    : block
    | IF '(' expression ')' block
        { $$ = ['if', $3, $5]; }
    | IF '(' expression ')' block ELSE selection_statement
        { $$ = ['if', $3, $5, $7]; }
    ;

// I'm not sure if the sequences should be left- or right-recursive, defaulting to left
sequence_statement
    : invocation
    | expression connector sink
        { $$ = [$2, $1, $3]; }
    | sequence_statement connector sink
        { $$ = [$2, $1, $3]; }
    | expression '=>' identifier
        { $$ = ['assign', $3, $1]; }    // optimization
    | sequence_statement '=>' identifier
        { $$ = ['capture', $1, $3]; }
    ;

sink
    : identifier
    | action_definition
    ;

identifier
    : NAME
    | identifier '[' expression ']'
        { $$ = ['select', $1, $3]; }
    | identifier '.' NAME
        { $$ = ['select', $1, $3]; }
    ;

expression
    : assignment_expression
    ;

invocation
    : identifier '(' ')'
        { $$ = ['invoke', $1]; }
    | identifier '(' argument_expression_list ')'
        { $$ = ['invoke', $1, $3]; }
    ;

argument_expression_list
    : assignment_expression
        { $$ = [$1]; }
    | argument_expression_list ',' assignment_expression
        { $$ = $1; $$.push($3); }
    ;

literal
    : BOOLEAN
        { $$ = ($1 === 'true' ? true : false); }
    | CONSTANT
        { $$ = parseFloat($1); }
    | STRING_LITERAL
        { $$ = ['str', $1]; }
    ;

connector
    : '->'
    | '>>'
    | '~'
    ;


// C expression syntax, basically

primary_expression
    : identifier
    | literal
    | action_definition
    | '(' expression ')'
        { $$ = $2; }
    ;

unary_expression
    : primary_expression
    | '#' primary_expression
        { $$ = ['card', $2]; }
    ;

multiplicative_expression
    : unary_expression
    | multiplicative_expression '*' primary_expression
        { $$ = ['mul', $1, $3]; }
    | multiplicative_expression '/' primary_expression
        { $$ = ['div', $1, $3]; }
    | multiplicative_expression '%' primary_expression
        { $$ = ['mod', $1, $3]; }
    ;

additive_expression
    : multiplicative_expression
    | additive_expression '+' multiplicative_expression
        { $$ = ['add', $1, $3]; }
    | additive_expression '-' multiplicative_expression
        { $$ = ['sub', $1, $3]; }
    ;

relational_expression
    : additive_expression
    | relational_expression '<' additive_expression
        { $$ = ['lt', $1, $3]; }
    | relational_expression '>' additive_expression
        { $$ = ['gt', $1, $3]; }
    | relational_expression '<=' additive_expression
        { $$ = ['le', $1, $3]; }
    | relational_expression '>=' additive_expression
        { $$ = ['ge', $1, $3]; }
    ;

equality_expression
    : relational_expression
    | equality_expression '==' relational_expression
        { $$ = ['equality', $1, $3]; }
    | equality_expression '!=' relational_expression
        { $$ = ['inequality', $1, $3]; }
    ;

and_expression
	: equality_expression
	| and_expression '&' equality_expression
	    { $$ = ['bitwise_and', $1, $3]; }
	;

exclusive_or_expression
	: and_expression
	| exclusive_or_expression '^' and_expression
	    { $$ = ['xor', $1, $3]; }
	;

inclusive_or_expression
	: exclusive_or_expression
	| inclusive_or_expression '|' exclusive_or_expression
	    { $$ = ['bitwise_or', $1, $3]; }
	;

logical_and_expression
	: inclusive_or_expression
	| logical_and_expression '&&' inclusive_or_expression
	    { $$ = ['and', $1, $3]; }
	;

logical_or_expression
	: logical_and_expression
	| logical_or_expression '||' logical_and_expression
	    { $$ = ['or', $1, $3]; }
	;

conditional_expression
	: logical_or_expression
	| logical_or_expression '?' expression ':' conditional_expression
	    { $$ = ['conditional', $1, $3, $5]; }
	;

assignment_expression
    : conditional_expression
    | conditional_expression '=' assignment_expression
        { $$ = ['assign', $1, $3]; }
    ;
