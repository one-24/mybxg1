require.config({
	baseUrl:'/public/assets',
	paths:{
		jquery:"jquery/jquery.min",
		cookie:"jquery-cookie/jquery.cookie",
		template:"artTemplate/template",
		bootstrap:"bootstrap/js/bootstrap",
		datepicker:"bootstrap-datepicker/js/bootstrap-datepicker.min",
		datepickerLanguage:"bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
		validate:"validate/jquery-validate.min",
		form:"jquery-form/jquery.form",
		uploadify:"uploadify/jquery.uploadify.min",
		region:"jquery-region/jquery.region",
		ckeditor:"ckeditor/ckeditor",
		jcrop:"jcrop/js/jcrop",
		echarts:"echarts/echarts.min",
		util:"../js/util",
		common:"../js/common",
		login:"../js/login",
		teacherList:"../js/teacher-list",
		teacherAdd:"../js/teacher-add",
		settings:"../js/setting",
		index:"../js/index",
		courseList:"../js/course-list",
		courseAdd:"../js/course-add",
		courseBasic:"../js/course-basic",
		coursePicture:"../js/course-picture",
		courseLesson:"../js/course-lesson",
		SomeElse:"../js/SomeElse"
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		},
		datepickerLanguage:{
			deps:['jquery','datepicker']
		},
		validate:{
			deps:['jquery']
		},
		uploadify:{
			deps:['jquery']
		},
		ckeditor:{
			exports:'CKEDITOR'
		},
		jcrop:{
			deps:['jquery']
		}
	}
});