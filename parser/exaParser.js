// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');
var exaVisitor = require('./exaVisitor').exaVisitor;

var grammarFileName = "exa.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003B\u014e\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
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
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0005\u0005[\n\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\bt\n\b\u0003",
    "\t\u0003\t\u0005\tx\n\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0005\n\u0081\n\n\u0003\n\u0003\n\u0005\n\u0085\n\n\u0003",
    "\n\u0005\n\u0088\n\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u00a0",
    "\n\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0006\n\u00a8\n",
    "\n\r\n\u000e\n\u00a9\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u00b6\n\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0005\n\u00cd\n\n\u0003\n\u0003\n\u0005\n\u00d1\n\n\u0003\n\u0005",
    "\n\u00d4\n\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0005\n\u00e0\n\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0007\n\u00e7\n\n\f\n\u000e\n\u00ea\u000b\n\u0003\u000b\u0003",
    "\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0005\r\u00f7\n\r\u0003\u000e\u0003\u000e\u0003\u000e\u0007",
    "\u000e\u00fc\n\u000e\f\u000e\u000e\u000e\u00ff\u000b\u000e\u0003\u000e",
    "\u0005\u000e\u0102\n\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u010a\n\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0005\u000f\u0115\n\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u011d",
    "\n\u000f\u0003\u0010\u0003\u0010\u0005\u0010\u0121\n\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0007\u0010\u0128\n",
    "\u0010\f\u0010\u000e\u0010\u012b\u000b\u0010\u0005\u0010\u012d\n\u0010",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0007\u0011\u0133\n",
    "\u0011\f\u0011\u000e\u0011\u0136\u000b\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0005\u0012\u013e\n",
    "\u0012\u0006\u0012\u0140\n\u0012\r\u0012\u000e\u0012\u0141\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u0148\n\u0013\u0006",
    "\u0013\u014a\n\u0013\r\u0013\u000e\u0013\u014b\u0003\u0013\u0002\u0003",
    "\u0012\u0014\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018",
    "\u001a\u001c\u001e \"$\u0002\n\u0003\u0002\u0003\u0004\u0003\u0002\u0005",
    "\u0007\u0003\u0002\t\n\u0003\u0002\u000e\u0013\u0003\u0002\u001c\u001e",
    "\u0003\u0002\u001f \u0003\u0002!&\u0003\u0002\'(\u017f\u0002\'\u0003",
    "\u0002\u0002\u0002\u00040\u0003\u0002\u0002\u0002\u0006<\u0003\u0002",
    "\u0002\u0002\bZ\u0003\u0002\u0002\u0002\n\\\u0003\u0002\u0002\u0002",
    "\fa\u0003\u0002\u0002\u0002\u000es\u0003\u0002\u0002\u0002\u0010u\u0003",
    "\u0002\u0002\u0002\u0012\u00b5\u0003\u0002\u0002\u0002\u0014\u00eb\u0003",
    "\u0002\u0002\u0002\u0016\u00ed\u0003\u0002\u0002\u0002\u0018\u00f6\u0003",
    "\u0002\u0002\u0002\u001a\u00f8\u0003\u0002\u0002\u0002\u001c\u011c\u0003",
    "\u0002\u0002\u0002\u001e\u012c\u0003\u0002\u0002\u0002 \u012e\u0003",
    "\u0002\u0002\u0002\"\u013f\u0003\u0002\u0002\u0002$\u0149\u0003\u0002",
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
    "=\u0007\u0003\u0002\u0002\u0002>[\u0005\n\u0006\u0002?A\t\u0003\u0002",
    "\u0002@B\u0005\u001a\u000e\u0002A@\u0003\u0002\u0002\u0002AB\u0003\u0002",
    "\u0002\u0002BC\u0003\u0002\u0002\u0002C[\u0007\b\u0002\u0002DE\u0005",
    "\u0012\n\u0002EF\u0005\f\u0007\u0002FG\u0005\u0012\n\u0002GH\u0007\b",
    "\u0002\u0002H[\u0003\u0002\u0002\u0002IJ\u0005\u0012\n\u0002JK\t\u0004",
    "\u0002\u0002KL\u0007\b\u0002\u0002L[\u0003\u0002\u0002\u0002M[\u0005",
    "\u000e\b\u0002NO\u0005\u0012\n\u0002OP\u0007\u000b\u0002\u0002PQ\u0005",
    "\u0012\n\u0002QR\u0007\b\u0002\u0002R[\u0003\u0002\u0002\u0002ST\u0007",
    "\f\u0002\u0002TU\u0005\u0012\n\u0002UV\u0005\u0010\t\u0002V[\u0003\u0002",
    "\u0002\u0002WX\u0005\u0012\n\u0002XY\u0007\b\u0002\u0002Y[\u0003\u0002",
    "\u0002\u0002Z>\u0003\u0002\u0002\u0002Z?\u0003\u0002\u0002\u0002ZD\u0003",
    "\u0002\u0002\u0002ZI\u0003\u0002\u0002\u0002ZM\u0003\u0002\u0002\u0002",
    "ZN\u0003\u0002\u0002\u0002ZS\u0003\u0002\u0002\u0002ZW\u0003\u0002\u0002",
    "\u0002[\t\u0003\u0002\u0002\u0002\\]\u0007=\u0002\u0002]^\u0007\r\u0002",
    "\u0002^_\u0005\u001c\u000f\u0002_`\u0007\b\u0002\u0002`\u000b\u0003",
    "\u0002\u0002\u0002ab\t\u0005\u0002\u0002b\r\u0003\u0002\u0002\u0002",
    "cd\u0007\u0014\u0002\u0002de\u0005\u0012\n\u0002ef\u0005\u0010\t\u0002",
    "ft\u0003\u0002\u0002\u0002gh\u0007\u0014\u0002\u0002hi\u0005\u0012\n",
    "\u0002ij\u0005\u0010\t\u0002jk\u0007\u0015\u0002\u0002kl\u0005\u0010",
    "\t\u0002lt\u0003\u0002\u0002\u0002mn\u0007\u0014\u0002\u0002no\u0005",
    "\u0012\n\u0002op\u0005\u0010\t\u0002pq\u0007\u0015\u0002\u0002qr\u0005",
    "\u000e\b\u0002rt\u0003\u0002\u0002\u0002sc\u0003\u0002\u0002\u0002s",
    "g\u0003\u0002\u0002\u0002sm\u0003\u0002\u0002\u0002t\u000f\u0003\u0002",
    "\u0002\u0002uw\u00076\u0002\u0002vx\u0005\u0006\u0004\u0002wv\u0003",
    "\u0002\u0002\u0002wx\u0003\u0002\u0002\u0002xy\u0003\u0002\u0002\u0002",
    "yz\u00077\u0002\u0002z\u0011\u0003\u0002\u0002\u0002{|\b\n\u0001\u0002",
    "|}\u0007\u0018\u0002\u0002}~\u0005\u0012\n\u0002~\u0080\u0007\u0016",
    "\u0002\u0002\u007f\u0081\u0005\u001a\u000e\u0002\u0080\u007f\u0003\u0002",
    "\u0002\u0002\u0080\u0081\u0003\u0002\u0002\u0002\u0081\u0082\u0003\u0002",
    "\u0002\u0002\u0082\u0084\u0007\u0017\u0002\u0002\u0083\u0085\u0005\u0014",
    "\u000b\u0002\u0084\u0083\u0003\u0002\u0002\u0002\u0084\u0085\u0003\u0002",
    "\u0002\u0002\u0085\u0087\u0003\u0002\u0002\u0002\u0086\u0088\u0005\u0016",
    "\f\u0002\u0087\u0086\u0003\u0002\u0002\u0002\u0087\u0088\u0003\u0002",
    "\u0002\u0002\u0088\u00b6\u0003\u0002\u0002\u0002\u0089\u008a\u0007\u0019",
    "\u0002\u0002\u008a\u00b6\u0005\u0012\n\u0016\u008b\u008c\u0007\u001a",
    "\u0002\u0002\u008c\u00b6\u0005\u0012\n\u0015\u008d\u008e\u0007\u001b",
    "\u0002\u0002\u008e\u00b6\u0005\u0012\n\u0014\u008f\u0090\u0007\u0016",
    "\u0002\u0002\u0090\u0091\u0005\u0012\n\u0002\u0091\u0092\u0007\u0017",
    "\u0002\u0002\u0092\u00b6\u0003\u0002\u0002\u0002\u0093\u0094\u0007.",
    "\u0002\u0002\u0094\u0095\u0005\u0012\n\u0002\u0095\u0096\u0007+\u0002",
    "\u0002\u0096\u0097\u0005\u0012\n\u0002\u0097\u0098\u0007,\u0002\u0002",
    "\u0098\u00b6\u0003\u0002\u0002\u0002\u0099\u009a\u0007.\u0002\u0002",
    "\u009a\u009b\u0005\u0012\n\u0002\u009b\u009c\u0007+\u0002\u0002\u009c",
    "\u009d\u0005\u0012\n\u0002\u009d\u009f\u0007-\u0002\u0002\u009e\u00a0",
    "\u0005\u0012\n\u0002\u009f\u009e\u0003\u0002\u0002\u0002\u009f\u00a0",
    "\u0003\u0002\u0002\u0002\u00a0\u00a1\u0003\u0002\u0002\u0002\u00a1\u00a2",
    "\u0007,\u0002\u0002\u00a2\u00b6\u0003\u0002\u0002\u0002\u00a3\u00a4",
    "\u0007\u0016\u0002\u0002\u00a4\u00a7\u0007=\u0002\u0002\u00a5\u00a6",
    "\u00070\u0002\u0002\u00a6\u00a8\u0007=\u0002\u0002\u00a7\u00a5\u0003",
    "\u0002\u0002\u0002\u00a8\u00a9\u0003\u0002\u0002\u0002\u00a9\u00a7\u0003",
    "\u0002\u0002\u0002\u00a9\u00aa\u0003\u0002\u0002\u0002\u00aa\u00ab\u0003",
    "\u0002\u0002\u0002\u00ab\u00b6\u0007\u0017\u0002\u0002\u00ac\u00ad\u0007",
    "?\u0002\u0002\u00ad\u00ae\u0005\u0018\r\u0002\u00ae\u00af\u0007A\u0002",
    "\u0002\u00af\u00b6\u0003\u0002\u0002\u0002\u00b0\u00b6\u0005\u001c\u000f",
    "\u0002\u00b1\u00b2\u0007=\u0002\u0002\u00b2\u00b3\u0007;\u0002\u0002",
    "\u00b3\u00b6\u0007=\u0002\u0002\u00b4\u00b6\u0007=\u0002\u0002\u00b5",
    "{\u0003\u0002\u0002\u0002\u00b5\u0089\u0003\u0002\u0002\u0002\u00b5",
    "\u008b\u0003\u0002\u0002\u0002\u00b5\u008d\u0003\u0002\u0002\u0002\u00b5",
    "\u008f\u0003\u0002\u0002\u0002\u00b5\u0093\u0003\u0002\u0002\u0002\u00b5",
    "\u0099\u0003\u0002\u0002\u0002\u00b5\u00a3\u0003\u0002\u0002\u0002\u00b5",
    "\u00ac\u0003\u0002\u0002\u0002\u00b5\u00b0\u0003\u0002\u0002\u0002\u00b5",
    "\u00b1\u0003\u0002\u0002\u0002\u00b5\u00b4\u0003\u0002\u0002\u0002\u00b6",
    "\u00e8\u0003\u0002\u0002\u0002\u00b7\u00b8\f\u0013\u0002\u0002\u00b8",
    "\u00b9\t\u0006\u0002\u0002\u00b9\u00e7\u0005\u0012\n\u0014\u00ba\u00bb",
    "\f\u0012\u0002\u0002\u00bb\u00bc\t\u0007\u0002\u0002\u00bc\u00e7\u0005",
    "\u0012\n\u0013\u00bd\u00be\f\u0011\u0002\u0002\u00be\u00bf\t\b\u0002",
    "\u0002\u00bf\u00e7\u0005\u0012\n\u0012\u00c0\u00c1\f\u0010\u0002\u0002",
    "\u00c1\u00c2\t\t\u0002\u0002\u00c2\u00e7\u0005\u0012\n\u0011\u00c3\u00c4",
    "\f\u000f\u0002\u0002\u00c4\u00c5\u0007)\u0002\u0002\u00c5\u00e7\u0005",
    "\u0012\n\u0010\u00c6\u00c7\f\u000e\u0002\u0002\u00c7\u00c8\u0007*\u0002",
    "\u0002\u00c8\u00e7\u0005\u0012\n\u000f\u00c9\u00ca\f\u0018\u0002\u0002",
    "\u00ca\u00cc\u0007\u0016\u0002\u0002\u00cb\u00cd\u0005\u001a\u000e\u0002",
    "\u00cc\u00cb\u0003\u0002\u0002\u0002\u00cc\u00cd\u0003\u0002\u0002\u0002",
    "\u00cd\u00ce\u0003\u0002\u0002\u0002\u00ce\u00d0\u0007\u0017\u0002\u0002",
    "\u00cf\u00d1\u0005\u0014\u000b\u0002\u00d0\u00cf\u0003\u0002\u0002\u0002",
    "\u00d0\u00d1\u0003\u0002\u0002\u0002\u00d1\u00d3\u0003\u0002\u0002\u0002",
    "\u00d2\u00d4\u0005\u0016\f\u0002\u00d3\u00d2\u0003\u0002\u0002\u0002",
    "\u00d3\u00d4\u0003\u0002\u0002\u0002\u00d4\u00e7\u0003\u0002\u0002\u0002",
    "\u00d5\u00d6\f\f\u0002\u0002\u00d6\u00d7\u0007+\u0002\u0002\u00d7\u00d8",
    "\u0005\u0012\n\u0002\u00d8\u00d9\u0007,\u0002\u0002\u00d9\u00e7\u0003",
    "\u0002\u0002\u0002\u00da\u00db\f\u000b\u0002\u0002\u00db\u00dc\u0007",
    "+\u0002\u0002\u00dc\u00dd\u0005\u0012\n\u0002\u00dd\u00df\u0007-\u0002",
    "\u0002\u00de\u00e0\u0005\u0012\n\u0002\u00df\u00de\u0003\u0002\u0002",
    "\u0002\u00df\u00e0\u0003\u0002\u0002\u0002\u00e0\u00e1\u0003\u0002\u0002",
    "\u0002\u00e1\u00e2\u0007,\u0002\u0002\u00e2\u00e7\u0003\u0002\u0002",
    "\u0002\u00e3\u00e4\f\b\u0002\u0002\u00e4\u00e5\u0007/\u0002\u0002\u00e5",
    "\u00e7\u0007=\u0002\u0002\u00e6\u00b7\u0003\u0002\u0002\u0002\u00e6",
    "\u00ba\u0003\u0002\u0002\u0002\u00e6\u00bd\u0003\u0002\u0002\u0002\u00e6",
    "\u00c0\u0003\u0002\u0002\u0002\u00e6\u00c3\u0003\u0002\u0002\u0002\u00e6",
    "\u00c6\u0003\u0002\u0002\u0002\u00e6\u00c9\u0003\u0002\u0002\u0002\u00e6",
    "\u00d5\u0003\u0002\u0002\u0002\u00e6\u00da\u0003\u0002\u0002\u0002\u00e6",
    "\u00e3\u0003\u0002\u0002\u0002\u00e7\u00ea\u0003\u0002\u0002\u0002\u00e8",
    "\u00e6\u0003\u0002\u0002\u0002\u00e8\u00e9\u0003\u0002\u0002\u0002\u00e9",
    "\u0013\u0003\u0002\u0002\u0002\u00ea\u00e8\u0003\u0002\u0002\u0002\u00eb",
    "\u00ec\u0005\u001e\u0010\u0002\u00ec\u0015\u0003\u0002\u0002\u0002\u00ed",
    "\u00ee\u00071\u0002\u0002\u00ee\u00ef\u0007\u0006\u0002\u0002\u00ef",
    "\u00f0\u0005\u001e\u0010\u0002\u00f0\u0017\u0003\u0002\u0002\u0002\u00f1",
    "\u00f7\u0005\u0012\n\u0002\u00f2\u00f3\u0005\u0012\n\u0002\u00f3\u00f4",
    "\u0007@\u0002\u0002\u00f4\u00f5\u0005\u0018\r\u0002\u00f5\u00f7\u0003",
    "\u0002\u0002\u0002\u00f6\u00f1\u0003\u0002\u0002\u0002\u00f6\u00f2\u0003",
    "\u0002\u0002\u0002\u00f7\u0019\u0003\u0002\u0002\u0002\u00f8\u00fd\u0005",
    "\u0012\n\u0002\u00f9\u00fa\u00070\u0002\u0002\u00fa\u00fc\u0005\u0012",
    "\n\u0002\u00fb\u00f9\u0003\u0002\u0002\u0002\u00fc\u00ff\u0003\u0002",
    "\u0002\u0002\u00fd\u00fb\u0003\u0002\u0002\u0002\u00fd\u00fe\u0003\u0002",
    "\u0002\u0002\u00fe\u0101\u0003\u0002\u0002\u0002\u00ff\u00fd\u0003\u0002",
    "\u0002\u0002\u0100\u0102\u00070\u0002\u0002\u0101\u0100\u0003\u0002",
    "\u0002\u0002\u0101\u0102\u0003\u0002\u0002\u0002\u0102\u001b\u0003\u0002",
    "\u0002\u0002\u0103\u011d\u00078\u0002\u0002\u0104\u011d\u00079\u0002",
    "\u0002\u0105\u011d\u0007<\u0002\u0002\u0106\u011d\u0007>\u0002\u0002",
    "\u0107\u0109\u0007+\u0002\u0002\u0108\u010a\u0005\u001a\u000e\u0002",
    "\u0109\u0108\u0003\u0002\u0002\u0002\u0109\u010a\u0003\u0002\u0002\u0002",
    "\u010a\u010b\u0003\u0002\u0002\u0002\u010b\u011d\u0007,\u0002\u0002",
    "\u010c\u010d\u0007+\u0002\u0002\u010d\u010e\u0005\"\u0012\u0002\u010e",
    "\u010f\u0007,\u0002\u0002\u010f\u011d\u0003\u0002\u0002\u0002\u0110",
    "\u0114\u00076\u0002\u0002\u0111\u0115\u0007:\u0002\u0002\u0112\u0115",
    "\u0005\u001a\u000e\u0002\u0113\u0115\u0005$\u0013\u0002\u0114\u0111",
    "\u0003\u0002\u0002\u0002\u0114\u0112\u0003\u0002\u0002\u0002\u0114\u0113",
    "\u0003\u0002\u0002\u0002\u0114\u0115\u0003\u0002\u0002\u0002\u0115\u0116",
    "\u0003\u0002\u0002\u0002\u0116\u011d\u00077\u0002\u0002\u0117\u011d",
    "\u0005\u001e\u0010\u0002\u0118\u0119\u00071\u0002\u0002\u0119\u011a",
    "\u0005\u0012\n\u0002\u011a\u011b\u0005\u001e\u0010\u0002\u011b\u011d",
    "\u0003\u0002\u0002\u0002\u011c\u0103\u0003\u0002\u0002\u0002\u011c\u0104",
    "\u0003\u0002\u0002\u0002\u011c\u0105\u0003\u0002\u0002\u0002\u011c\u0106",
    "\u0003\u0002\u0002\u0002\u011c\u0107\u0003\u0002\u0002\u0002\u011c\u010c",
    "\u0003\u0002\u0002\u0002\u011c\u0110\u0003\u0002\u0002\u0002\u011c\u0117",
    "\u0003\u0002\u0002\u0002\u011c\u0118\u0003\u0002\u0002\u0002\u011d\u001d",
    "\u0003\u0002\u0002\u0002\u011e\u0120\u00072\u0002\u0002\u011f\u0121",
    "\u0005 \u0011\u0002\u0120\u011f\u0003\u0002\u0002\u0002\u0120\u0121",
    "\u0003\u0002\u0002\u0002\u0121\u0122\u0003\u0002\u0002\u0002\u0122\u012d",
    "\u0005\u0010\t\u0002\u0123\u0124\u00072\u0002\u0002\u0124\u0129\u0007",
    "=\u0002\u0002\u0125\u0126\u00070\u0002\u0002\u0126\u0128\u0007=\u0002",
    "\u0002\u0127\u0125\u0003\u0002\u0002\u0002\u0128\u012b\u0003\u0002\u0002",
    "\u0002\u0129\u0127\u0003\u0002\u0002\u0002\u0129\u012a\u0003\u0002\u0002",
    "\u0002\u012a\u012d\u0003\u0002\u0002\u0002\u012b\u0129\u0003\u0002\u0002",
    "\u0002\u012c\u011e\u0003\u0002\u0002\u0002\u012c\u0123\u0003\u0002\u0002",
    "\u0002\u012d\u001f\u0003\u0002\u0002\u0002\u012e\u012f\u0007\u0016\u0002",
    "\u0002\u012f\u0134\u0007=\u0002\u0002\u0130\u0131\u00070\u0002\u0002",
    "\u0131\u0133\u0007=\u0002\u0002\u0132\u0130\u0003\u0002\u0002\u0002",
    "\u0133\u0136\u0003\u0002\u0002\u0002\u0134\u0132\u0003\u0002\u0002\u0002",
    "\u0134\u0135\u0003\u0002\u0002\u0002\u0135\u0137\u0003\u0002\u0002\u0002",
    "\u0136\u0134\u0003\u0002\u0002\u0002\u0137\u0138\u0007\u0017\u0002\u0002",
    "\u0138!\u0003\u0002\u0002\u0002\u0139\u013a\u0007=\u0002\u0002\u013a",
    "\u013b\u0007;\u0002\u0002\u013b\u013d\u0005\u0012\n\u0002\u013c\u013e",
    "\u00070\u0002\u0002\u013d\u013c\u0003\u0002\u0002\u0002\u013d\u013e",
    "\u0003\u0002\u0002\u0002\u013e\u0140\u0003\u0002\u0002\u0002\u013f\u0139",
    "\u0003\u0002\u0002\u0002\u0140\u0141\u0003\u0002\u0002\u0002\u0141\u013f",
    "\u0003\u0002\u0002\u0002\u0141\u0142\u0003\u0002\u0002\u0002\u0142#",
    "\u0003\u0002\u0002\u0002\u0143\u0144\u0005\u0012\n\u0002\u0144\u0145",
    "\u0007:\u0002\u0002\u0145\u0147\u0005\u0012\n\u0002\u0146\u0148\u0007",
    "0\u0002\u0002\u0147\u0146\u0003\u0002\u0002\u0002\u0147\u0148\u0003",
    "\u0002\u0002\u0002\u0148\u014a\u0003\u0002\u0002\u0002\u0149\u0143\u0003",
    "\u0002\u0002\u0002\u014a\u014b\u0003\u0002\u0002\u0002\u014b\u0149\u0003",
    "\u0002\u0002\u0002\u014b\u014c\u0003\u0002\u0002\u0002\u014c%\u0003",
    "\u0002\u0002\u0002$\',6<AZsw\u0080\u0084\u0087\u009f\u00a9\u00b5\u00cc",
    "\u00d0\u00d3\u00df\u00e6\u00e8\u00f6\u00fd\u0101\u0109\u0114\u011c\u0120",
    "\u0129\u012c\u0134\u013d\u0141\u0147\u014b"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'references'", "'refs'", "'reply'", "'fail'", 
                     "'substitute'", "';'", "'++'", "'--'", "'>>'", "'while'", 
                     "'is'", "'='", "'+='", "'-='", "'*='", "'/='", "'%='", 
                     "'if'", "'else'", "'('", "')'", "'@'", "'#'", "'not'", 
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
        this._errHandler.sync(this);
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
        this.state = 88;
        this._errHandler.sync(this);
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
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
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
            localctx = new SendContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 76;
            this.expr(0);
            this.state = 77;
            this.match(exaParser.T__8);
            this.state = 78;
            this.expr(0);
            this.state = 79;
            this.match(exaParser.T__5);
            break;

        case 7:
            localctx = new IterationContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 81;
            this.match(exaParser.T__9);
            this.state = 82;
            this.expr(0);
            this.state = 83;
            this.block();
            break;

        case 8:
            localctx = new ExprStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 85;
            this.expr(0);
            this.state = 86;
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
        this.state = 90;
        this.match(exaParser.ID);
        this.state = 91;
        this.match(exaParser.T__10);
        this.state = 92;
        this.literal();
        this.state = 93;
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
        this.state = 95;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__11) | (1 << exaParser.T__12) | (1 << exaParser.T__13) | (1 << exaParser.T__14) | (1 << exaParser.T__15) | (1 << exaParser.T__16))) !== 0))) {
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
        this.state = 113;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            localctx = new IfOnlyContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 97;
            this.match(exaParser.T__17);
            this.state = 98;
            this.expr(0);
            this.state = 99;
            this.block();
            break;

        case 2:
            localctx = new IfElseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 101;
            this.match(exaParser.T__17);
            this.state = 102;
            this.expr(0);
            this.state = 103;
            this.block();
            this.state = 104;
            this.match(exaParser.T__18);
            this.state = 105;
            this.block();
            break;

        case 3:
            localctx = new NestedIfContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 107;
            this.match(exaParser.T__17);
            this.state = 108;
            this.expr(0);
            this.state = 109;
            this.block();
            this.state = 110;
            this.match(exaParser.T__18);
            this.state = 111;
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
        this.state = 115;
        this.match(exaParser.BEGIN);
        this.state = 117;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__2) | (1 << exaParser.T__3) | (1 << exaParser.T__4) | (1 << exaParser.T__9) | (1 << exaParser.T__17) | (1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
            this.state = 116;
            this.statementList();
        }

        this.state = 119;
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
        this.state = 179;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
        switch(la_) {
        case 1:
            localctx = new AsyncContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 122;
            this.match(exaParser.T__21);
            this.state = 123;
            this.expr(0);
            this.state = 124;
            this.match(exaParser.T__19);
            this.state = 126;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 125;
                this.exprList();
            }

            this.state = 128;
            this.match(exaParser.T__20);
            this.state = 130;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
            if(la_===1) {
                this.state = 129;
                this.replyHandler();

            }
            this.state = 133;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
            if(la_===1) {
                this.state = 132;
                this.failHandler();

            }
            break;

        case 2:
            localctx = new CardinalityContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 135;
            this.match(exaParser.T__22);
            this.state = 136;
            this.expr(20);
            break;

        case 3:
            localctx = new NegationContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 137;
            this.match(exaParser.T__23);
            this.state = 138;
            this.expr(19);
            break;

        case 4:
            localctx = new BytesContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 139;
            this.match(exaParser.T__24);
            this.state = 140;
            this.expr(18);
            break;

        case 5:
            localctx = new WrapContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 141;
            this.match(exaParser.T__19);
            this.state = 142;
            this.expr(0);
            this.state = 143;
            this.match(exaParser.T__20);
            break;

        case 6:
            localctx = new ExtractionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 145;
            this.match(exaParser.T__43);
            this.state = 146;
            this.expr(0);
            this.state = 147;
            this.match(exaParser.T__40);
            this.state = 148;
            this.expr(0);
            this.state = 149;
            this.match(exaParser.T__41);
            break;

        case 7:
            localctx = new ExcisionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 151;
            this.match(exaParser.T__43);
            this.state = 152;
            this.expr(0);
            this.state = 153;
            this.match(exaParser.T__40);
            this.state = 154;
            this.expr(0);
            this.state = 155;
            this.match(exaParser.T__42);
            this.state = 157;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 156;
                this.expr(0);
            }

            this.state = 159;
            this.match(exaParser.T__41);
            break;

        case 8:
            localctx = new DestructureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 161;
            this.match(exaParser.T__19);
            this.state = 162;
            this.match(exaParser.ID);
            this.state = 165; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 163;
                this.match(exaParser.T__45);
                this.state = 164;
                this.match(exaParser.ID);
                this.state = 167; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===exaParser.T__45);
            this.state = 169;
            this.match(exaParser.T__20);
            break;

        case 9:
            localctx = new DynastringContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 170;
            this.match(exaParser.INTER_BEGIN);
            this.state = 171;
            this.interpolated();
            this.state = 172;
            this.match(exaParser.INTER_END);
            break;

        case 10:
            localctx = new LitExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 174;
            this.literal();
            break;

        case 11:
            localctx = new ExternalIdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 175;
            this.match(exaParser.ID);
            this.state = 176;
            this.match(exaParser.FIELD_SEP);
            this.state = 177;
            this.match(exaParser.ID);
            break;

        case 12:
            localctx = new IdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 178;
            this.match(exaParser.ID);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 230;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 228;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 181;
                    if (!( this.precpred(this._ctx, 17))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
                    }
                    this.state = 182;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__25) | (1 << exaParser.T__26) | (1 << exaParser.T__27))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 183;
                    this.expr(18);
                    break;

                case 2:
                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 184;
                    if (!( this.precpred(this._ctx, 16))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                    }
                    this.state = 185;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__28 || _la===exaParser.T__29)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 186;
                    this.expr(17);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 187;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 188;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 31)) & ~0x1f) == 0 && ((1 << (_la - 31)) & ((1 << (exaParser.T__30 - 31)) | (1 << (exaParser.T__31 - 31)) | (1 << (exaParser.T__32 - 31)) | (1 << (exaParser.T__33 - 31)) | (1 << (exaParser.T__34 - 31)) | (1 << (exaParser.T__35 - 31)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 189;
                    this.expr(16);
                    break;

                case 4:
                    localctx = new LogicalContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 190;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 191;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===exaParser.T__36 || _la===exaParser.T__37)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 192;
                    this.expr(15);
                    break;

                case 5:
                    localctx = new MembershipContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 193;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 194;
                    this.match(exaParser.T__38);
                    this.state = 195;
                    this.expr(14);
                    break;

                case 6:
                    localctx = new ConcatContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 196;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 197;
                    this.match(exaParser.T__39);
                    this.state = 198;
                    this.expr(13);
                    break;

                case 7:
                    localctx = new DispatchContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 199;
                    if (!( this.precpred(this._ctx, 22))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 22)");
                    }
                    this.state = 200;
                    this.match(exaParser.T__19);
                    this.state = 202;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                        this.state = 201;
                        this.exprList();
                    }

                    this.state = 204;
                    this.match(exaParser.T__20);
                    this.state = 206;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
                    if(la_===1) {
                        this.state = 205;
                        this.replyHandler();

                    }
                    this.state = 209;
                    this._errHandler.sync(this);
                    var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
                    if(la_===1) {
                        this.state = 208;
                        this.failHandler();

                    }
                    break;

                case 8:
                    localctx = new SubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 211;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 212;
                    this.match(exaParser.T__40);
                    this.state = 213;
                    this.expr(0);
                    this.state = 214;
                    this.match(exaParser.T__41);
                    break;

                case 9:
                    localctx = new SliceContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 216;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 217;
                    this.match(exaParser.T__40);
                    this.state = 218;
                    this.expr(0);
                    this.state = 219;
                    this.match(exaParser.T__42);
                    this.state = 221;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                        this.state = 220;
                        this.expr(0);
                    }

                    this.state = 223;
                    this.match(exaParser.T__41);
                    break;

                case 10:
                    localctx = new FieldContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, exaParser.RULE_expr);
                    this.state = 225;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 226;
                    this.match(exaParser.T__44);
                    this.state = 227;
                    this.match(exaParser.ID);
                    break;

                } 
            }
            this.state = 232;
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
        this.state = 233;
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
        this.state = 235;
        this.match(exaParser.T__46);
        this.state = 236;
        this.match(exaParser.T__3);
        this.state = 237;
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
        this.state = 244;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 239;
            this.expr(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 240;
            this.expr(0);
            this.state = 241;
            this.match(exaParser.INTER_MID);
            this.state = 242;
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
        this.state = 246;
        this.expr(0);
        this.state = 251;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 247;
                this.match(exaParser.T__45);
                this.state = 248;
                this.expr(0); 
            }
            this.state = 253;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,21,this._ctx);
        }

        this.state = 255;
        _la = this._input.LA(1);
        if(_la===exaParser.T__45) {
            this.state = 254;
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
        this.state = 282;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
        switch(la_) {
        case 1:
            localctx = new NilContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 257;
            this.match(exaParser.NIL);
            break;

        case 2:
            localctx = new BoolContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 258;
            this.match(exaParser.BOOL);
            break;

        case 3:
            localctx = new NumberContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 259;
            this.match(exaParser.NUMBER);
            break;

        case 4:
            localctx = new StringContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 260;
            this.match(exaParser.STRING);
            break;

        case 5:
            localctx = new ArrayContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 261;
            this.match(exaParser.T__40);
            this.state = 263;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0)) {
                this.state = 262;
                this.exprList();
            }

            this.state = 265;
            this.match(exaParser.T__41);
            break;

        case 6:
            localctx = new FrameContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 266;
            this.match(exaParser.T__40);
            this.state = 267;
            this.fieldList();
            this.state = 268;
            this.match(exaParser.T__41);
            break;

        case 7:
            localctx = new SetContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 270;
            this.match(exaParser.BEGIN);
            this.state = 274;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
            if(la_===1) {
                this.state = 271;
                localctx.sep = this.match(exaParser.PAIR_SEP);

            } else if(la_===2) {
                this.state = 272;
                this.exprList();

            } else if(la_===3) {
                this.state = 273;
                this.pairList();

            }
            this.state = 276;
            this.match(exaParser.END);
            break;

        case 8:
            localctx = new ServiceContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 277;
            this.procedure();
            break;

        case 9:
            localctx = new SubscriptionContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 278;
            this.match(exaParser.T__46);
            this.state = 279;
            this.expr(0);
            this.state = 280;
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
        this.state = 298;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,28,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 284;
            this.match(exaParser.T__47);
            this.state = 286;
            _la = this._input.LA(1);
            if(_la===exaParser.T__19) {
                this.state = 285;
                this.paramList();
            }

            this.state = 288;
            this.block();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 289;
            this.match(exaParser.T__47);
            this.state = 290;
            this.match(exaParser.ID);
            this.state = 295;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,27,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 291;
                    this.match(exaParser.T__45);
                    this.state = 292;
                    this.match(exaParser.ID); 
                }
                this.state = 297;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,27,this._ctx);
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
        this.state = 300;
        this.match(exaParser.T__19);
        this.state = 301;
        this.match(exaParser.ID);
        this.state = 306;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===exaParser.T__45) {
            this.state = 302;
            this.match(exaParser.T__45);
            this.state = 303;
            this.match(exaParser.ID);
            this.state = 308;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 309;
        this.match(exaParser.T__20);
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
        this.state = 317; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 311;
            this.match(exaParser.ID);
            this.state = 312;
            this.match(exaParser.FIELD_SEP);
            this.state = 313;
            this.expr(0);
            this.state = 315;
            _la = this._input.LA(1);
            if(_la===exaParser.T__45) {
                this.state = 314;
                this.match(exaParser.T__45);
            }

            this.state = 319; 
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
        this.state = 327; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 321;
            this.expr(0);
            this.state = 322;
            this.match(exaParser.PAIR_SEP);
            this.state = 323;
            this.expr(0);
            this.state = 325;
            _la = this._input.LA(1);
            if(_la===exaParser.T__45) {
                this.state = 324;
                this.match(exaParser.T__45);
            }

            this.state = 329; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << exaParser.T__19) | (1 << exaParser.T__21) | (1 << exaParser.T__22) | (1 << exaParser.T__23) | (1 << exaParser.T__24))) !== 0) || ((((_la - 41)) & ~0x1f) == 0 && ((1 << (_la - 41)) & ((1 << (exaParser.T__40 - 41)) | (1 << (exaParser.T__43 - 41)) | (1 << (exaParser.T__46 - 41)) | (1 << (exaParser.T__47 - 41)) | (1 << (exaParser.BEGIN - 41)) | (1 << (exaParser.NIL - 41)) | (1 << (exaParser.BOOL - 41)) | (1 << (exaParser.NUMBER - 41)) | (1 << (exaParser.ID - 41)) | (1 << (exaParser.STRING - 41)) | (1 << (exaParser.INTER_BEGIN - 41)))) !== 0));
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
