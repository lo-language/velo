/**
 * Created by spurcell on 6/25/16.
 */

var __ = module.exports;

__.render = function (ast) {

    // look for a renderer

    var type = ast[0];

    if (__[type] && typeof __[type] == 'function') {

        try {
            return __[type](ast);
        }
        catch (err) {
            console.log("error while rendering ", ast);
            throw new Error();
        }
    }
};

// ['stmtList', headStmt]
// ['stmtList', headStmt, ['stmtList', head2Stmt]]
// ['stmtList', headStmt, ['stmtList', head2Stmt, ['stmtList', head3Stmt]]
__.stmtList = function (ast) {

    var head = __.render(ast[1]);

    if (ast[2]) {
        return head + '\n' + __.render(ast[2]);
    }

    return head;
};

__.string = function (ast) {

    return "'" + ast[1] + "'";
};

__.arrayLiteral = function (ast) {

    return '[' + ast[1].map(__.render).join(',') + ']';
};

__.null = function () {

    return 'null';
};

__.num = function (ast) {

    return ast[1];
};

__.returnStmt = function () {

    return 'return;';
};

__.exprStmt = function (ast) {

    return __.render(ast[1]) + ';';
};

__.assignment = function (ast) {

    return __.render(ast[1]) + ' = ' + __.render(ast[2]) + ';';
};

__.id = function (ast) {

    return ast[1];
};

__.fnCall = function (ast) {

    var argList = ast[2].map(__.render).join(', ');

    return ast[1] + '(' + argList + ')';
};

__.fnDef = function (ast) {

    return 'function (' + ast[1].join(', ') + ') {\n' + __.render(ast[2]) + '\n}';
};

// higher-level constructs (generate JS statement lists)

__.message = function (ast) {

    return __.render(['fnCall', 'task.sendMessage', [
        ast[1], ['arrayLiteral', ast[2]], ast[3], ast[4]]
    ]);
};

// could use functions as constants e.g.
// [Js.FN_CALL, args], [Js.FN_DEF, params, body], then you can use them to render directly