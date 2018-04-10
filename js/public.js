//登录
$.extend({
	"login":function(){
		//导航页二级菜单的动画
		$("li.xiala:has(ul)").mouseenter(function(){
			$(this).children("ul").stop().slideDown(500);
		}).mouseleave(function(){
			$(this).children("ul").stop().slideUp(0);
		});
		//登录
		if(getCookie("duser").length != 0){//有登录cookie的情况再执行
			var arr = getCookie("duser");
				userLog(arr[0]);
		}
		//登录选项关于DOM的操作
		function userLog(_name){
			$(".header_nav_auto_dz").css("display","none");
			$(".header_nav_auto_dl").css("display","block");
			$(".header_nav_auto_dl>.name>a").html(_name);
			//我的商城里的显示
			$(".mall_hadden_denglu>a.denglu").addClass("denglu1").html(_name);
			//点击退出按钮
			$(".header_nav_auto_dl>#tuichu").click(function(){
				if(confirm("您确定要退出吗?")){
					$(".header_nav_auto_dz").css("display","block");
					$(".header_nav_auto_dl").css("display","none");
					$(".mall_hadden_denglu>a.denglu").removeClass("denglu1").html("您好，请登录！");
					removeCookie("duser");
				}
			});
		}
	}
});
//随机验证码
$.extend({
	"random":function(){
	$("#html").html(randHtml());
		function randHtml(){
			var arr = [2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c",'d',"e","f","g",'h',"i",'j','k','m','n','p','q','r','s','t','u','v','w','x','y','z'];
			str = "";
			for(var i = 1;i <= 4;i++){
				str += arr[rand(0,55)];
			}
			return str;
		}
		//点击更换验证码
		$("#click").click(function(){
			$("#html").html(randHtml());
		});
		//随机函数
		function rand(min,max){
			return Math.round(Math.random()*(max - min)+min);
		}
	}
});
//顶部我的购物车
$.extend({
	"dzGoshop":function(){
		//判断有没有登录
		if(getCookie("duser").length != 0){//有登陆
			//取用户名
			var name = getCookie("duser")[0];
			//取商品cookie
			var arr = getCookie("shoplist");
			var str = "";
			for(var i = 0;i < arr.length;i++){
				if(arr[i].name == name){//说明该用户有购买商品记录
					if(arr[i].price.split("")[0] != "￥"){
						var h = "￥"+arr[i].price;
					}
					str += `<div class="shop">
								<div class="left"><a href=""><img src="${arr[i].src}" alt="" /></a></div>
								<div class="center">${arr[i].uname}</div>
								<div class="right">
									<span class="price">${h}×${arr[i].numbre}</span>
									<i class="del">删除</i>
								</div>
							</div>`;
				}
			}
			$(".shopping_hadden .shopping_hadden_shoplist .shoplist").html(str);
		}
		//删除商品
		$(".shopping_hadden .shopping_hadden_shoplist .shoplist").on("click",".right .del",function(){
			var uname = $(this).parent().parent().children(".center").html();
			//页面的操作
			$(this).parent().parent().remove();
			//cookie的操作
			for(var k = 0;k < arr.length;k++){
				if(arr[k].uname == uname&&arr[k].name == name){
					arr.splice(k,1);
				}
			}
			setCookie("shoplist",JSON.stringify(arr));
		});
	}
});
