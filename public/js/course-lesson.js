define(['jquery','template','util','bootstrap','form'],function($,template,util){
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

			//处理课时添加功能
			$("#addLessons").click(function(){
				//alert("aaa")
				
				var modalHtml = template("modalTpl",{});
				$("#modalInfo").html(modalHtml)
				$("#chapterModal").modal()
				//处理表单提交
				$("#editOrAddBtn").click(function(){
					$("#modalForm").ajaxSubmit({
						url:"/api/course/chapter/add",
						type:"post",
						data:{ct_cs_id:csId},
						dataType:"json",
						success:function(data){
							if(data.code==200){
								location.reload()
							}
						}
					})
				})
			})
			//处理课时编辑功能
			$(".editLessons").click(function(){
				var ctId = $(this).attr("data-ctId")
				//alert("sfsd")
				
				$.ajax({
					url:"/api/course/chapter/edit",
					type:"get",
					data:{ct_id:ctId},
					dataType:"json",
					success:function(data){
						var modalHtml = template("modalTpl",data.result);
						$("#modalInfo").html(modalHtml)
						$("#chapterModal").modal()
						//处理表单提交
						$("#editOrAddBtn").click(function(){
							$("#modalForm").ajaxSubmit({
								url:"/api/course/chapter/modify",
								type:"post",
								data:{ct_cs_id:csId,ct_id:ctId},
								dataType:"json",
								success:function(data){
									if(data.code==200){
										location.reload()
									}
								}
							})
						})
					}
				})
				
			})
		}

	})

});
