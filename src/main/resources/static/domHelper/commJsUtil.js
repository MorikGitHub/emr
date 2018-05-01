/************************************************常用工具方法*************************************************/
/**
 * 说明：
 * 1.请严格按照 “非业务部分”、“业务关联部分”分类定义方法,便于以后维护、移植工作。
 * 2.每个方法尽量遵守闭包原则，减少与其他方法冲突。
 * 3.具体涉及某个方面的自定义方法，特别是涉及业务部分的，请自定义命名空间和可扩展的编程方式，减少冲突和加强可读性和可维护性。
 */
 
/*******************************************非业务部分 begin**************************************************/

/**
 * 弹出框域名空间声明以及基础常量定义
 */


/**
 * 空间声明
 * 本空间对遵循某特殊规则的html进行操作。用于设置、获取值
 */
(function($){
	$.extend({coloper:{}});
})(jQuery);

/**
 * 定义工具类方法并添加到coloper中
 */
(function($,undefined){
	var util={
		/**
		* 查看页面格式化基本信息的入口
		**/
		detailDataFormatter:function(value,fmtType){
			if(fmtType===undefined||fmtType===null||fmtType==''||fmtType===true||fmtType===false){
				if(fmtType===true)//编辑
					return this.getDicKey(value);
				else
					return this.getDicValue(value);
			}
			else if(fmtType==="dateYMD"){//YYYY-MM-DD
				return this.dateNYRFormatter(value);
			}
			else if(fmtType==="GJMGC"){
				return this.hotkeyFormatter(value);
			}
			else if(fmtType==="MAP"){//键值对类型 key1:value1,key2:value2
				return this.mapFormatter(value);
			}
		},
		/**
		 * 从携带后缀的字符串中获取前半部分（常用于获取真实KEY名称）
		 * @param string id html原ID
		 * @param string suffix 后缀
		 * @param boolean upperCase 转化为大写
		 */
		getHtmlId:function(id,suffix,upperCase){
			var key=id.split(suffix)[0];
			if(upperCase===true){
				key=key.toUpperCase();
			}
			return key;
		},
		/**
		* 获取 "@"右边的串，没有”@“返回原串
		**/
		getDicKey:function(cellvalue) {
			if(cellvalue==null||cellvalue==undefined||cellvalue==''){
				return "";
			}else{
				var tempArray=(cellvalue+"").split("@");
				if(tempArray.length>1){
					return tempArray[1];
				}else{
					return cellvalue;
				}
			}
		},
		/**
		* 获取 "@"左边的串，没有”@“返回原串
		**/
		getDicValue:function(cellvalue) {
			if(cellvalue==null||cellvalue==undefined||cellvalue==''){
				return "";
			}else{
				cellvalue=cellvalue+'';
				//还有多选的情况
				if(cellvalue.indexOf('@'>=0)){				//包含'@'
					if(cellvalue.indexOf('&&')>=0){			
						var mutlStr=cellvalue.split('&&');
						var keys=[];
						for(var i=0;i<mutlStr.length;i++){
							var decItem=mutlStr[i]+'';
							if(decItem.indexOf('@')>=0){
								keys.push(decItem.split('@')[0]);
							}
						}
						return keys.join(',');
						
					}else{
						return cellvalue.split("@")[0];				
					}				
					
				}else{
					return cellvalue;
				}
			}
		},
		/**
		 * String时间格式的format函数 提出时分秒 只要年月日
		 */
		dateNYRFormatter:function(cellvalue) {
			if(cellvalue!=null&&cellvalue!=''&&cellvalue!='null'){
				if(cellvalue.length>10){
					return cellvalue.substring(0,10);
				}else{
					return cellvalue;
				}
			}else{
				return "";
			}
		},
		/**
		* 键值对类型 key1:value1,key2:value2 默认分隔符 : ,
		**/
		mapFormatter:function(cellvalue,spliterInside,spliterOutside){
			return cellvalue;
		},
		/**
		* 关键敏感词的全文检索
		**/
		hotkeyFormatter:function (cellvalue){
			var html="<a style='color:blue;text-decoration:none;' href='showSearchHotKeyPage.do?searchText="+cellvalue+"'>"+cellvalue+"</a>";
			return html;
		}
	};
	$.extend($.coloper,{util:util});//添加到coloper
})(jQuery);
/**
 * 业务具体实现
 */
(function($,undefined){
	var util=$.coloper.util;
	$.extend($.coloper,{
		/**
		 * 获取某表格下的输入值的键值对 默认会获取 下拉控件、特殊取值的值。
		 * @param String<> tableSelector->表格 selector字符串
		 * @param Array<String> valueSelector->筛选类型的数组，如:'input','textArea','select'
		 * @param boolean||string suffix 若为boolean,则是否保留原后缀,若为字符串,则重新指定后缀。默认false
		 */
		getParam:function(tableSelector,valueSelector,suffix){
			var tableObj=$(tableSelector);
			var tableId=tableObj[0].id;
			var hz=tableObj.attr('hz');
			var param={};
			/**
			 * 普通字段和下拉控件的取值
			 */
			if(suffix===undefined||suffix===null){
				for(var i=0;i<valueSelector.length;i++){
					tableObj.find(valueSelector[i]+"[id$="+hz+"]").each(function(){
						var id=util.getHtmlId(this.id,hz);
						param[id]=$(this).val();
					});
				}
				if(this.dicSelector!==undefined&&this.dicSelector[tableId]!==undefined){
					for(key in this.dicSelector[tableId]){
						var id=util.getHtmlId(key,hz);
						param[id]=this.dicSelector[tableId][key].getSelectedValue();
					}
				}
			}
			else if(typeof suffix==='boolean'){
				if(suffix){
					for(var i=0;i<valueSelector.length;i++){
						tableObj.find(valueSelector[i]+"[id$="+hz+"]").each(function(){
							var id=this.id;
							param[id]=$(this).val();
						});
					}
					if(this.dicSelector!==undefined&&this.dicSelector[tableId]!==undefined){
						for(key in this.dicSelector[tableId]){
							param[key]=this.dicSelector[tableId][key].getSelectedValue();
						}
					}
				}
				else{
					for(var i=0;i<valueSelector.length;i++){
						tableObj.find(valueSelector[i]+"[id$="+hz+"]").each(function(){
							var id=util.getHtmlId(this.id,hz);
							param[id]=$(this).val();
						});
					}
					if(this.dicSelector!==undefined&&this.dicSelector[tableId]!==undefined){
						for(key in this.dicSelector[tableId]){
							var id=util.getHtmlId(key,hz);
							param[id]=this.dicSelector[tableId][key].getSelectedValue();
						}
					}
				}
			}
			else if(typeof suffix==='string'){
				for(var i=0;i<valueSelector.length;i++){
					tableObj.find(valueSelector[i]+"[id$="+hz+"]").each(function(){
						var id=util.getHtmlId(this.id,hz)+suffix;
						param[id]=$(this).val();
					});
				}
				if(this.dicSelector!==undefined&&this.dicSelector[tableId]!==undefined){
					for(key in this.dicSelector[tableId]){
						var id=util.getHtmlId(key,hz)+suffix;
						param[id]=this.dicSelector[tableId][key].getSelectedValue();
					}
				}
			}
			/**
			 * 特殊赋值的取值
			 */
			var paramSpec=this.getSpecialParams();
			if(paramSpec!==undefined){
				for(key in paramSpec){
					param[key]=paramSpec[key];
				}
			}
			
			return param;
		},
		/**
		 * 特殊值获取接口,在业务实现中重写该方法
		 */
		getSpecialParams:function(func){
			if(typeof func==='function'){
				this.func=func;
			}
			else if(typeof this.func==='function'){
				return this.func();
			}
			else
				return function(){};
		},
		/**
		 * 新增、编辑中的表格赋值
		 * @param string tableSelector jquery筛选器字符串
		 * @param string infoObj 信息对象json
		 * @param string needFormat 是否进行业务内常归格式化
		 * @param string upperCase 是否在对html赋值时无视小写
		 */
		setEditTableData:function(tableSelector,infoObj,needFormat,upperCase){
			if(infoObj==undefined||infoObj==null)
				return;
			var hz=$(tableSelector).attr("hz");
			var tableObj=$(tableSelector);
			var tableId=tableObj[0].id;
			if(needFormat===true){
				$(tableSelector).find("input[id$='"+hz+"']").each(function(){
					var key=util.getHtmlId($(this).attr("id"),hz,upperCase);
					var fmtType=$(this).attr("fmtType");
					if(typeof infoObj[key]==="string"){
						var value=util.detailDataFormatter(infoObj[key],fmtType);
						if(value!=''){
							$(this).val(value);
						}
					}
				});
				$(tableSelector).find("textarea[id$='"+hz+"']").each(function(){
					var key=util.getHtmlId($(this).attr("id"),hz,upperCase);
					if(typeof infoObj[key]==="string"){
						var value=util.detailDataFormatter(infoObj[key]);
						$(this).val(value);
					}
				});
				$(tableSelector).find("select[id$='"+hz+"']").each(function(){
					var key=util.getHtmlId($(this).attr("id"),hz,upperCase);
					if(typeof infoObj[key]==="string"){
						var value=util.detailDataFormatter(infoObj[key],true);
						$(this).val(value);
					}
				});
			}else{
				$(tableSelector).find("input[id$='"+hz+"']").each(function(){
					var key=util.getHtmlId($(this).attr("id"),hz,upperCase);
					if(typeof infoObj[key]==="string"){
						var value=infoObj[key].toString();
						$(this).val(value);
					}
				});
				$(tableSelector).find("textarea[id$='"+hz+"']").each(function(){
					var key=util.getHtmlId($(this).attr("id"),hz,upperCase);
					if(typeof infoObj[key]==="string"){
						var value=infoObj[key].toString();
						$(this).val(value);
					}
				});
				$(tableSelector).find("select[id$='"+hz+"']").each(function(){
					var key=util.getHtmlId($(this).attr("id"),hz,upperCase);
					if(typeof infoObj[key]==="string"){
						var value=infoObj[key].toString();
						$(this).val(value);
					}
				});
			}
			if(this.dicSelector!==undefined&&this.dicSelector[tableId]!==undefined){
				for(key in this.dicSelector[tableId]){
					var dataId=util.getHtmlId(key,hz);
					if(infoObj!==undefined&&infoObj[dataId]){
						var dic=$.coloper.util.getDicKey(infoObj[dataId]);
						this.dicSelector[tableId][key].setDefaultValue(dic);
					}
				}
			}
		},
		/**
		 * 清除输入表格中的相应数据为空
		 */
		clearTableData:function(tableSelector){
			var hz=$(tableSelector).attr("hz");
			var tableObj=$(tableSelector);
			var tableId=tableObj[0].id;
			if(this.dicSelector!==undefined&&this.dicSelector[tableId]!==undefined){
				for(key in this.dicSelector[tableId]){
					var dataId=util.getHtmlId(key,hz);
					this.dicSelector[tableId][key].setDefaultValue("");
				}
			}
			$(tableSelector).find("input[id$='"+hz+"']").each(function(){
				$(this).val("");
			});
			$(tableSelector).find("textarea[id$='"+hz+"']").each(function(){
				$(this).val("");
			});
			$(tableSelector).find("select[id$='"+hz+"']").each(function(){
				$(this).val("");
			});
		},
		/**
		 * 清除viewTable类型的数据
		 */
		clearViewTableData:function(tableSelector){
			var hz=$(tableSelector).attr("hz");
			$(tableSelector).find("th[id$='"+hz+"']").each(function(){
				$(this).html("");
			});
		},
		/**
		 * 对查看页面设置值
		 * @param string tableSelector jquery筛选器字符串
		 * @param string infoObj 信息对象json
		 * @param string needFormat 是否进行业务内常归格式化
		 * @param string upperCase 是否在对html赋值时无视小写
		 */
		setViewTableData:function(tableSelector,infoObj,needFormat,upperCase){
			if(infoObj==undefined||infoObj==null)
				return;
			var hz=$(tableSelector).attr("hz");
			if(needFormat===true){
				$(tableSelector).find("td[id]").each(function(){
					var key=util.getHtmlId($(this).attr("id"),hz,upperCase);
					var fmtType=$(this).attr("fmtType");
					if(typeof infoObj[key]==="string"){
						var value=util.detailDataFormatter(infoObj[key],fmtType);
						$(this).html(value);
					}
				});
			}else{
				$(tableSelector).find("td[id]").each(function(){
					var key=util.getHtmlId($(this).attr("id"),hz,upperCase);
					if(typeof infoObj[key]==="string"){
						var value=infoObj[key].toString();
						$(this).html(value);
					}
				});
			}
		},
		/**
		 * 多个验证器容器
		 */
		validator:{},
		/**
		 * 公共验证器赋值方法
		 * @param 父级元素筛选字符串,以此元素为根节点往下遍历对应id
		 * @param 子验证对象名称
		 */
		initValidate:function(fatherDomSelector,validateName){
			var validateParam={};
			$(fatherDomSelector).find("[id][validator]").each(function(){
				var id=this.id;
				var perVali=eval("("+$(this).attr("validator")+")");
				if(perVali['title']===undefined){//如果没有配置title属性，尝试获取标准表单格式中能获取title的html
					var title=$(this).parent().prev().text().replace("*","");
					perVali["title"]=title;
				}
				validateParam[$(this).attr("id")]=perVali;
			});
			var validator={};
			validator[validateName]=$(fatherDomSelector).validator(validateParam);
			$.extend($.coloper.validator,validator);//添加到常量中，便于统一接口调用
		},
		/**
		 * 下拉选择控件赋值
		 */
		dicSelector:{},
		/**
		 * 下拉控件初始化,只针对 dropSelector控件
		 * @param 表格筛选器
		 * @param 下拉控件容器对象
		 * @param 数据项
		 */
		initDicSelector:function(tableSelector,selectorObj,dataObj){
			if(selectorObj===undefined||selectorObj===null)
				selectorObj={};
			var tableObj=$(tableSelector);
			var tableId=tableObj[0].id;
			var hz=tableObj.attr("hz");
			selectorObj[tableId]={};
			
			$(tableSelector).find('select.select').each(function(){				//初始化选择控件
				var id=this.id;
				var fmtType=$(this).attr('dicMulty');
				if(fmtType===undefined){
					selectorObj[tableId][id]=$("#"+id).dropSelector({multiple:false});
					if(dataObj!==undefined){
						var dataId=util.getHtmlId(id,hz);
						var dic=$.coloper.util.getDicKey(dataObj[dataId]);
						selectorObj[tableId][id].setDefaultValue(dic);
					}
				}
				else{
					selectorObj[tableId][id]=$("#"+id).dropSelector({multiple:true});
					if(dataObj!==undefined){
						var dataId=util.getHtmlId(id,hz);
						var dic=$.coloper.util.getDicKey(dataObj[dataId]);
						selectorObj[tableId][id].setDefaultValue(dic);
					}
				}
			});
			$.extend($.coloper.dicSelector,selectorObj);//添加到常量中，便于统一接口调用
		}
	});
})(jQuery);

/**
 * @param jd 经度
 * @param wd 维度
 * @param tc 图层
 * @param lx 图标类型
 */
(function($,undefined){
	$.fn.googleMap=function(basePath,jd,wd,tc,lx){
		var currentObj=this[0];
		var id=currentObj.id;
		var jd=(jd===undefined||jd===null||jd==='')?"104.0623587":jd;
		var wd=(wd===undefined||wd===null||wd==='')?"30.67":wd;
		var tc=(tc===undefined||tc===null||tc==='')?"9":tc;
		var lx=(lx===undefined||lx===null||lx==='')?"1":lx;
		
		/**
		 * 初始化接口
		 */
		this.initMapInfo=function(){
			this.attr('src',basePath+'resources/extends/bscombo/map/pages/map/googleAPI.jsp');
			
			this.load(function(){
				//初始化地图（纬度:30.67,经度：104.0623587,地图图层：9,图标：1 表示敏感人员 还有2 3 4 5 6）
				currentObj.contentWindow.setMarkZBs(wd,jd,tc,lx);
				currentObj.contentWindow.changeTuodong(true);//设置可多动
				currentObj.contentWindow.setCircleRadius(5000,true);
			});
			
		};
		
		this.initMapInfo();//初始化
		
		/**
		 * 获取经度纬度，地图图层
		 */
		this.getMarker=function(){
			var mapInfo=document.getElementById('Myiframes').contentWindow.getMarkLats();
			var mapData = mapInfo.split(",");
			var param={
				JD:mapData[0],//获得经度
				WD:mapData[1],//获得纬度
				DTTC:mapData[2]//获得地图层级
			};
			return param;
		};
		
		/**
		 * 设置表中的图标的半径
		 */
		this.setCircle=function(value){
			var radius = value;
			//设置辐射范围
			currentObj.contentWindow.setCircleRadius(parseInt(radius),true);
			//绑定显示半径的inputID
			currentObj.contentWindow.bindInputWithCircleR("radius");
		}
		
		return this;
	}
})(jQuery);
/*******************************************非业务部分 end**************************************************/

/*******************************************业务关联部分 begin**************************************************/

/**
 * 验证任意字段值唯一性
 */
(function($,undefined){
	var uniqueArray={};//设置缓存，减少数据库交互
	var validated=false;
	$.fn.checkAnyUnique=function(option){
		if(option===null||option===undefined)option={};
		var tname=(option.tname===undefined||option.tname===null)?"":option.tname;
		var colName=(option.colName===undefined||option.colName===null)?"":option.colName;
		var uniqueCallBack=(typeof option.uniqueCallBack!=="function")?function(){}:option.uniqueCallBack;
		var unUniqueCallBack=(typeof option.unUniqueCallBack!=="function")?function(){}:option.unUniqueCallBack;
		$(this).blur(function(){
			var checkValue=this.value;
			if(checkValue.length>0){
				if(uniqueArray[checkValue]===true){
	 				uniqueCallBack();
		 			return;
				}
			 	var param={
					'tname':tname,
					'colName':colName,
					'checkValue':checkValue
				};
				$.ajax({
			 		url:'common/other/checkAnyUnique.do',
			 		type:'post',
			 		data:param,
			 		dataType:'text',
			 		cache:false,
			 		success:function(data){
			 			if(data=="true"){
			 				uniqueCallBack();
			 				uniqueArray[checkValue]=data;
			 				validated=true;
			 			}
			 			else if(data=="false"){
			 				unUniqueCallBack();
			 				uniqueArray[checkValue]=data;
			 				validated=false;
			 			}
			 		}
		 		});	
			}
			
	 	});
	 	
	 	//校验情况
	 	this.validated=function(){
	 		return validated;
	 	};
	 	
	 	return this;
	}
})(jQuery);

/**
 * 涉恐人身份证自动唯一性检查
 */
(function($,undefined){
	var sfzArray={};//设置身份证缓存，减少数据库交互
	$.fn.checkSFZUnique=function(ryfz,callback){
		$(this).blur(function(){
			var checkValue=this.value;
			if(checkValue.length===18){
				if(sfzArray[checkValue]!==undefined&&sfzArray[checkValue]!=='-1'){
					$.dialog({
		 				content:'该身份证号已经存在，是否进入编辑页面？',
		 				lock:true,
		 				opacity:0.6,
		 				ok:function(){
		 					window.location.href=context_root+"baseinfo/"+ryfz+"/gotoEditPage.do?XH="+sfzArray[checkValue];
		 				},
		 				cancel:function(){
		 					$(this).focus().select();
		 				}
		 			});
		 			return;
				}
				var param={
					'gmsfhm':checkValue
				};
				$.ajax({
			 		url:'baseinfo/checkGmsfhm.do',
			 		type:'post',
			 		data:param,
			 		dataType:'text',
			 		cache:false,
			 		success:function(data){
			 			if(data!=='-1'){
		 					$.dialog({
				 				content:'该身份证号已经存在，是否进入编辑页面？',
				 				lock:true,
				 				opacity:0.6,
				 				ok:function(){
				 					window.location.href=context_root+"baseinfo/"+ryfz+"/gotoEditPage.do?XH="+data;
				 				},
				 				cancel:function(){
				 					$(this).focus().select();
				 					sfzArray[checkValue]=data;
				 				}
				 			});
			 				
			 			}else if(data==='-1'){
			 				sfzArray[checkValue]=data;
			 				
			 			}
			 			if(typeof callback==="function")
			 				callback();
			 		}
		 		});	
			}
		 	
	 	});
	}
})(jQuery);

/**
 * 单个照片获取
 */
(function($,undefined){
	$.fn.loadPhoto=function(tname,xh){
		var currentObj=this;
		var param={
			TABLENAME:tname.toUpperCase(),
			PKVALUE:xh,
			FILETYPE:'3',
			pageNo:'1',
			pageSize:'1'
		}
		$.ajax({
	 		url:'attachment/list.do',
	 		type:'post',
	 		data:param,
	 		dataType:'json',
	 		cache:false,
	 		success:function(data){
	 			if(parseInt(data.total)>=1){
	 				$(currentObj).attr("src",context_root+"uploads/"+data.rows[0].FILEPATH);
	 			}
	 		}
 		});	
	}	
})(jQuery);
/*******************************************业务关联务部分 end**************************************************/

/**************系统中多个界面常用的公共方法******************/

/**
 * 空间声明
 * 本空间对遵循某特殊规则的html进行操作。实用公共方法
 */
(function($){
	$.extend({othercom:{}});
})(jQuery);
/**
 * 实现区
 */
(function($){
	/**
	 * 以post方式跳转到新页面，适合参数保密，和参数过长
	 */
	$.extend($.othercom,{
		jumpForm:function(url,params){
			var html=[];
			html.push("<form id='util_jumpForm' method='post'");
			html.push(" action="+url+"></form>");
			$("body").html(html.join(''));
			var form=$("#util_jumpForm");
			if(params===undefined)
				params={};
			for(var key in params){
				var html="<input type='text' name='"+key+"' value='"+params[key]+"'/>";
				form.append(html);				
			}
			form[0].submit();
		}
	});
	/**
	 * 关闭当前窗口
	 */
	$.extend($.othercom,{
		closeWindow:function(url,params){
			window.opener=null;
			window.close();
			return false;
		}
	});
})(jQuery);

