define(['jquery','template'],function($,template){
	//console.log("aaa")
	$.ajax({
		type:"get",
		url:"/api/teacher",
		dataType:"json",
		success:function(data){
			//console.log(data)
			var html = template("teacherTpl",{list:data.result});
			$("#teacherInfo").html(html);

			//注销和启用功能切换
			$(".zoq").click(function(){
				var that = this;
				var td = $(this).closest("td");     //获取最近的父元素
				var tcId = td.attr("data-tcId");
				//console.log(tcId)
				var tcStatus = td.attr("data-tcStatus");

				$.ajax({
					url : "/api/teacher/handle",
					type : "post",
					data:{tc_id:tcId,tc_status:tcStatus},
					dataType : "json",
					success:function(data){
						//console.log(data)
						if(data.code == 200){
							td.attr("data-tcStatus",data.result.tc_status)
							if(data.result.tc_status == 0){
								$(that).text("启用")
							}else{
								$(that).text("注销")
							}
						}
					}
				})
			})
		}
	})
})