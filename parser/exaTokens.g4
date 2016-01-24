lexer grammar exaTokens;

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

// todo test string escapings