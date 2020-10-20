$(function(){
	$(".user-btn").click(function(){
		var data = {};
		//邮箱正则表达式
		var isEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		//获取数据
		data["email"] = $("input[name='email']").val().trim();
		data["password"] = $("input[name='password']").val().trim();
		//验证输入数据是否合法
		if(data.email == "") {}
		else if(!isEmail.test(data.email)) {}
		else if(data.password == "") {} 
		else if(data.code == "") {} 
		else {
			$(this).button('loading');
			console.log(data)
//			$.ajax({
//				url:reqURL + "/user/userLogin.do",
//				type:"post",
//				data:{
//					email:email,
//					password:password,
//					code:code
//				},
//			    success:function(data){
//			    	if(data.status == 0) {
//			    		insertMsg(data.msg);
//			    		$(".code_image").attr("src", reqURL + "/imageCode/gifCode.do?codereq=" + Math.random());
//			    	}
//			    	if(data.status == 2) {
//			    		$(location).attr('href', 'teacher/main.html');
//			    	}
//			    	if(data.status == 3) {
//			    		$(location).attr('href', 'userpage/main.html');
//			    	}
//			    }
//			});
		}
});
	$(".slider-center-from div").click(function(){
		var ind = $(".slider-center-from div").index(this);
		if(ind == 0) {
			$(".bootom-two").hide();
			$(".follow-us-center").hide();
			$(".user-register-center").show();
			$(".bootom-one").show();
			$(".slider-center-from div").eq(1).removeClass("from-active");
			$(".slider-center-from div").eq(1).html("关注我们");
			$(".slider-center-from div").eq(ind).addClass("from-active");
			$(".slider-center-from div").eq(ind).html('<label for="exampleInputUserLogin1">' + $(".slider-center-from div").eq(0).text() + '</label>');
		}
		else if(ind == 1){
			$(".bootom-one").hide();
			$(".user-register-center").hide();
			$(".bootom-two").show();
			$(".follow-us-center").show();
			$(".slider-center-from div").eq(0).removeClass("from-active");
			$(".slider-center-from div").eq(0).html($(".slider-center-from div").eq(0).text());
			$(".slider-center-from div").eq(ind).addClass("from-active");
			$(".slider-center-from div").eq(ind).html('<label for="exampleInputUserLogin1">关注我们</label>');
		}
	});
});
