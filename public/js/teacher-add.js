define(['jquery','template','util','datepicker','datepickerLanguage'],function($,template,util){
	var tcId = util.qs("tc-id")
	//console.log(tcId)
	if(tcId){
		//讲师编辑功能
		$.ajax({
			url:"/api/teacher/edit",
			type:"get",
			data:{tc_id:tcId},
			dataType:"json",
			success:function(data){
				//console.log(data)
				if(data.code == 200){
					data.result.oparet="编辑讲师"
					var html = template("teacherEdit",data.result);
					$("#teacherInfo").html(html)
					submitForm("/api/teacher/update")
				}
			}
		})
	}else{
		//讲师添加功能
		var html = template("teacherEdit",{oparet:"添加讲师"});
		$("#teacherInfo").html(html)
		submitForm("/api/teacher/add")
	}
	function submitForm(url){
		$("#teacherBtn").click(function(){
			console.log('sss')
			$.ajax({
				url:url,
				type:"post",
				data:$("#teacherForm").serialize(),
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						location.href = "/teacher/list"
					}
				}
			})
		})
	}
})