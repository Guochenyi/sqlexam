var toastr;
$(function() {
	toastr = (function($) {
		var toastr = {
			init: function() {
				var html = [];
				html.push('<div class="notifications-wrapper">')
				html.push('<div class="notifications-tc">');
				html.push('</div>');
				html.push('</div>');
				$("body").append(html.join(""));
			},
			toastrShow:function(back,msg){
				var html = [];
				var notification = $('<div class="notification notification-error notification-visible '+back+'">');
				var deleteSpan = $('<span class="notification-dismiss">×</span>');
				html.push('<div class="notification-message">');
				html.push(msg);
				html.push('</div>');
				html.push('</div>');
				notification.html(html.join(""));
				notification.append(deleteSpan);
				$(".notifications-tc").append(notification);
				notification.animate({marginTop:'10px'},320);
				setTimeout(function() {
			 		notification.hide(320,function(){notification.remove()});
				}, 2500);
				deleteSpan.click(function(){
					notification.hide(320,function(){notification.remove()});
				});
			},
			success: function(msg) {
				toastr.toastrShow("success",msg);
			},
			danger: function(msg) {
				toastr.toastrShow("danger",msg);
			},
			info: function(msg) {
				toastr.toastrShow("info",msg);
			},
			warning: function(msg) {
				toastr.toastrShow("warning",msg);
			}
		}
		toastr.init();
		return toastr;
	})(window.jQuery);
});