define(['jquery','template'],function($,template){
	return{
		qs:function(key){
			//console.log("ddd")
		//console.dir(location)
		var Url = location.search;
		//console.log(Url)      //  =>  ?tc_id=2
		var UrlSubstr = Url.substr(1); 
		//console.log(UrlSubstr)         //    =>    tc_id=2
		var tcId = ""
		if(Url){
			var sp = UrlSubstr.split("&");
			$.each(sp,function(i,item){
				//console.log(i,item)
				var sp2 = item.split("=");
				//console.log(sp2)
				if(sp2[0] == key){
					tcId = sp2[1]
					//console.log(tcId)
						return false
					}
				})
			}
			return tcId
		}
	}
})