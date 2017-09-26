define(['jquery','template','util'],function($,template,util){
	util.setMenu("/course/add");
	var csId = util.qs("cs_id")
	$.ajax({
		url:"/api/course/lesson",
		type:"get",
		data:{cs_id:csId},
		dataType:"json",
		success:function(data){
			var html = template("lessonTpl",data.result)
			$("#lessonInfo").html(html)
		}

	})
});
