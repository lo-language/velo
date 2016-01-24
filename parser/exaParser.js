// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var exaListener = require('./exaListener').exaListener;
var exaVisitor = require('./exaVisitor').exaVisitor;

var grammarFileName = "exa.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003:\u012a\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005",
    "\u0003\'\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0007",
    "\u0004-\n\u0004\f\u0004\u000e\u00040\u000b\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0005\u0004;\n\u0004\u0003\u0004\u0006\u0004>\n\u0004\r",
    "\u0004\u000e\u0004?\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004\\\n\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0005\u0005d\n\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0005\u0007x\n\u0007\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0005\t\u0087\n\t\u0003\t\u0003\t\u0003\t\u0005\t\u008c\n",
    "\t\u0003\t\u0003\t\u0005\t\u0090\n\t\u0003\t\u0003\t\u0003\t\u0003\t",
    "\u0003\t\u0003\t\u0005\t\u0098\n\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\t\u00ac\n\t\u0003\t\u0003\t",
    "\u0003\t\u0005\t\u00b1\n\t\u0007\t\u00b3\n\t\f\t\u000e\t\u00b6\u000b",
    "\t\u0003\n\u0003\n\u0003\n\u0007\n\u00bb\n\n\f\n\u000e\n\u00be\u000b",
    "\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0006\u000b\u00c6\n\u000b\r\u000b\u000e\u000b\u00c7\u0003\u000b",
    "\u0003\u000b\u0005\u000b\u00cc\n\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005",
    "\u000b\u00d6\n\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00da\n\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00e5\n\u000b\u0003",
    "\u000b\u0003\u000b\u0005\u000b\u00e9\n\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0007\u000b\u00ef\n\u000b\f\u000b\u000e\u000b",
    "\u00f2\u000b\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0005\f\u00fd\n\f\u0003\f\u0003\f\u0003\f\u0005\f",
    "\u0102\n\f\u0003\f\u0005\f\u0105\n\f\u0003\r\u0003\r\u0003\r\u0007\r",
    "\u010a\n\r\f\r\u000e\r\u010d\u000b\r\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0007\u000e\u0113\n\u000e\f\u000e\u000e\u000e\u0116\u000b",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u011b\n\u000e",
    "\f\u000e\u000e\u000e\u011e\u000b\u000e\u0005\u000e\u0120\n\u000e\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0002\u0004\u0010\u0014\u0011\u0002\u0004",
    "\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e\u0002",
    "\b\u0003\u0002\b\t\u0003\u0002\u000f\u0014\u0004\u0002\u001a\u001a\u001e",
    "\u001f\u0003\u0002 !\u0003\u0002\"\'\u0003\u0002()\u0155\u0002 \u0003",
    "\u0002\u0002\u0002\u0004&\u0003\u0002\u0002\u0002\u0006[\u0003\u0002",
    "\u0002\u0002\bc\u0003\u0002\u0002\u0002\ne\u0003\u0002\u0002\u0002\f",
    "w\u0003\u0002\u0002\u0002\u000ey\u0003\u0002\u0002\u0002\u0010\u0097",
    "\u0003\u0002\u0002\u0002\u0012\u00b7\u0003\u0002\u0002\u0002\u0014\u00cb",
    "\u0003\u0002\u0002\u0002\u0016\u0104\u0003\u0002\u0002\u0002\u0018\u0106",
    "\u0003\u0002\u0002\u0002\u001a\u011f\u0003\u0002\u0002\u0002\u001c\u0121",
    "\u0003\u0002\u0002\u0002\u001e\u0125\u0003\u0002\u0002\u0002 !\u0005",
    "\u0004\u0003\u0002!\u0003\u0003\u0002\u0002\u0002\"\'\u0005\u0006\u0004",
    "\u0002#$\u0005\u0006\u0004\u0002$%\u0005\u0004\u0003\u0002%\'\u0003",
    "\u0002\u0002\u0002&\"\u0003\u0002\u0002\u0002&#\u0003\u0002\u0002\u0002",
    "\'\u0005\u0003\u0002\u0002\u0002()\u0007\u0003\u0002\u0002).\u00078",
    "\u0002\u0002*+\u0007\u0004\u0002\u0002+-\u00078\u0002\u0002,*\u0003",
    "\u0002\u0002\u0002-0\u0003\u0002\u0002\u0002.,\u0003\u0002\u0002\u0002",
    "./\u0003\u0002\u0002\u0002/1\u0003\u0002\u0002\u00020.\u0003\u0002\u0002",
    "\u00021\\\u0007\u0005\u0002\u000223\u00078\u0002\u000234\u0007\u0006",
    "\u0002\u000245\u0005\u0016\f\u000256\u0007\u0005\u0002\u00026\\\u0003",
    "\u0002\u0002\u000278\u0007\u0007\u0002\u00028=\u00078\u0002\u00029;",
    "\u0007\u0004\u0002\u0002:9\u0003\u0002\u0002\u0002:;\u0003\u0002\u0002",
    "\u0002;<\u0003\u0002\u0002\u0002<>\u00078\u0002\u0002=:\u0003\u0002",
    "\u0002\u0002>?\u0003\u0002\u0002\u0002?=\u0003\u0002\u0002\u0002?@\u0003",
    "\u0002\u0002\u0002@A\u0003\u0002\u0002\u0002A\\\u0007\u0005\u0002\u0002",
    "BC\u0005\b\u0005\u0002CD\u0007\u0005\u0002\u0002D\\\u0003\u0002\u0002",
    "\u0002EF\u0005\u0014\u000b\u0002FG\u0005\n\u0006\u0002GH\u0005\u0010",
    "\t\u0002HI\u0007\u0005\u0002\u0002I\\\u0003\u0002\u0002\u0002JK\u0005",
    "\u0014\u000b\u0002KL\t\u0002\u0002\u0002LM\u0007\u0005\u0002\u0002M",
    "\\\u0003\u0002\u0002\u0002NO\u0005\u0010\t\u0002OP\u0007\n\u0002\u0002",
    "PQ\u0005\u0014\u000b\u0002QR\u0007\u0005\u0002\u0002R\\\u0003\u0002",
    "\u0002\u0002S\\\u0005\f\u0007\u0002TU\u0007\u000b\u0002\u0002UV\u0005",
    "\u0010\t\u0002VW\u0005\u000e\b\u0002W\\\u0003\u0002\u0002\u0002XY\u0005",
    "\u0010\t\u0002YZ\u0007\u0005\u0002\u0002Z\\\u0003\u0002\u0002\u0002",
    "[(\u0003\u0002\u0002\u0002[2\u0003\u0002\u0002\u0002[7\u0003\u0002\u0002",
    "\u0002[B\u0003\u0002\u0002\u0002[E\u0003\u0002\u0002\u0002[J\u0003\u0002",
    "\u0002\u0002[N\u0003\u0002\u0002\u0002[S\u0003\u0002\u0002\u0002[T\u0003",
    "\u0002\u0002\u0002[X\u0003\u0002\u0002\u0002\\\u0007\u0003\u0002\u0002",
    "\u0002]^\u0007\f\u0002\u0002^d\u0005\u0012\n\u0002_`\u0007\r\u0002\u0002",
    "`d\u0005\u0012\n\u0002ab\u0007\u000e\u0002\u0002bd\u0005\u0012\n\u0002",
    "c]\u0003\u0002\u0002\u0002c_\u0003\u0002\u0002\u0002ca\u0003\u0002\u0002",
    "\u0002d\t\u0003\u0002\u0002\u0002ef\t\u0003\u0002\u0002f\u000b\u0003",
    "\u0002\u0002\u0002gh\u0007\u0015\u0002\u0002hi\u0005\u0010\t\u0002i",
    "j\u0005\u000e\b\u0002jx\u0003\u0002\u0002\u0002kl\u0007\u0015\u0002",
    "\u0002lm\u0005\u0010\t\u0002mn\u0005\u000e\b\u0002no\u0007\u0016\u0002",
    "\u0002op\u0005\u000e\b\u0002px\u0003\u0002\u0002\u0002qr\u0007\u0015",
    "\u0002\u0002rs\u0005\u0010\t\u0002st\u0005\u000e\b\u0002tu\u0007\u0016",
    "\u0002\u0002uv\u0005\f\u0007\u0002vx\u0003\u0002\u0002\u0002wg\u0003",
    "\u0002\u0002\u0002wk\u0003\u0002\u0002\u0002wq\u0003\u0002\u0002\u0002",
    "x\r\u0003\u0002\u0002\u0002yz\u00073\u0002\u0002z{\u0005\u0004\u0003",
    "\u0002{|\u00074\u0002\u0002|\u000f\u0003\u0002\u0002\u0002}~\b\t\u0001",
    "\u0002~\u007f\u0007\u001c\u0002\u0002\u007f\u0098\u0005\u0010\t\f\u0080",
    "\u0081\u0007\u001d\u0002\u0002\u0081\u0098\u0005\u0010\t\u000b\u0082",
    "\u0083\u0007\u001a\u0002\u0002\u0083\u0084\u0005\u0010\t\u0002\u0084",
    "\u0086\u0007\u0017\u0002\u0002\u0085\u0087\u0005\u0012\n\u0002\u0086",
    "\u0085\u0003\u0002\u0002\u0002\u0086\u0087\u0003\u0002\u0002\u0002\u0087",
    "\u0088\u0003\u0002\u0002\u0002\u0088\u008b\u0007\u0018\u0002\u0002\u0089",
    "\u008a\u0007\u001b\u0002\u0002\u008a\u008c\u0005\u000e\b\u0002\u008b",
    "\u0089\u0003\u0002\u0002\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c",
    "\u008f\u0003\u0002\u0002\u0002\u008d\u008e\u0007\u0019\u0002\u0002\u008e",
    "\u0090\u0005\u000e\b\u0002\u008f\u008d\u0003\u0002\u0002\u0002\u008f",
    "\u0090\u0003\u0002\u0002\u0002\u0090\u0098\u0003\u0002\u0002\u0002\u0091",
    "\u0092\u0007\u0017\u0002\u0002\u0092\u0093\u0005\u0010\t\u0002\u0093",
    "\u0094\u0007\u0018\u0002\u0002\u0094\u0098\u0003\u0002\u0002\u0002\u0095",
    "\u0098\u0005\u0016\f\u0002\u0096\u0098\u0005\u0014\u000b\u0002\u0097",
    "}\u0003\u0002\u0002\u0002\u0097\u0080\u0003\u0002\u0002\u0002\u0097",
    "\u0082\u0003\u0002\u0002\u0002\u0097\u0091\u0003\u0002\u0002\u0002\u0097",
    "\u0095\u0003\u0002\u0002\u0002\u0097\u0096\u0003\u0002\u0002\u0002\u0098",
    "\u00b4\u0003\u0002\u0002\u0002\u0099\u009a\f\n\u0002\u0002\u009a\u009b",
    "\t\u0004\u0002\u0002\u009b\u00b3\u0005\u0010\t\u000b\u009c\u009d\f\t",
    "\u0002\u0002\u009d\u009e\t\u0005\u0002\u0002\u009e\u00b3\u0005\u0010",
    "\t\n\u009f\u00a0\f\b\u0002\u0002\u00a0\u00a1\t\u0006\u0002\u0002\u00a1",
    "\u00b3\u0005\u0010\t\t\u00a2\u00a3\f\u0007\u0002\u0002\u00a3\u00a4\t",
    "\u0007\u0002\u0002\u00a4\u00b3\u0005\u0010\t\b\u00a5\u00a6\f\u0006\u0002",
    "\u0002\u00a6\u00a7\u0007*\u0002\u0002\u00a7\u00b3\u0005\u0010\t\u0007",
    "\u00a8\u00a9\f\u000e\u0002\u0002\u00a9\u00ab\u0007\u0017\u0002\u0002",
    "\u00aa\u00ac\u0005\u0012\n\u0002\u00ab\u00aa\u0003\u0002\u0002\u0002",
    "\u00ab\u00ac\u0003\u0002\u0002\u0002\u00ac\u00ad\u0003\u0002\u0002\u0002",
    "\u00ad\u00b0\u0007\u0018\u0002\u0002\u00ae\u00af\u0007\u0019\u0002\u0002",
    "\u00af\u00b1\u0005\u000e\b\u0002\u00b0\u00ae\u0003\u0002\u0002\u0002",
    "\u00b0\u00b1\u0003\u0002\u0002\u0002\u00b1\u00b3\u0003\u0002\u0002\u0002",
    "\u00b2\u0099\u0003\u0002\u0002\u0002\u00b2\u009c\u0003\u0002\u0002\u0002",
    "\u00b2\u009f\u0003\u0002\u0002\u0002\u00b2\u00a2\u0003\u0002\u0002\u0002",
    "\u00b2\u00a5\u0003\u0002\u0002\u0002\u00b2\u00a8\u0003\u0002\u0002\u0002",
    "\u00b3\u00b6\u0003\u0002\u0002\u0002\u00b4\u00b2\u0003\u0002\u0002\u0002",
    "\u00b4\u00b5\u0003\u0002\u0002\u0002\u00b5\u0011\u0003\u0002\u0002\u0002",
    "\u00b6\u00b4\u0003\u0002\u0002\u0002\u00b7\u00bc\u0005\u0010\t\u0002",
    "\u00b8\u00b9\u0007\u0004\u0002\u0002\u00b9\u00bb\u0005\u0010\t\u0002",
    "\u00ba\u00b8\u0003\u0002\u0002\u0002\u00bb\u00be\u0003\u0002\u0002\u0002",
    "\u00bc\u00ba\u0003\u0002\u0002\u0002\u00bc\u00bd\u0003\u0002\u0002\u0002",
    "\u00bd\u0013\u0003\u0002\u0002\u0002\u00be\u00bc\u0003\u0002\u0002\u0002",
    "\u00bf\u00c0\b\u000b\u0001\u0002\u00c0\u00cc\u00078\u0002\u0002\u00c1",
    "\u00c2\u0007\u0017\u0002\u0002\u00c2\u00c5\u0005\u0014\u000b\u0002\u00c3",
    "\u00c4\u0007\u0004\u0002\u0002\u00c4\u00c6\u0005\u0014\u000b\u0002\u00c5",
    "\u00c3\u0003\u0002\u0002\u0002\u00c6\u00c7\u0003\u0002\u0002\u0002\u00c7",
    "\u00c5\u0003\u0002\u0002\u0002\u00c7\u00c8\u0003\u0002\u0002\u0002\u00c8",
    "\u00c9\u0003\u0002\u0002\u0002\u00c9\u00ca\u0007\u0018\u0002\u0002\u00ca",
    "\u00cc\u0003\u0002\u0002\u0002\u00cb\u00bf\u0003\u0002\u0002\u0002\u00cb",
    "\u00c1\u0003\u0002\u0002\u0002\u00cc\u00f0\u0003\u0002\u0002\u0002\u00cd",
    "\u00ce\f\b\u0002\u0002\u00ce\u00cf\u0007+\u0002\u0002\u00cf\u00d0\u0005",
    "\u0010\t\u0002\u00d0\u00d1\u0007,\u0002\u0002\u00d1\u00ef\u0003\u0002",
    "\u0002\u0002\u00d2\u00d3\f\u0007\u0002\u0002\u00d3\u00d5\u0007+\u0002",
    "\u0002\u00d4\u00d6\u0005\u0010\t\u0002\u00d5\u00d4\u0003\u0002\u0002",
    "\u0002\u00d5\u00d6\u0003\u0002\u0002\u0002\u00d6\u00d7\u0003\u0002\u0002",
    "\u0002\u00d7\u00d9\u0007-\u0002\u0002\u00d8\u00da\u0005\u0010\t\u0002",
    "\u00d9\u00d8\u0003\u0002\u0002\u0002\u00d9\u00da\u0003\u0002\u0002\u0002",
    "\u00da\u00db\u0003\u0002\u0002\u0002\u00db\u00ef\u0007,\u0002\u0002",
    "\u00dc\u00dd\f\u0006\u0002\u0002\u00dd\u00de\u00073\u0002\u0002\u00de",
    "\u00df\u0005\u0010\t\u0002\u00df\u00e0\u00074\u0002\u0002\u00e0\u00ef",
    "\u0003\u0002\u0002\u0002\u00e1\u00e2\f\u0005\u0002\u0002\u00e2\u00e4",
    "\u00073\u0002\u0002\u00e3\u00e5\u0005\u0010\t\u0002\u00e4\u00e3\u0003",
    "\u0002\u0002\u0002\u00e4\u00e5\u0003\u0002\u0002\u0002\u00e5\u00e6\u0003",
    "\u0002\u0002\u0002\u00e6\u00e8\u0007-\u0002\u0002\u00e7\u00e9\u0005",
    "\u0010\t\u0002\u00e8\u00e7\u0003\u0002\u0002\u0002\u00e8\u00e9\u0003",
    "\u0002\u0002\u0002\u00e9\u00ea\u0003\u0002\u0002\u0002\u00ea\u00ef\u0007",
    "4\u0002\u0002\u00eb\u00ec\f\u0004\u0002\u0002\u00ec\u00ed\u0007.\u0002",
    "\u0002\u00ed\u00ef\u00078\u0002\u0002\u00ee\u00cd\u0003\u0002\u0002",
    "\u0002\u00ee\u00d2\u0003\u0002\u0002\u0002\u00ee\u00dc\u0003\u0002\u0002",
    "\u0002\u00ee\u00e1\u0003\u0002\u0002\u0002\u00ee\u00eb\u0003\u0002\u0002",
    "\u0002\u00ef\u00f2\u0003\u0002\u0002\u0002\u00f0\u00ee\u0003\u0002\u0002",
    "\u0002\u00f0\u00f1\u0003\u0002\u0002\u0002\u00f1\u0015\u0003\u0002\u0002",
    "\u0002\u00f2\u00f0\u0003\u0002\u0002\u0002\u00f3\u0105\u00075\u0002",
    "\u0002\u00f4\u0105\u00076\u0002\u0002\u00f5\u0105\u00077\u0002\u0002",
    "\u00f6\u0105\u00079\u0002\u0002\u00f7\u0105\u0007:\u0002\u0002\u00f8",
    "\u00f9\u0007/\u0002\u0002\u00f9\u0105\u0005\u000e\b\u0002\u00fa\u00fc",
    "\u0007+\u0002\u0002\u00fb\u00fd\u0005\u001a\u000e\u0002\u00fc\u00fb",
    "\u0003\u0002\u0002\u0002\u00fc\u00fd\u0003\u0002\u0002\u0002\u00fd\u00fe",
    "\u0003\u0002\u0002\u0002\u00fe\u0105\u0007,\u0002\u0002\u00ff\u0101",
    "\u00073\u0002\u0002\u0100\u0102\u0005\u0018\r\u0002\u0101\u0100\u0003",
    "\u0002\u0002\u0002\u0101\u0102\u0003\u0002\u0002\u0002\u0102\u0103\u0003",
    "\u0002\u0002\u0002\u0103\u0105\u00074\u0002\u0002\u0104\u00f3\u0003",
    "\u0002\u0002\u0002\u0104\u00f4\u0003\u0002\u0002\u0002\u0104\u00f5\u0003",
    "\u0002\u0002\u0002\u0104\u00f6\u0003\u0002\u0002\u0002\u0104\u00f7\u0003",
    "\u0002\u0002\u0002\u0104\u00f8\u0003\u0002\u0002\u0002\u0104\u00fa\u0003",
    "\u0002\u0002\u0002\u0104\u00ff\u0003\u0002\u0002\u0002\u0105\u0017\u0003",
    "\u0002\u0002\u0002\u0106\u010b\u0005\u001e\u0010\u0002\u0107\u0108\u0007",
    "\u0004\u0002\u0002\u0108\u010a\u0005\u001e\u0010\u0002\u0109\u0107\u0003",
    "\u0002\u0002\u0002\u010a\u010d\u0003\u0002\u0002\u0002\u010b\u0109\u0003",
    "\u0002\u0002\u0002\u010b\u010c\u0003\u0002\u0002\u0002\u010c\u0019\u0003",
    "\u0002\u0002\u0002\u010d\u010b\u0003\u0002\u0002\u0002\u010e\u0120\u0007",
    "-\u0002\u0002\u010f\u0114\u0005\u0010\t\u0002\u0110\u0111\u0007\u0004",
    "\u0002\u0002\u0111\u0113\u0005\u0010\t\u0002\u0112\u0110\u0003\u0002",
    "\u0002\u0002\u0113\u0116\u0003\u0002\u0002\u0002\u0114\u0112\u0003\u0002",
    "\u0002\u0002\u0114\u0115\u0003\u0002\u0002\u0002\u0115\u0120\u0003\u0002",
    "\u0002\u0002\u0116\u0114\u0003\u0002\u0002\u0002\u0117\u011c\u0005\u001c",
    "\u000f\u0002\u0118\u0119\u0007\u0004\u0002\u0002\u0119\u011b\u0005\u001c",
    "\u000f\u0002\u011a\u0118\u0003\u0002\u0002\u0002\u011b\u011e\u0003\u0002",
    "\u0002\u0002\u011c\u011a\u0003\u0002\u0002\u0002\u011c\u011d\u0003\u0002",
    "\u0002\u0002\u011d\u0120\u0003\u0002\u0002\u0002\u011e\u011c\u0003\u0002",
    "\u0002\u0002\u011f\u010e\u0003\u0002\u0002\u0002\u011f\u010f\u0003\u0002",
    "\u0002\u0002\u011f\u0117\u0003\u0002\u0002\u0002\u0120\u001b\u0003\u0002",
    "\u0002\u0002\u0121\u0122\u0005\u0010\t\u0002\u0122\u0123\u0007-\u0002",
    "\u0002\u0123\u0124\u0005\u0010\t\u0002\u0124\u001d\u0003\u0002\u0002",
    "\u0002\u0125\u0126\u00078\u0002\u0002\u0126\u0127\u0007-\u0002\u0002",
    "\u0127\u0128\u0005\u0010\t\u0002\u0128\u001f\u0003\u0002\u0002\u0002",
    "!&.:?[cw\u0086\u008b\u008f\u0097\u00ab\u00b0\u00b2\u00b4\u00bc\u00c7",
    "\u00cb\u00d5\u00d9\u00e4\u00e8\u00ee\u00f0\u00fc\u0101\u0104\u010b\u0114",
    "\u011c\u011f"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'receive'", "','", "';'", "'is'", "'distinguish'", 
                     "'++'", "'--'", "'->'", "'while'", "'reply'", "'fail'", 
                     "'substitute'", "'='", "'+='", "'-='", "'*='", "'/='", 
                     "'%='", "'if'", "'else'", "'('", "')'", "'catch'", 
                     "'*'", "'then'", "'#'", "'not'", "'/'", "'%'", "'+'", 
                     "'-'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", 
                     "'and'", "'or'", "'in'", "'['", "']'", "':'", "'.'", 
                     "'service'", 'null', 'null', 'null', "'{'", "'}'", 
                     "'nil'" ];

var symbolicNames = [ 'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', "WS", "LINE_COMMENT", 
                      "COMMENT", "BEGIN", "END", "NIL", "BOOL", "NUMBER", 
                      "ID", "STRING", "MODREF" ];

var ruleNames =  [ "module", "statement_list", "statement", "response", 
                   "assignment_op", "conditional", "block", "expr", "exprList", 
                   "lvalue", "literal", "fieldList", "list_items", "dyad", 
                   "field" ];

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
exaParser.WS = 46;
exaParser.LINE_COMMENT = 47;
exaParser.COMMENT = 48;
exaParser.BEGIN = 49;
exaParser.END = 50;
exaParser.NIL = 51;
exaParser.BOOL = 52;
exaParser.NUMBER = 53;
exaParser.ID = 54;
exaParser.STRING = 55;
exaParser.MODREF = 56;

exaParser.RULE_module = 0;
exaParser.RULE_statement_list = 1;
exaParser.RULE_statement = 2;
exaParser.RULE_response = 3;
exaParser.RULE_assignment_op = 4;
exaParser.RULE_conditional = 5;
exaParser.RULE_block = 6;
exaParser.RULE_expr = 7;
exaParser.RULE_exprList = 8;
exaParser.RULE_lvalue = 9;
exaParser.RULE_literal = 10;
exaParser.RULE_fieldList = 11;
exaParser.RULE_list_items = 12;
exaParser.RULE_dyad = 13;
exaParser.RULE_field = 14;

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

ModuleContext.prototype.statement_list = function() {
    return this.getTypedRuleContext(Statement_listContext,0);
};

ModuleContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterModule(this);
	}
};

ModuleContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitModule(this);
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
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 30;
        this.statement_list();
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

function Statement_listContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_statement_list;
    return this;
}

Statement_listContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Statement_listContext.prototype.constructor = Statement_listContext;

Statement_listContext.prototype.statement = function() {
    return this.getTypedRuleContext(StatementContext,0);
};

Statement_listContext.prototype.statement_list = function() {
    return this.getTypedRuleContext(Statement_listContext,0);
};

Statement_listContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterStatement_list(this);
	}
};

Statement_listContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitStatement_list(this);
	}
};

Statement_listContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitStatement_list(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.Statement_listContext = Statement_listContext;

exaParser.prototype.statement_list = function() {

    var localctx = new Statement_listContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, exaParser.RULE_statement_list);
    try {
        this.state = 36;
        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 32;
            this.statement();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 33;
            this.statement();
            this.state = 34;
            this.statement_list();
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


function ReceiveContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ReceiveContext.prototype = Object.create(StatementContext.prototype);
ReceiveContext.prototype.constructor = ReceiveContext;

exaParser.ReceiveContext = ReceiveContext;

ReceiveContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.ID);
    } else {
        return this.getToken(exaParser.ID, i);
    }
};

ReceiveContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterReceive(this);
	}
};

ReceiveContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitReceive(this);
	}
};

ReceiveContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitReceive(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ResponseStmtContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ResponseStmtContext.prototype = Object.create(StatementContext.prototype);
ResponseStmtContext.prototype.constructor = ResponseStmtContext;

exaParser.ResponseStmtContext = ResponseStmtContext;

ResponseStmtContext.prototype.response = function() {
    return this.getTypedRuleContext(ResponseContext,0);
};
ResponseStmtContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterResponseStmt(this);
	}
};

ResponseStmtContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitResponseStmt(this);
	}
};

ResponseStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitResponseStmt(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExprStmtContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExprStmtContext.prototype = Object.create(StatementContext.prototype);
ExprStmtContext.prototype.constructor = ExprStmtContext;

exaParser.ExprStmtContext = ExprStmtContext;

ExprStmtContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
ExprStmtContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterExprStmt(this);
	}
};

ExprStmtContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitExprStmt(this);
	}
};

ExprStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitExprStmt(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ConstantContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ConstantContext.prototype = Object.create(StatementContext.prototype);
ConstantContext.prototype.constructor = ConstantContext;

exaParser.ConstantContext = ConstantContext;

ConstantContext.prototype.ID = function() {
    return this.getToken(exaParser.ID, 0);
};

ConstantContext.prototype.literal = function() {
    return this.getTypedRuleContext(LiteralContext,0);
};
ConstantContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterConstant(this);
	}
};

ConstantContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitConstant(this);
	}
};

ConstantContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitConstant(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ConditionalStmtContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ConditionalStmtContext.prototype = Object.create(StatementContext.prototype);
ConditionalStmtContext.prototype.constructor = ConditionalStmtContext;

exaParser.ConditionalStmtContext = ConditionalStmtContext;

ConditionalStmtContext.prototype.conditional = function() {
    return this.getTypedRuleContext(ConditionalContext,0);
};
ConditionalStmtContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterConditionalStmt(this);
	}
};

ConditionalStmtContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitConditionalStmt(this);
	}
};

ConditionalStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitConditionalStmt(this);
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

AssignmentContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};

AssignmentContext.prototype.assignment_op = function() {
    return this.getTypedRuleContext(Assignment_opContext,0);
};

AssignmentContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
AssignmentContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterAssignment(this);
	}
};

AssignmentContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitAssignment(this);
	}
};

AssignmentContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitAssignment(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SpliceContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SpliceContext.prototype = Object.create(StatementContext.prototype);
SpliceContext.prototype.constructor = SpliceContext;

exaParser.SpliceContext = SpliceContext;

SpliceContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SpliceContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};
SpliceContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterSplice(this);
	}
};

SpliceContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitSplice(this);
	}
};

SpliceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSplice(this);
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
IterationContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterIteration(this);
	}
};

IterationContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitIteration(this);
	}
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

IncDecContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};
IncDecContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterIncDec(this);
	}
};

IncDecContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitIncDec(this);
	}
};

IncDecContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitIncDec(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function DimensionContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DimensionContext.prototype = Object.create(StatementContext.prototype);
DimensionContext.prototype.constructor = DimensionContext;

exaParser.DimensionContext = DimensionContext;

DimensionContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(exaParser.ID);
    } else {
        return this.getToken(exaParser.ID, i);
    }
};

DimensionContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterDimension(this);
	}
};

DimensionContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitDimension(this);
	}
};

DimensionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDimension(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.StatementContext = StatementContext;

exaParser.prototype.statement = function() {

    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, exaParser.RULE_statement);
    var _la = 0; // Token type
    try {
        this.state = 89;
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        switch(la_) {
        case 1:
            localctx = new ReceiveContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 38;
            this.match(exaParser.T__0);
            this.state = 39;
            this.match(exaParser.ID);
            this.state = 44;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===exaParser.T__1) {
                this.state = 40;
                this.match(exaParser.T__1);
                this.state = 41;
                this.match(exaParser.ID);
                this.state = 46;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 47;
            this.match(exaParser.T__2);
            break;

        case 2:
            localctx = new ConstantContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 48;
            this.match(exaParser.ID);
            this.state = 49;
            this.match(exaParser.T__3);
            this.state = 50;
            this.literal();
            this.state = 51;
            this.match(exaParser.T__2);
            break;

        case 3:
            localctx = new DimensionContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 53;
            this.match(exaParser.T__4);
            this.state = 54;
            this.match(exaParser.ID);
            this.state = 59; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 56;
                _la = this._input.LA(1);
                if(_la===exaParser.T__1) {
                    this.state = 55;
                    this.match(exaParser.T__1);
                }

                this.state = 58;
                this.match(exaParser.ID);
                this.state = 61; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===exaParser.T__1 || _la===exaParser.ID);
            this.state = 63;
            this.match(exaParser.T__2);
            break;

        case 4:
            localctx = new ResponseStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 64;
            this.response();
            this.state = 65;
            this.match(exaParser.T__2);
            break;

        case 5:
            localctx = new AssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 67;
            this.lvalue(0);
            this.state = 68;
            this.assignment_op();
            this.state = 69;
            this.expr(0);
            this.state = 70;
            this.match(exaParser.T__2);
            break;

        case 6:
            localctx = new IncDecContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 72;
            this.lvalue(0);
            this.state = 73;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===exaParser.T__5 || _la===exaParser.T__6)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 74;
            this.match(exaParser.T__2);
            break;

        case 7:
            localctx = new SpliceContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 76;
            this.expr(0);
            this.state = 77;
            this.match(exaParser.T__7);
            this.state = 78;
            this.lvalue(0);
            this.state = 79;
            this.match(exaParser.T__2);
            break;

        case 8:
            localctx = new ConditionalStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 81;
            this.conditional();
            break;

        case 9:
            localctx = new IterationContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 82;
            this.match(exaParser.T__8);
            this.state = 83;
            this.expr(0);
            this.state = 84;
            this.block();
            break;

        case 10:
            localctx = new ExprStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 10);
            this.state = 86;
            this.expr(0);
            this.state = 87;
            this.match(exaParser.T__2);
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

function ResponseContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_response;
    return this;
}

ResponseContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ResponseContext.prototype.constructor = ResponseContext;

ResponseContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};

ResponseContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterResponse(this);
	}
};

ResponseContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitResponse(this);
	}
};

ResponseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitResponse(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.ResponseContext = ResponseContext;

exaParser.prototype.response = function() {

    var localctx = new ResponseContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, exaParser.RULE_response);
    try {
        this.state = 97;
        switch(this._input.LA(1)) {
        case exaParser.T__9:
            this.enterOuterAlt(localctx, 1);
            this.state = 91;
            this.match(exaParser.T__9);
            this.state = 92;
            this.exprList();
            break;
        case exaParser.T__10:
            this.enterOuterAlt(localctx, 2);
            this.state = 93;
            this.match(exaParser.T__10);
            this.state = 94;
            this.exprList();
            break;
        case exaParser.T__11:
            this.enterOuterAlt(localctx, 3);
            this.state = 95;
            this.match(exaParser.T__11);
            this.state = 96;
            this.exprList();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
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


Assignment_opContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterAssignment_op(this);
	}
};

Assignment_opContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitAssignment_op(this);
	}
};

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
    this.enterRule(localctx, 8, exaParser.RULE_assignment_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 99;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__12) | (1 << exaParser.T__13) | (1 << exaParser.T__14) | (1 << exaParser.T__15) | (1 << exaParser.T__16) | (1 << exaParser.T__17))) !== 0))) {
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

ConditionalContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

ConditionalContext.prototype.block = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BlockContext);
    } else {
        return this.getTypedRuleContext(BlockContext,i);
    }
};

ConditionalContext.prototype.conditional = function() {
    return this.getTypedRuleContext(ConditionalContext,0);
};

ConditionalContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterConditional(this);
	}
};

ConditionalContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitConditional(this);
	}
};

ConditionalContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitConditional(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.ConditionalContext = ConditionalContext;

exaParser.prototype.conditional = function() {

    var localctx = new ConditionalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, exaParser.RULE_conditional);
    try {
        this.state = 117;
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 101;
            this.match(exaParser.T__18);
            this.state = 102;
            this.expr(0);
            this.state = 103;
            this.block();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 105;
            this.match(exaParser.T__18);
            this.state = 106;
            this.expr(0);
            this.state = 107;
            this.block();
            this.state = 108;
            this.match(exaParser.T__19);
            this.state = 109;
            this.block();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 111;
            this.match(exaParser.T__18);
            this.state = 112;
            this.expr(0);
            this.state = 113;
            this.block();
            this.state = 114;
            this.match(exaParser.T__19);
            this.state = 115;
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

BlockContext.prototype.statement_list = function() {
    return this.getTypedRuleContext(Statement_listContext,0);
};

BlockContext.prototype.END = function() {
    return this.getToken(exaParser.END, 0);
};

BlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterBlock(this);
	}
};

BlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitBlock(this);
	}
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
    this.enterRule(localctx, 12, exaParser.RULE_block);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 119;
        this.match(exaParser.BEGIN);
        this.state = 120;
        this.statement_list();
        this.state = 121;
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

function CallContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CallContext.prototype = Object.create(ExprContext.prototype);
CallContext.prototype.constructor = CallContext;

exaParser.CallContext = CallContext;

CallContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

CallContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};

CallContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};
CallContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterCall(this);
	}
};

CallContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitCall(this);
	}
};

CallContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitCall(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function InverseContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

InverseContext.prototype = Object.create(ExprContext.prototype);
InverseContext.prototype.constructor = InverseContext;

exaParser.InverseContext = InverseContext;

InverseContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
InverseContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterInverse(this);
	}
};

InverseContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitInverse(this);
	}
};

InverseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitInverse(this);
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
CompareContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterCompare(this);
	}
};

CompareContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitCompare(this);
	}
};

CompareContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitCompare(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function MeasureContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MeasureContext.prototype = Object.create(ExprContext.prototype);
MeasureContext.prototype.constructor = MeasureContext;

exaParser.MeasureContext = MeasureContext;

MeasureContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
MeasureContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterMeasure(this);
	}
};

MeasureContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitMeasure(this);
	}
};

MeasureContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitMeasure(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function DispatchContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DispatchContext.prototype = Object.create(ExprContext.prototype);
DispatchContext.prototype.constructor = DispatchContext;

exaParser.DispatchContext = DispatchContext;

DispatchContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

DispatchContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};

DispatchContext.prototype.block = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BlockContext);
    } else {
        return this.getTypedRuleContext(BlockContext,i);
    }
};
DispatchContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterDispatch(this);
	}
};

DispatchContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitDispatch(this);
	}
};

DispatchContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDispatch(this);
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
AddSubContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterAddSub(this);
	}
};

AddSubContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitAddSub(this);
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
MembershipContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterMembership(this);
	}
};

MembershipContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitMembership(this);
	}
};

MembershipContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitMembership(this);
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
WrapContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterWrap(this);
	}
};

WrapContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitWrap(this);
	}
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
LitExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterLitExpr(this);
	}
};

LitExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitLitExpr(this);
	}
};

LitExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitLitExpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ValExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ValExprContext.prototype = Object.create(ExprContext.prototype);
ValExprContext.prototype.constructor = ValExprContext;

exaParser.ValExprContext = ValExprContext;

ValExprContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};
ValExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterValExpr(this);
	}
};

ValExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitValExpr(this);
	}
};

ValExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitValExpr(this);
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
MulDivContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterMulDiv(this);
	}
};

MulDivContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitMulDiv(this);
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
LogicalContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterLogical(this);
	}
};

LogicalContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitLogical(this);
	}
};

LogicalContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitLogical(this);
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
    var _startState = 14;
    this.enterRecursionRule(localctx, 14, exaParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 149;
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        switch(la_) {
        case 1:
            localctx = new MeasureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 124;
            this.match(exaParser.T__25);
            this.state = 125;
            this.expr(10);
            break;

        case 2:
            localctx = new InverseContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 126;
            this.match(exaParser.T__26);
            this.state = 127;
            this.expr(9);
            break;

        case 3:
            localctx = new DispatchContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 128;
            this.match(exaParser.T__23);
            this.state = 129;
            this.expr(0);
            this.state = 130;
            this.match(exaParser.T__20);
            this.state = 132;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__20) | (1 << exaParser.T__23) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__44 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                this.state = 131;
                this.exprList();
            }

            this.state = 134;
            this.match(exaParser.T__21);
            this.state = 137;
            var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
            if(la_===1) {
                this.state = 135;
                this.match(exaParser.T__24);
                this.state = 136;
                this.block();

            }
            this.state = 141;
            var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
            if(la_===1) {
                this.state = 139;
                this.match(exaParser.T__22);
                this.state = 140;
                this.block();

            }
            break;

        case 4:
            localctx = new WrapContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 143;
            this.match(exaParser.T__20);
            this.state = 144;
            this.expr(0);
            this.state = 145;
            this.match(exaParser.T__21);
            break;

        case 5:
            localctx = new LitExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 147;
            this.literal();
            break;

        case 6:
            localctx = new ValExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 148;
            this.lvalue(0);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 178;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,14,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 176;
                var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 151;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 152;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__23) | (1 << exaParser.T__27) | (1 << exaParser.T__28))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 153;
                    this.expr(9);
                    break;

                case 2:
                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 154;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 155;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__29 || _la===exaParser.T__30)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 156;
                    this.expr(8);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 157;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 158;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (exaParser.T__31 - 32)) | (1 << (exaParser.T__32 - 32)) | (1 << (exaParser.T__33 - 32)) | (1 << (exaParser.T__34 - 32)) | (1 << (exaParser.T__35 - 32)) | (1 << (exaParser.T__36 - 32)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 159;
                    this.expr(7);
                    break;

                case 4:
                    localctx = new LogicalContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 160;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 161;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__37 || _la===exaParser.T__38)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 162;
                    this.expr(6);
                    break;

                case 5:
                    localctx = new MembershipContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 163;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 164;
                    this.match(exaParser.T__39);
                    this.state = 165;
                    this.expr(5);
                    break;

                case 6:
                    localctx = new CallContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 166;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 167;
                    this.match(exaParser.T__20);
                    this.state = 169;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__20) | (1 << exaParser.T__23) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__44 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 168;
                        this.exprList();
                    }

                    this.state = 171;
                    this.match(exaParser.T__21);
                    this.state = 174;
                    var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
                    if(la_===1) {
                        this.state = 172;
                        this.match(exaParser.T__22);
                        this.state = 173;
                        this.block();

                    }
                    break;

                } 
            }
            this.state = 180;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,14,this._ctx);
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

ExprListContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterExprList(this);
	}
};

ExprListContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitExprList(this);
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
    this.enterRule(localctx, 16, exaParser.RULE_exprList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 181;
        this.expr(0);
        this.state = 186;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===exaParser.T__1) {
            this.state = 182;
            this.match(exaParser.T__1);
            this.state = 183;
            this.expr(0);
            this.state = 188;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
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

function LvalueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_lvalue;
    return this;
}

LvalueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LvalueContext.prototype.constructor = LvalueContext;


 
LvalueContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function ExcisionContext(parser, ctx) {
	LvalueContext.call(this, parser);
    LvalueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExcisionContext.prototype = Object.create(LvalueContext.prototype);
ExcisionContext.prototype.constructor = ExcisionContext;

exaParser.ExcisionContext = ExcisionContext;

ExcisionContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};

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
ExcisionContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterExcision(this);
	}
};

ExcisionContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitExcision(this);
	}
};

ExcisionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitExcision(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SelectContext(parser, ctx) {
	LvalueContext.call(this, parser);
    LvalueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SelectContext.prototype = Object.create(LvalueContext.prototype);
SelectContext.prototype.constructor = SelectContext;

exaParser.SelectContext = SelectContext;

SelectContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};

SelectContext.prototype.ID = function() {
    return this.getToken(exaParser.ID, 0);
};
SelectContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterSelect(this);
	}
};

SelectContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitSelect(this);
	}
};

SelectContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSelect(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SubscriptContext(parser, ctx) {
	LvalueContext.call(this, parser);
    LvalueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SubscriptContext.prototype = Object.create(LvalueContext.prototype);
SubscriptContext.prototype.constructor = SubscriptContext;

exaParser.SubscriptContext = SubscriptContext;

SubscriptContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};

SubscriptContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
SubscriptContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterSubscript(this);
	}
};

SubscriptContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitSubscript(this);
	}
};

SubscriptContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSubscript(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SliceContext(parser, ctx) {
	LvalueContext.call(this, parser);
    LvalueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SliceContext.prototype = Object.create(LvalueContext.prototype);
SliceContext.prototype.constructor = SliceContext;

exaParser.SliceContext = SliceContext;

SliceContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};

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
SliceContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterSlice(this);
	}
};

SliceContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitSlice(this);
	}
};

SliceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSlice(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function IdContext(parser, ctx) {
	LvalueContext.call(this, parser);
    LvalueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IdContext.prototype = Object.create(LvalueContext.prototype);
IdContext.prototype.constructor = IdContext;

exaParser.IdContext = IdContext;

IdContext.prototype.ID = function() {
    return this.getToken(exaParser.ID, 0);
};
IdContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterId(this);
	}
};

IdContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitId(this);
	}
};

IdContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitId(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExtractionContext(parser, ctx) {
	LvalueContext.call(this, parser);
    LvalueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExtractionContext.prototype = Object.create(LvalueContext.prototype);
ExtractionContext.prototype.constructor = ExtractionContext;

exaParser.ExtractionContext = ExtractionContext;

ExtractionContext.prototype.lvalue = function() {
    return this.getTypedRuleContext(LvalueContext,0);
};

ExtractionContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
ExtractionContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterExtraction(this);
	}
};

ExtractionContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitExtraction(this);
	}
};

ExtractionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitExtraction(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function DestructureContext(parser, ctx) {
	LvalueContext.call(this, parser);
    LvalueContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DestructureContext.prototype = Object.create(LvalueContext.prototype);
DestructureContext.prototype.constructor = DestructureContext;

exaParser.DestructureContext = DestructureContext;

DestructureContext.prototype.lvalue = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LvalueContext);
    } else {
        return this.getTypedRuleContext(LvalueContext,i);
    }
};
DestructureContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterDestructure(this);
	}
};

DestructureContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitDestructure(this);
	}
};

DestructureContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDestructure(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.prototype.lvalue = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new LvalueContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 18;
    this.enterRecursionRule(localctx, 18, exaParser.RULE_lvalue, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 201;
        switch(this._input.LA(1)) {
        case exaParser.ID:
            localctx = new IdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 190;
            this.match(exaParser.ID);
            break;
        case exaParser.T__20:
            localctx = new DestructureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 191;
            this.match(exaParser.T__20);
            this.state = 192;
            this.lvalue(0);
            this.state = 195; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 193;
                this.match(exaParser.T__1);
                this.state = 194;
                this.lvalue(0);
                this.state = 197; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===exaParser.T__1);
            this.state = 199;
            this.match(exaParser.T__21);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 238;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,23,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 236;
                var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new SubscriptContext(this, new LvalueContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_lvalue);
                    this.state = 203;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 204;
                    this.match(exaParser.T__40);
                    this.state = 205;
                    this.expr(0);
                    this.state = 206;
                    this.match(exaParser.T__41);
                    break;

                case 2:
                    localctx = new SliceContext(this, new LvalueContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_lvalue);
                    this.state = 208;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 209;
                    this.match(exaParser.T__40);
                    this.state = 211;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__20) | (1 << exaParser.T__23) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__44 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 210;
                        this.expr(0);
                    }

                    this.state = 213;
                    this.match(exaParser.T__42);
                    this.state = 215;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__20) | (1 << exaParser.T__23) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__44 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 214;
                        this.expr(0);
                    }

                    this.state = 217;
                    this.match(exaParser.T__41);
                    break;

                case 3:
                    localctx = new ExtractionContext(this, new LvalueContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_lvalue);
                    this.state = 218;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 219;
                    this.match(exaParser.BEGIN);
                    this.state = 220;
                    this.expr(0);
                    this.state = 221;
                    this.match(exaParser.END);
                    break;

                case 4:
                    localctx = new ExcisionContext(this, new LvalueContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_lvalue);
                    this.state = 223;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 224;
                    this.match(exaParser.BEGIN);
                    this.state = 226;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__20) | (1 << exaParser.T__23) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__44 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 225;
                        this.expr(0);
                    }

                    this.state = 228;
                    this.match(exaParser.T__42);
                    this.state = 230;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__20) | (1 << exaParser.T__23) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__44 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 229;
                        this.expr(0);
                    }

                    this.state = 232;
                    this.match(exaParser.END);
                    break;

                case 5:
                    localctx = new SelectContext(this, new LvalueContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_lvalue);
                    this.state = 233;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 234;
                    this.match(exaParser.T__43);
                    this.state = 235;
                    this.match(exaParser.ID);
                    break;

                } 
            }
            this.state = 240;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,23,this._ctx);
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

NilContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterNil(this);
	}
};

NilContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitNil(this);
	}
};

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
NumberContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterNumber(this);
	}
};

NumberContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitNumber(this);
	}
};

NumberContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitNumber(this);
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
BoolContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterBool(this);
	}
};

BoolContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitBool(this);
	}
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
StringContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterString(this);
	}
};

StringContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitString(this);
	}
};

StringContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitString(this);
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

ServiceContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};
ServiceContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterService(this);
	}
};

ServiceContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitService(this);
	}
};

ServiceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitService(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function RecordContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

RecordContext.prototype = Object.create(LiteralContext.prototype);
RecordContext.prototype.constructor = RecordContext;

exaParser.RecordContext = RecordContext;

RecordContext.prototype.fieldList = function() {
    return this.getTypedRuleContext(FieldListContext,0);
};
RecordContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterRecord(this);
	}
};

RecordContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitRecord(this);
	}
};

RecordContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitRecord(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ModrefContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ModrefContext.prototype = Object.create(LiteralContext.prototype);
ModrefContext.prototype.constructor = ModrefContext;

exaParser.ModrefContext = ModrefContext;

ModrefContext.prototype.MODREF = function() {
    return this.getToken(exaParser.MODREF, 0);
};
ModrefContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterModref(this);
	}
};

ModrefContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitModref(this);
	}
};

ModrefContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitModref(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ListContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ListContext.prototype = Object.create(LiteralContext.prototype);
ListContext.prototype.constructor = ListContext;

exaParser.ListContext = ListContext;

ListContext.prototype.list_items = function() {
    return this.getTypedRuleContext(List_itemsContext,0);
};
ListContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterList(this);
	}
};

ListContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitList(this);
	}
};

ListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitList(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.LiteralContext = LiteralContext;

exaParser.prototype.literal = function() {

    var localctx = new LiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, exaParser.RULE_literal);
    var _la = 0; // Token type
    try {
        this.state = 258;
        switch(this._input.LA(1)) {
        case exaParser.NIL:
            localctx = new NilContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 241;
            this.match(exaParser.NIL);
            break;
        case exaParser.BOOL:
            localctx = new BoolContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 242;
            this.match(exaParser.BOOL);
            break;
        case exaParser.NUMBER:
            localctx = new NumberContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 243;
            this.match(exaParser.NUMBER);
            break;
        case exaParser.STRING:
            localctx = new StringContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 244;
            this.match(exaParser.STRING);
            break;
        case exaParser.MODREF:
            localctx = new ModrefContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 245;
            this.match(exaParser.MODREF);
            break;
        case exaParser.T__44:
            localctx = new ServiceContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 246;
            this.match(exaParser.T__44);
            this.state = 247;
            this.block();
            break;
        case exaParser.T__40:
            localctx = new ListContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 248;
            this.match(exaParser.T__40);
            this.state = 250;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__20) | (1 << exaParser.T__23) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__42 - 41)) | (1 << (exaParser.T__44 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                this.state = 249;
                this.list_items();
            }

            this.state = 252;
            this.match(exaParser.T__41);
            break;
        case exaParser.BEGIN:
            localctx = new RecordContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 253;
            this.match(exaParser.BEGIN);
            this.state = 255;
            _la = this._input.LA(1);
            if(_la===exaParser.ID) {
                this.state = 254;
                this.fieldList();
            }

            this.state = 257;
            this.match(exaParser.END);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
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

FieldListContext.prototype.field = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldContext);
    } else {
        return this.getTypedRuleContext(FieldContext,i);
    }
};

FieldListContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterFieldList(this);
	}
};

FieldListContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitFieldList(this);
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
    this.enterRule(localctx, 22, exaParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 260;
        this.field();
        this.state = 265;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===exaParser.T__1) {
            this.state = 261;
            this.match(exaParser.T__1);
            this.state = 262;
            this.field();
            this.state = 267;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
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

function List_itemsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_list_items;
    return this;
}

List_itemsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
List_itemsContext.prototype.constructor = List_itemsContext;

List_itemsContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

List_itemsContext.prototype.dyad = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DyadContext);
    } else {
        return this.getTypedRuleContext(DyadContext,i);
    }
};

List_itemsContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterList_items(this);
	}
};

List_itemsContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitList_items(this);
	}
};

List_itemsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitList_items(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.List_itemsContext = List_itemsContext;

exaParser.prototype.list_items = function() {

    var localctx = new List_itemsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, exaParser.RULE_list_items);
    var _la = 0; // Token type
    try {
        this.state = 285;
        var la_ = this._interp.adaptivePredict(this._input,30,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 268;
            this.match(exaParser.T__42);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 269;
            this.expr(0);
            this.state = 274;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===exaParser.T__1) {
                this.state = 270;
                this.match(exaParser.T__1);
                this.state = 271;
                this.expr(0);
                this.state = 276;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 277;
            this.dyad();
            this.state = 282;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===exaParser.T__1) {
                this.state = 278;
                this.match(exaParser.T__1);
                this.state = 279;
                this.dyad();
                this.state = 284;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
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

function DyadContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_dyad;
    return this;
}

DyadContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DyadContext.prototype.constructor = DyadContext;

DyadContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

DyadContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterDyad(this);
	}
};

DyadContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitDyad(this);
	}
};

DyadContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDyad(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.DyadContext = DyadContext;

exaParser.prototype.dyad = function() {

    var localctx = new DyadContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, exaParser.RULE_dyad);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 287;
        this.expr(0);
        this.state = 288;
        this.match(exaParser.T__42);
        this.state = 289;
        this.expr(0);
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

function FieldContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_field;
    return this;
}

FieldContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldContext.prototype.constructor = FieldContext;

FieldContext.prototype.ID = function() {
    return this.getToken(exaParser.ID, 0);
};

FieldContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

FieldContext.prototype.enterRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.enterField(this);
	}
};

FieldContext.prototype.exitRule = function(listener) {
    if(listener instanceof exaListener ) {
        listener.exitField(this);
	}
};

FieldContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitField(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.FieldContext = FieldContext;

exaParser.prototype.field = function() {

    var localctx = new FieldContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, exaParser.RULE_field);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 291;
        this.match(exaParser.ID);
        this.state = 292;
        this.match(exaParser.T__42);
        this.state = 293;
        this.expr(0);
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
	case 7:
			return this.expr_sempred(localctx, predIndex);
	case 9:
			return this.lvalue_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

exaParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 8);
		case 1:
			return this.precpred(this._ctx, 7);
		case 2:
			return this.precpred(this._ctx, 6);
		case 3:
			return this.precpred(this._ctx, 5);
		case 4:
			return this.precpred(this._ctx, 4);
		case 5:
			return this.precpred(this._ctx, 12);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

exaParser.prototype.lvalue_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 6:
			return this.precpred(this._ctx, 6);
		case 7:
			return this.precpred(this._ctx, 5);
		case 8:
			return this.precpred(this._ctx, 4);
		case 9:
			return this.precpred(this._ctx, 3);
		case 10:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.exaParser = exaParser;
