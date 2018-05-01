var logZgrid=null;
$(document).ready(function(){
		
		initLogZgrid();
		
	});

function initLogZgrid(){
	//初始化日志表格
	logZgrid=$("#logZgrid").zgrid({
		url:'/log/statisticsList',//请求url
		async:true, //异步/同步
		requestParam:null,//请求参数
		pageable : true,//使用分页
		frontPage:false,//允许前台分页，未开放
		pageNavNum:10,//分页数字导航索引个数
		pageNo:1,//当前页码
		pageSize:20,//页面数据量
		rowNumber : false,	//显示行号,默认显示
		rowNumberWidth:'auto',//默认auto
		linefeed:false,	//是否换行
		needTitle:true,	//内容添加title属性
		caption:'日志',	//表格上方title
		width:'100%',
		min_height:'200px',//数据展示部分最低高度
		needBorder:true,//控件外层带边框
		textAlign:'center',//文字居中
		theam:null,//主题样式,自定义的,添加上class的名称,class位于表格控件顶级div中
		checkable: true,	//允许多选
		checkByClickRow : true, // 是否在点击行时就选中
		sortable:true,	//允许排序,与上下行合并互斥
		mergeRows:false,	//允许上下行合并,与排序互斥
		fixedHeader : true,	//允许表头浮动
		fixedHeaderOffset : 20, // 浮动表头距顶部的偏移量，样式容易出问题，慎用
		fixedLeftWidth : '45%', // 浮动表格左边的偏移量，样式容易出问题，慎用
		fixedRightWidth : '45%', // 浮动表格右边边的偏移量，样式容易出问题，慎用
		flexHeadDrag : true, // 允许拖拽表头实现滚动效果
		scrollPos : 'out', // 滚动条 内置/外置 'in'/'out'
		searchBox : '#searchBox_name',
		//以下为新增配置项 和 有变化的配置项目
		caption : '统计列表',     // 标题，推荐只写字符串，
	    captionIcon: 'icon-table', // 标题栏图标
	    //captionHtml : '',          // 标题栏 Html 当配置该属性后   caption,captionIcon 无效
		// backSort:{
		// "XH":{
		// url: String / Function //响应的url
		// cur:"0" //当前的激活的排序状态
		// 0:function(colName){return {}} //默认顺序 参数
		// 1:function(colName){return {}} //排序状态1 参数
		// 2:function(colName){return {}} //排序状态2 参数
		// }
		// },
		backSort:{//后台排序，配置后前台sort功能失效
			"BZXXXH":{
				"url":"",
				"cur":0,
				"0":function(colName){return {}},
				"1":function(colName){return {}},
				"2":function(colName){return {}}
			}
		},
		/**
		* 参考工具栏配置: 
			{
				key:null,	//获取按钮的key
				title:null,	//button的title
				text:null,	//按钮展示的值
				disabled:false,		//禁用/启用
				callback:null	//响应事件
			}
		**/
		toolbar:[//工具栏配置
			{
				key:'refurbish',
				title:'刷新',
				text:'刷新',
				disabled:false,
				callback:function(){
					logZgrid.setUrl("/log/statisticsList");
					logZgrid.reload();
					
				}
			}
     	],			
		cols:[//列配置,每个属性都有对应效果
		      {name:'acCode' , text:'采集器ID',ignore:true,cssClass:'demo-color text-center'},
				{name:'acName' , text:'采集器名称',cssClass:'demo-color text-center'},
				{name:'ktrId' , text:'任务ID',ignore:true,cssClass:'demo-color text-center'},
				{name:'ktrName' , text:'任务',cssClass:'demo-color text-center'},
				{name:'success' , text:'消息执行成功数',cssClass:'demo-color text-center',formatter:function(value){if(value>0){return '<div style="color:green"><a href="javaScript:void(0)" data-moveable="false" data-toggle="modal" data-target="#successModal" onclick="successDetail(this)">'+value+'</a></div>';}else{return value}}},
				{name:'failed' , text:'消息执行失败数',cssClass:'demo-color text-center',formatter:function(value){if(value>0){return '<div style="color:red"><a href="javaScript:void(0)" data-moveable="false" data-toggle="modal" data-target="#failedModal" onclick="failedDetail(this)">'+value+'</a></div>';}else{return value}}},
				{name:'platform' , text:'成功入平台库数',cssClass:'demo-color text-center',formatter:function(value){if(value>0){return '<div style="color:#FFB90F"><a href="javaScript:void(0)" data-moveable="false" data-toggle="modal" data-target="#platformModal" onclick="platformDetail(this)">'+value+'</a></div>';}else{return value}}}
      	]
	});
}
var successZgrid=null;
function successDetail(btn){
	var row_index=$(btn).parent().parent().parent().attr('data-index');
	var row=logZgrid.getRow(true,row_index);
	var acCode=row.acCode;
	if(successZgrid==null){
		initSuccessZgrid(acCode);
		$(".modal.btn-zgrid-zym").click(function(){
			$(".datetimepicker-dropdown-bottom-right").remove();
			initdatetime();
				$("#successModal #search_time").click(function(){
					 var startTime=$($($(this).parents("#searchBox_time")).find("#startTime")).val();
					 var endTime=$($($(this).parents("#searchBox_time")).find("#endTime")).val();
					 if(""!=startTime&&null!=startTime){
						 successZgrid.setPageNo(1);
						 successZgrid.setRequestParam({"code":acCode,"startTime":startTime,"endTime":endTime});
						 successZgrid.reload();
					 }else{
						 jAlertMessage("起始时间不能为空！","warning",null);
					 }
					 				
				 });
		});
	}else{
		successZgrid.setPageNo(1);
		successZgrid.setRequestParam({"code":acCode});
		successZgrid.reload();
	}
	
	  
}

function initSuccessZgrid(acCode){	
	successZgrid=$("#success").zgrid({
		url:'/log/getMsgSuccess',//请求url
		async:true, //异步/同步
		requestParam:{"code":acCode},//请求参数
		pageable : true,//使用分页
		frontPage:false,//允许前台分页，未开放
		pageNavNum:10,//分页数字导航索引个数
		pageNo:1,//当前页码
		pageSize:20,//页面数据量
		rowNumber : false,	//显示行号,默认显示
		rowNumberWidth:'auto',//默认auto
		linefeed:false,	//是否换行
		needTitle:true,	//内容添加title属性
		caption:'消息执行成功详情',	//表格上方title
		width:'100%',
		min_height:'200px',//数据展示部分最低高度
		needBorder:true,//控件外层带边框
		textAlign:'center',//文字居中
		theam:null,//主题样式,自定义的,添加上class的名称,class位于表格控件顶级div中
		checkable: true,	//允许多选
		checkByClickRow : true, // 是否在点击行时就选中
		sortable:true,	//允许排序,与上下行合并互斥
		mergeRows:false,	//允许上下行合并,与排序互斥
		fixedHeader : true,	//允许表头浮动
		fixedHeaderOffset : 20, // 浮动表头距顶部的偏移量，样式容易出问题，慎用
		fixedLeftWidth : '45%', // 浮动表格左边的偏移量，样式容易出问题，慎用
		fixedRightWidth : '45%', // 浮动表格右边边的偏移量，样式容易出问题，慎用
		flexHeadDrag : true, // 允许拖拽表头实现滚动效果
		scrollPos : 'out', // 滚动条 内置/外置 'in'/'out'
		searchBox : '#searchBox_time',
		//以下为新增配置项 和 有变化的配置项目
		caption : '消息执行成功详情',     // 标题，推荐只写字符串，
	    captionIcon: 'icon-table', // 标题栏图标		
		/**
		* 参考工具栏配置: 
			{
				key:null,	//获取按钮的key
				title:null,	//button的title
				text:null,	//按钮展示的值
				disabled:false,		//禁用/启用
				callback:null	//响应事件
			}
		**/
		toolbar:[//工具栏配置
			{
				key:'refurbish',
				title:'刷新',
				text:'刷新',
				disabled:false,
				callback:function(){
					successZgrid.setPageNo(1);
					successZgrid.setRequestParam({"code":acCode});
					successZgrid.reload();
					
				}
			}
     	],	
		cols:[//列配置,每个属性都有对应效果
		      	{name:'parameter' , text:'消息内容',cssClass:'demo-color text-center'},
				{name:'evenname' , text:'事件名',cssClass:'demo-color text-center'},
				{name:'createtime' , text:'时间',cssClass:'demo-color text-center'}
		      	
      	],
      	callback:{												
			onDblclickRow : function(data1,data2,rowIndex,checkedStatus,event){ // 双击行对象

			}
		}
	});
}

var failedZgrid=null;
function failedDetail(btn){
	var row_index=$(btn).parent().parent().parent().attr('data-index');
	var row=logZgrid.getRow(true,row_index);
	var ktrId=row.ktrId;
	if(failedZgrid==null){
		initFailedZgrid(ktrId);
		$(".modal .btn-zgrid-zym").click(function(){
			$(".datetimepicker-dropdown-bottom-right").remove();
			initdatetime();
				$("#failedModal #search_time").click(function(){
					 var startTime=$($($(this).parents("#searchBox_time")).find("#startTime")).val();
					 var endTime=$($($(this).parents("#searchBox_time")).find("#endTime")).val();
					 if(""!=startTime&&null!=startTime){
						 failedZgrid.setPageNo(1);
						 failedZgrid.setRequestParam({"ktrId":ktrId,"startTime":startTime,"endTime":endTime});
						 failedZgrid.reload();
					 }else{
						 jAlertMessage("起始时间不能为空！","warning",null);
					 }
					 
					 			
				 });
		});
	}else{
		failedZgrid.setPageNo(1);
		failedZgrid.setRequestParam({"ktrId":ktrId});
		failedZgrid.reload();
	}
	 
}

function initFailedZgrid(ktrId){	
	failedZgrid=$("#failed").zgrid({
		url:'/log/getMsgFailed',//请求url
		async:true, //异步/同步
		requestParam:{"ktrId":ktrId},//请求参数
		pageable : true,//使用分页
		frontPage:false,//允许前台分页，未开放
		pageNavNum:10,//分页数字导航索引个数
		pageNo:1,//当前页码
		pageSize:20,//页面数据量
		rowNumber : false,	//显示行号,默认显示
		rowNumberWidth:'auto',//默认auto
		linefeed:false,	//是否换行
		needTitle:true,	//内容添加title属性
		caption:'消息执行失败详情',	//表格上方title
		width:'100%',
		min_height:'200px',//数据展示部分最低高度
		needBorder:true,//控件外层带边框
		textAlign:'center',//文字居中
		theam:null,//主题样式,自定义的,添加上class的名称,class位于表格控件顶级div中
		checkable: true,	//允许多选
		checkByClickRow : true, // 是否在点击行时就选中
		sortable:true,	//允许排序,与上下行合并互斥
		mergeRows:false,	//允许上下行合并,与排序互斥
		fixedHeader : true,	//允许表头浮动
		fixedHeaderOffset : 20, // 浮动表头距顶部的偏移量，样式容易出问题，慎用
		fixedLeftWidth : '45%', // 浮动表格左边的偏移量，样式容易出问题，慎用
		fixedRightWidth : '45%', // 浮动表格右边边的偏移量，样式容易出问题，慎用
		flexHeadDrag : true, // 允许拖拽表头实现滚动效果
		scrollPos : 'out', // 滚动条 内置/外置 'in'/'out'
		searchBox : '#searchBox_time',
		//以下为新增配置项 和 有变化的配置项目
		caption : '消息执行失败详情',     // 标题，推荐只写字符串，
	    captionIcon: 'icon-table', // 标题栏图标		
		/**
		* 参考工具栏配置: 
			{
				key:null,	//获取按钮的key
				title:null,	//button的title
				text:null,	//按钮展示的值
				disabled:false,		//禁用/启用
				callback:null	//响应事件
			}
		**/
		toolbar:[//工具栏配置
			{
				key:'refurbish',
				title:'刷新',
				text:'刷新',
				disabled:false,
				callback:function(){
					failedZgrid.setPageNo(1);
					failedZgrid.setRequestParam({"ktrId":ktrId});
					failedZgrid.reload();
					
				}
			}
     	],	
		cols:[//列配置,每个属性都有对应效果
		      	{name:'msgId' , text:'消息id',cssClass:'demo-color text-center'},
				{name:'createTime' , text:'时间',cssClass:'demo-color text-center'}
		      	
      	],
      	
	});
}

var platformZgrid=null;
function platformDetail(btn){
	var row_index=$(btn).parent().parent().parent().attr('data-index');
	var row=logZgrid.getRow(true,row_index);
	var ktrId=row.ktrId;
	if(platformZgrid==null){
		initFailedZgrid(ktrId);
		$(".modal .btn-zgrid-zym").click(function(){			
			$(".datetimepicker-dropdown-bottom-right").remove();
			initdatetime();
				$("#platform #search_time").click(function(){
					 var startTime=$($($(this).parents("#searchBox_time")).find("#startTime")).val();
					 var endTime=$($($(this).parents("#searchBox_time")).find("#endTime")).val();
					
					 if(""!=startTime&&null!=startTime){
						 platformZgrid.setPageNo(1);
						 platformZgrid.setRequestParam({"ktrId":ktrId,"startTime":startTime,"endTime":endTime});
						 platformZgrid.reload();
					 }else{
						 jAlertMessage("起始时间不能为空！","warning",null);
					 }				
				 });
		});
	}else{
		platformZgrid.setPageNo(1);
		platformZgrid.setRequestParam({"ktrId":ktrId});
		platformZgrid.reload();
	}
	
	  
}

function initPlatformZgrid(ktrId){	
	platformZgrid=$("#platform").zgrid({
		url:'/log/getPlatform',//请求url
		async:true, //异步/同步
		requestParam:{"ktrId":ktrId},//请求参数
		pageable : true,//使用分页
		frontPage:false,//允许前台分页，未开放
		pageNavNum:10,//分页数字导航索引个数
		pageNo:1,//当前页码
		pageSize:20,//页面数据量
		rowNumber : false,	//显示行号,默认显示
		rowNumberWidth:'auto',//默认auto
		linefeed:false,	//是否换行
		needTitle:true,	//内容添加title属性
		caption:'成功入平台库详情',	//表格上方title
		width:'100%',
		min_height:'200px',//数据展示部分最低高度
		needBorder:true,//控件外层带边框
		textAlign:'center',//文字居中
		theam:null,//主题样式,自定义的,添加上class的名称,class位于表格控件顶级div中
		checkable: true,	//允许多选
		checkByClickRow : true, // 是否在点击行时就选中
		sortable:true,	//允许排序,与上下行合并互斥
		mergeRows:false,	//允许上下行合并,与排序互斥
		fixedHeader : true,	//允许表头浮动
		fixedHeaderOffset : 20, // 浮动表头距顶部的偏移量，样式容易出问题，慎用
		fixedLeftWidth : '45%', // 浮动表格左边的偏移量，样式容易出问题，慎用
		fixedRightWidth : '45%', // 浮动表格右边边的偏移量，样式容易出问题，慎用
		flexHeadDrag : true, // 允许拖拽表头实现滚动效果
		scrollPos : 'out', // 滚动条 内置/外置 'in'/'out'
		searchBox : '#searchBox_time',
		//以下为新增配置项 和 有变化的配置项目
		caption : '成功入平台库详情',     // 标题，推荐只写字符串，
	    captionIcon: 'icon-table', // 标题栏图标		
		/**
		* 参考工具栏配置: 
			{
				key:null,	//获取按钮的key
				title:null,	//button的title
				text:null,	//按钮展示的值
				disabled:false,		//禁用/启用
				callback:null	//响应事件
			}
		**/
		toolbar:[//工具栏配置
			{
				key:'refurbish',
				title:'刷新',
				text:'刷新',
				disabled:false,
				callback:function(){
					platformZgrid.setPageNo(1);
					platformZgrid.setRequestParam({"ktrId":ktrId});
					platformZgrid.reload();
					
				}
			}
     	],	
		cols:[//列配置,每个属性都有对应效果
		      	{name:'idBatchTarget' , text:'目标批次id',cssClass:'demo-color text-center'},
				{name:'targetTableName' , text:'目标数据库名',cssClass:'demo-color text-center'},
				{name:'createTime' , text:'时间',cssClass:'demo-color text-center'},
		      	
      	],
      	
	});
}


function jAlertMessage(content,type,flag){
	$.jAlert({
		content:content,
		flag:flag,//成功与否，一般用于表达在执行某种操作后的状态(提示语距和图标产生响应变化)，
		//true成功,false失败,null不描述状态,内容只有content.同时type失效
		img:type //强制指定图标,包含error success question  warning loading sad smile。null表示不指定图标。
	});
}


function initdatetime(){
	
	//初始化日期选择框
	$(".form-date").datetimepicker(
			{
			    weekStart: 1,
			    todayBtn:  1,
			    autoclose: 1,
			    todayHighlight: 1,
			    startView: 2,
			    forceParse: 0,
			    showMeridian: 1,
			    format: "yyyy-mm-dd hh:ii:ss"
	});
	
}
function search(){
	var queryname=$('#queryname').val();
	logZgrid.setUrl("/log/statisticsList?queryName="+queryname);
	logZgrid.reload();
}