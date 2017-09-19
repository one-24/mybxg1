define(['jquery','cookie'],function($){
     $("#submitBtn").click(function(){
            console.log("aaa");
           $.ajax({
                type : 'post',
                url : '/api/login',
                data : $("#loginForm").serialize(),
                dataType : 'json',
                success : function(data){
                        //console.log(data);
                    if(data.code == 200){
                        //存储用户登录信息
                        $.cookie("loginInfo",JSON.stringify(data.result),{path:'/'})
                        //console.log(location.href);
                        location.href="/main/index"
                    }
                }
           });
            return false;
        });
})