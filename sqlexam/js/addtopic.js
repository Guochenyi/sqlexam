$(function() {
	var termOrder = ["A", "B", "C", "D", "E", "F", "G", "H"];
	var ind = $(".left-list").index($(".left-list-avtive"));
	ind = ind < 6 ? ind : ind - 6;
	setTimeout(function() {
		$(".nav-top-header").show();
		setTimeout(function() {
			$(".upload-page").hide();
			$(".main-window").removeClass("main-window-hide");
			if(ind == 4) {
				$("#editor-text")[0].contentWindow.editorIntin(0, 550);
			} else {
				$("#editor-text")[0].contentWindow.editorIntin(1, 550);
				if(ind == 5) {
					$("#editor-answer-text")[0].contentWindow.editorIntin(1, 550, "", 2);
				}
			}
			dataTableBottomSelectJSON();
		}, 1000);
	}, 500);
	$(".navbar-show-hide").click(function(e) {
		$(".left-z-index").html($(".left-header").html());
		probListType();
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
	$(".public-questbank-btn").click(function() {
		$(location).attr("href", "probsets.html");
	});
	probListType();
	$("#kp-btn").click(function() {
		$("#selected-btn").addClass("disabled");
		$("#selected-btn").attr({
			"disabled": "disabled"
		});
		$("#one-kp").val("");
		$("#two-kp").val("");
		$("#three-kp").val("");
		addDataKp();
		$("#kp-modal").modal("show");
	});
	$("#preview-btn").click(function() {
		try {
			var describe = $("#editor-text")[0].contentWindow.getEditorHtml().describe;
			var score = '<h5 id="pop-view"><span span class="preview-score">[ 总分：' + convertHtmlOutScore(describe) + ' 分 ]</span></h5>';
			$("#pop-view").remove();
			$(".preview-code").before(score);
			$(".preview-code").html(convertOutHtmlInput(describe));
		} catch(e) {
			$(".preview-code").html("<span style='color:red'>格式错误</span>");
		}
	});
	var optInd = 0;
	var that;
	var optEditotHtml;
	$("#add-option-btn").click(function() {
		$("#editor-option-text")[0].contentWindow.editorIntin(1, 520);
		$("#add-option-modal").modal("show");
		optInd = 1;
	});
	$("#option-ok-btn").click(function() {
		var line = $("#opt-tbody tr").length;
		if(line > (termOrder.length - 1)) return;
		if(optInd == 1) {
			var optEditotHtml = $("#editor-option-text")[0].contentWindow.getEditorHtml();
			var tr = $('<tr></tr>');
			tr.append('<td class="text-center">' + termOrder[line] + '</td>')
			tr.append('<td tag="term" line="0" data-html="' + optEditotHtml.describe + '" data-text="' + optEditotHtml.markdown + '">' + optEditotHtml.describe + '</td>');
			if(ind == 2) {
				tr.append('<td class="text-center"><input type="radio" name="cbx-ans" value="' + termOrder[line] + '"/></td>');
			} else if(ind == 3) {
				tr.append('<td class="text-center"><input type="checkbox" name="cbx-ans" value="' + termOrder[line] + '"/></td>');
			}
			var td = $('<td class="text-center"></td>');
			var editBtn = $('<button class="btn btn-xs btn-primary redactbtn" style="margin-right:10px">编辑</button>');
			var deleteBtn = $('<button class="btn btn-xs btn-danger deletebtn">删除</button>');
			td.append(editBtn);
			td.append(deleteBtn);
			tr.append(td);
			$("#opt-tbody").append(tr);
			$("#add-option-modal").modal("hide");
			editBtn.click(function() {
				var markdown = $(this).parent().siblings().eq(1).attr("data-text");
				that = $(this).parent().siblings().eq(1);
				$("#editor-option-text")[0].contentWindow.editorIntin(1, 520, markdown);
				$("#add-option-modal").modal("show");
				optInd = 2;
			});
			deleteBtn.click(function() {
				$(this).parents("tr").remove();
				for(var i = 0; i < $("#opt-tbody").children().length; i++) {
					$("#opt-tbody").children().eq(i).children().eq(0).text(termOrder[i]);
					$("#opt-tbody").children().eq(i).children().eq(2).children().val(termOrder[i]);
				}
			});
		} else if(optInd == 2) {
			var optEditotHtml = $("#editor-option-text")[0].contentWindow.getEditorHtml();
			that.attr("data-html", optEditotHtml.describe);
			that.attr("data-text", optEditotHtml.markdown);
			that.html(optEditotHtml.describe);
			$("#add-option-modal").modal("hide");
		}
	});
	$("#score-point-add-btn").click(function() {
		$("#edit-score-point").attr("data-value", "-1");
		$("#edit-score-point").val("");
		$("#score-point-modal").modal("show");
	});
	$("#score-point-ok-btn").click(function() {
		var data_value = $("#edit-score-point").attr("data-value");
		if($("#edit-score-point").val() != "" && $("#edit-score-point").val() > 0) {
			$("#score-point-modal").modal("hide");
			if(data_value == -1) {
				var tr = $("<tr></tr>");
				tr.append("<td tag='term' class='text-center'>" + $("#edit-score-point").val() + "</td>");
				var td = $("<td></td>");
				var editBtn = $("<button class='btn btn-xs btn-primary' style='margin-right: 10px;'>编辑</button>");
				var deleteBtn = $("<button class='btn btn-xs btn-danger'>删除</button>");
				td.append(editBtn);
				editBtn.click(function() {
					var tr_trem = $(this).parents("tr").children().eq(0).text();
					var tr_len = $("#termtbody tr").index($(this).parents("tr")) + 1;
					$("#edit-score-point").val(tr_trem);
					$("#edit-score-point").attr("data-value", tr_len);
					$("#score-point-modal").modal("show");
				});
				deleteBtn.click(function() {
					$(this).parents("tr").remove();
				});
				td.append(deleteBtn);
				td.addClass("text-center");
				tr.append(td);
				$("#score-point-tbody").append(tr);
			} else {
				$("#score-point-tbody tr").children().eq(0).text($("#edit-score-point").val());
			}
		}
	});
	$("#selected-btn").click(function() {
		var status = $("#one-kp").find("option:selected").attr("data-status");
		var course = $("#one-kp").find("option:selected").attr("data-value");
		var chapter = $("#two-kp").find("option:selected").attr("data-value");
		var knob = $("#three-kp").find("option:selected").attr("data-value");
		var course_id = $("#one-kp").find("option:selected").attr("data-id");
		var chapter_id = $("#two-kp").find("option:selected").attr("data-id");
		var knob_id = $("#three-kp").find("option:selected").attr("data-id");
		var html = [];
		for(var i = 0; i < $(".tr_zsd").length; i++) {
			var td_id = $(".tr_zsd").eq(i).children().eq(1).attr("data-knobid");
			if(knob_id == td_id) {
				$("#kp-modal").modal("hide");
				return;
			}
		}
		html.push("<tr class='tr_zsd'>");
		html.push("<td class='td_index'>" + ($("#knowpt_tbody").children().length + 1) + "</td>");
		if(status == 1) {
			html.push("<td tag='kp-data-td' data-courseid='" + course_id + "' data-chapterid='" + chapter_id + "' data-knobid='" + knob_id + "' data-status='1'>" + course + " / " + chapter + " / " + knob + "</td>");
			html.push("<td>私有</td>");
		}
		if(status == 2) {
			html.push("<td tag='kp-data-td' data-courseid='" + course_id + "' data-chapterid='" + chapter_id + "' data-knobid='" + knob_id + "' data-status='2'>" + course + " / " + chapter + " / " + knob + "</td>");
			html.push("<td>公开</td>");
		}
		html.push("<td>");
		html.push("<button class='tr_delete_a btn btn-danger btn-xs'>删除</button>");
		html.push("</td>");
		html.push("</tr>");
		$("#knowpt_tbody").append(html.join(""));
		$("#knowpt_table").removeClass("hidden");
		$("#kp-modal").modal("hide");
		$(".tr_delete_a").click(function() {
			$(this).parents("tr").remove();
			for(var i = 0; i < $(".td_index").length; i++) {
				$(".td_index").eq(i).html(i + 1);
			}
		});
	});
	$(".database-btn").click(function() {
		$(this).siblings().removeClass("top-btn-active");
		$(this).addClass("top-btn-active");
		$(".database-center-style").addClass("hidden");
		$(".database-center-style").eq($(".database-btn").index(this)).removeClass("hidden");
	});
	$(".datatable-btn").click(function() {
		if($(".datatable-btn").index(this) > 3) {
			$(".top-event-item").children("div").addClass("hidden");
		} else {
			$(".top-event-item").children("div").removeClass("hidden");
		}
		$(this).siblings().removeClass("top-btn-active");
		$(this).addClass("top-btn-active");
		$(".table-top-event-btn").addClass("hidden");
		$(".table-top-event-btn").eq($(".datatable-btn").index(this)).removeClass("hidden");
		$(".datatable-center-style").addClass("hidden");
		$(".datatable-center-style").eq($(".datatable-btn").index(this)).removeClass("hidden");
	});
	$(".database-sql-preview").click(function() {
		var databaseName = $("input[name='database-name']").val();
		var characterSet = $("#character-set").find("option:selected").attr("data-text");
		var orderingRule = $("#ordering-rule").find("option:selected").attr("data-text");
		var sql = "";
		if(databaseName != "") {
			sql += "CREATE DATABASE `" + databaseName + "`";
		}
		if(characterSet != "") {
			if(sql == "") {
				sql += "CREATE DATABASE ``";
			}
			sql += " CHARACTER SET '" + characterSet + "'";
		}
		if(typeof(orderingRule) != "undefined" && orderingRule != "") {
			sql += " COLLATE '" + orderingRule + "'";
		}
		if(sql != "") {
			sql += ";";
			$(".database-center-preview").html('<pre id="databasesql" class="ace_editor" style="height: 300px;"><textarea class="ace_text-input"></textarea></pre>');
			dataBaseSQLCodeAce("databasesql", sql);
		}
	});
	$("#database-btn").click(function() {
		dataBaseSelectJSON();
		$("#database-modal").modal("show");
	});
	$("#database-submit-btn").click(function() {
		if($("input[name='database-name']").val().trim() == "") {
			toastr.danger("数据库名不能为空".toLowerCase());
			return;
		}
		var baseData = [];
		var tableTr = $("<tr></tr>");
		tableTr.append("<td>1</td>");
		tableTr.append("<td>" + $("input[name='database-name']").val() + "</td>");
		var characterSet = $("<td><select class='table-select'></select></td>");
		var orderingRule = $("<td><select class='table-select'></select></td>");
		tableTr.append(characterSet);
		tableTr.append(orderingRule);
		baseData.push($("#character-set").find("option:selected").attr("data-text"));
		baseData.push($("#ordering-rule").find("option:selected").attr("data-text"));
		var trTd = $("<td></td>");
		var amendBtn = $('<button class="btn btn-primary btn-xs margin-right-5">修改</button>');
		var redactBtn = $('<button class="btn btn-danger btn-xs">删除</button>');
		trTd.append(amendBtn);
		trTd.append(redactBtn);
		tableTr.append(trTd);
		$("#database_tbody").html(tableTr);
		dataBaseSelectJSON(tableTr.children().eq(2).children(), baseData);
		$("#database_tbody").parents("table").removeClass("hidden");
		$("#database_tbody").parents("table").next("button").hide();
		$("#database-modal").modal("hide");
		amendBtn.click(function() {
			characterSet = $("#database_tbody").children().children().eq(2).children().val()
			orderingRule = $("#database_tbody").children().children().eq(3).children().val()
			if(characterSet == "") {
				toastr.danger("请选择字符集".toLowerCase());
				return;
			}
			if(orderingRule == "") {
				toastr.danger("请选择排序规则".toLowerCase());
			}
			sql = "ALTER DATABASE `" + $("#database_tbody").children().children().eq(1).text() + "` CHARACTER SET '" + characterSet + "' COLLATE '" + orderingRule + "';"

		});
		redactBtn.click(function() {
			$(".delete-affirm-text").html("数据库删除后数据不能恢复，您确定要删除吗？");
			$("#delete-affirm-btn").attr("data-name", $(this).parent().siblings().eq(1).text());
			$("#delete-affirm-btn").attr("data-value", "1001");
			$("#delete-model").modal("show");
		});
	});
	$("#datatable-submit-btn").click(function() {
		var h = [];
		var value = $(this).attr("data-value");
		var tableNmae = $(this).attr("data-tablename");
		if(tableNmae == "") {
			$(".table-tablename-modal").show();
			return;
		}
		h.push('<tr>');
		h.push('<td>1</td>');
		h.push('<td>abc</td>');
		h.push('<td>abc</td>');
		h.push('</tr>');
		$("#table-name-tbody").append(h.join());
		$("#table-name-tbody").parents("table").removeClass("hidden");
		$("#datatable-modal").modal("hide");
	});
	$("#database-table-save-btn").click(function() {
		if($("#database-table-name").text() == "") {
			$(".table-tablename-modal").show();
			return;
		}
	});
	$("#table-name-confirm-btn").click(function() {
		var tableName = $("#table-from-tablename").val();
		if(tableName == "") {
			toastr.danger("请输入表名".toLowerCase());
			return;
		}
		var sql = fieldSQL(tableName);
		console.log(sql);
		var h = [];
		h.push('<tr>');
		h.push('<td>' + ($("#table-name-tbody").children().length + 1) + '</td>');
		h.push('<td>' + tableName + '</td>');
		h.push('<td>abc</td>');
		h.push('</tr>');
		$("#table-name-tbody").append(h.join());
		$("#table-name-tbody").parents("table").removeClass("hidden");
		$(".table-tablename-modal").hide();
		$("#datatable-modal").modal("hide");
	});
	$("#table-name-cancel-btn").click(function() {
		$(".table-tablename-modal").hide();
	});
	$(".table-sql-preview").click(function() {
		$(".datatable-center-preview").html('<pre id="tablesql" class="ace_editor" style="height: 300px;"><textarea class="ace_text-input"></textarea></pre>');
		dataBaseSQLCodeAce("tablesql", fieldSQL().join("\n"));
	});
	$("#add-datatable-btn").click(function() {
		//		if($("#database_tbody").children().length == 0) {
		//			toastr.danger("请新建数据库".toLowerCase());
		//			return;
		//		}
		$("#database-table-tbody").html("");
		$("#datatable-index-tbody").html("");
		$("#datatable-key-tbody").html("");
		$("#datatable-trigger-tbody").html("");
		$("#annotation-comm").val("");
		fieldBtn(0);
		tableIndex(0);
		tableKey(0);
		tableTrigger(0);
		$("#datatable-submit-btn").attr("data-value", "1");
		$("#database-table-tbody td").eq(0).text("▶");
		$("#database-table-tbody td").eq(1).addClass("table-td-style");
		$("#database-table-tbody td").addClass("table-td-default");
		$("#datatable-index-tbody td").eq(0).text("▶");
		$("#datatable-index-tbody td").eq(1).addClass("table-td-style");
		$("#datatable-index-tbody td").addClass("table-td-default");
		$("#datatable-modal").modal("show");
	});
	$(".field-btn").click(function() {
		fieldBtn($(".field-btn").index(this));
	});
	$(".index-event-btn").click(function() {
		tableIndex($(".index-event-btn").index(this));
	});
	$(".key-event-btn").click(function() {
		tableKey($(".key-event-btn").index(this));
	});
	$(".trigger-event-btn").click(function() {
		tableTrigger($(".trigger-event-btn").index(this));
	});
	$("#delete-affirm-btn").click(function() {
		console.log($(this).attr("data-value"));
		if($(this).attr("data-value") == "1001") {
			$("#database_tbody").children().remove();
			$("#table-name-tbody").children().remove();
			$(".sql-topic-hidden").addClass("hidden");
			$("#database-btn").show();
			$("#delete-model").modal("hide");
		}
	});
	$("#save-btn").click(function() {
		var data = {};
		if(judgeDataNull()) {
			return;
		}
		data["difficulty"] = $("input[name='difficulty']:checked").val();
		data["status"] = $("input[name='status']:checked").val();
		var point_ids = [];
		var mykps_flg = false;
		var tds = $("td[tag='kp-data-td']");
		$.each(tds, function(e) {
			var o = $(this);
			var kp_ids = {};
			kp_ids["courseid"] = o.attr("data-courseid");
			kp_ids["chapterid"] = o.attr("data-chapterid");
			kp_ids["knobid"] = o.attr("data-knobid");
			point_ids.push(kp_ids);
			mykps_flg = o.attr("data-status") == "1" ? true : mykps_flg;
		});
		data["pointid"] = JSON.stringify(point_ids);
		data["describe"] = $("#editor-text")[0].contentWindow.getEditorHtml().describe;
		data["descmarkdown"] = $("#editor-text")[0].contentWindow.getEditorHtml().markdown;
		data["answer"] = $("input[name='cbx-ans']:checked").val();
		data["score"] = $("#score").val();
		if(ind == 2 || ind == 3) {
			var jn = [];
			var ans = [];
			var trs = $("#opt-tbody tr");
			$.each(trs, function(e) {
				var o = $(this);
				var d = {};
				var d1 = {};
				d["key"] = o.find("td:first").html();
				d["value"] = o.find("td[tag='term']").attr("data-html");
				d["valuemarkdown"] = o.find("td[tag='term']").attr("data-text");
				d1["ans"] = o.find("[name='cbx-ans']:checked").length;
				jn.push(d);
				ans.push(d1);
			});
			data["option"] = JSON.stringify(jn);
			data["answer"] = JSON.stringify(ans);
		}
		if(ind == 4) {
			data["describe"] = convertOutHtmlNull($("#editor-text")[0].contentWindow.getEditorHtml().describe);
			data["answer"] = convertFillAnswer($("#editor-text")[0].contentWindow.getEditorHtml().describe);
			data["score"] = convertHtmlOutScore($("#editor-text")[0].contentWindow.getEditorHtml().describe);
		}
		if(ind == 5) {
			data["answer"] = $("#editor-answer-text")[0].contentWindow.getEditorHtml().describe;
			data["answermarkdown"] = $("#editor-answer-text")[0].contentWindow.getEditorHtml().markdown;
			data["file"] = $("input[name='upload_file_flag']:checked").val();
			data["image"] = $("input[name='upload_image_flag']:checked").val();
			var jn = [];
			var _score = 0;
			var trs = $("#score-point-tbody tr");
			$.each(trs, function(e) {
				var o = $(this);
				var b = {};
				jn.push(o.find("td[tag='term']").html());
				_score += parseFloat(o.find("td[tag='term']").html());
			});
			if(jn.length < 1) reutrn;
			data["scoreitem"] = "" + jn.join(",") + "";
			data["score"] = _score;
		}
		console.log(data);
	});
});

function probListType() {
	var usrSkip = ["../probsets.html", "judge.html", "single.html", "mult.html", "gapfill.html", "subject.html", "sqltopic.html"];
	$(".left-list").click(function() {
		var ind = $(".left-list").index(this);
		ind = ind >= 7 ? ind - 7 : ind;
		$(location).attr("href", usrSkip[ind]);
	});
}

function judgeDataNull() {
	var editorHtml = $("#editor-text")[0].contentWindow.getEditorHtml();
	var ind = $(".left-list").index($(".left-list-avtive"));
	var mykps_flg = false;
	var tds = $("td[tag='kp-data-td']");
	ind = ind < 6 ? ind : ind - 6;
	if(ind == 5) {
		if($("input[name='title']").val() == "") {
			toastr.danger("请填写标题".toLowerCase());
			return true;
		}
	}
	if($("td[tag='kp-data-td']").length == 0) {
		toastr.danger("请添加题目知识点".toLowerCase());
		return true;
	}
	$.each(tds, function(e) {
		mykps_flg = $(this).attr("data-status") == "1" ? true : mykps_flg;
	});
	if(mykps_flg && $("input[name='status']:checked").val() != 2) {
		toastr.danger("当题目设置为公开时必须选择公开的知识点");
		return;
	}
	if(ind == 1) {
		if($("[name='cbx-ans']:checked").length == 0) {
			toastr.danger("请选择标准答案".toLowerCase());
			return true;
		}
	}
	if(ind == 1 || ind == 2 || ind == 3) {
		if($("input[name='score']").val() == "") {
			toastr.danger("请填写题目分数".toLowerCase());
			return true;
		}
	}
	if(editorHtml.describe == "") {
		toastr.danger("请填写题目描述".toLowerCase());
		return true;
	}
	if(ind == 2 || ind == 3) {
		console.log(ind);
		var trs = $("#opt-tbody tr");
		if(trs.length < 1) {
			toastr.danger("请添加选项".toLowerCase());
			return true;
		}
		if($("[name='cbx-ans']:checked").length == 0) {
			toastr.danger("请选择标准答案");
			return true;
		}
	}
	if(ind == 4) {
		try {
			convertHtmlOutScore(editorHtml.describe);
		} catch(e) {
			toastr.danger("格式错误");
			return true;
		}
	}
	if(ind == 5) {
		var answerHtml = $("#editor-answer-text")[0].contentWindow.getEditorHtml().describe;
		if(answerHtml == "") {
			toastr.danger("请填写评分标准及答案");
			return true;
		}
		if($("#score-point-tbody tr").length < 1) {
			toastr.danger("请填写得分点".toLowerCase());
			return true;
		}
	}
}

function fieldSQL(tableName) {
	var sql = "";
	var keySql = "";
	var indexSql = "";
	var keySql = "";
	var triggerSql = "";
	var previewSql = [];
	var returnSql = [];
	var annotationComm = "";
	var i;
	if(typeof(tableName) == "undefined") {
		tableName = "Untitled";
	}
	$.each($("#database-table-tbody").children(), function() {
		var that = $(this).children();
		if(that.eq(1).is('.table-td-style')) {
			if($("#database-table-tbody").children().length != 1) {
				$(this).remove();
			}
			return true;
		}
		for(i = 1; i < that.length; i++) {
			if(i != 5 && that.eq(i).text() != "") {
				break;
			}
		}
		if(i == 8 && that.eq(5).children().attr("data-is") == 0) {
			return true;
		}
		if(sql != "") {
			sql += ",\n";
		}
		if(that.eq(1).text() != "") {
			sql += " '" + that.eq(1).text() + "'";
		}
		if(that.eq(2).text() != "") {
			sql += " " + that.eq(2).text() + "";
			sql += "(" + that.eq(3).text() + ")";
		} else {
			that.eq(2).text("varchar");
			that.eq(3).text("255");
			sql += " varchar";
			sql += "(255)";
		}
		if(that.eq(5).children().is(':checked')) {
			sql += " NOT NULL";
		} else {
			sql += " NULL";
		}
		if(that.eq(6).children().length != 0) {
			if(keySql != "") {
				keySql += ",\n";
			}
			if(that.eq(1).text() != "") {
				keySql += " PRIMARY KEY (`" + that.eq(1).text() + "`)";
			} else {
				keySql += " PRIMARY KEY ()";
			}
		}
		if(that.eq(7).text() != "") {
			sql += " COMMENT '" + that.eq(7).text() + "'";
		}
	});
	$.each($("#datatable-index-tbody").children(), function() {
		var that = $(this).children();
		if(that.eq(1).is('.table-td-style')) {
			return true;
		}
		if(indexSql != "") {
			indexSql += ",\n";
		}
		var name = that.eq(1).text() == "" ? that.eq(1).text() : " " + that.eq(1).text();
		var method = that.eq(4).text() == "" ? that.eq(4).text() : " USING " + that.eq(4).text();
		var comm = that.eq(5).text() == "" ? that.eq(5).text() : " COMMENT " + that.eq(5).text();
		indexSql += that.eq(3).text() + " INDEX" + name + "(" + that.eq(2).text() + ")" + method + comm;
	});
	$.each($("#datatable-trigger-tbody").children(), function() {
		var that = $(this).children();
		if(that.eq(1).is('.table-td-style')) {
			return true;
		}
		if(triggerSql != "") {
			triggerSql += ";\n";
		}
		var name = that.eq(1).text() == "" ? that.eq(1).text() : " `" + that.eq(1).text() + "`";
		var trigger = that.eq(2).text() == "" ? that.eq(2).text() : " " + that.eq(2).text();
		var content = "";
		var j;
		for(j = 3; j < 6; j++) {
			if(that.eq(j).children().is(":checked")) {
				break;
			}
		}
		content = j == 3 ? " INSERT" : j == 4 ? " UPDATE" : j == 5 ? " DELETE" : "";
		if(name == "" && trigger == "" && content == "") {
			return;
		}
		triggerSql += "\nCREATE TRIGGER" + name + trigger + content + " ON `" + tableName + "` FOR EACH ROW;"
	});
	if(sql != "") {
		previewSql.push(sql);
	}
	if(keySql != "") {
		previewSql.push(keySql);
	}
	if(indexSql != "") {
		previewSql.push(indexSql);
	}
	if($("#annotation-comm").val() != "") {
		annotationComm = " COMMENT = '" + $("#annotation-comm").val() + "'";
	}
	if(previewSql != "") {
		sql = "CREATE TABLE `" + $("#database_tbody").children().children().eq(1).text() + "`.`" + tableName + "`  (\n" + previewSql.join(",\n") + "\n)" + annotationComm + ";";
	} else {
		sql = "CREATE TABLE `" + $("#database_tbody").children().children().eq(1).text() + "`.`" + tableName + "`  ()" + annotationComm + ";";
	}
	returnSql.push(sql);
	if(triggerSql != "") {
		returnSql.push(triggerSql);
	}
	return returnSql;
}

function dataBaseSelectJSON(that, baseData) {
	$.ajax({
		url: "../json/database.json",
		type: "GET",
		//请求成功完成后要执行的方法
		success: function(data) {
			data = data.data;
			if(typeof(that) == "undefined") {
				$("#character-set").html("");
				$("#character-set").append('<option value="" data-text=""></option>');
				for(var i = 0; i < data.length; i++) {
					$("#character-set").append('<option value="' + i + '" data-text="' + data[i].characterset + '">' + data[i].characterset + '</option>');
				}
				$("#character-set").change(function() {
					var dataInd = $(this).val();
					$("#ordering-rule").html("");
					$("#ordering-rule").append('<option value="" data-text=""></option>');
					if(dataInd != "") {
						for(var i = 0; i < data[dataInd].orderingrule.length; i++) {
							$("#ordering-rule").append('<option value="' + i + '" data-text="' + data[dataInd].orderingrule[i].orderingrule + '">' + data[dataInd].orderingrule[i].orderingrule + '</option>');
						}
					}
				});
			} else {
				if(baseData[0] == "") {
					baseData[0] = "utf8";
					baseData[1] = "utf8_general_ci";
				}
				var dataInd;
				that.html("");
				that.append('<option value="" data-text=""></option>');
				for(var i = 0; i < data.length; i++) {
					that.append('<option value="' + data[i].characterset + '" data-ind = "' + i + '">' + data[i].characterset + '</option>');
					if(baseData[0] == data[i].characterset) {
						dataInd = i;
					}
				}
				that.parent().next().children().append('<option value="" data-text=""></option');
				for(var i = 0; i < data[dataInd].orderingrule.length; i++) {
					that.parent().next().children().append('<option value="' + data[dataInd].orderingrule[i].orderingrule + '" >' + data[dataInd].orderingrule[i].orderingrule + '</option>');
				}
				if(data[dataInd].orderingrule.length == 2) {
					baseData[1] = data[dataInd].orderingrule[1].orderingrule;
				} else {
					baseData[1] = baseData[0] + "_general_ci";
				}
				that.val(baseData[0]);
				that.parent().next().children().val(baseData[1]);
				that.change(function() {
					dataInd = $(this).find("option:selected").attr("data-ind");
					that.parent().next().children().html("");
					that.parent().next().children().append('<option></option>');
					if(dataInd != "") {
						for(var i = 0; i < data[dataInd].orderingrule.length; i++) {
							that.parent().next().children().append('<option value="' + i + '" data-text="' + data[dataInd].orderingrule[i].orderingrule + '">' + data[dataInd].orderingrule[i].orderingrule + '</option>');
						}
					}
				});
			}
		}
	});
}

function databaseTableTbodyTdBtn() {
	$("#database-table-tbody td").unbind("click").click(function() {
		var tdThat;
		var t = $(this).parent().children("td").eq(0).text();
		var trInd = $("#database-table-tbody tr").index($(this).parent());
		var tdBool = false;
		var tdTextInd = -1;
		$.each($("#database-table-tbody").children(), function() {
			if($(this).children().eq(0).text() != "") {
				if($("#database-table-tbody tr").length != 1) {
					if($("#database-table-tbody tr").index(this) != trInd) {
						var i = 1;
						var tds = $(this).children();
						for(i = 1; i < tds.length; i++) {
							if(tds.eq(i).text() != "") {
								break;
							}
						}
						if(i == tds.length) {
							$(this).remove();
						}
					}
				}
			}
			$(this).children().eq(1).removeClass("table-td-style");
			$(this).children().addClass("table-td-default");
			$(this).children().removeClass("table-td-text");
			for(var i = 0; i < $(this).children().length; i++) {
				if(i != 0 && i != 5 && i != 2 && i != 6) {
					$(this).children().eq(i).children().remove();
				}
			}
		});
		$(this).removeClass("table-td-default");
		$(this).addClass("table-td-text");
		var trTd = $(this).parent().children();
		if(trTd.index(this) != 0 && trTd.index(this) != 5) {
			if(trTd.index(this) == 1 || trTd.index(this) == 3 || trTd.index(this) == 4 || trTd.index(this) == 7) {
				var fieldText = $(this).text();
				$(this).html('<input type="text" class="text-redact"/>');
				$(".text-redact").val(fieldText);
				$(".text-redact").focus();
				$(".text-redact").blur(function() {
					$(this).parent().text($(this).val());
					$(this).remove();
				});
			}
		}
		if(trTd.index(this) == 2 && $(this).children().length == 0) {
			var fieldText = $(this).text();
			$(this).html('<select class="text-redact"></select>');
			tableFieldSelectJSON(fieldText);
			$(".text-redact").focus();
			$(".text-redact").change(function() {
				var dataTableBottom = $(".text-redact").find('option:selected').attr("data-tableBottom")
				var dataDefaultStatus = $(".text-redact").find('option:selected').attr("data-defaultStatus");
				$("." + dataTableBottom + "").siblings().addClass("hidden");
				$("." + dataTableBottom + "").removeClass("hidden");
				if(dataDefaultStatus == 1) {
					$("." + dataTableBottom + "").children(".table-bottom-default").attr("disabled", "disabled");
				} else {
					$("." + dataTableBottom + "").children(".table-bottom-default").attr("disabled", "");
				}
				var keyIs = $(this).parents("tr").children().eq(6).children().length;
				if(keyIs == 0) {
					$("." + dataTableBottom + "").find(".key-length").attr("disabled", true);
				} else {
					$("." + dataTableBottom + "").find(".key-length").removeAttr("disabled")
				}
			});
			$(".text-redact").blur(function() {
				var dataTableBottom = $(".text-redact").find('option:selected').attr("data-tableBottom")
				var dataDefaultStatus = $(".text-redact").find('option:selected').attr("data-defaultStatus");
				$(this).parent().attr("data-tableBottom", dataTableBottom);
				$(this).parent().attr("data-defaultStatus", dataDefaultStatus);
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
		if(trTd.index(this) == 6 && $(this).children().length == 0) {
			var keyInd = $(".major-key").length + 1;
			$(this).html('<svg class="major-key" t="1596360748576" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2671" width="16" height="16"><path d="M455.111111 204.8C381.155556 284.444444 364.088889 403.911111 409.6 500.622222L113.777778 790.755556V910.222222l68.266666-5.688889 56.888889-56.888889v-28.444444h79.644445V739.555556h73.955555l22.755556-22.755556 5.688889-79.644444 73.955555 5.688888 34.133334-34.133333c91.022222 45.511111 210.488889 28.444444 284.444444-45.511111 96.711111-96.711111 96.711111-256-5.688889-358.4C711.111111 113.777778 551.822222 108.088889 455.111111 204.8z m295.822222 170.666667c-28.444444 28.444444-73.955556 28.444444-102.4 0-22.755556-28.444444-22.755556-73.955556 0-102.4 28.444444-28.444444 73.955556-28.444444 102.4 0s28.444444 73.955556 0 102.4z" fill="#FDB51F" p-id="2672"></path></svg>');
			$(this).append("<span>" + keyInd + "</span>");
			var tds = $(this).parents("tr").children();
			if(tds.eq(5).children().attr("data-is") == 0) {
				tds.eq(5).children().attr("data-is", "1");
				tds.eq(5).children().attr("checked", 'true');
			}
			$(".key-length").attr("disabled", false);
		} else if(trTd.index(this) == 6) {
			var delInd = $(this).children().eq(1).text();
			$(this).html("");
			$.each($(".major-key"), function() {
				if(delInd < $(this).next().text()) {
					var keyInd = parseInt($(this).next().text()) - 1;
					keyInd = keyInd == 0 ? 1 : keyInd;
					$(this).next().text(keyInd);
				}
			});
			$(".key-length").attr("disabled", true);
		}
		$.each($("#database-table-tbody").children(), function() {
			if($(this).children().eq(0).text() != "") {
				tdTextInd = $("#database-table-tbody tr").index($(this));
				if(trInd == $("#database-table-tbody tr").index($(this))) {
					tdBool = true;
				}
				tdThat = $(this);
				$(this).children().eq(0).text("");
			}
		});
		if(tdTextInd != -1 && tdBool == false) {
			var dataTablebottom = tdThat.children().eq(2).attr("data-tablebottom");
			tableBottomData(tdThat.children().eq(2),dataTablebottom);
		}
		if(t != "*") {
			$(this).parent().children("td").eq(0).text("▶");
		} else {
			$(this).parent().children("td").eq(0).text("*");
		}
		
		$.each($("#database-table-tbody").children(), function() {
			$(this).children().eq(6).removeAttr("id");
		});
		$("#database-table-tbody").children().eq(0).children().eq(6).attr("id", "border-top-none");
	});
	$(".fieldNull").unbind("click").click(function() {
		var tds = $(this).parents("tr").children();
		if($(this).attr("data-is") == 0) {
			$(this).attr("data-is", "1");
			if(tds.eq(2).text() == "") {
				tds.eq(2).text("varchar");
			}
			if(tds.eq(3).text() == "") {
				tds.eq(3).text("255");
			}
		}
	});
}

function fieldBtn(ind, len) {
	var h = [];
	var that;
	h.push('<tr>');
	h.push('<td>*</td>');
	h.push('<td></td>');
	h.push('<td data-tableBottom="table-bottom-0"></td>');
	h.push('<td></td>');
	h.push('<td></td>');
	h.push('<td><input type="checkbox" class="fieldNull" data-is="0"/></td>');
	h.push('<td></td>');
	h.push('<td></td>');
	h.push('</tr>');
	if(ind == 0) {
		if($("#database-table-tbody tr").length == 0) {
			$("#database-table-tbody").append(h.join(""));
			var tds = $("#database-table-tbody tr").last().children();
		} else {
			var tds = $("#database-table-tbody tr").last().children();
			var i = 1;
			for(i = 1; i < tds.length; i++) {
				if(tds.eq(i).text() != "") {
					break;
				}
			}
			if(tds.eq(0).text() == "▶" && $("#database-table-tbody tr").length == 1 && i == tds.length) {
				tds.eq(0).text("*");
				return;
			} else {
				tds.eq(0).text("");
				$.each($("#database-table-tbody").children(), function() {
					if($(this).children().eq(2).text() == "") {
						$(this).children().eq(2).text("varchar");
						$(this).children().eq(2).attr("data-tableBottom", "table-bottom-3");
						$(this).children().eq(2).attr("data-defaultStatus", "0");
					}
					if($(this).children().eq(3).text() == "") {
						$(this).children().eq(3).text("255");
					}
				});
				$("#database-table-tbody").append(h.join(""));
				$.each($("#database-table-tbody").children(), function() {
					$(this).children().eq(1).removeClass("table-td-style");
					$(this).children().addClass("table-td-default");
				});
				$("#database-table-tbody tr").last().children().eq(1).addClass("table-td-style");
			}
			if(tds.eq(0).text() == "*") {
				tds.eq(0).text("");
				$.each($("#database-table-tbody").children(), function() {
					if($(this).children().eq(2).text() == "") {
						$(this).children().eq(2).text("varchar");
						$(this).children().eq(2).attr("data-tableBottom", "table-bottom-3");
						$(this).children().eq(2).attr("data-defaultStatus", "0");
					}
					if($(this).children().eq(3).text() == "") {
						$(this).children().eq(3).text("255");
					}
				});
				$("#database-table-tbody").append(h.join(""));
				$.each($("#database-table-tbody").children(), function() {
					$(this).children().eq(1).removeClass("table-td-style");
					$(this).children().addClass("table-td-default");
				});
				$("#database-table-tbody tr").last().children().eq(1).addClass("table-td-style");
			}
			for(var i = 0; i < $("#database-table-tbody tr").length - 1; i++) {
				var trTds = $("#database-table-tbody tr").eq(i).children();
				trTds.eq(0).text("");
				if(tds.eq(2).text() == "") {
					tds.eq(2).text("varchar");
					tds.eq(2).attr("data-tableBottom", "table-bottom-3");
					tds.eq(2).attr("data-defaultStatus", "0");
					tds.eq(3).text("255");
				}
			}
		}
		$('.table-top-style')[0].scrollTop = $('.table-top-style')[0].scrollHeight;
	}
	if(ind == 1) {
		$.each($("#database-table-tbody").children(), function() {
			that = $(this);
			if(that.children().eq(0).text() != "") {
				return false;
			}
		});
		var tds = that.children();
		var i = 1;
		for(i = 1; i < tds.length; i++) {
			if(tds.eq(i).text() != "") {
				break;
			}
		}
		if(tds.eq(0).text() == "▶" && $("#database-table-tbody tr").length == 1 && i == tds.length) {
			tds.eq(0).text("*");
			return;
		} else {
			tds.eq(0).text("");
			that.before(h.join(""));
			$.each($("#database-table-tbody").children(), function() {
				$(this).children().eq(1).removeClass("table-td-style");
				$(this).children().addClass("table-td-default");
			});
			that.prev().children().eq(1).addClass("table-td-style");
			if(tds.eq(2).text() == "") {
				tds.eq(2).text("varchar");
				tds.eq(2).attr("data-tableBottom", "table-bottom-3");
				tds.eq(2).attr("data-defaultStatus", "0");
				tds.eq(3).text("255");
			}
		}
	}
	if(ind == 2) {
		if($("#database-table-tbody tr").length == 1) {
			var tds = $("#database-table-tbody tr").last().children();
			var i = 1;
			for(i = 1; i < tds.length; i++) {
				if(tds.eq(i).text() != "") {
					break;
				}
			}
			if(tds.eq(0).text() != "*" && i == 8) {
				return;
			}
		}
		layer.open({
			skin: 'demo-class',
			offset: "auto",
			id: 'layerDemo',
			title: "确认删除",
			content: '删除字段？',
			btnAlign: 'c',
			btn: ["确认", "取消"],
			yes: function(index) {
				if($("#database-table-tbody tr").length == 1) {
					var tds = $("#database-table-tbody tr").last().children();
					for(var i = 1; i < tds.length; i++) {
						tds.eq(i).text("");
					}
					tds.eq(0).text("▶");
				} else {
					$.each($("#database-table-tbody").children(), function() {
						if($(this).children().eq(0).text() != "") {
							$(this).next().children().eq(0).text("▶");
							$(this).next().children().eq(1).addClass("table-td-style");
							$(this).remove();
							if($(this).next().length == 0) {
								$("#database-table-tbody tr").last().children().eq(0).text("▶");
								$("#database-table-tbody tr").last().children().eq(1).addClass("table-td-style");
							}
							return false;
						}
					});
				}
				$.each($("#database-table-tbody").children(), function() {
					if($(this).children().eq(0).text() != "") {
						var trTd = $(this).children().eq(6);
						if(trTd.children().length == 0) {
							var keyInd = $(".major-key").length + 1;
							trTd.html('<svg class="major-key" t="1596360748576" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2671" width="16" height="16"><path d="M455.111111 204.8C381.155556 284.444444 364.088889 403.911111 409.6 500.622222L113.777778 790.755556V910.222222l68.266666-5.688889 56.888889-56.888889v-28.444444h79.644445V739.555556h73.955555l22.755556-22.755556 5.688889-79.644444 73.955555 5.688888 34.133334-34.133333c91.022222 45.511111 210.488889 28.444444 284.444444-45.511111 96.711111-96.711111 96.711111-256-5.688889-358.4C711.111111 113.777778 551.822222 108.088889 455.111111 204.8z m295.822222 170.666667c-28.444444 28.444444-73.955556 28.444444-102.4 0-22.755556-28.444444-22.755556-73.955556 0-102.4 28.444444-28.444444 73.955556-28.444444 102.4 0s28.444444 73.955556 0 102.4z" fill="#FDB51F" p-id="2672"></path></svg>');
							trTd.append("<span>" + keyInd + "</span>");
							trTd.parents("tr").children().eq(1).removeClass("table-td-style");
							var tds = trTd.parents("tr").children();
							if(tds.eq(5).children().attr("data-is") == 0) {
								tds.eq(5).children().attr("data-is", "1");
								tds.eq(5).children().attr("checked", 'true');
							}
							$(".key-length").attr("disabled", false);
						} else {
							var delInd = trTd.children().eq(1).text();
							trTd.html("");
							$.each($(".major-key"), function() {
								if(delInd < $(this).next().text()) {
									var keyInd = parseInt($(this).next().text()) - 1;
									keyInd = keyInd == 0 ? 1 : keyInd;
									$(this).next().text(keyInd);
								}
							});
							$(".key-length").attr("disabled", true);
						}
					}
				});
				layer.close(index);
			},
			btn2: function(index) {
				layer.close(index);
			}
		});
	}
	if(ind == 3) {
		$.each($("#database-table-tbody").children(), function() {
			if($(this).children().eq(0).text() != "") {
				var trTd = $(this).children().eq(6);
				if(trTd.children().length == 0) {
					var keyInd = $(".major-key").length + 1;
					trTd.html('<svg class="major-key" t="1596360748576" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2671" width="16" height="16"><path d="M455.111111 204.8C381.155556 284.444444 364.088889 403.911111 409.6 500.622222L113.777778 790.755556V910.222222l68.266666-5.688889 56.888889-56.888889v-28.444444h79.644445V739.555556h73.955555l22.755556-22.755556 5.688889-79.644444 73.955555 5.688888 34.133334-34.133333c91.022222 45.511111 210.488889 28.444444 284.444444-45.511111 96.711111-96.711111 96.711111-256-5.688889-358.4C711.111111 113.777778 551.822222 108.088889 455.111111 204.8z m295.822222 170.666667c-28.444444 28.444444-73.955556 28.444444-102.4 0-22.755556-28.444444-22.755556-73.955556 0-102.4 28.444444-28.444444 73.955556-28.444444 102.4 0s28.444444 73.955556 0 102.4z" fill="#FDB51F" p-id="2672"></path></svg>');
					trTd.append("<span>" + keyInd + "</span>");
					trTd.parents("tr").children().eq(1).removeClass("table-td-style");
					var tds = trTd.parents("tr").children();
					if(tds.eq(5).children().attr("data-is") == 0) {
						tds.eq(5).children().attr("data-is", "1");
						tds.eq(5).children().attr("checked", 'true');
					}
					$(".key-length").attr("disabled", false);
				} else {
					var delInd = trTd.children().eq(1).text();
					trTd.html("");
					$.each($(".major-key"), function() {
						if(delInd < $(this).next().text()) {
							var keyInd = parseInt($(this).next().text()) - 1;
							keyInd = keyInd == 0 ? 1 : keyInd;
							$(this).next().text(keyInd);
						}
					});
					$(".key-length").attr("disabled", true);
				}
			}
		});
	}
	if(ind == 4) {
		if($("#database-table-tbody").children().length == 1) {
			return;
		}
		$.each($("#database-table-tbody").children(), function() {
			if($(this).children().eq(0).text() != "") {
				if($(this).children().eq(2).text() == "") {
					$(this).children().eq(2).text("varchar");
					$(this).children().eq(2).attr("data-tableBottom", "table-bottom-3");
					$(this).children().eq(2).attr("data-defaultStatus", "0");
					$(this).children().eq(3).text("255");
				}
				var e = $(this);
				e.prev().insertAfter(e);
			}
		});
	}
	if(ind == 5) {
		if($("#database-table-tbody").children().length == 1) {
			return;
		}
		$.each($("#database-table-tbody").children(), function() {
			if($(this).children().eq(0).text() != "") {
				if($(this).children().eq(2).text() == "") {
					$(this).children().eq(2).text("varchar");
					$(this).children().eq(2).attr("data-tableBottom", "table-bottom-3");
					$(this).children().eq(2).attr("data-defaultStatus", "0");
					$(this).children().eq(3).text("255");
				}
				var e = $(this);
				e.next().insertBefore(e);
			}
		});
	}
	databaseTableTbodyTdBtn();
	$.each($("#database-table-tbody").children(), function() {
		$(this).children().eq(6).removeAttr("id");
	});
	$("#database-table-tbody").children().eq(0).children().eq(6).attr("id", "border-top-none");
}

function tableIndexBtn() {
	$("#datatable-index-tbody td").unbind("click").click(function() {
		if($(this).parent().children().index(this) != 0) {
			var t = $(this).parent().children("td").eq(0).text();
			var tdInd = $(this).parent().children().index(this);
			var that = $(this);
			$.each($("#datatable-index-tbody tr"), function() {
				$(this).children().eq(0).text("");
				$(this).children().eq(0).text("");
				$(this).children().eq(1).removeClass("table-td-style");
				$(this).children().addClass("table-td-default");
				$(this).children().removeClass("table-td-text");
			});
			$(this).parent().children().eq(0).text("▶");
			if(t != "*") {
				$(this).parent().children("td").eq(0).text("▶");
			} else {
				$(this).parent().children("td").eq(0).text("*");
			}
			$(this).removeClass("table-td-default");
			$(this).addClass("table-td-text");
			var trTd = $(this).parent().children();
			var fieldText = $(this).text();
			if(tdInd == 1 || tdInd == 5) {
				$(this).html('<input type="text" class="text-redact"/>');
				$(".text-redact").val(fieldText);
				$(".text-redact").focus();
				$(".text-redact").blur(function() {
					$(this).parent().text($(this).val());
					$(this).remove();
				});
			}
			if(tdInd == 2) {
				var h = [];
				h.push('<tr>');
				h.push('<td>▶</td>');
				h.push('<td><input type="checkbox" /></td>');
				h.push('<td></td>');
				h.push('<td></td>');
				h.push('</tr>');
				$("#index-field-tbody").html(h.join(""));
				$(".table-index-modal").show();
				inexFieldBtn(this);
				inexFieldTdBtn();
			}
			if(tdInd == 3 && $(this).children().length == 0) {
				$(this).html('<select class="text-redact"><option></option></select>');
				$(".text-redact").append('<option value="FULLTEXT">FULLTEXT</option>');
				$(".text-redact").append('<option value="NORMAL">NORMAL</option>');
				$(".text-redact").append('<option value="SPATIAL">SPATIAL</option>');
				$(".text-redact").append('<option value="UNIQUE">UNIQUE</option>');
				$(".text-redact").val(fieldText);
				$(".text-redact").focus();
				$(".text-redact").blur(function() {
					$(this).parent().text($(this).val());
					$(this).remove();
				});
			}
			if(tdInd == 4 && $(this).children().length == 0) {
				$(this).html('<select class="text-redact"><option></option></select>');
				$(".text-redact").append('<option value="BTREE">BTREE</option>');
				$(".text-redact").append('<option value="HASH">HASH</option>');
				$(".text-redact").val(fieldText);
				$(".text-redact").focus();
				$(".text-redact").blur(function() {
					$(this).parent().text($(this).val());
					$(this).remove();
				});
			}
		}
	});
}

function inexFieldBtn(that) {
	$(".table-index-field-btn").unbind("click").click(function() {
		var ind = $(".table-index-field-btn").index(this);
		if(ind == 0) {
			$.each($("#index-field-tbody").children(), function() {
				if($(this).children().eq(0).text() != "") {
					var e = $(this);
					e.prev().insertAfter(e);
				}
			});
		}
		if(ind == 1) {
			$.each($("#index-field-tbody").children(), function() {
				if($(this).children().eq(0).text() != "") {
					var e = $(this);
					e.next().insertBefore(e);
				}
			});
		}
		if(ind == 2) {
			$.each($("#index-field-tbody tr"), function() {
				$(this).children().eq(0).text("");
			});
			var h = [];
			h.push('<tr>');
			h.push('<td>▶</td>');
			h.push('<td><input type="checkbox" /></td>');
			h.push('<td></td>');
			h.push('<td></td>');
			h.push('</tr>');
			$("#index-field-tbody").append(h.join(""));
			$('.table-list-top')[0].scrollTop = $('.table-list-top')[0].scrollHeight;
		}
		if(ind == 3) {
			$.each($("#index-field-tbody tr"), function() {
				if($(this).children().eq(0).text() != "") {
					if($(this).next().length == 0) {
						$(this).prev().children().eq(0).text("▶");
					}
					if($("#index-field-tbody tr").length == 1) {
						$(this).children().eq(1).children().attr("checked", false);
						$(this).children().eq(2).text("");
						$(this).children().eq(3).text("");
					} else {
						$(this).remove();
					}
					return false;
				}
			});
		}
		inexFieldTdBtn();
	});
	$(".index-field-affirm-btn").unbind("click").click(function() {
		var filedData = [];
		$.each($("#index-field-tbody tr"), function() {
			if($(this).children().eq(1).children()[0].checked) {
				if($(this).children().eq(2).text() != "") {
					var td = "'" + $(this).children().eq(2).text() + "'";
				}
				if(td != "" && $(this).children().eq(3).text() != "") {
					td += "(" + $(this).children().eq(3).text() + ")";
				}
				if(td != "") {
					filedData.push(td);
				}
			}
		});
		$(that).text(filedData.join(","));
		$(".table-index-modal").hide();
	});
	$(".index-field-cancel-btn").unbind("click").click(function() {
		$(".table-index-modal").hide();
	});
}

function inexFieldTdBtn() {
	$("#index-field-tbody td").unbind("click").click(function() {
		$.each($("#index-field-tbody tr"), function() {
			$(this).children().eq(0).text("");
		});
		$(this).parent().children().eq(0).text("▶");
		var tdInd = $(this).parent().children().index(this);
		if(tdInd == 2 && $(this).children().length == 0) {
			var tdText = $(this).text();
			$(this).html('<select class="inexfieldtd"></select>');
			$(".inexfieldtd").html("<option></option>");
			$(".inexfieldtd").append('<option value="abc">abc</option>')
			$(".inexfieldtd").val(tdText);
			$(".inexfieldtd").focus();
			$(".inexfieldtd").blur(function() {
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
		if(tdInd == 3 && $(this).children().length == 0) {
			var tdText = $(this).text();
			$(this).html('<input class="inexfieldtd" type="number" min="1" />');
			$(".inexfieldtd").val(tdText);
			$(".inexfieldtd").focus();
			$(".inexfieldtd").blur(function() {
				if($(this).val() > 0) {
					$(this).parent().text($(this).val());
				}
				$(this).remove();
			});
		}
	});
}

function tableIndex(ind) {
	var h = [];
	var that;
	h.push('<tr>');
	h.push('<td>*</td>');
	h.push('<td></td>');
	h.push('<td></td>');
	h.push('<td></td>');
	h.push('<td></td>');
	h.push('<td></td>');
	h.push('</tr>');
	if(ind == 0) {
		if($("#datatable-index-tbody tr").length == 0) {
			$("#datatable-index-tbody").append(h.join(""));
		} else {
			var tds = $("#datatable-index-tbody tr").last().children();
			var i = 1;
			for(i = 1; i < tds.length; i++) {
				if(tds.eq(i).text() != "") {
					break;
				}
			}
			if(tds.eq(0).text() == "▶" && $("#datatable-index-tbody tr").length == 1 && i == tds.length) {
				tds.eq(0).text("*");
				return;
			} else {
				$.each($("#datatable-index-tbody").children(), function() {
					$(this).children().eq(0).text("");
				});
				$("#datatable-index-tbody").append(h.join(""));
				$.each($("#datatable-index-tbody").children(), function() {
					$(this).children().eq(1).removeClass("table-td-style");
					$(this).children().addClass("table-td-default");
				});
				$("#datatable-index-tbody tr").last().children().eq(1).addClass("table-td-style");
			}
			if(tds.eq(0).text() == "*") {
				$.each($("#datatable-index-tbody").children(), function() {
					$(this).children().eq(0).text("");
				});
				$("#datatable-index-tbody").append(h.join(""));
				$.each($("#datatable-index-tbody").children(), function() {
					$(this).children().eq(1).removeClass("table-td-style");
					$(this).children().addClass("table-td-default");
				});
				$("#datatable-index-tbody tr").last().children().eq(1).addClass("table-td-style");
			}
		}
		$('.table-top-index-scroll')[0].scrollTop = $('.table-top-index-scroll')[0].scrollHeight;
	}
	if(ind == 1) {
		if($("#datatable-index-tbody tr").length == 1) {
			var tds = $("#datatable-index-tbody tr").last().children();
			var i = 1;
			for(i = 1; i < tds.length; i++) {
				if(tds.eq(i).text() != "") {
					break;
				}
			}
			if(tds.eq(0).text() != "*" && i == 6) {
				return;
			}
		}
		layer.open({
			skin: 'demo-class',
			offset: "auto",
			id: 'layerDemo',
			title: "确认删除",
			content: '删除字段？',
			btnAlign: 'c',
			btn: ["确认", "取消"],
			yes: function(index) {
				if($("#datatable-index-tbody tr").length == 1) {
					var tds = $("#datatable-index-tbody tr").last().children();
					for(var i = 1; i < tds.length; i++) {
						tds.eq(i).text("");
					}
					tds.eq(0).text("▶");
				} else {
					$.each($("#datatable-index-tbody").children(), function() {
						if($(this).children().eq(0).text() != "") {
							$(this).next().children().eq(0).text("▶");
							$(this).next().children().eq(1).addClass("table-td-style");
							$(this).remove();
							if($(this).next().length == 0) {
								$("#datatable-index-tbody tr").last().children().eq(0).text("▶");
								$("#datatable-index-tbody tr").last().children().eq(1).addClass("table-td-style");
							}
							return false;
						}
					});
				}
				layer.close(index)
			},
			btn2: function(index) {
				layer.close(index);
			}
		});
	}
	tableIndexBtn();
}

function tableKeyBtn() {
	$("#datatable-key-tbody td").unbind("click").click(function() {
		var tdInd = $(this).parent().children().index(this);
		var tdText = $(this).parent().children().eq(0).text();
		if(tdInd != 0) {
			$.each($("#datatable-key-tbody").children(), function() {
				$(this).children().eq(0).text("");
				$(this).children().eq(1).removeClass("table-td-style");
				$(this).children().addClass("table-td-default");
				$(this).children().removeClass("table-td-text");
			});
			$(this).parent().children().eq(0).text(tdText);
		}
		if(tdInd == 1) {
			var fieldText = $(this).text();
			$(this).parents("tr").children().eq(3).text($("#database_tbody").children().children().eq(1).text());
			$(this).html('<input type="text" class="text-redact"/>');
			$(".text-redact").val(fieldText);
			$(".text-redact").focus();
			$(".text-redact").blur(function() {
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
		if(tdInd == 2) {
			var h = [];
			h.push('<tr>');
			h.push('<td>▶</td>');
			h.push('<td><input type="checkbox" /></td>');
			h.push('<td>abc</td>');
			h.push('</tr>');
			$("#table-foreign-key-tbody").html(h.join(""));
			$(".table-foreign-key-modal").show();
			foreignKeyBtn(this);
			$(".table-foreign-key-modal").show();
		}
		if(tdInd == 3 && $(this).children().length == 0) {
			var fieldText = $(this).text();
			$(this).html('<select class="text-redact"><option></option></select>');
			$(".text-redact").append('<option value="' + $("#database_tbody").children().children().eq(1).text() + '">' + $("#database_tbody").children().children().eq(1).text() + '</option>');
			$(".text-redact").val(fieldText);
			$(".text-redact").focus();
			$(".text-redact").blur(function() {
				$(this).parents("tr").children().eq(3).text($("#database_tbody").children().children().eq(1).text());
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
		if(tdInd == 4 && $(this).children().length == 0) {
			var fieldText = $(this).text();
			$(this).html('<select class="text-redact"><option></option></select>');
			$(".text-redact").append('<option value="CASCADE">CASCADE</option>');
			$(".text-redact").append('<option value="NO ACTION">NO ACTION</option>');
			$(".text-redact").append('<option value="RESTRICT">RESTRICT</option>');
			$(".text-redact").append('<option value="SET NULL">SET NULL</option>');
			$(".text-redact").val(fieldText);
			$(".text-redact").focus();
			$(".text-redact").blur(function() {
				$(this).parents("tr").children().eq(3).text($("#database_tbody").children().children().eq(1).text());
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
		if(tdInd == 5) {
			var h = [];
			h.push('<tr>');
			h.push('<td>▶</td>');
			h.push('<td><input type="checkbox" /></td>');
			h.push('<td>abc</td>');
			h.push('</tr>');
			$("#table-foreign-key-tbody").html(h.join(""));
			$(".table-foreign-key-modal").show();
			foreignKeyBtn(this);
			$(".table-foreign-key-modal").show();
		}
		if(tdInd == 6 && $(this).children().length == 0) {
			var fieldText = $(this).text();
			$(this).html('<select class="text-redact"><option></option></select>');
			$(".text-redact").append('<option value="CASCADE">CASCADE</option>');
			$(".text-redact").append('<option value="NO ACTION">NO ACTION</option>');
			$(".text-redact").append('<option value="RESTRICT">RESTRICT</option>');
			$(".text-redact").append('<option value="SET NULL">SET NULL</option>');
			$(".text-redact").val(fieldText);
			$(".text-redact").focus();
			$(".text-redact").blur(function() {
				$(this).parents("tr").children().eq(3).text($("#database_tbody").children().children().eq(1).text());
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
		if(tdInd == 7 && $(this).children().length == 0) {
			var fieldText = $(this).text();
			$(this).html('<select class="text-redact"><option></option></select>');
			$(".text-redact").append('<option value="CASCADE">CASCADE</option>');
			$(".text-redact").append('<option value="NO ACTION">NO ACTION</option>');
			$(".text-redact").append('<option value="RESTRICT">RESTRICT</option>');
			$(".text-redact").append('<option value="SET NULL">SET NULL</option>');
			$(".text-redact").val(fieldText);
			$(".text-redact").val(fieldText);
			$(".text-redact").focus();
			$(".text-redact").blur(function() {
				$(this).parents("tr").children().eq(3).text($("#database_tbody").children().children().eq(1).text());
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
	});
}

function foreignKeyBtn(that) {
	$(".table-foreign-key-btn").unbind("click").click(function() {
		var ind = $(".table-foreign-key-btn").index(this);
		if(ind == 0) {
			$.each($("#table-foreign-key-tbody").children(), function() {
				if($(this).children().eq(0).text() != "") {
					var e = $(this);
					e.prev().insertAfter(e);
				}
			});
		}
		if(ind == 1) {
			$.each($("#table-foreign-key-tbody").children(), function() {
				if($(this).children().eq(0).text() != "") {
					var e = $(this);
					e.next().insertBefore(e);
				}
			});
		}
	});
	$(".foreign-key-affirm-btn").unbind("click").click(function() {
		var keyData = [];
		$.each($("#table-foreign-key-tbody tr"), function() {
			if($(this).children().eq(1).children()[0].checked) {
				if($(this).children().eq(2).text() != "") {
					var td = $(this).children().eq(2).text();
				}
				if(td != "") {
					keyData.push(td);
				}
			}
		});
		$(that).text(keyData.join(","));
		$(".table-foreign-key-modal").hide();
	});
	$(".foreign-key-cancel-btn").unbind("click").click(function() {
		$(".table-foreign-key-modal").hide();
	});
}

function tableKey(ind) {
	var h = [];
	h.push("<tr>");
	h.push("<td>*</td>");
	h.push("<td></td>");
	h.push("<td></td>");
	h.push("<td></td>");
	h.push("<td></td>");
	h.push("<td></td>");
	h.push("<td></td>");
	h.push("<td></td>");
	h.push("</tr>");
	if(ind == 0) {
		if($("#datatable-key-tbody tr").length == 0) {
			$("#datatable-key-tbody").html(h.join(""));
			$("#datatable-key-tbody tr").eq(0).children().eq(0).text("▶");
			$("#datatable-key-tbody td").eq(1).addClass("table-td-style");
			$("#datatable-key-tbody td").addClass("table-td-default");
		} else {
			var tds = $("#datatable-key-tbody tr").last().children();
			var i = 1;
			for(i = 1; i < tds.length; i++) {
				if(tds.eq(i).text() != "") {
					break;
				}
			}
			if(tds.eq(0).text() == "▶" && $("#datatable-key-tbody tr").length == 1 && i == tds.length) {
				tds.eq(0).text("*");
				return;
			} else {
				$.each($("#datatable-key-tbody").children(), function() {
					$(this).children().eq(0).text("");
				});
				$("#datatable-key-tbody").append(h.join(""));
				$.each($("#datatable-key-tbody").children(), function() {
					$(this).children().eq(1).removeClass("table-td-style");
					$(this).children().addClass("table-td-default");
				});
				$("#datatable-key-tbody tr").last().children().eq(1).addClass("table-td-style");
			}
			if(tds.eq(0).text() == "*") {
				$.each($("#datatable-key-tbody").children(), function() {
					$(this).children().eq(0).text("");
				});
				$("#datatable-key-tbody").append(h.join(""));
				$.each($("#datatable-key-tbody").children(), function() {
					$(this).children().eq(1).removeClass("table-td-style");
					$(this).children().addClass("table-td-default");
				});
				$("#datatable-key-tbody tr").last().children().eq(1).addClass("table-td-style");
			}
		}
	}
	if(ind == 1) {
		if($("#datatable-key-tbody tr").length == 1) {
			var tds = $("#datatable-key-tbody tr").last().children();
			var i = 1;
			for(i = 1; i < tds.length; i++) {
				if(tds.eq(i).text() != "") {
					break;
				}
			}
			if(tds.eq(0).text() != "*" && i == tds.length) {
				return;
			}
		}
		layer.open({
			skin: 'demo-class',
			offset: "auto",
			id: 'layerDemo',
			title: "确认删除",
			content: '删除字段？',
			btnAlign: 'c',
			btn: ["确认", "取消"],
			yes: function(index) {
				if($("#datatable-key-tbody tr").length == 1) {
					var tds = $("#datatable-key-tbody tr").last().children();
					for(var i = 1; i < tds.length; i++) {
						tds.eq(i).text("");
					}
					tds.eq(0).text("▶");
				} else {
					$.each($("#datatable-key-tbody").children(), function() {
						if($(this).children().eq(0).text() != "") {
							$(this).next().children().eq(0).text("▶");
							$(this).next().children().eq(1).addClass("table-td-style");
							$(this).remove();
							if($(this).next().length == 0) {
								$("#datatable-key-tbody tr").last().children().eq(0).text("▶");
								$("#datatable-key-tbody tr").last().children().eq(1).addClass("table-td-style");
							}
							return false;
						}
					});
				}
				layer.close(index)
			},
			btn2: function(index) {
				layer.close(index);
			}
		});
	}
	tableKeyBtn();
}

function triggerBtn() {
	$("#datatable-trigger-tbody td").unbind("click").click(function() {
		var tdInd = $(this).parent().children().index(this);
		var tdText = $(this).parent().children().eq(0).text();
		if(tdInd == 1 || tdInd == 2) {
			$.each($("#datatable-trigger-tbody").children(), function() {
				$(this).children().eq(0).text("");
				$(this).children().eq(1).removeClass("table-td-style");
				$(this).children().addClass("table-td-default");
				$(this).children().removeClass("table-td-text");
			});
			if(tdText == "*") {
				$(this).parent().children().eq(0).text(tdText);
			} else {
				$(this).parent().children().eq(0).text("▶");
			}
		}
		if(tdInd == 1) {
			var fieldText = $(this).text();
			$(this).html('<input type="text" class="text-redact"/>');
			$(".text-redact").val(fieldText);
			$(".text-redact").focus();
			$(".text-redact").blur(function() {
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
		if(tdInd == 2 && $(this).children().length == 0) {
			$(this).html('<select class="text-redact"><option></option></select>');
			$(".text-redact").append('<option value="AFTER">AFTER</option>');
			$(".text-redact").append('<option value="BEFORE">BEFORE</option>');
			$(".text-redact").val(fieldText);
			$(".text-redact").focus();
			$(".text-redact").blur(function() {
				$(this).parent().text($(this).val());
				$(this).remove();
			});
		}
	});
	$.each($("#datatable-trigger-tbody").children(), function() {
		if($(this).children().eq(0).text() != "") {
			$.each($(this).find(":checkbox"), function() {
				$(this).click(function() {
					$.each($("#datatable-trigger-tbody").children(), function() {
						$(this).children().eq(1).removeClass("table-td-style");
						$(this).children().addClass("table-td-default");
						$(this).children().removeClass("table-td-text");
					});
					if($("#datatable-trigger-tbody tr").length == 1 && $("#datatable-trigger-tbody tr").eq(0).children().eq(0).text() == "▶") {
						$("#datatable-trigger-tbody tr").eq(0).children().eq(0).text("*");
					}
					if($(this).is(':checked')) {
						$(this).attr("checked", true);
						var checedInd = $(this).parents("tr").find(":checkbox").index(this);
						for(var i = 0; i < $(this).parents("tr").find(":checkbox").length; i++) {
							if(checedInd != i) {
								$(this).parents("tr").find(":checkbox").eq(i).attr("checked", false);
							}
						}
					}
				});
			});
			return false;
		}
	});
}

function tableTrigger(ind) {
	var h = [];
	h.push('<tr>');
	h.push('<td>*</td>');
	h.push('<td></td>');
	h.push('<td></td>');
	h.push('<td><input type= "checkbox"/></td>');
	h.push('<td><input type= "checkbox"/></td>');
	h.push('<td><input type= "checkbox"/></td>');
	h.push('</tr>');
	if(ind == 0) {
		if($("#datatable-trigger-tbody tr").length == 0) {
			$("#datatable-trigger-tbody").html(h.join(""));
			$("#datatable-trigger-tbody tr").eq(0).children().eq(0).text("▶");
			$("#datatable-trigger-tbody td").eq(1).addClass("table-td-style");
			$("#datatable-trigger-tbody td").addClass("table-td-default");
		} else {
			var tds = $("#datatable-trigger-tbody tr").last().children();
			var i = 1;
			for(i = 1; i < tds.length; i++) {
				if(tds.eq(i).text() != "") {
					break;
				}
			}
			if(tds.eq(0).text() == "▶" && $("#datatable-trigger-tbody tr").length == 1 && i == tds.length) {
				tds.eq(0).text("*");
				return;
			} else {
				$.each($("#datatable-trigger-tbody").children(), function() {
					$(this).children().eq(0).text("");
				});
				$("#datatable-trigger-tbody").append(h.join(""));
				$.each($("#datatable-trigger-tbody").children(), function() {
					$(this).children().eq(1).removeClass("table-td-style");
					$(this).children().addClass("table-td-default");
				});
				$("#datatable-trigger-tbody tr").last().children().eq(1).addClass("table-td-style");
			}
			if(tds.eq(0).text() == "*") {
				$.each($("#datatable-trigger-tbody").children(), function() {
					$(this).children().eq(0).text("");
				});
				$("#datatable-trigger-tbody").append(h.join(""));
				$.each($("#datatable-trigger-tbody").children(), function() {
					$(this).children().eq(1).removeClass("table-td-style");
					$(this).children().addClass("table-td-default");
				});
				$("#datatable-trigger-tbody tr").last().children().eq(1).addClass("table-td-style");
			}
		}
	}
	if(ind == 1) {
		$.each($("#datatable-trigger-tbody").children(), function() {
			that = $(this);
			if(that.children().eq(0).text() != "") {
				return false;
			}
		});
		var tds = that.children();
		var i = 1;
		for(i = 1; i < tds.length; i++) {
			if(tds.eq(i).text() != "") {
				break;
			}
		}
		if(tds.eq(0).text() == "▶" && $("#datatable-trigger-tbody tr").length == 1 && i == tds.length) {
			tds.eq(0).text("*");
			return;
		} else {
			tds.eq(0).text("");
			that.before(h.join(""));
			$.each($("#datatable-trigger-tbody").children(), function() {
				$(this).children().eq(1).removeClass("table-td-style");
				$(this).children().addClass("table-td-default");
			});
			that.prev().children().eq(1).addClass("table-td-style");
		}
	}
	if(ind == 2) {
		if($("#datatable-trigger-tbody tr").length == 1) {
			var tds = $("#datatable-trigger-tbody tr").last().children();
			var i = 1;
			for(i = 1; i < tds.length; i++) {
				if(tds.eq(i).text() != "") {
					break;
				}
			}
			if(tds.eq(0).text() != "*" && i == 6) {
				return;
			}
		}
		layer.open({
			skin: 'demo-class',
			offset: "auto",
			id: 'layerDemo',
			title: "确认删除",
			content: '删除字段？',
			btnAlign: 'c',
			btn: ["确认", "取消"],
			yes: function(index) {
				if($("#datatable-trigger-tbody tr").length == 1) {
					var tds = $("#datatable-trigger-tbody tr").last().children();
					for(var i = 1; i < tds.length; i++) {
						tds.eq(i).text("");
					}
					tds.eq(0).text("▶");
				} else {
					$.each($("#datatable-trigger-tbody").children(), function() {
						if($(this).children().eq(0).text() != "") {
							$(this).next().children().eq(0).text("▶");
							$(this).next().children().eq(1).addClass("table-td-style");
							$(this).remove();
							if($(this).next().length == 0) {
								$("#datatable-trigger-tbody tr").last().children().eq(0).text("▶");
								$("#datatable-trigger-tbody tr").last().children().eq(1).addClass("table-td-style");
							}
							return false;
						}
					});
				}
				layer.close(index)
			},
			btn2: function(index) {
				layer.close(index);
			}
		});
	}
	if(ind == 3) {
		$.each($("#datatable-trigger-tbody").children(), function() {
			if($(this).children().eq(0).text() != "") {
				var e = $(this);
				e.prev().insertAfter(e);
			}
		});
	}
	if(ind == 4) {
		$.each($("#datatable-trigger-tbody").children(), function() {
			if($(this).children().eq(0).text() != "") {
				var e = $(this);
				e.next().insertBefore(e);
			}
		});
	}
	triggerBtn();
}

function tableFieldSelectJSON(text) {
	$.ajax({
		url: "../json/field.json",
		type: "GET",
		//请求成功完成后要执行的方法
		success: function(data) {
			data = data.data;
			$(".text-redact").html("<option></option>");
			for(var i = 0; i < data.length; i++) {
				$(".text-redact").append('<option data-tableBottom="' + data[i].tableBottom + '" data-defaultStatus="' + data[i].defaultStatus + '">' + data[i].field + '</option>');
			}
			$(".text-redact").val(text);
		}
	});
}

function dataTableBottomSelectJSON() {
	$.ajax({
		url: "../json/database.json",
		type: "GET",
		//请求成功完成后要执行的方法
		success: function(data) {
			data = data.data;
			$(".table-bottom-character-set").html("");
			$(".table-bottom-character-set").append('<option value="" data-text=""></option>');
			for(var i = 0; i < data.length; i++) {
				$(".table-bottom-character-set").append('<option value="' + i + '" data-text="' + data[i].characterset + '">' + data[i].characterset + '</option>');
			}
			$(".table-bottom-character-set").change(function() {
				var dataInd = $(this).val();
				$(".table-bottom-character-rule").html("");
				$(".table-bottom-character-rule").append('<option value="" data-text=""></option>');
				if(dataInd != "") {
					for(var i = 0; i < data[dataInd].orderingrule.length; i++) {
						$(".table-bottom-character-rule").append('<option value="' + i + '" data-text="' + data[dataInd].orderingrule[i].orderingrule + '">' + data[dataInd].orderingrule[i].orderingrule + '</option>');
					}
				}
			});
		}
	});
}