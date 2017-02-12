// Generated from /Users/seth/devel/velo/parser/lo.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');
var loVisitor = require('./loVisitor').loVisitor;

var grammarFileName = "lo.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003C\u014e\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0003\u0002\u0006\u0002*\n\u0002\r\u0002\u000e\u0002+\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "4\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u00049\n\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0005\u0004I\n\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004R",
    "\n\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004i\n\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006",
    "v\n\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005",
    "\n\u0090\n\n\u0003\u000b\u0003\u000b\u0005\u000b\u0094\n\u000b\u0003",
    "\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0005\f\u009d",
    "\n\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f",
    "\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0006",
    "\f\u00af\n\f\r\f\u000e\f\u00b0\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0005\f\u00ba\n\f\u0003\f\u0003\f\u0003\f\u0005\f",
    "\u00bf\n\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0005\f\u00dc\n\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f",
    "\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0005\f\u00e9\n\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\f\u0007\f\u00f0\n\f\f\f\u000e\f\u00f3",
    "\u000b\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0005\r\u00fa\n\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u00ff\n\u000e\f\u000e\u000e",
    "\u000e\u0102\u000b\u000e\u0003\u000e\u0005\u000e\u0105\n\u000e\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005",
    "\u000f\u010d\n\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0005\u000f\u0113\n\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u011b\n\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f",
    "\u0123\n\u000f\u0005\u000f\u0125\n\u000f\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0011\u0005\u0011\u012b\n\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0007\u0012\u0133\n",
    "\u0012\f\u0012\u000e\u0012\u0136\u000b\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u013e\n",
    "\u0013\u0006\u0013\u0140\n\u0013\r\u0013\u000e\u0013\u0141\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0005\u0014\u0148\n\u0014\u0006",
    "\u0014\u014a\n\u0014\r\u0014\u000e\u0014\u014b\u0003\u0014\u0002\u0003",
    "\u0016\u0015\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018",
    "\u001a\u001c\u001e \"$&\u0002\t\u0003\u0002\u0003\u0005\u0003\u0002",
    "\u0007\b\u0003\u0002\u0011\u0016\u0003\u0002\u001c\u001e\u0003\u0002",
    "\u001f \u0003\u0002!&\u0003\u0002\'(\u0180\u0002)\u0003\u0002\u0002",
    "\u0002\u00043\u0003\u0002\u0002\u0002\u0006h\u0003\u0002\u0002\u0002",
    "\bj\u0003\u0002\u0002\u0002\nu\u0003\u0002\u0002\u0002\fw\u0003\u0002",
    "\u0002\u0002\u000ey\u0003\u0002\u0002\u0002\u0010}\u0003\u0002\u0002",
    "\u0002\u0012\u008f\u0003\u0002\u0002\u0002\u0014\u0091\u0003\u0002\u0002",
    "\u0002\u0016\u00be\u0003\u0002\u0002\u0002\u0018\u00f9\u0003\u0002\u0002",
    "\u0002\u001a\u00fb\u0003\u0002\u0002\u0002\u001c\u0124\u0003\u0002\u0002",
    "\u0002\u001e\u0126\u0003\u0002\u0002\u0002 \u012a\u0003\u0002\u0002",
    "\u0002\"\u012e\u0003\u0002\u0002\u0002$\u013f\u0003\u0002\u0002\u0002",
    "&\u0149\u0003\u0002\u0002\u0002(*\u0005\b\u0005\u0002)(\u0003\u0002",
    "\u0002\u0002*+\u0003\u0002\u0002\u0002+)\u0003\u0002\u0002\u0002+,\u0003",
    "\u0002\u0002\u0002,-\u0003\u0002\u0002\u0002-.\u0007\u0002\u0002\u0003",
    ".\u0003\u0003\u0002\u0002\u0002/4\u0005\u0006\u0004\u000201\u0005\u0006",
    "\u0004\u000212\u0005\u0004\u0003\u000224\u0003\u0002\u0002\u00023/\u0003",
    "\u0002\u0002\u000230\u0003\u0002\u0002\u00024\u0005\u0003\u0002\u0002",
    "\u00025i\u0005\b\u0005\u000268\t\u0002\u0002\u000279\u0005\u001a\u000e",
    "\u000287\u0003\u0002\u0002\u000289\u0003\u0002\u0002\u00029:\u0003\u0002",
    "\u0002\u0002:i\u0007\u0006\u0002\u0002;<\u0005\u0016\f\u0002<=\u0005",
    "\u0010\t\u0002=>\u0005\u0016\f\u0002>?\u0007\u0006\u0002\u0002?i\u0003",
    "\u0002\u0002\u0002@A\u0005\u0016\f\u0002AB\t\u0003\u0002\u0002BC\u0007",
    "\u0006\u0002\u0002Ci\u0003\u0002\u0002\u0002Di\u0005\u0012\n\u0002E",
    "F\u0005\u0016\f\u0002FH\u0007\t\u0002\u0002GI\u0005\u001a\u000e\u0002",
    "HG\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002\u0002IJ\u0003\u0002\u0002",
    "\u0002JK\u0007\n\u0002\u0002KL\u0005\n\u0006\u0002Li\u0003\u0002\u0002",
    "\u0002MN\u0007\u000b\u0002\u0002NO\u0005\u0016\f\u0002OQ\u0007\t\u0002",
    "\u0002PR\u0005\u001a\u000e\u0002QP\u0003\u0002\u0002\u0002QR\u0003\u0002",
    "\u0002\u0002RS\u0003\u0002\u0002\u0002ST\u0007\n\u0002\u0002TU\u0005",
    "\n\u0006\u0002Ui\u0003\u0002\u0002\u0002VW\u0007\f\u0002\u0002WX\u0005",
    "\u0016\f\u0002XY\u0005\u001e\u0010\u0002YZ\u0007\u0006\u0002\u0002Z",
    "i\u0003\u0002\u0002\u0002[\\\u0005\u0016\f\u0002\\]\u0007\r\u0002\u0002",
    "]^\u0005\u0016\f\u0002^_\u0007\u0006\u0002\u0002_i\u0003\u0002\u0002",
    "\u0002`a\u0007\u000e\u0002\u0002ab\u0005\u0016\f\u0002bc\u0005\u0014",
    "\u000b\u0002ci\u0003\u0002\u0002\u0002de\u0007\u000f\u0002\u0002ef\u0005",
    "\u0016\f\u0002fg\u0005\u0016\f\u0002gi\u0003\u0002\u0002\u0002h5\u0003",
    "\u0002\u0002\u0002h6\u0003\u0002\u0002\u0002h;\u0003\u0002\u0002\u0002",
    "h@\u0003\u0002\u0002\u0002hD\u0003\u0002\u0002\u0002hE\u0003\u0002\u0002",
    "\u0002hM\u0003\u0002\u0002\u0002hV\u0003\u0002\u0002\u0002h[\u0003\u0002",
    "\u0002\u0002h`\u0003\u0002\u0002\u0002hd\u0003\u0002\u0002\u0002i\u0007",
    "\u0003\u0002\u0002\u0002jk\u0007?\u0002\u0002kl\u0007\u0010\u0002\u0002",
    "lm\u0005\u0016\f\u0002mn\u0007\u0006\u0002\u0002n\t\u0003\u0002\u0002",
    "\u0002ov\u0007\u0006\u0002\u0002pv\u0005\f\u0007\u0002qv\u0005\u000e",
    "\b\u0002rs\u0005\f\u0007\u0002st\u0005\u000e\b\u0002tv\u0003\u0002\u0002",
    "\u0002uo\u0003\u0002\u0002\u0002up\u0003\u0002\u0002\u0002uq\u0003\u0002",
    "\u0002\u0002ur\u0003\u0002\u0002\u0002v\u000b\u0003\u0002\u0002\u0002",
    "wx\u0005\u001e\u0010\u0002x\r\u0003\u0002\u0002\u0002yz\u0007\f\u0002",
    "\u0002z{\u0007\u0004\u0002\u0002{|\u0005\u001e\u0010\u0002|\u000f\u0003",
    "\u0002\u0002\u0002}~\t\u0004\u0002\u0002~\u0011\u0003\u0002\u0002\u0002",
    "\u007f\u0080\u0007\u0017\u0002\u0002\u0080\u0081\u0005\u0016\f\u0002",
    "\u0081\u0082\u0005\u0014\u000b\u0002\u0082\u0090\u0003\u0002\u0002\u0002",
    "\u0083\u0084\u0007\u0017\u0002\u0002\u0084\u0085\u0005\u0016\f\u0002",
    "\u0085\u0086\u0005\u0014\u000b\u0002\u0086\u0087\u0007\u0018\u0002\u0002",
    "\u0087\u0088\u0005\u0014\u000b\u0002\u0088\u0090\u0003\u0002\u0002\u0002",
    "\u0089\u008a\u0007\u0017\u0002\u0002\u008a\u008b\u0005\u0016\f\u0002",
    "\u008b\u008c\u0005\u0014\u000b\u0002\u008c\u008d\u0007\u0018\u0002\u0002",
    "\u008d\u008e\u0005\u0012\n\u0002\u008e\u0090\u0003\u0002\u0002\u0002",
    "\u008f\u007f\u0003\u0002\u0002\u0002\u008f\u0083\u0003\u0002\u0002\u0002",
    "\u008f\u0089\u0003\u0002\u0002\u0002\u0090\u0013\u0003\u0002\u0002\u0002",
    "\u0091\u0093\u00078\u0002\u0002\u0092\u0094\u0005\u0004\u0003\u0002",
    "\u0093\u0092\u0003\u0002\u0002\u0002\u0093\u0094\u0003\u0002\u0002\u0002",
    "\u0094\u0095\u0003\u0002\u0002\u0002\u0095\u0096\u00079\u0002\u0002",
    "\u0096\u0015\u0003\u0002\u0002\u0002\u0097\u0098\b\f\u0001\u0002\u0098",
    "\u0099\u0007\u000b\u0002\u0002\u0099\u009a\u0005\u0016\f\u0002\u009a",
    "\u009c\u0007\t\u0002\u0002\u009b\u009d\u0005\u001a\u000e\u0002\u009c",
    "\u009b\u0003\u0002\u0002\u0002\u009c\u009d\u0003\u0002\u0002\u0002\u009d",
    "\u009e\u0003\u0002\u0002\u0002\u009e\u009f\u0007\n\u0002\u0002\u009f",
    "\u00bf\u0003\u0002\u0002\u0002\u00a0\u00a1\u0007\u0019\u0002\u0002\u00a1",
    "\u00bf\u0005\u0016\f\u0015\u00a2\u00a3\u0007\u001a\u0002\u0002\u00a3",
    "\u00bf\u0005\u0016\f\u0014\u00a4\u00a5\u0007\u001b\u0002\u0002\u00a5",
    "\u00bf\u0005\u0016\f\u0013\u00a6\u00a7\u0007\t\u0002\u0002\u00a7\u00a8",
    "\u0005\u0016\f\u0002\u00a8\u00a9\u0007\n\u0002\u0002\u00a9\u00bf\u0003",
    "\u0002\u0002\u0002\u00aa\u00ab\u0007\t\u0002\u0002\u00ab\u00ae\u0007",
    "?\u0002\u0002\u00ac\u00ad\u00070\u0002\u0002\u00ad\u00af\u0007?\u0002",
    "\u0002\u00ae\u00ac\u0003\u0002\u0002\u0002\u00af\u00b0\u0003\u0002\u0002",
    "\u0002\u00b0\u00ae\u0003\u0002\u0002\u0002\u00b0\u00b1\u0003\u0002\u0002",
    "\u0002\u00b1\u00b2\u0003\u0002\u0002\u0002\u00b2\u00bf\u0007\n\u0002",
    "\u0002\u00b3\u00b4\u0007A\u0002\u0002\u00b4\u00b5\u0005\u0018\r\u0002",
    "\u00b5\u00b6\u0007C\u0002\u0002\u00b6\u00bf\u0003\u0002\u0002\u0002",
    "\u00b7\u00bf\u0005\u001c\u000f\u0002\u00b8\u00ba\u0007?\u0002\u0002",
    "\u00b9\u00b8\u0003\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002\u0002\u0002",
    "\u00ba\u00bb\u0003\u0002\u0002\u0002\u00bb\u00bc\u00071\u0002\u0002",
    "\u00bc\u00bf\u0007?\u0002\u0002\u00bd\u00bf\u0007?\u0002\u0002\u00be",
    "\u0097\u0003\u0002\u0002\u0002\u00be\u00a0\u0003\u0002\u0002\u0002\u00be",
    "\u00a2\u0003\u0002\u0002\u0002\u00be\u00a4\u0003\u0002\u0002\u0002\u00be",
    "\u00a6\u0003\u0002\u0002\u0002\u00be\u00aa\u0003\u0002\u0002\u0002\u00be",
    "\u00b3\u0003\u0002\u0002\u0002\u00be\u00b7\u0003\u0002\u0002\u0002\u00be",
    "\u00b9\u0003\u0002\u0002\u0002\u00be\u00bd\u0003\u0002\u0002\u0002\u00bf",
    "\u00f1\u0003\u0002\u0002\u0002\u00c0\u00c1\f\u0012\u0002\u0002\u00c1",
    "\u00c2\t\u0005\u0002\u0002\u00c2\u00f0\u0005\u0016\f\u0013\u00c3\u00c4",
    "\f\u0011\u0002\u0002\u00c4\u00c5\t\u0006\u0002\u0002\u00c5\u00f0\u0005",
    "\u0016\f\u0012\u00c6\u00c7\f\u0010\u0002\u0002\u00c7\u00c8\t\u0007\u0002",
    "\u0002\u00c8\u00f0\u0005\u0016\f\u0011\u00c9\u00ca\f\u000f\u0002\u0002",
    "\u00ca\u00cb\t\b\u0002\u0002\u00cb\u00f0\u0005\u0016\f\u0010\u00cc\u00cd",
    "\f\u000e\u0002\u0002\u00cd\u00ce\u0007)\u0002\u0002\u00ce\u00f0\u0005",
    "\u0016\f\u000f\u00cf\u00d0\f\r\u0002\u0002\u00d0\u00d1\u0007*\u0002",
    "\u0002\u00d1\u00d2\u0005\u0016\f\u0002\u00d2\u00d3\u0007=\u0002\u0002",
    "\u00d3\u00d4\u0005\u0016\f\u000e\u00d4\u00f0\u0003\u0002\u0002\u0002",
    "\u00d5\u00d6\f\f\u0002\u0002\u00d6\u00d7\u0007+\u0002\u0002\u00d7\u00f0",
    "\u0005\u0016\f\r\u00d8\u00d9\f\u0017\u0002\u0002\u00d9\u00db\u0007\t",
    "\u0002\u0002\u00da\u00dc\u0005\u001a\u000e\u0002\u00db\u00da\u0003\u0002",
    "\u0002\u0002\u00db\u00dc\u0003\u0002\u0002\u0002\u00dc\u00dd\u0003\u0002",
    "\u0002\u0002\u00dd\u00f0\u0007\n\u0002\u0002\u00de\u00df\f\n\u0002\u0002",
    "\u00df\u00e0\u0007,\u0002\u0002\u00e0\u00e1\u0005\u0016\f\u0002\u00e1",
    "\u00e2\u0007-\u0002\u0002\u00e2\u00f0\u0003\u0002\u0002\u0002\u00e3",
    "\u00e4\f\t\u0002\u0002\u00e4\u00e5\u0007,\u0002\u0002\u00e5\u00e6\u0005",
    "\u0016\f\u0002\u00e6\u00e8\u0007.\u0002\u0002\u00e7\u00e9\u0005\u0016",
    "\f\u0002\u00e8\u00e7\u0003\u0002\u0002\u0002\u00e8\u00e9\u0003\u0002",
    "\u0002\u0002\u00e9\u00ea\u0003\u0002\u0002\u0002\u00ea\u00eb\u0007-",
    "\u0002\u0002\u00eb\u00f0\u0003\u0002\u0002\u0002\u00ec\u00ed\f\b\u0002",
    "\u0002\u00ed\u00ee\u0007/\u0002\u0002\u00ee\u00f0\u0007?\u0002\u0002",
    "\u00ef\u00c0\u0003\u0002\u0002\u0002\u00ef\u00c3\u0003\u0002\u0002\u0002",
    "\u00ef\u00c6\u0003\u0002\u0002\u0002\u00ef\u00c9\u0003\u0002\u0002\u0002",
    "\u00ef\u00cc\u0003\u0002\u0002\u0002\u00ef\u00cf\u0003\u0002\u0002\u0002",
    "\u00ef\u00d5\u0003\u0002\u0002\u0002\u00ef\u00d8\u0003\u0002\u0002\u0002",
    "\u00ef\u00de\u0003\u0002\u0002\u0002\u00ef\u00e3\u0003\u0002\u0002\u0002",
    "\u00ef\u00ec\u0003\u0002\u0002\u0002\u00f0\u00f3\u0003\u0002\u0002\u0002",
    "\u00f1\u00ef\u0003\u0002\u0002\u0002\u00f1\u00f2\u0003\u0002\u0002\u0002",
    "\u00f2\u0017\u0003\u0002\u0002\u0002\u00f3\u00f1\u0003\u0002\u0002\u0002",
    "\u00f4\u00fa\u0005\u0016\f\u0002\u00f5\u00f6\u0005\u0016\f\u0002\u00f6",
    "\u00f7\u0007B\u0002\u0002\u00f7\u00f8\u0005\u0018\r\u0002\u00f8\u00fa",
    "\u0003\u0002\u0002\u0002\u00f9\u00f4\u0003\u0002\u0002\u0002\u00f9\u00f5",
    "\u0003\u0002\u0002\u0002\u00fa\u0019\u0003\u0002\u0002\u0002\u00fb\u0100",
    "\u0005\u0016\f\u0002\u00fc\u00fd\u00070\u0002\u0002\u00fd\u00ff\u0005",
    "\u0016\f\u0002\u00fe\u00fc\u0003\u0002\u0002\u0002\u00ff\u0102\u0003",
    "\u0002\u0002\u0002\u0100\u00fe\u0003\u0002\u0002\u0002\u0100\u0101\u0003",
    "\u0002\u0002\u0002\u0101\u0104\u0003\u0002\u0002\u0002\u0102\u0100\u0003",
    "\u0002\u0002\u0002\u0103\u0105\u00070\u0002\u0002\u0104\u0103\u0003",
    "\u0002\u0002\u0002\u0104\u0105\u0003\u0002\u0002\u0002\u0105\u001b\u0003",
    "\u0002\u0002\u0002\u0106\u0125\u0007:\u0002\u0002\u0107\u0125\u0007",
    ";\u0002\u0002\u0108\u0125\u0007>\u0002\u0002\u0109\u0125\u0007@\u0002",
    "\u0002\u010a\u010c\u0007,\u0002\u0002\u010b\u010d\u0005\u001a\u000e",
    "\u0002\u010c\u010b\u0003\u0002\u0002\u0002\u010c\u010d\u0003\u0002\u0002",
    "\u0002\u010d\u010e\u0003\u0002\u0002\u0002\u010e\u0125\u0007-\u0002",
    "\u0002\u010f\u0112\u0007\t\u0002\u0002\u0110\u0113\u0005$\u0013\u0002",
    "\u0111\u0113\u0005\u001a\u000e\u0002\u0112\u0110\u0003\u0002\u0002\u0002",
    "\u0112\u0111\u0003\u0002\u0002\u0002\u0113\u0114\u0003\u0002\u0002\u0002",
    "\u0114\u0115\u0007\n\u0002\u0002\u0115\u0125\u0003\u0002\u0002\u0002",
    "\u0116\u011a\u00078\u0002\u0002\u0117\u011b\u0007<\u0002\u0002\u0118",
    "\u011b\u0005\u001a\u000e\u0002\u0119\u011b\u0005&\u0014\u0002\u011a",
    "\u0117\u0003\u0002\u0002\u0002\u011a\u0118\u0003\u0002\u0002\u0002\u011a",
    "\u0119\u0003\u0002\u0002\u0002\u011a\u011b\u0003\u0002\u0002\u0002\u011b",
    "\u011c\u0003\u0002\u0002\u0002\u011c\u0125\u00079\u0002\u0002\u011d",
    "\u0125\u0005\u001e\u0010\u0002\u011e\u011f\u00072\u0002\u0002\u011f",
    "\u0125\u0005 \u0011\u0002\u0120\u0122\u00073\u0002\u0002\u0121\u0123",
    "\u0005\"\u0012\u0002\u0122\u0121\u0003\u0002\u0002\u0002\u0122\u0123",
    "\u0003\u0002\u0002\u0002\u0123\u0125\u0003\u0002\u0002\u0002\u0124\u0106",
    "\u0003\u0002\u0002\u0002\u0124\u0107\u0003\u0002\u0002\u0002\u0124\u0108",
    "\u0003\u0002\u0002\u0002\u0124\u0109\u0003\u0002\u0002\u0002\u0124\u010a",
    "\u0003\u0002\u0002\u0002\u0124\u010f\u0003\u0002\u0002\u0002\u0124\u0116",
    "\u0003\u0002\u0002\u0002\u0124\u011d\u0003\u0002\u0002\u0002\u0124\u011e",
    "\u0003\u0002\u0002\u0002\u0124\u0120\u0003\u0002\u0002\u0002\u0125\u001d",
    "\u0003\u0002\u0002\u0002\u0126\u0127\u00074\u0002\u0002\u0127\u0128",
    "\u0005 \u0011\u0002\u0128\u001f\u0003\u0002\u0002\u0002\u0129\u012b",
    "\u0005\"\u0012\u0002\u012a\u0129\u0003\u0002\u0002\u0002\u012a\u012b",
    "\u0003\u0002\u0002\u0002\u012b\u012c\u0003\u0002\u0002\u0002\u012c\u012d",
    "\u0005\u0014\u000b\u0002\u012d!\u0003\u0002\u0002\u0002\u012e\u012f",
    "\u0007\t\u0002\u0002\u012f\u0134\u0007?\u0002\u0002\u0130\u0131\u0007",
    "0\u0002\u0002\u0131\u0133\u0007?\u0002\u0002\u0132\u0130\u0003\u0002",
    "\u0002\u0002\u0133\u0136\u0003\u0002\u0002\u0002\u0134\u0132\u0003\u0002",
    "\u0002\u0002\u0134\u0135\u0003\u0002\u0002\u0002\u0135\u0137\u0003\u0002",
    "\u0002\u0002\u0136\u0134\u0003\u0002\u0002\u0002\u0137\u0138\u0007\n",
    "\u0002\u0002\u0138#\u0003\u0002\u0002\u0002\u0139\u013a\u0007?\u0002",
    "\u0002\u013a\u013b\u0007=\u0002\u0002\u013b\u013d\u0005\u0016\f\u0002",
    "\u013c\u013e\u00070\u0002\u0002\u013d\u013c\u0003\u0002\u0002\u0002",
    "\u013d\u013e\u0003\u0002\u0002\u0002\u013e\u0140\u0003\u0002\u0002\u0002",
    "\u013f\u0139\u0003\u0002\u0002\u0002\u0140\u0141\u0003\u0002\u0002\u0002",
    "\u0141\u013f\u0003\u0002\u0002\u0002\u0141\u0142\u0003\u0002\u0002\u0002",
    "\u0142%\u0003\u0002\u0002\u0002\u0143\u0144\u0005\u0016\f\u0002\u0144",
    "\u0145\u0007<\u0002\u0002\u0145\u0147\u0005\u0016\f\u0002\u0146\u0148",
    "\u00070\u0002\u0002\u0147\u0146\u0003\u0002\u0002\u0002\u0147\u0148",
    "\u0003\u0002\u0002\u0002\u0148\u014a\u0003\u0002\u0002\u0002\u0149\u0143",
    "\u0003\u0002\u0002\u0002\u014a\u014b\u0003\u0002\u0002\u0002\u014b\u0149",
    "\u0003\u0002\u0002\u0002\u014b\u014c\u0003\u0002\u0002\u0002\u014c\'",
    "\u0003\u0002\u0002\u0002!+38HQhu\u008f\u0093\u009c\u00b0\u00b9\u00be",
    "\u00db\u00e8\u00ef\u00f1\u00f9\u0100\u0104\u010c\u0112\u011a\u0122\u0124",
    "\u012a\u0134\u013d\u0141\u0147\u014b"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'reply'", "'fail'", "'substitute'", "';'", "'++'", 
                     "'--'", "'('", "')'", "'@'", "'on'", "'>>'", "'while'", 
                     "'scan'", "'is'", "'='", "'+='", "'-='", "'*='", "'/='", 
                     "'%='", "'if'", "'else'", "'#'", "'not'", "'bytes'", 
                     "'*'", "'/'", "'%'", "'+'", "'-'", "'<'", "'>'", "'<='", 
                     "'>='", "'=='", "'!='", "'and'", "'or'", "'in'", "'?'", 
                     "'><'", "'['", "']'", "'..'", "'.'", "','", "'::'", 
                     "'<->'", "'-<'", "'->'", null, null, null, "'{'", "'}'", 
                     "'nil'", null, "'=>'", "':'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, "WS", "LINE_COMMENT", 
                      "COMMENT", "BEGIN", "END", "NIL", "BOOL", "PAIR_SEP", 
                      "FIELD_SEP", "NUMBER", "ID", "STRING", "INTER_BEGIN", 
                      "INTER_MID", "INTER_END" ];

var ruleNames =  [ "module", "statementList", "statement", "definition", 
                   "handlers", "replyHandler", "failHandler", "assignment_op", 
                   "conditional", "block", "expr", "interpolated", "exprList", 
                   "literal", "sink", "procedure", "paramList", "fieldList", 
                   "pairList" ];

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
loParser.WS = 51;
loParser.LINE_COMMENT = 52;
loParser.COMMENT = 53;
loParser.BEGIN = 54;
loParser.END = 55;
loParser.NIL = 56;
loParser.BOOL = 57;
loParser.PAIR_SEP = 58;
loParser.FIELD_SEP = 59;
loParser.NUMBER = 60;
loParser.ID = 61;
loParser.STRING = 62;
loParser.INTER_BEGIN = 63;
loParser.INTER_MID = 64;
loParser.INTER_END = 65;

loParser.RULE_module = 0;
loParser.RULE_statementList = 1;
loParser.RULE_statement = 2;
loParser.RULE_definition = 3;
loParser.RULE_handlers = 4;
loParser.RULE_replyHandler = 5;
loParser.RULE_failHandler = 6;
loParser.RULE_assignment_op = 7;
loParser.RULE_conditional = 8;
loParser.RULE_block = 9;
loParser.RULE_expr = 10;
loParser.RULE_interpolated = 11;
loParser.RULE_exprList = 12;
loParser.RULE_literal = 13;
loParser.RULE_sink = 14;
loParser.RULE_procedure = 15;
loParser.RULE_paramList = 16;
loParser.RULE_fieldList = 17;
loParser.RULE_pairList = 18;

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
        this.state = 39; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 38;
            this.definition();
            this.state = 41; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===loParser.ID);
        this.state = 43;
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
    this.enterRule(localctx, 2, loParser.RULE_statementList);
    try {
        this.state = 49;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 45;
            this.statement();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 46;
            this.statement();
            this.state = 47;
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


function SubscribeContext(parser, ctx) {
	StatementContext.call(this, parser);
    StatementContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SubscribeContext.prototype = Object.create(StatementContext.prototype);
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
    this.enterRule(localctx, 4, loParser.RULE_statement);
    var _la = 0; // Token type
    try {
        this.state = 102;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
        switch(la_) {
        case 1:
            localctx = new DefStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 51;
            this.definition();
            break;

        case 2:
            localctx = new ResponseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 52;
            localctx.channel = this._input.LT(1);
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__0) | (1 << loParser.T__1) | (1 << loParser.T__2))) !== 0))) {
                localctx.channel = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 54;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0)) {
                this.state = 53;
                this.exprList();
            }

            this.state = 56;
            this.match(loParser.T__3);
            break;

        case 3:
            localctx = new AssignmentContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 57;
            this.expr(0);
            this.state = 58;
            this.assignment_op();
            this.state = 59;
            this.expr(0);
            this.state = 60;
            this.match(loParser.T__3);
            break;

        case 4:
            localctx = new IncDecContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 62;
            this.expr(0);
            this.state = 63;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===loParser.T__4 || _la===loParser.T__5)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
                this.consume();
            }
            this.state = 64;
            this.match(loParser.T__3);
            break;

        case 5:
            localctx = new CondStmtContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 66;
            this.conditional();
            break;

        case 6:
            localctx = new SyncRequestContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 67;
            this.expr(0);
            this.state = 68;
            this.match(loParser.T__6);
            this.state = 70;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0)) {
                this.state = 69;
                this.exprList();
            }

            this.state = 72;
            this.match(loParser.T__7);
            this.state = 73;
            this.handlers();
            break;

        case 7:
            localctx = new AsyncRequestContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 75;
            this.match(loParser.T__8);
            this.state = 76;
            this.expr(0);
            this.state = 77;
            this.match(loParser.T__6);
            this.state = 79;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0)) {
                this.state = 78;
                this.exprList();
            }

            this.state = 81;
            this.match(loParser.T__7);
            this.state = 82;
            this.handlers();
            break;

        case 8:
            localctx = new SubscribeContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 84;
            this.match(loParser.T__9);
            this.state = 85;
            this.expr(0);
            this.state = 86;
            this.sink();
            this.state = 87;
            this.match(loParser.T__3);
            break;

        case 9:
            localctx = new SendContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 89;
            this.expr(0);
            this.state = 90;
            this.match(loParser.T__10);
            this.state = 91;
            this.expr(0);
            this.state = 92;
            this.match(loParser.T__3);
            break;

        case 10:
            localctx = new IterationContext(this, localctx);
            this.enterOuterAlt(localctx, 10);
            this.state = 94;
            this.match(loParser.T__11);
            this.state = 95;
            this.expr(0);
            this.state = 96;
            this.block();
            break;

        case 11:
            localctx = new ScanContext(this, localctx);
            this.enterOuterAlt(localctx, 11);
            this.state = 98;
            this.match(loParser.T__12);
            this.state = 99;
            this.expr(0);
            this.state = 100;
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

DefinitionContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
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
    this.enterRule(localctx, 6, loParser.RULE_definition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 104;
        this.match(loParser.ID);
        this.state = 105;
        this.match(loParser.T__13);
        this.state = 106;
        this.expr(0);
        this.state = 107;
        this.match(loParser.T__3);
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
    this.enterRule(localctx, 8, loParser.RULE_handlers);
    try {
        this.state = 115;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 109;
            this.match(loParser.T__3);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 110;
            this.replyHandler();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 111;
            this.failHandler();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 112;
            this.replyHandler();
            this.state = 113;
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
    this.enterRule(localctx, 10, loParser.RULE_replyHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 117;
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
    this.enterRule(localctx, 12, loParser.RULE_failHandler);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 119;
        this.match(loParser.T__9);
        this.state = 120;
        this.match(loParser.T__1);
        this.state = 121;
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
    this.enterRule(localctx, 14, loParser.RULE_assignment_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 123;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__14) | (1 << loParser.T__15) | (1 << loParser.T__16) | (1 << loParser.T__17) | (1 << loParser.T__18) | (1 << loParser.T__19))) !== 0))) {
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
    this.enterRule(localctx, 16, loParser.RULE_conditional);
    try {
        this.state = 141;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        switch(la_) {
        case 1:
            localctx = new IfOnlyContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 125;
            this.match(loParser.T__20);
            this.state = 126;
            this.expr(0);
            this.state = 127;
            this.block();
            break;

        case 2:
            localctx = new IfElseContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 129;
            this.match(loParser.T__20);
            this.state = 130;
            this.expr(0);
            this.state = 131;
            this.block();
            this.state = 132;
            this.match(loParser.T__21);
            this.state = 133;
            this.block();
            break;

        case 3:
            localctx = new NestedIfContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 135;
            this.match(loParser.T__20);
            this.state = 136;
            this.expr(0);
            this.state = 137;
            this.block();
            this.state = 138;
            this.match(loParser.T__21);
            this.state = 139;
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
    this.enterRule(localctx, 18, loParser.RULE_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 143;
        this.match(loParser.BEGIN);
        this.state = 145;
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__0) | (1 << loParser.T__1) | (1 << loParser.T__2) | (1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__9) | (1 << loParser.T__11) | (1 << loParser.T__12) | (1 << loParser.T__20) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0)) {
            this.state = 144;
            this.statementList();
        }

        this.state = 147;
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


function CondExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CondExprContext.prototype = Object.create(ExprContext.prototype);
CondExprContext.prototype.constructor = CondExprContext;

loParser.CondExprContext = CondExprContext;

CondExprContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
CondExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitCondExpr(this);
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


function LiteralExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LiteralExprContext.prototype = Object.create(ExprContext.prototype);
LiteralExprContext.prototype.constructor = LiteralExprContext;

loParser.LiteralExprContext = LiteralExprContext;

LiteralExprContext.prototype.literal = function() {
    return this.getTypedRuleContext(LiteralContext,0);
};
LiteralExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitLiteralExpr(this);
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


function ModuleRefContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ModuleRefContext.prototype = Object.create(ExprContext.prototype);
ModuleRefContext.prototype.constructor = ModuleRefContext;

loParser.ModuleRefContext = ModuleRefContext;

ModuleRefContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(loParser.ID);
    } else {
        return this.getToken(loParser.ID, i);
    }
};

ModuleRefContext.prototype.accept = function(visitor) {
    if ( visitor instanceof loVisitor ) {
        return visitor.visitModuleRef(this);
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



loParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 20;
    this.enterRecursionRule(localctx, 20, loParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 188;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
        switch(la_) {
        case 1:
            localctx = new AsyncCallContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 150;
            this.match(loParser.T__8);
            this.state = 151;
            this.expr(0);
            this.state = 152;
            this.match(loParser.T__6);
            this.state = 154;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0)) {
                this.state = 153;
                this.exprList();
            }

            this.state = 156;
            this.match(loParser.T__7);
            break;

        case 2:
            localctx = new CardinalityContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 158;
            this.match(loParser.T__22);
            this.state = 159;
            this.expr(19);
            break;

        case 3:
            localctx = new NegationContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 160;
            this.match(loParser.T__23);
            this.state = 161;
            this.expr(18);
            break;

        case 4:
            localctx = new BytesContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 162;
            this.match(loParser.T__24);
            this.state = 163;
            this.expr(17);
            break;

        case 5:
            localctx = new WrapContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 164;
            this.match(loParser.T__6);
            this.state = 165;
            this.expr(0);
            this.state = 166;
            this.match(loParser.T__7);
            break;

        case 6:
            localctx = new DestructureContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 168;
            this.match(loParser.T__6);
            this.state = 169;
            this.match(loParser.ID);
            this.state = 172; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 170;
                this.match(loParser.T__45);
                this.state = 171;
                this.match(loParser.ID);
                this.state = 174; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===loParser.T__45);
            this.state = 176;
            this.match(loParser.T__7);
            break;

        case 7:
            localctx = new DynastringContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 177;
            this.match(loParser.INTER_BEGIN);
            this.state = 178;
            this.interpolated();
            this.state = 179;
            this.match(loParser.INTER_END);
            break;

        case 8:
            localctx = new LiteralExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 181;
            this.literal();
            break;

        case 9:
            localctx = new ModuleRefContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 183;
            _la = this._input.LA(1);
            if(_la===loParser.ID) {
                this.state = 182;
                this.match(loParser.ID);
            }

            this.state = 185;
            this.match(loParser.T__46);
            this.state = 186;
            this.match(loParser.ID);
            break;

        case 10:
            localctx = new IdContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 187;
            this.match(loParser.ID);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 239;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,16,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 237;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 190;
                    if (!( this.precpred(this._ctx, 16))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                    }
                    this.state = 191;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__25) | (1 << loParser.T__26) | (1 << loParser.T__27))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 192;
                    this.expr(17);
                    break;

                case 2:
                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 193;
                    if (!( this.precpred(this._ctx, 15))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 15)");
                    }
                    this.state = 194;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===loParser.T__28 || _la===loParser.T__29)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 195;
                    this.expr(16);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 196;
                    if (!( this.precpred(this._ctx, 14))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                    }
                    this.state = 197;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(((((_la - 31)) & ~0x1f) == 0 && ((1 << (_la - 31)) & ((1 << (loParser.T__30 - 31)) | (1 << (loParser.T__31 - 31)) | (1 << (loParser.T__32 - 31)) | (1 << (loParser.T__33 - 31)) | (1 << (loParser.T__34 - 31)) | (1 << (loParser.T__35 - 31)))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 198;
                    this.expr(15);
                    break;

                case 4:
                    localctx = new LogicalContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 199;
                    if (!( this.precpred(this._ctx, 13))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                    }
                    this.state = 200;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===loParser.T__36 || _la===loParser.T__37)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                        this.consume();
                    }
                    this.state = 201;
                    this.expr(14);
                    break;

                case 5:
                    localctx = new MembershipContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 202;
                    if (!( this.precpred(this._ctx, 12))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                    }
                    this.state = 203;
                    this.match(loParser.T__38);
                    this.state = 204;
                    this.expr(13);
                    break;

                case 6:
                    localctx = new CondExprContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 205;
                    if (!( this.precpred(this._ctx, 11))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
                    }
                    this.state = 206;
                    this.match(loParser.T__39);
                    this.state = 207;
                    this.expr(0);
                    this.state = 208;
                    this.match(loParser.FIELD_SEP);
                    this.state = 209;
                    this.expr(12);
                    break;

                case 7:
                    localctx = new ConcatContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 211;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 212;
                    this.match(loParser.T__40);
                    this.state = 213;
                    this.expr(11);
                    break;

                case 8:
                    localctx = new SyncCallContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 214;
                    if (!( this.precpred(this._ctx, 21))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 21)");
                    }
                    this.state = 215;
                    this.match(loParser.T__6);
                    this.state = 217;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0)) {
                        this.state = 216;
                        this.exprList();
                    }

                    this.state = 219;
                    this.match(loParser.T__7);
                    break;

                case 9:
                    localctx = new SubscriptContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 220;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 221;
                    this.match(loParser.T__41);
                    this.state = 222;
                    this.expr(0);
                    this.state = 223;
                    this.match(loParser.T__42);
                    break;

                case 10:
                    localctx = new SliceContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 225;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 226;
                    this.match(loParser.T__41);
                    this.state = 227;
                    this.expr(0);
                    this.state = 228;
                    this.match(loParser.T__43);
                    this.state = 230;
                    _la = this._input.LA(1);
                    if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0)) {
                        this.state = 229;
                        this.expr(0);
                    }

                    this.state = 232;
                    this.match(loParser.T__42);
                    break;

                case 11:
                    localctx = new SelectContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, loParser.RULE_expr);
                    this.state = 234;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 235;
                    this.match(loParser.T__44);
                    this.state = 236;
                    this.match(loParser.ID);
                    break;

                } 
            }
            this.state = 241;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,16,this._ctx);
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
    this.enterRule(localctx, 22, loParser.RULE_interpolated);
    try {
        this.state = 247;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 242;
            this.expr(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 243;
            this.expr(0);
            this.state = 244;
            this.match(loParser.INTER_MID);
            this.state = 245;
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
    this.enterRule(localctx, 24, loParser.RULE_exprList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 249;
        this.expr(0);
        this.state = 254;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 250;
                this.match(loParser.T__45);
                this.state = 251;
                this.expr(0); 
            }
            this.state = 256;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
        }

        this.state = 258;
        _la = this._input.LA(1);
        if(_la===loParser.T__45) {
            this.state = 257;
            this.match(loParser.T__45);
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
    this.enterRule(localctx, 26, loParser.RULE_literal);
    var _la = 0; // Token type
    try {
        this.state = 290;
        switch(this._input.LA(1)) {
        case loParser.NIL:
            localctx = new NilContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 260;
            this.match(loParser.NIL);
            break;
        case loParser.BOOL:
            localctx = new BoolContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 261;
            this.match(loParser.BOOL);
            break;
        case loParser.NUMBER:
            localctx = new NumberContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 262;
            this.match(loParser.NUMBER);
            break;
        case loParser.STRING:
            localctx = new StringContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 263;
            this.match(loParser.STRING);
            break;
        case loParser.T__41:
            localctx = new ArrayContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 264;
            this.match(loParser.T__41);
            this.state = 266;
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0)) {
                this.state = 265;
                this.exprList();
            }

            this.state = 268;
            this.match(loParser.T__42);
            break;
        case loParser.T__6:
            localctx = new RecordContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 269;
            this.match(loParser.T__6);
            this.state = 272;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
            switch(la_) {
            case 1:
                this.state = 270;
                this.fieldList();
                break;

            case 2:
                this.state = 271;
                this.exprList();
                break;

            }
            this.state = 274;
            this.match(loParser.T__7);
            break;
        case loParser.BEGIN:
            localctx = new SetContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 276;
            this.match(loParser.BEGIN);
            this.state = 280;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
            if(la_===1) {
                this.state = 277;
                localctx.sep = this.match(loParser.PAIR_SEP);

            } else if(la_===2) {
                this.state = 278;
                this.exprList();

            } else if(la_===3) {
                this.state = 279;
                this.pairList();

            }
            this.state = 282;
            this.match(loParser.END);
            break;
        case loParser.T__49:
            localctx = new HandlerContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 283;
            this.sink();
            break;
        case loParser.T__47:
            localctx = new ServiceContext(this, localctx);
            this.enterOuterAlt(localctx, 9);
            this.state = 284;
            this.match(loParser.T__47);
            this.state = 285;
            this.procedure();
            break;
        case loParser.T__48:
            localctx = new EventContext(this, localctx);
            this.enterOuterAlt(localctx, 10);
            this.state = 286;
            this.match(loParser.T__48);
            this.state = 288;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
            if(la_===1) {
                this.state = 287;
                this.paramList();

            }
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
    this.enterRule(localctx, 28, loParser.RULE_sink);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 292;
        this.match(loParser.T__49);
        this.state = 293;
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
    this.enterRule(localctx, 30, loParser.RULE_procedure);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 296;
        _la = this._input.LA(1);
        if(_la===loParser.T__6) {
            this.state = 295;
            this.paramList();
        }

        this.state = 298;
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
    this.enterRule(localctx, 32, loParser.RULE_paramList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 300;
        this.match(loParser.T__6);
        this.state = 301;
        this.match(loParser.ID);
        this.state = 306;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===loParser.T__45) {
            this.state = 302;
            this.match(loParser.T__45);
            this.state = 303;
            this.match(loParser.ID);
            this.state = 308;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 309;
        this.match(loParser.T__7);
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
    this.enterRule(localctx, 34, loParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 317; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 311;
            this.match(loParser.ID);
            this.state = 312;
            this.match(loParser.FIELD_SEP);
            this.state = 313;
            this.expr(0);
            this.state = 315;
            _la = this._input.LA(1);
            if(_la===loParser.T__45) {
                this.state = 314;
                this.match(loParser.T__45);
            }

            this.state = 319; 
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
    this.enterRule(localctx, 36, loParser.RULE_pairList);
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
            this.match(loParser.PAIR_SEP);
            this.state = 323;
            this.expr(0);
            this.state = 325;
            _la = this._input.LA(1);
            if(_la===loParser.T__45) {
                this.state = 324;
                this.match(loParser.T__45);
            }

            this.state = 329; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << loParser.T__6) | (1 << loParser.T__8) | (1 << loParser.T__22) | (1 << loParser.T__23) | (1 << loParser.T__24))) !== 0) || ((((_la - 42)) & ~0x1f) == 0 && ((1 << (_la - 42)) & ((1 << (loParser.T__41 - 42)) | (1 << (loParser.T__46 - 42)) | (1 << (loParser.T__47 - 42)) | (1 << (loParser.T__48 - 42)) | (1 << (loParser.T__49 - 42)) | (1 << (loParser.BEGIN - 42)) | (1 << (loParser.NIL - 42)) | (1 << (loParser.BOOL - 42)) | (1 << (loParser.NUMBER - 42)) | (1 << (loParser.ID - 42)) | (1 << (loParser.STRING - 42)) | (1 << (loParser.INTER_BEGIN - 42)))) !== 0));
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
	case 10:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

loParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 16);
		case 1:
			return this.precpred(this._ctx, 15);
		case 2:
			return this.precpred(this._ctx, 14);
		case 3:
			return this.precpred(this._ctx, 13);
		case 4:
			return this.precpred(this._ctx, 12);
		case 5:
			return this.precpred(this._ctx, 11);
		case 6:
			return this.precpred(this._ctx, 10);
		case 7:
			return this.precpred(this._ctx, 21);
		case 8:
			return this.precpred(this._ctx, 8);
		case 9:
			return this.precpred(this._ctx, 7);
		case 10:
			return this.precpred(this._ctx, 6);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.loParser = loParser;
