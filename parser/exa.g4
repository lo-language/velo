grammar exa;

// could *start* in newline mode
// when we find indent in newline mode
// scan each line, when we find non-ws
// if we find whitespace,

//NEWLINE         : '\r'? '\n' -> pushMode(newline);

//mode newline;

WS              : [ \t\r\n]+ -> skip ;
LINE_COMMENT    : '//' .*? '\r'? '\n' -> skip ; // BCPL
COMMENT         : '/*' .*? '*/' -> skip ;

fragment DIGIT  : '0'..'9' ;

NIL         : 'nil';
BOOL        : 'true'|'false';

NUMBER
    : '-'? INT '.' DIGIT+ EXP?
    | '-'? INT EXP
    | '-'? INT
    ;

fragment INT : '0' | [1-9] DIGIT* ;
fragment EXP : [Ee] [+\-]? INT ;

STRING          : '"' (ESC|.)*? '"';
fragment ESC    : '\\' [btnr"\\] ;

ID          : ID_LETTER (ID_LETTER | DIGIT)* ; // From C language fragment
ID_LETTER   : 'a'..'z'|'A'..'Z'|'_' ;
MODREF      : '<' ~[ \t\r\n]+ '>';


// todo allow modules to be records?
module
    : statement+
    ;

statement
    : 'receive' ID (',' ID)* ';'
    | ID 'is' literal ';'
    | 'distinguish' ID (',' ID)+ ';'
    | response ';'
    | assignment ';'
    | conditional
    | iteration
    | expr ';'
    ;

response
    : 'reply' exprList
    | 'fail' exprList
    | 'substitute' exprList
    ;

// assignments are statements, not expressions!
// todo multiple lvalues separated by commas for destructuring
assignment
    : lvalue assignment_op expr
    | lvalue '++'
    | lvalue '--'
    | expr '->' lvalue
    ;

// assignments are NOT expressions
// all but = should probably be considered edits instead of assignments
assignment_op
    : '='
    | '+='
    | '-='
    | '*='
    | '/='
    | '%='
    ;

conditional
    : 'if' expr block
    | 'if' expr block 'else' block
    | 'if' expr block 'else' conditional
    ;

iteration
    : 'while' expr block
    ;

block
    : '{' statement+ '}'
    ;

expr
    : expr '(' exprList? ')' ('catch' ':' block)?    // fn call
    | '@' expr '(' exprList? ')' ('then' ':' block)? ('catch' ':' block)?
    | '#' expr
    | 'not' expr
    | expr ('*'|'/'|'%') expr
    | expr ('+'|'-') expr
    | expr ('<'|'>'|'<='|'>='|'=='|'!=') expr
    | expr ('and'|'or') expr
    | expr 'in' expr
    | '(' expr ')'
    | literal
    | lvalue
    ;

exprList
    : expr (',' expr)*
    ;

lvalue
    : ID
    | lvalue '[' expr ']'
    | lvalue '[' expr? ':' expr? ']'    // slice
    | lvalue '{' expr '}'               // extraction
    | lvalue '{' expr? ':' expr? '}'    // excision
    | lvalue '.' ID
    | '(' lvalue (',' lvalue)+ ')'          // destructure
    ;

// literals

literal
    : 'nil'
    | BOOL
    | NUMBER
    | STRING
    | MODREF
    | 'service' ':' block
    | '[' list_items? ']'
    | '{' fieldList? '}'
    ;

fieldList
    : field (',' field)*
    ;

list_items
    : ':'
    | expr (',' expr)*
    | dyad (',' dyad)*
    ;

dyad
    : expr ':' expr
    ;

field
    : ID ':' expr
    ;