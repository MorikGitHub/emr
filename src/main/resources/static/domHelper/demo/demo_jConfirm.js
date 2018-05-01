var dialog=null;
$(document).ready(function(){
	$("#show").click(function(){
		$.jConfirm({
			content:'买买提·孟孟斯基1111111111111',//内容,用于标识高亮的核心内容，比如需要操作的某个人的姓名,可省略(使用默认提示语)
			type:'warining',//操作谓词,默认提供了'add','edit','del','save',也可以指定其他的谓词,可省略,不使用谓词时使用content作为提示内容
			ok:function(){
				alert("执行删除");
			}
		});
	});
	
});