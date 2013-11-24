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
    : ACTION '(' ')' block
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
    ;

sequence_statement
    : invocation
    | expression connector sink
    | sequence_statement connector sink
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

assignment_expression
    : equality_expression
    | equality_expression '=' assignment_expression
        { $$ = ['assign', $1, $3]; }
    ;

literal
    : BOOLEAN
        { $$ = ($1 === 'true' ? true : false); }
    | CONSTANT
        { $$ = parseFloat($1); }
    | STRING_LITERAL
    ;

connector
    : '->'
    | '>>'
    | '~'
    ;

// C syntax, mostly

equality_expression
    : relational_expression
    | equality_expression '==' relational_expression
        { $$ = ['equality', $1, $3]; }
    | equality_expression '!=' relational_expression
        { $$ = ['inequality', $1, $3]; }
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

additive_expression
    : multiplicative_expression
    | additive_expression '+' multiplicative_expression
        { $$ = ['add', $1, $3]; }
    | additive_expression '-' multiplicative_expression
        { $$ = ['sub', $1, $3]; }
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

unary_expression
    : primary_expression
    | '#' primary_expression
        { $$ = ['card', $2]; }
    ;

primary_expression
    : identifier
    | literal
    | action_definition
    | '(' expression ')'
        { $$ = $2; }
    ;