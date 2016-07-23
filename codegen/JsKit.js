/**
 * Created by spurcell on 7/23/16.
 */

const JsStmt = require('./JsStmt');

/**
 * Construction kit for building JS ASTs
 */

// should we have an exaID part that prepends '$' to names?

// null, empty and return could potentially be constants, not functions

var JS = {

    EMPTY: ['empty'],

    NULL: ['null'],

    bool: val => ['bool', val],

    num: val => ['num', val],

    string: val => ['string', val],

    arrayLiteral: elements => ['arrayLiteral', elements],

    objLiteral: pairs => ['objLiteral', pairs],

    ID: name => ['id', name],

    subscript: (array, index) => ['subscript', array, index],

    select: (obj, field) => ['select', obj, field],

    logicalAnd: (left, right) => ['op', '&&', left, right],

    logicalOr: (left, right) => ['op', '||', left, right],

    strictEqual: (left, right) => ['op', '===', left, right],

    add: (left, right) => ['op', '+', left, right],

    sub: (left, right) => ['op', '-', left, right],

    mul: (left, right) => ['op', '*', left, right],

    div: (left, right) => ['op', '/', left, right],

    mod: (left, right) => ['op', '%', left, right],

    inc: expr => ['inc', expr],

    dec: expr => ['dec', expr],

    not: expr => ['not', expr],

    assign: (lvalue, rvalue) => ['assignment', lvalue, rvalue],

    fnCall: (fnExpr, argList) => ['fnCall', fnExpr, argList],

    fnDef: (params, statements) => ['fnDef', params, statements],

    // statements

    stmt: ast => new JsStmt(ast),

    varDeclaration: ast => new JsStmt(),

    condStmt: (predicate, consequent, alt) => ['if', predicate, consequent, alt],

    return: expr => new JsStmt(['returnStmt', expr], true),

    while: (condition, statements) => new JsStmt(),

    strictMode: ast => new JsStmt(['strictMode']),

    // higher-level constructs

    runtimeCall: (name, args) => JS.fnCall(JS.select(JS.ID('task'), name), args),

    message: (target, args, replyHandler, failHandler) => JS.runtimeCall('sendMessage', [
        target, JS.arrayLiteral(args), replyHandler ? replyHandler : JS.null(), replyHandler ? replyHandler : JS.null()
    ])
};

module.exports.parts = JS;

var render = ast => {

    // look for a renderer

    var render = writer[ast[0]];

    if (typeof render == 'function') {

        try {
            return render(ast);
        }
        catch (err) {
            console.log(err.message + " while rendering ", ast);
            throw err;
        }
    }
};

module.exports.render = render;

// ['stmtList', headStmt]
// ['stmtList', headStmt, ['stmtList', head2Stmt]]
// ['stmtList', headStmt, ['stmtList', head2Stmt, ['stmtList', head3Stmt]]

var writer = {

    empty: ast => '',

    null: ast => "null",

    bool: ast => ast[1],

    num: ast => ast[1],

    // todo - test this escaping mechanism
    string: ast => "'" + ast[1].replace(/'/g, "\\'") + "'",

    id: ast => ast[1],

    subscript: ast => render(ast[1]) + '[' + render(ast[2]) + ']',

    returnStmt: ast => 'return' + (ast[1] ? ' ' + render(ast[1]) : '') + ';',

    strictMode: ast => "'use strict';",

    exprStmt: ast => render(ast[1]) + ';',

    arrayLiteral: ast => '[' + ast[1].map(render).join(',') + ']',

    assignment: ast => render(ast[1]) + ' = ' + render(ast[2]) + ';',

    if: ast => {

        var parts = ['if (', predicate, ') ', {block: consequent}, '\n\n'];

        if (negBlock) {
            parts.push('else ', {block: negBlock}, '\n\n');
        }
    },

    fnDef: ast => 'function (' + ast[1].join(', ') + ') {\n' + render(ast[2]) + '\n}',

    fnCall: ast => {

        var argList = ast[2].map(render).join(', ');

        return ast[1] + '(' + argList + ')';
    },

    stmtList: ast => {

        var head = render(ast[1]);

        if (ast[2]) {
            return head + '\n' + render(ast[2]);
        }

        return head;
    },

    message: ast => render(['fnCall', 'task.sendMessage', [
                        ast[1], ['arrayLiteral', ast[2]], ast[3], ast[4]]
                    ])
};
