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
BEGIN           : '{' ;
END             : '}' ;

fragment DIGIT  : '0'..'9' ;
fragment INT    : '0' | [1-9] DIGIT* ;
fragment EXP    : [Ee] [+\-]? INT ;
fragment ESC    : '\\' [btnr"\\] ;

fragment ID_LETTER  : 'a'..'z'|'A'..'Z'|'_' ;

NIL         : 'nil';
BOOL        : 'true'|'false';

NUMBER
    : '-'? INT '.' DIGIT+ EXP?
    | '-'? INT EXP
    | '-'? INT
    ;

ID      : ID_LETTER (ID_LETTER | DIGIT)* ;
STRING  : '"' (ESC|.)*? '"' {this.text = this.text.slice(1, -1);} ;
MODREF  : '<' ~[ \t\r\n]+ '>' {this.text = this.text.slice(1, -1);} ;


// ??? allow modules to be records?
module
    : statement_list
    ;

// we do this the old-fashioned way because that's what the compiler wants
statement_list
    : statement
    | statement statement_list
    ;

statement
    : 'receive' ID (',' ID)* ';'        # receive
    | ID 'is' literal ';'               # constant
    | 'distinguish' ID (','? ID)+ ';'   # dimension
    | response ';'                      # responseStmt
    | lvalue assignment_op expr ';'     # assignment
    | lvalue op=('++'|'--') ';'         # incDec
    | expr '->' lvalue ';'              # splice
    | conditional                       # conditionalStmt
    | 'while' expr block                # iteration
    | expr ';'                          # exprStmt
    ;

response
    : 'reply' exprList
    | 'fail' exprList
    | 'substitute' exprList
    ;

// assignments are statements, not expressions!
// todo multiple lvalues separated by commas for destructuring

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

// we could alternately go the C way and make a block a kind of statement
block
    : BEGIN statement_list END
    ;

expr
    : expr '(' exprList? ')' ('catch' block)?                       # call
    | '*' expr '(' exprList? ')' ('then' block)? ('catch' block)?   # dispatch
    | '#' expr                                                      # measure
    | 'not' expr                                                    # inverse
    | expr op=('*'|'/'|'%') expr                                    # mulDiv
    | expr op=('+'|'-') expr                                        # addSub
    | expr op=('<'|'>'|'<='|'>='|'=='|'!=') expr                    # compare
    | expr op=('and'|'or') expr                                     # logical
    | expr 'in' expr                                                # membership // not sure where this guy should go, precedence-wise
    | '(' expr ')'                                                  # wrap
    | literal                                                       # litExpr
    | lvalue                                                        # valExpr
    ;

exprList
    : expr (',' expr)*
    ;

lvalue
    : ID                                # id
    | lvalue '[' expr ']'               # subscript
    | lvalue '[' expr? ':' expr? ']'    # slice
    | lvalue '{' expr '}'               # extraction
    | lvalue '{' expr? ':' expr? '}'    # excision
    | lvalue '.' ID                     # select
    | '(' lvalue (',' lvalue)+ ')'      # destructure
    ;

// literals

literal
    : 'nil'                 # nil
    | BOOL                  # bool
    | NUMBER                # number
    | STRING                # string
    | MODREF                # modref
    | 'service' block       # service
    | '[' list_items? ']'   # list
    | '{' fieldList? '}'    # record
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