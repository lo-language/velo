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

ASYNC   : 'async'|'@';
AWAIT   : 'await';

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
    | expr op=('='|'+='|'-='|'*='|'/='|'%=') expr ';'       # assignment
    | expr op=('++'|'--') ';'                               # incDec
    | conditional                                           # condStmt
    | expr op=('+>'|'<+') expr ';'                          # push
    | expr '(' exprList? ')' ';'                            # syncRequest   // this permits foo(); which would otherwise be caught by sendMessage and wouldn't do what people expect
    | 'on' expr sink ';'                                    # subscribe
    | ASYNC? expr ('<<' '(' exprList? ')')? handlers? ';'   # sendMessage
    | 'while' expr block                                    # iteration
    | 'scan' expr expr                                      # scan
    ;

definition
    : ID ('is'|'are') expr ';'
    ;

handlers
    : replyHandler
    | failHandler
    | replyHandler failHandler
    ;

replyHandler
    : sink
    ;

failHandler
    : 'on' 'fail' sink
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

// an expression is one of two types: nominal (l-value or r-value) or operational (l-value or r-value)
// TODO factor out l-values
expr
    : expr '(' exprList? ')'                                    # syncCall  // blocking request. the value of the expr is the *return value*
    | ASYNC expr '(' exprList? ')'                              # asyncCall // non-blocking request. the value of the expr is a *future*
    | '#' expr                                                  # cardinality
    | expr '[' expr ']'                                         # subscript     // lvalue
    | expr '[' expr '..' expr? ']'                              # slice
    | expr '.' ID                                               # select        // lvalue
    | expr op=('exists'|'defined'|'undefined')                  # existence
    | 'not' expr                                                # negation
    | 'bytes' expr                                              # bytes
    | expr op=('*'|'/'|'%') expr                                # mulDiv
    | expr op=('+'|'-') expr                                    # addSub
    | expr op=('<'|'>'|'<='|'>='|'=='|'!=') expr                # compare
    | expr op=('and'|'or') expr                                 # logical
    | expr ('has'|'contains') expr                              # membership // not sure where this guy should go, precedence-wise
    | '(' expr ')'                                              # wrap
    | '`' expr '`'                                              # stringify
    | '(' ID (',' ID)+ ')'                                      # destructure   // lvalue
    | INTER_BEGIN interpolated INTER_END                        # mixedString
    | literal                                                   # literalExpr
    | expr '?' expr ':' expr                                    # condExpr      // we want this before concat
    | expr '><' expr                                            # concat
    | ID? '::' ID                                               # moduleRef
    | ID                                                        # id            // lvalue
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
