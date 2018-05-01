/**
 * 公共弹出框
 */
(function($, undefined) {
	var global_jdialog_map = {};// 全局的弹窗对象，防止重复弹出

	var JDialog = function(userOptions) {
		var _this = this;

		var $dialog = null;// 弹窗html主体
		var modal = null;// 内置弹窗对象

		var options = null;
		var adapterOptions = null;

		var isShowing = false;// 是否处于显示状态
		var timeoutInterval = null;// 自动关闭弹窗的计时器对象

		var positionSetted=false;//位置已调整
		
		var $zwdiv = null;// 当弹窗直接从dom中取得html时，用此div占位标识原位置

		/**
		 * 默认构造函数
		 */
		var _init = function() {
			getOptions(userOptions);

			initJDialog(options);
		};

		/**
		 * 得到完整的配置参数
		 * 
		 * @param {Object}
		 *            options
		 */
		var getOptions = function(userOptions) {
			var defualtConf = JDialog.defaultConf();
			var globalConf = $.jDialogGlobalSetting();

			options = $.extend(true,defualtConf, globalConf, userOptions);

			adapterOptions = $.extend({}, JDialog.adaptorConf(options));
		};

		/**
		 * 初始化相关
		 * 
		 * @param {JSON}
		 *            options 已正确配置的参数
		 */
		var initJDialog = function(options) {
			initAdapterDialog(options);
		};

		/**
		 * 使用第三方控件适配时的初始化方法
		 */
		var initAdapterDialog = function(options) {
			$dialog = $("<div class='modal'></div>");
			if (options.id) {
				if (global_jdialog_map[JDialog.dialog_prefix + options.id]) {// 全局中已存在该对象
					_this = global_jdialog_map[JDialog.dialog_prefix + options.id]
					_this.show();
					return;
				} else {
					$dialog.attr("id", JDialog.dialog_prefix + options.id);
					global_jdialog_map[JDialog.dialog_prefix + options.id] = _this;// 全局对象添加
				}
			}
			$dialog
					.append("<div class='modal-dialog' style='width:auto;display:table;min-width:150px;'><div class='modal-content'></div></div>");

			var $content = $dialog.find(".modal-content");
			if (options.header === true)
				$content.append(initAdapterDialog.createTitle(options));

			$content.append(initAdapterDialog.createBody(options));

			if (options.footer === true)
				$content.append(initAdapterDialog.createFooter(options));

			if (Util.isNotEmptyStr(options.closeKey)) {
				$(document).on('keydown', function(event) {
							if (event.keyCode == options.closeKey)
								_this.close();
						});
			}
			
			_this.show();
		};

		/**
		 * 创建标题
		 */
		initAdapterDialog.createTitle = function(options) {
			var $header = $("<div class='modal-header'></div>");
			$header.append(initAdapterDialog.createCloseX());

			if (options.title) {
				if (options.titleIcon)
					$header.append("<h4 class='modal-title'><i class='"
							+ options.titleIcon + "'></i> " + options.title
							+ "</h4>");
				else
					$header.append("<h4 class='modal-title'>" + options.title
							+ "</h4>");
			}

			return $header;
		};

		/**
		 * 创建一个可以关闭弹出框的X按钮
		 */
		initAdapterDialog.createCloseX = function() {
			var $closeBtn = $("<button class='close' style='padding:0 4psx;font-size:16px;margin:0;width:25px;'><span aria-hidden='true'></span>Χ　<span class='sr-only'>关闭</span></button>");
			$closeBtn.on("click.jDialog.closeBtn", function() {
						_this.close();
					});
			return $closeBtn;
		};

		/**
		 * 创建弹出框主体内容部分
		 */
		initAdapterDialog.createBody = function(options) {
			var $body = $("<div class='modal-body'></div>");
			if (typeof options.width === 'string'){
				$body.css('width', options.width);
				$body.css('overflow-x', "auto");
			}
			if (typeof options.height === 'string'){
				$body.css('height', options.height);
				$body.css('overflow-y', "auto");
			}
				

			// if(!options.header===true){
			// $body.append(initAdapterDialog.createCloseX());
			// }

			var content = options.content;
			if (typeof content === 'function')
				content = content();

			if (typeof content === 'string') {
				$body.append(content);
			} else if ($(content).length > 0) {// if(content instanceof
				// HTMLElement){//dom对象,ie8不支持
				// var $clone = $(content).clone(true);
				var $clone = $(content);
				$clone.show();
				$body.append($clone);
			}
			return $body;
		};

		/**
		 * 创建弹出框按钮框部分
		 */
		initAdapterDialog.createFooter = function(options) {
			var $footer = $("<div class='modal-footer' style='text-align:center;'></div>");
			if (options.ok !== null && options.ok !== undefined) {
				var $btnOk = $("<button class='btn btn-primary'><i class='icon-check'></i> "
						+ options.okVal + "</button>");
				initAdapterDialog.bindBtnClick($btnOk, options.ok);
				$footer.append($btnOk);
			}
			
			if (options.cancel !== null && options.cancel !== undefined) {
				var $btnCancel = $("<button class='btn btn-default'><i class='icon-times'></i> "
						+ options.cancelVal + "</button>");
				initAdapterDialog.bindBtnClick($btnCancel, options.cancel);
				$footer.append($btnCancel);
			}


			if (options.btnGroup && options.btnGroup instanceof Array) {
				for (var i = 0; i < options.btnGroup.length; i++) {
					var btnConf = options.btnGroup[i];
					if (Util.isJSONObject(btnConf)) {
						var $btn = $("<button class='btn'></button>");
						if (Util.isNotEmptyStr(btnConf.key)) {
						}

						if (Util.isNotEmptyStr(btnConf.icon))
							$btn.html("<i class='" + btnConf.icon + "'></i>");
						if (Util.isNotEmptyStr(btnConf.text))
							$btn.html($btn.html() + btnConf.text);
						if (btnConf.focus===true)
							$btn.addClass('btn-primary');
						if (typeof btnConf.callback === 'function')
							initAdapterDialog.bindBtnClick($btn,
									btnConf.callback);
						$footer.append($btn);
					}
				}
			}

			return $footer;
		};

		/**
		 * 按钮事件绑定,需要根据返回值决定是否关闭窗体
		 */
		initAdapterDialog.bindBtnClick = function($btn, callback) {
			$btn.on("click.jDialog.btn", function() {
						var returnType = callback === false ? false : true;
						if (typeof callback === 'function') {
							returnType = callback();
							returnType = returnType === false ? false : true;
						}
						if (returnType)
							_this.close();
					});

		};

		/**
		 * 显示弹窗 适配接口
		 */
		initAdapterDialog.show = function() {
			isShowing=$dialog.is(":visible");
			
			if (isShowing)
				return false;
			if (modal === null) {
				modal = $dialog.modal(adapterOptions);
				if (adapterOptions.show)
					isShowing = true;
				else
					return false;
					
				//if(!$.support.leadingWhitespace){
					initAdapterDialog.setPosition();
					
				//}
					
			} else {
				$dialog.modal("show");
				isShowing = true;
			}
			if(options.backdrop){
				$dialog.addClass("jDalog-open");
				$("body").addClass("jDalog-open-body");
			}
			
			//使用one方法无效,人为判断是否多次执行
			$dialog.on("shown.zui.modal",function(){
				if(!positionSetted||adapterOptions.backdrop){
					initAdapterDialog.setPosition();
				}
			});
			
			
			return true;
		};

		/**
		 * 位置设置
		 * 位置'fit'：正中偏上,'center'：正中,'left'：靠左,right:靠右,bottom:'底',top:'上','left-top':'左上','right-top':又上,'left-bottom'左下,'right-bottom'右下
		 */
		initAdapterDialog.setPosition = function() {
			var padding = 2;// 靠边的位置保持2px的边距
			var scrollWidth=17;//滚动条预留宽度
			var position = adapterOptions.position;
				var $dPo = $dialog.find(".modal-dialog");
				var width = $dPo.outerWidth();
				var height = $dPo.outerHeight();
				var css = {};
				
			if (position === 'left')
				css = {
					"margin-top" : ($dialog.height() - height) / 2 + "px",
					"margin-left" : padding + "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'right')
				css = {
					"margin-top" : ($dialog.height() - height) / 2 + "px",
					"margin-left" : ($dialog.width() - width) - padding-scrollWidth
							+ "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'top')
				css = {
					"margin-top" : padding + "px",
					"margin-left" : ($dialog.width() - width) / 2 + "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'bottom')
				css = {
					"margin-top" : ($dialog.height() - height) - padding
							+ "px",
					"margin-left" : ($dialog.width() - width) / 2 + "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'left-top')
				css = {
					"margin-top" : padding + "px",
					"margin-left" : padding + "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'right-top')
				css = {
					"margin-top" : padding + "px",
					"margin-left" : ($dialog.width() - width) - padding-scrollWidth
							+ "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'left-bottom')
				css = {
					"margin-top" : ($dialog.height() - height) - padding
							+ "px",
					"margin-left" : padding + "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'right-bottom')
				css = {
					"margin-top" : ($dialog.height() - height) - padding
							+ "px",
					"margin-left" : ($dialog.width() - width) - padding-scrollWidth
							+ "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'center') 
				css = {
					"margin-top" : ($dialog.height() - height)/2 - padding
							+ "px",
					"margin-left" : ($dialog.width() - width)/2 - padding
							+ "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			else if (position === 'fit')
				css = {
					"margin-top" : ($dialog.height()-height)*(1-0.618)-  padding
							+ "px",
					"margin-left" : ($dialog.width() - width)/2 - padding
							+ "px",
					"margin-right" : "0",
					"margin-bottom" : "0"
				};
			
			if(!options.backdrop){//不使用遮罩层
				$dialog.css({
					"width":"auto",
					"overflow":"visible",
					"top":css["margin-top"],
					"left":css["margin-left"],
					"right":"auto",
					"bottom":"auto",
					"padding":"0"
				});//这么做是为了屏蔽即使不用遮罩层页面顶部仍有一层遮盖整个窗口的div，触发一些事件BUG
				
				$dPo.css("margin","0");

			}
			else
				$dPo.css(css);
			
			positionSetted=true;
		};

		/**
		 * 关闭弹窗 适配接口
		 */
		initAdapterDialog.close = function() {
			if (!isShowing)
				return false;
			$dialog.modal('hide');
			if(options.backdrop){
				$dialog.removeClass("jDalog-open");
				$("body").removeClass("jDalog-open-body");
			}
			
			isShowing = false;

			return true;
		};

		/**
		 * 销毁弹窗 适配接口
		 */
		initAdapterDialog.destroy = function() {
		};

		/**
		 * 显示弹窗
		 * 
		 * @param bool
		 *            是否响应显示事件
		 */
		_this.show = function(bool) {
			if (!initAdapterDialog.show())
				return;
			if(options.backdrop&&$(".jDalog-backdrop").length===0){
				var id=JDialog.dialog_prefix+"backdrop_"+options.id;
				$dialog.after("<div class='jDalog-backdrop' id='"+id+"'></div>");
			}
			bool = bool === false ? false : true;
			if (bool && typeof options.callback.onShow === 'function') {
				options.callback.onShow();
			}

			if (options.timeout) {
				timeoutInterval = setTimeout(function() {
							_this.close();
						}, options.timeout);
			}
		};

		/**
		 * 关闭弹窗
		 * 
		 * @param bool
		 *            是否响应关闭事件
		 */
		_this.close = function(bool) {
			if (!initAdapterDialog.close())
				return;
				
			var id=JDialog.dialog_prefix+"backdrop_"+options.id;	
			if(options.backdrop&&$("#"+id).length>0){
				$("#"+id).remove();
			}
			if (timeoutInterval) {
				clearTimeout(timeoutInterval);
				timeoutInterval = null;
			}

			bool = bool === false ? false : true;
			if (bool && typeof options.callback.onClose === 'function') {
				options.callback.onClose();
			}
		};

		/**
		 * 销毁控件
		 */
		_this.destroy = function() {
			initAdapterDialog.destroy();

			_this.close(false);
			$dialog.remove();
			Util.deleteEverything(_this);

			global_jdialog_map[JDialog.dialog_prefix + options.id] = null;
		};

		/**
		 * 重新设置内容(当内容为引用的dom里面已经存在的element时，不推荐使用此方法，原内容会被销毁掉)
		 * 支持 dom/string/function
		 */
		_this.setContent=function(content){
			var $body=$dialog.find(".modal-body");
			$body.children().remove();
			
			if (typeof content === 'function')
				content = content();

			if (typeof content === 'string') {
				$body.append(content);
			} else if ($(content).length > 0) {// if(content instanceof
				// HTMLElement){//dom对象,ie8不支持
				// var $clone = $(content).clone(true);
				var $clone = $(content);
				$clone.show();
				$body.append($clone);
			}
		};
		
		/**
		 * 重新设置标题
		 * 配置中必须允许使用title
		 */
		_this.setTitle=function(title,titleIcon){
			var $header = $dialog.find(".modal-header");
			$header.children().remove();
			
			$header.append(initAdapterDialog.createCloseX());

			if (typeof title==="string") {
				if (typeof titleIcon==="string")
					$header.append("<h4 class='modal-title'><i class='"
							+ titleIcon + "'></i> " + title
							+ "</h4>");
				else
					$header.append("<h4 class='modal-title'>" + title
							+ "</h4>");
			}
		};
		
		_init();
		return _this;
	};

	/**
	 * 默认配置
	 */
	JDialog.defaultConf = function() {
		var baseConf = {// 弹出框对外的api
			id : null,// 弹出框id,同一id不会重复弹出
			content : null,// 普通文本或者html字符，或者dom对象，或者function...(返回前面任意一种结果)
			width : null,// 宽度,按照css写法的标准
			height : null,// 高度,按照css写法的标准
			header : true,// 显示title部分
			footer : true,// 显示按钮部分
			title : null,// 标题文本,'string'显示title栏和对应文本,null/其他,不显示title
			titleIcon : null,// 标题图标class全称
			position : 'fit',// 位置'fit'：正中偏上,'center'：正中,'left'：靠左,right:靠右,bottom:'底',top:'上','left-top':'左上','right-top':又上,'left-bottom'左下,'right-bottom'右下
			backdrop : 'static',// 背景遮盖层
			autoShow : true,// 初始化之后自动显示,默认true
			closeKey : '27',// 按键响应关闭
			ok : null,// 默认按钮
			// ok,确认,并获得焦点样式.true:点击时直接关闭,function(){..}执行相关操作并返回true/false
			okVal : '确认',// 按钮显示名称
			timeout : null,// 自动关闭弹窗延时,毫秒
			cancel : null,// 默认按钮
			// cancel,取消。true:点击时直接关闭,function(){..}执行相关操作并返回true/false
			cancelVal : '取消',
			btnGroup : [// 按钮组
			/**
			 * 参考配置 { key: 'add',//按钮key,可通过key从api获取对象 icon:'',//图标class全称
			 * text:'保存',//按钮显示名称 focus:false,//采用焦点样式
			 * callback:function(){//回调方法,返回true关闭该弹出框,其他保持弹出框 return false; } }
			 */
			],
			callback : {
				onShow : null,// 准备显示时触发
				onClose : null
				// 关闭时触发
			}
		};

		return baseConf;
	};

	/**
	 * 用于适配第三方弹窗的初始化参数
	 */
	JDialog.adaptorConf = function(options) {
		var baseConf = {};

		if (Util.isNotEmptyStr(options.id))
			baseConf.name = options.id

//		baseConf.backdrop = options.backdrop === false
//				? false
//				: (options.backdrop === 'static' ? 'static' : true);
		baseConf.backdrop=false;

		baseConf.keyboard = false;

		baseConf.position = Util.isNotEmptyStr(options.position)
				? options.position
				: 'fit';

		baseConf.show = options.autoShow === false ? false : true;

		return baseConf;
	};

	/**
	 * 弹出框主体id前缀
	 */
	JDialog.dialog_prefix = "jDialog_";

	/**
	 * 相关工具方法
	 */
	var Util = {
		/**
		 * 创建一个默认的grid id，id为空时使用
		 */
		createGlobalGridId : function() {
			return Zgrid.zgridId_prefix + globalZgridId++;
		},

		/**
		 * 判断是否为一个jsonobject
		 * 
		 * @param obj
		 *            判断对象
		 */
		isJSONObject : function(obj) {
			if (obj && typeof obj === 'object' && !(obj instanceof Array))
				return true;
			else
				return false;
		},

		/**
		 * 字符串是否不为空串
		 */
		isNotEmptyStr : function(str) {
			if (typeof str === 'string' && str.length > 0)
				return true;
			else
				return false;
		},
		/**
		 * 完全清除对象本身所有内容
		 */
		deleteEverything : function(obj) {
			for (var key in obj) {
				if (Util.isJSONObject(obj[key]))
					deleteEverything(obj[key]);
				delete obj[key];
			}
			delete obj;
		}
	};

	/**
	 * 全局配置
	 */
	$.jDialogGlobalSetting = function() {
		return {};
	};

	/**
	 * 对外暴露的初始化方法 只获取从jQuery对象筛选到的Element中的第一个
	 * 
	 * @param {JSON}
	 *            options 配置参数
	 */
	$.jDialog = function(options) {
		return new JDialog(options);
	};

	/**
	 * 全局获取dialog
	 */
	$.jDialog.getById=function(id){
		return global_jdialog_map[JDialog.dialog_prefix+id];
	};
})(jQuery)