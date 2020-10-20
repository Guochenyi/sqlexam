$(function() {
	/**
	 * 监听窗体变化
	 */
	resizeBannerImage();
	window.onresize = resizeBannerImage;

	function resizeBannerImage() {
		var height = $(window).height();
		var width = $(window).width();
		$(".main-window").css("height", (height - 63) + "px");
		if(width > 1000) {
			$(".left-header-z-index").children().animate({
				width: 'hide'
			}, 180);
			$(".left-header-z-index").fadeOut();
		}
	}

	$(".infrom-icon").click(function() {
		$(location).attr("href", "infrom.html");
	});

	/**
	 * 网页标题栏图标地址
	 */
	$(".ico-class").attr("href", "http://127.0.0.1:8020/sqlexam/img/ico.ico")
});

function pageFun(urlstr, totalPage, currPage) {
	$(".pagination").createPage({
		totalPage: totalPage,
		currPage: currPage,
		backFn: function(p) {
			//			$(location).attr('href', pageSkip(p,urlstr));
		}
	});
}

$(function() {
	try {
		particlesJS("particles-js", {
			particles: {
				number: {
					value: 80,
					density: {
						enable: true,
						value_area: 800
					}
				},
				color: {
					value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"]
				},
				shape: {
					type: ["circle"],
					stroke: {
						width: 0,
						color: "#fff"
					},
					polygon: {
						nb_sides: 5
					}
				},
				opacity: {
					value: 1,
					random: false,
					anim: {
						enable: false,
						speed: 1,
						opacity_min: 0.1,
						sync: false
					}
				},
				size: {
					value: 8,
					random: true,
					anim: {
						enable: false,
						speed: 10,
						size_min: 10,
						sync: false
					}
				},
				line_linked: {
					enable: true,
					distance: 150,
					color: "#808080",
					opacity: 0.4,
					width: 1
				},
				move: {
					enable: true,
					speed: 5,
					direction: "none",
					random: false,
					straight: false,
					out_mode: "out",
					bounce: false,
					attract: {
						enable: false,
						rotateX: 600,
						rotateY: 1200
					}
				}
			},
			interactivity: {
				detect_on: "canvas",
				events: {
					onhover: {
						enable: true,
						mode: "grab"
					},
					onclick: {
						enable: true,
						mode: "push"
					},
					resize: true
				},
				modes: {
					grab: {
						distance: 140,
						line_linked: {
							opacity: 1
						}
					},
					bubble: {
						distance: 400,
						size: 40,
						duration: 2,
						opacity: 8,
						speed: 3
					},
					repulse: {
						distance: 200,
						duration: 0.4
					},
					push: {
						particles_nb: 4
					},
					remove: {
						particles_nb: 2
					}
				}
			},
			retina_detect: true
		});
	} catch(e) {}

	/**
	 * 富文本编辑器初始化
	 */
	try {
		KindEditor.lang({
			cuscode: '插入程序代码'
		});
		var options = {
			resizeType: 0,
			allowPreviewEmoticons: false,
			allowImageUpload: true,
			newlineTag: 'br',
			items: ["code", "cut", "copy", "undo", "redo", 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
				'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
				'superscript', 'jdcmath', 'quickformat', 'selectall', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
				'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', , 'image', 'table', 'hr', 'link'
			],
			afterBlur: function() {
				this.sync();
			},
		};
		var options1 = {
			resizeType: 0,
			allowPreviewEmoticons: false,
			allowImageUpload: true,
			newlineTag: 'br',
			items: ["cuscode", "cut", "copy", "undo", "redo", 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
				'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
				'superscript', 'jdcmath', 'quickformat', 'selectall', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
				'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', , 'image', 'table', 'hr', 'link'
			],
			afterBlur: function() {
				this.sync();
			},
		};
		var editor = new Array();
		KindEditor.ready(function(K) {
			editor[0] = K.create('textarea[name="content"]', options);
		});
	} catch(e) {

	}
	try{
		layui.use('layer', function(){
		  var layer = layui.layer;
		});
	}catch(e){
		//TODO handle the exception
	}
})

function replaceAllGt(s) {
	return s.replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g"), "&gt;");
}

function strLen(str) {
	var len = 0;
	for(var i = 0; i < str.length; i++) {
		if(str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
			len += 2;
		} else {
			len++;
		}
	}
	return len;
}

function isAnswerLenMax(answer) {
	var answers = answer.split("|");
	var maxLen = 0;
	for(var i = 0; i < answers.length; i++) {
		if(maxLen < strLen(answers[i])) {
			maxLen = strLen(answers[i]);
		}
	}
	return maxLen;
}

function convertFillOutHtml(h) {
	h = replaceAllGt(h);
	var patt1 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)+/g;
	var patt2 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)/;
	var mm = h.match(patt1);
	for(var i = 0; i < mm.length; i++) {
		var jj = mm[i].match(patt2);
		h = h.replace("@@{" + jj[1] + "}(" + jj[2] + ")", "<input type='text' value='" + jj[1] + "'/><span>(" + jj[2] + "分)</span>");
	}
	return h;
}

function convertOutHtmlInput(h) {
	var patt1 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)+/g;
	var patt2 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)/;
	var mm = h.match(patt1);
	for(var i = 0; i < mm.length; i++) {
		var jj = mm[i].match(patt2);
		h = h.replace("@@{" + jj[1] + "}(" + jj[2] + ")", "<input type='text' value='" + jj[1] + "'/><span>(" + jj[2] + "分)</span>");
	}
	return h;
}

function convertOutHtmlNull(h) {
	var patt1 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)+/g;
	var patt2 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)/;
	var mm = h.match(patt1);
	for(var i = 0; i < mm.length; i++) {
		var jj = mm[i].match(patt2);
		h = h.replace("@@{" + jj[1] + "}(" + jj[2] + ")", "@@{" + isAnswerLenMax(jj[1]) + "}(" + jj[2] + ")");
	}
	return h;
}

function convertOutHtmlStrip(h) {
	var patt1 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)+/g;
	var patt2 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)/;
	var mm = h.match(patt1);
	for(var i = 0; i < mm.length; i++) {
		var jj = mm[i].match(patt2);
		h = h.replace("@@{null}(" + jj[2] + ")", "____");
	}
	return h;
}

function conertOutHtmlInputNull(h) {
	var patt1 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)+/g;
	var patt2 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)/;
	var mm = h.match(patt1);
	for(var i = 0; i < mm.length; i++) {
		var jj = mm[i].match(patt2);
		h = h.replace("@@{" + jj[1] + "}(" + jj[2] + ")", "<input type='text' size='" + jj[1] + "' value=''/><span>(" + jj[2] + "分)</span>");
	}
	return h;
}

function convertHtmlOutScore(h) {
	h = replaceAllGt(h);
	var patt1 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)+/g;
	var patt2 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)/;
	var mm = h.match(patt1);
	var sum = 0;
	for(var i = 0; i < mm.length; i++) {
		var jj = mm[i].match(patt2);
		sum += parseFloat(jj[2]);
	}
	return parseFloat(sum.toFixed(2));
}

function convertFillAnswer(h) {
	h = replaceAllGt(h);
	var patt1 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)+/g;
	var patt2 = /@@\{(.+?)\}\(([0-9]+\.{0,1}[0-9]{0,2})\)/;
	var mm = h.match(patt1);
	var anser = [];
	for(var i = 0; i < mm.length; i++) {
		var jj = mm[i].match(patt2);
		anser[i] = jj[1];
	}
	return anser.join("^^^sqlexam.cn^^^");
}

function jdcFormatScore(c) {
	c = parseFloat(c);
	c = c.toFixed(2);
	var f = c.split(".");
	if(f.length == 2 && f[1] == "00") {
		c = f[0];
	}
	return c;
}

function setPoint(bool) {
	if(bool) {
		var data = [];
		data.push('<div class="left-list-kp">');
		data.push('<svg t="1594967844500" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3965" width="16" height="16">');
		data.push('<path d="M469.333 128h85.334a42.667 42.667 0 0 1 42.666 42.667v554.666A42.667 42.667 0 0 1 554.667 768h-85.334a42.667 42.667 0 0 1-42.666-42.667V170.667A42.667 42.667 0 0 1 469.333 128z m-256 256h85.334a42.667 42.667 0 0 1 42.666 42.667v298.666A42.667 42.667 0 0 1 298.667 768h-85.334a42.667 42.667 0 0 1-42.666-42.667V426.667A42.667 42.667 0 0 1 213.333 384z m512 128h85.334a42.667 42.667 0 0 1 42.666 42.667v170.666A42.667 42.667 0 0 1 810.667 768h-85.334a42.667 42.667 0 0 1-42.666-42.667V554.667A42.667 42.667 0 0 1 725.333 512z m188.928 331.05H109.653c-13.397 0-24.362 11.862-24.362 26.454 0 14.55 10.965 26.496 24.362 26.496H914.22c13.397 0 24.405-11.947 24.405-26.496 0-14.592-11.008-26.453-24.405-26.453z" p-id="3966" fill="#333333"></path>');
		data.push('</svg>');
		data.push('<span>知识点</span>');
		data.push('</div>');
		return data.join("");
	}
}

function pointClick(bool) {
	if(bool) {
		$(".left-list-kp").click(function() {
			$(location).attr("href", "point.html");
		});
	}
}

function pointUrlReq(data, ind) {
	var kp_data;
	$.ajax({
		url: reqURL + "/knowPoint/queryKnowPoint.do",
		type: "POST",
		data: data,
		//请求成功完成后要执行的方法
		success: function(data) {
			kp_data = data.data;
			var that;
			if(ind == 1) {
				if(kp_data != null) {
					for(var i = 0; i < kp_data.length; i++) {
						if(data.data[i].kp_status == 3) {
							$("#one-kp").find("#private").append("<option style='font-weight: 500;' data-status='3' data-value=" + kp_data[i].kp_text + " data-id=" + kp_data[i].kp_id + " value=" + i + ">" + kp_data[i].kp_text + "</option>");
						} else {
							$("#one-kp").find("#public").append("<option style='font-weight: 500;' data-status='1' data-value=" + kp_data[i].kp_text + " data-id=" + kp_data[i].kp_id + " value=" + i + ">" + kp_data[i].kp_text + "</option>");
						}
					}
				}
				return;
			} else if(ind == 2) {
				that = $("#two-kp");
			} else if(ind == 3) {
				that = $("#three-kp")
			}
			if(kp_data != null) {
				for(var i = 0; i < kp_data.length; i++) {
					that.append("<option style='font-weight: 500;' data-value=" + kp_data[i].kp_text + " data-id=" + kp_data[i].kp_id + " value=" + i + ">" + kp_data[i].kp_text + "</option>");
				}
			}
		}
	});
}

function addDataKp() {
	var data = ["C语言", "Java语言", "C++语言"];
	$("#one-kp").find("#private").html("");
	$("#one-kp").find("#public").html("");
	for(var i = 0; i < data.length; i++) {
		$("#one-kp").find("#private").append("<option data-status='1' data-value=" + data[i] + " data-id=" + i + " value=" + i + ">" + data[i] + "</option>");
	}
	$("#one-kp").change(function() {
		var one_kp = $(this).val();
		$("#two-kp").html("<option value=''>--选择下级知识点--</option>");
		$("#three-kp").html("<option value=''>--选择下级知识点--</option>");
		if(one_kp == "") {
			$("#selected-btn").addClass("disabled");
			$("#selected-btn").attr({
				"disabled": "disabled"
			});
		} else {
			data["kp_level"] = 2;
			data["kp_parent"] = $(this).find("option:selected").attr("data-id");
			data["who"] = 1;
			//			pointUrlReq(data, 2);
			for(var i = 0; i < data.length; i++) {
				$("#two-kp").append("<option style='font-weight: 500;' data-status='3' data-value=" + i + " data-id=" + data[i] + " value=" + i + ">" + data[i] + "</option>");
			}
		}
	});
	$("#two-kp").change(function() {
		var kp = $(this).val();
		$("#three-kp").html("<option value=''>--选择下级知识点--</option>");
		if(kp == "") {
			$("#selected-btn").addClass("disabled");
			$("#selected-btn").attr({
				"disabled": "disabled"
			});
		} else {
			data["kp_level"] = 2;
			data["kp_parent"] = $(this).find("option:selected").attr("data-id");
			data["who"] = 1;
			//			pointUrlReq(data, 2);
			for(var i = 0; i < data.length; i++) {
				$("#three-kp").append("<option style='font-weight: 500;' data-status='3' data-value=" + i + " data-id=" + data[i] + " value=" + i + ">" + data[i] + "</option>");
			}
		}
	});
	$("#three-kp").change(function() {
		var kp = $(this).val();
		if(kp == "") {
			$("#selected-btn").addClass("disabled");
			$("#selected-btn").attr({
				"disabled": "disabled"
			});
		} else {
			$("#selected-btn").removeClass("disabled");
			$("#selected-btn").removeAttr("disabled");
		}
	});
}

function dataBaseSQLCodeAce(id,code) {
	$(function() {
		ace.require("ace/ext/language_tools");
		var editor = ace.edit(id);
		editor.session.setMode("ace/mode/sql");
		editor.$blockScrolling = Infinity;
		editor.setFontSize(14);
		editor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true
		});
		editor.setTheme("ace/theme/xcode");
		editor.renderer.setShowGutter(false);
		editor.setHighlightActiveLine(false);
		editor.setShowPrintMargin(false);
		editor.setReadOnly(true);
		editor.setOption("wrap", "free");
		editor.focus();
		editor.setValue("");
		editor.insert(code);
	});
}

function tableBottomData(that,dataTablebottom) {
	if(dataTablebottom == "table-bottom-0") {
		that.attr("abc",123);
	}
	if(dataTablebottom == "table-bottom-1") {
		
	}
	if(dataTablebottom == "table-bottom-2") {
		that.attr("abc",123);
	}
	if(dataTablebottom == "table-bottom-3") {
		that.attr("abc",123);
	}
	if(dataTablebottom == "table-bottom-4") {
		
	}
	if(dataTablebottom == "table-bottom-5") {
		
	}
	if(dataTablebottom == "table-bottom-6") {
		
	}
}
