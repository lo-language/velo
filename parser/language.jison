%lex

%s comment
%x indent

digit                       [0-9]
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
[0-9]+("."[0-9]+)?\b    return 'NUMBER'
\".*\"                  yytext = yytext.substr(1, yyleng-2); return 'STRING_LITERAL';
\'.*\'                  yytext = yytext.substr(1, yyleng-2); return 'STRING_LITERAL';
"["                     return '['
"]"                     return ']'
"("                     return '('
")"                     return ')'
","                     return ','
".."                    return '..'
"."                     return '.'
"=="                    return '=='
"!="                    return '!='
"<="                    return '<='
">="                    return '>='
":"                     return ':'
"||"                    return '||'
"&&"                    return '&&'
"&"                     return '&'
"|"                     return '|'
"^"                     return '^'
">~"                    return '>~'
"->"                    return '->'
">>"                    return '>>'
"=>"                    return '=>'
">|"                    return '>|'
"<"                     return '<'
">"                     return '>'
"="                     return 'ASSIGN'
"+"                     return '+'
"-"                     return '-'
"++"                    return 'INC_OP'
"--"                    return 'DEC_OP'
"*"                     return '*'
"/"                     return '/'
"%"                     return '%'
"?"                     return '?'
"#"                     return '#'
"receive"               return 'RECEIVE'
"if"                    return 'IF'
"else"                  return 'ELSE'
"fail"                  return 'FAIL'
"is"                    return 'IS'
"true"|"false"          return 'BOOLEAN'
"pass"                  return 'PASS'   // do we need pass if we have skip?
"skip"                  return 'SKIP'
"break"                 return 'BREAK'
"reply"                 return 'REPLY' // since return is either intransitive verb (which doesn't make sense for us) or giving back something (doesn't make sense either)
{id}                    return 'IDENTIFIER'
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

module
    : statement* EOF
        { $$ = $1; return $$; }
    ;

block
    : BEGIN PASS END -> []
    | BEGIN statement* END -> $2
    ;

////////////////////////////////////////////////////////////////////////////////
// STATEMENTS

statement
    : RECEIVE IDENTIFIER (',' IDENTIFIER)* -> new ast.Receive($3 ? $3.concat([$2]): [$2])
    | IDENTIFIER IS literal -> ['define', $1, $3]
    | assignment_statement
    | selection_statement
    | sequence_statement
    | result_statement
    | jump_statement
    ;

assignment_statement
	: postfix_expression assignment_operator expression -> new ast.Operator($2, $1, $3)
	;

assignment_operator
	: ASSIGN -> 'assign'
	| MUL_ASSIGN
	| DIV_ASSIGN
	| MOD_ASSIGN
	| ADD_ASSIGN
	| SUB_ASSIGN
	;

selection_statement
    : IF expression block -> new ast.Selection($2, $3)
    | IF expression block ELSE block -> new ast.Selection($2, $3, $5)
    | IF expression block ELSE selection_statement -> new ast.Selection($2, $3, $5)
    ;

result_statement
    : REPLY '(' (expression ',')* expression? ')' -> new ast.Result(true, $4 ? $3.concat([$4]) : $3)
    | FAIL '(' (expression ',')* expression? ')' -> new ast.Result(false, $4 ? $3.concat([$4]) : $3)
    ;

jump_statement
    : SKIP -> new ast.Jump($1)
    ;

////////////////////////////////////////////////////////////////////////////////
// EXPRESSIONS
// C expression syntax, basically

primary_expression
    : IDENTIFIER -> new ast.Identifier($1, @1)
    | literal
	| block -> new ast.Action($1)
    | '(' expression ')' -> $2
    ;

literal
    : BOOLEAN -> new ast.Literal($1 === 'true' ? true : false)
    | NUMBER -> new ast.Literal(parseFloat($1))
    | STRING_LITERAL -> new ast.Literal($1)
    ;

postfix_expression
	: primary_expression
	| postfix_expression '[' expression ']' -> new ast.Operator('subscript', $1, $3)
	| postfix_expression '(' (expression ',')* expression? ')' -> new ast.Operator('send', $1, $4 ? $3.concat([$4]) : $3)
	| postfix_expression '.' IDENTIFIER -> new ast.Operator('access', $1, $3)
	| postfix_expression INC_OP -> new ast.Operator('inc', $1)
	| postfix_expression DEC_OP -> new ast.Operator('dec', $1)
	;

unary_expression
    : postfix_expression
	| INC_OP unary_expression
	| DEC_OP unary_expression
	| unary_operator unary_expression -> new ast.Operator($1, $2)
    ;

unary_operator
	: '#'
	| '!'
	;

multiplicative_expression
    : unary_expression
    | multiplicative_expression '*' primary_expression -> new ast.Operator('mult', $1, $3)
    | multiplicative_expression '/' primary_expression -> new ast.Operator('div', $1, $3)
    | multiplicative_expression '%' primary_expression -> new ast.Operator('mod', $1, $3)
    ;

additive_expression
    : multiplicative_expression
    | additive_expression '+' multiplicative_expression -> new ast.Operator('add', $1, $3)
    | additive_expression '-' multiplicative_expression -> new ast.Operator('sub', $1, $3)
    ;

relational_expression
    : additive_expression
    | relational_expression '<' additive_expression -> new ast.Operator('lt', $1, $3)
    | relational_expression '>' additive_expression -> new ast.Operator('gt', $1, $3)
    | relational_expression '<=' additive_expression -> new ast.Operator('le', $1, $3)
    | relational_expression '>=' additive_expression -> new ast.Operator('ge', $1, $3)
    ;

equality_expression
    : relational_expression
    | equality_expression '==' relational_expression -> new ast.Operator('eq', $1, $3)
    | equality_expression '!=' relational_expression -> new ast.Operator('ne', $1, $3)
    ;

and_expression
	: equality_expression
	| and_expression '&' equality_expression -> new ast.Operator('bitwise_and', $1, $3)
	;

exclusive_or_expression
	: and_expression
	| exclusive_or_expression '^' and_expression -> new ast.Operator('xor', $1, $3)
	;

inclusive_or_expression
	: exclusive_or_expression
	| inclusive_or_expression '|' exclusive_or_expression -> new ast.Operator('bitwise_or', $1, $3)
	;

logical_and_expression
	: inclusive_or_expression
	| logical_and_expression '&&' inclusive_or_expression -> new ast.Operator('and', $1, $3)
	;

logical_or_expression
	: logical_and_expression
	| logical_or_expression '||' logical_and_expression -> new ast.Operator('or', $1, $3)
	;

conditional_expression
	: logical_or_expression
	| logical_or_expression '?' expression ':' conditional_expression -> new ast.Operator('conditional', $1, $3, $5)
	;

expression
    : conditional_expression
    | expression '..' conditional_expression // not sure where this guy should go, precedence-wise
    ;

////////////////////////////////////////////////////////////////////////////////
// SEQUENCES
// invocations are statements, not expressions
// what about statement ~ statement expressions? e.g. 2/0 ~ log.write(err)

//invocation
//    : identifier '(' (expression ',')* expression? ')' -> new ast.Invocation($1, $4 ? $3.concat([$4]) : $3)
//    ;

//sequence_statement
//    : invocation
//    | expression connector sink -> [$2, $1, $3]
//    | sequence_statement connector sink -> [$2, $1, $3]
//    ;

//sink
//    : identifier
//    | '(' (IDENTIFIER ',')* IDENTIFIER? ')' block -> {action: ($3 ? $2.concat([$3]) : $2), statements: $5}
//    | block -> {'action': [], statements: $1}
//    ;

connector
    : '>~'
    | '->'
    | '=>' // like 'receive' but for unpacking return messages
    | '>>'
    | '>|'
    ;