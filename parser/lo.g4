grammar lo;

WS              : [ \t\r\n]+ -> skip ;
LINE_COMMENT    : '//' .*? '\r'? ('\n'|EOF) -> skip ; // thanks, BCPL!
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
INTER_BEGIN : '"' (ESC|~[`"])* '`' {this.text = this.text.slice(1, -1); this.inString = true;} ;
INTER_MID   : {this.inString}? '`' (ESC|~[`"])* '`' {this.text = this.text.slice(1, -1);} ;
INTER_END   : '`' (ESC|~[`"])* '"' {this.text = this.text.slice(1, -1); this.inString = false;} ;

// should a module just be a record def?
// but records normally can't refer to their own parts...

// should module definitions be captured as a linked list like statements? they are statements, after all

module
    : definition+ EOF   // had alias* at beginning
    ;

// declarative, not imperative
//alias
//    : 'alias' modref 'to' ID ';'
//    ;

//modref
//    : ID
//    | modref ':' ID
//    ;

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
    | expr op=('+>'|'<+') expr ';'                          # push
    | expr '(' exprList? ')' handlers                       # syncRequest
    | '@' expr '(' exprList? ')' handlers                   # asyncRequest
    | 'on' expr sink ';'                                    # subscribe
    | expr '>>' expr ';'                                    # send  // fire-and-forget to be clear and prevent us from using @syntax; is NOT a request, note that it is a statement, not an expression; precludes reply. could reuse -> here instead
    | 'while' expr block                                    # iteration
    | 'scan' expr expr                                      # scan
    ;

definition
    : ID ('is'|'are') expr ';'
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
// all but = should be considered combined operators instead of assignments
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
    | expr ('has'|'contains') expr                                           # membership // not sure where this guy should go, precedence-wise
    | expr '?' expr ':' expr                                    # condExpr
    | expr '><' expr                                            # concat
    | '(' expr ')'                                              # wrap
    | '`' expr '`'                                              # stringify
    | expr '[' expr ']'                                         # subscript
    | expr '[' expr '..' expr? ']'                              # slice
    | expr '.' ID                                               # select
    | '(' ID (',' ID)+ ')'                                      # destructure
    | INTER_BEGIN interpolated INTER_END                        # dynastring
    | literal                                                   # literalExpr
    | ID? '::' ID                                               # moduleRef
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
    | '(' fieldList ')'                         # record // form? compound? composite? frame?
    | '{' (sep=PAIR_SEP|exprList|pairList)? '}' # set
    | sink                                      # handler
    | '<->' procedure                           # service
    | '-<' paramList?                           # event
    ;

sink
    : '->' procedure
    ;

procedure
    : paramList? block
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
