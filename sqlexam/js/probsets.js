$(function() {
	setTimeout(function(){
		$(".nav-top-header").show();
		setTimeout(function(){
			topicData();
			$(".upload-page").hide();
			$(".main-window").removeClass("main-window-hide");
		},1000);
	},500);
	pageFun("probsets.html",20,parseInt(2));
	$(".navbar-show-hide").click(function(e) {
		$(".left-z-index").html($(".left-header").html());
		typeUrlBtn();
		$(".left-header-z-index").fadeIn();
		$(".left-header-z-index").children().animate({
			width: 'show'
		}, 180);
	});
	$(".fork-btn,.left-header-z-index").click(function(e) {
		$(".left-header-z-index").children().animate({
			width: 'hide'
		}, 180);
		$(".left-header-z-index").fadeOut();
		e.stopPropagation();
	});
	$(".left-z-index").click(function(e) {
		e.stopPropagation();
	});
	$(".public-questbank-btn").click(function(){
		$(location).attr("href","probsets.html");
	});
	typeUrlBtn();
});

function typeUrlBtn() {
	var urllist = ["problist/judge.html"];
	$(".btn-modal-skip").click(function(){
		var index = $(".btn-modal-skip").index(this);
		index = index < 6?index:index - 6;
		$(location).attr("href",urllist[0]);
	});
	var frendLinks = ["https://www.gznc.edu.cn","https://www.mysql.com/","https://www.runoob.com/mysql/mysql-tutorial.html","https://www.icourse163.org/search.htm?search=mysql#/"];
	$(".btn-bottom-modal-skip").click(function(){
		var ind = $(".btn-bottom-modal-skip").index(this);
		ind = ind >= 4?ind - 4:ind;
		window.open(frendLinks[ind]);
	})
}

function topicData() {
	var html = [];
	var ind;
	var type;
	for(var i = 1; i <= 50; i++) {
		if(i == 2) {
			ind = 2;
			type="单选题";
		}
		if(i == 3) {
			ind = 3;
			type="多选题";
		}
		if(i == 4) {
			ind = 4;
			type="填空题";
		}
		if(i == 5) {
			ind = 5;
			type="主观题";
		}
		if(i == 1){
			ind = 1;
			type="判断题";
		}
		html.push('<tr>');
		html.push('<td></td>');
		html.push('<td>' + i + '</td>');
		html.push('</td>');
		html.push('<td>');
		html.push('<a class="topic-btn" data-type="'+ind+'" title="求m到n之和">求m到n之和</a>');
		html.push('</td>');
		html.push('<td>'+type+'</td>');
		html.push('<td>');
		html.push('<a  title="模拟电子技术基础 》绪论 》电信号">模拟电子技术基础 》绪论 》电信号</a>');
		html.push('</td>');
		html.push('<td>gxy</td>');
		html.push('<td>1</td>');
		html.push('<td>1.00</td>');
		html.push('<td>公开</td>');
		html.push('<td title="2020-06-0'+i+' 10:17">2020-06-0'+i+'</td>');
		html.push('<td></td>');
		html.push('</tr>');
	}
	$(".data-tbody").html(html.join(""));
	$(".topic-btn").click(function() {
		var ind = $(this).attr("data-type");
		var html = [];
		html.push("<tr>");
		html.push("<td>gxy</td>");
		html.push("<td>1</td>");
		html.push("<td>1</td>");
		html.push("<td>50</td>");
		html.push("<td>100</td>");
		html.push("<td>0.50</td>");
		html.push("</tr>");
		$("#topic-tbody").html(html.join(""));
		$("#answer-show").html("");
		$(".judege-form-check").hide();
		$(".form-check").hide();
		$(".textarea-raw").hide();
		$(".topic-tab-text").text("2-125");
		$(".answer-tab-text").text("");
		if(ind == 1) {
			$("#title-text").html("<p>链路是从一个结点到相邻结点的一段物理线路。</p>");
			$(".judege-form-check").show();
		}
		if(ind == 2 || ind == 3) {
			$("#title-text").html("<p>链路是从一个结点到相邻结点的一段物理线路。</p>");
			var formType = ind == 2?"radio":"checkbox";
			var h = [];
			h.push('<label class="form-check-label">');
			h.push('<input type="'+ formType +'" class="form-check-input" />');
			h.push('<div class="pc-h gap-8 pc-option-text">');
			h.push('<div class="tab-pc-text gar-8">');
			h.push('<div class="pc-text-raw">A.</div>');
			h.push('</div>');
			h.push('<div class="topic-pc-text">');
			h.push('<div class="pc-text-raw"><p>较小的地域范围</p></div>');
			h.push('</div>');
			h.push('</div>');
			h.push('</label>');
			$(".form-check").html(h.join(""));
			$(".form-check").show();
		}
		if(ind == 4) {
			$("#title-text").html(conertOutHtmlInputNull("<p>这是填空题模板。@@{6}(3) 最多可设十个可选答案，用 “|” 隔开。<br>每题可以有多个空。@@{9}(2)。</p>"));
		}
		if(ind == 5) {
			$("#title-text").html('<p>以下程序段为DS18B20的温度获取程序。仔细阅读下面程并回答标号对应的问题。</p>');
			$(".textarea-raw").show();
		}
		$("#problem-modal").modal("show");
		$("#submit-btn").click(function() {
			$(".answer-tab-text").text("2-125");
			$("#answer-show").html('<span class="text-correct">答案正确</span><span class="pc-text">(2 分)</span>');	
			var answerhtml = [];
//			answerhtml.push('<span class="text-error">答案错误</span>');
			answerhtml.push('<span class="text-error">部分正确</span>');
			answerhtml.push('<a class="tooltip-test tooltip-a" data-toggle="tooltip" title="常见问题"><svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M467.2 364.16a60.288 60.288 0 0 1-17.92-44.8c0-17.92 5.76-33.28 17.92-44.8 12.16-11.52 26.88-17.92 44.8-17.92 17.92 0 33.28 5.76 44.8 17.92 11.52 12.16 17.92 26.88 17.92 44.8 0 17.92-5.76 33.28-17.92 44.8a64 64 0 0 1-44.8 19.2c-17.92 0-33.28-7.04-44.8-19.2zM576 511.36c-1.28-16-7.04-30.72-19.84-44.16-12.8-12.16-26.88-19.2-44.16-19.84H448c-17.28 1.28-30.72 8.32-44.16 19.84-12.8 12.8-19.2 28.16-19.84 44.16h64v192c1.28 17.28 7.04 32 19.84 44.16 12.8 12.8 26.88 19.84 44.16 19.84h64c17.28 0 30.72-7.04 44.16-19.84 12.8-12.16 19.2-26.88 19.84-44.16H576V510.72v0.64zM512 147.2c-200.96 0-364.8 162.56-364.8 363.52 0 200.96 163.84 364.8 364.8 364.8s364.8-163.2 364.8-364.8c0-201.6-163.84-364.16-364.8-364.16v0.64zM512 62.72c247.04 0 448 200.96 448 448s-200.96 448-448 448-448-199.68-448-448 200.96-448 448-448z" fill="#6D767E"></path></svg></a>');
			answerhtml.push('<span class="pc-text">(2 分)</span>');
			$("#answer-show").html(answerhtml.join(""));
			$("[data-toggle='tooltip']").tooltip();
		});
	});
}