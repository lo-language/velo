%lex

%s comment

%%


"//".*                  /* line comment */
"/*"                    this.begin("comment");
<comment>"*/"           this.popState();
<comment>.              /* skip comment */
\s+                     /* skip whitespace */
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
":"                     return ':'
"=>"                    return '=>'
"->"                    return '->'
"~"                     return '~'
">>"                    return '>>'
"="                     return '='
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
'#'                     return '#'
'is'                    return 'IS'
'fail'                  return 'FAIL'
"break"                 return 'BREAK'
"true"|"false"          return 'BOOLEAN'
[a-zA-Z][a-zA-Z0-9]*    return 'ID'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%%

procedure
    : statement_list EOF
        { $$ = $1; return $$; }
    ;

statement_list
    : statement
        { $$ = [$1]; }
    | statement_list statement
        { $$ = $1; $$.push($2); }
    ;

statement
    : expression
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

select_expr
    : primary_expr
    | select_expr '[' expression ']'
        { $$ = ['select', $1, $3]; }
    | select_expr '.' ID
        { $$ = ['select', $1, $3]; }
    ;

prefix_expr
    : select_expr
    | '#' select_expr
        { $$ = ['count', $2]; }
    ;

expression
    : prefix_expr
    | prefix_expr '=' expression
        { $$ = ['assign', $1, $3]; }
    ;
