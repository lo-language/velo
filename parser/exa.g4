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

// would a colon after references improve readability?
// or should there be a colon between the ID and the modref?
references
    : (ID MODREF)+ // should this not be an ID? maybe a 'label' instead?
    ;

// we do this the old-fashioned way because that's what the compiler wants
statementList
    : statement
    | statement statementList
    ;

statement
    : definition                                            # defStmt
    | channel=('reply'|'fail'|'substitute') exprList? ';'   # response
    | expr assignment_op expr ';'                           # assignment
    | expr op=('++'|'--') ';'                               # incDec
    | conditional                                           # condStmt
    | expr '(' exprList? ')' handlers                       # syncRequest
    | '@' expr '(' exprList? ')' handlers                   # asyncRequest
    | expr '>>' expr ';'                                    # send  // fire-and-forget to be clear and prevent us from using @syntax; is NOT a request, note that it is a statement, not an expression; precludes reply. could reuse -> here instead
    | 'while' expr block                                    # iteration
    | 'scan' expr expr                                      # scan
    ;

definition
    : ID 'is' literal ';'                                   # constant
    ;

handlers
    : ';'
    | replyHandler
    | failHandler
    | replyHandler failHandler
    ;

replyHandler
    : sink
    ;

failHandler
    : 'on' 'fail' sink
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
    : expr '(' exprList? ')'                                    # syncCall  // blocking request. the value of the expr is the *return value*
    | '@' expr '(' exprList? ')'                                # asyncCall // non-blocking request. the value of the expr is a *future*
    | '#' expr                                                  # cardinality
    | 'not' expr                                                # negation
    | 'bytes' expr                                              # bytes
    | expr op=('*'|'/'|'%') expr                                # mulDiv
    | expr op=('+'|'-') expr                                    # addSub
    | expr op=('<'|'>'|'<='|'>='|'=='|'!=') expr                # compare
    | expr op=('and'|'or') expr                                 # logical
    | expr 'in' expr                                            # membership // not sure where this guy should go, precedence-wise
    | expr '><' expr                                            # concat
    | '(' expr ')'                                              # wrap
    | expr '[' expr ']'                                         # subscript
    | expr '[' expr '..' expr? ']'                              # slice
    | 'map' expr expr                                           # map
    | expr '.' ID                                               # field
    | '(' ID (',' ID)+ ')'                                      # destructure
    | INTER_BEGIN interpolated INTER_END                        # dynastring
    | literal                                                   # litExpr
    | ID ':' ID                                                 # externalId
    | ID                                                        # id
    ;

interpolated
    : expr
    | expr INTER_MID interpolated
    ;

exprList
    : expr (',' expr)* ','?
    ;

// literals

// are arrays and forms immutable?
literal
    : 'nil'                                     # nil
    | BOOL                                      # bool
    | NUMBER                                    # number
    | STRING                                    # string
    | '[' exprList? ']'                         # array
    | '[' fieldList ']'                         # form // record? compound? composite? frame?
    | '{' (sep=PAIR_SEP|exprList|pairList)? '}' # set
    | sink                                      # handler
    | '<->' procedure                           # service
    | '-<' paramList?                           # event
    | 'on' expr sink                            # subscribe  // maybe not a literal
    ;

sink
    : '->' procedure
    ;

procedure
    : paramList? block
    | ID (',' ID)*  // I'm not really sure what I was going for here -- maybe direct assignment sugar for setters?
    ;

paramList
    : '(' ID (',' ID)* ')'
    ;

fieldList
    : (ID FIELD_SEP expr ','?)+
    ;

// todo test dangling commas -- maybe just make commas optional?
pairList
    : (expr PAIR_SEP expr ','?)+
    ;

//sink
//    : procedure
//    | 'into' expr
//    ;