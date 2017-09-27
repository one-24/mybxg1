define(['jquery','template','ckeditor','uploadify','region','datepicker','datepickerLanguage','validate','form','SomeElse'],function($,template,CKEDITOR){
	//console.log("aaa");
	$.ajax({
		url:"/api/teacher/profile",
		type:"get",
		dataType:"json",
		success:function(data){
			//console.log(data)
			var html = template("settingTpl",data.result)
			$("#settingInfo").html(html);
			//头像上传功能
			$("#upfile").uploadify({
				height:120,
				width:120,
				buttonText:"",
				swf:"/public/assets/uploadify/uploadify.swf",
				uploader:"/api/uploader/avatar",
				itemTemplate:"<span></span>",
				fileObjName:"tc_avatar",
				onUploadSuccess:function(a,b){
					//console.log(b)       //{"code":200,"msg":"OK","result":{"path":"http:\/\/static.botue.com\/images\/avatar\/59c50a3bc6891.png"},"time":1506085436}
					var obj = JSON.parse(b)
					//console.log(obj)
					$(".preview img").attr("src",obj.result.path)
				}
			})
			//三级联动功能
			$("#pcd").region({
				url:"/public/assets/jquery-region/region.json"
			});

			// //textarea 添加富文本功能
			CKEDITOR.replace('editor',{
		        toolbarGroups : [
		          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
		        ]
		    });
		    $("#settingForm").validate({
		    	sendForm:false,
		    	valid:function(){
		    		var p = $("#p option[selected]").text();
		    		var c = $("#c").find("option:selected").text();
		    		var d = $("#d").find("option:selected").text();
		    		var pcd = p + "|" + c +"|" + d;

		    		//更新富文本内容
		    		for(var instance in CKEDITOR.instances){
		    			CKEDITOR.instances[instance].updateElement()
		    		}

		    		$(this).ajaxSubmit({
		    			url:'/api/teacher/modify',
		    			type:'post',
		    			data:{tc_hometown:pcd},
		    			dataType:'json',
		    			success:function(data){
		    				//console.log(data)
		    				if(data.code==200){
		    					location.reload()
		    				}
		    			}
		    		})
		    	}
		    })
		}
	})
});