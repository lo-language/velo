// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');
var exaVisitor = require('./exaVisitor').exaVisitor;

var grammarFileName = "exa.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003B\u015b\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0003\u0002\u0005\u0002*\n\u0002\u0003\u0002\u0006\u0002-\n\u0002",
    "\r\u0002\u000e\u0002.\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0006\u00037\n\u0003\r\u0003\u000e\u00038\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004?\n\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0005\u0005D\n\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0005\u0005T\n\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005]\n\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005",
    "\u0005k\n\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0005\u0006s\n\u0006\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\t\u008c\n\t\u0003\n\u0003\n",
    "\u0005\n\u0090\n\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0005\u000b\u0099\n\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00b3",
    "\n\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0006\u000b\u00bb\n\u000b\r\u000b\u000e\u000b\u00bc\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00c9\n\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00e0\n\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00ed",
    "\n\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0007\u000b\u00f4\n\u000b\f\u000b\u000e\u000b\u00f7\u000b\u000b\u0003",
    "\f\u0003\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u0104\n\u000e\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0007\u000f\u0109\n\u000f\f\u000f\u000e\u000f",
    "\u010c\u000b\u000f\u0003\u000f\u0005\u000f\u010f\n\u000f\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010",
    "\u0117\n\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010\u0122",
    "\n\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0005\u0010\u012a\n\u0010\u0003\u0011\u0003\u0011\u0005",
    "\u0011\u012e\n\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0011\u0007\u0011\u0135\n\u0011\f\u0011\u000e\u0011\u0138\u000b",
    "\u0011\u0005\u0011\u013a\n\u0011\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0007\u0012\u0140\n\u0012\f\u0012\u000e\u0012\u0143\u000b",
    "\u0012\u0003\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003",
    "\u0013\u0005\u0013\u014b\n\u0013\u0006\u0013\u014d\n\u0013\r\u0013\u000e",
    "\u0013\u014e\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0005\u0014",
    "\u0155\n\u0014\u0006\u0014\u0157\n\u0014\r\u0014\u000e\u0014\u0158\u0003",
    "\u0014\u0002\u0003\u0014\u0015\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012",
    "\u0014\u0016\u0018\u001a\u001c\u001e \"$&\u0002\n\u0003\u0002\u0003",
    "\u0004\u0003\u0002\u0005\u0007\u0003\u0002\t\n\u0003\u0002\u0011\u0016",
    "\u0003\u0002\u001c\u001e\u0003\u0002\u001f \u0003\u0002!&\u0003\u0002",
    "\'(\u018d\u0002)\u0003\u0002\u0002\u0002\u00042\u0003\u0002\u0002\u0002",
    "\u0006>\u0003\u0002\u0002\u0002\bj\u0003\u0002\u0002\u0002\nr\u0003",
    "\u0002\u0002\u0002\ft\u0003\u0002\u0002\u0002\u000ey\u0003\u0002\u0002",
    "\u0002\u0010\u008b\u0003\u0002\u0002\u0002\u0012\u008d\u0003\u0002\u0002",
    "\u0002\u0014\u00c8\u0003\u0002\u0002\u0002\u0016\u00f8\u0003\u0002\u0002",
    "\u0002\u0018\u00fa\u0003\u0002\u0002\u0002\u001a\u0103\u0003\u0002\u0002",
    "\u0002\u001c\u0105\u0003\u0002\u0002\u0002\u001e\u0129\u0003\u0002\u0002",
    "\u0002 \u0139\u0003\u0002\u0002\u0002\"\u013b\u0003\u0002\u0002\u0002",
    "$\u014c\u0003\u0002\u0002\u0002&\u0156\u0003\u0002\u0002\u0002(*\u0005",
    "\u0004\u0003\u0002)(\u0003\u0002\u0002\u0002)*\u0003\u0002\u0002\u0002",
    "*,\u0003\u0002\u0002\u0002+-\u0005\f\u0007\u0002,+\u0003\u0002\u0002",
    "\u0002-.\u0003\u0002\u0002\u0002.,\u0003\u0002\u0002\u0002./\u0003\u0002",
    "\u0002\u0002/0\u0003\u0002\u0002\u000201\u0007\u0002\u0002\u00031\u0003",
    "\u0003\u0002\u0002\u000223\t\u0002\u0002\u000236\u0007;\u0002\u0002",
    "45\u0007=\u0002\u000257\u0007B\u0002\u000264\u0003\u0002\u0002\u0002",
    "78\u0003\u0002\u0002\u000286\u0003\u0002\u0002\u000289\u0003\u0002\u0002",
    "\u00029\u0005\u0003\u0002\u0002\u0002:?\u0005\b\u0005\u0002;<\u0005",
    "\b\u0005\u0002<=\u0005\u0006\u0004\u0002=?\u0003\u0002\u0002\u0002>",
    ":\u0003\u0002\u0002\u0002>;\u0003\u0002\u0002\u0002?\u0007\u0003\u0002",
    "\u0002\u0002@k\u0005\f\u0007\u0002AC\t\u0003\u0002\u0002BD\u0005\u001c",
    "\u000f\u0002CB\u0003\u0002\u0002\u0002CD\u0003\u0002\u0002\u0002DE\u0003",
    "\u0002\u0002\u0002Ek\u0007\b\u0002\u0002FG\u0005\u0014\u000b\u0002G",
    "H\u0005\u000e\b\u0002HI\u0005\u0014\u000b\u0002IJ\u0007\b\u0002\u0002",
    "Jk\u0003\u0002\u0002\u0002KL\u0005\u0014\u000b\u0002LM\t\u0004\u0002",
    "\u0002MN\u0007\b\u0002\u0002Nk\u0003\u0002\u0002\u0002Ok\u0005\u0010",
    "\t\u0002PQ\u0005\u0014\u000b\u0002QS\u0007\u000b\u0002\u0002RT\u0005",
    "\u001c\u000f\u0002SR\u0003\u0002\u0002\u0002ST\u0003\u0002\u0002\u0002",
    "TU\u0003\u0002\u0002\u0002UV\u0007\f\u0002\u0002VW\u0005\n\u0006\u0002",
    "Wk\u0003\u0002\u0002\u0002XY\u0007\r\u0002\u0002YZ\u0005\u0014\u000b",
    "\u0002Z\\\u0007\u000b\u0002\u0002[]\u0005\u001c\u000f\u0002\\[\u0003",
    "\u0002\u0002\u0002\\]\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002",
    "^_\u0007\f\u0002\u0002_`\u0005\n\u0006\u0002`k\u0003\u0002\u0002\u0002",
    "ab\u0005\u0014\u000b\u0002bc\u0007\u000e\u0002\u0002cd\u0005\u0014\u000b",
    "\u0002de\u0007\b\u0002\u0002ek\u0003\u0002\u0002\u0002fg\u0007\u000f",
    "\u0002\u0002gh\u0005\u0014\u000b\u0002hi\u0005\u0012\n\u0002ik\u0003",
    "\u0002\u0002\u0002j@\u0003\u0002\u0002\u0002jA\u0003\u0002\u0002\u0002",
    "jF\u0003\u0002\u0002\u0002jK\u0003\u0002\u0002\u0002jO\u0003\u0002\u0002",
    "\u0002jP\u0003\u0002\u0002\u0002jX\u0003\u0002\u0002\u0002ja\u0003\u0002",
    "\u0002\u0002jf\u0003\u0002\u0002\u0002k\t\u0003\u0002\u0002\u0002ls",
    "\u0007\b\u0002\u0002ms\u0005\u0016\f\u0002ns\u0005\u0018\r\u0002op\u0005",
    "\u0016\f\u0002pq\u0005\u0018\r\u0002qs\u0003\u0002\u0002\u0002rl\u0003",
    "\u0002\u0002\u0002rm\u0003\u0002\u0002\u0002rn\u0003\u0002\u0002\u0002",
    "ro\u0003\u0002\u0002\u0002s\u000b\u0003\u0002\u0002\u0002tu\u0007=\u0002",
    "\u0002uv\u0007\u0010\u0002\u0002vw\u0005\u001e\u0010\u0002wx\u0007\b",
    "\u0002\u0002x\r\u0003\u0002\u0002\u0002yz\t\u0005\u0002\u0002z\u000f",
    "\u0003\u0002\u0002\u0002{|\u0007\u0017\u0002\u0002|}\u0005\u0014\u000b",
    "\u0002}~\u0005\u0012\n\u0002~\u008c\u0003\u0002\u0002\u0002\u007f\u0080",
    "\u0007\u0017\u0002\u0002\u0080\u0081\u0005\u0014\u000b\u0002\u0081\u0082",
    "\u0005\u0012\n\u0002\u0082\u0083\u0007\u0018\u0002\u0002\u0083\u0084",
    "\u0005\u0012\n\u0002\u0084\u008c\u0003\u0002\u0002\u0002\u0085\u0086",
    "\u0007\u0017\u0002\u0002\u0086\u0087\u0005\u0014\u000b\u0002\u0087\u0088",
    "\u0005\u0012\n\u0002\u0088\u0089\u0007\u0018\u0002\u0002\u0089\u008a",
    "\u0005\u0010\t\u0002\u008a\u008c\u0003\u0002\u0002\u0002\u008b{\u0003",
    "\u0002\u0002\u0002\u008b\u007f\u0003\u0002\u0002\u0002\u008b\u0085\u0003",
    "\u0002\u0002\u0002\u008c\u0011\u0003\u0002\u0002\u0002\u008d\u008f\u0007",
    "6\u0002\u0002\u008e\u0090\u0005\u0006\u0004\u0002\u008f\u008e\u0003",
    "\u0002\u0002\u0002\u008f\u0090\u0003\u0002\u0002\u0002\u0090\u0091\u0003",
    "\u0002\u0002\u0002\u0091\u0092\u00077\u0002\u0002\u0092\u0013\u0003",
    "\u0002\u0002\u0002\u0093\u0094\b\u000b\u0001\u0002\u0094\u0095\u0007",
    "\r\u0002\u0002\u0095\u0096\u0005\u0014\u000b\u0002\u0096\u0098\u0007",
    "\u000b\u0002\u0002\u0097\u0099\u0005\u001c\u000f\u0002\u0098\u0097\u0003",
    "\u0002\u0002\u0002\u0098\u0099\u0003\u0002\u0002\u0002\u0099\u009a\u0003",
    "\u0002\u0002\u0002\u009a\u009b\u0007\f\u0002\u0002\u009b\u00c9\u0003",
    "\u0002\u0002\u0002\u009c\u009d\u0007\u0019\u0002\u0002\u009d\u00c9\u0005",
    "\u0014\u000b\u0016\u009e\u009f\u0007\u001a\u0002\u0002\u009f\u00c9\u0005",
    "\u0014\u000b\u0015\u00a0\u00a1\u0007\u001b\u0002\u0002\u00a1\u00c9\u0005",
    "\u0014\u000b\u0014\u00a2\u00a3\u0007\u000b\u0002\u0002\u00a3\u00a4\u0005",
    "\u0014\u000b\u0002\u00a4\u00a5\u0007\f\u0002\u0002\u00a5\u00c9\u0003",
    "\u0002\u0002\u0002\u00a6\u00a7\u0007.\u0002\u0002\u00a7\u00a8\u0005",
    "\u0014\u000b\u0002\u00a8\u00a9\u0007+\u0002\u0002\u00a9\u00aa\u0005",
    "\u0014\u000b\u0002\u00aa\u00ab\u0007,\u0002\u0002\u00ab\u00c9\u0003",
    "\u0002\u0002\u0002\u00ac\u00ad\u0007.\u0002\u0002\u00ad\u00ae\u0005",
    "\u0014\u000b\u0002\u00ae\u00af\u0007+\u0002\u0002\u00af\u00b0\u0005",
    "\u0014\u000b\u0002\u00b0\u00b2\u0007-\u0002\u0002\u00b1\u00b3\u0005",
    "\u0014\u000b\u0002\u00b2\u00b1\u0003\u0002\u0002\u0002\u00b2\u00b3\u0003",
    "\u0002\u0002\u0002\u00b3\u00b4\u0003\u0002\u0002\u0002\u00b4\u00b5\u0007",
    ",\u0002\u0002\u00b5\u00c9\u0003\u0002\u0002\u0002\u00b6\u00b7\u0007",
    "\u000b\u0002\u0002\u00b7\u00ba\u0007=\u0002\u0002\u00b8\u00b9\u0007",
    "0\u0002\u0002\u00b9\u00bb\u0007=\u0002\u0002\u00ba\u00b8\u0003\u0002",
    "\u0002\u0002\u00bb\u00bc\u0003\u0002\u0002\u0002\u00bc\u00ba\u0003\u0002",
    "\u0002\u0002\u00bc\u00bd\u0003\u0002\u0002\u0002\u00bd\u00be\u0003\u0002",
    "\u0002\u0002\u00be\u00c9\u0007\f\u0002\u0002\u00bf\u00c0\u0007?\u0002",
    "\u0002\u00c0\u00c1\u0005\u001a\u000e\u0002\u00c1\u00c2\u0007A\u0002",
    "\u0002\u00c2\u00c9\u0003\u0002\u0002\u0002\u00c3\u00c9\u0005\u001e\u0010",
    "\u0002\u00c4\u00c5\u0007=\u0002\u0002\u00c5\u00c6\u0007;\u0002\u0002",
    "\u00c6\u00c9\u0007=\u0002\u0002\u00c7\u00c9\u0007=\u0002\u0002\u00c8",
    "\u0093\u0003\u0002\u0002\u0002\u00c8\u009c\u0003\u0002\u0002\u0002\u00c8",
    "\u009e\u0003\u0002\u0002\u0002\u00c8\u00a0\u0003\u0002\u0002\u0002\u00c8",
    "\u00a2\u0003\u0002\u0002\u0002\u00c8\u00a6\u0003\u0002\u0002\u0002\u00c8",
    "\u00ac\u0003\u0002\u0002\u0002\u00c8\u00b6\u0003\u0002\u0002\u0002\u00c8",
    "\u00bf\u0003\u0002\u0002\u0002\u00c8\u00c3\u0003\u0002\u0002\u0002\u00c8",
    "\u00c4\u0003\u0002\u0002\u0002\u00c8\u00c7\u0003\u0002\u0002\u0002\u00c9",
    "\u00f5\u0003\u0002\u0002\u0002\u00ca\u00cb\f\u0013\u0002\u0002\u00cb",
    "\u00cc\t\u0006\u0002\u0002\u00cc\u00f4\u0005\u0014\u000b\u0014\u00cd",
    "\u00ce\f\u0012\u0002\u0002\u00ce\u00cf\t\u0007\u0002\u0002\u00cf\u00f4",
    "\u0005\u0014\u000b\u0013\u00d0\u00d1\f\u0011\u0002\u0002\u00d1\u00d2",
    "\t\b\u0002\u0002\u00d2\u00f4\u0005\u0014\u000b\u0012\u00d3\u00d4\f\u0010",
    "\u0002\u0002\u00d4\u00d5\t\t\u0002\u0002\u00d5\u00f4\u0005\u0014\u000b",
    "\u0011\u00d6\u00d7\f\u000f\u0002\u0002\u00d7\u00d8\u0007)\u0002\u0002",
    "\u00d8\u00f4\u0005\u0014\u000b\u0010\u00d9\u00da\f\u000e\u0002\u0002",
    "\u00da\u00db\u0007*\u0002\u0002\u00db\u00f4\u0005\u0014\u000b\u000f",
    "\u00dc\u00dd\f\u0018\u0002\u0002\u00dd\u00df\u0007\u000b\u0002\u0002",
    "\u00de\u00e0\u0005\u001c\u000f\u0002\u00df\u00de\u0003\u0002\u0002\u0002",
    "\u00df\u00e0\u0003\u0002\u0002\u0002\u00e0\u00e1\u0003\u0002\u0002\u0002",
    "\u00e1\u00f4\u0007\f\u0002\u0002\u00e2\u00e3\f\f\u0002\u0002\u00e3\u00e4",
    "\u0007+\u0002\u0002\u00e4\u00e5\u0005\u0014\u000b\u0002\u00e5\u00e6",
    "\u0007,\u0002\u0002\u00e6\u00f4\u0003\u0002\u0002\u0002\u00e7\u00e8",
    "\f\u000b\u0002\u0002\u00e8\u00e9\u0007+\u0002\u0002\u00e9\u00ea\u0005",
    "\u0014\u000b\u0002\u00ea\u00ec\u0007-\u0002\u0002\u00eb\u00ed\u0005",
    "\u0014\u000b\u0002\u00ec\u00eb\u0003\u0002\u0002\u0002\u00ec\u00ed\u0003",
    "\u0002\u0002\u0002\u00ed\u00ee\u0003\u0002\u0002\u0002\u00ee\u00ef\u0007",
    ",\u0002\u0002\u00ef\u00f4\u0003\u0002\u0002\u0002\u00f0\u00f1\f\b\u0002",
    "\u0002\u00f1\u00f2\u0007/\u0002\u0002\u00f2\u00f4\u0007=\u0002\u0002",
    "\u00f3\u00ca\u0003\u0002\u0002\u0002\u00f3\u00cd\u0003\u0002\u0002\u0002",
    "\u00f3\u00d0\u0003\u0002\u0002\u0002\u00f3\u00d3\u0003\u0002\u0002\u0002",
    "\u00f3\u00d6\u0003\u0002\u0002\u0002\u00f3\u00d9\u0003\u0002\u0002\u0002",
    "\u00f3\u00dc\u0003\u0002\u0002\u0002\u00f3\u00e2\u0003\u0002\u0002\u0002",
    "\u00f3\u00e7\u0003\u0002\u0002\u0002\u00f3\u00f0\u0003\u0002\u0002\u0002",
    "\u00f4\u00f7\u0003\u0002\u0002\u0002\u00f5\u00f3\u0003\u0002\u0002\u0002",
    "\u00f5\u00f6\u0003\u0002\u0002\u0002\u00f6\u0015\u0003\u0002\u0002\u0002",
    "\u00f7\u00f5\u0003\u0002\u0002\u0002\u00f8\u00f9\u0005 \u0011\u0002",
    "\u00f9\u0017\u0003\u0002\u0002\u0002\u00fa\u00fb\u00071\u0002\u0002",
    "\u00fb\u00fc\u0007\u0006\u0002\u0002\u00fc\u00fd\u0005 \u0011\u0002",
    "\u00fd\u0019\u0003\u0002\u0002\u0002\u00fe\u0104\u0005\u0014\u000b\u0002",
    "\u00ff\u0100\u0005\u0014\u000b\u0002\u0100\u0101\u0007@\u0002\u0002",
    "\u0101\u0102\u0005\u001a\u000e\u0002\u0102\u0104\u0003\u0002\u0002\u0002",
    "\u0103\u00fe\u0003\u0002\u0002\u0002\u0103\u00ff\u0003\u0002\u0002\u0002",
    "\u0104\u001b\u0003\u0002\u0002\u0002\u0105\u010a\u0005\u0014\u000b\u0002",
    "\u0106\u0107\u00070\u0002\u0002\u0107\u0109\u0005\u0014\u000b\u0002",
    "\u0108\u0106\u0003\u0002\u0002\u0002\u0109\u010c\u0003\u0002\u0002\u0002",
    "\u010a\u0108\u0003\u0002\u0002\u0002\u010a\u010b\u0003\u0002\u0002\u0002",
    "\u010b\u010e\u0003\u0002\u0002\u0002\u010c\u010a\u0003\u0002\u0002\u0002",
    "\u010d\u010f\u00070\u0002\u0002\u010e\u010d\u0003\u0002\u0002\u0002",
    "\u010e\u010f\u0003\u0002\u0002\u0002\u010f\u001d\u0003\u0002\u0002\u0002",
    "\u0110\u012a\u00078\u0002\u0002\u0111\u012a\u00079\u0002\u0002\u0112",
    "\u012a\u0007<\u0002\u0002\u0113\u012a\u0007>\u0002\u0002\u0114\u0116",
    "\u0007+\u0002\u0002\u0115\u0117\u0005\u001c\u000f\u0002\u0116\u0115",
    "\u0003\u0002\u0002\u0002\u0116\u0117\u0003\u0002\u0002\u0002\u0117\u0118",
    "\u0003\u0002\u0002\u0002\u0118\u012a\u0007,\u0002\u0002\u0119\u011a",
    "\u0007+\u0002\u0002\u011a\u011b\u0005$\u0013\u0002\u011b\u011c\u0007",
    ",\u0002\u0002\u011c\u012a\u0003\u0002\u0002\u0002\u011d\u0121\u0007",
    "6\u0002\u0002\u011e\u0122\u0007:\u0002\u0002\u011f\u0122\u0005\u001c",
    "\u000f\u0002\u0120\u0122\u0005&\u0014\u0002\u0121\u011e\u0003\u0002",
    "\u0002\u0002\u0121\u011f\u0003\u0002\u0002\u0002\u0121\u0120\u0003\u0002",
    "\u0002\u0002\u0121\u0122\u0003\u0002\u0002\u0002\u0122\u0123\u0003\u0002",
    "\u0002\u0002\u0123\u012a\u00077\u0002\u0002\u0124\u012a\u0005 \u0011",
    "\u0002\u0125\u0126\u00071\u0002\u0002\u0126\u0127\u0005\u0014\u000b",
    "\u0002\u0127\u0128\u0005 \u0011\u0002\u0128\u012a\u0003\u0002\u0002",
    "\u0002\u0129\u0110\u0003\u0002\u0002\u0002\u0129\u0111\u0003\u0002\u0002",
    "\u0002\u0129\u0112\u0003\u0002\u0002\u0002\u0129\u0113\u0003\u0002\u0002",
    "\u0002\u0129\u0114\u0003\u0002\u0002\u0002\u0129\u0119\u0003\u0002\u0002",
    "\u0002\u0129\u011d\u0003\u0002\u0002\u0002\u0129\u0124\u0003\u0002\u0002",
    "\u0002\u0129\u0125\u0003\u0002\u0002\u0002\u012a\u001f\u0003\u0002\u0002",
    "\u0002\u012b\u012d\u00072\u0002\u0002\u012c\u012e\u0005\"\u0012\u0002",
    "\u012d\u012c\u0003\u0002\u0002\u0002\u012d\u012e\u0003\u0002\u0002\u0002",
    "\u012e\u012f\u0003\u0002\u0002\u0002\u012f\u013a\u0005\u0012\n\u0002",
    "\u0130\u0131\u00072\u0002\u0002\u0131\u0136\u0007=\u0002\u0002\u0132",
    "\u0133\u00070\u0002\u0002\u0133\u0135\u0007=\u0002\u0002\u0134\u0132",
    "\u0003\u0002\u0002\u0002\u0135\u0138\u0003\u0002\u0002\u0002\u0136\u0134",
    "\u0003\u0002\u0002\u0002\u0136\u0137\u0003\u0002\u0002\u0002\u0137\u013a",
    "\u0003\u0002\u0002\u0002\u0138\u0136\u0003\u0002\u0002\u0002\u0139\u012b",
    "\u0003\u0002\u0002\u0002\u0139\u0130\u0003\u0002\u0002\u0002\u013a!",
    "\u0003\u0002\u0002\u0002\u013b\u013c\u0007\u000b\u0002\u0002\u013c\u0141",
    "\u0007=\u0002\u0002\u013d\u013e\u00070\u0002\u0002\u013e\u0140\u0007",
    "=\u0002\u0002\u013f\u013d\u0003\u0002\u0002\u0002\u0140\u0143\u0003",
    "\u0002\u0002\u0002\u0141\u013f\u0003\u0002\u0002\u0002\u0141\u0142\u0003",
    "\u0002\u0002\u0002\u0142\u0144\u0003\u0002\u0002\u0002\u0143\u0141\u0003",
    "\u0002\u0002\u0002\u0144\u0145\u0007\f\u0002\u0002\u0145#\u0003\u0002",
    "\u0002\u0002\u0146\u0147\u0007=\u0002\u0002\u0147\u0148\u0007;\u0002",
    "\u0002\u0148\u014a\u0005\u0014\u000b\u0002\u0149\u014b\u00070\u0002",
    "\u0002\u014a\u0149\u0003\u0002\u0002\u0002\u014a\u014b\u0003\u0002\u0002",
    "\u0002\u014b\u014d\u0003\u0002\u0002\u0002\u014c\u0146\u0003\u0002\u0002",
    "\u0002\u014d\u014e\u0003\u0002\u0002\u0002\u014e\u014c\u0003\u0002\u0002",
    "\u0002\u014e\u014f\u0003\u0002\u0002\u0002\u014f%\u0003\u0002\u0002",
    "\u0002\u0150\u0151\u0005\u0014\u000b\u0002\u0151\u0152\u0007:\u0002",
    "\u0002\u0152\u0154\u0005\u0014\u000b\u0002\u0153\u0155\u00070\u0002",
    "\u0002\u0154\u0153\u0003\u0002\u0002\u0002\u0154\u0155\u0003\u0002\u0002",
    "\u0002\u0155\u0157\u0003\u0002\u0002\u0002\u0156\u0150\u0003\u0002\u0002",
    "\u0002\u0157\u0158\u0003\u0002\u0002\u0002\u0158\u0156\u0003\u0002\u0002",
    "\u0002\u0158\u0159\u0003\u0002\u0002\u0002\u0159\'\u0003\u0002\u0002",
    "\u0002#).8>CS\\jr\u008b\u008f\u0098\u00b2\u00bc\u00c8\u00df\u00ec\u00f3",
    "\u00f5\u0103\u010a\u010e\u0116\u0121\u0129\u012d\u0136\u0139\u0141\u014a",
    "\u014e\u0154\u0158"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'references'", "'refs'", "'reply'", "'fail'", 
                     "'substitute'", "';'", "'++'", "'--'", "'('", "')'", 
                     "'@'", "'>>'", "'while'", "'is'", "'='", "'+='", "'-='", 
                     "'*='", "'/='", "'%='", "'if'", "'else'", "'#'", "'not'", 
                     "'bytes'", "'*'", "'/'", "'%'", "'+'", "'-'", "'<'", 
                     "'>'", "'<='", "'>='", "'=='", "'!='", "'and'", "'or'", 
                     "'in'", "'><'", "'['", "']'", "'..'", "'cut'", "'.'", 
                     "','", "'on'", "'->'", null, null, null, "'{'", "'}'", 
                     "'nil'", null, "'=>'", "':'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, "WS", "LINE_COMMENT", "COMMENT", 
                      "BEGIN", "END", "NIL", "BOOL", "PAIR_SEP", "FIELD_SEP", 
                      "NUMBER", "ID", "STRING", "INTER_BEGIN", "INTER_MID", 
                      "INTER_END", "MODREF" ];

var ruleNames =  [ "module", "references", "statementList", "statement", 
                   "handlers", "definition", "assignment_op", "conditional", 
                   "block", "expr", "replyHandler", "failHandler", "interpolated", 
                   "exprList", "literal", "procedure", "paramList", "fieldList", 
                   "pairList" ];

function exaParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

exaParser.prototype = Object.create(antlr4.Parser.prototype);
exaParser.prototype.constructor = exaParser;

Object.defineProperty(exaParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

exaParser.EOF = antlr4.Token.EOF;
exaParser.T__0 = 1;
exaParser.T__1 = 2;
exaParser.T__2 = 3;
exaParser.T__3 = 4;
exaParser.T__4 = 5;
exaParser.T__5 = 6;
exaParser.T__6 = 7;
exaParser.T__7 = 8;
exaParser.T__8 = 9;
exaParser.T__9 = 10;
exaParser.T__10 = 11;
exaParser.T__11 = 12;
exaParser.T__12 = 13;
exaParser.T__13 = 14;
exaParser.T__14 = 15;
exaParser.T__15 = 16;
exaParser.T__16 = 17;
exaParser.T__17 = 18;
exaParser.T__18 = 19;
exaParser.T__19 = 20;
exaParser.T__20 = 21;
exaParser.T__21 = 22;
exaParser.T__22 = 23;
exaParser.T__23 = 24;
exaParser.T__24 = 25;
exaParser.T__25 = 26;
exaParser.T__26 = 27;
exaParser.T__27 = 28;
exaParser.T__28 = 29;
exaParser.T__29 = 30;
exaParser.T__30 = 31;
exaParser.T__31 = 32;
exaParser.T__32 = 33;
exaParser.T__33 = 34;
exaParser.T__34 = 35;
exaParser.T__35 = 36;
exaParser.T__36 = 37;
exaParser.T__37 = 38;
exaParser.T__38 = 39;
exaParser.T__39 = 40;
exaParser.T__40 = 41;
exaParser.T__41 = 42;
exaParser.T__42 = 43;
exaParser.T__43 = 44;
exaParser.T__44 = 45;
exaParser.T__45 = 46;
exaParser.T__46 = 47;
exaParser.T__47 = 48;
exaParser.WS = 49;
exaParser.LINE_COMMENT = 50;
exaParser.COMMENT = 51;
exaParser.BEGIN = 52;
exaParser.END = 53;
exaParser.NIL = 54;
exaParser.BOOL = 55;
exaParser.PAIR_SEP = 56;
exaParser.FIELD_SEP = 57;
exaParser.NUMBER = 58;
exaParser.ID = 59;
exaParser.STRING = 60;
exaParser.INTER_BEGIN = 61;
exaParser.INTER_MID = 62;
exaParser.INTER_END = 63;
exaParser.MODREF = 64;

exaParser.RULE_module = 0;
exaParser.RULE_references = 1;
exaParser.RULE_statementList = 2;
exaParser.RULE_statement = 3;
exaParser.RULE_handlers = 4;
exaParser.RULE_definition = 5;
exaParser.RULE_assignment_op = 6;
exaParser.RULE_conditional = 7;
exaParser.RULE_block = 8;
exaParser.RULE_expr = 9;
exaParser.RULE_replyHandler = 10;
exaParser.RULE_failHandler = 11;
exaParser.RULE_interpolated = 12;
exaParser.RULE_exprList = 13;
exaParser.RULE_literal = 14;
exaParser.RULE_procedure = 15;
exaParser.RULE_paramList = 16;
exaParser.RULE_fieldList = 17;
exaParser.RULE_pairList = 18;

function ModuleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_module;
    return this;
}

ModuleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleContext.prototype.constructor = ModuleContext;

ModuleContext.prototype.EOF = function() {
    return this.getToken(exaParser.EOF, 0);
};

ModuleContext.prototype.references = function() {
    return this.getTypedRuleContext(ReferencesContext,0);
};

ModuleContext.prototype.definition = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DefinitionContext);
    } else {
        return this.getTypedRuleContext(DefinitionContext,i);
    }
};

ModuleContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitModule(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.ModuleContext = ModuleContext;

exaParser.prototype.module = function() {

    var localctx = new ModuleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, exaParser.RULE_module);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 39;
        _la = this._input.LA(1);
        if(_la===exaParser.T__0 || _la===exaParser.T__1) {
            this.state = 38;
            this.references();
        }

        this.state = 42; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 41;
            this.definition();
            this.state = 44; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===exaParser.ID);
        this.state = 46;
        this.match(exaParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ReferencesContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_references;
    return this;
}

ReferencesContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReferencesContext.prototype.constructor = ReferencesContext;

ReferencesContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.ID);
    } else {
        return this.getToken(exaParser.ID, i);
    }
};


ReferencesContext.prototype.MODREF = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.MODREF);
    } else {
        return this.getToken(exaParser.MODREF, i);
    }
};


ReferencesContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitReferences(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.ReferencesContext = ReferencesContext;

exaParser.prototype.references = function() {

    var localctx = new ReferencesContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, exaParser.RULE_references);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 48;
        _la = this._input.LA(1);
        if(!(_la===exaParser.T__0 || _la===exaParser.T__1)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
        this.state = 49;
        this.match(exaParser.FIELD_SEP);
        this.state = 52; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 50;
        		this.match(exaParser.ID);
        		this.state = 51;
        		this.match(exaParser.MODREF);
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 54; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,2, this._ctx);
        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StatementListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_statementList;
    return this;
}

StatementListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementListContext.prototype.constructor = StatementListContext;

StatementListContext.prototype.statement = function() {
    return this.getTypedRuleContext(StatementContext,0);
};

StatementListContext.prototype.statementList = function() {
    return this.getTypedRuleContext(StatementListContext,0);
};

StatementListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitStatementList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.StatementListContext = StatementListContext;

exaParser.prototype.statementList = function() {

    var localctx = new StatementListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, exaParser.RULE_statementList);
    try {
        this.state = 60;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 56;
            this.statement();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 57;
            this.statement();
            this.state = 58;
            this.statementList();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_statement;
    return this;
}

StatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementContext.prototype.constructor = StatementContext;


 
StatementContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function DefStmtContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DefStmtContext.prototype = Object.create(StatementContext.prototype);
DefStmtContext.prototype.constructor = DefStmtContext;

exaParser.DefStmtContext = DefStmtContext;

DefStmtContext.prototype.definition = function() {
    return this.getTypedRuleContext(DefinitionContext,0);
};
DefStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDefStmt(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ResponseContext(parser, ctx) {
	StatementContext.call(this, parser);
    this.channel = null; // Token;
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ResponseContext.prototype = Object.create(StatementContext.prototype);
ResponseContext.prototype.constructor = ResponseContext;

exaParser.ResponseContext = ResponseContext;

ResponseContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
ResponseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitResponse(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AssignmentContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AssignmentContext.prototype = Object.create(StatementContext.prototype);
AssignmentContext.prototype.constructor = AssignmentContext;

exaParser.AssignmentContext = AssignmentContext;

AssignmentContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

AssignmentContext.prototype.assignment_op = function() {
    return this.getTypedRuleContext(Assignment_opContext,0);
};
AssignmentContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitAssignment(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function IterationContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IterationContext.prototype = Object.create(StatementContext.prototype);
IterationContext.prototype.constructor = IterationContext;

exaParser.IterationContext = IterationContext;

IterationContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

IterationContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};
IterationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitIteration(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function IncDecContext(parser, ctx) {
	StatementContext.call(this, parser);
    this.op = null; // Token;
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IncDecContext.prototype = Object.create(StatementContext.prototype);
IncDecContext.prototype.constructor = IncDecContext;

exaParser.IncDecContext = IncDecContext;

IncDecContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
IncDecContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitIncDec(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SyncReqStmtContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SyncReqStmtContext.prototype = Object.create(StatementContext.prototype);
SyncReqStmtContext.prototype.constructor = SyncReqStmtContext;

exaParser.SyncReqStmtContext = SyncReqStmtContext;

SyncReqStmtContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SyncReqStmtContext.prototype.handlers = function() {
    return this.getTypedRuleContext(HandlersContext,0);
};

SyncReqStmtContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
SyncReqStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSyncReqStmt(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AsyncReqStmtContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AsyncReqStmtContext.prototype = Object.create(StatementContext.prototype);
AsyncReqStmtContext.prototype.constructor = AsyncReqStmtContext;

exaParser.AsyncReqStmtContext = AsyncReqStmtContext;

AsyncReqStmtContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AsyncReqStmtContext.prototype.handlers = function() {
    return this.getTypedRuleContext(HandlersContext,0);
};

AsyncReqStmtContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
AsyncReqStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitAsyncReqStmt(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SendContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SendContext.prototype = Object.create(StatementContext.prototype);
SendContext.prototype.constructor = SendContext;

exaParser.SendContext = SendContext;

SendContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
SendContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSend(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function CondStmtContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CondStmtContext.prototype = Object.create(StatementContext.prototype);
CondStmtContext.prototype.constructor = CondStmtContext;

exaParser.CondStmtContext = CondStmtContext;

CondStmtContext.prototype.conditional = function() {
    return this.getTypedRuleContext(ConditionalContext,0);
};
CondStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitCondStmt(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.StatementContext = StatementContext;

exaParser.prototype.statement = function() {

    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, exaParser.RULE_statement);
    var _la = 0; // Token type
    try {
        this.state = 104;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        switch(la_) {
        case 1:
            localctx = new DefStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 62;
            this.definition();
            break;

        case 2:
            localctx = new ResponseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 63;
            localctx.channel = this._input.LT(1);
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__2) | (1 << exaParser.T__3) | (1 << exaParser.T__4))) !== 0))) {
                localctx.channel = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 65;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 64;
                this.exprList();
            }

            this.state = 67;
            this.match(exaParser.T__5);
            break;

        case 3:
            localctx = new AssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 68;
            this.expr(0);
            this.state = 69;
            this.assignment_op();
            this.state = 70;
            this.expr(0);
            this.state = 71;
            this.match(exaParser.T__5);
            break;

        case 4:
            localctx = new IncDecContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 73;
            this.expr(0);
            this.state = 74;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===exaParser.T__6 || _la===exaParser.T__7)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 75;
            this.match(exaParser.T__5);
            break;

        case 5:
            localctx = new CondStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 77;
            this.conditional();
            break;

        case 6:
            localctx = new SyncReqStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 78;
            this.expr(0);
            this.state = 79;
            this.match(exaParser.T__8);
            this.state = 81;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 80;
                this.exprList();
            }

            this.state = 83;
            this.match(exaParser.T__9);
            this.state = 84;
            this.handlers();
            break;

        case 7:
            localctx = new AsyncReqStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 86;
            this.match(exaParser.T__10);
            this.state = 87;
            this.expr(0);
            this.state = 88;
            this.match(exaParser.T__8);
            this.state = 90;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 89;
                this.exprList();
            }

            this.state = 92;
            this.match(exaParser.T__9);
            this.state = 93;
            this.handlers();
            break;

        case 8:
            localctx = new SendContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 95;
            this.expr(0);
            this.state = 96;
            this.match(exaParser.T__11);
            this.state = 97;
            this.expr(0);
            this.state = 98;
            this.match(exaParser.T__5);
            break;

        case 9:
            localctx = new IterationContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 100;
            this.match(exaParser.T__12);
            this.state = 101;
            this.expr(0);
            this.state = 102;
            this.block();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HandlersContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_handlers;
    return this;
}

HandlersContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HandlersContext.prototype.constructor = HandlersContext;

HandlersContext.prototype.replyHandler = function() {
    return this.getTypedRuleContext(ReplyHandlerContext,0);
};

HandlersContext.prototype.failHandler = function() {
    return this.getTypedRuleContext(FailHandlerContext,0);
};

HandlersContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitHandlers(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.HandlersContext = HandlersContext;

exaParser.prototype.handlers = function() {

    var localctx = new HandlersContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, exaParser.RULE_handlers);
    try {
        this.state = 112;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 106;
            this.match(exaParser.T__5);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 107;
            this.replyHandler();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 108;
            this.failHandler();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 109;
            this.replyHandler();
            this.state = 110;
            this.failHandler();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_definition;
    return this;
}

DefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DefinitionContext.prototype.constructor = DefinitionContext;


 
DefinitionContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function ConstantContext(parser, ctx) {
	DefinitionContext.call(this, parser);
    DefinitionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ConstantContext.prototype = Object.create(DefinitionContext.prototype);
ConstantContext.prototype.constructor = ConstantContext;

exaParser.ConstantContext = ConstantContext;

ConstantContext.prototype.ID = function() {
    return this.getToken(exaParser.ID, 0);
};

ConstantContext.prototype.literal = function() {
    return this.getTypedRuleContext(LiteralContext,0);
};
ConstantContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitConstant(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.DefinitionContext = DefinitionContext;

exaParser.prototype.definition = function() {

    var localctx = new DefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, exaParser.RULE_definition);
    try {
        localctx = new ConstantContext(this, localctx);
        this.enterOuterAlt(localctx, 1);
        this.state = 114;
        this.match(exaParser.ID);
        this.state = 115;
        this.match(exaParser.T__13);
        this.state = 116;
        this.literal();
        this.state = 117;
        this.match(exaParser.T__5);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Assignment_opContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_assignment_op;
    return this;
}

Assignment_opContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Assignment_opContext.prototype.constructor = Assignment_opContext;


Assignment_opContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitAssignment_op(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.Assignment_opContext = Assignment_opContext;

exaParser.prototype.assignment_op = function() {

    var localctx = new Assignment_opContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, exaParser.RULE_assignment_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 119;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__14) | (1 << exaParser.T__15) | (1 << exaParser.T__16) | (1 << exaParser.T__17) | (1 << exaParser.T__18) | (1 << exaParser.T__19))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ConditionalContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_conditional;
    return this;
}

ConditionalContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConditionalContext.prototype.constructor = ConditionalContext;


 
ConditionalContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function NestedIfContext(parser, ctx) {
	ConditionalContext.call(this, parser);
    ConditionalContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NestedIfContext.prototype = Object.create(ConditionalContext.prototype);
NestedIfContext.prototype.constructor = NestedIfContext;

exaParser.NestedIfContext = NestedIfContext;

NestedIfContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

NestedIfContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

NestedIfContext.prototype.conditional = function() {
    return this.getTypedRuleContext(ConditionalContext,0);
};
NestedIfContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitNestedIf(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function IfOnlyContext(parser, ctx) {
	ConditionalContext.call(this, parser);
    ConditionalContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IfOnlyContext.prototype = Object.create(ConditionalContext.prototype);
IfOnlyContext.prototype.constructor = IfOnlyContext;

exaParser.IfOnlyContext = IfOnlyContext;

IfOnlyContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

IfOnlyContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};
IfOnlyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitIfOnly(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function IfElseContext(parser, ctx) {
	ConditionalContext.call(this, parser);
    ConditionalContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IfElseContext.prototype = Object.create(ConditionalContext.prototype);
IfElseContext.prototype.constructor = IfElseContext;

exaParser.IfElseContext = IfElseContext;

IfElseContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

IfElseContext.prototype.block = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BlockContext);
    } else {
        return this.getTypedRuleContext(BlockContext,i);
    }
};
IfElseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitIfElse(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.ConditionalContext = ConditionalContext;

exaParser.prototype.conditional = function() {

    var localctx = new ConditionalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, exaParser.RULE_conditional);
    try {
        this.state = 137;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
        switch(la_) {
        case 1:
            localctx = new IfOnlyContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 121;
            this.match(exaParser.T__20);
            this.state = 122;
            this.expr(0);
            this.state = 123;
            this.block();
            break;

        case 2:
            localctx = new IfElseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 125;
            this.match(exaParser.T__20);
            this.state = 126;
            this.expr(0);
            this.state = 127;
            this.block();
            this.state = 128;
            this.match(exaParser.T__21);
            this.state = 129;
            this.block();
            break;

        case 3:
            localctx = new NestedIfContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 131;
            this.match(exaParser.T__20);
            this.state = 132;
            this.expr(0);
            this.state = 133;
            this.block();
            this.state = 134;
            this.match(exaParser.T__21);
            this.state = 135;
            this.conditional();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function BlockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_block;
    return this;
}

BlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BlockContext.prototype.constructor = BlockContext;

BlockContext.prototype.BEGIN = function() {
    return this.getToken(exaParser.BEGIN, 0);
};

BlockContext.prototype.END = function() {
    return this.getToken(exaParser.END, 0);
};

BlockContext.prototype.statementList = function() {
    return this.getTypedRuleContext(StatementListContext,0);
};

BlockContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitBlock(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.BlockContext = BlockContext;

exaParser.prototype.block = function() {

    var localctx = new BlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, exaParser.RULE_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 139;
        this.match(exaParser.BEGIN);
        this.state = 141;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__2) | (1 << exaParser.T__3) | (1 << exaParser.T__4) | (1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__12) | (1 << exaParser.T__20) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
            this.state = 140;
            this.statementList();
        }

        this.state = 143;
        this.match(exaParser.END);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;


 
ExprContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function ExcisionContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExcisionContext.prototype = Object.create(ExprContext.prototype);
ExcisionContext.prototype.constructor = ExcisionContext;

exaParser.ExcisionContext = ExcisionContext;

ExcisionContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ExcisionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitExcision(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function NegationContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NegationContext.prototype = Object.create(ExprContext.prototype);
NegationContext.prototype.constructor = NegationContext;

exaParser.NegationContext = NegationContext;

NegationContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
NegationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitNegation(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function DynastringContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DynastringContext.prototype = Object.create(ExprContext.prototype);
DynastringContext.prototype.constructor = DynastringContext;

exaParser.DynastringContext = DynastringContext;

DynastringContext.prototype.INTER_BEGIN = function() {
    return this.getToken(exaParser.INTER_BEGIN, 0);
};

DynastringContext.prototype.interpolated = function() {
    return this.getTypedRuleContext(InterpolatedContext,0);
};

DynastringContext.prototype.INTER_END = function() {
    return this.getToken(exaParser.INTER_END, 0);
};
DynastringContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDynastring(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function CompareContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CompareContext.prototype = Object.create(ExprContext.prototype);
CompareContext.prototype.constructor = CompareContext;

exaParser.CompareContext = CompareContext;

CompareContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
CompareContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitCompare(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SubscriptContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SubscriptContext.prototype = Object.create(ExprContext.prototype);
SubscriptContext.prototype.constructor = SubscriptContext;

exaParser.SubscriptContext = SubscriptContext;

SubscriptContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
SubscriptContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSubscript(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AsyncReqExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AsyncReqExprContext.prototype = Object.create(ExprContext.prototype);
AsyncReqExprContext.prototype.constructor = AsyncReqExprContext;

exaParser.AsyncReqExprContext = AsyncReqExprContext;

AsyncReqExprContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AsyncReqExprContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
AsyncReqExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitAsyncReqExpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExternalIdContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExternalIdContext.prototype = Object.create(ExprContext.prototype);
ExternalIdContext.prototype.constructor = ExternalIdContext;

exaParser.ExternalIdContext = ExternalIdContext;

ExternalIdContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.ID);
    } else {
        return this.getToken(exaParser.ID, i);
    }
};

ExternalIdContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitExternalId(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AddSubContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AddSubContext.prototype = Object.create(ExprContext.prototype);
AddSubContext.prototype.constructor = AddSubContext;

exaParser.AddSubContext = AddSubContext;

AddSubContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
AddSubContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitAddSub(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function MembershipContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MembershipContext.prototype = Object.create(ExprContext.prototype);
MembershipContext.prototype.constructor = MembershipContext;

exaParser.MembershipContext = MembershipContext;

MembershipContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
MembershipContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitMembership(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ConcatContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ConcatContext.prototype = Object.create(ExprContext.prototype);
ConcatContext.prototype.constructor = ConcatContext;

exaParser.ConcatContext = ConcatContext;

ConcatContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ConcatContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitConcat(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExtractionContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExtractionContext.prototype = Object.create(ExprContext.prototype);
ExtractionContext.prototype.constructor = ExtractionContext;

exaParser.ExtractionContext = ExtractionContext;

ExtractionContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ExtractionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitExtraction(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function CardinalityContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CardinalityContext.prototype = Object.create(ExprContext.prototype);
CardinalityContext.prototype.constructor = CardinalityContext;

exaParser.CardinalityContext = CardinalityContext;

CardinalityContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
CardinalityContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitCardinality(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function MulDivContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MulDivContext.prototype = Object.create(ExprContext.prototype);
MulDivContext.prototype.constructor = MulDivContext;

exaParser.MulDivContext = MulDivContext;

MulDivContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
MulDivContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitMulDiv(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LogicalContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LogicalContext.prototype = Object.create(ExprContext.prototype);
LogicalContext.prototype.constructor = LogicalContext;

exaParser.LogicalContext = LogicalContext;

LogicalContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
LogicalContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitLogical(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FieldContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FieldContext.prototype = Object.create(ExprContext.prototype);
FieldContext.prototype.constructor = FieldContext;

exaParser.FieldContext = FieldContext;

FieldContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

FieldContext.prototype.ID = function() {
    return this.getToken(exaParser.ID, 0);
};
FieldContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitField(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SliceContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SliceContext.prototype = Object.create(ExprContext.prototype);
SliceContext.prototype.constructor = SliceContext;

exaParser.SliceContext = SliceContext;

SliceContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
SliceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSlice(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BytesContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BytesContext.prototype = Object.create(ExprContext.prototype);
BytesContext.prototype.constructor = BytesContext;

exaParser.BytesContext = BytesContext;

BytesContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
BytesContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitBytes(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SyncReqExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SyncReqExprContext.prototype = Object.create(ExprContext.prototype);
SyncReqExprContext.prototype.constructor = SyncReqExprContext;

exaParser.SyncReqExprContext = SyncReqExprContext;

SyncReqExprContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SyncReqExprContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
SyncReqExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSyncReqExpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function IdContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IdContext.prototype = Object.create(ExprContext.prototype);
IdContext.prototype.constructor = IdContext;

exaParser.IdContext = IdContext;

IdContext.prototype.ID = function() {
    return this.getToken(exaParser.ID, 0);
};
IdContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitId(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function WrapContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

WrapContext.prototype = Object.create(ExprContext.prototype);
WrapContext.prototype.constructor = WrapContext;

exaParser.WrapContext = WrapContext;

WrapContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
WrapContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitWrap(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function LitExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LitExprContext.prototype = Object.create(ExprContext.prototype);
LitExprContext.prototype.constructor = LitExprContext;

exaParser.LitExprContext = LitExprContext;

LitExprContext.prototype.literal = function() {
    return this.getTypedRuleContext(LiteralContext,0);
};
LitExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitLitExpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function DestructureContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DestructureContext.prototype = Object.create(ExprContext.prototype);
DestructureContext.prototype.constructor = DestructureContext;

exaParser.DestructureContext = DestructureContext;

DestructureContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.ID);
    } else {
        return this.getToken(exaParser.ID, i);
    }
};

DestructureContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDestructure(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 18;
    this.enterRecursionRule(localctx, 18, exaParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 198;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
        switch(la_) {
        case 1:
            localctx = new AsyncReqExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 146;
            this.match(exaParser.T__10);
            this.state = 147;
            this.expr(0);
            this.state = 148;
            this.match(exaParser.T__8);
            this.state = 150;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 149;
                this.exprList();
            }

            this.state = 152;
            this.match(exaParser.T__9);
            break;

        case 2:
            localctx = new CardinalityContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 154;
            this.match(exaParser.T__22);
            this.state = 155;
            this.expr(20);
            break;

        case 3:
            localctx = new NegationContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 156;
            this.match(exaParser.T__23);
            this.state = 157;
            this.expr(19);
            break;

        case 4:
            localctx = new BytesContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 158;
            this.match(exaParser.T__24);
            this.state = 159;
            this.expr(18);
            break;

        case 5:
            localctx = new WrapContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 160;
            this.match(exaParser.T__8);
            this.state = 161;
            this.expr(0);
            this.state = 162;
            this.match(exaParser.T__9);
            break;

        case 6:
            localctx = new ExtractionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 164;
            this.match(exaParser.T__43);
            this.state = 165;
            this.expr(0);
            this.state = 166;
            this.match(exaParser.T__40);
            this.state = 167;
            this.expr(0);
            this.state = 168;
            this.match(exaParser.T__41);
            break;

        case 7:
            localctx = new ExcisionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 170;
            this.match(exaParser.T__43);
            this.state = 171;
            this.expr(0);
            this.state = 172;
            this.match(exaParser.T__40);
            this.state = 173;
            this.expr(0);
            this.state = 174;
            this.match(exaParser.T__42);
            this.state = 176;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 175;
                this.expr(0);
            }

            this.state = 178;
            this.match(exaParser.T__41);
            break;

        case 8:
            localctx = new DestructureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 180;
            this.match(exaParser.T__8);
            this.state = 181;
            this.match(exaParser.ID);
            this.state = 184; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 182;
                this.match(exaParser.T__45);
                this.state = 183;
                this.match(exaParser.ID);
                this.state = 186; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===exaParser.T__45);
            this.state = 188;
            this.match(exaParser.T__9);
            break;

        case 9:
            localctx = new DynastringContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 189;
            this.match(exaParser.INTER_BEGIN);
            this.state = 190;
            this.interpolated();
            this.state = 191;
            this.match(exaParser.INTER_END);
            break;

        case 10:
            localctx = new LitExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 193;
            this.literal();
            break;

        case 11:
            localctx = new ExternalIdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 194;
            this.match(exaParser.ID);
            this.state = 195;
            this.match(exaParser.FIELD_SEP);
            this.state = 196;
            this.match(exaParser.ID);
            break;

        case 12:
            localctx = new IdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 197;
            this.match(exaParser.ID);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 243;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 241;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 200;
                    if (!( this.precpred(this._ctx, 17))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
                    }
                    this.state = 201;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__25) | (1 << exaParser.T__26) | (1 << exaParser.T__27))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 202;
                    this.expr(18);
                    break;

                case 2:
                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 203;
                    if (!( this.precpred(this._ctx, 16))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                    }
                    this.state = 204;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__28 || _la===exaParser.T__29)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 205;
                    this.expr(17);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 206;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 207;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 31)) & ~0x1f) == 0 && ((1 << (_la - 31)) & ((1 << (exaParser.T__30 - 31)) | (1 << (exaParser.T__31 - 31)) | (1 << (exaParser.T__32 - 31)) | (1 << (exaParser.T__33 - 31)) | (1 << (exaParser.T__34 - 31)) | (1 << (exaParser.T__35 - 31)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 208;
                    this.expr(16);
                    break;

                case 4:
                    localctx = new LogicalContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 209;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 210;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__36 || _la===exaParser.T__37)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 211;
                    this.expr(15);
                    break;

                case 5:
                    localctx = new MembershipContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 212;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 213;
                    this.match(exaParser.T__38);
                    this.state = 214;
                    this.expr(14);
                    break;

                case 6:
                    localctx = new ConcatContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 215;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 216;
                    this.match(exaParser.T__39);
                    this.state = 217;
                    this.expr(13);
                    break;

                case 7:
                    localctx = new SyncReqExprContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 218;
                    if (!( this.precpred(this._ctx, 22))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
                    }
                    this.state = 219;
                    this.match(exaParser.T__8);
                    this.state = 221;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                        this.state = 220;
                        this.exprList();
                    }

                    this.state = 223;
                    this.match(exaParser.T__9);
                    break;

                case 8:
                    localctx = new SubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 224;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 225;
                    this.match(exaParser.T__40);
                    this.state = 226;
                    this.expr(0);
                    this.state = 227;
                    this.match(exaParser.T__41);
                    break;

                case 9:
                    localctx = new SliceContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 229;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 230;
                    this.match(exaParser.T__40);
                    this.state = 231;
                    this.expr(0);
                    this.state = 232;
                    this.match(exaParser.T__42);
                    this.state = 234;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                        this.state = 233;
                        this.expr(0);
                    }

                    this.state = 236;
                    this.match(exaParser.T__41);
                    break;

                case 10:
                    localctx = new FieldContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 238;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 239;
                    this.match(exaParser.T__44);
                    this.state = 240;
                    this.match(exaParser.ID);
                    break;

                } 
            }
            this.state = 245;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function ReplyHandlerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_replyHandler;
    return this;
}

ReplyHandlerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReplyHandlerContext.prototype.constructor = ReplyHandlerContext;

ReplyHandlerContext.prototype.procedure = function() {
    return this.getTypedRuleContext(ProcedureContext,0);
};

ReplyHandlerContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitReplyHandler(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.ReplyHandlerContext = ReplyHandlerContext;

exaParser.prototype.replyHandler = function() {

    var localctx = new ReplyHandlerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, exaParser.RULE_replyHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 246;
        this.procedure();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FailHandlerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_failHandler;
    return this;
}

FailHandlerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FailHandlerContext.prototype.constructor = FailHandlerContext;

FailHandlerContext.prototype.procedure = function() {
    return this.getTypedRuleContext(ProcedureContext,0);
};

FailHandlerContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitFailHandler(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.FailHandlerContext = FailHandlerContext;

exaParser.prototype.failHandler = function() {

    var localctx = new FailHandlerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, exaParser.RULE_failHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 248;
        this.match(exaParser.T__46);
        this.state = 249;
        this.match(exaParser.T__3);
        this.state = 250;
        this.procedure();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function InterpolatedContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_interpolated;
    return this;
}

InterpolatedContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InterpolatedContext.prototype.constructor = InterpolatedContext;

InterpolatedContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

InterpolatedContext.prototype.INTER_MID = function() {
    return this.getToken(exaParser.INTER_MID, 0);
};

InterpolatedContext.prototype.interpolated = function() {
    return this.getTypedRuleContext(InterpolatedContext,0);
};

InterpolatedContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitInterpolated(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.InterpolatedContext = InterpolatedContext;

exaParser.prototype.interpolated = function() {

    var localctx = new InterpolatedContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, exaParser.RULE_interpolated);
    try {
        this.state = 257;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 252;
            this.expr(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 253;
            this.expr(0);
            this.state = 254;
            this.match(exaParser.INTER_MID);
            this.state = 255;
            this.interpolated();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExprListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_exprList;
    return this;
}

ExprListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprListContext.prototype.constructor = ExprListContext;

ExprListContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

ExprListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitExprList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.ExprListContext = ExprListContext;

exaParser.prototype.exprList = function() {

    var localctx = new ExprListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, exaParser.RULE_exprList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 259;
        this.expr(0);
        this.state = 264;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,20,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 260;
                this.match(exaParser.T__45);
                this.state = 261;
                this.expr(0); 
            }
            this.state = 266;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,20,this._ctx);
        }

        this.state = 268;
        _la = this._input.LA(1);
        if(_la===exaParser.T__45) {
            this.state = 267;
            this.match(exaParser.T__45);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function LiteralContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_literal;
    return this;
}

LiteralContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LiteralContext.prototype.constructor = LiteralContext;


 
LiteralContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function NilContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NilContext.prototype = Object.create(LiteralContext.prototype);
NilContext.prototype.constructor = NilContext;

exaParser.NilContext = NilContext;

NilContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitNil(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function NumberContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NumberContext.prototype = Object.create(LiteralContext.prototype);
NumberContext.prototype.constructor = NumberContext;

exaParser.NumberContext = NumberContext;

NumberContext.prototype.NUMBER = function() {
    return this.getToken(exaParser.NUMBER, 0);
};
NumberContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitNumber(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SetContext(parser, ctx) {
	LiteralContext.call(this, parser);
    this.sep = null; // Token;
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SetContext.prototype = Object.create(LiteralContext.prototype);
SetContext.prototype.constructor = SetContext;

exaParser.SetContext = SetContext;

SetContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};

SetContext.prototype.pairList = function() {
    return this.getTypedRuleContext(PairListContext,0);
};

SetContext.prototype.PAIR_SEP = function() {
    return this.getToken(exaParser.PAIR_SEP, 0);
};
SetContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSet(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BoolContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BoolContext.prototype = Object.create(LiteralContext.prototype);
BoolContext.prototype.constructor = BoolContext;

exaParser.BoolContext = BoolContext;

BoolContext.prototype.BOOL = function() {
    return this.getToken(exaParser.BOOL, 0);
};
BoolContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitBool(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function StringContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

StringContext.prototype = Object.create(LiteralContext.prototype);
StringContext.prototype.constructor = StringContext;

exaParser.StringContext = StringContext;

StringContext.prototype.STRING = function() {
    return this.getToken(exaParser.STRING, 0);
};
StringContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitString(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FormContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FormContext.prototype = Object.create(LiteralContext.prototype);
FormContext.prototype.constructor = FormContext;

exaParser.FormContext = FormContext;

FormContext.prototype.fieldList = function() {
    return this.getTypedRuleContext(FieldListContext,0);
};
FormContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitForm(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ArrayContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ArrayContext.prototype = Object.create(LiteralContext.prototype);
ArrayContext.prototype.constructor = ArrayContext;

exaParser.ArrayContext = ArrayContext;

ArrayContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
ArrayContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitArray(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ServiceContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ServiceContext.prototype = Object.create(LiteralContext.prototype);
ServiceContext.prototype.constructor = ServiceContext;

exaParser.ServiceContext = ServiceContext;

ServiceContext.prototype.procedure = function() {
    return this.getTypedRuleContext(ProcedureContext,0);
};
ServiceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitService(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SubscriptionContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SubscriptionContext.prototype = Object.create(LiteralContext.prototype);
SubscriptionContext.prototype.constructor = SubscriptionContext;

exaParser.SubscriptionContext = SubscriptionContext;

SubscriptionContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SubscriptionContext.prototype.procedure = function() {
    return this.getTypedRuleContext(ProcedureContext,0);
};
SubscriptionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSubscription(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.LiteralContext = LiteralContext;

exaParser.prototype.literal = function() {

    var localctx = new LiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, exaParser.RULE_literal);
    var _la = 0; // Token type
    try {
        this.state = 295;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
        switch(la_) {
        case 1:
            localctx = new NilContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 270;
            this.match(exaParser.NIL);
            break;

        case 2:
            localctx = new BoolContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 271;
            this.match(exaParser.BOOL);
            break;

        case 3:
            localctx = new NumberContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 272;
            this.match(exaParser.NUMBER);
            break;

        case 4:
            localctx = new StringContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 273;
            this.match(exaParser.STRING);
            break;

        case 5:
            localctx = new ArrayContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 274;
            this.match(exaParser.T__40);
            this.state = 276;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 275;
                this.exprList();
            }

            this.state = 278;
            this.match(exaParser.T__41);
            break;

        case 6:
            localctx = new FormContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 279;
            this.match(exaParser.T__40);
            this.state = 280;
            this.fieldList();
            this.state = 281;
            this.match(exaParser.T__41);
            break;

        case 7:
            localctx = new SetContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 283;
            this.match(exaParser.BEGIN);
            this.state = 287;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
            if(la_===1) {
                this.state = 284;
                localctx.sep = this.match(exaParser.PAIR_SEP);

            } else if(la_===2) {
                this.state = 285;
                this.exprList();

            } else if(la_===3) {
                this.state = 286;
                this.pairList();

            }
            this.state = 289;
            this.match(exaParser.END);
            break;

        case 8:
            localctx = new ServiceContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 290;
            this.procedure();
            break;

        case 9:
            localctx = new SubscriptionContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 291;
            this.match(exaParser.T__46);
            this.state = 292;
            this.expr(0);
            this.state = 293;
            this.procedure();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ProcedureContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_procedure;
    return this;
}

ProcedureContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ProcedureContext.prototype.constructor = ProcedureContext;

ProcedureContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

ProcedureContext.prototype.paramList = function() {
    return this.getTypedRuleContext(ParamListContext,0);
};

ProcedureContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.ID);
    } else {
        return this.getToken(exaParser.ID, i);
    }
};


ProcedureContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitProcedure(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.ProcedureContext = ProcedureContext;

exaParser.prototype.procedure = function() {

    var localctx = new ProcedureContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, exaParser.RULE_procedure);
    var _la = 0; // Token type
    try {
        this.state = 311;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 297;
            this.match(exaParser.T__47);
            this.state = 299;
            _la = this._input.LA(1);
            if(_la===exaParser.T__8) {
                this.state = 298;
                this.paramList();
            }

            this.state = 301;
            this.block();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 302;
            this.match(exaParser.T__47);
            this.state = 303;
            this.match(exaParser.ID);
            this.state = 308;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,26,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 304;
                    this.match(exaParser.T__45);
                    this.state = 305;
                    this.match(exaParser.ID); 
                }
                this.state = 310;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,26,this._ctx);
            }

            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ParamListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_paramList;
    return this;
}

ParamListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParamListContext.prototype.constructor = ParamListContext;

ParamListContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.ID);
    } else {
        return this.getToken(exaParser.ID, i);
    }
};


ParamListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitParamList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.ParamListContext = ParamListContext;

exaParser.prototype.paramList = function() {

    var localctx = new ParamListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, exaParser.RULE_paramList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 313;
        this.match(exaParser.T__8);
        this.state = 314;
        this.match(exaParser.ID);
        this.state = 319;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===exaParser.T__45) {
            this.state = 315;
            this.match(exaParser.T__45);
            this.state = 316;
            this.match(exaParser.ID);
            this.state = 321;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 322;
        this.match(exaParser.T__9);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FieldListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_fieldList;
    return this;
}

FieldListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldListContext.prototype.constructor = FieldListContext;

FieldListContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.ID);
    } else {
        return this.getToken(exaParser.ID, i);
    }
};


FieldListContext.prototype.FIELD_SEP = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.FIELD_SEP);
    } else {
        return this.getToken(exaParser.FIELD_SEP, i);
    }
};


FieldListContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

FieldListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitFieldList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.FieldListContext = FieldListContext;

exaParser.prototype.fieldList = function() {

    var localctx = new FieldListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, exaParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 330; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 324;
            this.match(exaParser.ID);
            this.state = 325;
            this.match(exaParser.FIELD_SEP);
            this.state = 326;
            this.expr(0);
            this.state = 328;
            _la = this._input.LA(1);
            if(_la===exaParser.T__45) {
                this.state = 327;
                this.match(exaParser.T__45);
            }

            this.state = 332; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===exaParser.ID);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function PairListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_pairList;
    return this;
}

PairListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PairListContext.prototype.constructor = PairListContext;

PairListContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

PairListContext.prototype.PAIR_SEP = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.PAIR_SEP);
    } else {
        return this.getToken(exaParser.PAIR_SEP, i);
    }
};


PairListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitPairList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.PairListContext = PairListContext;

exaParser.prototype.pairList = function() {

    var localctx = new PairListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, exaParser.RULE_pairList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 340; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 334;
            this.expr(0);
            this.state = 335;
            this.match(exaParser.PAIR_SEP);
            this.state = 336;
            this.expr(0);
            this.state = 338;
            _la = this._input.LA(1);
            if(_la===exaParser.T__45) {
                this.state = 337;
                this.match(exaParser.T__45);
            }

            this.state = 342; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__8) | (1 << exaParser.T__10) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0));
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exaParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 9:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

exaParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 17);
		case 1:
			return this.precpred(this._ctx, 16);
		case 2:
			return this.precpred(this._ctx, 15);
		case 3:
			return this.precpred(this._ctx, 14);
		case 4:
			return this.precpred(this._ctx, 13);
		case 5:
			return this.precpred(this._ctx, 12);
		case 6:
			return this.precpred(this._ctx, 22);
		case 7:
			return this.precpred(this._ctx, 10);
		case 8:
			return this.precpred(this._ctx, 9);
		case 9:
			return this.precpred(this._ctx, 6);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.exaParser = exaParser;
