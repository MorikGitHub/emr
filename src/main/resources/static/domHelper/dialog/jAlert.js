(function($, undefined) {
	var JAlert = function(userOptions) {
		var _this = this;

		var options = null;

		var dialog = null;// 弹出框
		/**
		 * 默认构造函数
		 */
		var _init = function() {
			getOptions(userOptions);

			initJAlert(options);
		};

		/**
		 * 得到完整的配置参数
		 * 
		 * @param {Object}
		 *            options
		 */
		var getOptions = function(userOptions) {
			var defualtConf = JAlert.defaultConf();

			if (Util.isJSONObject(userOptions))
				options = $.extend(true,defualtConf, userOptions);
			else
				options = $.extend({}, defualtConf);

			options.content = createContent(options);

			var onClose=options.callback.onClose;
			options.callback.onClose = function() {
				if (options.callback
						&& typeof onClose === 'function')
					onClose();
				if (!Util.isNullObj(dialog))
					dialog.destroy();
			};
		};

		/**
		 * 内容区创建
		 */
		var createContent = function(options) {
			var $content = null;
			if (typeof userOptions === 'string') {// 简单的使用
				$content = $("<div>" + userOptions + "</div>");
			} else {
				var flag = options.flag === false
						? false
						: (options.flag === true ? true : null);
				var flagMsg = flag === true ? "成功" : (flag === false
						? "失败"
						: "");
				var imgSrc = JAlert.imgSrc[flag ? 'success' : 'error'];
				if (flag === null)// 为空
					imgSrc = null;
				if (Util.isNotEmptyStr(options.img))// 指定img属性
					imgSrc = JAlert.imgSrc[options.img];

				$content = $("<table><tr></tr></table>");
				if (imgSrc)
					$content.find("tr:first")
							.append("<td style='padding-right:10px'><img src='"
									+ imgSrc + "'/></td>");
				if (flag === null) {
					$content.find("tr:first").append("<td>" + options.content
							+ "</td>");
				} else {
					if (options.type) {// 指定了描述语句
						var type = Util
								.isNotEmptyStr(JAlert.type[options.type])
								? JAlert.type[options.type]
								: type;
						if (flag === null)
							type = "";
						var $td = $("<td></td>");
						if (Util.isNotEmptyStr(options.content)) {
							var length = options.content.length;
							var content = "<span style='color:red;'>"
									+ options.content + "</span>";
							if (flag === null)// 为空
								content = options.content;

							var contentStr = "";
							if (length < 10) {
								contentStr = content + type + flagMsg;
							} else
								contentStr = "<p style='text-align:center;'>"
										+ content + "</p>"
										+ "<p style='text-align:center;'>"
										+ type + flagMsg + "</p>";

							$td.append(contentStr);
						} else {
							var contentStr = type + flagMsg;
							$td.append(contentStr);
						}

						$content.find("tr:first").append($td);
					} else {// 默认确认提示
						$content.find("tr:first").append(type + flagMsg);
					}
				}
			}
			return $content[0];
		};

		/**
		 * 初始化相关
		 * 
		 * @param {JSON}
		 *            options 已正确配置的参数
		 */
		var initJAlert = function(options) {
			dialog = $.jDialog(options);
		};

		_init();
	};

	JAlert.defaultConf = function() {
		var baseConf = {
			id : null,// 弹出框id,同一id不会重复弹出
			header: false,//显示title部分
			footer: false,//显示按钮部分
			title : '提示',// 标题文本,'string'显示title栏和对应文本,null/其他,不显示title
			titleIcon : null,// 标题图标class全称
			position : 'fit',// 位置'fit'：正中偏上,'center'：正中,'left'：靠左,right:靠右,bottom:'底',top:'上','left-top':'左上','right-top':又上,'left-bottom'左下,'right-bottom'右下
			backdrop : true,// 背景遮盖层
			width : 'auto',
			content : null,// 内容
			closeKey : '27',// 按键响应关闭
			ok : true,// 默认按钮
			// ok,确认,并获得焦点样式.true:点击时直接关闭,function(){..}执行相关操作并返回true/false
			okVal : '关闭',// 按钮显示名称
			timeout : 1800,// 自动关闭弹窗延时,毫秒
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

	JAlert.imgSrc = {
		error : '/domHelper/demo/img/error.png',
		success : '/domHelper/demo/img/succeed.png',
		question : '/domHelper/demo/img/question.png',
		warning : '/domHelper/demo/img/warning.png',
		loading : '/domHelper/demo/img/loading.gif',
		sad : '/domHelper/demo/img/face-sad.png',
		smile : '/domHelper/demo/img/face-smile.png'
	};

	JAlert.type = {
		add : '新增',
		edit : '编辑',
		del : '删除',
		save : '保存'
	};

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
		 * 是否是空对象
		 */
		isNullObj : function(obj) {
			if (typeof obj !== 'object')
				return false;
			for (var i in obj) {
				return false;
			}
			return true;
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

	$.jAlert = function(options) {
		new JAlert(options);
	}
})(jQuery)