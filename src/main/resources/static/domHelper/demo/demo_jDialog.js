var dialog=null;
$(document).ready(function(){
	$("#init").click(function(){
		if(dialog===null||isNullObj(dialog))
		dialog=$.jDialog({
				id:'dsafgea',//唯一id标识，页面中只允许存在同id 的弹窗1个
				header: true,//显示title部分
				footer: true,//显示按钮部分
				title:'新增',
				titleIcon:'icon-remove',//标题图标class全称
				width:null,//宽度,按照css写法的标准
				width:'800px',//高度,按照css写法的标准
				content : $("#saveDiv")[0],
				position:'30%',//位置'fit'：正中偏上,'center'：正中,'left'：靠左,right:靠右,bottom:'底',top:'上','left-top':'左上','right-top':又上,'left-bottom'左下,'right-bottom'右下
				backdrop:false,//背景遮盖层.  true:使用(鼠标点击其他地方不会关闭弹窗),false:不使用, 'static':使用(鼠标点击其他地方不会关闭弹窗)
				autoShow:false,//初始化之后自动显示,默认true
				closeKey:'27',//按键响应关闭,默认'27':esc
				timeout:5000,//自动关闭弹窗延时,毫秒
				ok:function(){//默认确认按钮样式
					return false;//false 不关闭
				},
				okVal:'保存',
				cancel:function(){//默认取消按钮样式
					return true;//true 自动触发关闭
				},
				cancelVal:'取消',
				btnGroup:[//自定义按钮
					{
						key:	'personal',//按钮key,可通过key从api获取对象
						icon:'icon-cog',//图标class全称
						text:'自定义按钮',//按钮显示名称
						focus:false,//采用焦点样式
						callback:function(){//回调方法,返回true关闭该弹出框,其他保持弹出框
							return true;
						}
					}
				],
				callback:{
					onShow:function(){
						alert("显示后处理");						
					},
					onClose:function(){
						alert("关闭之后回调");
					}
				}
			});
		
	});
	$("#show").click(function(){
		if(dialog)
			dialog.show();
	});
	
	$("#close").click(function(){
		alert("关闭弹出并唤醒关闭事件，默认唤醒");
		if(!isNullObj(dialog))dialog.close();
	});
	
	$("#destroy").click(function(){
		if(!isNullObj(dialog))dialog.destroy();
		alert("注意：当调用销毁方法后，嵌入dialog的dom元素同样会被remove掉。一般情况下使用close方法即可");
	});
	
	$("#setContent").click(function(){
		if(!isNullObj(dialog))$.jDialog.getById("dsafgea").setContent("新内容"+new Date().getTime());
		alert("注意：重新设置内容(当内容为引用的dom里面已经存在的element时，不推荐使用此方法，原内容会被销毁掉)");
	});
	
	$("#setContent").click(function(){
		if(!isNullObj(dialog))$.jDialog.getById("dsafgea").setTitle("新title"+new Date().getTime());
		alert("注意：重新设置内容(当内容为引用的dom里面已经存在的element时，不推荐使用此方法，原内容会被销毁掉)");
	});
	
	$("#getById").click(function(){
		if(!isNullObj(dialog))$.jDialog.getById("dsafgea").show();
	});
	
	var isNullObj=function(obj){
		if(typeof obj!=='object')
			return false;
		for(var i in obj){
			return false;
		}
		return true;
	};
});