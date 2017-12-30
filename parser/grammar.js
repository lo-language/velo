// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

    const Lo = require('../constructs');
    const moo = require('moo');

    let lexer = moo.states({
        main: {
          comment:      { match: /\/\*[^]*?\*\//, lineBreaks: true },
          ws:           { match: /[ \t\r\n]+/, lineBreaks: true },
          bcpl_comment: /\/\/.*?$/,
          number:       /0|-?[1-9][0-9]*(?:\.[0-9]+)?/,

          string_start: { match: '"', push: "in_string" },
          interp_end:   { match: '`', pop: true },

          lparen:       '(',
          rparen:       ')',
          lbracket:     '[',
          rbracket:     ']',
          comma:        ',',
          pound:        '#',
          range:        '..',
          dot:          '.',
          bool:         /true|false/,
          left_arrow:   '<-',
          right_arrow:  '->',
          tilde_arrow:  '~>',
          yields:       '=>',
          forward:      '>>',
          concat:       '><',
          push_front:   '+>',
          push_back:    '<+',
          equality:     /==|!=/,
          relational:   /<=|>=|<|>/,
          assign:       /=|\+=|-=|\*=|\/=|%=/,
          incDec:       /\+\+|--/,
          lbrace:       '{',
          rbrace:       '}',
          atsymbol:     '@',
          colons:       '::',
          colon:        ':',
          semi:         ';',
          add:          '+',
          sub:          '-',
          mul:          '*',
          div:          '/',
          mod:          '%',
          cond:         '?',
          ID:           { match: /[a-zA-Z_][a-zA-Z_0-9]*/, keywords: {
                          KW: ['as', 'is', 'are', 'if', 'else', 'while', 'scan', 'reply', 'fail', 'substitute', 'async',
                                'module', 'exists', 'defined', 'undefined', 'using'],
                        }},
          NL:           { match: /\n/, lineBreaks: true },
        },
        in_string: {

          string:       { match: /(?:\\[btnr"\\]|[^\n"`\\])*?"/, value: text => text.slice(0, -1), pop: true },
          interp_begin: { match: /(?:\\[btnr"\\]|[^\n"`\\])*?`/, value: text => text.slice(0, -1), push: "main" }
        }
    });

    let origNext = lexer.next;

    // wraps the lexer function to strip whitespace and comments :-/
    lexer.next = function () {

        var tok = origNext.call(this);

        if (tok) {

            switch (tok.type) {

                case 'ws':
                case 'comment':
                case 'bcpl_comment':
                case 'string_start':
                    return lexer.next();
            }

            return tok;
        }

        return undefined;
    };
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "module$ebnf$1", "symbols": []},
    {"name": "module$ebnf$1", "symbols": ["module$ebnf$1", "using"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "module$ebnf$2", "symbols": ["definition"]},
    {"name": "module$ebnf$2", "symbols": ["module$ebnf$2", "definition"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "module", "symbols": ["module$ebnf$1", "module$ebnf$2"], "postprocess": function (d) { return new Lo.module(d[1], d[0]); }},
    {"name": "using", "symbols": [{"literal":"using"}, "dep", {"literal":";"}], "postprocess": function (d) { return d[1]; }},
    {"name": "dep", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID)], "postprocess":  function (d) {
        return new Lo.constant(d[0].value, new Lo.moduleRef(null, d[0].value));
                                                                } },
    {"name": "dep", "symbols": ["locator", {"literal":"as"}, (lexer.has("ID") ? {type: "ID"} : ID)], "postprocess":  function (d) {
        return new Lo.constant(d[2].value, d[0]);
                                                                } },
    {"name": "locator", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": function (d) { return new Lo.moduleRef(null, d[0].value); }},
    {"name": "locator$ebnf$1$subexpression$1", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID), {"literal":"::"}]},
    {"name": "locator$ebnf$1", "symbols": ["locator$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "locator$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "locator", "symbols": ["locator$ebnf$1", (lexer.has("ID") ? {type: "ID"} : ID)], "postprocess":  function (d) {
        return new Lo.moduleRef(d[0] ? d[0][0].value : null, d[1].value); } },
    {"name": "statementList", "symbols": ["statement"], "postprocess": function (d) { return new Lo.stmtList(d[0]); }},
    {"name": "statementList", "symbols": ["statement", "statementList"], "postprocess": function (d) { return new Lo.stmtList(d[0], d[1]); }},
    {"name": "statement", "symbols": ["definition"], "postprocess": id},
    {"name": "statement", "symbols": ["response"], "postprocess": id},
    {"name": "statement", "symbols": ["expr", (lexer.has("assign") ? {type: "assign"} : assign), "expr", {"literal":";"}], "postprocess":  function (d) {
        return new Lo.assign(d[0], d[1].value == '=' ? d[2] : new Lo.binaryOpExpr(
        {'+=': '+', '-=': '-', '*=': '*', '/=': '/', '%=': '%'}[d[1].value], d[0], d[2])); } },
    {"name": "statement", "symbols": ["destructure", (lexer.has("assign") ? {type: "assign"} : assign), "expr", {"literal":";"}], "postprocess":  function (d) {
        return new Lo.assign(d[0], d[1].value == '=' ? d[2] :
            new Lo.binaryOpExpr(
                {'+=': '+', '-=': '-', '*=': '*', '/=': '/', '%=': '%'}[d[1].value],
                d[0], d[2])); } },
    {"name": "statement", "symbols": ["expr", (lexer.has("incDec") ? {type: "incDec"} : incDec), {"literal":";"}], "postprocess":  function (d) {
            return new Lo.assign(d[0],
                d[1] == '++' ?
                new Lo.binaryOpExpr('+', d[0], new Lo.number('1')) :
                new Lo.binaryOpExpr('-', d[0], new Lo.number('1')));
        } },
    {"name": "statement", "symbols": ["conditional"], "postprocess": id},
    {"name": "statement$subexpression$1", "symbols": [{"literal":"+>"}]},
    {"name": "statement$subexpression$1", "symbols": [{"literal":"<+"}]},
    {"name": "statement", "symbols": ["expr", "statement$subexpression$1", "expr", {"literal":";"}], "postprocess":  function (d) {
            return new Lo.arrayPush(
                d[1][0].value == '<+' ? 'push-back' : 'push-front', d[0], d[2]);
        } },
    {"name": "statement$ebnf$1", "symbols": ["async"], "postprocess": id},
    {"name": "statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement$ebnf$2", "symbols": ["exprList"], "postprocess": id},
    {"name": "statement$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement", "symbols": ["statement$ebnf$1", "expr", {"literal":"<-"}, "statement$ebnf$2", "handlers"], "postprocess":  function (d) {
            return new Lo.requestStmt(d[1], d[3] ? d[3] : [],
                d[4][0], d[4][1], d[0] == null);
        } },
    {"name": "statement", "symbols": [{"literal":"while"}, "expr", "block"], "postprocess":  function (d) {
        return new Lo.while(d[1], d[2]).setSourceLoc(d[0]);} },
    {"name": "statement", "symbols": [{"literal":"scan"}, "expr", {"literal":">>"}, "proc"], "postprocess":  function (d) {
        return new Lo.scan(d[1], d[3]).setSourceLoc(d[0]);} },
    {"name": "response$subexpression$1", "symbols": [{"literal":"reply"}]},
    {"name": "response$subexpression$1", "symbols": [{"literal":"fail"}]},
    {"name": "response$subexpression$1", "symbols": [{"literal":"substitute"}]},
    {"name": "response$ebnf$1", "symbols": ["exprList"], "postprocess": id},
    {"name": "response$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "response", "symbols": ["response$subexpression$1", "response$ebnf$1", {"literal":";"}], "postprocess":  function (d) {
        return new Lo.response(d[0][0].value, d[1] || []).setSourceLoc(d[0][0]);
                                                                        } },
    {"name": "async", "symbols": [{"literal":"async"}]},
    {"name": "async", "symbols": [{"literal":"@"}]},
    {"name": "destructure$ebnf$1$subexpression$1", "symbols": [{"literal":","}, (lexer.has("ID") ? {type: "ID"} : ID)]},
    {"name": "destructure$ebnf$1", "symbols": ["destructure$ebnf$1$subexpression$1"]},
    {"name": "destructure$ebnf$1$subexpression$2", "symbols": [{"literal":","}, (lexer.has("ID") ? {type: "ID"} : ID)]},
    {"name": "destructure$ebnf$1", "symbols": ["destructure$ebnf$1", "destructure$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "destructure", "symbols": [{"literal":"("}, (lexer.has("ID") ? {type: "ID"} : ID), "destructure$ebnf$1", {"literal":")"}], "postprocess":  function (d) {return new Lo.destructure([d[1].value].
        concat(d[2].map(function (id) { return id[1].value; }))); } },
    {"name": "definition$subexpression$1", "symbols": [{"literal":"is"}]},
    {"name": "definition$subexpression$1", "symbols": [{"literal":"are"}]},
    {"name": "definition", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID), "definition$subexpression$1", "expr", {"literal":";"}], "postprocess": 
        function (d) {
            return new Lo.constant(d[0].value, d[2]).setSourceLoc(d[0]);
        } },
    {"name": "handlers", "symbols": [{"literal":";"}], "postprocess": function (d) { return [null, null]; }},
    {"name": "handlers", "symbols": ["assignHandler", {"literal":";"}], "postprocess": function (d) { return [d[0], null]; }},
    {"name": "handlers", "symbols": ["assignHandler", "failHandler"]},
    {"name": "handlers", "symbols": ["replyHandler"], "postprocess": function (d) { return [d[0], null]; }},
    {"name": "handlers", "symbols": ["failHandler"], "postprocess": function (d) { return [null, d[0]]; }},
    {"name": "handlers", "symbols": ["replyHandler", "failHandler"]},
    {"name": "assignHandler", "symbols": [{"literal":"=>"}, (lexer.has("ID") ? {type: "ID"} : ID)], "postprocess": function (d) { return new Lo.yields(new Lo.identifier(d[1].value)); }},
    {"name": "replyHandler", "symbols": [{"literal":"->"}, "proc"], "postprocess": function (d) { return d[1]; }},
    {"name": "failHandler", "symbols": [{"literal":"~>"}, "proc"], "postprocess": function (d) { return d[1]; }},
    {"name": "conditional", "symbols": [{"literal":"if"}, "expr", "block"], "postprocess":  function (d) {
        return new Lo.conditional(d[1], d[2]).setSourceLoc(d[0]); } },
    {"name": "conditional", "symbols": [{"literal":"if"}, "expr", "block", {"literal":"else"}, "block"], "postprocess":  function (d) {
        return new Lo.conditional(d[1], d[2], d[4]).setSourceLoc(d[0]); } },
    {"name": "conditional", "symbols": [{"literal":"if"}, "expr", "block", {"literal":"else"}, "conditional"], "postprocess":  function (d) {
        return new Lo.conditional(d[1], d[2], new Lo.stmtList(d[4])).setSourceLoc(d[0]); } },
    {"name": "primary_expr", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID)], "postprocess":  function (d) {
        return new Lo.identifier(d[0].value).setSourceLoc(d[0]); } },
    {"name": "primary_expr", "symbols": ["literal"], "postprocess": id},
    {"name": "primary_expr", "symbols": [{"literal":"("}, "expr", {"literal":")"}], "postprocess": function (d) {return d[1]; }},
    {"name": "primary_expr", "symbols": [{"literal":"`"}, "expr", {"literal":"`"}], "postprocess": function (d) {return new Lo.coercion(d[1]); }},
    {"name": "postfix_expr", "symbols": ["primary_expr"], "postprocess": id},
    {"name": "postfix_expr", "symbols": ["postfix_expr", {"literal":"["}, "expr", {"literal":"]"}], "postprocess": function (d) {return new Lo.subscript(d[0], d[2]); }},
    {"name": "postfix_expr$ebnf$1", "symbols": ["expr"], "postprocess": id},
    {"name": "postfix_expr$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "postfix_expr", "symbols": ["postfix_expr", {"literal":"["}, "expr", {"literal":".."}, "postfix_expr$ebnf$1", {"literal":"]"}], "postprocess": function (d) {return new Lo.slice(d[0], d[2], d[4]); }},
    {"name": "postfix_expr$ebnf$2", "symbols": ["async"], "postprocess": id},
    {"name": "postfix_expr$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "postfix_expr$ebnf$3", "symbols": ["exprList"], "postprocess": id},
    {"name": "postfix_expr$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "postfix_expr", "symbols": ["postfix_expr$ebnf$2", "postfix_expr", {"literal":"("}, "postfix_expr$ebnf$3", {"literal":")"}], "postprocess":  function (d) { return d[0] ?
        new Lo.requestExpr(d[1], d[3] ? d[3] : [], false) :
        new Lo.requestExpr(d[1], d[3] ? d[3] : [], true); } },
    {"name": "postfix_expr", "symbols": ["postfix_expr", {"literal":"."}, (lexer.has("ID") ? {type: "ID"} : ID)], "postprocess": function (d) {return new Lo.select(d[0], d[2].value); }},
    {"name": "has_expr", "symbols": ["postfix_expr"], "postprocess": id},
    {"name": "has_expr$subexpression$1", "symbols": [{"literal":"has"}]},
    {"name": "has_expr$subexpression$1", "symbols": [{"literal":"contains"}]},
    {"name": "has_expr", "symbols": ["expr", "has_expr$subexpression$1", "postfix_expr"], "postprocess": function (d) {return new Lo.membership(d[0], d[2]); }},
    {"name": "has_expr$subexpression$2", "symbols": [{"literal":"exists"}]},
    {"name": "has_expr$subexpression$2", "symbols": [{"literal":"defined"}]},
    {"name": "has_expr$subexpression$2", "symbols": [{"literal":"undefined"}]},
    {"name": "has_expr", "symbols": ["expr", "has_expr$subexpression$2"], "postprocess": function (d) {return new Lo.existence(d[0], d[1][0].value == 'undefined'); }},
    {"name": "unary_expr", "symbols": ["has_expr"], "postprocess": id},
    {"name": "unary_expr", "symbols": [{"literal":"#"}, "mult_expr"], "postprocess": function (d) { return new Lo.unaryOpExpr('cardinality', d[1]); }},
    {"name": "unary_expr", "symbols": [{"literal":"not"}, "mult_expr"], "postprocess": function (d) {return new Lo.unaryOpExpr('not', d[1]); }},
    {"name": "mult_expr", "symbols": ["unary_expr"], "postprocess": id},
    {"name": "mult_expr$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "mult_expr$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "mult_expr$subexpression$1", "symbols": [{"literal":"%"}]},
    {"name": "mult_expr", "symbols": ["mult_expr", "mult_expr$subexpression$1", "unary_expr"], "postprocess": function (d) {return new Lo.binaryOpExpr(d[1][0].value, d[0], d[2]); }},
    {"name": "add_expr", "symbols": ["mult_expr"], "postprocess": id},
    {"name": "add_expr$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "add_expr$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "add_expr", "symbols": ["add_expr", "add_expr$subexpression$1", "mult_expr"], "postprocess": function (d) {return new Lo.binaryOpExpr(d[1][0].value, d[0], d[2]); }},
    {"name": "relational_expr", "symbols": ["add_expr"], "postprocess": id},
    {"name": "relational_expr", "symbols": ["relational_expr", (lexer.has("relational") ? {type: "relational"} : relational), "add_expr"], "postprocess": function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); }},
    {"name": "equality_expr", "symbols": ["relational_expr"], "postprocess": id},
    {"name": "equality_expr", "symbols": ["equality_expr", (lexer.has("equality") ? {type: "equality"} : equality), "relational_expr"], "postprocess": function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); }},
    {"name": "logical_and_expr", "symbols": ["equality_expr"], "postprocess": id},
    {"name": "logical_and_expr", "symbols": ["logical_and_expr", {"literal":"and"}, "equality_expr"], "postprocess": function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); }},
    {"name": "logical_or_expr", "symbols": ["logical_and_expr"], "postprocess": id},
    {"name": "logical_or_expr", "symbols": ["logical_or_expr", {"literal":"or"}, "logical_and_expr"], "postprocess": function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); }},
    {"name": "cond_expr", "symbols": ["logical_or_expr"], "postprocess": id},
    {"name": "cond_expr", "symbols": ["logical_or_expr", {"literal":"?"}, "expr", {"literal":":"}, "cond_expr"], "postprocess": function (d) {return new Lo.condExpr(d[0], d[2], d[4]); }},
    {"name": "expr", "symbols": ["cond_expr"], "postprocess": id},
    {"name": "expr", "symbols": ["expr", {"literal":"><"}, "cond_expr"], "postprocess": function (d) {return new Lo.concat(d[0], d[2]); }},
    {"name": "exprList$ebnf$1", "symbols": []},
    {"name": "exprList$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "expr"]},
    {"name": "exprList$ebnf$1", "symbols": ["exprList$ebnf$1", "exprList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "exprList", "symbols": ["expr", "exprList$ebnf$1"], "postprocess":  function (d) {
            return [d[0]].concat(d[1].map(function (item) {return item[1];}));
        } },
    {"name": "literal", "symbols": [(lexer.has("bool") ? {type: "bool"} : bool)], "postprocess":  function (d) {
        return new Lo.boolean(d[0].value === 'true').setSourceLoc(d[0]); } },
    {"name": "literal", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess":  function (d) {
        return new Lo.number(d[0].value).setSourceLoc(d[0]); } },
    {"name": "literal", "symbols": ["interp_string"], "postprocess": id},
    {"name": "literal$ebnf$1", "symbols": []},
    {"name": "literal$ebnf$1$subexpression$1$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "literal$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "literal$ebnf$1$subexpression$1", "symbols": ["expr", "literal$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "literal$ebnf$1", "symbols": ["literal$ebnf$1", "literal$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "literal", "symbols": [{"literal":"["}, "literal$ebnf$1", {"literal":"]"}], "postprocess": 
        function (d) {
                return new Lo.arrayLiteral(d[1].map(function (elem) {return elem[0];})).setSourceLoc(d[0]);
        } },
    {"name": "literal$ebnf$2$subexpression$1$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "literal$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "literal$ebnf$2$subexpression$1", "symbols": ["field", "literal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "literal$ebnf$2", "symbols": ["literal$ebnf$2$subexpression$1"]},
    {"name": "literal$ebnf$2$subexpression$2$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "literal$ebnf$2$subexpression$2$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "literal$ebnf$2$subexpression$2", "symbols": ["field", "literal$ebnf$2$subexpression$2$ebnf$1"]},
    {"name": "literal$ebnf$2", "symbols": ["literal$ebnf$2", "literal$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "literal", "symbols": [{"literal":"("}, "literal$ebnf$2", {"literal":")"}], "postprocess":  function (d) {
        return new Lo.compound(d[1].map(function (field) {return field[0];})).setSourceLoc(d[0]); } },
    {"name": "literal", "symbols": [{"literal":"{"}, {"literal":"="}, {"literal":"}"}], "postprocess":  function (d) {
        return new Lo.mapLiteral([]).setSourceLoc(d[0]); } },
    {"name": "literal$ebnf$3$subexpression$1$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "literal$ebnf$3$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "literal$ebnf$3$subexpression$1", "symbols": ["pair", "literal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "literal$ebnf$3", "symbols": ["literal$ebnf$3$subexpression$1"]},
    {"name": "literal$ebnf$3$subexpression$2$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "literal$ebnf$3$subexpression$2$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "literal$ebnf$3$subexpression$2", "symbols": ["pair", "literal$ebnf$3$subexpression$2$ebnf$1"]},
    {"name": "literal$ebnf$3", "symbols": ["literal$ebnf$3", "literal$ebnf$3$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "literal", "symbols": [{"literal":"{"}, "literal$ebnf$3", {"literal":"}"}], "postprocess":  function (d) {
        return new Lo.mapLiteral(d[1].map(function (pair) {return pair[0];})).setSourceLoc(d[0]); } },
    {"name": "literal$ebnf$4", "symbols": []},
    {"name": "literal$ebnf$4$subexpression$1$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "literal$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "literal$ebnf$4$subexpression$1", "symbols": ["expr", "literal$ebnf$4$subexpression$1$ebnf$1"]},
    {"name": "literal$ebnf$4", "symbols": ["literal$ebnf$4", "literal$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "literal", "symbols": [{"literal":"{"}, "literal$ebnf$4", {"literal":"}"}], "postprocess":  function (d) {
        return new Lo.setLiteral(d[1].map(function (elem) {return elem[0];})).setSourceLoc(d[0]); } },
    {"name": "literal", "symbols": ["proc"], "postprocess": function (d) { d[0].isService = true; return d[0]; }},
    {"name": "interp_string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        function (d) {
            return new Lo.string(d[0].value).setSourceLoc(d[0].line, d[0].col - 1); // adjust for quotes
        } },
    {"name": "interp_string", "symbols": [(lexer.has("interp_begin") ? {type: "interp_begin"} : interp_begin), "expr", (lexer.has("interp_end") ? {type: "interp_end"} : interp_end), "interp_string"], "postprocess": 
        
        function (d) {
        
            return new Lo.concat(
                new Lo.concat(new Lo.string(d[0].value), new Lo.coercion(d[1])),
                d[3]).setSourceLoc(d[0].line, d[0].col - 1);
        } },
    {"name": "field", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID), {"literal":":"}, "expr"], "postprocess": function (d) { return new Lo.field(d[0].value, d[2]); }},
    {"name": "pair", "symbols": ["expr", {"literal":"="}, "expr"], "postprocess": function (d) { return new Lo.pair(d[0], d[2]); }},
    {"name": "proc$ebnf$1", "symbols": ["paramList"], "postprocess": id},
    {"name": "proc$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "proc", "symbols": [{"literal":"("}, "proc$ebnf$1", {"literal":")"}, "block"], "postprocess":  function (d) {
        return new Lo.procedure(d[1] ? d[1] : [], d[3]).setSourceLoc(d[0]); } },
    {"name": "block$ebnf$1", "symbols": ["statementList"], "postprocess": id},
    {"name": "block$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "block", "symbols": [{"literal":"{"}, "block$ebnf$1", {"literal":"}"}], "postprocess": function (d) { return d[1] ? d[1] : new Lo.stmtList(); }},
    {"name": "paramList$ebnf$1", "symbols": []},
    {"name": "paramList$ebnf$1$subexpression$1", "symbols": [{"literal":","}, (lexer.has("ID") ? {type: "ID"} : ID)]},
    {"name": "paramList$ebnf$1", "symbols": ["paramList$ebnf$1", "paramList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "paramList", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID), "paramList$ebnf$1"], "postprocess": function (d) { return [d[0].value].concat(d[1].map(function (id) {return id[1].value;})); }}
]
  , ParserStart: "module"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
