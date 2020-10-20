KindEditor.plugin('cuscode', function(K) {
	var self = this, name = 'cuscode';
     self.clickToolbar(name, function() {
		var html = self.html();
		var demo = $("<div></div>");
		demo.append(html);
		demo.children(".precode").next("br").remove();
		var precodes = demo.children(".precode");
		$.each(precodes,function(e){
			var o=$(this);
			var prechilds = o.html();
			o.html("");
			o.append('<code style="background-color: rgba(0,0,0,.05);display: block;padding:10px;-webkit-text-size-adjust: none;overflow-x: auto;white-space: pre;font-size:16px"></code>')
			o.children().html(prechilds);
		});
		var html = deletepfun(demo.html());
		self.html("");
		self.insertHtml(html).hideDialog().focus();
		html = '<pre class="precode"><code style="background-color: rgba(0,0,0,.05);display: block;padding:10px;-webkit-text-size-adjust: none;overflow-x: auto;white-space: pre;font-size:16px">退出按下移键或鼠标点击下面白色处</code></pre><br />';
		self.insertHtml(html).hideDialog().focus();
	});
});

/**
 * 去掉空白行
 */
function deletepfun(html)
{
	html = html.replace(new RegExp("<br />", "gm"), '\n');
	html = html.replace(/^(\r\n|\n|\r|\t| )+/gm, "");
	html = html.replace(new RegExp("\n", "gm"), '<br />');
	var demo = $("<div></div>");
	demo.append(html);
	demo.children(".precode").next("br").remove();
	html = demo.html();
	return html
}