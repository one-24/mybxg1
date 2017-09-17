<?php
	//header('content-type:text/html;charset=utf-8;');

	
	// echo '<div>主页内容</div>';
	//include 作用嵌入子页面

	//include('./views/main/login.html')
	//var_dump($_SERVER)

	//include('./views'.$path.'.html');

	//先判断是否有 $path 

	$dir = 'main';
	$fileName = 'index';
	if(array_key_exists('PATH_INFO', $_SERVER)){
			$path = $_SERVER['PATH_INFO'];
			//截取字符串
			$str = substr($path, 1);
			$ret = explode('/', $str);
			if(count($ret) == 2){
				$dir = $ret[0];
				$fileName = $ret[1];
			}else{
				//其他情况一律跳到登录页
				$fileName = 'login';
			}
	}
	include('./views/'.$dir.'/'.$fileName.'.html');
?>