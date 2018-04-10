$(function(){
	//顶部我的购物车
	$.dzGoshop();
	$.extend({
		"fd":function(){
			//列表页传来数据，渲染页面
			var arr = location.href.split("?")[1].split("&");
			var listname = decodeURIComponent(arr[0].split("=")[1]);
			var listid = arr[1].split("=")[1];
			listid = listid.length == 1 ? listid = "00"+listid : (listid.length == 2 ? listid = "0"+listid : listid);
			$.ajax({
				type:"get",
				url:"json/page.json",
				success:function(res){
				var str = "";
				var brr = res;
				for(var i in brr){
					if(i == listname){
						for(var k in brr[i]){
							if(k == listid){
								str = `<div class="pox">
											<div class="box" id="box">
												<div class="box_left" id="box_left">
													<img style='z-index: 1;' src="${brr[i][k].url[0]}" alt="" />
													<img style='z-index: 0;' src="${brr[i][k].url[1]}" alt="" />
													<img style='z-index: 0;' src="${brr[i][k].url[2]}" alt="" />
													<img style='z-index: 0;' src="${brr[i][k].url[3]}" alt="" />
													<img style='z-index: 0;' src="${brr[i][k].url[4]}" alt="" />
													<div class="mask" id="mask"></div>
												</div>
												<ul class="box_bottom" id="box_bottom">
													<li><img src="${brr[i][k].url[0]}" alt="" /></li>
													<li><img src="${brr[i][k].url[1]}" alt="" /></li>
													<li><img src="${brr[i][k].url[2]}" alt="" /></li>
													<li><img src="${brr[i][k].url[3]}" alt="" /></li>
													<li><img src="${brr[i][k].url[4]}" alt="" /></li>
												</ul>
												<div class="box_right" id="box_right">
													<img style='z-index: 1;' src="${brr[i][k].url[0]}" id='maxImg' alt=""/>
													<img style='z-index: 0;' src="${brr[i][k].url[1]}" alt=""/>
													<img style='z-index: 0;' src="${brr[i][k].url[2]}" alt=""/>
													<img style='z-index: 0;' src="${brr[i][k].url[3]}" alt=""/>
													<img style='z-index: 0;' src="${brr[i][k].url[4]}" alt=""/>
												</div>
											</div>
										</div>
										<div class="_right" id="_right">
											<p>${brr[i][k].number}</p>
											<span>${brr[i][k].use}</span>
											<div class="price">
												<span>现价</span>
												<i>￥</i>
												<span id="_price" class="price_box">${brr[i][k].price}</span>
												<u>赠送购物金:0.99</u>
											</div>
											<div class="ljcd">
												<div id="_box">
													<span>配送至</span>
													<select id="shen"></select>
													<select id="shi"></select>
													<select id="xian"></select>
													<i>有货</i>
													<u>免运费</u>
												</div>
												<i>由<span style='color:red;'>央广购物</span>发货，并提供售后服务。</i>
											</div>
											<div class="goshop">
												<div class="shoplist">
													<a href="javascript:;" class="left" data-fh="-1" data-id='hh'>-</a>
													<input type="text" value="1" class="content" id="nub"/>
													<a data-fh="1" href="javascript:;" class="right">+</a>
												</div>
												<div class="gouwuce">
													<a href="javascript:;" id="nowshop" data-name="${brr[i][k].number}" data-price="${brr[i][k].price}" data-src="${brr[i][k].url[0]}" data-use="${brr[i][k].use}">立即购买</a>
													<a href="javascript:;" id="nowgoshop" data-name="${brr[i][k].number}" data-price="${brr[i][k].price}" data-src="${brr[i][k].url[0]}" data-use="${brr[i][k].use}"><i></i><span>加入购物车</span></a>
												</div>
												<div class="cn">服务承诺15天无理由退换货，30天只换不修 </div>
											</div>
										</div>`;
							}
						}
					}
				}
				$("#wu").html(str);
				}
			});
			/*var arr = location.href.split("?")[1].split("&");
			var name = decodeURIComponent(arr[0].split("=")[1]);
			var price = decodeURIComponent(arr[1].split("=")[1]).split("￥")[1];
			var src = arr[2].split("=")[1];
			var use = decodeURIComponent(arr[3].split("=")[1]);
			var str = `<div class="pox">
						<div class="box" id="box">
							<div class="box_left" id="box_left">
								<img src="${src}" alt="" />
								<div class="mask" id="mask"></div>
							</div>
							<div class="box_right" id="box_right">
								<img src="${src}" alt="" id="maxImg"/>
							</div>
						</div>
					</div>
					<div class="_right" id="_right">
						<p>${name}</p>
						<span>${use}</span>
						<div class="price">
							<span>现价</span>
							<i>￥</i>
							<span id="_price" class="price_box">${price}</span>
							<u>赠送购物金:0.99</u>
						</div>
						<div class="ljcd">
							<div id="_box">
								<span>配送至</span>
								<select id="shen"></select>
								<select id="shi"></select>
								<select id="xian"></select>
								<i>有货</i>
								<u>免运费</u>
							</div>
							<i>由<span style='color:red;'>央广购物</span>发货，并提供售后服务。</i>
						</div>
						<div class="goshop">
							<div class="shoplist">
								<a href="javascript:;" class="left" data-fh="-1">-</a>
								<input type="text" value="1" class="content" id="nub"/>
								<a data-fh="1" href="javascript:;" class="right">+</a>
							</div>
							<div class="gouwuce">
								<a href="javascript:;" id="nowshop" data-name="${name}" data-price="${price}" data-src="${src}" data-use="${use}">立即购买</a>
								<a href="javascript:;" id="nowgoshop" data-name="${name}" data-price="${price}" data-src="${src}" data-use="${use}"><i></i><span>加入购物车</span></a>
							</div>
							<div class="cn">服务承诺15天无理由退换货，30天只换不修 </div>
						</div>
					</div>`;
			$(".bottom").html(str);*/
			//放大镜
			$("#wu").on("mouseenter","#box_bottom>li",function(){
				$(this).css("border","1px solid #ff5300").siblings().css("border","1px solid #f5f5f5");
				var index = $(this).index();box_right
				$("#box_left>img").eq(index).css("z-index",1).siblings().css("z-index",0);
				$("#box_right>img").eq(index).css("z-index",1).attr("id","maxImg").siblings().css("z-index",0).attr("id","");
				$("#mask").css("z-index",3);
			});
			$("#wu").on("mouseenter","#box_left",function(){
				$("#mask").css("display","block");
				$("#box_right").css("display","block");
				$(document).mousemove(function(e){
					var e = e||event;
					var x = e.pageX - $("#box_left").offset().left - $("#mask").width()/2;
					var y = e.pageY - $("#box_left").offset().top - $("#mask").height()/2;
					if(x < 0){
						x = 0;
					}else if(x > $("#box_left").width()-$("#mask").width()){
						x = $("#box_left").width()-$("#mask").width()-2;
					}
					if(y < 0){
						y = 0;
					}else if(y > $("#box_left").height() - $("#mask").height()){
						y = $("#box_left").height() - $("#mask").height()-2;
					}
					var imgL = -$("#maxImg").width()*x/$("#box_left").width();
					var imgT = -$("#maxImg").height()*y/$("#box_left").height();
					$("#maxImg").css({"left":imgL,"top":imgT});
					$("#mask").css({"left":x,"top":y});
				});
			});
			$("#wu").on("mouseleave","#box_left",function(){
				$("#mask").css("display","none");
				$("#box_right").css("display","none");
				$(document).mousemove(function(){});
			})
		}
	});
	$.fd();
	//选择地址
	$.extend({
		"myId":function(){
			$.ajax({
				type:"get",
				url:"json/id.json",
				success:function(res){
					var arr = res;
					var str = "";
					var oshi = "";
					for(var i in arr){
						str += `<option>${i}</option>`;
					}
					$("#shen").html(str);
					var brr = arr["河北省"];
					for(var j in brr){
						oshi += `<option>${j}</option>`;
					}
					$("#shi").html(oshi);
					var crr = arr["河北省"]["石家庄市"];
					var oxian = "";
					for(var k in crr){
						oxian += `<option>${crr[k]}</option>`;
					}
					$("#xian").html(oxian);
					//选择省
					$("#shen").change(function(){
						value = this.value;
						var oshi = "";
						for(var i in arr[value]){
							oshi += `<option>${i}</option>`;
						}
						$("#shi").html(oshi);
						
					})
					//选择市
					$("#shi").change(function(){
						var value2 = this.value;
						var oxian = "";
						for(var i = 0;i < arr[value][value2].length;i++){
							oxian += `<option>${arr[value][value2][i]}</option>`;
						}
						$("#xian").html(oxian);
					});
				}
			});
		}
	});
	$.myId();
	//购物数量在页面上的加减
	$.extend({
		"number":function(){
			$("#wu").on("click",".goshop>.shoplist>a",function(){
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
			});
		}
	});
	$.number();
	//购物车功能
	$.extend({
		"goshop":function(){
			//点击加入购物车按钮  委托实现
			$("#wu").on("click","#nowgoshop",function(){
				var uname = $(this).data("name");
				var price = $(this).data("price");
				var src = $(this).data("src");
				goSoplist(uname,price,src);
			});
			//点击立即购买按钮
			$("#wu").on("click","#nowshop",function(){
				var uname = $(this).data("name");
				var price = $(this).data("price");
				var src = $(this).data("src");
				goSoplist(uname,price,src);
			});
		}
	});
	$.goshop();
	//商品购买函数
	function goSoplist(uname,price,src){
		var index = parseInt($("#nub").val());
		if($(".header_nav_auto_dl").attr("style")){//判断用户是否登录
			$("#nub").val(index);
			var style = $(".header_nav_auto_dl").attr("style");
			if(style == "display: block;"){//用户在登录状态
				var name = $(".header_nav_auto_dl>.name>a").html();
				var arr = [];
				if(getCookie("shoplist").length != 0){//cookie里是否有商品？
					arr = getCookie("shoplist");
					for(var i = 0;i < arr.length;i++){
						if(arr[i].name == name&&arr[i].uname == uname){//说明cookie里有该商品
							//进行累加
							index += parseInt(arr[i].numbre);
							arr.splice(i,1);
						}
					}
				}
				var json = {
							"name":name,
							"uname":uname,
							"price":price,
							"src":src,
							"numbre":index
						}
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
	}
})
