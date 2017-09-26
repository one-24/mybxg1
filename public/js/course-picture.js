define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
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
					$(".preview img").attr("src",obj.result.path);
					//图片上传完直接出现裁剪选区
					pictureCrop();
					//修改裁切图片文字
					$("#cropBtn").text("保存图片").attr('data-flag',true);
				}
			})
			//获取图片
			var  img = $(".preview img")

			//处理图片裁切功能
			$("#cropBtn").click(function(){
				var flag = $(this).attr("data-flag");
				if(flag){
					//第二次点击的时候
					//接收表单提交的裁切数据传到后台进行裁切
					$("#cropForm").ajaxSubmit({
						url:"/api/course/update/picture",
						dataType:"json",
						type:"post",
						data:{cs_id:csId},
						success:function(data){
							console.log(data)
							if(data.code == 200){
								location.href='/course/lesson?cs_id='+data.result.cs_id;
							}
						}
					})
				}else{
					//第一次点击的时候并没有 flag 属性
					$(this).text("保存图片").attr("data-flag",true);
					//封装一个图片裁切功能函数
					pictureCrop()
				}
			});
			//图片裁切功能函数
			function pictureCrop(){
				img.Jcrop({
					aspectRatio:2
					/*setSelect:[0,100,100,100]*/
				},function(){
					//清空缩略图预览处的原图片
					$(".thumb").html("")
					//启用缩略图预览功能
					this.initComponent("Thumbnailer",{width:240,height:120,targetPreview:".thumb"})

					
					//console.log(this)
					//获取图片的宽高
					var width = this.ui.stage.width;
					var height = this.ui.stage.height;

					//设置选区默认位置
					var x = 0;
					var y = (height-width/2)/2;
					var w = width
					var h = height/2
					//创建选区
					this.newSelection();
					this.setSelect([x,y,w,h]);
					//监控选取移动 记录位置
					img.parent().on('cropstart cropmove cropend',function(a,b,c){
						var inputs = $("#cropForm").find("input")
						inputs.eq(0).val(c.x);
						inputs.eq(1).val(c.y);
						inputs.eq(2).val(c.w);
						inputs.eq(3).val(c.h);
						//console.log(img,c)
					})
				})
			}
		}
	})
});