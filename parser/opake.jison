%lex

%s comment

%%


"//".*                  /* line comment */
"/*"                    this.begin("comment");
<comment>"*/"           this.popState();
<comment>.              /* skip comment */
\s+                     /* skip whitespace */
';'                     return ';'
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
'=='                    return '=='
'!='                    return '!='
'<='                    return '<='
'>='                    return '>='
":"                     return ':'
"=>"                    return '=>'
"->"                    return '->'
'||'                    return '||'
'&&'                    return '&&'
"~"                     return '~'
">>"                    return '>>'
'<'                     return '<'
'>'                     return '>'
"="                     return '='
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
'#'                     return '#'
'if'                    return 'IF'
'is'                    return 'IS'
'fail'                  return 'FAIL'
"break"                 return 'BREAK'
"true"|"false"          return 'BOOLEAN'
[a-zA-Z][a-zA-Z0-9]*    return 'ID'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%%

program
    : statement_list EOF
        { $$ = $1; return $$; }
    | procedure EOF
        { $$ = $1; return $$; }
    ;

procedure
    : block
        { $$ = ['procedure', $1]; }
    ;

id_list
    : ID
    | id_list ',' ID
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
    | ID IS primary_expr ';'
        { $$ = ['define', $1, $3]; }
    | FAIL expression ';'
        { $$ = ['fail', $2]; }
    | selection_stmt
    ;

selection_stmt
    : IF '(' expression ')' block
    | IF '(' expression ')' block ELSE block
    | SWITCH '(' expression ')' statement
    ;

sequence_expr
    : equality_expr
    | sequence_expr connector action
        { $$ = ['sequence', $1, $2, $3]; }
    | sequence_expr '=>' postfix_expr
        { $$ = ['capture', $1, $3]; }
    ;

equality_expr
    : relational_expr
    | equality_expr '==' relational_expr
        { $$ = ['equality', $1, $3]; }
    | equality_expr '!=' relational_expr
        { $$ = ['inequality', $1, $3]; }
    ;

relational_expr
    : additive_expr
    | relational_expr '<' additive_expr
        { $$ = ['lt', $1, $3]; }
    | relational_expr '>' additive_expr
        { $$ = ['gt', $1, $3]; }
    | relational_expr '<=' additive_expr
        { $$ = ['le', $1, $3]; }
    | relational_expr '>=' additive_expr
        { $$ = ['ge', $1, $3]; }
    ;

additive_expr
    : multiplicative_expr
    | additive_expr '+' multiplicative_expr
        { $$ = ['add', $1, $3]; }
    | additive_expr '-' multiplicative_expr
        { $$ = ['sub', $1, $3]; }
    ;

multiplicative_expr
    : unary_expr
    | multiplicative_expr '*' primary_expr
        { $$ = ['mul', $1, $3]; }
    | multiplicative_expr '/' primary_expr
        { $$ = ['div', $1, $3]; }
    | multiplicative_expr '%' primary_expr
        { $$ = ['mod', $1, $3]; }
    ;

unary_expr
    : postfix_expr
    | '#' postfix_expr
        { $$ = ['card', $2]; }
    ;

postfix_expr
    : primary_expr
    | postfix_expr '[' expression ']'
        { $$ = ['select', $1, $3]; }
    | postfix_expr '.' ID
        { $$ = ['select', $1, $3]; }
    | postfix_expr '(' ')'
    | postfix_expr '(' arg_expr_list ')'
    ;

arg_expr_list
    : assignment_expr
    | arg_expr_list ',' assignment_expr
    ;

primary_expr
    : ID
    | BOOLEAN
        { $$ = ($1 === 'true' ? true : false); }
    | CONSTANT
        { $$ = parseFloat($1); }
    | STRING_LITERAL
    | '(' expression ')'
        { $$ = $2; }
    ;

action
    : multiplicative_expr
    | block
    ;

assignment_expr
    : sequence_expr
    | sequence_expr '=' assignment_expr
        { $$ = ['assign', $1, $3]; }
    ;

expression
    : assignment_expr
    ;

connector
    : '->'
    | '>>'
    | '~'
    ;