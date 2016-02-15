// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var exaVisitor = require('./exaVisitor').exaVisitor;

var grammarFileName = "exa.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003?\u0122\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
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
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0005\u0004_\n\u0004\u0003\u0005\u0003\u0005\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006s\n\u0006\u0003\u0007",
    "\u0003\u0007\u0005\u0007w\n\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0005\b\u0086\n\b\u0003\b\u0003\b\u0005\b\u008a\n\b\u0003\b\u0005",
    "\b\u008d\n\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b",
    "\u0003\b\u0006\b\u0097\n\b\r\b\u000e\b\u0098\u0003\b\u0003\b\u0003\b",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b\u00a2\n\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b\u00b6\n\b",
    "\u0003\b\u0003\b\u0005\b\u00ba\n\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0005\b\u00c4\n\b\u0003\b\u0003\b\u0005\b",
    "\u00c8\n\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0005\b\u00d3\n\b\u0003\b\u0003\b\u0005\b\u00d7\n\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0007\b\u00dd\n\b\f\b\u000e\b\u00e0\u000b",
    "\b\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00ed\n\u000b",
    "\u0003\f\u0003\f\u0003\f\u0007\f\u00f2\n\f\f\f\u000e\f\u00f5\u000b\f",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0005\r\u0102\n\r\u0003\r\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0007\r\u0109\n\r\f\r\u000e\r\u010c\u000b\r\u0003\r\u0003\r",
    "\u0005\r\u0110\n\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0007\u000f\u0119\n\u000f\f\u000f\u000e",
    "\u000f\u011c\u000b\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0002\u0003\u000e\u0011\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u001a\u001c\u001e\u0002\t\u0003\u0002\b\n\u0003",
    "\u0002\u000b\f\u0003\u0002\u0010\u0015\u0004\u0002\u001a\u001a\u001e",
    "\u001f\u0003\u0002 !\u0003\u0002\"\'\u0003\u0002()\u014e\u0002 \u0003",
    "\u0002\u0002\u0002\u0004&\u0003\u0002\u0002\u0002\u0006^\u0003\u0002",
    "\u0002\u0002\b`\u0003\u0002\u0002\u0002\nr\u0003\u0002\u0002\u0002\f",
    "t\u0003\u0002\u0002\u0002\u000e\u00a1\u0003\u0002\u0002\u0002\u0010",
    "\u00e1\u0003\u0002\u0002\u0002\u0012\u00e4\u0003\u0002\u0002\u0002\u0014",
    "\u00ec\u0003\u0002\u0002\u0002\u0016\u00ee\u0003\u0002\u0002\u0002\u0018",
    "\u010f\u0003\u0002\u0002\u0002\u001a\u0111\u0003\u0002\u0002\u0002\u001c",
    "\u0115\u0003\u0002\u0002\u0002\u001e\u011d\u0003\u0002\u0002\u0002 ",
    "!\u0005\u0004\u0003\u0002!\u0003\u0003\u0002\u0002\u0002\"\'\u0005\u0006",
    "\u0004\u0002#$\u0005\u0006\u0004\u0002$%\u0005\u0004\u0003\u0002%\'",
    "\u0003\u0002\u0002\u0002&\"\u0003\u0002\u0002\u0002&#\u0003\u0002\u0002",
    "\u0002\'\u0005\u0003\u0002\u0002\u0002()\u0007\u0003\u0002\u0002).\u0007",
    ":\u0002\u0002*+\u0007\u0004\u0002\u0002+-\u0007:\u0002\u0002,*\u0003",
    "\u0002\u0002\u0002-0\u0003\u0002\u0002\u0002.,\u0003\u0002\u0002\u0002",
    "./\u0003\u0002\u0002\u0002/1\u0003\u0002\u0002\u00020.\u0003\u0002\u0002",
    "\u00021_\u0007\u0005\u0002\u000223\u0007:\u0002\u000234\u0007\u0006",
    "\u0002\u000245\u0005\u0018\r\u000256\u0007\u0005\u0002\u00026_\u0003",
    "\u0002\u0002\u000278\u0007\u0007\u0002\u00028=\u0007:\u0002\u00029;",
    "\u0007\u0004\u0002\u0002:9\u0003\u0002\u0002\u0002:;\u0003\u0002\u0002",
    "\u0002;<\u0003\u0002\u0002\u0002<>\u0007:\u0002\u0002=:\u0003\u0002",
    "\u0002\u0002>?\u0003\u0002\u0002\u0002?=\u0003\u0002\u0002\u0002?@\u0003",
    "\u0002\u0002\u0002@A\u0003\u0002\u0002\u0002A_\u0007\u0005\u0002\u0002",
    "BC\t\u0002\u0002\u0002CD\u0005\u0016\f\u0002DE\u0007\u0005\u0002\u0002",
    "E_\u0003\u0002\u0002\u0002FG\u0005\u000e\b\u0002GH\u0005\b\u0005\u0002",
    "HI\u0005\u000e\b\u0002IJ\u0007\u0005\u0002\u0002J_\u0003\u0002\u0002",
    "\u0002KL\u0005\u000e\b\u0002LM\t\u0003\u0002\u0002MN\u0007\u0005\u0002",
    "\u0002N_\u0003\u0002\u0002\u0002OP\u0005\u000e\b\u0002PQ\u0007\r\u0002",
    "\u0002QR\u0005\u000e\b\u0002RS\u0007\u0005\u0002\u0002S_\u0003\u0002",
    "\u0002\u0002T_\u0005\n\u0006\u0002UV\u0007\u000e\u0002\u0002VW\u0005",
    "\u000e\b\u0002WX\u0005\f\u0007\u0002X_\u0003\u0002\u0002\u0002YZ\u0007",
    "\u000f\u0002\u0002Z_\u0007\u0005\u0002\u0002[\\\u0005\u000e\b\u0002",
    "\\]\u0007\u0005\u0002\u0002]_\u0003\u0002\u0002\u0002^(\u0003\u0002",
    "\u0002\u0002^2\u0003\u0002\u0002\u0002^7\u0003\u0002\u0002\u0002^B\u0003",
    "\u0002\u0002\u0002^F\u0003\u0002\u0002\u0002^K\u0003\u0002\u0002\u0002",
    "^O\u0003\u0002\u0002\u0002^T\u0003\u0002\u0002\u0002^U\u0003\u0002\u0002",
    "\u0002^Y\u0003\u0002\u0002\u0002^[\u0003\u0002\u0002\u0002_\u0007\u0003",
    "\u0002\u0002\u0002`a\t\u0004\u0002\u0002a\t\u0003\u0002\u0002\u0002",
    "bc\u0007\u0016\u0002\u0002cd\u0005\u000e\b\u0002de\u0005\f\u0007\u0002",
    "es\u0003\u0002\u0002\u0002fg\u0007\u0016\u0002\u0002gh\u0005\u000e\b",
    "\u0002hi\u0005\f\u0007\u0002ij\u0007\u0017\u0002\u0002jk\u0005\f\u0007",
    "\u0002ks\u0003\u0002\u0002\u0002lm\u0007\u0016\u0002\u0002mn\u0005\u000e",
    "\b\u0002no\u0005\f\u0007\u0002op\u0007\u0017\u0002\u0002pq\u0005\n\u0006",
    "\u0002qs\u0003\u0002\u0002\u0002rb\u0003\u0002\u0002\u0002rf\u0003\u0002",
    "\u0002\u0002rl\u0003\u0002\u0002\u0002s\u000b\u0003\u0002\u0002\u0002",
    "tv\u00075\u0002\u0002uw\u0005\u0004\u0003\u0002vu\u0003\u0002\u0002",
    "\u0002vw\u0003\u0002\u0002\u0002wx\u0003\u0002\u0002\u0002xy\u00076",
    "\u0002\u0002y\r\u0003\u0002\u0002\u0002z{\b\b\u0001\u0002{|\u0007\u001b",
    "\u0002\u0002|\u00a2\u0005\u000e\b\u0014}~\u0007\u001c\u0002\u0002~\u00a2",
    "\u0005\u000e\b\u0013\u007f\u0080\u0007\u001d\u0002\u0002\u0080\u00a2",
    "\u0005\u000e\b\u0012\u0081\u0082\u0007\u001a\u0002\u0002\u0082\u0083",
    "\u0005\u000e\b\u0002\u0083\u0085\u0007\u0018\u0002\u0002\u0084\u0086",
    "\u0005\u0016\f\u0002\u0085\u0084\u0003\u0002\u0002\u0002\u0085\u0086",
    "\u0003\u0002\u0002\u0002\u0086\u0087\u0003\u0002\u0002\u0002\u0087\u0089",
    "\u0007\u0019\u0002\u0002\u0088\u008a\u0005\u0010\t\u0002\u0089\u0088",
    "\u0003\u0002\u0002\u0002\u0089\u008a\u0003\u0002\u0002\u0002\u008a\u008c",
    "\u0003\u0002\u0002\u0002\u008b\u008d\u0005\u0012\n\u0002\u008c\u008b",
    "\u0003\u0002\u0002\u0002\u008c\u008d\u0003\u0002\u0002\u0002\u008d\u00a2",
    "\u0003\u0002\u0002\u0002\u008e\u008f\u0007\u0018\u0002\u0002\u008f\u0090",
    "\u0005\u000e\b\u0002\u0090\u0091\u0007\u0019\u0002\u0002\u0091\u00a2",
    "\u0003\u0002\u0002\u0002\u0092\u0093\u0007\u0018\u0002\u0002\u0093\u0096",
    "\u0007:\u0002\u0002\u0094\u0095\u0007\u0004\u0002\u0002\u0095\u0097",
    "\u0007:\u0002\u0002\u0096\u0094\u0003\u0002\u0002\u0002\u0097\u0098",
    "\u0003\u0002\u0002\u0002\u0098\u0096\u0003\u0002\u0002\u0002\u0098\u0099",
    "\u0003\u0002\u0002\u0002\u0099\u009a\u0003\u0002\u0002\u0002\u009a\u00a2",
    "\u0007\u0019\u0002\u0002\u009b\u009c\u0007<\u0002\u0002\u009c\u009d",
    "\u0005\u0014\u000b\u0002\u009d\u009e\u0007>\u0002\u0002\u009e\u00a2",
    "\u0003\u0002\u0002\u0002\u009f\u00a2\u0005\u0018\r\u0002\u00a0\u00a2",
    "\u0007:\u0002\u0002\u00a1z\u0003\u0002\u0002\u0002\u00a1}\u0003\u0002",
    "\u0002\u0002\u00a1\u007f\u0003\u0002\u0002\u0002\u00a1\u0081\u0003\u0002",
    "\u0002\u0002\u00a1\u008e\u0003\u0002\u0002\u0002\u00a1\u0092\u0003\u0002",
    "\u0002\u0002\u00a1\u009b\u0003\u0002\u0002\u0002\u00a1\u009f\u0003\u0002",
    "\u0002\u0002\u00a1\u00a0\u0003\u0002\u0002\u0002\u00a2\u00de\u0003\u0002",
    "\u0002\u0002\u00a3\u00a4\f\u0011\u0002\u0002\u00a4\u00a5\t\u0005\u0002",
    "\u0002\u00a5\u00dd\u0005\u000e\b\u0012\u00a6\u00a7\f\u0010\u0002\u0002",
    "\u00a7\u00a8\t\u0006\u0002\u0002\u00a8\u00dd\u0005\u000e\b\u0011\u00a9",
    "\u00aa\f\u000f\u0002\u0002\u00aa\u00ab\t\u0007\u0002\u0002\u00ab\u00dd",
    "\u0005\u000e\b\u0010\u00ac\u00ad\f\u000e\u0002\u0002\u00ad\u00ae\t\b",
    "\u0002\u0002\u00ae\u00dd\u0005\u000e\b\u000f\u00af\u00b0\f\r\u0002\u0002",
    "\u00b0\u00b1\u0007*\u0002\u0002\u00b1\u00dd\u0005\u000e\b\u000e\u00b2",
    "\u00b3\f\u0016\u0002\u0002\u00b3\u00b5\u0007\u0018\u0002\u0002\u00b4",
    "\u00b6\u0005\u0016\f\u0002\u00b5\u00b4\u0003\u0002\u0002\u0002\u00b5",
    "\u00b6\u0003\u0002\u0002\u0002\u00b6\u00b7\u0003\u0002\u0002\u0002\u00b7",
    "\u00b9\u0007\u0019\u0002\u0002\u00b8\u00ba\u0005\u0012\n\u0002\u00b9",
    "\u00b8\u0003\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002\u0002\u0002\u00ba",
    "\u00dd\u0003\u0002\u0002\u0002\u00bb\u00bc\f\u000b\u0002\u0002\u00bc",
    "\u00bd\u0007+\u0002\u0002\u00bd\u00be\u0005\u000e\b\u0002\u00be\u00bf",
    "\u0007,\u0002\u0002\u00bf\u00dd\u0003\u0002\u0002\u0002\u00c0\u00c1",
    "\f\n\u0002\u0002\u00c1\u00c3\u0007+\u0002\u0002\u00c2\u00c4\u0005\u000e",
    "\b\u0002\u00c3\u00c2\u0003\u0002\u0002\u0002\u00c3\u00c4\u0003\u0002",
    "\u0002\u0002\u00c4\u00c5\u0003\u0002\u0002\u0002\u00c5\u00c7\u0007-",
    "\u0002\u0002\u00c6\u00c8\u0005\u000e\b\u0002\u00c7\u00c6\u0003\u0002",
    "\u0002\u0002\u00c7\u00c8\u0003\u0002\u0002\u0002\u00c8\u00c9\u0003\u0002",
    "\u0002\u0002\u00c9\u00dd\u0007,\u0002\u0002\u00ca\u00cb\f\t\u0002\u0002",
    "\u00cb\u00cc\u00075\u0002\u0002\u00cc\u00cd\u0005\u000e\b\u0002\u00cd",
    "\u00ce\u00076\u0002\u0002\u00ce\u00dd\u0003\u0002\u0002\u0002\u00cf",
    "\u00d0\f\b\u0002\u0002\u00d0\u00d2\u00075\u0002\u0002\u00d1\u00d3\u0005",
    "\u000e\b\u0002\u00d2\u00d1\u0003\u0002\u0002\u0002\u00d2\u00d3\u0003",
    "\u0002\u0002\u0002\u00d3\u00d4\u0003\u0002\u0002\u0002\u00d4\u00d6\u0007",
    "-\u0002\u0002\u00d5\u00d7\u0005\u000e\b\u0002\u00d6\u00d5\u0003\u0002",
    "\u0002\u0002\u00d6\u00d7\u0003\u0002\u0002\u0002\u00d7\u00d8\u0003\u0002",
    "\u0002\u0002\u00d8\u00dd\u00076\u0002\u0002\u00d9\u00da\f\u0007\u0002",
    "\u0002\u00da\u00db\u0007.\u0002\u0002\u00db\u00dd\u0007:\u0002\u0002",
    "\u00dc\u00a3\u0003\u0002\u0002\u0002\u00dc\u00a6\u0003\u0002\u0002\u0002",
    "\u00dc\u00a9\u0003\u0002\u0002\u0002\u00dc\u00ac\u0003\u0002\u0002\u0002",
    "\u00dc\u00af\u0003\u0002\u0002\u0002\u00dc\u00b2\u0003\u0002\u0002\u0002",
    "\u00dc\u00bb\u0003\u0002\u0002\u0002\u00dc\u00c0\u0003\u0002\u0002\u0002",
    "\u00dc\u00ca\u0003\u0002\u0002\u0002\u00dc\u00cf\u0003\u0002\u0002\u0002",
    "\u00dc\u00d9\u0003\u0002\u0002\u0002\u00dd\u00e0\u0003\u0002\u0002\u0002",
    "\u00de\u00dc\u0003\u0002\u0002\u0002\u00de\u00df\u0003\u0002\u0002\u0002",
    "\u00df\u000f\u0003\u0002\u0002\u0002\u00e0\u00de\u0003\u0002\u0002\u0002",
    "\u00e1\u00e2\u0007/\u0002\u0002\u00e2\u00e3\u0005\f\u0007\u0002\u00e3",
    "\u0011\u0003\u0002\u0002\u0002\u00e4\u00e5\u00070\u0002\u0002\u00e5",
    "\u00e6\u0005\f\u0007\u0002\u00e6\u0013\u0003\u0002\u0002\u0002\u00e7",
    "\u00ed\u0005\u000e\b\u0002\u00e8\u00e9\u0005\u000e\b\u0002\u00e9\u00ea",
    "\u0007=\u0002\u0002\u00ea\u00eb\u0005\u0014\u000b\u0002\u00eb\u00ed",
    "\u0003\u0002\u0002\u0002\u00ec\u00e7\u0003\u0002\u0002\u0002\u00ec\u00e8",
    "\u0003\u0002\u0002\u0002\u00ed\u0015\u0003\u0002\u0002\u0002\u00ee\u00f3",
    "\u0005\u000e\b\u0002\u00ef\u00f0\u0007\u0004\u0002\u0002\u00f0\u00f2",
    "\u0005\u000e\b\u0002\u00f1\u00ef\u0003\u0002\u0002\u0002\u00f2\u00f5",
    "\u0003\u0002\u0002\u0002\u00f3\u00f1\u0003\u0002\u0002\u0002\u00f3\u00f4",
    "\u0003\u0002\u0002\u0002\u00f4\u0017\u0003\u0002\u0002\u0002\u00f5\u00f3",
    "\u0003\u0002\u0002\u0002\u00f6\u0110\u00077\u0002\u0002\u00f7\u0110",
    "\u00078\u0002\u0002\u00f8\u0110\u00079\u0002\u0002\u00f9\u0110\u0007",
    ";\u0002\u0002\u00fa\u0110\u0007?\u0002\u0002\u00fb\u00fc\u00071\u0002",
    "\u0002\u00fc\u0110\u0005\f\u0007\u0002\u00fd\u0101\u0007+\u0002\u0002",
    "\u00fe\u0102\u0007-\u0002\u0002\u00ff\u0102\u0005\u0016\f\u0002\u0100",
    "\u0102\u0005\u001c\u000f\u0002\u0101\u00fe\u0003\u0002\u0002\u0002\u0101",
    "\u00ff\u0003\u0002\u0002\u0002\u0101\u0100\u0003\u0002\u0002\u0002\u0101",
    "\u0102\u0003\u0002\u0002\u0002\u0102\u0103\u0003\u0002\u0002\u0002\u0103",
    "\u0110\u0007,\u0002\u0002\u0104\u0105\u00075\u0002\u0002\u0105\u010a",
    "\u0005\u001a\u000e\u0002\u0106\u0107\u0007\u0004\u0002\u0002\u0107\u0109",
    "\u0005\u001a\u000e\u0002\u0108\u0106\u0003\u0002\u0002\u0002\u0109\u010c",
    "\u0003\u0002\u0002\u0002\u010a\u0108\u0003\u0002\u0002\u0002\u010a\u010b",
    "\u0003\u0002\u0002\u0002\u010b\u010d\u0003\u0002\u0002\u0002\u010c\u010a",
    "\u0003\u0002\u0002\u0002\u010d\u010e\u00076\u0002\u0002\u010e\u0110",
    "\u0003\u0002\u0002\u0002\u010f\u00f6\u0003\u0002\u0002\u0002\u010f\u00f7",
    "\u0003\u0002\u0002\u0002\u010f\u00f8\u0003\u0002\u0002\u0002\u010f\u00f9",
    "\u0003\u0002\u0002\u0002\u010f\u00fa\u0003\u0002\u0002\u0002\u010f\u00fb",
    "\u0003\u0002\u0002\u0002\u010f\u00fd\u0003\u0002\u0002\u0002\u010f\u0104",
    "\u0003\u0002\u0002\u0002\u0110\u0019\u0003\u0002\u0002\u0002\u0111\u0112",
    "\u0007:\u0002\u0002\u0112\u0113\u0007-\u0002\u0002\u0113\u0114\u0005",
    "\u000e\b\u0002\u0114\u001b\u0003\u0002\u0002\u0002\u0115\u011a\u0005",
    "\u001e\u0010\u0002\u0116\u0117\u0007\u0004\u0002\u0002\u0117\u0119\u0005",
    "\u001e\u0010\u0002\u0118\u0116\u0003\u0002\u0002\u0002\u0119\u011c\u0003",
    "\u0002\u0002\u0002\u011a\u0118\u0003\u0002\u0002\u0002\u011a\u011b\u0003",
    "\u0002\u0002\u0002\u011b\u001d\u0003\u0002\u0002\u0002\u011c\u011a\u0003",
    "\u0002\u0002\u0002\u011d\u011e\u0005\u000e\b\u0002\u011e\u011f\u0007",
    "-\u0002\u0002\u011f\u0120\u0005\u000e\b\u0002\u0120\u001f\u0003\u0002",
    "\u0002\u0002\u001c&.:?^rv\u0085\u0089\u008c\u0098\u00a1\u00b5\u00b9",
    "\u00c3\u00c7\u00d2\u00d6\u00dc\u00de\u00ec\u00f3\u0101\u010a\u010f\u011a"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'receive'", "','", "';'", "'is'", "'distinguish'", 
                     "'reply'", "'fail'", "'substitute'", "'++'", "'--'", 
                     "'->'", "'while'", "'skip'", "'='", "'+='", "'-='", 
                     "'*='", "'/='", "'%='", "'if'", "'else'", "'('", "')'", 
                     "'*'", "'#'", "'not'", "'cut'", "'/'", "'%'", "'+'", 
                     "'-'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", 
                     "'and'", "'or'", "'in'", "'['", "']'", "':'", "'.'", 
                     "'then'", "'catch'", "'service'", 'null', 'null', 'null', 
                     "'{'", "'}'", "'nil'" ];

var symbolicNames = [ 'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', "WS", 
                      "LINE_COMMENT", "COMMENT", "BEGIN", "END", "NIL", 
                      "BOOL", "NUMBER", "ID", "STRING", "INTER_BEGIN", "INTER_MID", 
                      "INTER_END", "MODREF" ];

var ruleNames =  [ "module", "statement_list", "statement", "assignment_op", 
                   "conditional", "block", "expr", "replyHandler", "failHandler", 
                   "interpolated", "exprList", "literal", "field", "pairList", 
                   "pair" ];

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
exaParser.WS = 48;
exaParser.LINE_COMMENT = 49;
exaParser.COMMENT = 50;
exaParser.BEGIN = 51;
exaParser.END = 52;
exaParser.NIL = 53;
exaParser.BOOL = 54;
exaParser.NUMBER = 55;
exaParser.ID = 56;
exaParser.STRING = 57;
exaParser.INTER_BEGIN = 58;
exaParser.INTER_MID = 59;
exaParser.INTER_END = 60;
exaParser.MODREF = 61;

exaParser.RULE_module = 0;
exaParser.RULE_statement_list = 1;
exaParser.RULE_statement = 2;
exaParser.RULE_assignment_op = 3;
exaParser.RULE_conditional = 4;
exaParser.RULE_block = 5;
exaParser.RULE_expr = 6;
exaParser.RULE_replyHandler = 7;
exaParser.RULE_failHandler = 8;
exaParser.RULE_interpolated = 9;
exaParser.RULE_exprList = 10;
exaParser.RULE_literal = 11;
exaParser.RULE_field = 12;
exaParser.RULE_pairList = 13;
exaParser.RULE_pair = 14;

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

ReceiveContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitReceive(this);
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
ConstantContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitConstant(this);
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


function SpliceContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SpliceContext.prototype = Object.create(StatementContext.prototype);
SpliceContext.prototype.constructor = SpliceContext;

exaParser.SpliceContext = SpliceContext;

SpliceContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
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
IterationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitIteration(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SkipContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SkipContext.prototype = Object.create(StatementContext.prototype);
SkipContext.prototype.constructor = SkipContext;

exaParser.SkipContext = SkipContext;

SkipContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSkip(this);
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

DimensionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDimension(this);
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
    this.enterRule(localctx, 4, exaParser.RULE_statement);
    var _la = 0; // Token type
    try {
        this.state = 92;
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
            localctx = new ResponseContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 64;
            localctx.channel = this._input.LT(1);
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__5) | (1 << exaParser.T__6) | (1 << exaParser.T__7))) !== 0))) {
                localctx.channel = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 65;
            this.exprList();
            this.state = 66;
            this.match(exaParser.T__2);
            break;

        case 5:
            localctx = new AssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 68;
            this.expr(0);
            this.state = 69;
            this.assignment_op();
            this.state = 70;
            this.expr(0);
            this.state = 71;
            this.match(exaParser.T__2);
            break;

        case 6:
            localctx = new IncDecContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 73;
            this.expr(0);
            this.state = 74;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===exaParser.T__8 || _la===exaParser.T__9)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 75;
            this.match(exaParser.T__2);
            break;

        case 7:
            localctx = new SpliceContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 77;
            this.expr(0);
            this.state = 78;
            this.match(exaParser.T__10);
            this.state = 79;
            this.expr(0);
            this.state = 80;
            this.match(exaParser.T__2);
            break;

        case 8:
            localctx = new CondStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 82;
            this.conditional();
            break;

        case 9:
            localctx = new IterationContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 83;
            this.match(exaParser.T__11);
            this.state = 84;
            this.expr(0);
            this.state = 85;
            this.block();
            break;

        case 10:
            localctx = new SkipContext(this, localctx);
            this.enterOuterAlt(localctx, 10);
            this.state = 87;
            this.match(exaParser.T__12);
            this.state = 88;
            this.match(exaParser.T__2);
            break;

        case 11:
            localctx = new ExprStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 11);
            this.state = 89;
            this.expr(0);
            this.state = 90;
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
    this.enterRule(localctx, 6, exaParser.RULE_assignment_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 94;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__13) | (1 << exaParser.T__14) | (1 << exaParser.T__15) | (1 << exaParser.T__16) | (1 << exaParser.T__17) | (1 << exaParser.T__18))) !== 0))) {
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
    this.enterRule(localctx, 8, exaParser.RULE_conditional);
    try {
        this.state = 112;
        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
        switch(la_) {
        case 1:
            localctx = new IfOnlyContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 96;
            this.match(exaParser.T__19);
            this.state = 97;
            this.expr(0);
            this.state = 98;
            this.block();
            break;

        case 2:
            localctx = new IfElseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 100;
            this.match(exaParser.T__19);
            this.state = 101;
            this.expr(0);
            this.state = 102;
            this.block();
            this.state = 103;
            this.match(exaParser.T__20);
            this.state = 104;
            this.block();
            break;

        case 3:
            localctx = new NestedIfContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 106;
            this.match(exaParser.T__19);
            this.state = 107;
            this.expr(0);
            this.state = 108;
            this.block();
            this.state = 109;
            this.match(exaParser.T__20);
            this.state = 110;
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

BlockContext.prototype.statement_list = function() {
    return this.getTypedRuleContext(Statement_listContext,0);
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
    this.enterRule(localctx, 10, exaParser.RULE_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 114;
        this.match(exaParser.BEGIN);
        this.state = 116;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__0) | (1 << exaParser.T__4) | (1 << exaParser.T__5) | (1 << exaParser.T__6) | (1 << exaParser.T__7) | (1 << exaParser.T__11) | (1 << exaParser.T__12) | (1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__23) | (1 << exaParser.T__24) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
            this.state = 115;
            this.statement_list();
        }

        this.state = 118;
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
InverseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitInverse(this);
    } else {
        return visitor.visitChildren(this);
    }
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


function CutContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CutContext.prototype = Object.create(ExprContext.prototype);
CutContext.prototype.constructor = CutContext;

exaParser.CutContext = CutContext;

CutContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
CutContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitCut(this);
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

DispatchContext.prototype.replyHandler = function() {
    return this.getTypedRuleContext(ReplyHandlerContext,0);
};

DispatchContext.prototype.failHandler = function() {
    return this.getTypedRuleContext(FailHandlerContext,0);
};
DispatchContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitDispatch(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SelectContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SelectContext.prototype = Object.create(ExprContext.prototype);
SelectContext.prototype.constructor = SelectContext;

exaParser.SelectContext = SelectContext;

SelectContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SelectContext.prototype.ID = function() {
    return this.getToken(exaParser.ID, 0);
};
SelectContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitSelect(this);
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

CallContext.prototype.failHandler = function() {
    return this.getTypedRuleContext(FailHandlerContext,0);
};
CallContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitCall(this);
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
MeasureContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitMeasure(this);
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
    var _startState = 12;
    this.enterRecursionRule(localctx, 12, exaParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 159;
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        switch(la_) {
        case 1:
            localctx = new MeasureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 121;
            this.match(exaParser.T__24);
            this.state = 122;
            this.expr(18);
            break;

        case 2:
            localctx = new InverseContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 123;
            this.match(exaParser.T__25);
            this.state = 124;
            this.expr(17);
            break;

        case 3:
            localctx = new CutContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 125;
            this.match(exaParser.T__26);
            this.state = 126;
            this.expr(16);
            break;

        case 4:
            localctx = new DispatchContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 127;
            this.match(exaParser.T__23);
            this.state = 128;
            this.expr(0);
            this.state = 129;
            this.match(exaParser.T__21);
            this.state = 131;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__21) | (1 << exaParser.T__23) | (1 << exaParser.T__24) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                this.state = 130;
                this.exprList();
            }

            this.state = 133;
            this.match(exaParser.T__22);
            this.state = 135;
            var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
            if(la_===1) {
                this.state = 134;
                this.replyHandler();

            }
            this.state = 138;
            var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
            if(la_===1) {
                this.state = 137;
                this.failHandler();

            }
            break;

        case 5:
            localctx = new WrapContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 140;
            this.match(exaParser.T__21);
            this.state = 141;
            this.expr(0);
            this.state = 142;
            this.match(exaParser.T__22);
            break;

        case 6:
            localctx = new DestructureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 144;
            this.match(exaParser.T__21);
            this.state = 145;
            this.match(exaParser.ID);
            this.state = 148; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 146;
                this.match(exaParser.T__1);
                this.state = 147;
                this.match(exaParser.ID);
                this.state = 150; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===exaParser.T__1);
            this.state = 152;
            this.match(exaParser.T__22);
            break;

        case 7:
            localctx = new DynastringContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 153;
            this.match(exaParser.INTER_BEGIN);
            this.state = 154;
            this.interpolated();
            this.state = 155;
            this.match(exaParser.INTER_END);
            break;

        case 8:
            localctx = new LitExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 157;
            this.literal();
            break;

        case 9:
            localctx = new IdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 158;
            this.match(exaParser.ID);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 220;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 218;
                var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 161;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 162;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__23) | (1 << exaParser.T__27) | (1 << exaParser.T__28))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 163;
                    this.expr(16);
                    break;

                case 2:
                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 164;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 165;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__29 || _la===exaParser.T__30)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 166;
                    this.expr(15);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 167;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 168;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (exaParser.T__31 - 32)) | (1 << (exaParser.T__32 - 32)) | (1 << (exaParser.T__33 - 32)) | (1 << (exaParser.T__34 - 32)) | (1 << (exaParser.T__35 - 32)) | (1 << (exaParser.T__36 - 32)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 169;
                    this.expr(14);
                    break;

                case 4:
                    localctx = new LogicalContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 170;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 171;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__37 || _la===exaParser.T__38)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 172;
                    this.expr(13);
                    break;

                case 5:
                    localctx = new MembershipContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 173;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 174;
                    this.match(exaParser.T__39);
                    this.state = 175;
                    this.expr(12);
                    break;

                case 6:
                    localctx = new CallContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 176;
                    if (!( this.precpred(this._ctx, 20))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
                    }
                    this.state = 177;
                    this.match(exaParser.T__21);
                    this.state = 179;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__21) | (1 << exaParser.T__23) | (1 << exaParser.T__24) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 178;
                        this.exprList();
                    }

                    this.state = 181;
                    this.match(exaParser.T__22);
                    this.state = 183;
                    var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
                    if(la_===1) {
                        this.state = 182;
                        this.failHandler();

                    }
                    break;

                case 7:
                    localctx = new SubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 185;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 186;
                    this.match(exaParser.T__40);
                    this.state = 187;
                    this.expr(0);
                    this.state = 188;
                    this.match(exaParser.T__41);
                    break;

                case 8:
                    localctx = new SliceContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 190;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 191;
                    this.match(exaParser.T__40);
                    this.state = 193;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__21) | (1 << exaParser.T__23) | (1 << exaParser.T__24) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 192;
                        this.expr(0);
                    }

                    this.state = 195;
                    this.match(exaParser.T__42);
                    this.state = 197;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__21) | (1 << exaParser.T__23) | (1 << exaParser.T__24) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 196;
                        this.expr(0);
                    }

                    this.state = 199;
                    this.match(exaParser.T__41);
                    break;

                case 9:
                    localctx = new ExtractionContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 200;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 201;
                    this.match(exaParser.BEGIN);
                    this.state = 202;
                    this.expr(0);
                    this.state = 203;
                    this.match(exaParser.END);
                    break;

                case 10:
                    localctx = new ExcisionContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 205;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 206;
                    this.match(exaParser.BEGIN);
                    this.state = 208;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__21) | (1 << exaParser.T__23) | (1 << exaParser.T__24) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 207;
                        this.expr(0);
                    }

                    this.state = 210;
                    this.match(exaParser.T__42);
                    this.state = 212;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__21) | (1 << exaParser.T__23) | (1 << exaParser.T__24) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)) | (1 << (exaParser.MODREF - 41)))) !== 0)) {
                        this.state = 211;
                        this.expr(0);
                    }

                    this.state = 214;
                    this.match(exaParser.END);
                    break;

                case 11:
                    localctx = new SelectContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 215;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 216;
                    this.match(exaParser.T__43);
                    this.state = 217;
                    this.match(exaParser.ID);
                    break;

                } 
            }
            this.state = 222;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
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

ReplyHandlerContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
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
    this.enterRule(localctx, 14, exaParser.RULE_replyHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 223;
        this.match(exaParser.T__44);
        this.state = 224;
        this.block();
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

FailHandlerContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
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
    this.enterRule(localctx, 16, exaParser.RULE_failHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 226;
        this.match(exaParser.T__45);
        this.state = 227;
        this.block();
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
    this.enterRule(localctx, 18, exaParser.RULE_interpolated);
    try {
        this.state = 234;
        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 229;
            this.expr(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 230;
            this.expr(0);
            this.state = 231;
            this.match(exaParser.INTER_MID);
            this.state = 232;
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
    this.enterRule(localctx, 20, exaParser.RULE_exprList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 236;
        this.expr(0);
        this.state = 241;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===exaParser.T__1) {
            this.state = 237;
            this.match(exaParser.T__1);
            this.state = 238;
            this.expr(0);
            this.state = 243;
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

RecordContext.prototype.field = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldContext);
    } else {
        return this.getTypedRuleContext(FieldContext,i);
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
ModrefContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitModref(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function CollectionContext(parser, ctx) {
	LiteralContext.call(this, parser);
    this.colon = null; // Token;
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CollectionContext.prototype = Object.create(LiteralContext.prototype);
CollectionContext.prototype.constructor = CollectionContext;

exaParser.CollectionContext = CollectionContext;

CollectionContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};

CollectionContext.prototype.pairList = function() {
    return this.getTypedRuleContext(PairListContext,0);
};
CollectionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitCollection(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.LiteralContext = LiteralContext;

exaParser.prototype.literal = function() {

    var localctx = new LiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, exaParser.RULE_literal);
    var _la = 0; // Token type
    try {
        this.state = 269;
        switch(this._input.LA(1)) {
        case exaParser.NIL:
            localctx = new NilContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 244;
            this.match(exaParser.NIL);
            break;
        case exaParser.BOOL:
            localctx = new BoolContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 245;
            this.match(exaParser.BOOL);
            break;
        case exaParser.NUMBER:
            localctx = new NumberContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 246;
            this.match(exaParser.NUMBER);
            break;
        case exaParser.STRING:
            localctx = new StringContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 247;
            this.match(exaParser.STRING);
            break;
        case exaParser.MODREF:
            localctx = new ModrefContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 248;
            this.match(exaParser.MODREF);
            break;
        case exaParser.T__46:
            localctx = new ServiceContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 249;
            this.match(exaParser.T__46);
            this.state = 250;
            this.block();
            break;
        case exaParser.T__40:
            localctx = new CollectionContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 251;
            this.match(exaParser.T__40);
            this.state = 255;
            var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
            if(la_===1) {
                this.state = 252;
                localctx.colon = this.match(exaParser.T__42);

            } else if(la_===2) {
                this.state = 253;
                this.exprList();

            } else if(la_===3) {
                this.state = 254;
                this.pairList();

            }
            this.state = 257;
            this.match(exaParser.T__41);
            break;
        case exaParser.BEGIN:
            localctx = new RecordContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 258;
            this.match(exaParser.BEGIN);
            this.state = 259;
            this.field();
            this.state = 264;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===exaParser.T__1) {
                this.state = 260;
                this.match(exaParser.T__1);
                this.state = 261;
                this.field();
                this.state = 266;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 267;
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
    this.enterRule(localctx, 24, exaParser.RULE_field);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 271;
        this.match(exaParser.ID);
        this.state = 272;
        this.match(exaParser.T__42);
        this.state = 273;
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

PairListContext.prototype.pair = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(PairContext);
    } else {
        return this.getTypedRuleContext(PairContext,i);
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
    this.enterRule(localctx, 26, exaParser.RULE_pairList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 275;
        this.pair();
        this.state = 280;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===exaParser.T__1) {
            this.state = 276;
            this.match(exaParser.T__1);
            this.state = 277;
            this.pair();
            this.state = 282;
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

function PairContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = exaParser.RULE_pair;
    return this;
}

PairContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PairContext.prototype.constructor = PairContext;

PairContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

PairContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitPair(this);
    } else {
        return visitor.visitChildren(this);
    }
};




exaParser.PairContext = PairContext;

exaParser.prototype.pair = function() {

    var localctx = new PairContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, exaParser.RULE_pair);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 283;
        this.expr(0);
        this.state = 284;
        this.match(exaParser.T__42);
        this.state = 285;
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
	case 6:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

exaParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 15);
		case 1:
			return this.precpred(this._ctx, 14);
		case 2:
			return this.precpred(this._ctx, 13);
		case 3:
			return this.precpred(this._ctx, 12);
		case 4:
			return this.precpred(this._ctx, 11);
		case 5:
			return this.precpred(this._ctx, 20);
		case 6:
			return this.precpred(this._ctx, 9);
		case 7:
			return this.precpred(this._ctx, 8);
		case 8:
			return this.precpred(this._ctx, 7);
		case 9:
			return this.precpred(this._ctx, 6);
		case 10:
			return this.precpred(this._ctx, 5);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.exaParser = exaParser;
