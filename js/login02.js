$(function(){
	//验证码 调用login01里的函数，直接使用
	$.extend({
		"enter":function(){
			//鼠标移入移出的操作
			$(".left>p>span").mouseenter(function(){
				$(".left>p>span>#click").css("display","block");
			}).mouseleave(function(){
				$(".left>p>span>#click").css("display","none");
			});
			//页面加载显示验证码    str
			$.random();
			//失焦判断输入是否合法
			var flag01 = false,flag02 = false,flag03 = false;
			$("#yzNum").blur(function(){//验证码框的判断  str为随机产生的验证码
				var reg = /[0-9a-z]{4}/i;
				val = $(this).val();
				if(!reg.test(val)||val.toLocaleUpperCase() != str.toLocaleUpperCase()){
					$(this).next("u").css("display","block");
					flag01 = false;
				}else{
					$(this).next("u").css("display","none");
					flag01 = true;;
				}
			});
			$("#user").blur(function(){//用户名框
				var reg = /^(\w|[\u4e00-\u9fa5]){3,20}$/;//正则有问题
				if(!reg.test($(this).val())){
					$(this).next("u").css("display","block");
					flag02 = false;
				}else{
					$(this).next("u").css("display","none");
					flag02 = true;
				}
				if(getCookie("user") != 0){//判断用户是否重名
					for(var i = 0;i < getCookie("user").length;i++){
						if(getCookie("user")[i].name == $(this).val()){//说明用户名被占用
							alert("哎呀，用户民已经被占用了，换一个试试！");
							flag02 = false;
						}
					}
				}
			});
			$("#psswd").blur(function(){//密码框
				var reg = /\w{6,}/;
				if(!reg.test($(this).val())){
					$(this).next("u").css("display","block").html("密码位数必须在10位数以上!");
				}else{
					$(this).next("u").css("display","none");
				}
			});
			$("#psswdf").blur(function(){//确认密码框
				var one = $("#psswd").val();
				var tow = $(this).val();
				if(one != tow){
					$("#psswd").next("u").css("display","block").html("您两次输入的密码不一致！");
					$(this).next("u").css("display","block").html("您两次输入的密码不一致！");
					$("#psswd").val("");
					$(this).val("");
					flag03 = false;
				}else{
					$("#psswd").next("u").css("display","none");
					$(this).next("u").css("display","none");
					flag03 = true;
				}
			});
			//立即注册
			$("#next").click(function(){
				var arr = $("input").length;
				var flag = true;
				var brr = [];
				for(var i = 0;i < arr;i++){
					if($("input").eq(i).val() == ""){
						$("input").eq(i).next("u").css("display","block");
						flag = false;
					}
				}
				if(flag&&flag01&&flag02&&flag03){
					//获取手机号码,取数组的最后一个手机号
					var index = getCookie("call").length - 1;
					//判断该网站的cookie中是否有其他用户
					if(getCookie("user").length!=0){//有则存入数组中
						brr = getCookie("user");
					}
					var json = {
							"name":$("#user").val(),
							"upw":$("#psswdf").val(),
							"call":getCookie("call")[index].call
							}
					brr.push(json);
					setCookie("user",JSON.stringify(brr),7);
					location.href = "logged.html";
				}else{
					alert("哎呀！您有选项填写不符合要求！");
				}
			});
		}
	});
	$.enter();
	$.extend({
		"gouparss":function(){
			//从新发送验证码倒计时
			var index = 60;
			var timer = setInterval(aotuPlay,1000);
			function aotuPlay(){
				index--;
				$(".login .gouparss>i").html(index);
				if(index == 0){
					clearInterval(timer);
					$(".login .gouparss").html("点击重新发送动态码")
					.css({
						"background":"#0eec13",
						"border-radius":3
					})
				}
			}
			
		}
	});
	$.gouparss();
	
})