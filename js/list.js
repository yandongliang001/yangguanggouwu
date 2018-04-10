$(function(){
	//登录  导航页二级菜单的动画
	$.login();
	//顶部我的购物车
	$.dzGoshop();
	//右侧固定栏
	$.extend({
		"fixedLeft":function(){
			//右侧固定栏鼠标移入移出的动画
			$(".service a").mouseenter(function(){
				$(this).children("span").stop().animate({"left":-57},500);
				$(this).children("i").css("background","#fe5621");
			}).mouseleave(function(){
				$(this).children("span").stop().animate({"left":0},500);
				$(this).children("i").css("background","#312a27");
			});
			//点击回到顶部
			$(".service .toTop").click(function(){
				$("html,bady").animate({"scrollTop":0},2000);
			});
		}
	});
	$.fixedLeft();
	$.extend({
		"ajax01":function(){
			$.ajax({
				type:"get",
				url:"json/classification.json",
				success:function(json){
					var arr = json;
					$("#shuffling_auto_left>li").mouseenter(function(){
						data_name = $(this).data("name");
						//分类ajax请求数据渲染页面
						/*<ul>
							<p>健身器材<span></span></p>
							<li><a href="">运动户外</a></li>
						</ul>*/
					//console.log(arr);
					var stp = "";
					var stli = "";
					var stul = "";
					for(var attr in arr){
						if(data_name == attr){
							for(var i in arr[attr]){
								stp =`<p>${i}<span></span></p>`
								//console.log(i);
								for(var k = 0;k < arr[attr][i].length;k++){
									stli += `<li><a href="">${arr[attr][i][k]}</a></li>`;
									//console.log(arr[attr][i][k]);
								}
								stul += `<ul>${stp}${stli}</ul>`;
							}
						}
					}
					$(".shuffling_auto_hidden").html(stul);
				
					$(this).children(".shuffling_auto_hidden").css({"display":"block"});
				}).mouseleave(function(){
					$(this).children(".shuffling_auto_hidden").css({"display":"none"});
				});
				}
			});
			//列表数据
			$.ajax({
				type:"get",
				url:"json/list.json",
				success:function(res){
					var href = decodeURIComponent(location.href.split("?")[1].split("=")[1]);
					$(".conter>.fenlei>span").html(href);
					var arr = res;
					var str = "";
					var k = 0;
					for(var i in arr){
						if(href == i){
							for(var attr in arr[i]){
								k++;
								str += `<li>
									<a href="page.html?name=${i}&id=${k}"><img src="${arr[i][attr].url}"/></a>
									<div class="price">${arr[i][attr].price}</div>
									<div class="huohao">${arr[i][attr].number}</div>
									<div class="yongtu">${arr[i][attr].use}</div>
									<p>央广购物<span>自营</span></p>
									<div class="goushop">
										<div class="jia_shop" data-name="${arr[i][attr].number}" data-src="${arr[i][attr].url}" data-price="${arr[i][attr].price}" data-use="${arr[i][attr].use}"><i></i><span>加入购物车</span></div>
										<a href="javascript:;" class="collection"><i></i><span>收藏</span></a>
									</div>
								</li>`;
							}
						}
					}
					$("#page").html(str);
					//点击购买按钮弹出详细信息
					$(".goushop>.jia_shop").click(function(){
						//取数据，填充弹出页面信息
						var name = $(this).data("name");
						var src = $(this).data("src");
						price = $(this).data("price");
						var use = $(this).data("use");
						var str = `<div class="left"><img src="${src}" alt="" /></div>
									<div class="txt">
										<span>${name}</span>
										<span>${use}</span>
									</div>
									<div class="page">
										<div>分类属列</div>
										<span>单价(元)</span>
										<i>可售数量(个)</i>
										<u>购买数量(个)</u>
									</div>
									<div class="num">
										<div>${href}</div>
										<span>${price}</span>
										<i>9999</i>
										<div class="number numberlist" >
											<a href="javascript:;" class="left" data-fh="-1" data-id='hh'>-</a>
											<input type="text" value="1" class="content" id="nub"/>
											<a data-fh="1" href="javascript:;" class="right">+</a>
										</div>
									</div>
									<div class="number">
										<div class="zoj">数量总计：<span style="color: red;">1</span>个</div>
										<div class="jezoj">商品金额总计：<span style="color: red;font-weight: 900;">${price}</span>元</div>
									</div>
									<div class="for">
										<div class="fq">放弃操作</div>
										<div class="qr" data-name="${name}" data-src="${src}" data-price="${price}" data-use="${use}">确认提交</div>
									</div>`;
						$(".abc .uane").html(str);
						$(".confirm").css("display","block");
						$(".abc").css("display","block");
					});
					//点击关闭按钮
					$("#gb").click(function(){
						$(".confirm").css("display","none");
						$(".abc").css("display","none");
					});
					//放弃操作
					$(".abc .uane").on("click",".fq",function(){
						$(".confirm").css("display","none");
						$(".abc").css("display","none");					
					});
					//点击加减按钮实现数量的增减
					$(".abc .uane").on("click",".numberlist a",function(){
						var fh = $(this).data("fh");
						if(fh == "-1"){
							var nub = parseInt($(this).next("input").val());
							if(nub > 0){
								nub--;
								$(this).next("input").val(nub);
							}
						}else if(fh == "1"){
							var nub = parseInt($(this).prev("input").val());
							nub++;
							$(this).prev().val(nub);
						}
						$(this).parent().parent().next().children(".zoj").children("span").html(nub);
						var pri = Number(price.split("￥")[1]);
						var p = (nub*pri).toFixed(2)
						$(this).parent().parent().next().children(".jezoj").children("span").html(p);
					});
					//确认提交
					$(".abc .uane").on("click",".for .qr",function(){
						//取数量
						var index = parseInt($("#nub").val());
						if($(".header_nav_auto_dl").attr("style")){//判断用户是否登录
							var style = $(".header_nav_auto_dl").attr("style");
							if(style == "display: block;"){//用户在登录状态
								var name = $(".header_nav_auto_dl>.name>a").html();
								var uname = $(this).data("name");
								var arr = [];
								if(getCookie("shoplist").length != 0){//cookie里是否有商品？
									arr = getCookie("shoplist");
									for(var i = 0;i < arr.length;i++){
										if(arr[i].name == name&&arr[i].uname == uname){//说明该用户的cookie里有该商品
											//再购买则进行累加
											index += parseInt(arr[i].numbre);
											arr.splice(i,1);
										}
									}
								}
								var json = {
											"name":name,
											"uname":uname,
											"price":$(this).data("price"),
											"src":$(this).data("src"),
											"numbre":index
										}
								console.log(json);
								arr.push(json);
								setCookie("shoplist",JSON.stringify(arr),7);
								if(confirm("加入成功，要去结算吗？")){
									location.href = "shettlement.html";
								}
							}
						}else{//用户没有登录
							if(confirm("您还没有登录，是否现在就去登录？")){
								location.href = "logged.html";
							}
						}
						$(".confirm").css("display","none");
						$(".abc").css("display","none");
					});
				}
			});
		}
	});
	$.ajax01();
});
