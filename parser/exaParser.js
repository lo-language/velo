// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var exaVisitor = require('./exaVisitor').exaVisitor;

var grammarFileName = "exa.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003A\u013a\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0003\u0002\u0005\u0002&\n\u0002",
    "\u0003\u0002\u0006\u0002)\n\u0002\r\u0002\u000e\u0002*\u0003\u0002\u0003",
    "\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0006\u00033",
    "\n\u0003\r\u0003\u000e\u00034\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0005\u0004;\n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0005",
    "\u0005@\n\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0005\u0005T\n\u0005\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\bm\n\b\u0003\t\u0003",
    "\t\u0005\tq\n\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u0080\n\n",
    "\u0003\n\u0003\n\u0005\n\u0084\n\n\u0003\n\u0005\n\u0087\n\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0006\n\u0091",
    "\n\n\r\n\u000e\n\u0092\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u009f\n\n\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0005\n\u00b6\n\n\u0003\n\u0003\n\u0005\n\u00ba\n\n\u0003",
    "\n\u0005\n\u00bd\n\n\u0003\n\u0003\n\u0003\n\u0005\n\u00c2\n\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u00ca\n\n\u0003\n",
    "\u0005\n\u00cd\n\n\u0003\n\u0003\n\u0005\n\u00d1\n\n\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0007\n\u00d7\n\n\f\n\u000e\n\u00da\u000b\n\u0003\u000b",
    "\u0003\u000b\u0005\u000b\u00de\n\u000b\u0003\u000b\u0003\u000b\u0003",
    "\f\u0003\f\u0003\f\u0005\f\u00e5\n\f\u0003\f\u0005\f\u00e8\n\f\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0005\r\u00ef\n\r\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0007\u000e\u00f4\n\u000e\f\u000e\u000e\u000e\u00f7",
    "\u000b\u000e\u0003\u000e\u0005\u000e\u00fa\n\u000e\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u0102",
    "\n\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u0107\n\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f",
    "\u010e\n\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005",
    "\u000f\u0114\n\u000f\u0003\u000f\u0005\u000f\u0117\n\u000f\u0003\u0010",
    "\u0003\u0010\u0005\u0010\u011b\n\u0010\u0003\u0010\u0003\u0010\u0007",
    "\u0010\u011f\n\u0010\f\u0010\u000e\u0010\u0122\u000b\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0005\u0011",
    "\u012a\n\u0011\u0006\u0011\u012c\n\u0011\r\u0011\u000e\u0011\u012d\u0003",
    "\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0005\u0012\u0134\n\u0012",
    "\u0006\u0012\u0136\n\u0012\r\u0012\u000e\u0012\u0137\u0003\u0012\u0002",
    "\u0003\u0012\u0013\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016",
    "\u0018\u001a\u001c\u001e \"\u0002\n\u0003\u0002\u0003\u0004\u0003\u0002",
    "\u0005\u0007\u0003\u0002\t\n\u0003\u0002\r\u0012\u0004\u0002\u0017\u0017",
    "\u001b\u001c\u0003\u0002\u001d\u001e\u0003\u0002\u001f$\u0003\u0002",
    "%&\u016e\u0002%\u0003\u0002\u0002\u0002\u0004.\u0003\u0002\u0002\u0002",
    "\u0006:\u0003\u0002\u0002\u0002\bS\u0003\u0002\u0002\u0002\nU\u0003",
    "\u0002\u0002\u0002\fZ\u0003\u0002\u0002\u0002\u000el\u0003\u0002\u0002",
    "\u0002\u0010n\u0003\u0002\u0002\u0002\u0012\u009e\u0003\u0002\u0002",
    "\u0002\u0014\u00db\u0003\u0002\u0002\u0002\u0016\u00e7\u0003\u0002\u0002",
    "\u0002\u0018\u00ee\u0003\u0002\u0002\u0002\u001a\u00f0\u0003\u0002\u0002",
    "\u0002\u001c\u0116\u0003\u0002\u0002\u0002\u001e\u0118\u0003\u0002\u0002",
    "\u0002 \u012b\u0003\u0002\u0002\u0002\"\u0135\u0003\u0002\u0002\u0002",
    "$&\u0005\u0004\u0003\u0002%$\u0003\u0002\u0002\u0002%&\u0003\u0002\u0002",
    "\u0002&(\u0003\u0002\u0002\u0002\')\u0005\n\u0006\u0002(\'\u0003\u0002",
    "\u0002\u0002)*\u0003\u0002\u0002\u0002*(\u0003\u0002\u0002\u0002*+\u0003",
    "\u0002\u0002\u0002+,\u0003\u0002\u0002\u0002,-\u0007\u0002\u0002\u0003",
    "-\u0003\u0003\u0002\u0002\u0002./\t\u0002\u0002\u0002/2\u0007:\u0002",
    "\u000201\u0007<\u0002\u000213\u0007A\u0002\u000220\u0003\u0002\u0002",
    "\u000234\u0003\u0002\u0002\u000242\u0003\u0002\u0002\u000245\u0003\u0002",
    "\u0002\u00025\u0005\u0003\u0002\u0002\u00026;\u0005\b\u0005\u000278",
    "\u0005\b\u0005\u000289\u0005\u0006\u0004\u00029;\u0003\u0002\u0002\u0002",
    ":6\u0003\u0002\u0002\u0002:7\u0003\u0002\u0002\u0002;\u0007\u0003\u0002",
    "\u0002\u0002<T\u0005\n\u0006\u0002=?\t\u0003\u0002\u0002>@\u0005\u001a",
    "\u000e\u0002?>\u0003\u0002\u0002\u0002?@\u0003\u0002\u0002\u0002@A\u0003",
    "\u0002\u0002\u0002AT\u0007\b\u0002\u0002BC\u0005\u0012\n\u0002CD\u0005",
    "\f\u0007\u0002DE\u0005\u0012\n\u0002EF\u0007\b\u0002\u0002FT\u0003\u0002",
    "\u0002\u0002GH\u0005\u0012\n\u0002HI\t\u0004\u0002\u0002IJ\u0007\b\u0002",
    "\u0002JT\u0003\u0002\u0002\u0002KT\u0005\u000e\b\u0002LM\u0007\u000b",
    "\u0002\u0002MN\u0005\u0012\n\u0002NO\u0005\u0010\t\u0002OT\u0003\u0002",
    "\u0002\u0002PQ\u0005\u0012\n\u0002QR\u0007\b\u0002\u0002RT\u0003\u0002",
    "\u0002\u0002S<\u0003\u0002\u0002\u0002S=\u0003\u0002\u0002\u0002SB\u0003",
    "\u0002\u0002\u0002SG\u0003\u0002\u0002\u0002SK\u0003\u0002\u0002\u0002",
    "SL\u0003\u0002\u0002\u0002SP\u0003\u0002\u0002\u0002T\t\u0003\u0002",
    "\u0002\u0002UV\u0007<\u0002\u0002VW\u0007\f\u0002\u0002WX\u0005\u001c",
    "\u000f\u0002XY\u0007\b\u0002\u0002Y\u000b\u0003\u0002\u0002\u0002Z[",
    "\t\u0005\u0002\u0002[\r\u0003\u0002\u0002\u0002\\]\u0007\u0013\u0002",
    "\u0002]^\u0005\u0012\n\u0002^_\u0005\u0010\t\u0002_m\u0003\u0002\u0002",
    "\u0002`a\u0007\u0013\u0002\u0002ab\u0005\u0012\n\u0002bc\u0005\u0010",
    "\t\u0002cd\u0007\u0014\u0002\u0002de\u0005\u0010\t\u0002em\u0003\u0002",
    "\u0002\u0002fg\u0007\u0013\u0002\u0002gh\u0005\u0012\n\u0002hi\u0005",
    "\u0010\t\u0002ij\u0007\u0014\u0002\u0002jk\u0005\u000e\b\u0002km\u0003",
    "\u0002\u0002\u0002l\\\u0003\u0002\u0002\u0002l`\u0003\u0002\u0002\u0002",
    "lf\u0003\u0002\u0002\u0002m\u000f\u0003\u0002\u0002\u0002np\u00075\u0002",
    "\u0002oq\u0005\u0006\u0004\u0002po\u0003\u0002\u0002\u0002pq\u0003\u0002",
    "\u0002\u0002qr\u0003\u0002\u0002\u0002rs\u00076\u0002\u0002s\u0011\u0003",
    "\u0002\u0002\u0002tu\b\n\u0001\u0002uv\u0007\u0018\u0002\u0002v\u009f",
    "\u0005\u0012\n\u0014wx\u0007\u0019\u0002\u0002x\u009f\u0005\u0012\n",
    "\u0013yz\u0007\u001a\u0002\u0002z\u009f\u0005\u0012\n\u0012{|\u0007",
    "\u0017\u0002\u0002|}\u0005\u0012\n\u0002}\u007f\u0007\u0015\u0002\u0002",
    "~\u0080\u0005\u001a\u000e\u0002\u007f~\u0003\u0002\u0002\u0002\u007f",
    "\u0080\u0003\u0002\u0002\u0002\u0080\u0081\u0003\u0002\u0002\u0002\u0081",
    "\u0083\u0007\u0016\u0002\u0002\u0082\u0084\u0005\u0014\u000b\u0002\u0083",
    "\u0082\u0003\u0002\u0002\u0002\u0083\u0084\u0003\u0002\u0002\u0002\u0084",
    "\u0086\u0003\u0002\u0002\u0002\u0085\u0087\u0005\u0016\f\u0002\u0086",
    "\u0085\u0003\u0002\u0002\u0002\u0086\u0087\u0003\u0002\u0002\u0002\u0087",
    "\u009f\u0003\u0002\u0002\u0002\u0088\u0089\u0007\u0015\u0002\u0002\u0089",
    "\u008a\u0005\u0012\n\u0002\u008a\u008b\u0007\u0016\u0002\u0002\u008b",
    "\u009f\u0003\u0002\u0002\u0002\u008c\u008d\u0007\u0015\u0002\u0002\u008d",
    "\u0090\u0007<\u0002\u0002\u008e\u008f\u0007.\u0002\u0002\u008f\u0091",
    "\u0007<\u0002\u0002\u0090\u008e\u0003\u0002\u0002\u0002\u0091\u0092",
    "\u0003\u0002\u0002\u0002\u0092\u0090\u0003\u0002\u0002\u0002\u0092\u0093",
    "\u0003\u0002\u0002\u0002\u0093\u0094\u0003\u0002\u0002\u0002\u0094\u009f",
    "\u0007\u0016\u0002\u0002\u0095\u0096\u0007>\u0002\u0002\u0096\u0097",
    "\u0005\u0018\r\u0002\u0097\u0098\u0007@\u0002\u0002\u0098\u009f\u0003",
    "\u0002\u0002\u0002\u0099\u009f\u0005\u001c\u000f\u0002\u009a\u009b\u0007",
    "<\u0002\u0002\u009b\u009c\u0007:\u0002\u0002\u009c\u009f\u0007<\u0002",
    "\u0002\u009d\u009f\u0007<\u0002\u0002\u009et\u0003\u0002\u0002\u0002",
    "\u009ew\u0003\u0002\u0002\u0002\u009ey\u0003\u0002\u0002\u0002\u009e",
    "{\u0003\u0002\u0002\u0002\u009e\u0088\u0003\u0002\u0002\u0002\u009e",
    "\u008c\u0003\u0002\u0002\u0002\u009e\u0095\u0003\u0002\u0002\u0002\u009e",
    "\u0099\u0003\u0002\u0002\u0002\u009e\u009a\u0003\u0002\u0002\u0002\u009e",
    "\u009d\u0003\u0002\u0002\u0002\u009f\u00d8\u0003\u0002\u0002\u0002\u00a0",
    "\u00a1\f\u0011\u0002\u0002\u00a1\u00a2\t\u0006\u0002\u0002\u00a2\u00d7",
    "\u0005\u0012\n\u0012\u00a3\u00a4\f\u0010\u0002\u0002\u00a4\u00a5\t\u0007",
    "\u0002\u0002\u00a5\u00d7\u0005\u0012\n\u0011\u00a6\u00a7\f\u000f\u0002",
    "\u0002\u00a7\u00a8\t\b\u0002\u0002\u00a8\u00d7\u0005\u0012\n\u0010\u00a9",
    "\u00aa\f\u000e\u0002\u0002\u00aa\u00ab\t\t\u0002\u0002\u00ab\u00d7\u0005",
    "\u0012\n\u000f\u00ac\u00ad\f\r\u0002\u0002\u00ad\u00ae\u0007\'\u0002",
    "\u0002\u00ae\u00d7\u0005\u0012\n\u000e\u00af\u00b0\f\f\u0002\u0002\u00b0",
    "\u00b1\u0007(\u0002\u0002\u00b1\u00d7\u0005\u0012\n\r\u00b2\u00b3\f",
    "\u0016\u0002\u0002\u00b3\u00b5\u0007\u0015\u0002\u0002\u00b4\u00b6\u0005",
    "\u001a\u000e\u0002\u00b5\u00b4\u0003\u0002\u0002\u0002\u00b5\u00b6\u0003",
    "\u0002\u0002\u0002\u00b6\u00b7\u0003\u0002\u0002\u0002\u00b7\u00b9\u0007",
    "\u0016\u0002\u0002\u00b8\u00ba\u0005\u0014\u000b\u0002\u00b9\u00b8\u0003",
    "\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002\u0002\u0002\u00ba\u00bc\u0003",
    "\u0002\u0002\u0002\u00bb\u00bd\u0005\u0016\f\u0002\u00bc\u00bb\u0003",
    "\u0002\u0002\u0002\u00bc\u00bd\u0003\u0002\u0002\u0002\u00bd\u00d7\u0003",
    "\u0002\u0002\u0002\u00be\u00bf\f\n\u0002\u0002\u00bf\u00c1\u0007)\u0002",
    "\u0002\u00c0\u00c2\u0007*\u0002\u0002\u00c1\u00c0\u0003\u0002\u0002",
    "\u0002\u00c1\u00c2\u0003\u0002\u0002\u0002\u00c2\u00c3\u0003\u0002\u0002",
    "\u0002\u00c3\u00c4\u0005\u0012\n\u0002\u00c4\u00c5\u0007+\u0002\u0002",
    "\u00c5\u00d7\u0003\u0002\u0002\u0002\u00c6\u00c7\f\t\u0002\u0002\u00c7",
    "\u00c9\u0007)\u0002\u0002\u00c8\u00ca\u0007*\u0002\u0002\u00c9\u00c8",
    "\u0003\u0002\u0002\u0002\u00c9\u00ca\u0003\u0002\u0002\u0002\u00ca\u00cc",
    "\u0003\u0002\u0002\u0002\u00cb\u00cd\u0005\u0012\n\u0002\u00cc\u00cb",
    "\u0003\u0002\u0002\u0002\u00cc\u00cd\u0003\u0002\u0002\u0002\u00cd\u00ce",
    "\u0003\u0002\u0002\u0002\u00ce\u00d0\u0007,\u0002\u0002\u00cf\u00d1",
    "\u0005\u0012\n\u0002\u00d0\u00cf\u0003\u0002\u0002\u0002\u00d0\u00d1",
    "\u0003\u0002\u0002\u0002\u00d1\u00d2\u0003\u0002\u0002\u0002\u00d2\u00d7",
    "\u0007+\u0002\u0002\u00d3\u00d4\f\b\u0002\u0002\u00d4\u00d5\u0007-\u0002",
    "\u0002\u00d5\u00d7\u0007<\u0002\u0002\u00d6\u00a0\u0003\u0002\u0002",
    "\u0002\u00d6\u00a3\u0003\u0002\u0002\u0002\u00d6\u00a6\u0003\u0002\u0002",
    "\u0002\u00d6\u00a9\u0003\u0002\u0002\u0002\u00d6\u00ac\u0003\u0002\u0002",
    "\u0002\u00d6\u00af\u0003\u0002\u0002\u0002\u00d6\u00b2\u0003\u0002\u0002",
    "\u0002\u00d6\u00be\u0003\u0002\u0002\u0002\u00d6\u00c6\u0003\u0002\u0002",
    "\u0002\u00d6\u00d3\u0003\u0002\u0002\u0002\u00d7\u00da\u0003\u0002\u0002",
    "\u0002\u00d8\u00d6\u0003\u0002\u0002\u0002\u00d8\u00d9\u0003\u0002\u0002",
    "\u0002\u00d9\u0013\u0003\u0002\u0002\u0002\u00da\u00d8\u0003\u0002\u0002",
    "\u0002\u00db\u00dd\u0007/\u0002\u0002\u00dc\u00de\u0005\u001e\u0010",
    "\u0002\u00dd\u00dc\u0003\u0002\u0002\u0002\u00dd\u00de\u0003\u0002\u0002",
    "\u0002\u00de\u00df\u0003\u0002\u0002\u0002\u00df\u00e0\u0005\u0010\t",
    "\u0002\u00e0\u0015\u0003\u0002\u0002\u0002\u00e1\u00e8\u00070\u0002",
    "\u0002\u00e2\u00e4\u00071\u0002\u0002\u00e3\u00e5\u0005\u001e\u0010",
    "\u0002\u00e4\u00e3\u0003\u0002\u0002\u0002\u00e4\u00e5\u0003\u0002\u0002",
    "\u0002\u00e5\u00e6\u0003\u0002\u0002\u0002\u00e6\u00e8\u0005\u0010\t",
    "\u0002\u00e7\u00e1\u0003\u0002\u0002\u0002\u00e7\u00e2\u0003\u0002\u0002",
    "\u0002\u00e8\u0017\u0003\u0002\u0002\u0002\u00e9\u00ef\u0005\u0012\n",
    "\u0002\u00ea\u00eb\u0005\u0012\n\u0002\u00eb\u00ec\u0007?\u0002\u0002",
    "\u00ec\u00ed\u0005\u0018\r\u0002\u00ed\u00ef\u0003\u0002\u0002\u0002",
    "\u00ee\u00e9\u0003\u0002\u0002\u0002\u00ee\u00ea\u0003\u0002\u0002\u0002",
    "\u00ef\u0019\u0003\u0002\u0002\u0002\u00f0\u00f5\u0005\u0012\n\u0002",
    "\u00f1\u00f2\u0007.\u0002\u0002\u00f2\u00f4\u0005\u0012\n\u0002\u00f3",
    "\u00f1\u0003\u0002\u0002\u0002\u00f4\u00f7\u0003\u0002\u0002\u0002\u00f5",
    "\u00f3\u0003\u0002\u0002\u0002\u00f5\u00f6\u0003\u0002\u0002\u0002\u00f6",
    "\u00f9\u0003\u0002\u0002\u0002\u00f7\u00f5\u0003\u0002\u0002\u0002\u00f8",
    "\u00fa\u0007.\u0002\u0002\u00f9\u00f8\u0003\u0002\u0002\u0002\u00f9",
    "\u00fa\u0003\u0002\u0002\u0002\u00fa\u001b\u0003\u0002\u0002\u0002\u00fb",
    "\u0117\u00077\u0002\u0002\u00fc\u0117\u00078\u0002\u0002\u00fd\u0117",
    "\u0007;\u0002\u0002\u00fe\u0117\u0007=\u0002\u0002\u00ff\u0101\u0007",
    "/\u0002\u0002\u0100\u0102\u0005\u001e\u0010\u0002\u0101\u0100\u0003",
    "\u0002\u0002\u0002\u0101\u0102\u0003\u0002\u0002\u0002\u0102\u0103\u0003",
    "\u0002\u0002\u0002\u0103\u0117\u0005\u0010\t\u0002\u0104\u0106\u0007",
    ")\u0002\u0002\u0105\u0107\u0005\u001a\u000e\u0002\u0106\u0105\u0003",
    "\u0002\u0002\u0002\u0106\u0107\u0003\u0002\u0002\u0002\u0107\u0108\u0003",
    "\u0002\u0002\u0002\u0108\u0117\u0007+\u0002\u0002\u0109\u010d\u0007",
    "5\u0002\u0002\u010a\u010e\u00079\u0002\u0002\u010b\u010e\u0005\u001a",
    "\u000e\u0002\u010c\u010e\u0005\"\u0012\u0002\u010d\u010a\u0003\u0002",
    "\u0002\u0002\u010d\u010b\u0003\u0002\u0002\u0002\u010d\u010c\u0003\u0002",
    "\u0002\u0002\u010d\u010e\u0003\u0002\u0002\u0002\u010e\u010f\u0003\u0002",
    "\u0002\u0002\u010f\u0117\u00076\u0002\u0002\u0110\u0113\u0007\u0015",
    "\u0002\u0002\u0111\u0114\u0005\u001a\u000e\u0002\u0112\u0114\u0005 ",
    "\u0011\u0002\u0113\u0111\u0003\u0002\u0002\u0002\u0113\u0112\u0003\u0002",
    "\u0002\u0002\u0113\u0114\u0003\u0002\u0002\u0002\u0114\u0115\u0003\u0002",
    "\u0002\u0002\u0115\u0117\u0007\u0016\u0002\u0002\u0116\u00fb\u0003\u0002",
    "\u0002\u0002\u0116\u00fc\u0003\u0002\u0002\u0002\u0116\u00fd\u0003\u0002",
    "\u0002\u0002\u0116\u00fe\u0003\u0002\u0002\u0002\u0116\u00ff\u0003\u0002",
    "\u0002\u0002\u0116\u0104\u0003\u0002\u0002\u0002\u0116\u0109\u0003\u0002",
    "\u0002\u0002\u0116\u0110\u0003\u0002\u0002\u0002\u0117\u001d\u0003\u0002",
    "\u0002\u0002\u0118\u011a\u0007\u0015\u0002\u0002\u0119\u011b\u0007<",
    "\u0002\u0002\u011a\u0119\u0003\u0002\u0002\u0002\u011a\u011b\u0003\u0002",
    "\u0002\u0002\u011b\u0120\u0003\u0002\u0002\u0002\u011c\u011d\u0007.",
    "\u0002\u0002\u011d\u011f\u0007<\u0002\u0002\u011e\u011c\u0003\u0002",
    "\u0002\u0002\u011f\u0122\u0003\u0002\u0002\u0002\u0120\u011e\u0003\u0002",
    "\u0002\u0002\u0120\u0121\u0003\u0002\u0002\u0002\u0121\u0123\u0003\u0002",
    "\u0002\u0002\u0122\u0120\u0003\u0002\u0002\u0002\u0123\u0124\u0007\u0016",
    "\u0002\u0002\u0124\u001f\u0003\u0002\u0002\u0002\u0125\u0126\u0007<",
    "\u0002\u0002\u0126\u0127\u0007:\u0002\u0002\u0127\u0129\u0005\u0012",
    "\n\u0002\u0128\u012a\u0007.\u0002\u0002\u0129\u0128\u0003\u0002\u0002",
    "\u0002\u0129\u012a\u0003\u0002\u0002\u0002\u012a\u012c\u0003\u0002\u0002",
    "\u0002\u012b\u0125\u0003\u0002\u0002\u0002\u012c\u012d\u0003\u0002\u0002",
    "\u0002\u012d\u012b\u0003\u0002\u0002\u0002\u012d\u012e\u0003\u0002\u0002",
    "\u0002\u012e!\u0003\u0002\u0002\u0002\u012f\u0130\u0005\u0012\n\u0002",
    "\u0130\u0131\u00079\u0002\u0002\u0131\u0133\u0005\u0012\n\u0002\u0132",
    "\u0134\u0007.\u0002\u0002\u0133\u0132\u0003\u0002\u0002\u0002\u0133",
    "\u0134\u0003\u0002\u0002\u0002\u0134\u0136\u0003\u0002\u0002\u0002\u0135",
    "\u012f\u0003\u0002\u0002\u0002\u0136\u0137\u0003\u0002\u0002\u0002\u0137",
    "\u0135\u0003\u0002\u0002\u0002\u0137\u0138\u0003\u0002\u0002\u0002\u0138",
    "#\u0003\u0002\u0002\u0002)%*4:?Slp\u007f\u0083\u0086\u0092\u009e\u00b5",
    "\u00b9\u00bc\u00c1\u00c9\u00cc\u00d0\u00d6\u00d8\u00dd\u00e4\u00e7\u00ee",
    "\u00f5\u00f9\u0101\u0106\u010d\u0113\u0116\u011a\u0120\u0129\u012d\u0133",
    "\u0137"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'references'", "'refs'", "'reply'", "'fail'", 
                     "'substitute'", "';'", "'++'", "'--'", "'while'", "'is'", 
                     "'='", "'+='", "'-='", "'*='", "'/='", "'%='", "'if'", 
                     "'else'", "'('", "')'", "'*'", "'#'", "'not'", "'bytes'", 
                     "'/'", "'%'", "'+'", "'-'", "'<'", "'>'", "'<='", "'>='", 
                     "'=='", "'!='", "'and'", "'or'", "'in'", "'><'", "'['", 
                     "'cut'", "']'", "'..'", "'.'", "','", "'->'", "'catch'", 
                     "'~>'", 'null', 'null', 'null', "'{'", "'}'", "'nil'", 
                     'null', "'=>'", "':'" ];

var symbolicNames = [ 'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', "WS", 
                      "LINE_COMMENT", "COMMENT", "BEGIN", "END", "NIL", 
                      "BOOL", "PAIR_SEP", "FIELD_SEP", "NUMBER", "ID", "STRING", 
                      "INTER_BEGIN", "INTER_MID", "INTER_END", "MODREF" ];

var ruleNames =  [ "module", "references", "statementList", "statement", 
                   "definition", "assignment_op", "conditional", "block", 
                   "expr", "replyHandler", "failHandler", "interpolated", 
                   "exprList", "literal", "paramList", "fieldList", "pairList" ];

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
exaParser.PAIR_SEP = 55;
exaParser.FIELD_SEP = 56;
exaParser.NUMBER = 57;
exaParser.ID = 58;
exaParser.STRING = 59;
exaParser.INTER_BEGIN = 60;
exaParser.INTER_MID = 61;
exaParser.INTER_END = 62;
exaParser.MODREF = 63;

exaParser.RULE_module = 0;
exaParser.RULE_references = 1;
exaParser.RULE_statementList = 2;
exaParser.RULE_statement = 3;
exaParser.RULE_definition = 4;
exaParser.RULE_assignment_op = 5;
exaParser.RULE_conditional = 6;
exaParser.RULE_block = 7;
exaParser.RULE_expr = 8;
exaParser.RULE_replyHandler = 9;
exaParser.RULE_failHandler = 10;
exaParser.RULE_interpolated = 11;
exaParser.RULE_exprList = 12;
exaParser.RULE_literal = 13;
exaParser.RULE_paramList = 14;
exaParser.RULE_fieldList = 15;
exaParser.RULE_pairList = 16;

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
        this.state = 35;
        _la = this._input.LA(1);
        if(_la===exaParser.T__0 || _la===exaParser.T__1) {
            this.state = 34;
            this.references();
        }

        this.state = 38; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 37;
            this.definition();
            this.state = 40; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===exaParser.ID);
        this.state = 42;
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
        this.state = 44;
        _la = this._input.LA(1);
        if(!(_la===exaParser.T__0 || _la===exaParser.T__1)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
        this.state = 45;
        this.match(exaParser.FIELD_SEP);
        this.state = 48; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 46;
        		this.match(exaParser.ID);
        		this.state = 47;
        		this.match(exaParser.MODREF);
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 50; 
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
        this.state = 56;
        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 52;
            this.statement();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 53;
            this.statement();
            this.state = 54;
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
        this.state = 81;
        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
        switch(la_) {
        case 1:
            localctx = new DefStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 58;
            this.definition();
            break;

        case 2:
            localctx = new ResponseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 59;
            localctx.channel = this._input.LT(1);
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__2) | (1 << exaParser.T__3) | (1 << exaParser.T__4))) !== 0))) {
                localctx.channel = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 61;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & ((1 << (exaParser.T__38 - 39)) | (1 << (exaParser.T__44 - 39)) | (1 << (exaParser.BEGIN - 39)) | (1 << (exaParser.NIL - 39)) | (1 << (exaParser.BOOL - 39)) | (1 << (exaParser.NUMBER - 39)) | (1 << (exaParser.ID - 39)) | (1 << (exaParser.STRING - 39)) | (1 << (exaParser.INTER_BEGIN - 39)))) !== 0)) {
                this.state = 60;
                this.exprList();
            }

            this.state = 63;
            this.match(exaParser.T__5);
            break;

        case 3:
            localctx = new AssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 64;
            this.expr(0);
            this.state = 65;
            this.assignment_op();
            this.state = 66;
            this.expr(0);
            this.state = 67;
            this.match(exaParser.T__5);
            break;

        case 4:
            localctx = new IncDecContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 69;
            this.expr(0);
            this.state = 70;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===exaParser.T__6 || _la===exaParser.T__7)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 71;
            this.match(exaParser.T__5);
            break;

        case 5:
            localctx = new CondStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 73;
            this.conditional();
            break;

        case 6:
            localctx = new IterationContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 74;
            this.match(exaParser.T__8);
            this.state = 75;
            this.expr(0);
            this.state = 76;
            this.block();
            break;

        case 7:
            localctx = new ExprStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 78;
            this.expr(0);
            this.state = 79;
            this.match(exaParser.T__5);
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
    this.enterRule(localctx, 8, exaParser.RULE_definition);
    try {
        localctx = new ConstantContext(this, localctx);
        this.enterOuterAlt(localctx, 1);
        this.state = 83;
        this.match(exaParser.ID);
        this.state = 84;
        this.match(exaParser.T__9);
        this.state = 85;
        this.literal();
        this.state = 86;
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
    this.enterRule(localctx, 10, exaParser.RULE_assignment_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 88;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__10) | (1 << exaParser.T__11) | (1 << exaParser.T__12) | (1 << exaParser.T__13) | (1 << exaParser.T__14) | (1 << exaParser.T__15))) !== 0))) {
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
    this.enterRule(localctx, 12, exaParser.RULE_conditional);
    try {
        this.state = 106;
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            localctx = new IfOnlyContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 90;
            this.match(exaParser.T__16);
            this.state = 91;
            this.expr(0);
            this.state = 92;
            this.block();
            break;

        case 2:
            localctx = new IfElseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 94;
            this.match(exaParser.T__16);
            this.state = 95;
            this.expr(0);
            this.state = 96;
            this.block();
            this.state = 97;
            this.match(exaParser.T__17);
            this.state = 98;
            this.block();
            break;

        case 3:
            localctx = new NestedIfContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 100;
            this.match(exaParser.T__16);
            this.state = 101;
            this.expr(0);
            this.state = 102;
            this.block();
            this.state = 103;
            this.match(exaParser.T__17);
            this.state = 104;
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
    this.enterRule(localctx, 14, exaParser.RULE_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 108;
        this.match(exaParser.BEGIN);
        this.state = 110;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__2) | (1 << exaParser.T__3) | (1 << exaParser.T__4) | (1 << exaParser.T__8) | (1 << exaParser.T__16) | (1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & ((1 << (exaParser.T__38 - 39)) | (1 << (exaParser.T__44 - 39)) | (1 << (exaParser.BEGIN - 39)) | (1 << (exaParser.NIL - 39)) | (1 << (exaParser.BOOL - 39)) | (1 << (exaParser.NUMBER - 39)) | (1 << (exaParser.ID - 39)) | (1 << (exaParser.STRING - 39)) | (1 << (exaParser.INTER_BEGIN - 39)))) !== 0)) {
            this.state = 109;
            this.statementList();
        }

        this.state = 112;
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


function SubscriptContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.cut = null; // Token;
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


function RangeContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.cut = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

RangeContext.prototype = Object.create(ExprContext.prototype);
RangeContext.prototype.constructor = RangeContext;

exaParser.RangeContext = RangeContext;

RangeContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
RangeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitRange(this);
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

CallContext.prototype.replyHandler = function() {
    return this.getTypedRuleContext(ReplyHandlerContext,0);
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
    var _startState = 16;
    this.enterRecursionRule(localctx, 16, exaParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 156;
        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
        switch(la_) {
        case 1:
            localctx = new MeasureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 115;
            this.match(exaParser.T__21);
            this.state = 116;
            this.expr(18);
            break;

        case 2:
            localctx = new NegationContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 117;
            this.match(exaParser.T__22);
            this.state = 118;
            this.expr(17);
            break;

        case 3:
            localctx = new BytesContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 119;
            this.match(exaParser.T__23);
            this.state = 120;
            this.expr(16);
            break;

        case 4:
            localctx = new DispatchContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 121;
            this.match(exaParser.T__20);
            this.state = 122;
            this.expr(0);
            this.state = 123;
            this.match(exaParser.T__18);
            this.state = 125;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & ((1 << (exaParser.T__38 - 39)) | (1 << (exaParser.T__44 - 39)) | (1 << (exaParser.BEGIN - 39)) | (1 << (exaParser.NIL - 39)) | (1 << (exaParser.BOOL - 39)) | (1 << (exaParser.NUMBER - 39)) | (1 << (exaParser.ID - 39)) | (1 << (exaParser.STRING - 39)) | (1 << (exaParser.INTER_BEGIN - 39)))) !== 0)) {
                this.state = 124;
                this.exprList();
            }

            this.state = 127;
            this.match(exaParser.T__19);
            this.state = 129;
            var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
            if(la_===1) {
                this.state = 128;
                this.replyHandler();

            }
            this.state = 132;
            var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
            if(la_===1) {
                this.state = 131;
                this.failHandler();

            }
            break;

        case 5:
            localctx = new WrapContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 134;
            this.match(exaParser.T__18);
            this.state = 135;
            this.expr(0);
            this.state = 136;
            this.match(exaParser.T__19);
            break;

        case 6:
            localctx = new DestructureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 138;
            this.match(exaParser.T__18);
            this.state = 139;
            this.match(exaParser.ID);
            this.state = 142; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 140;
                this.match(exaParser.T__43);
                this.state = 141;
                this.match(exaParser.ID);
                this.state = 144; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===exaParser.T__43);
            this.state = 146;
            this.match(exaParser.T__19);
            break;

        case 7:
            localctx = new DynastringContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 147;
            this.match(exaParser.INTER_BEGIN);
            this.state = 148;
            this.interpolated();
            this.state = 149;
            this.match(exaParser.INTER_END);
            break;

        case 8:
            localctx = new LitExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 151;
            this.literal();
            break;

        case 9:
            localctx = new ExternalIdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 152;
            this.match(exaParser.ID);
            this.state = 153;
            this.match(exaParser.FIELD_SEP);
            this.state = 154;
            this.match(exaParser.ID);
            break;

        case 10:
            localctx = new IdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 155;
            this.match(exaParser.ID);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 214;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 212;
                var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 158;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 159;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__20) | (1 << exaParser.T__24) | (1 << exaParser.T__25))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 160;
                    this.expr(16);
                    break;

                case 2:
                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 161;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 162;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__26 || _la===exaParser.T__27)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 163;
                    this.expr(15);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 164;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 165;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 29)) & ~0x1f) == 0 && ((1 << (_la - 29)) & ((1 << (exaParser.T__28 - 29)) | (1 << (exaParser.T__29 - 29)) | (1 << (exaParser.T__30 - 29)) | (1 << (exaParser.T__31 - 29)) | (1 << (exaParser.T__32 - 29)) | (1 << (exaParser.T__33 - 29)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 166;
                    this.expr(14);
                    break;

                case 4:
                    localctx = new LogicalContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 167;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 168;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__34 || _la===exaParser.T__35)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 169;
                    this.expr(13);
                    break;

                case 5:
                    localctx = new MembershipContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 170;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 171;
                    this.match(exaParser.T__36);
                    this.state = 172;
                    this.expr(12);
                    break;

                case 6:
                    localctx = new ConcatContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 173;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 174;
                    this.match(exaParser.T__37);
                    this.state = 175;
                    this.expr(11);
                    break;

                case 7:
                    localctx = new CallContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 176;
                    if (!( this.precpred(this._ctx, 20))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
                    }
                    this.state = 177;
                    this.match(exaParser.T__18);
                    this.state = 179;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & ((1 << (exaParser.T__38 - 39)) | (1 << (exaParser.T__44 - 39)) | (1 << (exaParser.BEGIN - 39)) | (1 << (exaParser.NIL - 39)) | (1 << (exaParser.BOOL - 39)) | (1 << (exaParser.NUMBER - 39)) | (1 << (exaParser.ID - 39)) | (1 << (exaParser.STRING - 39)) | (1 << (exaParser.INTER_BEGIN - 39)))) !== 0)) {
                        this.state = 178;
                        this.exprList();
                    }

                    this.state = 181;
                    this.match(exaParser.T__19);
                    this.state = 183;
                    var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
                    if(la_===1) {
                        this.state = 182;
                        this.replyHandler();

                    }
                    this.state = 186;
                    var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
                    if(la_===1) {
                        this.state = 185;
                        this.failHandler();

                    }
                    break;

                case 8:
                    localctx = new SubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 188;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 189;
                    this.match(exaParser.T__38);
                    this.state = 191;
                    _la = this._input.LA(1);
                    if(_la===exaParser.T__39) {
                        this.state = 190;
                        localctx.cut = this.match(exaParser.T__39);
                    }

                    this.state = 193;
                    this.expr(0);
                    this.state = 194;
                    this.match(exaParser.T__40);
                    break;

                case 9:
                    localctx = new RangeContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 196;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 197;
                    this.match(exaParser.T__38);
                    this.state = 199;
                    _la = this._input.LA(1);
                    if(_la===exaParser.T__39) {
                        this.state = 198;
                        localctx.cut = this.match(exaParser.T__39);
                    }

                    this.state = 202;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & ((1 << (exaParser.T__38 - 39)) | (1 << (exaParser.T__44 - 39)) | (1 << (exaParser.BEGIN - 39)) | (1 << (exaParser.NIL - 39)) | (1 << (exaParser.BOOL - 39)) | (1 << (exaParser.NUMBER - 39)) | (1 << (exaParser.ID - 39)) | (1 << (exaParser.STRING - 39)) | (1 << (exaParser.INTER_BEGIN - 39)))) !== 0)) {
                        this.state = 201;
                        this.expr(0);
                    }

                    this.state = 204;
                    this.match(exaParser.T__41);
                    this.state = 206;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & ((1 << (exaParser.T__38 - 39)) | (1 << (exaParser.T__44 - 39)) | (1 << (exaParser.BEGIN - 39)) | (1 << (exaParser.NIL - 39)) | (1 << (exaParser.BOOL - 39)) | (1 << (exaParser.NUMBER - 39)) | (1 << (exaParser.ID - 39)) | (1 << (exaParser.STRING - 39)) | (1 << (exaParser.INTER_BEGIN - 39)))) !== 0)) {
                        this.state = 205;
                        this.expr(0);
                    }

                    this.state = 208;
                    this.match(exaParser.T__40);
                    break;

                case 10:
                    localctx = new FieldContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 209;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 210;
                    this.match(exaParser.T__42);
                    this.state = 211;
                    this.match(exaParser.ID);
                    break;

                } 
            }
            this.state = 216;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,21,this._ctx);
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

ReplyHandlerContext.prototype.paramList = function() {
    return this.getTypedRuleContext(ParamListContext,0);
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
    this.enterRule(localctx, 18, exaParser.RULE_replyHandler);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 217;
        this.match(exaParser.T__44);
        this.state = 219;
        _la = this._input.LA(1);
        if(_la===exaParser.T__18) {
            this.state = 218;
            this.paramList();
        }

        this.state = 221;
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

FailHandlerContext.prototype.paramList = function() {
    return this.getTypedRuleContext(ParamListContext,0);
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
    this.enterRule(localctx, 20, exaParser.RULE_failHandler);
    var _la = 0; // Token type
    try {
        this.state = 229;
        switch(this._input.LA(1)) {
        case exaParser.T__45:
            this.enterOuterAlt(localctx, 1);
            this.state = 223;
            this.match(exaParser.T__45);
            break;
        case exaParser.T__46:
            this.enterOuterAlt(localctx, 2);
            this.state = 224;
            this.match(exaParser.T__46);
            this.state = 226;
            _la = this._input.LA(1);
            if(_la===exaParser.T__18) {
                this.state = 225;
                this.paramList();
            }

            this.state = 228;
            this.block();
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
    this.enterRule(localctx, 22, exaParser.RULE_interpolated);
    try {
        this.state = 236;
        var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 231;
            this.expr(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 232;
            this.expr(0);
            this.state = 233;
            this.match(exaParser.INTER_MID);
            this.state = 234;
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
    this.enterRule(localctx, 24, exaParser.RULE_exprList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 238;
        this.expr(0);
        this.state = 243;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,26,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 239;
                this.match(exaParser.T__43);
                this.state = 240;
                this.expr(0); 
            }
            this.state = 245;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,26,this._ctx);
        }

        this.state = 247;
        _la = this._input.LA(1);
        if(_la===exaParser.T__43) {
            this.state = 246;
            this.match(exaParser.T__43);
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

ServiceContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

ServiceContext.prototype.paramList = function() {
    return this.getTypedRuleContext(ParamListContext,0);
};
ServiceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitService(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FrameContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FrameContext.prototype = Object.create(LiteralContext.prototype);
FrameContext.prototype.constructor = FrameContext;

exaParser.FrameContext = FrameContext;

FrameContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};

FrameContext.prototype.fieldList = function() {
    return this.getTypedRuleContext(FieldListContext,0);
};
FrameContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitFrame(this);
    } else {
        return visitor.visitChildren(this);
    }
};



exaParser.LiteralContext = LiteralContext;

exaParser.prototype.literal = function() {

    var localctx = new LiteralContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, exaParser.RULE_literal);
    var _la = 0; // Token type
    try {
        this.state = 276;
        switch(this._input.LA(1)) {
        case exaParser.NIL:
            localctx = new NilContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 249;
            this.match(exaParser.NIL);
            break;
        case exaParser.BOOL:
            localctx = new BoolContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 250;
            this.match(exaParser.BOOL);
            break;
        case exaParser.NUMBER:
            localctx = new NumberContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 251;
            this.match(exaParser.NUMBER);
            break;
        case exaParser.STRING:
            localctx = new StringContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 252;
            this.match(exaParser.STRING);
            break;
        case exaParser.T__44:
            localctx = new ServiceContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 253;
            this.match(exaParser.T__44);
            this.state = 255;
            _la = this._input.LA(1);
            if(_la===exaParser.T__18) {
                this.state = 254;
                this.paramList();
            }

            this.state = 257;
            this.block();
            break;
        case exaParser.T__38:
            localctx = new ArrayContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 258;
            this.match(exaParser.T__38);
            this.state = 260;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & ((1 << (exaParser.T__38 - 39)) | (1 << (exaParser.T__44 - 39)) | (1 << (exaParser.BEGIN - 39)) | (1 << (exaParser.NIL - 39)) | (1 << (exaParser.BOOL - 39)) | (1 << (exaParser.NUMBER - 39)) | (1 << (exaParser.ID - 39)) | (1 << (exaParser.STRING - 39)) | (1 << (exaParser.INTER_BEGIN - 39)))) !== 0)) {
                this.state = 259;
                this.exprList();
            }

            this.state = 262;
            this.match(exaParser.T__40);
            break;
        case exaParser.BEGIN:
            localctx = new SetContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 263;
            this.match(exaParser.BEGIN);
            this.state = 267;
            var la_ = this._interp.adaptivePredict(this._input,30,this._ctx);
            if(la_===1) {
                this.state = 264;
                localctx.sep = this.match(exaParser.PAIR_SEP);

            } else if(la_===2) {
                this.state = 265;
                this.exprList();

            } else if(la_===3) {
                this.state = 266;
                this.pairList();

            }
            this.state = 269;
            this.match(exaParser.END);
            break;
        case exaParser.T__18:
            localctx = new FrameContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 270;
            this.match(exaParser.T__18);
            this.state = 273;
            var la_ = this._interp.adaptivePredict(this._input,31,this._ctx);
            if(la_===1) {
                this.state = 271;
                this.exprList();

            } else if(la_===2) {
                this.state = 272;
                this.fieldList();

            }
            this.state = 275;
            this.match(exaParser.T__19);
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
    this.enterRule(localctx, 28, exaParser.RULE_paramList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 278;
        this.match(exaParser.T__18);
        this.state = 280;
        _la = this._input.LA(1);
        if(_la===exaParser.ID) {
            this.state = 279;
            this.match(exaParser.ID);
        }

        this.state = 286;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===exaParser.T__43) {
            this.state = 282;
            this.match(exaParser.T__43);
            this.state = 283;
            this.match(exaParser.ID);
            this.state = 288;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 289;
        this.match(exaParser.T__19);
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
    this.enterRule(localctx, 30, exaParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 297; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 291;
            this.match(exaParser.ID);
            this.state = 292;
            this.match(exaParser.FIELD_SEP);
            this.state = 293;
            this.expr(0);
            this.state = 295;
            _la = this._input.LA(1);
            if(_la===exaParser.T__43) {
                this.state = 294;
                this.match(exaParser.T__43);
            }

            this.state = 299; 
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
    this.enterRule(localctx, 32, exaParser.RULE_pairList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 307; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 301;
            this.expr(0);
            this.state = 302;
            this.match(exaParser.PAIR_SEP);
            this.state = 303;
            this.expr(0);
            this.state = 305;
            _la = this._input.LA(1);
            if(_la===exaParser.T__43) {
                this.state = 304;
                this.match(exaParser.T__43);
            }

            this.state = 309; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 39)) & ~0x1f) == 0 && ((1 << (_la - 39)) & ((1 << (exaParser.T__38 - 39)) | (1 << (exaParser.T__44 - 39)) | (1 << (exaParser.BEGIN - 39)) | (1 << (exaParser.NIL - 39)) | (1 << (exaParser.BOOL - 39)) | (1 << (exaParser.NUMBER - 39)) | (1 << (exaParser.ID - 39)) | (1 << (exaParser.STRING - 39)) | (1 << (exaParser.INTER_BEGIN - 39)))) !== 0));
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
	case 8:
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
			return this.precpred(this._ctx, 10);
		case 6:
			return this.precpred(this._ctx, 20);
		case 7:
			return this.precpred(this._ctx, 8);
		case 8:
			return this.precpred(this._ctx, 7);
		case 9:
			return this.precpred(this._ctx, 6);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.exaParser = exaParser;
