window.onload = function(){
	//用户登录及导航页的二级菜单
	$.login();
	//顶部我的购物车
	$.dzGoshop();
	//中间大轮播图
	$.extend({
		"shuffling":function(){
			var index = 0;
			var timer = setInterval(aotuPlay,2000);
			function aotuPlay(){
				$("#shuffling>li").eq(index).animate({"opacity":0},1000).siblings().animate({"opacity":1},1000);
				$("#cative>li").eq(index).addClass("active").siblings().removeClass("active");
				index++;
				if(index == 3){
					index = 0;
				}
			}
			$("#cative>li").mouseenter(function(){
				clearInterval(timer);
				index = $(this).index();
				aotuPlay();
			}).mouseleave(function(){
				timer = setInterval(aotuPlay,1500);
			});
		}
	});
	$.shuffling();
	$("#shuffling_auto_left>li").mouseenter(function(){
		var data_name = $(this).data("name");
		//分类ajax请求数据渲染页面
		$.ajax({
			type:"get",
			url:"json/classification.json",
			success:function(json){
				var arr = json;
				//console.log(arr);
				var stp = "";
				var stli = "";
				var stul = "";
				for(var attr in arr){
					if(data_name == attr){
						for(var i in arr[attr]){
							stp =`<p>${i}<span></span></p>`
							for(var k = 0;k < arr[attr][i].length;k++){
								stli += `<li><a href="">${arr[attr][i][k]}</a></li>`;
							}
							stul += `<ul>${stp}${stli}</ul>`;
						}
					}
				}
				$(".shuffling_auto_hidden").html(stul);
			}
		});
		$(this).children(".shuffling_auto_hidden").css({"display":"block"});
	}).mouseleave(function(){
		$(this).children(".shuffling_auto_hidden").css({"display":"none"});
	});
	//一层楼轮播图           鼠标移入移出的操作
	$.extend({
		"towerOne":function(){
			var index = 0;
			var timer = setInterval(aotuPlay,3000);
			function aotuPlay(){
				$(".tower01_auto_center_031").animate({"left":-339*index},1000);
				$(".tower01_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
				index++;
				if(index == $(".tower01_auto_center_031>li").length){
					index = 1;
					$(".tower01_auto_center_031").animate({"left":0},0);
				}
			}
			//鼠标移入移出
			$(".tower01_auto_center_03").mouseenter(function(){
				clearInterval(timer);
			}).mouseleave(function(){
				timer = setInterval(aotuPlay,3000);
			});
			//鼠标移入移出对下标的操作
			$(".tower01_auto_center_032>li").click(function(){
				clearInterval(timer);
				index = $(this).index();
				$(".tower01_auto_center_031").stop().animate({"left":-339*index},1000);
				$(".tower01_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
			});
			//左右按钮操作
			$(".tower01_auto_center_03").mouseenter(function(){
				$(".tower01_auto_center_03>.tower01_auto_center_033").css("display","block");
			}).mouseleave(function(){
				$(".tower01_auto_center_03>.tower01_auto_center_033").css("display","none");
			});
			//左右按钮点击  委托实现
			$(".tower01_auto_center_03").on("click",".tower01_auto_center_033>a",function(){
				var ind = $(this).index();
				if(ind == 0){
					index--;
				}else if(ind == 1){
					index++;
				}
				if(index == $(".tower01_auto_center_031>li").length){
					index = 1;
					$(".tower01_auto_center_031").animate({"left":0},0);
				}
				if(index == -1){
					index = 4;
					$(".tower01_auto_center_031").animate({"left":-339*5},0);
				}
				$(".tower01_auto_center_031").stop().animate({"left":-339*index},1000);
				$(".tower01_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
			})
		}
	});
	$.towerOne();
	//二层楼轮播图           鼠标移入移出的操作
	$.extend({
		"towerTow":function(){
			var index = 0;
			var timer = setInterval(aotuPlay,3000);
			function aotuPlay(){
				$(".tower02_auto_center_031").animate({"left":-339*index},1000);
				$(".tower02_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
				index++;
				if(index == $(".tower02_auto_center_031>li").length){
					index = 1;
					$(".tower02_auto_center_031").animate({"left":0},0);
				}
			}
			//鼠标移入移出
			$(".tower02_auto_center_03").mouseenter(function(){
				clearInterval(timer);
			}).mouseleave(function(){
				timer = setInterval(aotuPlay,3000);
			});
			//鼠标移入移出对下标的操作
			$(".tower02_auto_center_032>li").click(function(){
				clearInterval(timer);
				index = $(this).index();
				$(".tower02_auto_center_031").stop().animate({"left":-339*index},1000);
				$(".tower02_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
			});
			//左右按钮操作
			$(".tower02_auto_center_03").mouseenter(function(){
				$(".tower02_auto_center_03>.tower02_auto_center_033").css("display","block");
			}).mouseleave(function(){
				$(".tower02_auto_center_03>.tower02_auto_center_033").css("display","none");
			});
			//左右按钮点击  委托实现
			$(".tower02_auto_center_03").on("click",".tower02_auto_center_033>a",function(){
				var ind = $(this).index();
				if(ind == 0){
					index--;
				}else if(ind == 1){
					index++;
				}
				if(index == $(".tower02_auto_center_031>li").length){
					index = 1;
					$(".tower02_auto_center_031").animate({"left":0},0);
				}
				if(index == -1){
					index = 4;
					$(".tower02_auto_center_031").animate({"left":-339*5},0);
				}
				$(".tower02_auto_center_031").stop().animate({"left":-339*index},1000);
				$(".tower02_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
			})
		}
	});
	$.towerTow();
	/*****一二层的轮播图代码，简化操作（以后）******/
	//三层楼轮播图           鼠标移入移出的操作
	$.extend({
		"towerSwn":function(){
			var index = 0;
			var timer = setInterval(aotuPlay,3000);
			function aotuPlay(){
				$(".tower03_auto_center_031").animate({"left":-339*index},1000);
				$(".tower03_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
				index++;
				if(index == $(".tower03_auto_center_031>li").length){
					index = 1;
					$(".tower03_auto_center_031").animate({"left":0},0);
				}
			}
			//鼠标移入移出
			$(".tower03_auto_center_03").mouseenter(function(){
				clearInterval(timer);
			}).mouseleave(function(){
				timer = setInterval(aotuPlay,3000);
			});
			//鼠标移入移出对下标的操作
			$(".tower03_auto_center_032>li").click(function(){
				clearInterval(timer);
				index = $(this).index();
				$(".tower03_auto_center_031").stop().animate({"left":-339*index},1000);
				$(".tower03_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
			});
			//左右按钮操作
			$(".tower03_auto_center_03").mouseenter(function(){
				$(".tower03_auto_center_03>.tower03_auto_center_033").css("display","block");
			}).mouseleave(function(){
				$(".tower03_auto_center_03>.tower03_auto_center_033").css("display","none");
			});
			//左右按钮点击  委托实现
			$(".tower03_auto_center_03").on("click",".tower03_auto_center_033>a",function(){
				var ind = $(this).index();
				if(ind == 0){
					index--;
				}else if(ind == 1){
					index++;
				}
				if(index == $(".tower03_auto_center_031>li").length){
					index = 1;
					$(".tower03_auto_center_031").animate({"left":0},0);
				}
				if(index == -1){
					index = 4;
					$(".tower03_auto_center_031").animate({"left":-339*5},0);
				}
				$(".tower03_auto_center_031").stop().animate({"left":-339*index},1000);
				$(".tower03_auto_center_032>li").removeClass("active").eq(index == 5?0:index).addClass("active");
			})
		}
	});
	$.towerSwn();
	//四楼轮播图
	$.extend({
		"towerFour" : function(){
			//轮播图
			var index = 1;
			var timer = setInterval(aotuPlay,3000);
			function aotuPlay(){
				$(".tower04 .lbMargin>.shuffling").animate({"left":-index*439},1000);
				$(".tower04 .lbMargin>.index>li").removeClass("active").eq(index==5?0:index).addClass("active");
				index++;
				if(index == 6){
					index = 1;
					$(".tower04 .lbMargin>.shuffling").animate({"left":0},0);
				}
			}
			//鼠标对下标的操作
			$(".tower04 .lbMargin>.index>li").click(function(){
				clearInterval(timer);
				index = $(this).index();
				aotuPlay();
			});
			//鼠标移入移出停止和启动计时器
			$(".tower04 .lbMargin>.shuffling").mouseenter(function(){
				clearInterval(timer);
			}).mouseleave(function(){
				timer = setInterval(aotuPlay,3000);
			});
			//左右按钮的操作     所有轮播图的左右按钮都有BUG
			$(".tower04 .lbMargin>.click a").mouseenter(function(){
				clearInterval(timer);
			}).mouseleave(function(){
				timer = setInterval(aotuPlay,3000);
			});
			$(".tower04 .lbMargin>.click a").click(function(){
				var attr = $(this).attr("class");
				if(attr == "right"){
					index--;
					$(".tower04 .lbMargin>.shuffling").animate({"left":-index*439},1000);
					$(".tower04 .lbMargin>.index>li").removeClass("active").eq(index==5?0:index).addClass("active");
					if(index == 0){
						index = 5;
						$(".tower04 .lbMargin>.shuffling").animate({"left":-5*439},0);
					}
				}else if(attr == "left"){
					index++;
					$(".tower04 .lbMargin>.shuffling").animate({"left":-index*439},1000);
					$(".lbMargin>.index>li").removeClass("active").eq(index==5?0:index).addClass("active");
					if(index == 5){
						index = 0;
						$(".tower04 .lbMargin>.shuffling").animate({"left":0},0);
					}
				}
			});
		}
	});
	$.towerFour();
	//五楼轮播图
		$.extend({
		"towerFive" : function(){
			//轮播图
			var index = 1;
			var timer = setInterval(aotuPlay,3000);
			function aotuPlay(){
				$(".tower05 .lbMargin>.shuffling").animate({"left":-index*439},1000);
				$(".tower05 .lbMargin>.index>li").removeClass("active").eq(index==5?0:index).addClass("active");
				index++;
				if(index == 6){
					index = 1;
					$(".tower04 .lbMargin>.shuffling").animate({"left":0},0);
				}
			}
			//鼠标对下标的操作
			$(".tower05 .lbMargin>.index>li").click(function(){
				clearInterval(timer);
				index = $(this).index();
				aotuPlay();
			});
			//鼠标移入移出停止和启动计时器
			$(".tower05 .lbMargin>.shuffling").mouseenter(function(){
				clearInterval(timer);
			}).mouseleave(function(){
				timer = setInterval(aotuPlay,3000);
			});
			//左右按钮的操作     所有轮播图的左右按钮都有BUG
			$(".tower05 .lbMargin>.click a").mouseenter(function(){
				clearInterval(timer);
			}).mouseleave(function(){
				timer = setInterval(aotuPlay,3000);
			});
			$(".tower05 .lbMargin>.click a").click(function(){
				var attr = $(this).attr("class");
				if(attr == "right"){
					index--;
					$(".tower05 .lbMargin>.shuffling").animate({"left":-index*439},1000);
					$(".tower05 .lbMargin>.index>li").removeClass("active").eq(index==5?0:index).addClass("active");
					if(index == 0){
						index = 5;
						$(".tower05 .lbMargin>.shuffling").animate({"left":-5*439},0);
					}
				}else if(attr == "left"){
					index++;
					$(".tower05 .lbMargin>.shuffling").animate({"left":-index*439},1000);
					$(".tower05 .lbMargin>.index>li").removeClass("active").eq(index==5?0:index).addClass("active");
					if(index == 5){
						index = 0;
						$(".tower04 .lbMargin>.shuffling").animate({"left":0},0);
					}
				}
			});
		}
	});
	$.towerFive();
	//选项卡    选项卡鼠标移入淡入淡出动画   调用函数实现
	mouseXuan(".tower01_auto_top_nav>li",".tower01_auto_center>ul>li");//一层
	fiade(".tower01_auto_top_nav2>ul>li");
	mouseXuan(".tower02_auto_top_nav>li",".tower02_auto_center>ul>li")//二层
	fiade(".tower02_auto_top_nav2>ul>li");
	mouseXuan(".tower03_auto_top_nav>li",".tower03_auto_center>ul>li");//三层
	fiade(".tower03_auto_top_nav2>ul>li");
	mouseXuan(".tower04 .tower04_auto_top_nav>li",".tower04 .tower04_auto_top_nav_xuan>li");//四层
	fiade(".tower04 .tower04_auto_top_nav2>ul>li");
	mouseXuan(".tower05 .tower05_auto_top_nav>li",".tower05 .tower05_auto_top_nav_xuan>li");//五层
	fiade(".tower05 .tower05_auto_top_nav2>ul>li");
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
	//左侧楼层
	$.extend({
		"fixdeTower":function(){
			//点击楼层到达指定（楼层）位置
			$(".towerRight a").click(function(){
				var index = $(this).parent().index();
				if(index<=5){
					var h = $("body>.tower").eq(index).offset().top;
					$("html,body").animate({"scrollTop":h},1000);
					$(this).parent().siblings().removeClass("active");
					$(this).parent().addClass("active");
				}else if(index == 6){
					$("html,body").animate({"scrollTop":0},2000);
				}
			});
			$(document).scroll(function(){
				var sTop = $(document).scrollTop();
				if(sTop > 860){
					$(".towerRight").css("display","block");
					var index = $(".tower").filter(function(){
						return Math.abs(sTop - $(this).offset().top < $(this).height()/2);
					}).index() - 4;
					if(index>=0){
						$(".towerRight li").removeClass("active").eq(index).addClass("active");
					}else{
						$(".towerRight li").removeClass("active");
					}
				}else{
					$(".towerRight").css("display","none");
				}
			});
		}
	});
	$.fixdeTower();
}
//选项卡函数
function mouseXuan(a,b){
	$(a).mouseenter(function(){
		var index = $(this).index();
		$(a).removeClass("active").eq(index).addClass("active");
		$(b).css("display","none").eq(index).css("display","block");
	});
}
//透明度变化函数
function fiade(a){
	$(a).mouseenter(function(){
		$(this).stop().animate({"opacity":1},500);
	}).mouseleave(function(){
		$(this).stop().animate({"opacity":0.2},500);
	});
}