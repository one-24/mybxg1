define(['jquery','template','util'],function($,template,util){
	util.setMenu(location.pathname)
	$.ajax({
		url:"/api/course",
		type:"get",
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.code == 200){
				var html = template("courseListTpl",{list:data.result})
				$("#courseListInfo").html(html)
			}
		}
	})
});