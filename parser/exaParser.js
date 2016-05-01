// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var exaVisitor = require('./exaVisitor').exaVisitor;

var grammarFileName = "exa.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003B\u013f\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0003\u0002\u0005",
    "\u0002(\n\u0002\u0003\u0002\u0006\u0002+\n\u0002\r\u0002\u000e\u0002",
    ",\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0006\u00035\n\u0003\r\u0003\u000e\u00036\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0005\u0004=\n\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0005\u0005B\n\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005V\n\u0005\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\bo",
    "\n\b\u0003\t\u0003\t\u0005\ts\n\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005",
    "\n\u0082\n\n\u0003\n\u0003\n\u0005\n\u0086\n\n\u0003\n\u0005\n\u0089",
    "\n\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n",
    "\u0006\n\u0093\n\n\r\n\u000e\n\u0094\u0003\n\u0003\n\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u00a1\n\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0005\n\u00b8\n\n\u0003\n\u0003\n\u0005\n\u00bc\n",
    "\n\u0003\n\u0005\n\u00bf\n\n\u0003\n\u0003\n\u0003\n\u0005\n\u00c4\n",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u00cc\n\n",
    "\u0003\n\u0005\n\u00cf\n\n\u0003\n\u0003\n\u0005\n\u00d3\n\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0007\n\u00d9\n\n\f\n\u000e\n\u00dc\u000b\n",
    "\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0005\r\u00e8\n\r\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0007\u000e\u00ed\n\u000e\f\u000e\u000e\u000e\u00f0\u000b\u000e\u0003",
    "\u000e\u0005\u000e\u00f3\n\u000e\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u00fb\n\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u0106\n\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f",
    "\u010e\n\u000f\u0003\u0010\u0003\u0010\u0005\u0010\u0112\n\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0007\u0010\u0119",
    "\n\u0010\f\u0010\u000e\u0010\u011c\u000b\u0010\u0005\u0010\u011e\n\u0010",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0007\u0011\u0124\n",
    "\u0011\f\u0011\u000e\u0011\u0127\u000b\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0005\u0012\u012f\n",
    "\u0012\u0006\u0012\u0131\n\u0012\r\u0012\u000e\u0012\u0132\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u0139\n\u0013\u0006",
    "\u0013\u013b\n\u0013\r\u0013\u000e\u0013\u013c\u0003\u0013\u0002\u0003",
    "\u0012\u0014\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018",
    "\u001a\u001c\u001e \"$\u0002\n\u0003\u0002\u0003\u0004\u0003\u0002\u0005",
    "\u0007\u0003\u0002\t\n\u0003\u0002\r\u0012\u0003\u0002\u001b\u001d\u0003",
    "\u0002\u001e\u001f\u0003\u0002 %\u0003\u0002&\'\u016f\u0002\'\u0003",
    "\u0002\u0002\u0002\u00040\u0003\u0002\u0002\u0002\u0006<\u0003\u0002",
    "\u0002\u0002\bU\u0003\u0002\u0002\u0002\nW\u0003\u0002\u0002\u0002\f",
    "\\\u0003\u0002\u0002\u0002\u000en\u0003\u0002\u0002\u0002\u0010p\u0003",
    "\u0002\u0002\u0002\u0012\u00a0\u0003\u0002\u0002\u0002\u0014\u00dd\u0003",
    "\u0002\u0002\u0002\u0016\u00df\u0003\u0002\u0002\u0002\u0018\u00e7\u0003",
    "\u0002\u0002\u0002\u001a\u00e9\u0003\u0002\u0002\u0002\u001c\u010d\u0003",
    "\u0002\u0002\u0002\u001e\u011d\u0003\u0002\u0002\u0002 \u011f\u0003",
    "\u0002\u0002\u0002\"\u0130\u0003\u0002\u0002\u0002$\u013a\u0003\u0002",
    "\u0002\u0002&(\u0005\u0004\u0003\u0002\'&\u0003\u0002\u0002\u0002\'",
    "(\u0003\u0002\u0002\u0002(*\u0003\u0002\u0002\u0002)+\u0005\n\u0006",
    "\u0002*)\u0003\u0002\u0002\u0002+,\u0003\u0002\u0002\u0002,*\u0003\u0002",
    "\u0002\u0002,-\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002\u0002./\u0007",
    "\u0002\u0002\u0003/\u0003\u0003\u0002\u0002\u000201\t\u0002\u0002\u0002",
    "14\u0007;\u0002\u000223\u0007=\u0002\u000235\u0007B\u0002\u000242\u0003",
    "\u0002\u0002\u000256\u0003\u0002\u0002\u000264\u0003\u0002\u0002\u0002",
    "67\u0003\u0002\u0002\u00027\u0005\u0003\u0002\u0002\u00028=\u0005\b",
    "\u0005\u00029:\u0005\b\u0005\u0002:;\u0005\u0006\u0004\u0002;=\u0003",
    "\u0002\u0002\u0002<8\u0003\u0002\u0002\u0002<9\u0003\u0002\u0002\u0002",
    "=\u0007\u0003\u0002\u0002\u0002>V\u0005\n\u0006\u0002?A\t\u0003\u0002",
    "\u0002@B\u0005\u001a\u000e\u0002A@\u0003\u0002\u0002\u0002AB\u0003\u0002",
    "\u0002\u0002BC\u0003\u0002\u0002\u0002CV\u0007\b\u0002\u0002DE\u0005",
    "\u0012\n\u0002EF\u0005\f\u0007\u0002FG\u0005\u0012\n\u0002GH\u0007\b",
    "\u0002\u0002HV\u0003\u0002\u0002\u0002IJ\u0005\u0012\n\u0002JK\t\u0004",
    "\u0002\u0002KL\u0007\b\u0002\u0002LV\u0003\u0002\u0002\u0002MV\u0005",
    "\u000e\b\u0002NO\u0007\u000b\u0002\u0002OP\u0005\u0012\n\u0002PQ\u0005",
    "\u0010\t\u0002QV\u0003\u0002\u0002\u0002RS\u0005\u0012\n\u0002ST\u0007",
    "\b\u0002\u0002TV\u0003\u0002\u0002\u0002U>\u0003\u0002\u0002\u0002U",
    "?\u0003\u0002\u0002\u0002UD\u0003\u0002\u0002\u0002UI\u0003\u0002\u0002",
    "\u0002UM\u0003\u0002\u0002\u0002UN\u0003\u0002\u0002\u0002UR\u0003\u0002",
    "\u0002\u0002V\t\u0003\u0002\u0002\u0002WX\u0007=\u0002\u0002XY\u0007",
    "\f\u0002\u0002YZ\u0005\u001c\u000f\u0002Z[\u0007\b\u0002\u0002[\u000b",
    "\u0003\u0002\u0002\u0002\\]\t\u0005\u0002\u0002]\r\u0003\u0002\u0002",
    "\u0002^_\u0007\u0013\u0002\u0002_`\u0005\u0012\n\u0002`a\u0005\u0010",
    "\t\u0002ao\u0003\u0002\u0002\u0002bc\u0007\u0013\u0002\u0002cd\u0005",
    "\u0012\n\u0002de\u0005\u0010\t\u0002ef\u0007\u0014\u0002\u0002fg\u0005",
    "\u0010\t\u0002go\u0003\u0002\u0002\u0002hi\u0007\u0013\u0002\u0002i",
    "j\u0005\u0012\n\u0002jk\u0005\u0010\t\u0002kl\u0007\u0014\u0002\u0002",
    "lm\u0005\u000e\b\u0002mo\u0003\u0002\u0002\u0002n^\u0003\u0002\u0002",
    "\u0002nb\u0003\u0002\u0002\u0002nh\u0003\u0002\u0002\u0002o\u000f\u0003",
    "\u0002\u0002\u0002pr\u00076\u0002\u0002qs\u0005\u0006\u0004\u0002rq",
    "\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002st\u0003\u0002\u0002",
    "\u0002tu\u00077\u0002\u0002u\u0011\u0003\u0002\u0002\u0002vw\b\n\u0001",
    "\u0002wx\u0007\u0018\u0002\u0002x\u00a1\u0005\u0012\n\u0014yz\u0007",
    "\u0019\u0002\u0002z\u00a1\u0005\u0012\n\u0013{|\u0007\u001a\u0002\u0002",
    "|\u00a1\u0005\u0012\n\u0012}~\u0007\u0017\u0002\u0002~\u007f\u0005\u0012",
    "\n\u0002\u007f\u0081\u0007\u0015\u0002\u0002\u0080\u0082\u0005\u001a",
    "\u000e\u0002\u0081\u0080\u0003\u0002\u0002\u0002\u0081\u0082\u0003\u0002",
    "\u0002\u0002\u0082\u0083\u0003\u0002\u0002\u0002\u0083\u0085\u0007\u0016",
    "\u0002\u0002\u0084\u0086\u0005\u0014\u000b\u0002\u0085\u0084\u0003\u0002",
    "\u0002\u0002\u0085\u0086\u0003\u0002\u0002\u0002\u0086\u0088\u0003\u0002",
    "\u0002\u0002\u0087\u0089\u0005\u0016\f\u0002\u0088\u0087\u0003\u0002",
    "\u0002\u0002\u0088\u0089\u0003\u0002\u0002\u0002\u0089\u00a1\u0003\u0002",
    "\u0002\u0002\u008a\u008b\u0007\u0015\u0002\u0002\u008b\u008c\u0005\u0012",
    "\n\u0002\u008c\u008d\u0007\u0016\u0002\u0002\u008d\u00a1\u0003\u0002",
    "\u0002\u0002\u008e\u008f\u0007\u0015\u0002\u0002\u008f\u0092\u0007=",
    "\u0002\u0002\u0090\u0091\u0007/\u0002\u0002\u0091\u0093\u0007=\u0002",
    "\u0002\u0092\u0090\u0003\u0002\u0002\u0002\u0093\u0094\u0003\u0002\u0002",
    "\u0002\u0094\u0092\u0003\u0002\u0002\u0002\u0094\u0095\u0003\u0002\u0002",
    "\u0002\u0095\u0096\u0003\u0002\u0002\u0002\u0096\u00a1\u0007\u0016\u0002",
    "\u0002\u0097\u0098\u0007?\u0002\u0002\u0098\u0099\u0005\u0018\r\u0002",
    "\u0099\u009a\u0007A\u0002\u0002\u009a\u00a1\u0003\u0002\u0002\u0002",
    "\u009b\u00a1\u0005\u001c\u000f\u0002\u009c\u009d\u0007=\u0002\u0002",
    "\u009d\u009e\u0007;\u0002\u0002\u009e\u00a1\u0007=\u0002\u0002\u009f",
    "\u00a1\u0007=\u0002\u0002\u00a0v\u0003\u0002\u0002\u0002\u00a0y\u0003",
    "\u0002\u0002\u0002\u00a0{\u0003\u0002\u0002\u0002\u00a0}\u0003\u0002",
    "\u0002\u0002\u00a0\u008a\u0003\u0002\u0002\u0002\u00a0\u008e\u0003\u0002",
    "\u0002\u0002\u00a0\u0097\u0003\u0002\u0002\u0002\u00a0\u009b\u0003\u0002",
    "\u0002\u0002\u00a0\u009c\u0003\u0002\u0002\u0002\u00a0\u009f\u0003\u0002",
    "\u0002\u0002\u00a1\u00da\u0003\u0002\u0002\u0002\u00a2\u00a3\f\u0011",
    "\u0002\u0002\u00a3\u00a4\t\u0006\u0002\u0002\u00a4\u00d9\u0005\u0012",
    "\n\u0012\u00a5\u00a6\f\u0010\u0002\u0002\u00a6\u00a7\t\u0007\u0002\u0002",
    "\u00a7\u00d9\u0005\u0012\n\u0011\u00a8\u00a9\f\u000f\u0002\u0002\u00a9",
    "\u00aa\t\b\u0002\u0002\u00aa\u00d9\u0005\u0012\n\u0010\u00ab\u00ac\f",
    "\u000e\u0002\u0002\u00ac\u00ad\t\t\u0002\u0002\u00ad\u00d9\u0005\u0012",
    "\n\u000f\u00ae\u00af\f\r\u0002\u0002\u00af\u00b0\u0007(\u0002\u0002",
    "\u00b0\u00d9\u0005\u0012\n\u000e\u00b1\u00b2\f\f\u0002\u0002\u00b2\u00b3",
    "\u0007)\u0002\u0002\u00b3\u00d9\u0005\u0012\n\r\u00b4\u00b5\f\u0016",
    "\u0002\u0002\u00b5\u00b7\u0007\u0015\u0002\u0002\u00b6\u00b8\u0005\u001a",
    "\u000e\u0002\u00b7\u00b6\u0003\u0002\u0002\u0002\u00b7\u00b8\u0003\u0002",
    "\u0002\u0002\u00b8\u00b9\u0003\u0002\u0002\u0002\u00b9\u00bb\u0007\u0016",
    "\u0002\u0002\u00ba\u00bc\u0005\u0014\u000b\u0002\u00bb\u00ba\u0003\u0002",
    "\u0002\u0002\u00bb\u00bc\u0003\u0002\u0002\u0002\u00bc\u00be\u0003\u0002",
    "\u0002\u0002\u00bd\u00bf\u0005\u0016\f\u0002\u00be\u00bd\u0003\u0002",
    "\u0002\u0002\u00be\u00bf\u0003\u0002\u0002\u0002\u00bf\u00d9\u0003\u0002",
    "\u0002\u0002\u00c0\u00c1\f\n\u0002\u0002\u00c1\u00c3\u0007*\u0002\u0002",
    "\u00c2\u00c4\u0007+\u0002\u0002\u00c3\u00c2\u0003\u0002\u0002\u0002",
    "\u00c3\u00c4\u0003\u0002\u0002\u0002\u00c4\u00c5\u0003\u0002\u0002\u0002",
    "\u00c5\u00c6\u0005\u0012\n\u0002\u00c6\u00c7\u0007,\u0002\u0002\u00c7",
    "\u00d9\u0003\u0002\u0002\u0002\u00c8\u00c9\f\t\u0002\u0002\u00c9\u00cb",
    "\u0007*\u0002\u0002\u00ca\u00cc\u0007+\u0002\u0002\u00cb\u00ca\u0003",
    "\u0002\u0002\u0002\u00cb\u00cc\u0003\u0002\u0002\u0002\u00cc\u00ce\u0003",
    "\u0002\u0002\u0002\u00cd\u00cf\u0005\u0012\n\u0002\u00ce\u00cd\u0003",
    "\u0002\u0002\u0002\u00ce\u00cf\u0003\u0002\u0002\u0002\u00cf\u00d0\u0003",
    "\u0002\u0002\u0002\u00d0\u00d2\u0007-\u0002\u0002\u00d1\u00d3\u0005",
    "\u0012\n\u0002\u00d2\u00d1\u0003\u0002\u0002\u0002\u00d2\u00d3\u0003",
    "\u0002\u0002\u0002\u00d3\u00d4\u0003\u0002\u0002\u0002\u00d4\u00d9\u0007",
    ",\u0002\u0002\u00d5\u00d6\f\b\u0002\u0002\u00d6\u00d7\u0007.\u0002\u0002",
    "\u00d7\u00d9\u0007=\u0002\u0002\u00d8\u00a2\u0003\u0002\u0002\u0002",
    "\u00d8\u00a5\u0003\u0002\u0002\u0002\u00d8\u00a8\u0003\u0002\u0002\u0002",
    "\u00d8\u00ab\u0003\u0002\u0002\u0002\u00d8\u00ae\u0003\u0002\u0002\u0002",
    "\u00d8\u00b1\u0003\u0002\u0002\u0002\u00d8\u00b4\u0003\u0002\u0002\u0002",
    "\u00d8\u00c0\u0003\u0002\u0002\u0002\u00d8\u00c8\u0003\u0002\u0002\u0002",
    "\u00d8\u00d5\u0003\u0002\u0002\u0002\u00d9\u00dc\u0003\u0002\u0002\u0002",
    "\u00da\u00d8\u0003\u0002\u0002\u0002\u00da\u00db\u0003\u0002\u0002\u0002",
    "\u00db\u0013\u0003\u0002\u0002\u0002\u00dc\u00da\u0003\u0002\u0002\u0002",
    "\u00dd\u00de\u0005\u001e\u0010\u0002\u00de\u0015\u0003\u0002\u0002\u0002",
    "\u00df\u00e0\u00070\u0002\u0002\u00e0\u00e1\u0005\u001e\u0010\u0002",
    "\u00e1\u0017\u0003\u0002\u0002\u0002\u00e2\u00e8\u0005\u0012\n\u0002",
    "\u00e3\u00e4\u0005\u0012\n\u0002\u00e4\u00e5\u0007@\u0002\u0002\u00e5",
    "\u00e6\u0005\u0018\r\u0002\u00e6\u00e8\u0003\u0002\u0002\u0002\u00e7",
    "\u00e2\u0003\u0002\u0002\u0002\u00e7\u00e3\u0003\u0002\u0002\u0002\u00e8",
    "\u0019\u0003\u0002\u0002\u0002\u00e9\u00ee\u0005\u0012\n\u0002\u00ea",
    "\u00eb\u0007/\u0002\u0002\u00eb\u00ed\u0005\u0012\n\u0002\u00ec\u00ea",
    "\u0003\u0002\u0002\u0002\u00ed\u00f0\u0003\u0002\u0002\u0002\u00ee\u00ec",
    "\u0003\u0002\u0002\u0002\u00ee\u00ef\u0003\u0002\u0002\u0002\u00ef\u00f2",
    "\u0003\u0002\u0002\u0002\u00f0\u00ee\u0003\u0002\u0002\u0002\u00f1\u00f3",
    "\u0007/\u0002\u0002\u00f2\u00f1\u0003\u0002\u0002\u0002\u00f2\u00f3",
    "\u0003\u0002\u0002\u0002\u00f3\u001b\u0003\u0002\u0002\u0002\u00f4\u010e",
    "\u00078\u0002\u0002\u00f5\u010e\u00079\u0002\u0002\u00f6\u010e\u0007",
    "<\u0002\u0002\u00f7\u010e\u0007>\u0002\u0002\u00f8\u00fa\u0007*\u0002",
    "\u0002\u00f9\u00fb\u0005\u001a\u000e\u0002\u00fa\u00f9\u0003\u0002\u0002",
    "\u0002\u00fa\u00fb\u0003\u0002\u0002\u0002\u00fb\u00fc\u0003\u0002\u0002",
    "\u0002\u00fc\u010e\u0007,\u0002\u0002\u00fd\u00fe\u0007*\u0002\u0002",
    "\u00fe\u00ff\u0005\"\u0012\u0002\u00ff\u0100\u0007,\u0002\u0002\u0100",
    "\u010e\u0003\u0002\u0002\u0002\u0101\u0105\u00076\u0002\u0002\u0102",
    "\u0106\u0007:\u0002\u0002\u0103\u0106\u0005\u001a\u000e\u0002\u0104",
    "\u0106\u0005$\u0013\u0002\u0105\u0102\u0003\u0002\u0002\u0002\u0105",
    "\u0103\u0003\u0002\u0002\u0002\u0105\u0104\u0003\u0002\u0002\u0002\u0105",
    "\u0106\u0003\u0002\u0002\u0002\u0106\u0107\u0003\u0002\u0002\u0002\u0107",
    "\u010e\u00077\u0002\u0002\u0108\u010e\u0005\u001e\u0010\u0002\u0109",
    "\u010a\u00071\u0002\u0002\u010a\u010b\u0005\u0012\n\u0002\u010b\u010c",
    "\u0005\u001e\u0010\u0002\u010c\u010e\u0003\u0002\u0002\u0002\u010d\u00f4",
    "\u0003\u0002\u0002\u0002\u010d\u00f5\u0003\u0002\u0002\u0002\u010d\u00f6",
    "\u0003\u0002\u0002\u0002\u010d\u00f7\u0003\u0002\u0002\u0002\u010d\u00f8",
    "\u0003\u0002\u0002\u0002\u010d\u00fd\u0003\u0002\u0002\u0002\u010d\u0101",
    "\u0003\u0002\u0002\u0002\u010d\u0108\u0003\u0002\u0002\u0002\u010d\u0109",
    "\u0003\u0002\u0002\u0002\u010e\u001d\u0003\u0002\u0002\u0002\u010f\u0111",
    "\u00072\u0002\u0002\u0110\u0112\u0005 \u0011\u0002\u0111\u0110\u0003",
    "\u0002\u0002\u0002\u0111\u0112\u0003\u0002\u0002\u0002\u0112\u0113\u0003",
    "\u0002\u0002\u0002\u0113\u011e\u0005\u0010\t\u0002\u0114\u0115\u0007",
    "2\u0002\u0002\u0115\u011a\u0007=\u0002\u0002\u0116\u0117\u0007/\u0002",
    "\u0002\u0117\u0119\u0007=\u0002\u0002\u0118\u0116\u0003\u0002\u0002",
    "\u0002\u0119\u011c\u0003\u0002\u0002\u0002\u011a\u0118\u0003\u0002\u0002",
    "\u0002\u011a\u011b\u0003\u0002\u0002\u0002\u011b\u011e\u0003\u0002\u0002",
    "\u0002\u011c\u011a\u0003\u0002\u0002\u0002\u011d\u010f\u0003\u0002\u0002",
    "\u0002\u011d\u0114\u0003\u0002\u0002\u0002\u011e\u001f\u0003\u0002\u0002",
    "\u0002\u011f\u0120\u0007\u0015\u0002\u0002\u0120\u0125\u0007=\u0002",
    "\u0002\u0121\u0122\u0007/\u0002\u0002\u0122\u0124\u0007=\u0002\u0002",
    "\u0123\u0121\u0003\u0002\u0002\u0002\u0124\u0127\u0003\u0002\u0002\u0002",
    "\u0125\u0123\u0003\u0002\u0002\u0002\u0125\u0126\u0003\u0002\u0002\u0002",
    "\u0126\u0128\u0003\u0002\u0002\u0002\u0127\u0125\u0003\u0002\u0002\u0002",
    "\u0128\u0129\u0007\u0016\u0002\u0002\u0129!\u0003\u0002\u0002\u0002",
    "\u012a\u012b\u0007=\u0002\u0002\u012b\u012c\u0007;\u0002\u0002\u012c",
    "\u012e\u0005\u0012\n\u0002\u012d\u012f\u0007/\u0002\u0002\u012e\u012d",
    "\u0003\u0002\u0002\u0002\u012e\u012f\u0003\u0002\u0002\u0002\u012f\u0131",
    "\u0003\u0002\u0002\u0002\u0130\u012a\u0003\u0002\u0002\u0002\u0131\u0132",
    "\u0003\u0002\u0002\u0002\u0132\u0130\u0003\u0002\u0002\u0002\u0132\u0133",
    "\u0003\u0002\u0002\u0002\u0133#\u0003\u0002\u0002\u0002\u0134\u0135",
    "\u0005\u0012\n\u0002\u0135\u0136\u0007:\u0002\u0002\u0136\u0138\u0005",
    "\u0012\n\u0002\u0137\u0139\u0007/\u0002\u0002\u0138\u0137\u0003\u0002",
    "\u0002\u0002\u0138\u0139\u0003\u0002\u0002\u0002\u0139\u013b\u0003\u0002",
    "\u0002\u0002\u013a\u0134\u0003\u0002\u0002\u0002\u013b\u013c\u0003\u0002",
    "\u0002\u0002\u013c\u013a\u0003\u0002\u0002\u0002\u013c\u013d\u0003\u0002",
    "\u0002\u0002\u013d%\u0003\u0002\u0002\u0002&\',6<AUnr\u0081\u0085\u0088",
    "\u0094\u00a0\u00b7\u00bb\u00be\u00c3\u00cb\u00ce\u00d2\u00d8\u00da\u00e7",
    "\u00ee\u00f2\u00fa\u0105\u010d\u0111\u011a\u011d\u0125\u012e\u0132\u0138",
    "\u013c"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'references'", "'refs'", "'reply'", "'fail'", 
                     "'substitute'", "';'", "'++'", "'--'", "'while'", "'is'", 
                     "'='", "'+='", "'-='", "'*='", "'/='", "'%='", "'if'", 
                     "'else'", "'('", "')'", "'@'", "'#'", "'not'", "'bytes'", 
                     "'*'", "'/'", "'%'", "'+'", "'-'", "'<'", "'>'", "'<='", 
                     "'>='", "'=='", "'!='", "'and'", "'or'", "'in'", "'><'", 
                     "'['", "'cut'", "']'", "'..'", "'.'", "','", "'catch'", 
                     "'on'", "'->'", 'null', 'null', 'null', "'{'", "'}'", 
                     "'nil'", 'null', "'=>'", "':'" ];

var symbolicNames = [ 'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      "WS", "LINE_COMMENT", "COMMENT", "BEGIN", "END", "NIL", 
                      "BOOL", "PAIR_SEP", "FIELD_SEP", "NUMBER", "ID", "STRING", 
                      "INTER_BEGIN", "INTER_MID", "INTER_END", "MODREF" ];

var ruleNames =  [ "module", "references", "statementList", "statement", 
                   "definition", "assignment_op", "conditional", "block", 
                   "expr", "replyHandler", "failHandler", "interpolated", 
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
exaParser.RULE_procedure = 14;
exaParser.RULE_paramList = 15;
exaParser.RULE_fieldList = 16;
exaParser.RULE_pairList = 17;

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
        this.state = 37;
        _la = this._input.LA(1);
        if(_la===exaParser.T__0 || _la===exaParser.T__1) {
            this.state = 36;
            this.references();
        }

        this.state = 40; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 39;
            this.definition();
            this.state = 42; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===exaParser.ID);
        this.state = 44;
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
        this.state = 46;
        _la = this._input.LA(1);
        if(!(_la===exaParser.T__0 || _la===exaParser.T__1)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
        this.state = 47;
        this.match(exaParser.FIELD_SEP);
        this.state = 50; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 48;
        		this.match(exaParser.ID);
        		this.state = 49;
        		this.match(exaParser.MODREF);
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 52; 
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
        this.state = 58;
        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 54;
            this.statement();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 55;
            this.statement();
            this.state = 56;
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
        this.state = 83;
        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
        switch(la_) {
        case 1:
            localctx = new DefStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 60;
            this.definition();
            break;

        case 2:
            localctx = new ResponseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 61;
            localctx.channel = this._input.LT(1);
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__2) | (1 << exaParser.T__3) | (1 << exaParser.T__4))) !== 0))) {
                localctx.channel = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 63;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (exaParser.T__39 - 40)) | (1 << (exaParser.T__46 - 40)) | (1 << (exaParser.T__47 - 40)) | (1 << (exaParser.BEGIN - 40)) | (1 << (exaParser.NIL - 40)) | (1 << (exaParser.BOOL - 40)) | (1 << (exaParser.NUMBER - 40)) | (1 << (exaParser.ID - 40)) | (1 << (exaParser.STRING - 40)) | (1 << (exaParser.INTER_BEGIN - 40)))) !== 0)) {
                this.state = 62;
                this.exprList();
            }

            this.state = 65;
            this.match(exaParser.T__5);
            break;

        case 3:
            localctx = new AssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 66;
            this.expr(0);
            this.state = 67;
            this.assignment_op();
            this.state = 68;
            this.expr(0);
            this.state = 69;
            this.match(exaParser.T__5);
            break;

        case 4:
            localctx = new IncDecContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 71;
            this.expr(0);
            this.state = 72;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===exaParser.T__6 || _la===exaParser.T__7)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 73;
            this.match(exaParser.T__5);
            break;

        case 5:
            localctx = new CondStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 75;
            this.conditional();
            break;

        case 6:
            localctx = new IterationContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 76;
            this.match(exaParser.T__8);
            this.state = 77;
            this.expr(0);
            this.state = 78;
            this.block();
            break;

        case 7:
            localctx = new ExprStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 80;
            this.expr(0);
            this.state = 81;
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
        this.state = 85;
        this.match(exaParser.ID);
        this.state = 86;
        this.match(exaParser.T__9);
        this.state = 87;
        this.literal();
        this.state = 88;
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
        this.state = 90;
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
        this.state = 108;
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            localctx = new IfOnlyContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 92;
            this.match(exaParser.T__16);
            this.state = 93;
            this.expr(0);
            this.state = 94;
            this.block();
            break;

        case 2:
            localctx = new IfElseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 96;
            this.match(exaParser.T__16);
            this.state = 97;
            this.expr(0);
            this.state = 98;
            this.block();
            this.state = 99;
            this.match(exaParser.T__17);
            this.state = 100;
            this.block();
            break;

        case 3:
            localctx = new NestedIfContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 102;
            this.match(exaParser.T__16);
            this.state = 103;
            this.expr(0);
            this.state = 104;
            this.block();
            this.state = 105;
            this.match(exaParser.T__17);
            this.state = 106;
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
        this.state = 110;
        this.match(exaParser.BEGIN);
        this.state = 112;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__2) | (1 << exaParser.T__3) | (1 << exaParser.T__4) | (1 << exaParser.T__8) | (1 << exaParser.T__16) | (1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (exaParser.T__39 - 40)) | (1 << (exaParser.T__46 - 40)) | (1 << (exaParser.T__47 - 40)) | (1 << (exaParser.BEGIN - 40)) | (1 << (exaParser.NIL - 40)) | (1 << (exaParser.BOOL - 40)) | (1 << (exaParser.NUMBER - 40)) | (1 << (exaParser.ID - 40)) | (1 << (exaParser.STRING - 40)) | (1 << (exaParser.INTER_BEGIN - 40)))) !== 0)) {
            this.state = 111;
            this.statementList();
        }

        this.state = 114;
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


function AsyncContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AsyncContext.prototype = Object.create(ExprContext.prototype);
AsyncContext.prototype.constructor = AsyncContext;

exaParser.AsyncContext = AsyncContext;

AsyncContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AsyncContext.prototype.exprList = function() {
    return this.getTypedRuleContext(ExprListContext,0);
};

AsyncContext.prototype.replyHandler = function() {
    return this.getTypedRuleContext(ReplyHandlerContext,0);
};

AsyncContext.prototype.failHandler = function() {
    return this.getTypedRuleContext(FailHandlerContext,0);
};
AsyncContext.prototype.accept = function(visitor) {
    if ( visitor instanceof exaVisitor ) {
        return visitor.visitAsync(this);
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
        this.state = 158;
        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
        switch(la_) {
        case 1:
            localctx = new CardinalityContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 117;
            this.match(exaParser.T__21);
            this.state = 118;
            this.expr(18);
            break;

        case 2:
            localctx = new NegationContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 119;
            this.match(exaParser.T__22);
            this.state = 120;
            this.expr(17);
            break;

        case 3:
            localctx = new BytesContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 121;
            this.match(exaParser.T__23);
            this.state = 122;
            this.expr(16);
            break;

        case 4:
            localctx = new AsyncContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 123;
            this.match(exaParser.T__20);
            this.state = 124;
            this.expr(0);
            this.state = 125;
            this.match(exaParser.T__18);
            this.state = 127;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (exaParser.T__39 - 40)) | (1 << (exaParser.T__46 - 40)) | (1 << (exaParser.T__47 - 40)) | (1 << (exaParser.BEGIN - 40)) | (1 << (exaParser.NIL - 40)) | (1 << (exaParser.BOOL - 40)) | (1 << (exaParser.NUMBER - 40)) | (1 << (exaParser.ID - 40)) | (1 << (exaParser.STRING - 40)) | (1 << (exaParser.INTER_BEGIN - 40)))) !== 0)) {
                this.state = 126;
                this.exprList();
            }

            this.state = 129;
            this.match(exaParser.T__19);
            this.state = 131;
            var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
            if(la_===1) {
                this.state = 130;
                this.replyHandler();

            }
            this.state = 134;
            var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
            if(la_===1) {
                this.state = 133;
                this.failHandler();

            }
            break;

        case 5:
            localctx = new WrapContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 136;
            this.match(exaParser.T__18);
            this.state = 137;
            this.expr(0);
            this.state = 138;
            this.match(exaParser.T__19);
            break;

        case 6:
            localctx = new DestructureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 140;
            this.match(exaParser.T__18);
            this.state = 141;
            this.match(exaParser.ID);
            this.state = 144; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 142;
                this.match(exaParser.T__44);
                this.state = 143;
                this.match(exaParser.ID);
                this.state = 146; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===exaParser.T__44);
            this.state = 148;
            this.match(exaParser.T__19);
            break;

        case 7:
            localctx = new DynastringContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 149;
            this.match(exaParser.INTER_BEGIN);
            this.state = 150;
            this.interpolated();
            this.state = 151;
            this.match(exaParser.INTER_END);
            break;

        case 8:
            localctx = new LitExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 153;
            this.literal();
            break;

        case 9:
            localctx = new ExternalIdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 154;
            this.match(exaParser.ID);
            this.state = 155;
            this.match(exaParser.FIELD_SEP);
            this.state = 156;
            this.match(exaParser.ID);
            break;

        case 10:
            localctx = new IdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 157;
            this.match(exaParser.ID);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 216;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 214;
                var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 160;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 161;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__24) | (1 << exaParser.T__25) | (1 << exaParser.T__26))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 162;
                    this.expr(16);
                    break;

                case 2:
                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 163;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 164;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__27 || _la===exaParser.T__28)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 165;
                    this.expr(15);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 166;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 167;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 30)) & ~0x1f) == 0 && ((1 << (_la - 30)) & ((1 << (exaParser.T__29 - 30)) | (1 << (exaParser.T__30 - 30)) | (1 << (exaParser.T__31 - 30)) | (1 << (exaParser.T__32 - 30)) | (1 << (exaParser.T__33 - 30)) | (1 << (exaParser.T__34 - 30)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 168;
                    this.expr(14);
                    break;

                case 4:
                    localctx = new LogicalContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 169;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 170;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__35 || _la===exaParser.T__36)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 171;
                    this.expr(13);
                    break;

                case 5:
                    localctx = new MembershipContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 172;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 173;
                    this.match(exaParser.T__37);
                    this.state = 174;
                    this.expr(12);
                    break;

                case 6:
                    localctx = new ConcatContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 175;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 176;
                    this.match(exaParser.T__38);
                    this.state = 177;
                    this.expr(11);
                    break;

                case 7:
                    localctx = new DispatchContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 178;
                    if (!( this.precpred(this._ctx, 20))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 20)");
                    }
                    this.state = 179;
                    this.match(exaParser.T__18);
                    this.state = 181;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (exaParser.T__39 - 40)) | (1 << (exaParser.T__46 - 40)) | (1 << (exaParser.T__47 - 40)) | (1 << (exaParser.BEGIN - 40)) | (1 << (exaParser.NIL - 40)) | (1 << (exaParser.BOOL - 40)) | (1 << (exaParser.NUMBER - 40)) | (1 << (exaParser.ID - 40)) | (1 << (exaParser.STRING - 40)) | (1 << (exaParser.INTER_BEGIN - 40)))) !== 0)) {
                        this.state = 180;
                        this.exprList();
                    }

                    this.state = 183;
                    this.match(exaParser.T__19);
                    this.state = 185;
                    var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
                    if(la_===1) {
                        this.state = 184;
                        this.replyHandler();

                    }
                    this.state = 188;
                    var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
                    if(la_===1) {
                        this.state = 187;
                        this.failHandler();

                    }
                    break;

                case 8:
                    localctx = new SubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 190;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 191;
                    this.match(exaParser.T__39);
                    this.state = 193;
                    _la = this._input.LA(1);
                    if(_la===exaParser.T__40) {
                        this.state = 192;
                        localctx.cut = this.match(exaParser.T__40);
                    }

                    this.state = 195;
                    this.expr(0);
                    this.state = 196;
                    this.match(exaParser.T__41);
                    break;

                case 9:
                    localctx = new RangeContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 198;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 199;
                    this.match(exaParser.T__39);
                    this.state = 201;
                    _la = this._input.LA(1);
                    if(_la===exaParser.T__40) {
                        this.state = 200;
                        localctx.cut = this.match(exaParser.T__40);
                    }

                    this.state = 204;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (exaParser.T__39 - 40)) | (1 << (exaParser.T__46 - 40)) | (1 << (exaParser.T__47 - 40)) | (1 << (exaParser.BEGIN - 40)) | (1 << (exaParser.NIL - 40)) | (1 << (exaParser.BOOL - 40)) | (1 << (exaParser.NUMBER - 40)) | (1 << (exaParser.ID - 40)) | (1 << (exaParser.STRING - 40)) | (1 << (exaParser.INTER_BEGIN - 40)))) !== 0)) {
                        this.state = 203;
                        this.expr(0);
                    }

                    this.state = 206;
                    this.match(exaParser.T__42);
                    this.state = 208;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (exaParser.T__39 - 40)) | (1 << (exaParser.T__46 - 40)) | (1 << (exaParser.T__47 - 40)) | (1 << (exaParser.BEGIN - 40)) | (1 << (exaParser.NIL - 40)) | (1 << (exaParser.BOOL - 40)) | (1 << (exaParser.NUMBER - 40)) | (1 << (exaParser.ID - 40)) | (1 << (exaParser.STRING - 40)) | (1 << (exaParser.INTER_BEGIN - 40)))) !== 0)) {
                        this.state = 207;
                        this.expr(0);
                    }

                    this.state = 210;
                    this.match(exaParser.T__41);
                    break;

                case 10:
                    localctx = new FieldContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 211;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 212;
                    this.match(exaParser.T__43);
                    this.state = 213;
                    this.match(exaParser.ID);
                    break;

                } 
            }
            this.state = 218;
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
    this.enterRule(localctx, 18, exaParser.RULE_replyHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 219;
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
    this.enterRule(localctx, 20, exaParser.RULE_failHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 221;
        this.match(exaParser.T__45);
        this.state = 222;
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
    this.enterRule(localctx, 22, exaParser.RULE_interpolated);
    try {
        this.state = 229;
        var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 224;
            this.expr(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 225;
            this.expr(0);
            this.state = 226;
            this.match(exaParser.INTER_MID);
            this.state = 227;
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
        this.state = 231;
        this.expr(0);
        this.state = 236;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,23,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 232;
                this.match(exaParser.T__44);
                this.state = 233;
                this.expr(0); 
            }
            this.state = 238;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,23,this._ctx);
        }

        this.state = 240;
        _la = this._input.LA(1);
        if(_la===exaParser.T__44) {
            this.state = 239;
            this.match(exaParser.T__44);
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


function FrameContext(parser, ctx) {
	LiteralContext.call(this, parser);
    LiteralContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FrameContext.prototype = Object.create(LiteralContext.prototype);
FrameContext.prototype.constructor = FrameContext;

exaParser.FrameContext = FrameContext;

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
        this.state = 267;
        var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
        switch(la_) {
        case 1:
            localctx = new NilContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 242;
            this.match(exaParser.NIL);
            break;

        case 2:
            localctx = new BoolContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 243;
            this.match(exaParser.BOOL);
            break;

        case 3:
            localctx = new NumberContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 244;
            this.match(exaParser.NUMBER);
            break;

        case 4:
            localctx = new StringContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 245;
            this.match(exaParser.STRING);
            break;

        case 5:
            localctx = new ArrayContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 246;
            this.match(exaParser.T__39);
            this.state = 248;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (exaParser.T__39 - 40)) | (1 << (exaParser.T__46 - 40)) | (1 << (exaParser.T__47 - 40)) | (1 << (exaParser.BEGIN - 40)) | (1 << (exaParser.NIL - 40)) | (1 << (exaParser.BOOL - 40)) | (1 << (exaParser.NUMBER - 40)) | (1 << (exaParser.ID - 40)) | (1 << (exaParser.STRING - 40)) | (1 << (exaParser.INTER_BEGIN - 40)))) !== 0)) {
                this.state = 247;
                this.exprList();
            }

            this.state = 250;
            this.match(exaParser.T__41);
            break;

        case 6:
            localctx = new FrameContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 251;
            this.match(exaParser.T__39);
            this.state = 252;
            this.fieldList();
            this.state = 253;
            this.match(exaParser.T__41);
            break;

        case 7:
            localctx = new SetContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 255;
            this.match(exaParser.BEGIN);
            this.state = 259;
            var la_ = this._interp.adaptivePredict(this._input,26,this._ctx);
            if(la_===1) {
                this.state = 256;
                localctx.sep = this.match(exaParser.PAIR_SEP);

            } else if(la_===2) {
                this.state = 257;
                this.exprList();

            } else if(la_===3) {
                this.state = 258;
                this.pairList();

            }
            this.state = 261;
            this.match(exaParser.END);
            break;

        case 8:
            localctx = new ServiceContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 262;
            this.procedure();
            break;

        case 9:
            localctx = new SubscriptionContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 263;
            this.match(exaParser.T__46);
            this.state = 264;
            this.expr(0);
            this.state = 265;
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
    this.enterRule(localctx, 28, exaParser.RULE_procedure);
    var _la = 0; // Token type
    try {
        this.state = 283;
        var la_ = this._interp.adaptivePredict(this._input,30,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 269;
            this.match(exaParser.T__47);
            this.state = 271;
            _la = this._input.LA(1);
            if(_la===exaParser.T__18) {
                this.state = 270;
                this.paramList();
            }

            this.state = 273;
            this.block();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 274;
            this.match(exaParser.T__47);
            this.state = 275;
            this.match(exaParser.ID);
            this.state = 280;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,29,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 276;
                    this.match(exaParser.T__44);
                    this.state = 277;
                    this.match(exaParser.ID); 
                }
                this.state = 282;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,29,this._ctx);
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
    this.enterRule(localctx, 30, exaParser.RULE_paramList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 285;
        this.match(exaParser.T__18);
        this.state = 286;
        this.match(exaParser.ID);
        this.state = 291;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===exaParser.T__44) {
            this.state = 287;
            this.match(exaParser.T__44);
            this.state = 288;
            this.match(exaParser.ID);
            this.state = 293;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 294;
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
    this.enterRule(localctx, 32, exaParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 302; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 296;
            this.match(exaParser.ID);
            this.state = 297;
            this.match(exaParser.FIELD_SEP);
            this.state = 298;
            this.expr(0);
            this.state = 300;
            _la = this._input.LA(1);
            if(_la===exaParser.T__44) {
                this.state = 299;
                this.match(exaParser.T__44);
            }

            this.state = 304; 
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
    this.enterRule(localctx, 34, exaParser.RULE_pairList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 312; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 306;
            this.expr(0);
            this.state = 307;
            this.match(exaParser.PAIR_SEP);
            this.state = 308;
            this.expr(0);
            this.state = 310;
            _la = this._input.LA(1);
            if(_la===exaParser.T__44) {
                this.state = 309;
                this.match(exaParser.T__44);
            }

            this.state = 314; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__18) | (1 << exaParser.T__20) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (exaParser.T__39 - 40)) | (1 << (exaParser.T__46 - 40)) | (1 << (exaParser.T__47 - 40)) | (1 << (exaParser.BEGIN - 40)) | (1 << (exaParser.NIL - 40)) | (1 << (exaParser.BOOL - 40)) | (1 << (exaParser.NUMBER - 40)) | (1 << (exaParser.ID - 40)) | (1 << (exaParser.STRING - 40)) | (1 << (exaParser.INTER_BEGIN - 40)))) !== 0));
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
