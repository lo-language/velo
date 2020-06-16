@{%
    const Lo = require('../constructs');
    const moo = require('moo');

    let lexer = moo.states({
        main: {
          comment:      { match: /\/\*[^]*?\*\//, lineBreaks: true },
          ws:           { match: /[ \t\r\n]+/, lineBreaks: true },
          bcpl_comment: /\/\/.*?$/,
          number:       /0|-?[1-9][0-9]*(?:\.[0-9]+)?/,
          char:         { match: /'.'/, value: text => text.slice(1, -1) },

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
          left_arrow:   '<-',
          right_arrow:  '->',
          tilde_arrow:  '~>',
          yields:       '=>',
          forward:      '>>',
          fire:         '<<',
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
          not:          '!',
          cond:         '?',
          ID:           { match: /[a-zA-Z_][a-zA-Z_0-9]*/, keywords: {
                          KW: [
                              'is', 'are',
                              'if', 'else', 'while', 'scan', 'on',
                              'reply', 'fail', 'substitute',
                              'async',
                              'have', 'drop',
                              'using', 'as',
                              'nil', 'true', 'false',
                              'deftype', 'declare',
                              'dyn', 'bool', 'int', 'char', 'string', 'float', 'dec'
                            ],
                        }},
          NL:           { match: /\n/, lineBreaks: true },
        },
        in_string: {

          string:       { match: /(?:\\[nrvtbfx"\\]|[^\n"`\\])*?"/, value: text => text.slice(0, -1), pop: true },
          interp_begin: { match: /(?:\\[nrvtbfx"\\]|[^\n"`\\])*?`/, value: text => text.slice(0, -1), push: "main" }
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
%}

####################################################################################################
# modules
####################################################################################################

# Pass your lexer object using the @lexer option:
@lexer lexer

module -> using:* definition:+                                      {% function (d) { return new Lo.module(d[1], d[0]); } %}

using -> "using" dep ";"                                            {% function (d) { return d[1]; } %}

dep
    ->  (%ID "::"):? %ID ("as" %ID):?                                            {% function (d) {
            return new Lo.constant(d[2] ? d[2][1].value : d[1].value,
                new Lo.moduleRef(d[0] ? d[0][0].value : null, d[1].value));
        } %}
    |   %string "as" %ID                                            {% function (d) {
            return new Lo.constant(d[2].value, new Lo.moduleRef(null, d[0].value));
        } %}

stmt_list
    ->  statement                                                   {% function (d) { return new Lo.stmtList(d[0]); } %}
    |   statement stmt_list                                         {% function (d) { return new Lo.stmtList(d[0], d[1]); } %}

####################################################################################################
# statements
####################################################################################################

statement
    ->  definition                                                  {% id %}
    |   response                                                    {% id %}
    |   expr %assign expr ";"       				                {% function (d) {
            return new Lo.assign(d[0], d[1].value == '=' ? d[2] : new Lo.binaryOpExpr(
                {'+=': '+', '-=': '-', '*=': '*', '/=': '/', '%=': '%'}[d[1].value], d[0], d[2])); } %}
    |   destructure %assign expr ";"       				            {% function (d) {
                                                                        return new Lo.assign(d[0], d[1].value == '=' ? d[2] :
                                                                            new Lo.binaryOpExpr(
                                                                                {'+=': '+', '-=': '-', '*=': '*', '/=': '/', '%=': '%'}[d[1].value],
                                                                                d[0], d[2])); } %}
    |   expr %incDec ";"                                            {% function (d) {
                                                                        return new Lo.assign(d[0],
                                                                            d[1] == '++' ?
                                                                            new Lo.binaryOpExpr('+', d[0], new Lo.number('1')) :
                                                                            new Lo.binaryOpExpr('-', d[0], new Lo.number('1')));
                                                                    } %}
    |   conditional                                                 {% id %}
    |   expr ("+>"|"<+") expr ";"                                   {% function (d) {
                                                                        return new Lo.arrayPush(
                                                                            d[1][0].value == '<+' ? 'push-back' : 'push-front', d[0], d[2]);
                                                                    } %}
    # request statement
    |   async:? expr ("<-" exprList):? handlers                     {% function (d) {
                                                                        return new Lo.requestStmt(d[1], d[2] ? d[2][1] : [],
                                                                            d[3][0], d[3][1], d[0] == null);
                                                                    } %}
    # event statement
    |   expr "<<" exprList:? ";"                                    {% function (d) {
            return new Lo.event(d[0], d[2] ? d[2] : []); } %}
    #|   async:? expr exprList:? handlers                            {% function (d) {
    #                                                                    return new Lo.requestStmt(d[1], d[2] || [],
    #                                                                        d[3][0], d[3][1], d[0] == null);
    #                                                                } %}
    |   "while" expr block                                          {% function (d) {
            return new Lo.while(d[1], d[2]).setSourceLoc(d[0]);} %}
    |   "scan" expr ">>" proc                                       {% function (d) {
            return new Lo.scan(d[1], d[3]).setSourceLoc(d[0]);} %}
    |   "on" expr ">>" proc                                         {% function (d) {
            return new Lo.subscribe(d[1], d[3]); } %}
    |   "drop" expr ";"                                                {% function (d) {
            return new Lo.drop(d[1]); } %}

response -> ("reply" | "fail" | "substitute") exprList:? ";"        {% function (d) {
    return new Lo.response(d[0][0].value, d[1] || []).setSourceLoc(d[0][0]);
                                                                    } %}

async -> "async" | "@"

destructure
    ->   "(" %ID ("," %ID):+ ")"                                    {% function (d) {return new Lo.destructure([d[1].value].
                                                                        concat(d[2].map(function (id) { return id[1].value; }))); } %}

# we don't need typed_id here since it's always obvious and inferrable from the provided value
definition
    -> %ID ("is"|"are") expr ";"                             {% function (d) {
            return new Lo.constant(d[0].value, d[2]).setSourceLoc(d[0]);
        } %}
    | "deftype" %ID "as" type_spec ";"          {% function (d) { return new Lo.typedef(d[1].value, d[3]); } %}
    | "declare" %ID "as" type_spec ";"          {% function (d) { return new Lo.declaration(d[1].value, d[3]); } %}

handlers
    ->  ";"                                     {% function (d) { return [null, null]; } %}
    |   assign_handler (fail_handler|";")       {% function (d) { return [d[0], d[1][0].value === ';' ? null : d[1][0]]; } %}
    |   reply_handler fail_handler:?            {% function (d) { return [d[0], d[1]]; } %}
    |   fail_handler                            {% function (d) { return [null, d[0]]; } %}

# the assign handler declares and assigns a new var - or constant?
# todo make the RHS an lvalue or destructure, not just an ID
assign_handler
    ->  "=>" %ID                                {% function (d) {
        return new Lo.yields(new Lo.identifier(d[1].value)); } %}

reply_handler
    ->  "->" proc                               {% function (d) { return d[1]; } %}

fail_handler
    ->  "~>" proc                               {% function (d) { return d[1]; } %}

conditional
	->  "if" expr block                         {% function (d) {
	        return new Lo.conditional(d[1], d[2]).setSourceLoc(d[0]); } %}
    |   "if" expr block "else" block         	{% function (d) {
            return new Lo.conditional(d[1], d[2], d[4]).setSourceLoc(d[0]); } %}
    |   "if" expr block "else" conditional    	{% function (d) {
            return new Lo.conditional(d[1], d[2], new Lo.stmtList(d[4])).setSourceLoc(d[0]); } %}

####################################################################################################
# expressions
# mostly courtesy of Jeff Lee's 1985 C grammar
####################################################################################################

primary_expr
    ->  (%ID "::"):* %ID                                {% function (d) {
            return d[0].length > 0 ?
             new Lo.identifier(d[1].value, d[0].map(function (item) {return item[0].value;})).setSourceLoc(d[0][0][0]) :
             new Lo.identifier(d[1].value).setSourceLoc(d[1]); } %}
    |   literal                                         {% id %}
    |   "(" expr ")"                                    {% function (d) {return d[1]; } %}
    |   "`" expr "`"                                    {% function (d) {return new Lo.coercion(d[1]); } %}

postfix_expr
    ->  primary_expr                                    {% id %}
    |   postfix_expr "[" expr "]"                       {% function (d) {return new Lo.subscript(d[0], d[2]); } %}
    |   postfix_expr "[" expr ".." expr:? "]"           {% function (d) {return new Lo.slice(d[0], d[2], d[4]); } %}
    |   async:? postfix_expr "(" exprList:? ")"         {% function (d) { return d[0] ?
                                                            new Lo.requestExpr(d[1], d[3] ? d[3] : [], false) :
                                                            new Lo.requestExpr(d[1], d[3] ? d[3] : [], true); } %}
    |   postfix_expr "." %ID                            {% function (d) {return new Lo.select(d[0], d[2].value); } %}

has_expr
    ->  postfix_expr                                    {% id %}
    |   expr ("has"|"contains") has_expr                {% function (d) {return new Lo.membership(d[0], d[2]); } %}
    |   "have" has_expr                                 {% function (d) {return new Lo.unaryOpExpr('have', d[1]); } %}

unary_expr
    ->  has_expr                                        {% id %}
    |   "#" unary_expr                                  {% function (d) { return new Lo.unaryOpExpr('cardinality', d[1]); } %}
    |   ("not"|"!") unary_expr                          {% function (d) {return new Lo.unaryOpExpr('not', d[1]); } %}

mult_expr
    ->  unary_expr                                      {% id %}
    |   mult_expr ("*"|"/"|"%") unary_expr              {% function (d) {return new Lo.binaryOpExpr(d[1][0].value, d[0], d[2]); } %}

add_expr
    ->  mult_expr                                       {% id %}
    |   add_expr ("+"|"-") mult_expr                    {% function (d) {return new Lo.binaryOpExpr(d[1][0].value, d[0], d[2]); } %}

relational_expr
    ->  add_expr                                        {% id %}
    |   relational_expr %relational add_expr            {% function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); } %}

equality_expr
    ->  relational_expr                                 {% id %}
    |   equality_expr %equality relational_expr         {% function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); } %}

logical_and_expr
    ->  equality_expr                                   {% id %}
    |   logical_and_expr "and" equality_expr            {% function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); } %}

logical_or_expr
    ->  logical_and_expr                                {% id %}
    |   logical_or_expr "or" logical_and_expr           {% function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); } %}

cond_expr
    ->  logical_or_expr                                 {% id %}
    |   logical_or_expr "?" expr ":" cond_expr          {% function (d) {return new Lo.condExpr(d[0], d[2], d[4]); } %}

expr
    ->  cond_expr                                       {% id %}
    |   expr "><" cond_expr                             {% function (d) {return new Lo.concat(d[0], d[2]); } %}

exprList -> expr ("," expr):*                           {% function (d) {
                                                            return [d[0]].concat(d[1].map(function (item) {return item[1];}));
                                                        } %}

literal
    ->  "nil"                                       {% function (d) { return new Lo.nil(); } %}
    |   ("true"|"false")                            {% function (d) {
            return new Lo.boolean(d[0][0].value === 'true').setSourceLoc(d[0][0]); } %}
    |   %number                                     {% function (d) {
            return new Lo.number(d[0].value).setSourceLoc(d[0]); } %}
    |   %char                                       {% function (d) {
            return new Lo.charLiteral(d[0].value).setSourceLoc(d[0]); } %}
    |   interp_string                               {% id %}
    |   "[" (expr ",":?):* "]"                      {%
    function (d) {
            return new Lo.arrayLiteral(d[1].map(function (elem) {return elem[0];})).setSourceLoc(d[0]);
    } %}
    |   record_literal                              {% id %}
    |   set_literal                                 {% id %}
    |   map_literal                                 {% id %}
    |   proc                                        {% function (d) { d[0].isService = true; return d[0]; } %}

interp_string
    ->  %string                                     {%
    function (d) {
        return new Lo.string(d[0].value).setSourceLoc(d[0].line, d[0].col - 1); // adjust for quotes
    } %}
    |   %interp_begin expr %interp_end interp_string    {%

    function (d) {

        return new Lo.concat(
            new Lo.concat(new Lo.string(d[0].value), new Lo.coercion(d[1])),
            d[3]).setSourceLoc(d[0].line, d[0].col - 1);
    } %}

record_literal
    ->  "{" (field ",":?):+ "}"                     {% function (d) {
            return new Lo.recordLiteral(d[1].map(function (field) {return field[0];})).setSourceLoc(d[0]); } %}

field   -> %ID ":" expr                             {% function (d) { return {label: d[0].value, value: d[2]}; } %}

set_literal
    ->  "{" (expr ",":?):* "}"                      {% function (d) {
            return new Lo.setLiteral(d[1].map(function (elem) {return elem[0];})).setSourceLoc(d[0]); } %}

map_literal
    ->  "{" "=>" "}"                               {% function (d) {
            return new Lo.mapLiteral([]).setSourceLoc(d[0]); } %}
    |   "{" (pair ",":?):+ "}"                      {% function (d) {
            return new Lo.mapLiteral(d[1].map(function (pair) {return pair[0];})).setSourceLoc(d[0]); } %}

pair    -> expr "=>" expr                           {% function (d) { return {key: d[0], value: d[2]}; } %}


####################################################################################################
# procedures and blocks
####################################################################################################

proc -> "(" id_list:? ")" block                   {% function (d) {
    return new Lo.procedure(d[1] ? d[1] : [], d[3]).setSourceLoc(d[0]); } %}

block -> "{" stmt_list:? "}"                    {% function (d) { return d[1] ? d[1] : new Lo.stmtList(); } %}

id_list
	-> typed_id ("," typed_id):*                              {% function (d) {
	    return [d[0].value].concat(d[1].map(function (id) {return id[1].value;})); } %}


####################################################################################################
# types
####################################################################################################

typed_id -> type_spec:? %ID                         {% function (d) { return d[1]; } %}

# a nullable string: string?
# an array of nullable strings: string?*
# a nullable array of strings: string*?
# an optional array of nullable strings: string?*?

type_spec
    ->  "dyn"                                       {% function (d) { return null; } %}
    |   "bool"                                      {% function (d) { return null; } %}
    |   "char"                                      {% function (d) { return null; } %}
    |   "int"                                       {% function (d) { return null; } %}
    |   "nat"                                       {% function (d) { return null; } %}
    |   "float"                                     {% function (d) { return null; } %}
    |   "dec"                                       {% function (d) { return null; } %}
    |   "num"                                       {% function (d) { return null; } %}
    |   "string"                                    {% function (d) { return null; } %}
    |   %ID                                         {% function (d) { return null; } %}
    | type_spec "?"                                 {% function (d) { return null; } %}
    | type_spec "*"                                 {% function (d) { return null; } %}
