define(['jquery'],function($){
	//遮挡层效果
	$(document).ajaxStart(function(){
		$(".overlay").show()
	})
	$(document).ajaxStop(function(){
		setTimeout(function(){
			$(".overlay").hide()
		},50)
	})
})