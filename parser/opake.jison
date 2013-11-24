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
    ;

action_definition
    : ACTION '(' ')' block
    | ACTION '(' name_list ')' block
    ;

name_list
    : NAME
    | name_list ',' NAME
    ;

block
    : '{' '}'
    | '{' statement_list '}'
    ;

statement_list
    : statement
    | statement_list statement
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
    ;

sink
    : identifier
    | action_definition
    ;

identifier
    : NAME
    | identifier '[' expression ']'
    | identifier '.' NAME
    ;

expression
    : assignment_expression
    ;

invocation
    : identifier '(' ')'
    | identifier '(' argument_expression_list ')'
    ;

argument_expression_list
    : assignment_expression
    | argument_expression_list ',' assignment_expression
    ;

assignment_expression
    : primary_expression
    | identifier '=' expression
    ;

primary_expression
    : identifier
    | literal
    | '(' expression ')'
        { $$ = $2; }
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