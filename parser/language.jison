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
"="                     return '='
"+"                     return '+'
"-"                     return '-'
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
"return"                return 'RETURN'
{id}                    return 'NAME'
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
    : RECEIVE NAME (',' NAME)* -> ['receive', $3 ? $3.concat([$2]): [$2]]
    | NAME IS literal -> ['define', $1, $3]
    | identifier '=' expression -> new ast.Operator('assign', $1, $3)
    | selection_statement
    | sequence_statement
    | result_statement
    | jump_statement
    ;

selection_statement
    : IF expression block -> new ast.Selection($2, $3)
    | IF expression block ELSE block -> new ast.Selection($2, $3, $5)
    | IF expression block ELSE selection_statement -> new ast.Selection($2, $3, $5)
    ;

// ok, this was a huge battle - making expression optional made the grammar ambiguous
// didn't want to fix by adding semicolons after statements
// didn't want to make expression required - actually wanted to support N expressions
// ended up making results look like invocations - which I like because they pretty much
// are invocations - sending messages
// this makes it clear (I think) that fail/return are sending messages - but since they
// aren't syntactically true invocations, you can't expect a result back
result_statement
    : RETURN '(' (expression ',')* expression? ')' -> new ast.Result(true, $4 ? $3.concat([$4]) : $3)
    | FAIL '(' (expression ',')* expression? ')' -> new ast.Result(false, $4 ? $3.concat([$4]) : $3)
    ;

jump_statement
    : SKIP -> new ast.Jump($1)
    ;

////////////////////////////////////////////////////////////////////////////////
// EXPRESSIONS
// C expression syntax, basically

literal
    : BOOLEAN -> new ast.Literal($1 === 'true' ? true : false)
    | NUMBER -> new ast.Literal(parseFloat($1))
    | STRING_LITERAL -> new ast.Literal($1)
    ;

identifier
    : NAME -> new ast.Identifier($1)
    | identifier '[' expression ']' -> new ast.Identifier($1, $3)
    | identifier '.' NAME -> new ast.Identifier($1, $3)
    ;

primary_expression
    : literal
	| identifier
	| block -> new ast.Action([], $1)
    | '(' expression ')' -> $2
    ;

unary_expression
    : primary_expression
    | '#' primary_expression -> new ast.Operator('card', $2)
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
    | relational_expression '<' additive_expression -> new ast.Relational('lt', $1, $3)
    | relational_expression '>' additive_expression -> new ast.Relational('gt', $1, $3)
    | relational_expression '<=' additive_expression -> new ast.Relational('le', $1, $3)
    | relational_expression '>=' additive_expression -> new ast.Relational('ge', $1, $3)
    ;

equality_expression
    : relational_expression
    | equality_expression '==' relational_expression -> new ast.Relational('equality', $1, $3)
    | equality_expression '!=' relational_expression -> new ast.Relational('inequality', $1, $3)
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
    | expression '..' conditional_expression
    ;

////////////////////////////////////////////////////////////////////////////////
// SEQUENCES
// invocations are statements, not expressions
// what about statement ~ statement expressions? e.g. 2/0 ~ log.write(err)

invocation
    : identifier '(' (expression ',')* expression? ')' -> new ast.Invocation($1, $4 ? $3.concat([$4]) : $3)
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