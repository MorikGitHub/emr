var batchZgrid=null;
var batchDialog=null;
	$(document).ready(function(){
		
		//chosen
		//初始化下拉搜索框
		$('select.chosen-select').chosen({
			allow_single_deselect: true,
			width:"100%" ,
		    no_results_text: '没有找到',    // 当检索时没有找到匹配项时显示的提示文本
		    disable_search_threshold: 10, // 10 个以下的选择项则不显示检索框
		    search_contains: true         // 从任意位置开始检索
		});
		var ktrName=$("#ktrName").val();
		//初始化日志表格
		batchZgrid=$("#batchZgrid").zgrid({
			url:'/log/batchList/'+ktrName,//请求url
			async:true, //异步/同步
			requestParam:null,//请求参数
			pageable : true,//使用分页
			frontPage:false,//允许前台分页，未开放
			pageNavNum:10,//分页数字导航索引个数
			pageNo:1,//当前页码
			pageSize:20,//页面数据量
			rowNumber : true,	//显示行号,默认显示
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
			
			//以下为新增配置项 和 有变化的配置项目
			caption : '批次列表',     // 标题，推荐只写字符串，
		    captionIcon: 'icon-table', // 标题栏图标
		    //captionHtml : '',          // 标题栏 Html 当配置该属性后   caption,captionIcon 无效
			searchBox : '#searchBox',     // 搜索栏目，样式自定义，可以参考页面底部  searchBox
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
						zgrid.reload();
						
					}
				}
         	],
			/**
			* 参考列属性配置: 
				{// 列属性默认配置
					name : null, // 字段名
					text : null, // 字段展示名
					flex : false, // 可滚动，宽度配置比表格实际能分配的值大时，提供滚动条，相邻flex=true的列自动组合一起
					width : 'auto',	//宽度，默认均分
					cssClass : null,//表头样式 class，使用样式表
					css : null,	//表头样式，直接写入style
					type : 'string',//数据类型 string/number/date 排序用，data类型支持不好，不推荐
					ignore : false,//不加载此列
					sort : false,//允许此列排序
					mergeRows : false,//允许行合并
					formatter : null//对传入值的格式化方法
				},
			*/
			cols:[//列配置,每个属性都有对应效果
				{name:'idBatch' , text:'批次',width:'150px',cssClass:'demo-color text-center'},
				{name:'channelId' , text:'通道编号',cssClass:'demo-color text-center',ignore:true},
				{name:'logDate' ,width:'150px',text:'时间',cssClass:'demo-color text-center'},
				{name:'transName',width:'150px', text:'任务名',cssClass:'demo-color text-center'},
				{name:'stepName',width:'150px',text:'步骤名',cssClass:'demo-color text-center'},
				{name:'linesRead' , text:'读入条数',cssClass:'demo-color text-center'},
				{name:'linesWritten' , text:'新增条数',cssClass:'demo-color text-center',formatter:function(value){return '<div><a href="javaScript:void(0)" onclick="lookDetail(this)">'+value+'</a></div>';}},
				{name:'linesUpdated' , text:'更新条数',cssClass:'demo-color text-center',formatter:function(value){return '<div><a href="javaScript:void(0)" onclick="lookDetail(this)">'+value+'</a></div>';}},
				{name:'errors',text:'错误条数',cssClass:'demo-color text-center'},
	      	],
	      	callback:{												
				onDblclickRow : function(data1,data2,rowIndex,checkedStatus,event){ // 双击行对象

				}
			}
		});
		
		
		
	});
	function lookDetail(btn){
		var row_index=$(btn).parent().parent().parent().attr('data-index');
		var translog=batchZgrid.getRow(true,row_index);
		var idBatch=translog.idBatch;
		$("#idBatch").val(idBatch);
		initDetailPage();
	}
	function jAlertMessage(content,type,flag){
		$.jAlert({
			content:content,
			flag:flag,//成功与否，一般用于表达在执行某种操作后的状态(提示语距和图标产生响应变化)，
			//true成功,false失败,null不描述状态,内容只有content.同时type失效
			img:type //强制指定图标,包含error success question  warning loading sad smile。null表示不指定图标。
		});
	}
	//初始化详情页面
	function initDetailPage(){
		if(batchDialog===null){
			batchDialog=$.jDialog({
					id:'logDetaildialog',//唯一id标识，页面中只允许存在同id 的弹窗1个
					header: true,//显示title部分
					footer: true,//显示按钮部分
					title:'详情',
					titleIcon:'',//标题图标class全称
					width:'1200px',//宽度,按照css写法的标准
					height:'600px',//高度,按照css写法的标准
					content : $("#logDetail")[0],
					position:'top',//位置'fit'：正中偏上,'center'：正中,'left'：靠左,right:靠右,bottom:'底',top:'上','left-top':'左上','right-top':又上,'left-bottom'左下,'right-bottom'右下
					backdrop:false,//背景遮盖层.  true:使用(鼠标点击其他地方不会关闭弹窗),false:不使用, 'static':使用(鼠标点击其他地方不会关闭弹窗)
					autoShow:false,//初始化之后自动显示,默认true
					closeKey:'27',//按键响应关闭,默认'27':esc
					timeout:false,//自动关闭弹窗延时,毫秒
					
					callback:{
						onShow:function(){
											
						},
						onClose:function(){
							
						}
					}
				});
			
			initdatatable();
			batchDialog.show();
			initdatetime();	
		}else{
			
			initdatatable();
			batchDialog.show();
			
		}
		
		
	}
	function initdatetime(){
		
		//初始化日期选择框
		$(".form-datetime").datetimepicker(
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
		$("#detailSearchBox").show();
	}
	
	function initdatatable(){
		var currentPage=1;
		var pageSize=10;
		var idBatch=$("#idBatch").val();
		var url="/log/detailList/"+idBatch;
		search(currentPage,pageSize,url);
	}
	function search(currentPage,pageSize,url){
		var startTime=$("#startTime").val();
		var endTime=$("#endTime").val();
		$.ajax({
            url:url,
            datatype:"json",
            type: "Post",
            data:{"pageSize":pageSize,"pageNumber":currentPage,"startTime":startTime,"endTime":endTime},
            success: function (data) {
            	$("#colName").children().remove();
              	$("#tdata").children().remove();
              	var tabledata=eval("(" + data + ")");
                  $.each(tabledata.colName, function (index,item) { 
                	  $("#colName").append('<th>'+item+'</th>');
                  });  
                  $.each(tabledata.data, function (index, row) { 
	                  $("#tdata").append('<tr>');
	                  for(var key in row) { 
	                	  $("#tdata").append('<td>'+row[key]+'</td>');
	                  }
	                  $("#tdata").append('</tr>');
                  });
                  var options = {
              		  	currentPage:tabledata.pageNumber,    
              		    totalPages: tabledata.pageCount,    
              		    size:"normal",    
              		    bootstrapMajorVersion: 3,    
              		    alignment:"right",    
              		    numberOfPages:10, 
                        itemTexts: function (type, page, current) {
                            switch (type) {
                                case "first":
                                    return "首页";
                                case "prev":
                                    return "上一页";
                                case "next":
                                    return "下一页";
                                case "last":
                                    return "末页";
                                case "page":
                                    return page;
                            }
                        },//点击事件，用于通过Ajax来刷新整个list列表
                        onPageClicked: function (event, originalEvent, type, page) {
                      	  search(page,pageSize,url);            	 
                        }
                  }
                  $('#pageLimit').bootstrapPaginator(options);
            }
           });
	}
	
	
