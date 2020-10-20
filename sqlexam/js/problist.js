$(function() {
	var bool = false;
	setTimeout(function() {
		$(".nav-top-header").show();
		setTimeout(function() {
			bool = true;
			$(".left-list").eq(0).after(setPoint(bool));
			pointClick(bool);
			probListType(bool);
			topicData();
			$(".upload-page").hide();
			$(".main-window").removeClass("main-window-hide");
		}, 100);
	}, 500);
	pageFun("probsets.html", 5, parseInt(1));
	$(".navbar-show-hide").click(function(e) {
		$(".left-z-index").html($(".left-header").html());
		probListType(bool);
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
});

function probListType(bool) {
	var urlSkip = ["../probsets.html", "judge.html", "single.html", "mult.html", "gapfill.html", "subject.html", "sqltopic.html"];
	$(".left-list").click(function() {
		var ind = $(".left-list").index(this);
		ind = ind >= 7 ? ind - 7 : ind;
		$(location).attr("href", urlSkip[ind]);
	});
	pointClick(bool);
}

function topicData() {
	var html = [];
	var urls = ["addjudge.html", "addsingle.html", "addmult.html", "addgapfill.html", "addsubject.html", "addsqltopic.html"];
	var ind = $(".left-list").index($(".left-list-avtive"));
	console.log(ind)
	for(var i = 1; i <= 50; i++) {
		html.push('<tr>');
//		<svg t="1598431005277" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1655" width="24" height="24"><path d="M815.3088 359.697067 455.867733 742.929067l-61.610667-53.9136 3.566933-4.386133L208.6912 494.609067l92.2112-90.4192 166.058667 195.2768 258.491733-318.378667L815.3088 359.697067z" p-id="1656" fill="#d81e06"></path></svg>
//      <svg t="1598445010688" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2831" width="24" height="24"><path d="M511.976449 456.520615 317.702097 262.207353 262.162812 317.747662 456.438188 512.060924 262.162812 706.382378 317.702097 761.77524 511.976449 567.453786 706.267185 761.77524 761.805446 706.382378 567.515735 512.060924 761.805446 317.747662 706.267185 262.207353Z" p-id="2832" fill="#1afa29"></path></svg>
		html.push('<td></td>');
		html.push('<td>' + i + '</td>');
		html.push('</td>');
		html.push('<td>');
		html.push('<a class="topic-btn" title="求m到n之和">求m到n之和</a>');
		html.push('</td>');
		html.push('<td>');
		html.push('<a  title="模拟电子技术基础 》绪论 》电信号">模拟电子技术基础 》绪论 》电信号</a>');
		html.push('</td>');
		html.push('<td>gxy</td>');
		html.push('<td>1</td>');
		html.push('<td>1.00</td>');
		html.push('<td>公开</td>');
		html.push('<td title="2020-06-0'+i+' 10:17">2020-06-0'+i+'</td>');
		html.push('<td><a href="' + urls[ind] + '?id=1">编辑</a></td>');
		html.push('<td></td>');
		html.push('</tr>');
	}
	$(".data-tbody").html(html.join(""));
	$(".topic-btn").click(function() {
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
		$(".topic-tab-text").text("2-125");
		$(".answer-tab-text").text("");
		if(ind == 1) {
			$("#title-text").html("<p>链路是从一个结点到相邻结点的一段物理线路。</p>");
		}
		if(ind == 2) {
			$("#title-text").html("<p>链路是从一个结点到相邻结点的一段物理线路。</p>");
			var optionhtml = [];
			
		}
		if(ind == 3) {
			$("#title-text").html("<p>链路是从一个结点到相邻结点的一段物理线路。</p>");
			var optionhtml = [];
			
		}
		if(ind == 4) {
			$("#title-text").html(conertOutHtmlInputNull("<p>这是填空题模板。@@{6}(3) 最多可设十个可选答案，用 “|” 隔开。<br>每题可以有多个空。@@{9}(2)。</p>"));
			var optionhtml = [];
			
		}
		if(ind == 5) {
			$("#title-text").html('以下程序段为DS18B20的温度获取程序。仔细阅读下面程并回答标号对应的问题。');
//			$("#title-text").html(conertOutHtmlInputNull("<p>这是填空题模板。@@{6}(3) 最多可设十个可选答案，用 “|” 隔开。<br>每题可以有多个空。@@{9}(2)。</p>"));
			var optionhtml = [];
			
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
