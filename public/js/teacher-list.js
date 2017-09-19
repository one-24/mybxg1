define(['jquery','template'],function($,template){
	$.ajax({
		url:"/api/teacher",
		type:"get",
		dataType:"json",
		success:function(data){
			//console.log(data)
			var html = template("teacherTpl",{list:data.result});
			$("#teacherInfo").html(html)
		}
	})
})