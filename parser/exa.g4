grammar exa;

// could *start* in newline mode
// when we find indent in newline mode
// scan each line, when we find non-ws
// if we find whitespace,

//NEWLINE         : '\r'? '\n' -> pushMode(newline);

//mode newline;

WS              : [ \t\r\n]+ -> skip ;
LINE_COMMENT    : '//' .*? '\r'? '\n' -> skip ; // from BCPL!
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

STRING      : '"' (ESC|~[`"])* '"' {this.text = this.text.slice(1, -1);} ;
INTER_BEGIN : '"' (ESC|~[`"])* '`' {this.text = this.text.slice(1, -1);} ;
INTER_MID   : '`' (ESC|~[`"])* '`' {this.text = this.text.slice(1, -1);} ;
INTER_END   : '`' (ESC|~[`"])* '"' {this.text = this.text.slice(1, -1);} ;

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
    : 'receive' ID (',' ID)* ';'                            # receive
    | ID 'is' literal ';'                                   # constant
    | 'distinguish' ID (','? ID)+ ';'                       # dimension
    | channel=('reply'|'fail'|'substitute') exprList ';'    # response
    | expr assignment_op expr ';'                           # assignment
    | expr op=('++'|'--') ';'                               # incDec
    | expr '->' expr ';'                                    # splice
    | conditional                                           # condStmt
    | 'while' expr block                                    # iteration
    | 'skip' ';'                                            # skip
    | expr ';'                                              # exprStmt
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

// might want to refactor this
conditional
    : 'if' expr block                       # ifOnly
    | 'if' expr block 'else' block          # ifElse
    | 'if' expr block 'else' conditional    # nestedIf
    ;

// we could alternately go the C way and make a block a kind of statement
block
    : BEGIN statement_list END
    ;

expr
    : expr '(' exprList? ')' ('catch' block)?                           # call
    | '*' expr '(' exprList? ')' (t='then' block)? (c='catch' block)?   # dispatch
    | '#' expr                                                          # measure
    | 'not' expr                                                        # inverse
    | expr op=('*'|'/'|'%') expr                                        # mulDiv
    | expr op=('+'|'-') expr                                            # addSub
    | expr op=('<'|'>'|'<='|'>='|'=='|'!=') expr                        # compare
    | expr op=('and'|'or') expr                                         # logical
    | expr 'in' expr                                                    # membership // not sure where this guy should go, precedence-wise
    | '(' expr ')'                                                      # wrap
    | expr '[' expr ']'                                                 # subscript
    | expr '[' expr? ':' expr? ']'                                      # slice
    | expr '{' expr '}'                                                 # extraction
    | expr '{' expr? ':' expr? '}'                                      # excision
    | expr '.' ID                                                       # select
    | '(' ID (',' ID)+ ')'                                              # destructure
    | INTER_BEGIN interpolated INTER_END                                # dynastring
    | literal                                                           # litExpr
    | ID                                                                # id
    ;

interpolated
    : expr
    | expr INTER_MID interpolated
    ;

exprList
    : expr (',' expr)*
    ;

// literals

literal
    : 'nil'                                     # nil
    | BOOL                                      # bool
    | NUMBER                                    # number
    | STRING                                    # string
    | MODREF                                    # modref
    | 'service' block                           # service
    | '[' (colon=':'|exprList|pairList)? ']'    # collection
    | '{' field (',' field)* '}'                # record
    ;

field
    : ID ':' expr
    ;

pairList
    : pair (',' pair)*
    ;

pair
    : expr ':' expr
    ;