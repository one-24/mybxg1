define(['jquery','template','util','validate','form'],function($,template,util){
	util.setMenu("/course/add");
	var csId = util.qs("cs_id")
	var flag = util.qs("flag")
	//渲染数据
	$.ajax({
		url:"/api/course/basic",
		type:"get",
		data:{cs_id:csId},
		dataType:"json",
		success:function(data){
			//console.log(data)
			if(flag){
				data.result.flag="编辑课程"
			}else{
				data.result.flag="添加课程"
			}
			var html = template("courseBasicTpl",data.result)
			$("#courseBasicInfo").html(html)


			//二级联动功能 二级分类根据一级分类动态渲染

				$("#basicFirst").change(function(){
					//获取 cg_id 数据
					var cgId = $(this).val();
					//console.log("aaa")
					$.ajax({
						url:"/api/category/child",
						type:"get",
						data:{cg_id:cgId},
						dataType:"json",
						success:function(data){
							//console.log(data)
							var html2 = template("basicSecondTpl2",{list:data.result});
							//console.log(html2)
							$("#basicSecond").html(html2)
						}
					})
				})

			//处理表单提交
			$("#basicForm").validate({
				sendForm:false,
				valid:function(){
					$(this).ajaxSubmit({
						url:"/api/course/update/basic",
						type:"post",
						data:{cs_id:csId},
						dataType:"json",
						success:function(data){
							//console.log(data)
							if(data.code == 200){
								location.href='/course/picture?cs_id='+data.result.cs_id;
							}
						}
					})
				}
			})
		}
	})
})
