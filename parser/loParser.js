// Generated from /Users/seth/devel/velo/parser/lo.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');
var loVisitor = require('./loVisitor').loVisitor;

var grammarFileName = "lo.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003D\u0166\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0003",
    "\u0002\u0007\u00020\n\u0002\f\u0002\u000e\u00023\u000b\u0002\u0003\u0002",
    "\u0006\u00026\n\u0002\r\u0002\u000e\u00027\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0007",
    "\u0004H\n\u0004\f\u0004\u000e\u0004K\u000b\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0005\u0005Q\n\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0005\u0006V\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006",
    "f\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0005\u0006o\n\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0005\u0006\u0081\n\u0006\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0005\b\u008e\n\b\u0003\t\u0003\t\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0005\f\u00a8\n\f\u0003\r\u0003\r\u0005\r",
    "\u00ac\n\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u00b5\n\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0006\u000e\u00c7\n\u000e\r\u000e\u000e\u000e",
    "\u00c8\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u00d2\n\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0005\u000e\u00e9\n\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u00f6\n\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u00fd\n",
    "\u000e\f\u000e\u000e\u000e\u0100\u000b\u000e\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u0107\n\u000f\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010\u010e",
    "\n\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0007\u0011\u0113\n\u0011",
    "\f\u0011\u000e\u0011\u0116\u000b\u0011\u0003\u0011\u0005\u0011\u0119",
    "\n\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0005\u0012\u0121\n\u0012\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0003\u0012\u0005\u0012\u0127\n\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0005\u0012\u012f\n",
    "\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0005\u0012\u0137\n\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0005\u0012\u013d\n\u0012\u0003\u0013\u0003\u0013\u0003",
    "\u0013\u0003\u0014\u0005\u0014\u0143\n\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0007\u0015\u014b\n",
    "\u0015\f\u0015\u000e\u0015\u014e\u000b\u0015\u0003\u0015\u0003\u0015",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u0156\n",
    "\u0016\u0006\u0016\u0158\n\u0016\r\u0016\u000e\u0016\u0159\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0005\u0017\u0160\n\u0017\u0006",
    "\u0017\u0162\n\u0017\r\u0017\u000e\u0017\u0163\u0003\u0017\u0002\u0004",
    "\u0006\u001a\u0018\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016",
    "\u0018\u001a\u001c\u001e \"$&(*,\u0002\t\u0003\u0002\u0006\b\u0003\u0002",
    "\t\n\u0003\u0002\u0013\u0018\u0003\u0002\u001e \u0003\u0002!\"\u0003",
    "\u0002#(\u0003\u0002)*\u0195\u00021\u0003\u0002\u0002\u0002\u0004;\u0003",
    "\u0002\u0002\u0002\u0006A\u0003\u0002\u0002\u0002\bP\u0003\u0002\u0002",
    "\u0002\n\u0080\u0003\u0002\u0002\u0002\f\u0082\u0003\u0002\u0002\u0002",
    "\u000e\u008d\u0003\u0002\u0002\u0002\u0010\u008f\u0003\u0002\u0002\u0002",
    "\u0012\u0091\u0003\u0002\u0002\u0002\u0014\u0095\u0003\u0002\u0002\u0002",
    "\u0016\u00a7\u0003\u0002\u0002\u0002\u0018\u00a9\u0003\u0002\u0002\u0002",
    "\u001a\u00d1\u0003\u0002\u0002\u0002\u001c\u0106\u0003\u0002\u0002\u0002",
    "\u001e\u010d\u0003\u0002\u0002\u0002 \u010f\u0003\u0002\u0002\u0002",
    "\"\u013c\u0003\u0002\u0002\u0002$\u013e\u0003\u0002\u0002\u0002&\u0142",
    "\u0003\u0002\u0002\u0002(\u0146\u0003\u0002\u0002\u0002*\u0157\u0003",
    "\u0002\u0002\u0002,\u0161\u0003\u0002\u0002\u0002.0\u0005\u0004\u0003",
    "\u0002/.\u0003\u0002\u0002\u000203\u0003\u0002\u0002\u00021/\u0003\u0002",
    "\u0002\u000212\u0003\u0002\u0002\u000225\u0003\u0002\u0002\u000231\u0003",
    "\u0002\u0002\u000246\u0005\f\u0007\u000254\u0003\u0002\u0002\u00026",
    "7\u0003\u0002\u0002\u000275\u0003\u0002\u0002\u000278\u0003\u0002\u0002",
    "\u000289\u0003\u0002\u0002\u00029:\u0007\u0002\u0002\u0003:\u0003\u0003",
    "\u0002\u0002\u0002;<\u0007\u0003\u0002\u0002<=\u0005\u0006\u0004\u0002",
    "=>\u0007\u0004\u0002\u0002>?\u0007@\u0002\u0002?@\u0007\u0005\u0002",
    "\u0002@\u0005\u0003\u0002\u0002\u0002AB\b\u0004\u0001\u0002BC\u0007",
    "@\u0002\u0002CI\u0003\u0002\u0002\u0002DE\f\u0003\u0002\u0002EF\u0007",
    ">\u0002\u0002FH\u0007@\u0002\u0002GD\u0003\u0002\u0002\u0002HK\u0003",
    "\u0002\u0002\u0002IG\u0003\u0002\u0002\u0002IJ\u0003\u0002\u0002\u0002",
    "J\u0007\u0003\u0002\u0002\u0002KI\u0003\u0002\u0002\u0002LQ\u0005\n",
    "\u0006\u0002MN\u0005\n\u0006\u0002NO\u0005\b\u0005\u0002OQ\u0003\u0002",
    "\u0002\u0002PL\u0003\u0002\u0002\u0002PM\u0003\u0002\u0002\u0002Q\t",
    "\u0003\u0002\u0002\u0002R\u0081\u0005\f\u0007\u0002SU\t\u0002\u0002",
    "\u0002TV\u0005 \u0011\u0002UT\u0003\u0002\u0002\u0002UV\u0003\u0002",
    "\u0002\u0002VW\u0003\u0002\u0002\u0002W\u0081\u0007\u0005\u0002\u0002",
    "XY\u0005\u001a\u000e\u0002YZ\u0005\u0014\u000b\u0002Z[\u0005\u001a\u000e",
    "\u0002[\\\u0007\u0005\u0002\u0002\\\u0081\u0003\u0002\u0002\u0002]^",
    "\u0005\u001a\u000e\u0002^_\t\u0003\u0002\u0002_`\u0007\u0005\u0002\u0002",
    "`\u0081\u0003\u0002\u0002\u0002a\u0081\u0005\u0016\f\u0002bc\u0005\u001a",
    "\u000e\u0002ce\u0007\u000b\u0002\u0002df\u0005 \u0011\u0002ed\u0003",
    "\u0002\u0002\u0002ef\u0003\u0002\u0002\u0002fg\u0003\u0002\u0002\u0002",
    "gh\u0007\f\u0002\u0002hi\u0005\u000e\b\u0002i\u0081\u0003\u0002\u0002",
    "\u0002jk\u0007\r\u0002\u0002kl\u0005\u001a\u000e\u0002ln\u0007\u000b",
    "\u0002\u0002mo\u0005 \u0011\u0002nm\u0003\u0002\u0002\u0002no\u0003",
    "\u0002\u0002\u0002op\u0003\u0002\u0002\u0002pq\u0007\f\u0002\u0002q",
    "r\u0005\u000e\b\u0002r\u0081\u0003\u0002\u0002\u0002st\u0005\u001a\u000e",
    "\u0002tu\u0007\u000e\u0002\u0002uv\u0005\u001a\u000e\u0002vw\u0007\u0005",
    "\u0002\u0002w\u0081\u0003\u0002\u0002\u0002xy\u0007\u000f\u0002\u0002",
    "yz\u0005\u001a\u000e\u0002z{\u0005\u0018\r\u0002{\u0081\u0003\u0002",
    "\u0002\u0002|}\u0007\u0010\u0002\u0002}~\u0005\u001a\u000e\u0002~\u007f",
    "\u0005\u001a\u000e\u0002\u007f\u0081\u0003\u0002\u0002\u0002\u0080R",
    "\u0003\u0002\u0002\u0002\u0080S\u0003\u0002\u0002\u0002\u0080X\u0003",
    "\u0002\u0002\u0002\u0080]\u0003\u0002\u0002\u0002\u0080a\u0003\u0002",
    "\u0002\u0002\u0080b\u0003\u0002\u0002\u0002\u0080j\u0003\u0002\u0002",
    "\u0002\u0080s\u0003\u0002\u0002\u0002\u0080x\u0003\u0002\u0002\u0002",
    "\u0080|\u0003\u0002\u0002\u0002\u0081\u000b\u0003\u0002\u0002\u0002",
    "\u0082\u0083\u0007@\u0002\u0002\u0083\u0084\u0007\u0011\u0002\u0002",
    "\u0084\u0085\u0005\u001c\u000f\u0002\u0085\u0086\u0007\u0005\u0002\u0002",
    "\u0086\r\u0003\u0002\u0002\u0002\u0087\u008e\u0007\u0005\u0002\u0002",
    "\u0088\u008e\u0005\u0010\t\u0002\u0089\u008e\u0005\u0012\n\u0002\u008a",
    "\u008b\u0005\u0010\t\u0002\u008b\u008c\u0005\u0012\n\u0002\u008c\u008e",
    "\u0003\u0002\u0002\u0002\u008d\u0087\u0003\u0002\u0002\u0002\u008d\u0088",
    "\u0003\u0002\u0002\u0002\u008d\u0089\u0003\u0002\u0002\u0002\u008d\u008a",
    "\u0003\u0002\u0002\u0002\u008e\u000f\u0003\u0002\u0002\u0002\u008f\u0090",
    "\u0005$\u0013\u0002\u0090\u0011\u0003\u0002\u0002\u0002\u0091\u0092",
    "\u0007\u0012\u0002\u0002\u0092\u0093\u0007\u0007\u0002\u0002\u0093\u0094",
    "\u0005$\u0013\u0002\u0094\u0013\u0003\u0002\u0002\u0002\u0095\u0096",
    "\t\u0004\u0002\u0002\u0096\u0015\u0003\u0002\u0002\u0002\u0097\u0098",
    "\u0007\u0019\u0002\u0002\u0098\u0099\u0005\u001a\u000e\u0002\u0099\u009a",
    "\u0005\u0018\r\u0002\u009a\u00a8\u0003\u0002\u0002\u0002\u009b\u009c",
    "\u0007\u0019\u0002\u0002\u009c\u009d\u0005\u001a\u000e\u0002\u009d\u009e",
    "\u0005\u0018\r\u0002\u009e\u009f\u0007\u001a\u0002\u0002\u009f\u00a0",
    "\u0005\u0018\r\u0002\u00a0\u00a8\u0003\u0002\u0002\u0002\u00a1\u00a2",
    "\u0007\u0019\u0002\u0002\u00a2\u00a3\u0005\u001a\u000e\u0002\u00a3\u00a4",
    "\u0005\u0018\r\u0002\u00a4\u00a5\u0007\u001a\u0002\u0002\u00a5\u00a6",
    "\u0005\u0016\f\u0002\u00a6\u00a8\u0003\u0002\u0002\u0002\u00a7\u0097",
    "\u0003\u0002\u0002\u0002\u00a7\u009b\u0003\u0002\u0002\u0002\u00a7\u00a1",
    "\u0003\u0002\u0002\u0002\u00a8\u0017\u0003\u0002\u0002\u0002\u00a9\u00ab",
    "\u00079\u0002\u0002\u00aa\u00ac\u0005\b\u0005\u0002\u00ab\u00aa\u0003",
    "\u0002\u0002\u0002\u00ab\u00ac\u0003\u0002\u0002\u0002\u00ac\u00ad\u0003",
    "\u0002\u0002\u0002\u00ad\u00ae\u0007:\u0002\u0002\u00ae\u0019\u0003",
    "\u0002\u0002\u0002\u00af\u00b0\b\u000e\u0001\u0002\u00b0\u00b1\u0007",
    "\r\u0002\u0002\u00b1\u00b2\u0005\u001a\u000e\u0002\u00b2\u00b4\u0007",
    "\u000b\u0002\u0002\u00b3\u00b5\u0005 \u0011\u0002\u00b4\u00b3\u0003",
    "\u0002\u0002\u0002\u00b4\u00b5\u0003\u0002\u0002\u0002\u00b5\u00b6\u0003",
    "\u0002\u0002\u0002\u00b6\u00b7\u0007\f\u0002\u0002\u00b7\u00d2\u0003",
    "\u0002\u0002\u0002\u00b8\u00b9\u0007\u001b\u0002\u0002\u00b9\u00d2\u0005",
    "\u001a\u000e\u0013\u00ba\u00bb\u0007\u001c\u0002\u0002\u00bb\u00d2\u0005",
    "\u001a\u000e\u0012\u00bc\u00bd\u0007\u001d\u0002\u0002\u00bd\u00d2\u0005",
    "\u001a\u000e\u0011\u00be\u00bf\u0007\u000b\u0002\u0002\u00bf\u00c0\u0005",
    "\u001a\u000e\u0002\u00c0\u00c1\u0007\f\u0002\u0002\u00c1\u00d2\u0003",
    "\u0002\u0002\u0002\u00c2\u00c3\u0007\u000b\u0002\u0002\u00c3\u00c6\u0007",
    "@\u0002\u0002\u00c4\u00c5\u00071\u0002\u0002\u00c5\u00c7\u0007@\u0002",
    "\u0002\u00c6\u00c4\u0003\u0002\u0002\u0002\u00c7\u00c8\u0003\u0002\u0002",
    "\u0002\u00c8\u00c6\u0003\u0002\u0002\u0002\u00c8\u00c9\u0003\u0002\u0002",
    "\u0002\u00c9\u00ca\u0003\u0002\u0002\u0002\u00ca\u00d2\u0007\f\u0002",
    "\u0002\u00cb\u00cc\u0007B\u0002\u0002\u00cc\u00cd\u0005\u001e\u0010",
    "\u0002\u00cd\u00ce\u0007D\u0002\u0002\u00ce\u00d2\u0003\u0002\u0002",
    "\u0002\u00cf\u00d2\u0005\u001c\u000f\u0002\u00d0\u00d2\u0007@\u0002",
    "\u0002\u00d1\u00af\u0003\u0002\u0002\u0002\u00d1\u00b8\u0003\u0002\u0002",
    "\u0002\u00d1\u00ba\u0003\u0002\u0002\u0002\u00d1\u00bc\u0003\u0002\u0002",
    "\u0002\u00d1\u00be\u0003\u0002\u0002\u0002\u00d1\u00c2\u0003\u0002\u0002",
    "\u0002\u00d1\u00cb\u0003\u0002\u0002\u0002\u00d1\u00cf\u0003\u0002\u0002",
    "\u0002\u00d1\u00d0\u0003\u0002\u0002\u0002\u00d2\u00fe\u0003\u0002\u0002",
    "\u0002\u00d3\u00d4\f\u0010\u0002\u0002\u00d4\u00d5\t\u0005\u0002\u0002",
    "\u00d5\u00fd\u0005\u001a\u000e\u0011\u00d6\u00d7\f\u000f\u0002\u0002",
    "\u00d7\u00d8\t\u0006\u0002\u0002\u00d8\u00fd\u0005\u001a\u000e\u0010",
    "\u00d9\u00da\f\u000e\u0002\u0002\u00da\u00db\t\u0007\u0002\u0002\u00db",
    "\u00fd\u0005\u001a\u000e\u000f\u00dc\u00dd\f\r\u0002\u0002\u00dd\u00de",
    "\t\b\u0002\u0002\u00de\u00fd\u0005\u001a\u000e\u000e\u00df\u00e0\f\f",
    "\u0002\u0002\u00e0\u00e1\u0007+\u0002\u0002\u00e1\u00fd\u0005\u001a",
    "\u000e\r\u00e2\u00e3\f\u000b\u0002\u0002\u00e3\u00e4\u0007,\u0002\u0002",
    "\u00e4\u00fd\u0005\u001a\u000e\f\u00e5\u00e6\f\u0015\u0002\u0002\u00e6",
    "\u00e8\u0007\u000b\u0002\u0002\u00e7\u00e9\u0005 \u0011\u0002\u00e8",
    "\u00e7\u0003\u0002\u0002\u0002\u00e8\u00e9\u0003\u0002\u0002\u0002\u00e9",
    "\u00ea\u0003\u0002\u0002\u0002\u00ea\u00fd\u0007\f\u0002\u0002\u00eb",
    "\u00ec\f\t\u0002\u0002\u00ec\u00ed\u0007-\u0002\u0002\u00ed\u00ee\u0005",
    "\u001a\u000e\u0002\u00ee\u00ef\u0007.\u0002\u0002\u00ef\u00fd\u0003",
    "\u0002\u0002\u0002\u00f0\u00f1\f\b\u0002\u0002\u00f1\u00f2\u0007-\u0002",
    "\u0002\u00f2\u00f3\u0005\u001a\u000e\u0002\u00f3\u00f5\u0007/\u0002",
    "\u0002\u00f4\u00f6\u0005\u001a\u000e\u0002\u00f5\u00f4\u0003\u0002\u0002",
    "\u0002\u00f5\u00f6\u0003\u0002\u0002\u0002\u00f6\u00f7\u0003\u0002\u0002",
    "\u0002\u00f7\u00f8\u0007.\u0002\u0002\u00f8\u00fd\u0003\u0002\u0002",
    "\u0002\u00f9\u00fa\f\u0007\u0002\u0002\u00fa\u00fb\u00070\u0002\u0002",
    "\u00fb\u00fd\u0007@\u0002\u0002\u00fc\u00d3\u0003\u0002\u0002\u0002",
    "\u00fc\u00d6\u0003\u0002\u0002\u0002\u00fc\u00d9\u0003\u0002\u0002\u0002",
    "\u00fc\u00dc\u0003\u0002\u0002\u0002\u00fc\u00df\u0003\u0002\u0002\u0002",
    "\u00fc\u00e2\u0003\u0002\u0002\u0002\u00fc\u00e5\u0003\u0002\u0002\u0002",
    "\u00fc\u00eb\u0003\u0002\u0002\u0002\u00fc\u00f0\u0003\u0002\u0002\u0002",
    "\u00fc\u00f9\u0003\u0002\u0002\u0002\u00fd\u0100\u0003\u0002\u0002\u0002",
    "\u00fe\u00fc\u0003\u0002\u0002\u0002\u00fe\u00ff\u0003\u0002\u0002\u0002",
    "\u00ff\u001b\u0003\u0002\u0002\u0002\u0100\u00fe\u0003\u0002\u0002\u0002",
    "\u0101\u0102\u0005\u0006\u0004\u0002\u0102\u0103\u00072\u0002\u0002",
    "\u0103\u0104\u0007@\u0002\u0002\u0104\u0107\u0003\u0002\u0002\u0002",
    "\u0105\u0107\u0005\"\u0012\u0002\u0106\u0101\u0003\u0002\u0002\u0002",
    "\u0106\u0105\u0003\u0002\u0002\u0002\u0107\u001d\u0003\u0002\u0002\u0002",
    "\u0108\u010e\u0005\u001a\u000e\u0002\u0109\u010a\u0005\u001a\u000e\u0002",
    "\u010a\u010b\u0007C\u0002\u0002\u010b\u010c\u0005\u001e\u0010\u0002",
    "\u010c\u010e\u0003\u0002\u0002\u0002\u010d\u0108\u0003\u0002\u0002\u0002",
    "\u010d\u0109\u0003\u0002\u0002\u0002\u010e\u001f\u0003\u0002\u0002\u0002",
    "\u010f\u0114\u0005\u001a\u000e\u0002\u0110\u0111\u00071\u0002\u0002",
    "\u0111\u0113\u0005\u001a\u000e\u0002\u0112\u0110\u0003\u0002\u0002\u0002",
    "\u0113\u0116\u0003\u0002\u0002\u0002\u0114\u0112\u0003\u0002\u0002\u0002",
    "\u0114\u0115\u0003\u0002\u0002\u0002\u0115\u0118\u0003\u0002\u0002\u0002",
    "\u0116\u0114\u0003\u0002\u0002\u0002\u0117\u0119\u00071\u0002\u0002",
    "\u0118\u0117\u0003\u0002\u0002\u0002\u0118\u0119\u0003\u0002\u0002\u0002",
    "\u0119!\u0003\u0002\u0002\u0002\u011a\u013d\u0007;\u0002\u0002\u011b",
    "\u013d\u0007<\u0002\u0002\u011c\u013d\u0007?\u0002\u0002\u011d\u013d",
    "\u0007A\u0002\u0002\u011e\u0120\u0007-\u0002\u0002\u011f\u0121\u0005",
    " \u0011\u0002\u0120\u011f\u0003\u0002\u0002\u0002\u0120\u0121\u0003",
    "\u0002\u0002\u0002\u0121\u0122\u0003\u0002\u0002\u0002\u0122\u013d\u0007",
    ".\u0002\u0002\u0123\u0126\u0007\u000b\u0002\u0002\u0124\u0127\u0005",
    "*\u0016\u0002\u0125\u0127\u0005 \u0011\u0002\u0126\u0124\u0003\u0002",
    "\u0002\u0002\u0126\u0125\u0003\u0002\u0002\u0002\u0127\u0128\u0003\u0002",
    "\u0002\u0002\u0128\u0129\u0007\f\u0002\u0002\u0129\u013d\u0003\u0002",
    "\u0002\u0002\u012a\u012e\u00079\u0002\u0002\u012b\u012f\u0007=\u0002",
    "\u0002\u012c\u012f\u0005 \u0011\u0002\u012d\u012f\u0005,\u0017\u0002",
    "\u012e\u012b\u0003\u0002\u0002\u0002\u012e\u012c\u0003\u0002\u0002\u0002",
    "\u012e\u012d\u0003\u0002\u0002\u0002\u012e\u012f\u0003\u0002\u0002\u0002",
    "\u012f\u0130\u0003\u0002\u0002\u0002\u0130\u013d\u0007:\u0002\u0002",
    "\u0131\u013d\u0005$\u0013\u0002\u0132\u0133\u00073\u0002\u0002\u0133",
    "\u013d\u0005&\u0014\u0002\u0134\u0136\u00074\u0002\u0002\u0135\u0137",
    "\u0005(\u0015\u0002\u0136\u0135\u0003\u0002\u0002\u0002\u0136\u0137",
    "\u0003\u0002\u0002\u0002\u0137\u013d\u0003\u0002\u0002\u0002\u0138\u0139",
    "\u0007\u0012\u0002\u0002\u0139\u013a\u0005\u001a\u000e\u0002\u013a\u013b",
    "\u0005$\u0013\u0002\u013b\u013d\u0003\u0002\u0002\u0002\u013c\u011a",
    "\u0003\u0002\u0002\u0002\u013c\u011b\u0003\u0002\u0002\u0002\u013c\u011c",
    "\u0003\u0002\u0002\u0002\u013c\u011d\u0003\u0002\u0002\u0002\u013c\u011e",
    "\u0003\u0002\u0002\u0002\u013c\u0123\u0003\u0002\u0002\u0002\u013c\u012a",
    "\u0003\u0002\u0002\u0002\u013c\u0131\u0003\u0002\u0002\u0002\u013c\u0132",
    "\u0003\u0002\u0002\u0002\u013c\u0134\u0003\u0002\u0002\u0002\u013c\u0138",
    "\u0003\u0002\u0002\u0002\u013d#\u0003\u0002\u0002\u0002\u013e\u013f",
    "\u00075\u0002\u0002\u013f\u0140\u0005&\u0014\u0002\u0140%\u0003\u0002",
    "\u0002\u0002\u0141\u0143\u0005(\u0015\u0002\u0142\u0141\u0003\u0002",
    "\u0002\u0002\u0142\u0143\u0003\u0002\u0002\u0002\u0143\u0144\u0003\u0002",
    "\u0002\u0002\u0144\u0145\u0005\u0018\r\u0002\u0145\'\u0003\u0002\u0002",
    "\u0002\u0146\u0147\u0007\u000b\u0002\u0002\u0147\u014c\u0007@\u0002",
    "\u0002\u0148\u0149\u00071\u0002\u0002\u0149\u014b\u0007@\u0002\u0002",
    "\u014a\u0148\u0003\u0002\u0002\u0002\u014b\u014e\u0003\u0002\u0002\u0002",
    "\u014c\u014a\u0003\u0002\u0002\u0002\u014c\u014d\u0003\u0002\u0002\u0002",
    "\u014d\u014f\u0003\u0002\u0002\u0002\u014e\u014c\u0003\u0002\u0002\u0002",
    "\u014f\u0150\u0007\f\u0002\u0002\u0150)\u0003\u0002\u0002\u0002\u0151",
    "\u0152\u0007@\u0002\u0002\u0152\u0153\u0007>\u0002\u0002\u0153\u0155",
    "\u0005\u001a\u000e\u0002\u0154\u0156\u00071\u0002\u0002\u0155\u0154",
    "\u0003\u0002\u0002\u0002\u0155\u0156\u0003\u0002\u0002\u0002\u0156\u0158",
    "\u0003\u0002\u0002\u0002\u0157\u0151\u0003\u0002\u0002\u0002\u0158\u0159",
    "\u0003\u0002\u0002\u0002\u0159\u0157\u0003\u0002\u0002\u0002\u0159\u015a",
    "\u0003\u0002\u0002\u0002\u015a+\u0003\u0002\u0002\u0002\u015b\u015c",
    "\u0005\u001a\u000e\u0002\u015c\u015d\u0007=\u0002\u0002\u015d\u015f",
    "\u0005\u001a\u000e\u0002\u015e\u0160\u00071\u0002\u0002\u015f\u015e",
    "\u0003\u0002\u0002\u0002\u015f\u0160\u0003\u0002\u0002\u0002\u0160\u0162",
    "\u0003\u0002\u0002\u0002\u0161\u015b\u0003\u0002\u0002\u0002\u0162\u0163",
    "\u0003\u0002\u0002\u0002\u0163\u0161\u0003\u0002\u0002\u0002\u0163\u0164",
    "\u0003\u0002\u0002\u0002\u0164-\u0003\u0002\u0002\u0002#17IPUen\u0080",
    "\u008d\u00a7\u00ab\u00b4\u00c8\u00d1\u00e8\u00f5\u00fc\u00fe\u0106\u010d",
    "\u0114\u0118\u0120\u0126\u012e\u0136\u013c\u0142\u014c\u0155\u0159\u015f",
    "\u0163"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'alias'", "'to'", "';'", "'reply'", "'fail'", 
                     "'substitute'", "'++'", "'--'", "'('", "')'", "'@'", 
                     "'>>'", "'while'", "'scan'", "'is'", "'on'", "'='", 
                     "'+='", "'-='", "'*='", "'/='", "'%='", "'if'", "'else'", 
                     "'#'", "'not'", "'bytes'", "'*'", "'/'", "'%'", "'+'", 
                     "'-'", "'<'", "'>'", "'<='", "'>='", "'=='", "'!='", 
                     "'and'", "'or'", "'in'", "'><'", "'['", "']'", "'..'", 
                     "'.'", "','", "'::'", "'<->'", "'-<'", "'->'", null, 
                     null, null, "'{'", "'}'", "'nil'", null, "'=>'", "':'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, "WS", "LINE_COMMENT", 
                      "COMMENT", "BEGIN", "END", "NIL", "BOOL", "PAIR_SEP", 
                      "FIELD_SEP", "NUMBER", "ID", "STRING", "INTER_BEGIN", 
                      "INTER_MID", "INTER_END" ];

var ruleNames =  [ "module", "alias", "modref", "statementList", "statement", 
                   "definition", "handlers", "replyHandler", "failHandler", 
                   "assignment_op", "conditional", "block", "expr", "constant", 
                   "interpolated", "exprList", "literal", "sink", "procedure", 
                   "paramList", "fieldList", "pairList" ];

function loParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

loParser.prototype = Object.create(antlr4.Parser.prototype);
loParser.prototype.constructor = loParser;

Object.defineProperty(loParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

loParser.EOF = antlr4.Token.EOF;
loParser.T__0 = 1;
loParser.T__1 = 2;
loParser.T__2 = 3;
loParser.T__3 = 4;
loParser.T__4 = 5;
loParser.T__5 = 6;
loParser.T__6 = 7;
loParser.T__7 = 8;
loParser.T__8 = 9;
loParser.T__9 = 10;
loParser.T__10 = 11;
loParser.T__11 = 12;
loParser.T__12 = 13;
loParser.T__13 = 14;
loParser.T__14 = 15;
loParser.T__15 = 16;
loParser.T__16 = 17;
loParser.T__17 = 18;
loParser.T__18 = 19;
loParser.T__19 = 20;
loParser.T__20 = 21;
loParser.T__21 = 22;
loParser.T__22 = 23;
loParser.T__23 = 24;
loParser.T__24 = 25;
loParser.T__25 = 26;
loParser.T__26 = 27;
loParser.T__27 = 28;
loParser.T__28 = 29;
loParser.T__29 = 30;
loParser.T__30 = 31;
loParser.T__31 = 32;
loParser.T__32 = 33;
loParser.T__33 = 34;
loParser.T__34 = 35;
loParser.T__35 = 36;
loParser.T__36 = 37;
loParser.T__37 = 38;
loParser.T__38 = 39;
loParser.T__39 = 40;
loParser.T__40 = 41;
loParser.T__41 = 42;
loParser.T__42 = 43;
loParser.T__43 = 44;
loParser.T__44 = 45;
loParser.T__45 = 46;
loParser.T__46 = 47;
loParser.T__47 = 48;
loParser.T__48 = 49;
loParser.T__49 = 50;
loParser.T__50 = 51;
loParser.WS = 52;
loParser.LINE_COMMENT = 53;
loParser.COMMENT = 54;
loParser.BEGIN = 55;
loParser.END = 56;
loParser.NIL = 57;
loParser.BOOL = 58;
loParser.PAIR_SEP = 59;
loParser.FIELD_SEP = 60;
loParser.NUMBER = 61;
loParser.ID = 62;
loParser.STRING = 63;
loParser.INTER_BEGIN = 64;
loParser.INTER_MID = 65;
loParser.INTER_END = 66;

loParser.RULE_module = 0;
loParser.RULE_alias = 1;
loParser.RULE_modref = 2;
loParser.RULE_statementList = 3;
loParser.RULE_statement = 4;
loParser.RULE_definition = 5;
loParser.RULE_handlers = 6;
loParser.RULE_replyHandler = 7;
loParser.RULE_failHandler = 8;
loParser.RULE_assignment_op = 9;
loParser.RULE_conditional = 10;
loParser.RULE_block = 11;
loParser.RULE_expr = 12;
loParser.RULE_constant = 13;
loParser.RULE_interpolated = 14;
loParser.RULE_exprList = 15;
loParser.RULE_literal = 16;
loParser.RULE_sink = 17;
loParser.RULE_procedure = 18;
loParser.RULE_paramList = 19;
loParser.RULE_fieldList = 20;
loParser.RULE_pairList = 21;

function ModuleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_module;
    return this;
}

ModuleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModuleContext.prototype.constructor = ModuleContext;

ModuleContext.prototype.EOF = function() {
    return this.getToken(loParser.EOF, 0);
};

ModuleContext.prototype.alias = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AliasContext);
    } else {
        return this.getTypedRuleContext(AliasContext,i);
    }
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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitModule(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.ModuleContext = ModuleContext;

loParser.prototype.module = function() {

    var localctx = new ModuleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, loParser.RULE_module);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 47;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===loParser.T__0) {
            this.state = 44;
            this.alias();
            this.state = 49;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 51; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 50;
            this.definition();
            this.state = 53; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===loParser.ID);
        this.state = 55;
        this.match(loParser.EOF);
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

function AliasContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_alias;
    return this;
}

AliasContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AliasContext.prototype.constructor = AliasContext;

AliasContext.prototype.modref = function() {
    return this.getTypedRuleContext(ModrefContext,0);
};

AliasContext.prototype.ID = function() {
    return this.getToken(loParser.ID, 0);
};

AliasContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitAlias(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.AliasContext = AliasContext;

loParser.prototype.alias = function() {

    var localctx = new AliasContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, loParser.RULE_alias);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 57;
        this.match(loParser.T__0);
        this.state = 58;
        this.modref(0);
        this.state = 59;
        this.match(loParser.T__1);
        this.state = 60;
        this.match(loParser.ID);
        this.state = 61;
        this.match(loParser.T__2);
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

function ModrefContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_modref;
    return this;
}

ModrefContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModrefContext.prototype.constructor = ModrefContext;

ModrefContext.prototype.ID = function() {
    return this.getToken(loParser.ID, 0);
};

ModrefContext.prototype.modref = function() {
    return this.getTypedRuleContext(ModrefContext,0);
};

ModrefContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitModref(this);
    } else {
        return visitor.visitChildren(this);
    }
};



loParser.prototype.modref = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ModrefContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 4;
    this.enterRecursionRule(localctx, 4, loParser.RULE_modref, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 64;
        this.match(loParser.ID);
        this._ctx.stop = this._input.LT(-1);
        this.state = 71;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                localctx = new ModrefContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, loParser.RULE_modref);
                this.state = 66;
                if (!( this.precpred(this._ctx, 1))) {
                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                }
                this.state = 67;
                this.match(loParser.FIELD_SEP);
                this.state = 68;
                this.match(loParser.ID); 
            }
            this.state = 73;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
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

function StatementListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_statementList;
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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitStatementList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.StatementListContext = StatementListContext;

loParser.prototype.statementList = function() {

    var localctx = new StatementListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, loParser.RULE_statementList);
    try {
        this.state = 78;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 74;
            this.statement();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 75;
            this.statement();
            this.state = 76;
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
    this.ruleIndex = loParser.RULE_statement;
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

loParser.DefStmtContext = DefStmtContext;

DefStmtContext.prototype.definition = function() {
    return this.getTypedRuleContext(DefinitionContext,0);
};
DefStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitDefStmt(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SyncRequestContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SyncRequestContext.prototype = Object.create(StatementContext.prototype);
SyncRequestContext.prototype.constructor = SyncRequestContext;

loParser.SyncRequestContext = SyncRequestContext;

SyncRequestContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SyncRequestContext.prototype.handlers = function() {
    return this.getTypedRuleContext(HandlersContext,0);
};

SyncRequestContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
SyncRequestContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitSyncRequest(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AsyncRequestContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AsyncRequestContext.prototype = Object.create(StatementContext.prototype);
AsyncRequestContext.prototype.constructor = AsyncRequestContext;

loParser.AsyncRequestContext = AsyncRequestContext;

AsyncRequestContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AsyncRequestContext.prototype.handlers = function() {
    return this.getTypedRuleContext(HandlersContext,0);
};

AsyncRequestContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
AsyncRequestContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitAsyncRequest(this);
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

loParser.ResponseContext = ResponseContext;

ResponseContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
ResponseContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.AssignmentContext = AssignmentContext;

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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitAssignment(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ScanContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ScanContext.prototype = Object.create(StatementContext.prototype);
ScanContext.prototype.constructor = ScanContext;

loParser.ScanContext = ScanContext;

ScanContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
ScanContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitScan(this);
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

loParser.IterationContext = IterationContext;

IterationContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

IterationContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};
IterationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.IncDecContext = IncDecContext;

IncDecContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
IncDecContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitIncDec(this);
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

loParser.SendContext = SendContext;

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
    if ( visitor instanceof loVisitor ) {
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

loParser.CondStmtContext = CondStmtContext;

CondStmtContext.prototype.conditional = function() {
    return this.getTypedRuleContext(ConditionalContext,0);
};
CondStmtContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitCondStmt(this);
    } else {
        return visitor.visitChildren(this);
    }
};



loParser.StatementContext = StatementContext;

loParser.prototype.statement = function() {

    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, loParser.RULE_statement);
    var _la = 0; // Token type
    try {
        this.state = 126;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        switch(la_) {
        case 1:
            localctx = new DefStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 80;
            this.definition();
            break;

        case 2:
            localctx = new ResponseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 81;
            localctx.channel = this._input.LT(1);
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__3) | (1 << loParser.T__4) | (1 << loParser.T__5))) !== 0))) {
                localctx.channel = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 83;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__15) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0)) {
                this.state = 82;
                this.exprList();
            }

            this.state = 85;
            this.match(loParser.T__2);
            break;

        case 3:
            localctx = new AssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 86;
            this.expr(0);
            this.state = 87;
            this.assignment_op();
            this.state = 88;
            this.expr(0);
            this.state = 89;
            this.match(loParser.T__2);
            break;

        case 4:
            localctx = new IncDecContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 91;
            this.expr(0);
            this.state = 92;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===loParser.T__6 || _la===loParser.T__7)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 93;
            this.match(loParser.T__2);
            break;

        case 5:
            localctx = new CondStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 95;
            this.conditional();
            break;

        case 6:
            localctx = new SyncRequestContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 96;
            this.expr(0);
            this.state = 97;
            this.match(loParser.T__8);
            this.state = 99;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__15) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0)) {
                this.state = 98;
                this.exprList();
            }

            this.state = 101;
            this.match(loParser.T__9);
            this.state = 102;
            this.handlers();
            break;

        case 7:
            localctx = new AsyncRequestContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 104;
            this.match(loParser.T__10);
            this.state = 105;
            this.expr(0);
            this.state = 106;
            this.match(loParser.T__8);
            this.state = 108;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__15) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0)) {
                this.state = 107;
                this.exprList();
            }

            this.state = 110;
            this.match(loParser.T__9);
            this.state = 111;
            this.handlers();
            break;

        case 8:
            localctx = new SendContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 113;
            this.expr(0);
            this.state = 114;
            this.match(loParser.T__11);
            this.state = 115;
            this.expr(0);
            this.state = 116;
            this.match(loParser.T__2);
            break;

        case 9:
            localctx = new IterationContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 118;
            this.match(loParser.T__12);
            this.state = 119;
            this.expr(0);
            this.state = 120;
            this.block();
            break;

        case 10:
            localctx = new ScanContext(this, localctx);
            this.enterOuterAlt(localctx, 10);
            this.state = 122;
            this.match(loParser.T__13);
            this.state = 123;
            this.expr(0);
            this.state = 124;
            this.expr(0);
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
    this.ruleIndex = loParser.RULE_definition;
    return this;
}

DefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DefinitionContext.prototype.constructor = DefinitionContext;

DefinitionContext.prototype.ID = function() {
    return this.getToken(loParser.ID, 0);
};

DefinitionContext.prototype.constant = function() {
    return this.getTypedRuleContext(ConstantContext,0);
};

DefinitionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitDefinition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.DefinitionContext = DefinitionContext;

loParser.prototype.definition = function() {

    var localctx = new DefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, loParser.RULE_definition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 128;
        this.match(loParser.ID);
        this.state = 129;
        this.match(loParser.T__14);
        this.state = 130;
        this.constant();
        this.state = 131;
        this.match(loParser.T__2);
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
    this.ruleIndex = loParser.RULE_handlers;
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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitHandlers(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.HandlersContext = HandlersContext;

loParser.prototype.handlers = function() {

    var localctx = new HandlersContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, loParser.RULE_handlers);
    try {
        this.state = 139;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 133;
            this.match(loParser.T__2);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 134;
            this.replyHandler();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 135;
            this.failHandler();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 136;
            this.replyHandler();
            this.state = 137;
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

function ReplyHandlerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_replyHandler;
    return this;
}

ReplyHandlerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReplyHandlerContext.prototype.constructor = ReplyHandlerContext;

ReplyHandlerContext.prototype.sink = function() {
    return this.getTypedRuleContext(SinkContext,0);
};

ReplyHandlerContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitReplyHandler(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.ReplyHandlerContext = ReplyHandlerContext;

loParser.prototype.replyHandler = function() {

    var localctx = new ReplyHandlerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, loParser.RULE_replyHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 141;
        this.sink();
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
    this.ruleIndex = loParser.RULE_failHandler;
    return this;
}

FailHandlerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FailHandlerContext.prototype.constructor = FailHandlerContext;

FailHandlerContext.prototype.sink = function() {
    return this.getTypedRuleContext(SinkContext,0);
};

FailHandlerContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitFailHandler(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.FailHandlerContext = FailHandlerContext;

loParser.prototype.failHandler = function() {

    var localctx = new FailHandlerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, loParser.RULE_failHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 143;
        this.match(loParser.T__15);
        this.state = 144;
        this.match(loParser.T__4);
        this.state = 145;
        this.sink();
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
    this.ruleIndex = loParser.RULE_assignment_op;
    return this;
}

Assignment_opContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Assignment_opContext.prototype.constructor = Assignment_opContext;


Assignment_opContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitAssignment_op(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.Assignment_opContext = Assignment_opContext;

loParser.prototype.assignment_op = function() {

    var localctx = new Assignment_opContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, loParser.RULE_assignment_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 147;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__16) | (1 << loParser.T__17) | (1 << loParser.T__18) | (1 << loParser.T__19) | (1 << loParser.T__20) | (1 << loParser.T__21))) !== 0))) {
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
    this.ruleIndex = loParser.RULE_conditional;
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

loParser.NestedIfContext = NestedIfContext;

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
    if ( visitor instanceof loVisitor ) {
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

loParser.IfOnlyContext = IfOnlyContext;

IfOnlyContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

IfOnlyContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};
IfOnlyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.IfElseContext = IfElseContext;

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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitIfElse(this);
    } else {
        return visitor.visitChildren(this);
    }
};



loParser.ConditionalContext = ConditionalContext;

loParser.prototype.conditional = function() {

    var localctx = new ConditionalContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, loParser.RULE_conditional);
    try {
        this.state = 165;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
        switch(la_) {
        case 1:
            localctx = new IfOnlyContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 149;
            this.match(loParser.T__22);
            this.state = 150;
            this.expr(0);
            this.state = 151;
            this.block();
            break;

        case 2:
            localctx = new IfElseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 153;
            this.match(loParser.T__22);
            this.state = 154;
            this.expr(0);
            this.state = 155;
            this.block();
            this.state = 156;
            this.match(loParser.T__23);
            this.state = 157;
            this.block();
            break;

        case 3:
            localctx = new NestedIfContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 159;
            this.match(loParser.T__22);
            this.state = 160;
            this.expr(0);
            this.state = 161;
            this.block();
            this.state = 162;
            this.match(loParser.T__23);
            this.state = 163;
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
    this.ruleIndex = loParser.RULE_block;
    return this;
}

BlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BlockContext.prototype.constructor = BlockContext;

BlockContext.prototype.BEGIN = function() {
    return this.getToken(loParser.BEGIN, 0);
};

BlockContext.prototype.END = function() {
    return this.getToken(loParser.END, 0);
};

BlockContext.prototype.statementList = function() {
    return this.getTypedRuleContext(StatementListContext,0);
};

BlockContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitBlock(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.BlockContext = BlockContext;

loParser.prototype.block = function() {

    var localctx = new BlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, loParser.RULE_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 167;
        this.match(loParser.BEGIN);
        this.state = 169;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__3) | (1 << loParser.T__4) | (1 << loParser.T__5) | (1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__12) | (1 << loParser.T__13) | (1 << loParser.T__15) | (1 << loParser.T__22) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0)) {
            this.state = 168;
            this.statementList();
        }

        this.state = 171;
        this.match(loParser.END);
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
    this.ruleIndex = loParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;


 
ExprContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function NegationContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NegationContext.prototype = Object.create(ExprContext.prototype);
NegationContext.prototype.constructor = NegationContext;

loParser.NegationContext = NegationContext;

NegationContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
NegationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.DynastringContext = DynastringContext;

DynastringContext.prototype.INTER_BEGIN = function() {
    return this.getToken(loParser.INTER_BEGIN, 0);
};

DynastringContext.prototype.interpolated = function() {
    return this.getTypedRuleContext(InterpolatedContext,0);
};

DynastringContext.prototype.INTER_END = function() {
    return this.getToken(loParser.INTER_END, 0);
};
DynastringContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.CompareContext = CompareContext;

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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitCompare(this);
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

loParser.SelectContext = SelectContext;

SelectContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SelectContext.prototype.ID = function() {
    return this.getToken(loParser.ID, 0);
};
SelectContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.SubscriptContext = SubscriptContext;

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
    if ( visitor instanceof loVisitor ) {
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

loParser.AddSubContext = AddSubContext;

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
    if ( visitor instanceof loVisitor ) {
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

loParser.MembershipContext = MembershipContext;

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
    if ( visitor instanceof loVisitor ) {
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

loParser.ConcatContext = ConcatContext;

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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitConcat(this);
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

loParser.CardinalityContext = CardinalityContext;

CardinalityContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
CardinalityContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.MulDivContext = MulDivContext;

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
    if ( visitor instanceof loVisitor ) {
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

loParser.LogicalContext = LogicalContext;

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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitLogical(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AsyncCallContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AsyncCallContext.prototype = Object.create(ExprContext.prototype);
AsyncCallContext.prototype.constructor = AsyncCallContext;

loParser.AsyncCallContext = AsyncCallContext;

AsyncCallContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AsyncCallContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
AsyncCallContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitAsyncCall(this);
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

loParser.SliceContext = SliceContext;

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
    if ( visitor instanceof loVisitor ) {
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

loParser.BytesContext = BytesContext;

BytesContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
BytesContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitBytes(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SyncCallContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SyncCallContext.prototype = Object.create(ExprContext.prototype);
SyncCallContext.prototype.constructor = SyncCallContext;

loParser.SyncCallContext = SyncCallContext;

SyncCallContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SyncCallContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
SyncCallContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitSyncCall(this);
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

loParser.IdContext = IdContext;

IdContext.prototype.ID = function() {
    return this.getToken(loParser.ID, 0);
};
IdContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.WrapContext = WrapContext;

WrapContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
WrapContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitWrap(this);
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

loParser.DestructureContext = DestructureContext;

DestructureContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(loParser.ID);
    } else {
        return this.getToken(loParser.ID, i);
    }
};

DestructureContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitDestructure(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ConstExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ConstExprContext.prototype = Object.create(ExprContext.prototype);
ConstExprContext.prototype.constructor = ConstExprContext;

loParser.ConstExprContext = ConstExprContext;

ConstExprContext.prototype.constant = function() {
    return this.getTypedRuleContext(ConstantContext,0);
};
ConstExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitConstExpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};



loParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 24;
    this.enterRecursionRule(localctx, 24, loParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 207;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
        switch(la_) {
        case 1:
            localctx = new AsyncCallContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 174;
            this.match(loParser.T__10);
            this.state = 175;
            this.expr(0);
            this.state = 176;
            this.match(loParser.T__8);
            this.state = 178;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__15) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0)) {
                this.state = 177;
                this.exprList();
            }

            this.state = 180;
            this.match(loParser.T__9);
            break;

        case 2:
            localctx = new CardinalityContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 182;
            this.match(loParser.T__24);
            this.state = 183;
            this.expr(17);
            break;

        case 3:
            localctx = new NegationContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 184;
            this.match(loParser.T__25);
            this.state = 185;
            this.expr(16);
            break;

        case 4:
            localctx = new BytesContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 186;
            this.match(loParser.T__26);
            this.state = 187;
            this.expr(15);
            break;

        case 5:
            localctx = new WrapContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 188;
            this.match(loParser.T__8);
            this.state = 189;
            this.expr(0);
            this.state = 190;
            this.match(loParser.T__9);
            break;

        case 6:
            localctx = new DestructureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 192;
            this.match(loParser.T__8);
            this.state = 193;
            this.match(loParser.ID);
            this.state = 196; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 194;
                this.match(loParser.T__46);
                this.state = 195;
                this.match(loParser.ID);
                this.state = 198; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===loParser.T__46);
            this.state = 200;
            this.match(loParser.T__9);
            break;

        case 7:
            localctx = new DynastringContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 201;
            this.match(loParser.INTER_BEGIN);
            this.state = 202;
            this.interpolated();
            this.state = 203;
            this.match(loParser.INTER_END);
            break;

        case 8:
            localctx = new ConstExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 205;
            this.constant();
            break;

        case 9:
            localctx = new IdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 206;
            this.match(loParser.ID);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 252;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,17,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 250;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 209;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 210;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__27) | (1 << loParser.T__28) | (1 << loParser.T__29))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 211;
                    this.expr(15);
                    break;

                case 2:
                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 212;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 213;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===loParser.T__30 || _la===loParser.T__31)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 214;
                    this.expr(14);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 215;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 216;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 33)) & ~0x1f) == 0 && ((1 << (_la - 33)) & ((1 << (loParser.T__32 - 33)) | (1 << (loParser.T__33 - 33)) | (1 << (loParser.T__34 - 33)) | (1 << (loParser.T__35 - 33)) | (1 << (loParser.T__36 - 33)) | (1 << (loParser.T__37 - 33)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 217;
                    this.expr(13);
                    break;

                case 4:
                    localctx = new LogicalContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 218;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 219;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===loParser.T__38 || _la===loParser.T__39)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 220;
                    this.expr(12);
                    break;

                case 5:
                    localctx = new MembershipContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 221;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 222;
                    this.match(loParser.T__40);
                    this.state = 223;
                    this.expr(11);
                    break;

                case 6:
                    localctx = new ConcatContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 224;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 225;
                    this.match(loParser.T__41);
                    this.state = 226;
                    this.expr(10);
                    break;

                case 7:
                    localctx = new SyncCallContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 227;
                    if (!( this.precpred(this._ctx, 19))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 19)");
                    }
                    this.state = 228;
                    this.match(loParser.T__8);
                    this.state = 230;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__15) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0)) {
                        this.state = 229;
                        this.exprList();
                    }

                    this.state = 232;
                    this.match(loParser.T__9);
                    break;

                case 8:
                    localctx = new SubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 233;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 234;
                    this.match(loParser.T__42);
                    this.state = 235;
                    this.expr(0);
                    this.state = 236;
                    this.match(loParser.T__43);
                    break;

                case 9:
                    localctx = new SliceContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 238;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 239;
                    this.match(loParser.T__42);
                    this.state = 240;
                    this.expr(0);
                    this.state = 241;
                    this.match(loParser.T__44);
                    this.state = 243;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__15) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0)) {
                        this.state = 242;
                        this.expr(0);
                    }

                    this.state = 245;
                    this.match(loParser.T__43);
                    break;

                case 10:
                    localctx = new SelectContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 247;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 248;
                    this.match(loParser.T__45);
                    this.state = 249;
                    this.match(loParser.ID);
                    break;

                } 
            }
            this.state = 254;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,17,this._ctx);
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

function ConstantContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_constant;
    return this;
}

ConstantContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConstantContext.prototype.constructor = ConstantContext;


 
ConstantContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function LocalConstContext(parser, ctx) {
	ConstantContext.call(this, parser);
    ConstantContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LocalConstContext.prototype = Object.create(ConstantContext.prototype);
LocalConstContext.prototype.constructor = LocalConstContext;

loParser.LocalConstContext = LocalConstContext;

LocalConstContext.prototype.literal = function() {
    return this.getTypedRuleContext(LiteralContext,0);
};
LocalConstContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitLocalConst(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ExternalRefContext(parser, ctx) {
	ConstantContext.call(this, parser);
    ConstantContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ExternalRefContext.prototype = Object.create(ConstantContext.prototype);
ExternalRefContext.prototype.constructor = ExternalRefContext;

loParser.ExternalRefContext = ExternalRefContext;

ExternalRefContext.prototype.modref = function() {
    return this.getTypedRuleContext(ModrefContext,0);
};

ExternalRefContext.prototype.ID = function() {
    return this.getToken(loParser.ID, 0);
};
ExternalRefContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitExternalRef(this);
    } else {
        return visitor.visitChildren(this);
    }
};



loParser.ConstantContext = ConstantContext;

loParser.prototype.constant = function() {

    var localctx = new ConstantContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, loParser.RULE_constant);
    try {
        this.state = 260;
        switch(this._input.LA(1)) {
        case loParser.ID:
            localctx = new ExternalRefContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 255;
            this.modref(0);
            this.state = 256;
            this.match(loParser.T__47);
            this.state = 257;
            this.match(loParser.ID);
            break;
        case loParser.T__8:
        case loParser.T__15:
        case loParser.T__42:
        case loParser.T__48:
        case loParser.T__49:
        case loParser.T__50:
        case loParser.BEGIN:
        case loParser.NIL:
        case loParser.BOOL:
        case loParser.NUMBER:
        case loParser.STRING:
            localctx = new LocalConstContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 259;
            this.literal();
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

function InterpolatedContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_interpolated;
    return this;
}

InterpolatedContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InterpolatedContext.prototype.constructor = InterpolatedContext;

InterpolatedContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

InterpolatedContext.prototype.INTER_MID = function() {
    return this.getToken(loParser.INTER_MID, 0);
};

InterpolatedContext.prototype.interpolated = function() {
    return this.getTypedRuleContext(InterpolatedContext,0);
};

InterpolatedContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitInterpolated(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.InterpolatedContext = InterpolatedContext;

loParser.prototype.interpolated = function() {

    var localctx = new InterpolatedContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, loParser.RULE_interpolated);
    try {
        this.state = 267;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 262;
            this.expr(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 263;
            this.expr(0);
            this.state = 264;
            this.match(loParser.INTER_MID);
            this.state = 265;
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
    this.ruleIndex = loParser.RULE_exprList;
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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitExprList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.ExprListContext = ExprListContext;

loParser.prototype.exprList = function() {

    var localctx = new ExprListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, loParser.RULE_exprList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 269;
        this.expr(0);
        this.state = 274;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,20,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 270;
                this.match(loParser.T__46);
                this.state = 271;
                this.expr(0); 
            }
            this.state = 276;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,20,this._ctx);
        }

        this.state = 278;
        _la = this._input.LA(1);
        if(_la===loParser.T__46) {
            this.state = 277;
            this.match(loParser.T__46);
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
    this.ruleIndex = loParser.RULE_literal;
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

loParser.NilContext = NilContext;

NilContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.NumberContext = NumberContext;

NumberContext.prototype.NUMBER = function() {
    return this.getToken(loParser.NUMBER, 0);
};
NumberContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitNumber(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function HandlerContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

HandlerContext.prototype = Object.create(LiteralContext.prototype);
HandlerContext.prototype.constructor = HandlerContext;

loParser.HandlerContext = HandlerContext;

HandlerContext.prototype.sink = function() {
    return this.getTypedRuleContext(SinkContext,0);
};
HandlerContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitHandler(this);
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

loParser.SetContext = SetContext;

SetContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};

SetContext.prototype.pairList = function() {
    return this.getTypedRuleContext(PairListContext,0);
};

SetContext.prototype.PAIR_SEP = function() {
    return this.getToken(loParser.PAIR_SEP, 0);
};
SetContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.BoolContext = BoolContext;

BoolContext.prototype.BOOL = function() {
    return this.getToken(loParser.BOOL, 0);
};
BoolContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.StringContext = StringContext;

StringContext.prototype.STRING = function() {
    return this.getToken(loParser.STRING, 0);
};
StringContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitString(this);
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

loParser.ArrayContext = ArrayContext;

ArrayContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
ArrayContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitArray(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SubscribeContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SubscribeContext.prototype = Object.create(LiteralContext.prototype);
SubscribeContext.prototype.constructor = SubscribeContext;

loParser.SubscribeContext = SubscribeContext;

SubscribeContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

SubscribeContext.prototype.sink = function() {
    return this.getTypedRuleContext(SinkContext,0);
};
SubscribeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitSubscribe(this);
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

loParser.ServiceContext = ServiceContext;

ServiceContext.prototype.procedure = function() {
    return this.getTypedRuleContext(ProcedureContext,0);
};
ServiceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
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

loParser.RecordContext = RecordContext;

RecordContext.prototype.fieldList = function() {
    return this.getTypedRuleContext(FieldListContext,0);
};

RecordContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};
RecordContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitRecord(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function EventContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

EventContext.prototype = Object.create(LiteralContext.prototype);
EventContext.prototype.constructor = EventContext;

loParser.EventContext = EventContext;

EventContext.prototype.paramList = function() {
    return this.getTypedRuleContext(ParamListContext,0);
};
EventContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitEvent(this);
    } else {
        return visitor.visitChildren(this);
    }
};



loParser.LiteralContext = LiteralContext;

loParser.prototype.literal = function() {

    var localctx = new LiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, loParser.RULE_literal);
    var _la = 0; // Token type
    try {
        this.state = 314;
        switch(this._input.LA(1)) {
        case loParser.NIL:
            localctx = new NilContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 280;
            this.match(loParser.NIL);
            break;
        case loParser.BOOL:
            localctx = new BoolContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 281;
            this.match(loParser.BOOL);
            break;
        case loParser.NUMBER:
            localctx = new NumberContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 282;
            this.match(loParser.NUMBER);
            break;
        case loParser.STRING:
            localctx = new StringContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 283;
            this.match(loParser.STRING);
            break;
        case loParser.T__42:
            localctx = new ArrayContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 284;
            this.match(loParser.T__42);
            this.state = 286;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__15) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0)) {
                this.state = 285;
                this.exprList();
            }

            this.state = 288;
            this.match(loParser.T__43);
            break;
        case loParser.T__8:
            localctx = new RecordContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 289;
            this.match(loParser.T__8);
            this.state = 292;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
            switch(la_) {
            case 1:
                this.state = 290;
                this.fieldList();
                break;

            case 2:
                this.state = 291;
                this.exprList();
                break;

            }
            this.state = 294;
            this.match(loParser.T__9);
            break;
        case loParser.BEGIN:
            localctx = new SetContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 296;
            this.match(loParser.BEGIN);
            this.state = 300;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
            if(la_===1) {
                this.state = 297;
                localctx.sep = this.match(loParser.PAIR_SEP);

            } else if(la_===2) {
                this.state = 298;
                this.exprList();

            } else if(la_===3) {
                this.state = 299;
                this.pairList();

            }
            this.state = 302;
            this.match(loParser.END);
            break;
        case loParser.T__50:
            localctx = new HandlerContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 303;
            this.sink();
            break;
        case loParser.T__48:
            localctx = new ServiceContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 304;
            this.match(loParser.T__48);
            this.state = 305;
            this.procedure();
            break;
        case loParser.T__49:
            localctx = new EventContext(this, localctx);
            this.enterOuterAlt(localctx, 10);
            this.state = 306;
            this.match(loParser.T__49);
            this.state = 308;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
            if(la_===1) {
                this.state = 307;
                this.paramList();

            }
            break;
        case loParser.T__15:
            localctx = new SubscribeContext(this, localctx);
            this.enterOuterAlt(localctx, 11);
            this.state = 310;
            this.match(loParser.T__15);
            this.state = 311;
            this.expr(0);
            this.state = 312;
            this.sink();
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

function SinkContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_sink;
    return this;
}

SinkContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SinkContext.prototype.constructor = SinkContext;

SinkContext.prototype.procedure = function() {
    return this.getTypedRuleContext(ProcedureContext,0);
};

SinkContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitSink(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.SinkContext = SinkContext;

loParser.prototype.sink = function() {

    var localctx = new SinkContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, loParser.RULE_sink);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 316;
        this.match(loParser.T__50);
        this.state = 317;
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

function ProcedureContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_procedure;
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

ProcedureContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitProcedure(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.ProcedureContext = ProcedureContext;

loParser.prototype.procedure = function() {

    var localctx = new ProcedureContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, loParser.RULE_procedure);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 320;
        _la = this._input.LA(1);
        if(_la===loParser.T__8) {
            this.state = 319;
            this.paramList();
        }

        this.state = 322;
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

function ParamListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = loParser.RULE_paramList;
    return this;
}

ParamListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParamListContext.prototype.constructor = ParamListContext;

ParamListContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(loParser.ID);
    } else {
        return this.getToken(loParser.ID, i);
    }
};


ParamListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitParamList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.ParamListContext = ParamListContext;

loParser.prototype.paramList = function() {

    var localctx = new ParamListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, loParser.RULE_paramList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 324;
        this.match(loParser.T__8);
        this.state = 325;
        this.match(loParser.ID);
        this.state = 330;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===loParser.T__46) {
            this.state = 326;
            this.match(loParser.T__46);
            this.state = 327;
            this.match(loParser.ID);
            this.state = 332;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 333;
        this.match(loParser.T__9);
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
    this.ruleIndex = loParser.RULE_fieldList;
    return this;
}

FieldListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldListContext.prototype.constructor = FieldListContext;

FieldListContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(loParser.ID);
    } else {
        return this.getToken(loParser.ID, i);
    }
};


FieldListContext.prototype.FIELD_SEP = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(loParser.FIELD_SEP);
    } else {
        return this.getToken(loParser.FIELD_SEP, i);
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
    if ( visitor instanceof loVisitor ) {
        return visitor.visitFieldList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.FieldListContext = FieldListContext;

loParser.prototype.fieldList = function() {

    var localctx = new FieldListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, loParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 341; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 335;
            this.match(loParser.ID);
            this.state = 336;
            this.match(loParser.FIELD_SEP);
            this.state = 337;
            this.expr(0);
            this.state = 339;
            _la = this._input.LA(1);
            if(_la===loParser.T__46) {
                this.state = 338;
                this.match(loParser.T__46);
            }

            this.state = 343; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===loParser.ID);
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
    this.ruleIndex = loParser.RULE_pairList;
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
        return this.getTokens(loParser.PAIR_SEP);
    } else {
        return this.getToken(loParser.PAIR_SEP, i);
    }
};


PairListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitPairList(this);
    } else {
        return visitor.visitChildren(this);
    }
};




loParser.PairListContext = PairListContext;

loParser.prototype.pairList = function() {

    var localctx = new PairListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, loParser.RULE_pairList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 351; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 345;
            this.expr(0);
            this.state = 346;
            this.match(loParser.PAIR_SEP);
            this.state = 347;
            this.expr(0);
            this.state = 349;
            _la = this._input.LA(1);
            if(_la===loParser.T__46) {
                this.state = 348;
                this.match(loParser.T__46);
            }

            this.state = 353; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__8) | (1 << loParser.T__10) | (1 << loParser.T__15) | (1 << loParser.T__24) | (1 << loParser.T__25) | (1 << loParser.T__26))) !== 0) || ((((_la - 43)) & ~0x1f) == 0 && ((1 << (_la - 43)) & ((1 << (loParser.T__42 - 43)) | (1 << (loParser.T__48 - 43)) | (1 << (loParser.T__49 - 43)) | (1 << (loParser.T__50 - 43)) | (1 << (loParser.BEGIN - 43)) | (1 << (loParser.NIL - 43)) | (1 << (loParser.BOOL - 43)) | (1 << (loParser.NUMBER - 43)) | (1 << (loParser.ID - 43)) | (1 << (loParser.STRING - 43)) | (1 << (loParser.INTER_BEGIN - 43)))) !== 0));
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


loParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 2:
			return this.modref_sempred(localctx, predIndex);
	case 12:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

loParser.prototype.modref_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

loParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 1:
			return this.precpred(this._ctx, 14);
		case 2:
			return this.precpred(this._ctx, 13);
		case 3:
			return this.precpred(this._ctx, 12);
		case 4:
			return this.precpred(this._ctx, 11);
		case 5:
			return this.precpred(this._ctx, 10);
		case 6:
			return this.precpred(this._ctx, 9);
		case 7:
			return this.precpred(this._ctx, 19);
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


exports.loParser = loParser;
