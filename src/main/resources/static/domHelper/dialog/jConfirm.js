(function($, undefined) {
	var JConfirm = function(userOptions) {
		var _this = this;

		var options = null;

		var dialog = null;// 弹出框
		/**
		 * 默认构造函数
		 */
		var _init = function() {
			getOptions(userOptions);

			initJConfirm(options);
		};

		/**
		 * 得到完整的配置参数
		 * 
		 * @param {Object}
		 *            options
		 */
		var getOptions = function(userOptions) {
			var defualtConf = JConfirm.defaultConf();
			options = $.extend(true,defualtConf, userOptions);

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
			var imgSrc = JConfirm.imgSrc['question'];
			var $content = $("<table><tr><td style='padding-right:10px'><img src='"
					+ imgSrc + "'/></td></tr></table>");

			if (options.type) {// 指定了描述语句
				var type = Util.isNotEmptyStr(JConfirm.type[options.type])
						? JConfirm.type[options.type]
						: type;
				var $td = $("<td></td>");
				if (Util.isNotEmptyStr(options.content)) {
					var length = options.content.length;
					var content = "<span style='color:red;'>" + options.content
							+ "</span>";
					var contentStr = "";
					if (length < 10)
						contentStr = "确认" + type + "&nbsp;" + content
								+ "&nbsp;吗？";
					else
						contentStr = "<p style='text-align:center;'>确认" + type
								+ "</p>" + "<p style='text-align:center;'>"
								+ content + "&nbsp;吗？</p>";

					$td.append(contentStr);
				} else {
					var contentStr = "确认" + type + "吗？";
					$td.append(contentStr);
				}

				$content.find("tr:first").append($td);
			} else {// 默认确认提示
				if (Util.isNotEmptyStr(options.content)) {
					$content
						.find("tr:first")
						.append("<td>"+options.content+"</td>");
				} else {
					$content
						.find("tr:first")
						.append("<td><span style='color:red;'>确认执行该操作？</span></td>");
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
		var initJConfirm = function(options) {
			dialog = $.jDialog(options);
		};

		_init();
	};

	JConfirm.defaultConf = function() {
		var baseConf = {
			id : null,// 弹出框id,同一id不会重复弹出
			title : '提示',// 标题文本,'string'显示title栏和对应文本,null/其他,不显示title
			titleIcon : null,// 标题图标class全称
			position : 'fit',// 位置'fit'：正中偏上,'center'：正中,'left'：靠左,right:靠右,bottom:'底',top:'上','left-top':'左上','right-top':又上,'left-bottom'左下,'right-bottom'右下
			backdrop : 'static',// 背景遮盖层
			width : 'auto',
			content : null,// 内容
			closeKey : '27',// 按键响应关闭
			ok : true,// 默认按钮
			// ok,确认,并获得焦点样式.true:点击时直接关闭,function(){..}执行相关操作并返回true/false
			okVal : '确认',// 按钮显示名称
			timeout : null,// 自动关闭弹窗延时,毫秒
			cancel : true,// 默认按钮
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

	JConfirm.imgSrc = {
		error : '/domHelper/demo/img/error.png',
		success : '/domHelper/demo/img/succeed.png',
		question : '/domHelper/demo/img/question.png',
		warning : '/domHelper/demo/img/warning.png',
		loading : '/domHelper/demo/img/loading.gif',
		sad : '/domHelper/demo/img/face-sad.png',
		smile : '/domHelper/demo/img/face-smile.png'
	};

	JConfirm.type = {
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

	$.jConfirm = function(options) {
		new JConfirm(options);
	}
})(jQuery)