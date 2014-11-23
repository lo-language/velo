%lex

%s comment
%x indent

digit                       [0-9]
number                      {digit}+("."{digit}+)?\b
id                          [_a-zA-Z][-_a-zA-Z0-9]*

%%

"//".*                  /* line comment */
"/*"                    this.begin("comment");
<comment>"*/"           this.popState();
<comment>.              /* skip comment */
\s*<<EOF>>              %{

    var tokens = [];

    while (indents.length > 1) {
        tokens.unshift('END');
        indents.shift();
    }

    tokens.unshift('EOF');
    return tokens;
				        %}
<INITIAL>\n+            this.begin("indent");
<indent>\s*\n+          /* ignore blank lines */
<indent>\s*             %{

    // process indentation

    this.popState();

    if (yyleng > indents[0].length) {
        indents.unshift(yytext);
        return 'BEGIN';
    }

    if (yyleng < indents[0].length) {

        // todo throw on mismatch between indent and what we pop?

        var tokens = [];

        while (yyleng < indents[0].length) {

            indents.shift();
            tokens.push('END');
        }

        return tokens;
    }
                        %}
\s+                     /* ignore all other whitespace */
"true"|"false"          return 'BOOLEAN'
{number}                return 'NUMBER'
\".*\"                  yytext = yytext.substr(1, yyleng-2); return 'STRING';
"["                     return '['
"]"                     return ']'
"("                     return '('
")"                     return ')'
","                     return ','
"."                     return '.'
"=="                    return '=='
"!="                    return '!='
"<"                     return '<'
">"                     return '>'
"<="                    return '<='
">="                    return '>='
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
"="                     return '='
"++"                    return '++'
"--"                    return '--'
"?"                     return '?'
"#"                     return '#'
"if"                    return 'IF'
"else"                  return 'ELSE'
"receive"               return 'RECEIVE'
"skip"                  return 'SKIP'
"break"                 return 'BREAK'
{id}                    return 'ID'
.                       return 'INVALID'

/lex

%{
    indents = [''];

    ast = require('../ast');
%}

/* enable EBNF grammar syntax */
%ebnf

%options token-stack

%%

////////////////////////////////////////////////////////////////////////////////
// STRUCTURE

literal
    : BOOLEAN
    | NUMBER
    | STRING
    | set
    ;

set
    : '{' expr* '}'
    ;

expr
    : literal
    ;

/*
module
    : statement* EOF
        { $$ = $1; return $$; }
    ;

block
    : BEGIN statement* END -> $2
    ;

////////////////////////////////////////////////////////////////////////////////
// STATEMENTS

statement
    : RECEIVE ID (',' ID)* -> new ast.Receive($3 ? $3.concat([$2]): [$2])
    | assignment_statement
    | selection_statement
    | SKIP -> new ast.Jump($1)
    ;

assignment_statement
	: assignable '=' expression -> new ast.Operator($2, $1, $3)
	;

selection_statement
    : IF expression block -> new ast.Selection($2, $3)
    | IF expression block ELSE block -> new ast.Selection($2, $3, $5)
    | IF expression block ELSE selection_statement -> new ast.Selection($2, $3, $5)
    ;

////////////////////////////////////////////////////////////////////////////////
// EXPRESSIONS
// C expression syntax, basically
// have separate writable and assignable?

primary_expression
    : assignable
    | literal
	| block -> new ast.Action($1)
    | '(' expression ')' -> $2
    ;

assignable
    : ID
    | assignable '[' expression ']'
    | assignable '.' ID
    ;

literal
    : NUMBER -> new ast.Literal(parseFloat($1))
    | TRUE -> new ast.Literal(true)
    | FALSE -> new ast.Literal(false)
    | STRING_LITERAL -> new ast.Literal($1)
    ;

postfix_expr
    : primary_expression
	| postfix_expr '(' (expression ',')* expression? ')' -> new ast.Operator('send', $1, $4 ? $3.concat([$4]) : $3)
    ;

expression
    : postfix_expr
    | postfix_expr op expression -> new ast.Operator($2, $1, $3)
    ;

op
    : cmp
    | arith
    ;

cmp
   : '=='
   | "!="
   | "<"
   | ">"
   | "<="
   | ">="
   ;

arith
    : "+"
    | "-"
    | "*"
    | "/"
    | "%"
    ;
    */