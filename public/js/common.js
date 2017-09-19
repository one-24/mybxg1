define(['jquery','cookie'],function($){

	// NProgress.start();

	// NProgress.done();
	//控制左侧菜单的折叠
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	//退出功能
	$("#logOutBtn").click(function(){
		//console.log("qqq")
		$.ajax({
			type:"post",
			url:"/api/logout",
			dataType:"json",
			success:function(data){
				//console.log(data)
				if(data.code == 200){
					location.href = "./main/login"
				}
			}
		})
	})

	//判断用户是否登录
	var flag = $.cookie('PHPSESSID');
	if(!flag &&location.pathname!="/main/login"){
		location.href="/main/login"
	}

	//填充头像信息
	//$.cookie('loginInfo');
	//"{"tc_name":"admin","tc_avatar":"http://static.botue.com/images/avatar/58d3d54990dea.png"}"
	var loginInfo = $.cookie("loginInfo");
	loginInfo = loginInfo && JSON.parse(loginInfo);
	$(".profile img").attr("src",loginInfo.tc_avatar);
	$(".profile h4").text(loginInfo.tc_name)



})