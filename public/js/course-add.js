define(['jquery','template','util','form'],function($,template,util){
	util.setMenu(location.pathname)
	//按钮提交功能
	$("#courseAddBtn").click(function(){
		//console.log("aaa")
		$("#courseAddForm").ajaxSubmit({
			url:"/api/course/create",
			type:"post",
			dataType:"json",
			success:function(data){
				//console.log(data)
				if(data.code == 200){
					location.href='/course/basic?cs_id='+data.result.cs_id;
				}
			}
		})
	})
})