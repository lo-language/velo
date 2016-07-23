/**
 * Created by spurcell on 6/25/16.
 */

const JsKit = require('./JsKit')
const JsStmt = require('./JsStmt');
// const JsBuilder = require('./JsBuilder');
// const Message = require('./Message');
const StmtList = require('./StmtList');
const JS = JsKit.parts;



// stmtList = new StmtList(new Message(['id','$foo'], [['num', '42']], ['null'], ['null'], true));
// stmtList.attach(new JsStmt(['assignment', ['id', '$foo'], ['num', '42']]));
// stmtList.attach(new JsStmt(['assignment', ['id', '$bar'], ['num', '57']]));

// each of these functions returns an AST array except stmt() which returns an object?

// JS.stmt(JS.assign(JS.ID('$bar'), JS.num('57')));

// we can't render the JS AST before we're done attaching things... so we need a build phase that keeps the objects around
// when can we render it?


var ast = JS.stmt(JS.assign(JS.ID('$bar'), JS.num('57')));

console.log(JsKit.render(ast));