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
PAIR_SEP    : '=>';
FIELD_SEP   : ':';

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

module
    : references? definition+ EOF
    ;

references
    : 'references' (ID MODREF)+ // should this not be an ID? maybe a 'label' instead?
    ;

// we do this the old-fashioned way because that's what the compiler wants
statementList
    : statement
    | statement statementList
    ;

statement
    : definition                                            # defStmt
    | 'receive' ID (',' ID)* ';'                            # receive
    | channel=('reply'|'fail'|'substitute') exprList ';'    # response
    | expr assignment_op expr ';'                           # assignment
    | expr op=('++'|'--') ';'                               # incDec
    | expr '->' expr ';'                                    # splice
    | conditional                                           # condStmt
    | 'while' expr block                                    # iteration
    | expr ';'                                              # exprStmt
    ;

definition
    : ID 'is' literal ';'                                   # constant
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
    : BEGIN statementList? END
    ;

expr
    : expr '(' exprList? ')' failHandler?                       # call
    | '*' expr '(' exprList? ')' replyHandler? failHandler?     # dispatch
    | '#' expr                                                  # measure
    | 'not' expr                                                # negation
    | 'bytes' expr                                              # bytes
    | expr op=('*'|'/'|'%') expr                                # mulDiv
    | expr op=('+'|'-') expr                                    # addSub
    | expr op=('<'|'>'|'<='|'>='|'=='|'!=') expr                # compare
    | expr op=('and'|'or') expr                                 # logical
    | expr 'in' expr                                            # membership // not sure where this guy should go, precedence-wise
    | '(' expr ')'                                              # wrap
    | expr '[' cut='cut'? expr ']'                              # subscript // retrieval? access?
    | expr '[' cut='cut'? expr '..' expr ']'                    # range
    | expr '.' ID                                               # field
    | '(' ID (',' ID)+ ')'                                      # destructure
    | INTER_BEGIN interpolated INTER_END                        # dynastring
    | literal                                                   # litExpr
    | ID ':' ID                                                 # externalId
    | ID                                                        # id
    ;

replyHandler
    : 'then' block
    ;

failHandler
    : 'catch' block
    ;

interpolated
    : expr
    | expr INTER_MID interpolated
    ;

exprList
    : expr (',' expr)* ','?
    ;

// literals

literal
    : 'nil'                                     # nil
    | BOOL                                      # bool
    | NUMBER                                    # number
    | STRING                                    # string
    | 'service' block                           # service
    | '[' exprList? ']'                         # array
    | '{' (sep=PAIR_SEP|exprList|pairList)? '}' # set
    | '(' (exprList|fieldList)? ')'             # frame
    ;

fieldList
    : (ID FIELD_SEP expr ','?)+
    ;

// todo test dangling commas -- maybe just make commas optional?
pairList
    : (expr PAIR_SEP expr ','?)+
    ;
