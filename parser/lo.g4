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
FIELD_SEP   : ':';  // IDEA: use 'is' here?? that might make modules and records consistent

NUMBER
    : '-'? INT '.' DIGIT+ EXP?
    | '-'? INT EXP
    | '-'? INT
    ;

ASYNC   : 'async'|'@';

ID      : ID_LETTER (ID_LETTER | DIGIT)* ;

STRING      : '"' (ESC|~[`"])* '"' {this.text = this.text.slice(1, -1);} ;
INTER_BEGIN : '"' (ESC|~[`"])* '`' {this.text = this.text.slice(1, -1); this.inString = true;} ;
INTER_MID   : {this.inString}? '`' (ESC|~[`"])* '`' {this.text = this.text.slice(1, -1);} ;
INTER_END   : '`' (ESC|~[`"])* '"' {this.text = this.text.slice(1, -1); this.inString = false;} ;


// should a module just be a record def?
// but records normally can't refer to their own parts...

// note: we only have deps separate from defs because the compiler compiles tails before heads
// (so we can't swap in module refs)
module
    : dependency* definition+ EOF
    ;

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
    | 'on' expr '->' proc ';'                               # subscribe
    | ASYNC? expr ('<-' '(' exprList ')')? (';' | handlers) # invocation
    | ASYNC? expr (':' exprList)? (';' | handlers)          # invocation2   // alternate style for a man who can't make up his mind
    | 'while' expr block                                    # iteration
    | 'scan' expr '->' proc                                 # scan  // proc is not a replyHandler because of different semantics!
    ;

definition
    : ID ('is'|'are') expr ';'
    ;

dependency
    : ID 'is' 'module' locator? ';'
    ;

locator
    : ID ('::' ID)*
    ;

handlers
    : replyHandler
    | failHandler
    | replyHandler failHandler
    ;

replyHandler
    : '->' proc
    ;

failHandler
    : '~>' proc
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

// are arrays and records immutable?
literal
    : 'nil'                                     # nil
    | BOOL                                      # bool
    | NUMBER                                    # number
    | STRING                                    # string
    | '[' exprList? ']'                         # array
    | '(' fieldList ')'                         # record // form? compound? composite? frame? struct?
    | '{' (sep=PAIR_SEP|memberList|pairList)? '}' # set
    | proc                                      # service
    | '-<' paramList?                           # event
    ;

proc
    : paramList? block
    ;

memberList
    : (expr ','?)+
    ;

paramList
    : '(' ')'
    | '(' ID (',' ID)* ')'
    ;

fieldList
    : (ID FIELD_SEP expr ','?)+
    ;

// todo test dangling commas -- maybe just make commas optional?
pairList
    : (expr PAIR_SEP expr ','?)+
    ;
