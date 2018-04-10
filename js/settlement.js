$(function(){
	//用户登录   导航页二级菜单的动画
	$.login();
	$.extend({
		"funct":function(){
			//取cookie，渲染页面
			if(getCookie("shoplist").length != 0){
				var str = "";
				var arr = getCookie("shoplist");
				var name = $(".header_nav_auto_dl>.name>a").html();
				for(var i = 0;i < arr.length;i++){
					if(arr[i].name == name){//确定用户
						if(arr[i].price.split("￥")[1]){
							var price = arr[i].price.split("￥")[1];
						}else{
							var price = arr[i].price;
						}
						var zj = Number(price*arr[i].numbre).toFixed(2);
						str += `<div class="shop">
									<input type="checkbox" class="ck"/>
									<div class="img"><img src="${arr[i].src}"/></div>
									<span class="uname">${arr[i].uname}</span>
									<div class="number">
										<a href="javascript:;" class="left" data-fh="-1" data-id='hh'>-</a>
										<input type="text" value="${arr[i].numbre}" class="content"/>
										<a data-fh="1" href="javascript:;" class="right">+</a>
									</div>
									<p class="price">${price}</p>
									<i>${zj}</i>
									<div class="remove"><a href="javascript:;" class="iconfont">&#xe609;</a></div>
								</div>`;
					}
				}
				$(".settlement .box").html(str);
			}
			//默认全部商品都选中
			$(".bottom .qx").prop("checked",true);
			$(".ck").prop("checked",true);
			jiesuan();
			//商品的数量的增减
			$(".settlement .box").on("click",".shop .number a",function(){
				//页面的操作
				var fh = $(this).data("fh");
				var price = Number($(this).parent().next().html());
				var number = parseInt($(this).parent().children("input").val());
				if(fh == "-1"){
					if(number > 1){
						number--;
					}
				}else if(fh == "1"){
					number++;
				}
				var zj =Number(price*number).toFixed(2)
				$(this).parent().children("input").val(number);
				$(this).parent().next().next().html(zj);
				//cookie的操作
				var arr = getCookie("shoplist");
				var uname = $(this).parent().parent().children(".uname").html();
				var name = $(".header_nav_auto_dl>.name>a").html();
				for(var i = 0;i < arr.length;i++){
					if(arr[i].name == name&&arr[i].uname == uname){
						var json = {
										"name":name,
										"uname":arr[i].uname,
										"price":arr[i].price,
										"src":arr[i].src,
										"numbre":number
									} 
						arr.splice(i,1);//删原数据
						break;
					}
				}
				arr.push(json);
				setCookie("shoplist",JSON.stringify(arr),7);//存新数据
				jiesuan();
			});
			//删除商品    直接删除
			$(".settlement .box").on("click",".shop .remove a",function(){
				if(confirm("您确定要删除该商品吗？")){
					//页面的操作
					$(this).parent().parent().remove();
					//cookie的操作
					var arr = getCookie("shoplist");
					var uname = $(this).parent().parent().children(".uname").html();
					var name = $(".header_nav_auto_dl>.name>a").html();
					for(var i = 0;arr.length;i++){
						if(arr[i].name == name&&arr[i].uname == uname){
							arr.splice(i,1);//删除数据
							break;
						}
					}
					setCookie("shoplist",JSON.stringify(arr),7);
				}
				jiesuan();
			});
			//全部删除
			$(".bottom>.sc").click(function(){
				if(confirm("您确定要全部删除选中的商品吗？")){
					$(".ck").each(function(){
						if($(this).prop("checked")){
							//页面操作
							$(this).parent().remove();
							//cookie操作
							var arr = getCookie("shoplist");
							var uname = $(this).parent().children(".uname").html();
							var name = $(".header_nav_auto_dl>.name>a").html();
							for(var i = 0;arr.length;i++){
								if(arr[i].name == name&&arr[i].uname == uname){
									arr.splice(i,1);//删除数据
									break;
								}
							}
							setCookie("shoplist",JSON.stringify(arr),7);
							}
					})
				}
				jiesuan();
			});
			//结算函数
			function jiesuan(){
				var zprice = 0;
				var znumber = 0;
				var i = 0;
				$(".ck").each(function(){
					if($(this).prop("checked")){
						i++;
						zprice += Number($(this).parent().children("i").html());
						znumber += parseInt($(this).parent().children(".number").children("input").val());
					}
				});
				$(".bottom>.zj>span").html(znumber);
				$(".bottom>.szj>span").html(zprice.toFixed(2));
				$(".bottom>.zl>span").html(i);
			}
			//全选和反选功能
			$(".bottom .qx").click(function(){
				$(".ck").prop("checked",$(this).prop("checked"));
				$(".bottom .qx").prop("checked",$(this).prop("checked"));
				jiesuan();
			});
			//单选
			$(".ck").click(function(){
				jiesuan();
			});
			//吸顶菜单
			$(document).scroll(function(){
				$("#xd").css({"position":"fixed","bottom":0});
				if($("html,body").scrollTop() > $(".settlement").innerHeight()-300){
					$("#xd").css({"position":""});
				}
			});
		}
	});
	$.funct();
})
