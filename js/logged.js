$(function(){
	$.extend({
		"rand":function(){
			//鼠标移入移出显示是否更换验证码
			$(".yzm>i").mouseenter(function(){
				$(this).children("a").css("display","block");
			}).mouseleave(function(){
				$(this).children("a").css("display","none");
			});
			//页面加载显示验证码
			$(".html").html($.random());
			//点击更换验证码
			$(".click").click(function(){
				$(".html").html($.random());
			});
			//验证码输入框失焦验证
			$(".yzm input").blur(function(){
				var val = $(this).val();
				if( val.toLocaleUpperCase() != str.toLocaleUpperCase() ){
					alert("您输入的验证码有误，请重新输入")
				}
			});
			//登录选项切换
			$(".box>.top>a").click(function(){
				var index = $(this).index();
				$(".box>.top>a").removeClass("active").eq(index).addClass("active");
				$(".box>.conter").css("display","none").eq(index).css("display","block");
			});
			//登陆
				$(".goushop").click(function(){
					if(getCookie("user").length != 0){//有对应的cookie
					//判断cookie里是否有此用户
					var uname = $("#uname").val();
					var passwd = $("#password").val();
					var arr = getCookie("user");
					var flag = false;
					for(var i = 0;i < arr.length;i++){
						if(uname == arr[i].name||uname == arr[i].call){//有此用户
							if(arr[i].name == uname&&arr[i].upw == passwd || arr[i].call == uname&&arr[i].upw == passwd){
								//有则登录
								var brr = [arr[i].name];
								//另存cookie，以后上来直接从这个cookie里取值进行登录
								setCookie("duser",JSON.stringify(brr));
								location.href = "index.html";
							}else{
								flag = true;
							}
						}
					}
					if(flag){
						alert("您输入的用户名或者密码错误！")
					}
				}else{//没有对应的cookie，提示用户先进行登录操作
					if(confirm("您还没有注册，请您先去注册！")){
						location.href = "login01.html";
					}
				}
			});
		}
	});
	$.rand();
})
