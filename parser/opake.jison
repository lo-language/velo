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
"break"                 return 'BREAK'
"action"                return 'ACTION'
"true"|"false"          return 'BOOLEAN'
[a-zA-Z][a-zA-Z0-9]*    return 'NAME'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

/* enable EBNF grammar syntax */
%ebnf

%%

////////////////////////////////////////////////////////////////////////////////
// STRUCTURE

module
    : action_definition EOF
        { $$ = $1; return $$; }
    ;

action_definition
    : ACTION block -> {action: [], statements: $2}
    | ACTION '(' (NAME ',')* NAME? ')' block -> {action: $4 ? $3.concat([$4]) : $3, statements: $6}
    ;

block
    : '{' statement* '}' -> $2
    ;

statement
    : NAME IS literal -> ['define', $1, $3]
    | identifier '=' expression -> {op: 'assign', left: $1, right: $3}
    | selection_statement
    | sequence_statement
    ;

selection_statement
    : IF '(' expression ')' block -> ['if', $3, $5]
    | IF '(' expression ')' block ELSE block -> ['if', $3, $5, $7]
    | IF '(' expression ')' block ELSE selection_statement -> ['if', $3, $5, $7]
    ;

////////////////////////////////////////////////////////////////////////////////
// EXPRESSIONS
// C expression syntax, basically

literal
    : BOOLEAN -> ($1 === 'true' ? true : false)
    | CONSTANT -> parseFloat($1)
    | STRING_LITERAL -> ['str', $1]
    ;

identifier
    : NAME -> ['id', $1]
    | identifier '[' expression ']' -> ['select', $1, $3]
    | identifier '.' NAME -> ['select', $1, $3]
    ;

primary_expression
    : literal
	| identifier
	| action_definition
    | '(' expression ')' -> $2
    ;

unary_expression
    : primary_expression
    | '#' primary_expression -> ['card', $2]
    ;

multiplicative_expression
    : unary_expression
    | multiplicative_expression '*' primary_expression -> {op: 'mult', left: $1, right: $3}
    | multiplicative_expression '/' primary_expression -> {op: 'div', left: $1, right: $3}
    | multiplicative_expression '%' primary_expression -> {op: 'mod', left: $1, right: $3}
    ;

additive_expression
    : multiplicative_expression
    | additive_expression '+' multiplicative_expression -> {op: 'add', left: $1, right: $3}
    | additive_expression '-' multiplicative_expression -> {op: 'sub', left: $1, right: $3}
    ;

relational_expression
    : additive_expression
    | relational_expression '<' additive_expression -> ['lt', $1, $3]
    | relational_expression '>' additive_expression -> ['gt', $1, $3]
    | relational_expression '<=' additive_expression -> ['le', $1, $3]
    | relational_expression '>=' additive_expression -> ['ge', $1, $3]
    ;

equality_expression
    : relational_expression
    | equality_expression '==' relational_expression -> ['equality', $1, $3]
    | equality_expression '!=' relational_expression -> ['inequality', $1, $3]
    ;

and_expression
	: equality_expression
	| and_expression '&' equality_expression -> ['bitwise_and', $1, $3]
	;

exclusive_or_expression
	: and_expression
	| exclusive_or_expression '^' and_expression -> ['xor', $1, $3]
	;

inclusive_or_expression
	: exclusive_or_expression
	| inclusive_or_expression '|' exclusive_or_expression -> ['bitwise_or', $1, $3]
	;

logical_and_expression
	: inclusive_or_expression
	| logical_and_expression '&&' inclusive_or_expression -> ['and', $1, $3]
	;

logical_or_expression
	: logical_and_expression
	| logical_or_expression '||' logical_and_expression -> ['or', $1, $3]
	;

conditional_expression
	: logical_or_expression
	| logical_or_expression '?' expression ':' conditional_expression -> ['conditional', $1, $3, $5]
	;

expression
    : conditional_expression
    ;

////////////////////////////////////////////////////////////////////////////////
// SEQUENCES
// invocations are statements, not expressions
// what about statement ~ statement expressions? e.g. 2/0 ~ log.write(err)

invocation
    : identifier '(' (expression ',')* expression? ')' -> {invoke: $1, args: $4 ? $3.concat([$4]) : $3}
    ;

sequence_statement
    : invocation
    | expression connector sink -> [$2, $1, $3]
    | sequence_statement connector sink -> [$2, $1, $3]
    ;

sink
    : identifier
    | '(' (NAME ',')* NAME? ')' block -> {action: ($3 ? $2.concat([$3]) : $2), statements: $5}
    | block -> {'action': [], statements: $1}
    ;

connector
    : '>~'
    | '->'
    | '=>'
    | '>>'
    | '>|'
    ;