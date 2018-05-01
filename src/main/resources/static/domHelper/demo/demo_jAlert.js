var dialog=null;
$(document).ready(function(){
	$("#show").click(function(){
		$.jAlert({
			content:'买买提·孟孟斯基1111111111111',//内容,用于标识高亮的核心内容，比如需要操作的某个人的姓名,可省略
			type:'del',//操作谓词,默认提供了'add','edit','del','save',也可以指定其他的谓词,可省略
			flag:false,//成功与否，一般用于表达在执行某种操作后的状态(提示语距和图标产生响应变化)，
			//true成功,false失败,null不描述状态,内容只有content.同时type失效
			img:'warning'//强制指定图标,包含error success question  warning loading sad smile。null表示不指定图标。
		});
	});

	$("#show2").click(function(){
		$.jAlert('快捷消息');
	});
	
});

