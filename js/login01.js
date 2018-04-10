$(function(){
	//验证码
	$.extend({
		"enter":function(){
			//鼠标移入移出的操作
			$(".left>p>span").mouseenter(function(){
				$(".left>p>span>#click").css("display","block");
			}).mouseleave(function(){
				$(".left>p>span>#click").css("display","none");
			});
			//页面加载显示验证码
			$("#html").html($.random());
			//点击更换验证码
			$("#click").click(function(){
				$("#html").html($.random());
			});
			//单选按钮默认选中
			$("#ck").prop("checked",true);
			//失焦判断输入是否合法
			var flag01 = false,flag02 = false;
			$("#callNum").blur(function(){
				var reg = /^1(3|5|7|8)\d{9}/;
				if(!reg.test($(this).val())){
					$(this).next("u").css("display","block");
					flag01 = false;
				}else{
					$(this).next("u").css("display","none");
					flag01 = true;
				};
			});
			$("#yzNum").blur(function(){
				var val = $(this).val();
				console.log(str)
				if(val.toLocaleUpperCase() != str.toLocaleUpperCase()){
					$(this).next("u").css("display","block");
					flag02 = false;
				}else{
					flag02 = true;
					$(this).next("u").css("display","none");
				}
			});
			//下一步按钮
			$("#next").click(function(){
				var attrCall = $("#callNum").next("u").attr("style");
				var attrYz = $("#yzNum").next("u").attr("style");
				var flag = true;
				var len = $("input").length-1;
				for(var i = 0;i < len;i++){
					if($("input").eq(i).val().length == 0){
						$("input").eq(i).next("u").css("display","block");
						flag = false;
					}
				}
				var prop = $("#ck").prop("checked");
				if(flag01&&flag02&&prop&&flag){
					var goLogin = true;
					var brr = [];
					var json = {
							"call":$("#callNum").val()
								}
					if(getCookie("call").length!=0){//判断手机号是否被占用
						brr = getCookie("call");
						for(var i = 0;i < brr.length;i++){
							if(brr[i].call == json.call){//说明手机号被占用
								if(confirm("手机号已经注册，是否登陆？")){
									location.href = "logged.html";
									goLogin = false;
								}else{
									goLogin = false;
								}
								break;
							}
						}
					}
					if(goLogin){
						brr.push(json);
						setCookie("call",JSON.stringify(brr),7);
						location.href = "login02.html";
					}
				}else{
					alert("哎呀！您有选项没填正确！");
				}
			});
		}
	});
	$.enter();
})
