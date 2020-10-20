(function($) {
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		a256 = "",
		r64 = [256],
		r256 = [256],
		i = 0;
	var UTF8 = {
		encode: function(strUni) {
			var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function(c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(192 | cc >> 6, 128 | cc & 63)
			}).replace(/[\u0800-\uffff]/g, function(c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(224 | cc >> 12, 128 | cc >> 6 & 63, 128 | cc & 63)
			});
			return strUtf
		},
		decode: function(strUtf) {
			var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(c) {
				var cc = ((c.charCodeAt(0) & 15) << 12) | ((c.charCodeAt(1) & 63) << 6) | (c.charCodeAt(2) & 63);
				return String.fromCharCode(cc)
			}).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(c) {
				var cc = (c.charCodeAt(0) & 31) << 6 | c.charCodeAt(1) & 63;
				return String.fromCharCode(cc)
			});
			return strUni
		}
	};
	while(i < 256) {
		var c = String.fromCharCode(i);
		a256 += c;
		r256[i] = i;
		r64[i] = b64.indexOf(c);
		++i
	}

	function code(s, discard, alpha, beta, w1, w2) {
		s = String(s);
		var buffer = 0,
			i = 0,
			length = s.length,
			result = "",
			bitsInBuffer = 0;
		while(i < length) {
			var c = s.charCodeAt(i);
			c = c < 256 ? alpha[c] : -1;
			buffer = (buffer << w1) + c;
			bitsInBuffer += w1;
			while(bitsInBuffer >= w2) {
				bitsInBuffer -= w2;
				var tmp = buffer >> bitsInBuffer;
				result += beta.charAt(tmp);
				buffer ^= tmp << bitsInBuffer
			}++i
		}
		if(!discard && bitsInBuffer > 0) {
			result += beta.charAt(buffer << (w2 - bitsInBuffer))
		}
		return result
	}
	var Plugin = $.base64 = function(dir, input, encode) {
		return input ? Plugin[dir](input, encode) : dir ? null : this
	};
	Plugin.btoa = Plugin.encode = function(plain, utf8encode) {
		plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
		plain = code(plain, false, r256, b64, 8, 6);
		return plain + "====".slice((plain.length % 4) || 4)
	};
	Plugin.atob = Plugin.decode = function(coded, utf8decode) {
		coded = coded.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		coded = String(coded).split("=");
		var i = coded.length;
		do {
			--i;
			coded[i] = code(coded[i], true, r64, a256, 6, 8)
		} while (i > 0);
		coded = coded.join("");
		return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded
	}
}(jQuery));
(function(a) {
	a.fn.extend({
		insertArea: function(i, j) {
			var g = a(this)[0];
			if(document.selection) {
				this.focus();
				var d = document.selection.createRange();
				d.text = i;
				this.focus();
				d.moveStart("character", -e);
				var f = d.text.length;
				if(arguments.length == 2) {
					var e = g.value.length;
					d.moveEnd("character", f + j);
					j <= 0 ? d.moveStart("character", f - 2 * j - i.length) : d.moveStart("character", f - j - i.length);
					d.select()
				}
			} else {
				if(g.selectionStart || g.selectionStart == "0") {
					var h = g.selectionStart;
					var b = g.selectionEnd;
					var c = g.scrollTop;
					g.value = g.value.substring(0, h) + i + g.value.substring(b, g.value.length);
					this.focus();
					g.selectionStart = h + i.length;
					g.selectionEnd = h + i.length;
					g.scrollTop = c;
					if(arguments.length == 2) {
						g.setSelectionRange(h - j, g.selectionEnd + j);
						this.focus()
					}
				} else {
					this.value += i;
					this.focus()
				}
			}
		}
	})
})(jQuery);
var jdc_css = '#jdcmath-main .jdcmath-tab-item ul{float:left;width:100%}#jdcmath-main li{float:left;list-style:none}#jdcmath-main .jdcmath-tab-item{border:solid #e1e6e6 1px;background-color:white}#jdcmath-main .jdcmath-tab-box li{cursor:pointer}#jdcmath-main .jdcmath-tab-box li.jdcmath-item-icon-active{background-color:white;border-top:solid #647D88 1px;border-left:solid #647D88 1px;border-right:solid #647D88 1px;border-radius:4px 4px 0 0;color:#000}#jdcmath-main .jdcmath-tab-box{padding:0 0 0 5px;background-color:#647D88}#jdcmath-main .jdcmath-tab-box li{padding:2px;margin-top:5px;padding-bottom:5px;width:80px;text-align:center;line-height:20px;color:#fff;}#jdcmath-main .jdcmath-content-box li:hover{border-color:#778e9a;cursor:pointer}#jdcmath-main .jdcmath-content-box li{border:1px solid #d7d7d7;border-radius:3px;width:32px;height:32px;margin:5px;background-image:url(' + KindEditor.basePath + 'plugins/jdcmath/icons.png);background-repeat:no-repeat}#jdcmath-main .jdcmath-content-box div.jdcmath-content-item-box ul.jdcmath-content-item-icon{padding:0}#jdcmath-main #math-box{padding:5px}#jdcmath-main .latex-div{margin:15px 10px 5px 5px;clear:both;border:1px solid #d7d7d7}#jdcmath-main .latex-div textarea{border:0;width:100%;padding:0;margin:0}#jdcmath-main .about a{color:#555}#jdcmath-main .about{position:absolute;left:15px;bottom:5px;margin-top:15px;}';
var jdc_html = '<div id="jdcmath-main"><div class="jdcmath-tab-item"><ul class="jdcmath-tab-box"></ul><div class="jdcmath-content-box"></div></div><div class="latex-div"><textarea rows="5" id="latex-area" autocomplete="off"></textarea></div><div id="math-box"><p id="mathImg"></p><p>&nbsp;</p></div><div class="about"><a href="#" target="_blank">码平台公式编辑器v1.0.0</a></div></div>';
var jdc_fun = function() {
	$(".jdcmath-tab-box li").click(function() {
		$(".jdcmath-content-box div.jdcmath-content-item-box").hide();
		var n = 0;
		var obj = this;
		$(".jdcmath-tab-box li").each(function(i, o) {
			if(obj == o) {
				n = i;
			}
		});
		$(".jdcmath-tab-box li").removeClass("jdcmath-item-icon-active");
		$(obj).addClass("jdcmath-item-icon-active");
		$(".jdcmath-content-box div.jdcmath-content-item-box:eq(" + n + ")").show();
	});
	$(".jdcmath-tab-box li:eq(0)").click();
	loadLatex();
}
var jdcMath = [{
		group_id: 0,
		text: "常用公式",
		item: [{
				x: 15,
				y: 0,
				eq: '{x}^{a}'
			},
			{
				x: 15,
				y: 1,
				eq: '{x}_{a}'
			},
			{
				x: 15,
				y: 2,
				eq: 'x_{a}^{b}'
			},
			{
				x: 15,
				y: 4,
				eq: '{a}/{b} '
			},
			{
				x: 15,
				y: 3,
				eq: '_{}^{}\\\\textrm{}'
			},
			{
				x: 15,
				y: 5,
				eq: '\\\\frac{}{}'
			},
			{
				x: 15,
				y: 6,
				eq: '\\\\tfrac{}{}'
			},
			{
				x: 15,
				y: 7,
				eq: '\\\\frac{\\\\partial }{\\\\partial x}'
			},
			{
				x: 15,
				y: 8,
				eq: '\\\\frac{\\\\partial^2 }{\\\\partial x^2}'
			},
			{
				x: 15,
				y: 9,
				eq: '\\\\frac{\\\\mathrm{d} }{\\\\mathrm{d} x}'
			},
			{
				x: 15,
				y: 10,
				eq: '\\\\int '
			},
			{
				x: 15,
				y: 11,
				eq: '\\\\int_{}^{}'
			},
			{
				x: 15,
				y: 12,
				eq: '\\\\oint '
			},
			{
				x: 15,
				y: 13,
				eq: '\\\\oint_{}^{}'
			},
			{
				x: 15,
				y: 14,
				eq: '\\\\iint_{}^{}'
			},
			{
				x: 16,
				y: 1,
				eq: '\\\\bigcap '
			},
			{
				x: 16,
				y: 2,
				eq: '\\\\bigcap_{}^{}'
			},
			{
				x: 16,
				y: 3,
				eq: '\\\\bigcup '
			},
			{
				x: 16,
				y: 4,
				eq: '\\\\bigcup_{}^{}'
			},
			{
				x: 16,
				y: 5,
				eq: '\\\\lim_{}'
			},
			{
				x: 16,
				y: 7,
				eq: '\\\\sum_{}^{}'
			},
			{
				x: 16,
				y: 8,
				eq: '\\\\sum '
			},
			{
				x: 16,
				y: 9,
				eq: '\\\\sqrt{}'
			},
			{
				x: 16,
				y: 10,
				eq: '\\\\sqrt[]{}'
			},
			{
				x: 16,
				y: 13,
				eq: '\\\\prod '
			},
			{
				x: 16,
				y: 16,
				eq: '\\\\coprod '
			},
			{
				x: 16,
				y: 14,
				eq: '\\\\prod_{}^{}'
			},
			{
				x: 16,
				y: 15,
				eq: '\\\\coprod_{}^{}'
			}
		]
	},
	{
		group_id: 1,
		text: "算术符号",
		item: [{
				x: 0,
				y: 0,
				eq: '\\\\neg '
			},
			{
				x: 2,
				y: 2,
				eq: '\\\\times '
			},
			{
				x: 2,
				y: 3,
				eq: '\\\\div '
			},
			{
				x: 15,
				y: 4,
				eq: '{a}/{b} '
			},
			{
				x: 2,
				y: 4,
				eq: '\\\\cdot '
			},
			{
				x: 2,
				y: 5,
				eq: '\\\\ast '
			},
			{
				x: 2,
				y: 6,
				eq: '\\\\setminus '
			},
			{
				x: 2,
				y: 7,
				eq: '\\\\dotplus '
			},
			{
				x: 2,
				y: 8,
				eq: '\\\\mp '
			},
			{
				x: 2,
				y: 9,
				eq: '\\\\pm '
			},
			{
				x: 2,
				y: 10,
				eq: '\\\\oplus '
			},
			{
				x: 2,
				y: 11,
				eq: '\\\\otimes '
			},
			{
				x: 2,
				y: 12,
				eq: '\\\\circledast '
			},
			{
				x: 2,
				y: 13,
				eq: '\\\\oslash '
			},
			{
				x: 2,
				y: 14,
				eq: '\\\\bigotimes '
			},
			{
				x: 2,
				y: 15,
				eq: '\\\\circledcirc '
			},
			{
				x: 2,
				y: 16,
				eq: '\\\\ominus '
			},
			{
				x: 2,
				y: 17,
				eq: '\\\\odot '
			},
			{
				x: 2,
				y: 18,
				eq: '\\\\bigodot '
			},
			{
				x: 2,
				y: 20,
				eq: '\\\\circleddash '
			},
			{
				x: 2,
				y: 21,
				eq: '\\\\bigoplus '
			},
			{
				x: 0,
				y: 5,
				eq: '\\\\Cap '
			},
			{
				x: 0,
				y: 6,
				eq: '\\\\Cup '
			},
			{
				x: 0,
				y: 7,
				eq: '\\\\cup '
			},
			{
				x: 0,
				y: 8,
				eq: '\\\\cap '
			},
			{
				x: 0,
				y: 9,
				eq: '\\\\wr '
			},
			{
				x: 1,
				y: 0,
				eq: '\\\\circ '
			},
			{
				x: 1,
				y: 1,
				eq: '\\\\bigcirc '
			},
			{
				x: 1,
				y: 2,
				eq: '\\\\triangledown '
			},
			{
				x: 1,
				y: 3,
				eq: '\\\\triangle '
			},
			{
				x: 1,
				y: 4,
				eq: '\\\\triangleleft '
			},
			{
				x: 1,
				y: 5,
				eq: '\\\\triangleright '
			},
			{
				x: 1,
				y: 6,
				eq: '\\\\blacktriangle '
			},
			{
				x: 1,
				y: 8,
				eq: '\\\\square '
			},
			{
				x: 1,
				y: 9,
				eq: '\\\\blacksquare '
			},
			{
				x: 1,
				y: 10,
				eq: '\\\\vee '
			},
			{
				x: 1,
				y: 11,
				eq: '\\\\wedge '
			},
			{
				x: 1,
				y: 12,
				eq: '\\\\veebar '
			},
			{
				x: 1,
				y: 13,
				eq: '\\\\barwedge '
			},
			{
				x: 1,
				y: 14,
				eq: '\\\\lozenge '
			},
			{
				x: 0,
				y: 10,
				eq: '\\\\diamond '
			},
			{
				x: 0,
				y: 11,
				eq: '\\\\blacklozenge '
			},
			{
				x: 1,
				y: 15,
				eq: '\\\\sqcap '
			},
			{
				x: 1,
				y: 16,
				eq: '\\\\sqcup '
			},
			{
				x: 1,
				y: 17,
				eq: '\\\\bigsqcup '
			},
			{
				x: 1,
				y: 7,
				eq: '\\\\star '
			},
			{
				x: 1,
				y: 19,
				eq: '\\\\bigstar '
			},
			{
				x: 1,
				y: 20,
				eq: '\\\\dagger '
			},
			{
				x: 1,
				y: 21,
				eq: '\\\\ddagger '
			}
		]
	},
	{
		group_id: 2,
		text: "逻辑符号",
		item: [{
				x: 10,
				y: 0,
				eq: '< '
			},
			{
				x: 10,
				y: 1,
				eq: '> '
			},
			{
				x: 10,
				y: 2,
				eq: '= '
			},
			{
				x: 10,
				y: 3,
				eq: '\\\\leq '
			},
			{
				x: 10,
				y: 4,
				eq: '\\\\geq '
			},
			{
				x: 10,
				y: 5,
				eq: '\\\\doteq '
			},
			{
				x: 10,
				y: 6,
				eq: '\\\\leqslant '
			},
			{
				x: 10,
				y: 7,
				eq: '\\\\geqslant '
			},
			{
				x: 10,
				y: 8,
				eq: '\\\\equiv '
			},
			{
				x: 10,
				y: 9,
				eq: '\\\\nless '
			},
			{
				x: 10,
				y: 10,
				eq: '\\\\ngtr '
			},
			{
				x: 10,
				y: 11,
				eq: '\\\\neq '
			},
			{
				x: 10,
				y: 12,
				eq: '\\\\nleqslant '
			},
			{
				x: 10,
				y: 13,
				eq: '\\\\ngeqslant '
			},
			{
				x: 10,
				y: 14,
				eq: '\\\\not\\\\equiv '
			},
			{
				x: 10,
				y: 15,
				eq: '\\\\prec '
			},
			{
				x: 10,
				y: 16,
				eq: '\\\\succ '
			},
			{
				x: 10,
				y: 17,
				eq: '\\\\preceq '
			},
			{
				x: 10,
				y: 18,
				eq: '\\\\succeq '
			},
			{
				x: 11,
				y: 0,
				eq: '\\\\sim '
			},
			{
				x: 11,
				y: 1,
				eq: '\\\\ll '
			},
			{
				x: 11,
				y: 2,
				eq: '\\\\gg '
			},
			{
				x: 11,
				y: 3,
				eq: '\\\\approx '
			},
			{
				x: 11,
				y: 4,
				eq: '\\\\simeq '
			},
			{
				x: 11,
				y: 5,
				eq: '\\\\cong '
			},
			{
				x: 11,
				y: 6,
				eq: '\\\\asymp '
			},
			{
				x: 11,
				y: 7,
				eq: '\\\\smile '
			},
			{
				x: 11,
				y: 8,
				eq: '\\\\frown '
			},
			{
				x: 11,
				y: 12,
				eq: '\\\\models '
			},
			{
				x: 11,
				y: 13,
				eq: '\\\\mid '
			},
			{
				x: 11,
				y: 14,
				eq: '\\\\parallel '
			},
			{
				x: 11,
				y: 15,
				eq: '\\\\propto '
			},
			{
				x: 11,
				y: 16,
				eq: '\\\\bowtie '
			},
			{
				x: 11,
				y: 20,
				eq: '\\\\top '
			},
			{
				x: 11,
				y: 18,
				eq: '\\\\dashv '
			},
			{
				x: 11,
				y: 19,
				eq: '\\\\perp '
			},
			{
				x: 11,
				y: 17,
				eq: '\\\\vdash '
			}
		]
	},
	{
		group_id: 3,
		text: "字母符号",
		item: [{
				x: 7,
				y: 0,
				eq: '\\\\alpha '
			},
			{
				x: 7,
				y: 1,
				eq: '\\\\beta '
			},
			{
				x: 7,
				y: 2,
				eq: '\\\\gamma '
			},
			{
				x: 7,
				y: 3,
				eq: '\\\\delta '
			},
			{
				x: 7,
				y: 4,
				eq: '\\\\epsilon '
			},
			{
				x: 7,
				y: 5,
				eq: '\\\\varepsilon '
			},
			{
				x: 7,
				y: 6,
				eq: '\\\\zeta '
			},
			{
				x: 7,
				y: 7,
				eq: '\\\\eta '
			},
			{
				x: 7,
				y: 8,
				eq: '\\\\theta '
			},
			{
				x: 7,
				y: 9,
				eq: '\\\\vartheta '
			},
			{
				x: 7,
				y: 10,
				eq: '\\\\iota '
			},
			{
				x: 7,
				y: 11,
				eq: '\\\\kappa '
			},
			{
				x: 7,
				y: 12,
				eq: '\\\\lambda '
			},
			{
				x: 7,
				y: 13,
				eq: '\\\\mu '
			},
			{
				x: 7,
				y: 14,
				eq: '\\\\nu '
			},
			{
				x: 7,
				y: 15,
				eq: '\\\\xi '
			},
			{
				x: 7,
				y: 16,
				eq: '\\\\pi '
			},
			{
				x: 7,
				y: 17,
				eq: '\\\\varpi '
			},
			{
				x: 7,
				y: 18,
				eq: '\\\\rho '
			},
			{
				x: 8,
				y: 0,
				eq: '\\\\varrho '
			},
			{
				x: 8,
				y: 1,
				eq: '\\\\sigma '
			},
			{
				x: 8,
				y: 2,
				eq: '\\\\varsigma '
			},
			{
				x: 8,
				y: 3,
				eq: '\\\\tau '
			},
			{
				x: 8,
				y: 4,
				eq: '\\\\upsilon '
			},
			{
				x: 8,
				y: 5,
				eq: '\\\\phi '
			},
			{
				x: 8,
				y: 6,
				eq: '\\\\varphi '
			},
			{
				x: 8,
				y: 7,
				eq: '\\\\chi '
			},
			{
				x: 8,
				y: 8,
				eq: '\\\\psi '
			},
			{
				x: 8,
				y: 9,
				eq: '\\\\omega '
			},
			{
				x: 8,
				y: 10,
				eq: '\\\\amalg '
			},
			{
				x: 9,
				y: 0,
				eq: '\\\\Gamma '
			},
			{
				x: 9,
				y: 1,
				eq: '\\\\Delta '
			},
			{
				x: 9,
				y: 2,
				eq: '\\\\Theta '
			},
			{
				x: 9,
				y: 3,
				eq: '\\\\Lambda '
			},
			{
				x: 9,
				y: 4,
				eq: '\\\\Xi '
			},
			{
				x: 9,
				y: 5,
				eq: '\\\\Pi '
			},
			{
				x: 9,
				y: 6,
				eq: '\\\\Sigma '
			},
			{
				x: 9,
				y: 7,
				eq: '\\\\Upsilon '
			},
			{
				x: 9,
				y: 8,
				eq: '\\\\Phi '
			},
			{
				x: 9,
				y: 9,
				eq: '\\\\Psi '
			},
			{
				x: 9,
				y: 10,
				eq: '\\\\Omega '
			},
			{
				x: 9,
				y: 11,
				eq: '\\\\mathbb{P}'
			},
			{
				x: 9,
				y: 12,
				eq: '\\\\mathbb{N}'
			},
			{
				x: 9,
				y: 13,
				eq: '\\\\mathbb{Z}'
			},
			{
				x: 9,
				y: 14,
				eq: '\\\\mathbb{I}'
			},
			{
				x: 9,
				y: 15,
				eq: '\\\\mathbb{Q}'
			},
			{
				x: 9,
				y: 16,
				eq: '\\\\mathbb{R}'
			},
			{
				x: 9,
				y: 17,
				eq: '\\\\mathbb{C}'
			}
		]
	},
	{
		group_id: 4,
		text: "集合符号",
		item: [{
				x: 13,
				y: 0,
				eq: '\\\\therefore '
			},
			{
				x: 13,
				y: 1,
				eq: '\\\\because '
			},
			{
				x: 13,
				y: 2,
				eq: '\\\\partial '
			},
			{
				x: 13,
				y: 3,
				eq: '\\\\mho '
			},
			{
				x: 13,
				y: 4,
				eq: '\\\\imath '
			},
			{
				x: 13,
				y: 5,
				eq: '\\\\jmath '
			},
			{
				x: 13,
				y: 6,
				eq: '\\\\infty '
			},
			{
				x: 13,
				y: 7,
				eq: '\\\\wp '
			},
			{
				x: 13,
				y: 8,
				eq: '\\\\ss '
			},
			{
				x: 13,
				y: 9,
				eq: '\\\\$ '
			},
			{
				x: 13,
				y: 10,
				eq: '\\\\Re '
			},
			{
				x: 13,
				y: 11,
				eq: '\\\\Im '
			},
			{
				x: 13,
				y: 12,
				eq: '\\\\varnothing '
			},
			{
				x: 13,
				y: 13,
				eq: '\\\\aa '
			},
			{
				x: 13,
				y: 14,
				eq: '\\\\AA '
			},
			{
				x: 13,
				y: 15,
				eq: '\\\\ae '
			},
			{
				x: 13,
				y: 16,
				eq: '\\\\oe '
			},
			{
				x: 13,
				y: 17,
				eq: '\\\\OE '
			},
			{
				x: 13,
				y: 18,
				eq: '\\\\AE '
			},
			{
				x: 13,
				y: 19,
				eq: '\\\\copyright '
			},
			{
				x: 14,
				y: 0,
				eq: '\\\\angle '
			},
			{
				x: 14,
				y: 1,
				eq: '\\\\measuredangle '
			},
			{
				x: 14,
				y: 2,
				eq: '\\\\sphericalangle '
			},
			{
				x: 14,
				y: 3,
				eq: '\\\\forall '
			},
			{
				x: 14,
				y: 4,
				eq: '\\\\exists '
			},
			{
				x: 14,
				y: 5,
				eq: '\\\\subset '
			},
			{
				x: 14,
				y: 6,
				eq: '\\\\supset '
			},
			{
				x: 14,
				y: 7,
				eq: '\\\\subseteq '
			},
			{
				x: 14,
				y: 8,
				eq: '\\\\supseteq '
			},
			{
				x: 14,
				y: 9,
				eq: '\\\\nsubseteq '
			},
			{
				x: 14,
				y: 10,
				eq: '\\\\nsupseteq '
			},
			{
				x: 14,
				y: 11,
				eq: '\\\\subseteqq '
			},
			{
				x: 14,
				y: 12,
				eq: '\\\\supseteqq '
			},
			{
				x: 14,
				y: 13,
				eq: '\\\\nsupseteqq '
			},
			{
				x: 14,
				y: 14,
				eq: '\\\\in '
			},
			{
				x: 14,
				y: 15,
				eq: '\\\\ni '
			},
			{
				x: 14,
				y: 16,
				eq: '\\\\notin '
			},
			{
				x: 14,
				y: 17,
				eq: '\\\\sqsubset '
			},
			{
				x: 14,
				y: 18,
				eq: '\\\\sqsupset '
			},
			{
				x: 14,
				y: 19,
				eq: '\\\\sqsubseteq '
			},
			{
				x: 14,
				y: 20,
				eq: '\\\\sqsupseteq '
			}
		]
	}, {
		group_id: 5,
		text: "箭头符号",
		item: [{
				x: 5,
				y: 0,
				eq: 'x \\\\mapsto x^2 '
			},
			{
				x: 5,
				y: 1,
				eq: 'n \\\\to '
			},
			{
				x: 5,
				y: 2,
				eq: '\\\\leftarrow '
			},
			{
				x: 5,
				y: 3,
				eq: '\\\\rightarrow '
			},
			{
				x: 5,
				y: 4,
				eq: '\\\\Leftarrow '
			},
			{
				x: 5,
				y: 5,
				eq: '\\\\Rightarrow '
			},
			{
				x: 5,
				y: 6,
				eq: '\\\\leftrightarrow '
			},
			{
				x: 5,
				y: 7,
				eq: '\\\\Leftrightarrow '
			},
			{
				x: 5,
				y: 8,
				eq: '\\\\leftharpoonup '
			},
			{
				x: 5,
				y: 9,
				eq: '\\\\rightharpoonup '
			},
			{
				x: 5,
				y: 10,
				eq: '\\\\leftrightharpoons '
			},
			{
				x: 5,
				y: 11,
				eq: '\\\\rightleftharpoons '
			},
			{
				x: 5,
				y: 12,
				eq: '\\\\xleftarrow[]{}'
			},
			{
				x: 5,
				y: 13,
				eq: '\\\\xrightarrow[]{}'
			},
			{
				x: 5,
				y: 14,
				eq: '\\\\overset{}{\\\\leftarrow}'
			},
			{
				x: 5,
				y: 15,
				eq: '\\\\overset{}{\\\\rightarrow}'
			},
			{
				x: 5,
				y: 16,
				eq: '\\\\underset{}{\\\\leftarrow}'
			},
			{
				x: 5,
				y: 17,
				eq: '\\\\underset{}{\\\\rightarrow}'
			},
			{
				x: 5,
				y: 18,
				eq: '\\\\cdots '
			},
			{
				x: 5,
				y: 19,
				eq: '\\\\ddots '
			},
			{
				x: 5,
				y: 20,
				eq: '\\\\vdots '
			}
		]
	},
	{
		group_id: 6,
		text: "其他符号",
		item: [{
				x: 6,
				y: 0,
				eq: '\\\\left (  \\\\right )'
			},
			{
				x: 6,
				y: 1,
				eq: '\\\\left \\\\|  \\\\right \\\\|'
			},
			{
				x: 6,
				y: 2,
				eq: '\\\\left [  \\\\right ]'
			},
			{
				x: 6,
				y: 3,
				eq: '\\\\left \\\\langle  \\\\right \\\\rangle'
			},
			{
				x: 6,
				y: 4,
				eq: '\\\\left \\\\{  \\\\right \\\\}'
			},
			{
				x: 6,
				y: 5,
				eq: '\\\\left \\\\lfloor  \\\\right \\\\rfloor'
			},
			{
				x: 6,
				y: 6,
				eq: '\\\\left \\\\lceil  \\\\right \\\\rceil'
			},
			{
				x: 6,
				y: 7,
				eq: '\\\\left |  \\\\right |'
			},
			{
				x: 6,
				y: 8,
				eq: '\\\\left \\\\{  \\\\right.'
			},
			{
				x: 6,
				y: 9,
				eq: '\\\\left.  \\\\right \\\\}'
			},
			{
				x: 12,
				y: 2,
				eq: '\\\\begin{matrix}1 &  2&3 \\\\\\\\ 4 & 5 & 6 \\\\end{matrix}'
			},
			{
				x: 12,
				y: 3,
				eq: '\\\\begin{bmatrix}1 &2  & 3\\\\\\\\ 4 & 5 & 6\\\\end{bmatrix}'
			},
			{
				x: 12,
				y: 4,
				eq: '\\\\binom{n}{r}'
			},
			{
				x: 12,
				y: 5,
				eq: '\\\\begin{pmatrix}1 & 2 &3 \\\\\\\\ 4 &5  &6 \\\\end{pmatrix}'
			},
			{
				x: 12,
				y: 6,
				eq: '\\\\begin{cases} & \\\\text{ if } x= \\\\\\\\  & \\\\text{ if } x= \\\\end{cases}'
			},
			{
				x: 12,
				y: 7,
				eq: '\\\\begin{vmatrix}1 &2  &3 \\\\\\\\ 4 &5  &6 \\\\end{vmatrix}'
			},
			{
				x: 12,
				y: 8,
				eq: '\\\\begin{Bmatrix}1 & 2 &3 \\\\\\\\ 4 &5  &6 \\\\end{Bmatrix}'
			},
			//{x:12,y:9,eq:'\\\\begin{align*}y &= a+b+c+d\\\\\\\\  & +e+e+e+h\\\\end{align*}'},
			{
				x: 12,
				y: 10,
				eq: '\\\\begin{Vmatrix} &  & \\\\\\\\1  &2  &3 \\\\end{Vmatrix}'
			},
			{
				x: 12,
				y: 11,
				eq: '\\\\left\\\\{\\\\begin{matrix}1 &2  &3 \\\\\\\\ 4 &5  &6 \\\\end{matrix}\\\\right.'
			},
			{
				x: 12,
				y: 12,
				eq: '\\\\left.\\\\begin{matrix}1 &2  &3 \\\\\\\\4  &5  &6 \\\\end{matrix}\\\\right\\\\}'
			},
			{
				x: 12,
				y: 13,
				eq: '\\\\left.\\\\begin{matrix}1 &2  &3 \\\\\\\\4  &5  &6 \\\\end{matrix}\\\\right|'
			},
			{
				x: 3,
				y: 0,
				eq: "{}'"
			},
			{
				x: 3,
				y: 1,
				eq: "{}''"
			},
			{
				x: 3,
				y: 2,
				eq: "\\\\dot{}"
			},
			{
				x: 3,
				y: 3,
				eq: "\\\\ddot{}"
			},
			{
				x: 3,
				y: 4,
				eq: "\\\\hat{}"
			},
			{
				x: 3,
				y: 5,
				eq: "\\\\check{}"
			},
			{
				x: 3,
				y: 6,
				eq: "\\\\grave{}"
			},
			{
				x: 3,
				y: 7,
				eq: "\\\\acute{}"
			},
			{
				x: 3,
				y: 8,
				eq: "\\\\tilde{}"
			},
			{
				x: 3,
				y: 9,
				eq: "\\\\breve{}"
			},
			{
				x: 3,
				y: 10,
				eq: "\\\\bar{}"
			},
			{
				x: 3,
				y: 11,
				eq: "\\\\vec{}"
			},
			{
				x: 3,
				y: 12,
				eq: "\\\\not{a}"
			},
			{
				x: 3,
				y: 13,
				eq: "^{\\\\circ}"
			},
			{
				x: 4,
				y: 0,
				eq: "\\\\widetilde{abc}"
			},
			{
				x: 4,
				y: 1,
				eq: "\\\\widehat{abc}"
			},
			{
				x: 4,
				y: 2,
				eq: "\\\\overleftarrow{abc}"
			},
			{
				x: 4,
				y: 3,
				eq: "\\\\overrightarrow{abc}"
			},
			{
				x: 4,
				y: 4,
				eq: "\\\\overline{abc}"
			},
			{
				x: 4,
				y: 5,
				eq: "\\\\underline{abc}"
			},
			{
				x: 4,
				y: 6,
				eq: "\\\\overbrace{abc}"
			},
			{
				x: 4,
				y: 7,
				eq: "\\\\underbrace{abc}"
			},
			{
				x: 4,
				y: 8,
				eq: "\\\\overset{a}{abc}"
			},
			{
				x: 4,
				y: 9,
				eq: "\\\\underset{a}{abc}"
			}
		]
	}
];

function jdcCreateMathHtml() {
	for(var i = 0; i < jdcMath.length; i++) {
		var obj = jdcMath[i];
		var h = ['<div class="jdcmath-content-item-box">'];
		h.push("<ul class='jdcmath-content-item-icon'>");
		for(var j = 0; j < obj.item.length; j++) {
			var o = obj.item[j];
			h.push("<li title=\"" + o.eq.replace("\\", "") + "\" onclick=\"insertLatex('" + o.eq + "');\" style=\"background-position:-" + (o.x * 34 + 2) + "px -" + (o.y * 34 + 2) + "px;\"></li>")
		}
		h.push("</ul></div>");
		$("#jdcmath-main .jdcmath-tab-box").append("<li>" + obj.text + "</li>");
		$("#jdcmath-main .jdcmath-content-box").append(h.join(""));
	}
}

function insertLatex(latex) {
	$("#latex-area").insertArea(latex.replace("{/}", "\\"));
	showLatex();
}

function showLatex() {
	var v = $("#latex-area").val();
	var img = $("#mathImg img");
	var code = v == "" ? "error" : $.base64.btoa(v);
	if(img.length < 1) {
		img = $("<img class=\"jdc-latex\" style=\"vertical-align:middle\"/>");
		$("#mathImg").append(img);
	}
	img.attr("alt", v);
	img.attr("src", "http://localhost:8080/vcode/Latex?a="+code+"&v="+Math.random());
}

function loadLatex() {
	$("#latex-area").bind("keyup blur change", function() {
		showLatex();
	});
}

KindEditor.plugin('jdcmath', function(e) {
	var editor = this,
		name = 'jdcmath',
		lang = editor.lang(name + '.');
	editor.clickToolbar(name, function() {
		var dialog = editor.createDialog({
			name: name,
			width: 725,
			height: 450,
			title: editor.lang(name),
			body: '<div style="width:725px;height:450px;">' +
				'<style>' + jdc_css + '</style>' +
				jdc_html +
				'</div>',
			closeBtn: {
				name: '关闭',
				click: function(e) {
					dialog.remove();
				}
			},
			yesBtn: {
				name: '确定',
				click: function(e) {
					var mathHTML = $("#mathImg").html();
					editor.insertHtml(mathHTML).hideDialog().focus();
					return;
				}
			}
		});
		jdcCreateMathHtml();
		jdc_fun();
	});
});