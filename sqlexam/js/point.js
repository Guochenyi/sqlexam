$(function() {
	setTimeout(function() {
		$(".nav-top-header").show();
		setTimeout(function() {
			$(".left-list").eq(0).after(setPoint(true));
			pointClick();
			$(".left-list-kp").addClass("left-list-avtive");
			$(".upload-page").hide();
			$(".main-window").removeClass("main-window-hide");
		}, 100);
	}, 500);
	pageFun("probsets.html", 5, parseInt(1));
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
	probListType();
	initMyTreeView();
	setEditSubmit();
	setAddTopKp();
});
function probListType() {
	var usrSkip = ["../probsets.html", "judge.html", "single.html", "mult.html", "gapfill.html", "subject.html", "sqltopic.html"];
	$(".left-list").click(function() {
		var ind = $(".left-list").index(this);
		ind = ind >= 7 ? ind - 7 : ind;
		$(location).attr("href", usrSkip[ind]);
	});
	pointClick();
}
function initMyTreeView() {
	var data = {};
	var kp_level = 1;
	data["kp_level"] = 1;
	data["kp_parent"] = 0;
	$("#tree-view").html('<p class="text-center">loading...</p>');
	$.ajax({
		url: reqURL + "/knowPoint/queryKnowPoint.do",
		type: "POST",
		data: data,
		//请求成功完成后要执行的方法
		success: function(data) {
			var js = data.data;
			var treeData = [];
			treeData.push('<ul class="list-group point-ul-list">');
			$.each(js, function(e) {
				var o = this;
				treeData.push(setMyKpList(o));
			});
			treeData.push('</ul>');
			$('#tree-view').html(treeData.join(""));
			unfoldClick(kp_level);
		}
	});
}
function pointDataReq(that) {
	var data = {};
	data["kp_level"] = parseInt(that.nextAll('P').attr("kp_level")) + 1;
	data["kp_parent"] = parseInt(that.nextAll('P').attr("data-kp-id"));
	var kp_level = data["kp_level"];
	$.ajax({
		url: reqURL + "/knowPoint/queryKnowPoint.do",
		type: "POST",
		data: data,
		//请求成功完成后要执行的方法
		success: function(data) {
			var js = data.data;
			var treeData = [];
			$.each(js, function(e) {
				var o = this;
				treeData.push(setMyKpList(o));
			});
			that.parents("li").after(treeData.join(""));
			unfoldClick(kp_level);
		}
	});
}
function unfoldClick(kp_level) {
	$(".expand-icon[kp_level=" + kp_level + "]").click(function() {
		$(this).addClass("hidden");
		$(this).next().removeClass("hidden");
		pointDataReq($(this));
	});
	$(".node-icon[kp_level=" + kp_level + "]").click(function() {
		var kp_id = $(this).nextAll('P').attr("data-kp-id");
		var len = $("li[data-kp-Pid=" + kp_id + "]").length;
		var pid = $(this).parents('li').attr("data-kp-pid");
		if(len < 1) {
			return;
		} else if(pid == 0) {
			$(this).parents('li').nextUntil("li[data-kp-pid=0]", "li").remove();
		} else {
			$("li[data-kp-Pid=" + kp_id + "]").remove();
		}
		$(this).addClass("hidden");
		$(this).prev().removeClass("hidden");
	});
}
var kp_name_data = ["", "课程", "章", "节"];

function setMyKpList(o) {
	var h = [];
	h.push('<li data-kp-Pid="' + o["kp_parent"] + '" class="list-group-item node-tree-view" data-nodeid="0" style="color:undefined;background-color:undefined;">');
	for(var i = 0; i < parseInt(o["kp_level"]); i++) {
		h.push('<span class="indent"></span>');
	}
	if(parseInt(o["kp_level"]) < 3) {
		h.push('<span class="icon expand-icon glyphicon glyphicon-plus" style="padding-top:3px;margin-right:5px;" kp_level="' + o["kp_level"] + '"></span>');
		h.push('<span class="icon node-icon hidden glyphicon glyphicon-minus" style="padding-top:3px;margin-right:5px;" kp_level="' + o["kp_level"] + '"></span>');
	} else {
		h.push('<span class="icon expand-icon hidden glyphicon glyphicon-plus" style="padding-top:3px;margin-right:5px;" kp_level="' + o["kp_level"] + '"></span>');
		h.push('<span class="icon node-icon glyphicon glyphicon-minus" style="padding-top:3px;margin-right:5px;" kp_level="' + o["kp_level"] + '"></span>');
	}
	h.push('<p kp_level="' + o["kp_level"] + '" data-kp-id="' + o["kp_id"] + '" class="list-group-item-td" style="margin:0;padding:0;display:inline-block">');
	var r = parseInt(o["kp_level"]);
	var cls = ["", "text-primary", "text-success", "text-warning"];
	h.push('<span class="show-index hidden">' + o["show_index"] + '</span>');
	h.push('<span class="kp-text ' + cls[r] + '" style="display:inline-block;margin-right:15px;min-width:180px">' + o["kp_text"] + '</span>');
	h.push('<button onclick="openEditMyKpWindow(this)" class="edit-first-kp-btn btn btn-sm btn-info" pid="' + o["kp_parent"] + '" kl="' + o["kp_level"] + '" kid="' + o["kp_id"] + '">编辑 [' + kp_name_data[parseInt(o["kp_level"])] + ']</button> ');
	h.push('<button data-loading-text="Loading..." onclick="openDeleteMyKpWindow(this)" class="edit-first-kp-btn btn btn-sm btn-danger" kl="' + o["kp_level"] + '" pid="0" kid="' + o["kp_id"] + '">删除 [' + kp_name_data[parseInt(o["kp_level"])] + ']</button> ');
	if(parseInt(o["kp_level"]) < 3) h.push('<button onclick="openEditMyKpWindow(this)" class="edit-first-kp-btn btn btn-sm btn-success" kl="' + (parseInt(o["kp_level"]) + 1) + '" pid="' + o["kp_id"] + '" kid="0">添加 [' + kp_name_data[parseInt(o["kp_level"]) + 1] + ']</button>');
	h.push('</p>');
	h.push('</li>');
	return h.join("");
}
window.openEditMyKpWindow = function(obj) {
	var btn = $(obj);
	var pid = btn.attr("pid"),
		kid = btn.attr("kid"),
		kl = btn.attr("kl");
	$("#edit-kp-win .modal-title").html(btn.html());
	$("#kp-id").val(kid);
	$("#kp-parent").val(pid);
	$("#kp-level").val(kl);
	$('#edit-kp-win').modal('toggle');
	$("#kp-text").val(kid == "0" ? "" : btn.parent().find(".kp-text").html());
	$("#show-index").val(kid == "0" ? "" : btn.parent().find(".show-index").html());
	$(".submit-kp-eidt-btn").button("reset");
}
window.openDeleteMyKpWindow = function(obj) {
	var btn = $(obj);
	var pid = btn.attr("pid"),
		kid = btn.attr("kid"),
		kl = btn.attr("kl");
	var id = "my-kp-delete-model";
	var delBtn = $("<button data-loading-text='Loading...' class='btn btn-danger'>确定</button>");
	jdcModal(id, "提示", "<b class='text-danger'>删除后数据不能恢复，您确定要删除吗？</b>", "modal-sm", delBtn, function() {
		var b = $(this);
		b.button('loading');
		var data = {};
		data["kp_id"] = parseInt(kid);
		data["kp_level"] = parseInt(kl);
		$.ajax({
			url: reqURL + "/knowPoint/deleteKnowPoint.do",
			type: "POST",
			data: data,
			//请求成功完成后要执行的方法
			success: function(data) {
				console.log(data);
				if(data.status == 1) {
					toastr.success("保存成功.");
					$("P[data-kp-id=" + kid + "]").parents("li").remove();
				} else {
					toastr.error("对不起，保存失败. 当前对象有子对象");
				}
				b.button('reset');
				$("#" + id).modal('hide');
			}
		});
		b.button('reset');
		$("#" + id).modal('hide');
	});
	delBtn.parent().append('<a href="javascript:void(0)" class="btn btn-default btn-canel" data-dismiss="modal">取消</a>');
}

function setEditSubmit() {
	$(".submit-kp-eidt-btn").click(function() {
		var kp_text = $("#kp-text").val(),
			show_index = $("#show-index").val();
		if(kp_text == "") {
			$("#kp-text").parent().addClass("has-error");
			return;
		} else {
			$("#kp-text").parent().removeClass("has-error");
		}
		if(show_index == "" || isNaN(parseInt(show_index))) {
			$("#show-index").parent().addClass("has-error");
			return;
		} else {
			$("#show-index").parent().removeClass("has-error");
		}
		var btn = $(this);
		var data = {};
		var kp_id = parseInt($("#kp-id").val());
		data["kp_id"] = parseInt($("#kp-id").val());
		data["kp_parent"] = parseInt($("#kp-parent").val());
		data["kp_level"] = parseInt($("#kp-level").val());
		data["kp_text"] = kp_text;
		data["show_index"] = show_index;
		data["kp_status"] = 0;
		btn.button("loading");
		$.ajax({
			url: reqURL + "/knowPoint/addKnowPoint.do",
			type: "POST",
			data: data,
			//请求成功完成后要执行的方法
			success: function(data) {
				console.log(data.data)
				var js = data.data;
				if(parseInt(js["kp_id"]) < 1) {
					toastr.error("对不起，保存失败.");
				} else {
					toastr.success("保存成功.");
					$('#edit-kp-win').modal('hide');
					if(kp_id != 0) {
						$("p[data-kp-id=" + kp_id + "]").children('.kp-text').text(js.kp_text);
						$("p[data-kp-id=" + kp_id + "]").children('.show-index').text(js.show_index);
					} else if(js["kp_parent"] == 0) {
						$(".point-ul-list").append(setMyKpList(js));
					} else {
						if($("p[data-kp-id=" + js.kp_parent + "]").prev().is(".hidden")) {
							return;
						} else {
							if($("li[data-kp-pid=" + js.kp_parent + "]").length == 0) {
								$("P[data-kp-id=" + js.kp_parent + "]").parents("li").after(setMyKpList(js));
							} else {
								$("li[data-kp-pid=" + js.kp_parent + "]:last").after(setMyKpList(js));
							}
							unfoldClick(js.kp_level);
						}
					}
				}
				btn.button("reset");
			}
		});
	});
}

function setAddTopKp() {
	var h = '<p><button onclick="openEditMyKpWindow(this)" pid="0" kl="1" kid="0" class="edit-first-kp-btn btn btn-primary">添加 [课程]</button></p>';
	$("#tree-view").parent().append(h);
}