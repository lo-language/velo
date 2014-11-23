%lex

%s comment
%x indent

digit                       [0-9]
number                      {digit}+("."{digit}+)?\b
id                          [_a-zA-Z][-_a-zA-Z0-9]*

%%

"//".*                  /* line comment */
"/*"                    this.begin("comment");
<comment><<EOF>>        throw new Error("unclosed block comment");
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
\"[^\"]*\"              yytext = yytext.substr(1, yyleng-2); return 'STRING';
"["                     return '['
"]"                     return ']'
"("                     return '('
")"                     return ')'
"{"                     return '{'
"}"                     return '}'
","                     return ','
":"                     return ':'
";"                     return ';'
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
    util = require('util');
%}

/* enable EBNF grammar syntax */
%ebnf

%options token-stack

%left '+' '-'
%left '*' '/' '%'

%%

////////////////////////////////////////////////////////////////////////////////
// STRUCTURE
// we only want () at the end of a statement
// no general expr statements
// only foo() is both an expr and a statement

program
    : stmt* EOF -> console.log(util.inspect($1, {depth: null, colors: true}))
    ;

stmt
    : request ';'
    ;

literal
    : BOOLEAN -> $1 == 'true'
    | NUMBER -> parseFloat($1)
    | STRING -> '"' + $1 + '"';
    | '[' (expr ',')* expr? ']' -> ["list", $2 ? $2.concat($3): $3]
    | '{' (dyad ',')* dyad? '}' -> ["set", $2 ? $2.concat($3): $3]
    ;

dyad
    : expr
    | literal ':' expr -> ["dyad", $1, $3]
    ;

atom
    : ID -> ["ID", $1];
    | literal
    | atom '[' expr ']' -> ["subscript", $1, $3]
    | atom '.' ID -> ["access", $1, $3]
    | '(' expr ')'
    | request
    ;

request
    : atom '(' (expr ',')* expr? ')' -> ["request", $1, $4]
    ;

expr
    : atom
    | expr '+' expr
    | expr '-' expr
    | expr '*' expr
    | expr '/' expr
    | expr '%' expr
    ;
