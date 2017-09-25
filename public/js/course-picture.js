define(['jquery','template','util','uploadify'],function($,template,util){
	util.setMenu("/course/add")
	var csId = util.qs("cs_id")

	//渲染页面
	$.ajax({
		url:"/api/course/picture",
		type:"get",
		dataType:"json",
		data:{cs_id:csId},
		success:function(data){
			//console.log(data);
			var html = template("pictureTpl",data.result)
			$("#pictureInfo").html(html)

			//处理文件上传
			$("#pictureFile").uploadify({
				swf:"/public/assets/uploadify/uploadify.swf",
				buttonText:"选择图片",
				fileObjName:"cs_cover_original",
				formData:{cs_id:csId},
				buttonClass:"btn btn-success btn-sm",
				width:80,
				itemTemplate:"<span></span>",
				height:"auto",
				uploader:"/api/uploader/cover",
				onUploadSuccess:function(a,b,c){
					//console.log(b)
					var obj = JSON.parse(b)
					$(".preview img").attr("src",obj.result.path)
				}
			})
		}
	})
});