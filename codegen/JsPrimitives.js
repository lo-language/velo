/**
 * Created by spurcell on 7/23/16.
 */

/**
 * Primitives for building JS ASTs
 */

// should we have an exaID part that prepends '$' to names?

const JS = {};

JS.NULL = {

    getTree: () => ['null'],
    getJs: () => 'null'
};

// todo make this a stmt
JS.USE_STRICT = {

    getTree: () => ['use-strict'],
    getJs: () => "'use strict';\n"
};

JS.ID = (name) => {

    return {
        getTree: () => ['id', name],
        getResolved: function () {return this;},
        getJs: () => name
    };
};

JS.bool = (val) => {

    return {
        getTree: () => ['bool', val],
        getJs: () => val
    };
};

JS.num = (val) => {

    return {
        getTree: () => ['num', val],
        getJs: () => val
    };
};

JS.string = (val) => {

    return {
        getTree: () => ['string', val],
        getJs: () => "'" + val.replace(/'/g, "\\'") + "'"
    };
};

JS.arrayLiteral = (exprs) => {

    return {
        getTree: () => ['arrayLiteral', exprs.map(expr => expr.getTree())], // todo
        getJs: () => '[' + exprs.map(expr => expr.getJs()).join(', ') + ']'
    };
};

JS.objLiteral = (pairs) => {

    return {
        getTree: () => ['objLiteral', pairs.map(pair => [pair[0].getTree(), pair[1].getTree()])], // todo
        getJs: () => '{' + pairs.map(pair => pair[0].getJs() + ': ' + pair[1].getJs()).join(',') + '}'
    };
};

JS.subscript = (array, index) => {

    return {
        getTree: () => ['subscript', array.getTree(), index.getTree()],
        getJs: () => array.getJs() + '[' + index.getJs() + ']'
    };
};

JS.select = (obj, property) => {

    return {
        getTree: () => ['select', obj.getTree(), property],
        getJs: () => obj.getJs() + '.' + property
    };
};

JS.logicalAnd = (left, right) => {

    return {
        getTree: () => ['&&', left.getTree(), right.getTree()],
        getJs: () => left.getJs() + ' && ' + right.getJs()
    };
};

JS.logicalOr = (left, right) => {

    return {
        getTree: () => ['||', left.getTree(), right.getTree()],
        getJs: () => left.getJs() + ' || ' + right.getJs()
    };
};

JS.strictEqual = (left, right) => {

    return {
        getTree: () => ['strict-equal', left.getTree(), right.getTree()],
        getJs: () => left.getJs() + ' === ' + right.getJs()
    };
};

JS.notEqual = (left, right) => {

    return {
        getTree: () => ['not-equal', left.getTree(), right.getTree()],
        getJs: () => left.getJs() + ' != ' + right.getJs()
    };
};

JS.lt = (left, right) => {

    return {
        getTree: () => ['lt', left.getTree(), right.getTree()],
        getJs: () => left.getJs() + ' < ' + right.getJs()
    };
};

JS.gt = (left, right) => {

    return {
        getTree: () => ['gt', left.getTree(), right.getTree()],
        getJs: () => left.getJs() + ' > ' + right.getJs()
    };
};

JS.lte = (left, right) => {

    return {
        getTree: () => ['lte', left.getTree(), right.getTree()],
        getJs: () => left.getJs() + ' <= ' + right.getJs()
    };
};

JS.gte = (left, right) => {

    return {
        getTree: () => ['gte', left.getTree(), right.getTree()],
        getJs: () => left.getJs() + ' >= ' + right.getJs()
    };
};

JS.add = (left, right) => {

    return {
        getTree: () => ['add', left.getTree(), right.getTree()],
        getJs: () => '(' + left.getJs() + ' + ' + right.getJs() + ')'
    };
};

JS.sub = (left, right) => {

    return {
        getTree: () => ['sub', left.getTree(), right.getTree()],
        getJs: () => '(' + left.getJs() + ' - ' + right.getJs() + ')'
    };
};

JS.mul = (left, right) => {

    return {
        getTree: () => ['mul', left.getTree(), right.getTree()],
        getJs: () => '(' + left.getJs() + ' * ' + right.getJs() + ')'
    };
};

JS.div = (left, right) => {

    return {
        getTree: () => ['div', left.getTree(), right.getTree()],
        getJs: () => '(' + left.getJs() + ' / ' + right.getJs() + ')'
    };
};

JS.mod = (left, right) => {

    return {
        getTree: () => ['mod', left.getTree(), right.getTree()],
        getJs: () => '(' + left.getJs() + ' % ' + right.getJs() + ')'
    };
};

JS.inc = (expr) => {

    return {
        getTree: () => ['inc', expr.getTree()],
        getJs: () => '(' + expr.getJs() + '++' + ')'
    };
};

JS.dec = (expr) => {

    return {
        getTree: () => ['dec', expr.getTree()],
        getJs: () => '(' + expr.getJs() + '--' + ')'
    };
};

JS.not = (expr) => {

    return {
        getTree: () => ['not', expr.getTree()],
        getJs: () => '(!' + expr.getJs() + ')'
    };
};

JS.exprStmt = (expr) => {

    return {
        getTree: () => ['expr-stmt', expr.getTree()],
        getJs: () =>  expr.getJs() + ';'
    };
};

JS.assign = (lvalue, rvalue) => {

    return {
        getTree: () => ['assign', lvalue.getTree(), rvalue.getTree()],
        getJs: () =>  `${lvalue.getJs()} = ${rvalue.getJs()}`
    };
};

JS.mulAssign = (lvalue, rvalue) => {

    return {
        getTree: () => ['mul-assign', lvalue.getTree(), rvalue.getTree()],
        getJs: () =>  `${lvalue.getJs()} *= ${rvalue.getJs()}`
    };
};

JS.fnCall = (fnExpr, args) => {

    return {
        getTree: () => ['call', fnExpr.getTree(), args.map(arg => arg.getTree())],
        getJs: () => fnExpr.getJs() + '(' + args.map(arg => arg.getJs()).join(', ') + ')'
    };
};

JS.fnDef = (params, body, name) => {

    return {
        getTree: () => ['function', name || null, params, body.getTree()],
        getJs: () => 'function (' + params.join(', ') + ') {\n\n' + body.getJs() + '\n}'
    };
};

JS.stmtList = (head, tail) => {
    
    return {

        getTree: function () {
            return tail ? ['stmtList', head.getTree(), tail.getTree()] : ['stmtList', head.getTree()];
        },

        getJs: function () {
            return head.getJs() + (tail ? '\n' + tail.getJs() : '');
        }
    };
};

JS.varDecl = (name, value) => {

    return {
        getTree: () => value ? ['var', name, value.getTree()] : ['var', name],
        getJs: () => 'var ' + name + (value ? ' = ' + value.getJs() : '') + ';'
    };
};

JS.constDecl = (name, value) => {

    return {
        getTree: () => ['const', name, value.getTree()],
        getJs: () => 'const ' + name + ' = ' + value.getJs() + ';'
    };
};

JS.return = (expr) => {

    return {
        getTree: () => expr ? ['return', expr.getTree()] : ['return'],
        getJs: () => 'return' + (expr ? ' ' + expr.getJs() : '') + ';'
    };
};

JS.cond = (predicate, consequent, alt) => {

    return {
        getTree: () => ['if', predicate.getTree(), consequent.getTree()].concat(alt ? alt.getTree() : []),
        getJs: () => 'if (' + predicate.getJs() + ') {\n' + consequent.getJs() + '\n}'
    }
};

JS.while = (condition, body) => {

    return {
        getTree: () => ['while', condition.getTree(), body.getTree()],
        getJs: () => 'while (' + condition.getJs() + ') {\n' + body.getJs() + '\n}'
    }
};

// not-quite-primitives - do we need these here?

JS.runtimeCall = (fnName, args) => {

    return JS.fnCall(
        JS.select(JS.ID('task'), fnName),
        args);
};

JS.message = (target, args, subsequent, contingency) => {

    return JS.runtimeCall('sendMessage', [target, JS.arrayLiteral(args)]);
};

module.exports = JS;
