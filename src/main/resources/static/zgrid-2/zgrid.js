/**
 * 表格控件
 */
(function($, undefined) {
	var globalZgridId = 0; // 全局grid id索引,需要认为指定id时使用

	/**
	 * 实体对象类
	 * 
	 * @param {Element}
	 *            domEl html元素
	 * @param {JSON}
	 *            options 配置参数
	 */
	var Zgrid = function(domEl, userOptions) {
		var _this = this;
		var id = domEl.id;
		if (!id)
			id = Util.createGlobalGridId();

		var options = null; // 配置参数
		 var isDemo=true;//表示数据不是通过后台返回的json，直接请求的前台某数据格式

		var $zgrid = null; // 控件整体jquery
		var $wait = null;// 加载等待对象
		var $dataTable = null; // 数据表格jquery对象
		var $pager = null; // 分页栏对象

		var pageInfo = null;// 分页相关对象
		var resultData = null; // 请求返回的结果,数据部分
		var resultData_datatable = null; // 经过前台处理后的结果（用于datatable展示的rows）

		/**
		 * 默认构造函数
		 */
		var _init = function() {
			getOptions(userOptions);

			initGrid(options);
		};

		/**
		 * 得到完整的配置参数
		 * 
		 * @param {Object}
		 *            options
		 */
		var getOptions = function(userOptions) {
			options = Zgrid.defualtConf();
			if (Util.isJSONObject(userOptions))
				$.extend(true, options, userOptions); // 先取得默认的参数

			pageInfo = {};
			pageInfo.pageNo = options.pageNo;
			pageInfo.pageSize = options.pageSize;

			// 添加行号列
			options.cols.unshift($.extend({}, options.oneColConf, {
				name : Zgrid.rownumName, // 字段名
				text : '序号', // 字段展示名
				width : options.rowNumberWidth,// 宽度
				type : 'number',// 数据类型 string/number/date
				ignore : true,// 是否不加载此列
				sort : false
					// 允许此列排序
				}));

			for (var i = 0; i < options.cols.length; i++) {
				options.cols[i] = $.extend({}, options.oneColConf,
						options.cols[i]);
				var cssClass = options.linefeed === true
						? "linefeed-on"
						: "linefeed-off";
				var textAlign = options.textAlign
				if (textAlign === 'left')
					cssClass += ' text-left';
				else if (textAlign === 'center')
					cssClass += ' text-center';
				else if (textAlign === 'right')
					cssClass += ' text-right';
				if (!options.cols[i].cssClass)
					options.cols[i].cssClass = "";
				options.cols[i].cssClass = cssClass + " "
						+ options.cols[i].cssClass;
			}
			
			if(options.backSort)
				options.sortable=false;
			return options;
		};

		/**
		 * 表格初始化相关
		 * 
		 * @param {JSON}
		 *            options 已正确配置的参数
		 */
		var initGrid = function(options) {
			if ($("#" + Zgrid.zgridId_prefix + id).length > 0) {
				alert("当前表格已经生成，请销毁原有表格对象后再重新生成");
				return;
			}

			$zgrid = $("<div id='" + Zgrid.zgridId_prefix + id
					+ "' class='zgrid' style='width:" + options.width
					+ ";'></div>");

			if (options.needBorder === true) {
				$zgrid.addClass("zgrid-border");
			}
			if (Util.isNotEmptyStr(options.theam)) {
				$zgrid.addClass(options.theam);
			}

			// ↓↓↓ add by liangxj 2015-07-08 根据新需求调整工具栏样式 start

			if (options.caption || options.captionHtml
					|| (options.toolbar && options.toolbar instanceof Array)
					|| options.searchBox) {
				// 创建头部
				var $gridHeader = createGridHeader();

				// 创建caption
				$gridHeader.append(createCaption(options.caption,
						options.captionIcon, options.captionHtml));

				// 生成工具栏 容器
				var $topToolbar = createToolbarBox();

				// 创建工具按钮
				if (options.toolbar && options.toolbar instanceof Array) {
					$topToolbar.append(createTopToolBar($topToolbar,
							options.toolbar));
				}

				// 创建搜索按钮，和搜索栏目
				if (options.searchBox) {
					$topToolbar.prepend(createSearchBtn(options.searchBox));

					// 创建搜索框
					$zgrid.append(createSearchBox(options.searchBox));
				}

				$gridHeader.append($topToolbar);
				$zgrid.prepend($gridHeader); // 添加表头
			}

			// ↑↑↑ add by liangxj 2015-07-08 根据新需求调整工具栏样式 end

			$zgrid.append(createWait());// 创建等待效果

			/*
			 * 注释 by liangxj 2015-07-08 根据新需求调整工具栏样式 if (options.caption) //
			 * 配置了标题 $zgrid.append(createTitle(options.caption)); if
			 * (options.toolbar && options.toolbar instanceof Array) { // 工具栏
			 * $zgrid.append(createToolbar(options.toolbar)); }
			 */

			var requestParam = $.extend({}, options.requestParam);
			requestParam['pageNo'] = pageInfo.pageNo;
			requestParam['pageSize'] = pageInfo.pageSize;

			ajaxData(requestParam, function() {// 请求数据并生成相关表格
						$zgrid.append(createTable(options));// 生成表格
						if (options.pageable)
							$zgrid.append(createPager(pageInfo));// 分页

						if (Util.isJSONObject(options.backSort)) {// 是否支持后台排序
							var $sortHead=$dataTable.find(".datatable-head .table th:not(.check-all)");
							$sortHead.each(
									function(i) {
										var oneColConf;
										if (options.rowNumber)
											oneColConf = options.cols[i];
										else
											oneColConf = options.cols[i + 1];
										$(this).attr("colName",oneColConf.name);
										var sortConf=options.backSort[oneColConf.name];
										if(Util.isJSONObject(sortConf)){
											if(!sortConf.cur)
												sortConf.cur=0;
											$(this).unbind("click");
											$(this).addClass("backsort").addClass("backsort-icon-"+sortConf.cur).removeClass("sort-disabled");
										}
									});
						}
						
						createTable.bingTableEvent();
						if (typeof options.callback.onGenerateComplete === 'function') {
							options.callback.onGenerateComplete(_this);
						}
					});

			$(domEl).after($zgrid);
			$(domEl).hide();
		};

		// ↓↓↓ add by liangxj 2015-07-08 根据新需求调整工具栏样式 start
		/**
		 * 创建列表头容器
		 * 
		 * @return element ， 表头容器对象
		 */
		var createGridHeader = function() {
			var $gridHeader = $('<div  id="' + id + Zgrid.header_suffix
					+ '" class="zgrid-header clearfix zgrid-header-ly"></div>');
			return $gridHeader;
		}

		/**
		 * 创建 caption
		 * 
		 * @return element
		 */
		var createCaption = function(title, icon, html) {
			var $captionHtml = $('<div class="zgrid-caption pull-left"></div>');

			if (html) { // 配置了 captionHtml 后直接采用 captionHtml
				$captionHtml.append(html);
			} else {
				// 处理图标
				if (icon)
					$captionHtml.append('<i class="icon ' + icon + '"></i> ');
				if (title)
					$captionHtml.append(title);
			}
			return $captionHtml;
		}

		/**
		 * 创建工具栏 容器
		 * 
		 * @return Element element元素
		 */
		var createToolbarBox = function() {
			var $toolbarBox = $('<div class="pull-right"></div>');
			return $toolbarBox;
		}

		/**
		 * 创建顶部工具栏
		 * 
		 * @param {Array}
		 *            toolbar 工具栏配置
		 */
		var createTopToolBar = function($toolbarBox, toolbar) {

			var btnTitle = "按钮";
			var btnIndex = 0;

			// 更多按钮 下拉菜单
			var moreId = id + Zgrid.moreBtn_suffix;
			var $dropdownMenu = $('<ul class="dropdown-menu dropdown-menu-wt" role="menu" aria-labelledby="'
					+ moreId + '"></ul>');

			for (var i = 0; i < toolbar.length; i++) {
				var item = toolbar[i];
				if (!Util.isJSONObject(item))
					continue;

				var key = item.key ? item.key : "";
				var text = item.text ? item.text : (btnTitle + btnIndex++);
				var title = item.title ? item.title : text;
				var disabled = item.disabled === true ? true : false;
				var func = typeof item.callback === 'function'
						? item.callback
						: function() {
							return false;
						};

				var $btn = $("<button class='btn btn-link' type='button'></button>");
				$btn.attr("id", id + "_" + key + Zgrid.toolbarBtnId_suffix);
				$btn.html(text);
				$btn.attr("title", title);
				$btn[0].disabled = disabled;
				// 事件绑定
				$btn.on("click", func);

				if (i < 5) {
					$toolbarBox.append($btn);
				} else {
					var $li = $('<li></li>');
					$btn.addClass('btn-block');
					$btn.addClass("btn-link-ly");
					$btn.css({
								'text-align' : 'left',
								'padding-left' : '10px'
							});
					$li.append($btn);
					$dropdownMenu.append($li);
				}
			}

			// 拼接更多按钮
			if (toolbar.length > 5) {
				var $moreBtnBox = $('<div class="btn-group"></div>');
				var $moreBtn = $('<button class="btn btn-link dropdown-toggle" id="'
						+ moreId
						+ '" type="button" data-toggle="dropdown"><i class="icon-chevron-down"></i> 更多 </button>');
				$moreBtnBox.append($moreBtn);
				$moreBtnBox.append($dropdownMenu);
				$toolbarBox.append($moreBtnBox);
			}
		}

		/**
		 * 创建搜索按钮
		 * 
		 * @return Element element元素
		 */
		var createSearchBtn = function(dom) {
			var $div = $('<div class="pull-left"></div>');
			var $searchBtn = $('<button type="button" class="btn-zgrid-zym btn-link-zgrid-zym"><i class="icon-search"></i> 搜索</button>');
			$searchBtn.click(function(evt) {
						var $target = $(evt.target);
						var $btn;
						if ($target[0].nodeName == 'BUTTON')
							$btn = $target;
						if ($target[0].nodeName == 'I')
							$btn = $target.parent();
						$parent = $btn.parent();

						// 显示搜索栏项目
						var $searchbox = $('#' + id + Zgrid.searchbox_suffix);

						// 将搜索框对象保存到本地
						if (!$('body').data('searbox_' + dom)) {
							$('body').data('searbox_' + dom, $(dom));
							// 从页面上干掉
							$(dom).remove();
						}

						if ($searchbox.css('display') == 'none') {
							var $dom = $('body').data('searbox_' + dom);
							$searchbox.append($dom.show());
						} else {
							$searchbox.children().remove();
						}
						$searchbox.toggle();
					});
			$div.append($searchBtn);
			return $div;
		};
		/**
		 * 创建搜索栏
		 * 
		 * @return Element element元素
		 */
		var createSearchBox = function(dom) {
			var $searchBox = $('<div class="hide searchbox" id="' + id
					+ Zgrid.searchbox_suffix + '"></div>');
			return $searchBox;
		};

		// ↑↑↑ add by liangxj 2015-07-08 根据新需求调整工具栏样式 end

		/**
		 * 创建表标题
		 * 
		 * @param {String}
		 *            title 表格标题
		 * @return Element element元素
		 */
		var createTitle = function(title) {
			var $title = $("<div id='" + id + Zgrid.header_suffix
					+ "' class='zgrid-heading'>" + title + "</div>");

			return $title;
		};

		/**
		 * 创建工具栏
		 * 
		 * @param {Array}
		 *            toolbar 工具栏配置
		 * @return Element element元素
		 */
		var createToolbar = function(toolbar) {
			var btnTitle = "按钮";
			var btnIndex = 0;

			var $toolbar = $("<div id='" + id + Zgrid.toolbarId_suffix
					+ "' class='zgrid-toolbar btn-group'></div>")
			$.each(toolbar, function(i, item) {
						if (!Util.isJSONObject(item))
							return;

						var $btn = $("<button class='btn'></button>");

						var key = item.key ? item.key : "";
						$btn.attr("id", id + "_" + key
										+ Zgrid.toolbarBtnId_suffix);

						var text = item.text
								? item.text
								: (btnTitle + btnIndex++);
						$btn.html(text);

						var title = item.title ? item.title : text;
						$btn.attr("title", title);

						var disabled = item.disabled === true ? true : false;
						$btn[0].disabled = disabled;
						var func = typeof item.callback === 'function'
								? item.callback
								: function() {
									return false;
								};

						// 事件绑定
						$btn.on("click", func);

						$toolbar.append($btn);
					});

			return $toolbar;
		};

		/**
		 * 创建表格内容部分
		 * 
		 * @param {JSON}
		 *            options
		 */
		var createTable = function(options) {
			var $outerDiv = $("<div class='zgrid-table zgrid-table-wt' style=min-height:"
					+ options.min_height + ";></div>");
			$dataTable = $("<div id='" + id + Zgrid.dataTable_suffix
					+ "'></div>");
			$outerDiv.append($dataTable);

			options.data = {};
			options.data.rows = resultData_datatable;
			options.data.cols = options.cols;

			$dataTable.datatable(options);
			return $outerDiv;
		};

		/**
		 * table相关事件
		 */
		createTable.bingTableEvent = function() {
			/**
			 * datatable事件存在缺陷，手动绑定
			 */
			$dataTable.find(".datatable-head table .check-all").on(
					'click.zgrid.checkall', function(event) {
						if (typeof options.callback.onCheckAll === 'function') {
							var $this = $(this);
							setTimeout(function() {
								if ($this.hasClass("checked")) {// 全选
									var resultData_datatableData = [];
									for (var i = 0; i < resultData_datatable.length; i++) {
										resultData_datatableData
												.push(resultData_datatable[i].data);
									}
									options.callback.onCheckAll(resultData,
											resultData_datatableData, true);
								} else {
									options.callback.onCheckAll(null, null,
											false);
								}
							}, 10);
						}

					});
			$dataTable.find(".datatable-rows table tr[data-index]").on(
					'click.zgrid.row', function(event,isChecked,isEventTrigger) {
						var _this = this;
						var dataIndex = $(this).attr("data-index");// 获取选中行属性
						var eventTrigger=true;
						var checked;
						if(isChecked!==undefined)
							checked=isChecked;
						if(isEventTrigger!==undefined)
							eventTrigger=isEventTrigger;
						if (options.checkable) {// 多选模式
							// if (checked === true) {// 需要选中
							// resultData_datatable[dataIndex].checked = true;
							// } else if (checked === false) {// 需要不选中
							// resultData_datatable[dataIndex].checked = false;
							// } else {
							// // 不做任何后续处理
							// }
						} else {// datatable对非checkable状态JS代码支持有限，人为绑定事件
							$dataTable
									.find(".datatable-rows table tr[data-index]")
									.removeClass("active");
							$.each(resultData_datatable, function() {
										this.checked = false;
									});
							
							if(checked!==false){
								$dataTable
										.find(".datatable-rows table tr[data-index='"
												+ dataIndex + "']")
										.addClass("active");
								resultData_datatable[dataIndex].checked = true;
							}
						}
						
						if (typeof options.callback.onClickRow === 'function'&&eventTrigger) {
							setTimeout(function() {
								options.callback
										.onClickRow(
												resultData[dataIndex],
												resultData_datatable[dataIndex].data,
												$(_this).index(),
												resultData_datatable[dataIndex].checked,
												event);
							}, 10);
						}
					});

			$dataTable.find(".datatable-rows table tr[data-index]").on(
					'dblclick.zgrid.row', function(event) {
						if (typeof options.callback.onDblclickRow === 'function') {
							// setTimeout(function(){
							var dataIndex = $(this).attr("data-index");// 获取选中行属性
							options.callback.onDblclickRow(
									resultData[dataIndex],
									resultData_datatable[dataIndex].data,
									$(this).index(),
									resultData_datatable[dataIndex].checked,
									event);
							// },10);
						}
					});

			var lastRowIndex = null;// 上次触发事件的tr,避免重复触发
			/**
			 * 该方式只能判断表格鼠标在zgrid内移动的情况 取消了tr的鼠标移出是事件判断，直接在切换行之后判断
			 * 这么做的原因是zgrid是多表格混合表格，视图表现的结构和实际的dom元素结构不一样
			 */
			$dataTable.find(".datatable-rows table tr[data-index]").on(
					'mouseenter.zgrid.row', function(event) {
						var tr = this;
						var dataIndex = $(tr).attr("data-index");// 获取选中行属性
						if (dataIndex === lastRowIndex)// 视图表现为同一行
							return;
						else {
							if (lastRowIndex
									&& typeof options.callback.onRowOut === 'function') {
								// $(".zgrid-heading").html($(".zgrid-heading").html()+lastRowIndex+'b');
								options.callback.onRowOut();
							}
							lastRowIndex = dataIndex;
							if (typeof options.callback.onRowOver === 'function') {
								var trPoint = $dataTable
										.find(".datatable-rows table tr[data-index='"
												+ dataIndex + "']:first");
								var top = trPoint.offset().top;
								var left = trPoint.offset().left;
								// $(".zgrid-heading").html($(".zgrid-heading").html()+dataIndex+'a');
								// var width=trPoint.width();
								// var height=trPoint.height();
								options.callback.onRowOver(
										resultData[dataIndex],
										resultData_datatable[dataIndex].data,
										$(this).index(), top, left
										// height,
										// width
										);
							}
						}
					});

			/**
			 * 该方式只能判断表格鼠标移除zgrid的情况 这么做的原因是zgrid是多表格混合表格，视图表现的结构和实际的dom元素结构不一样
			 */
			$dataTable.find(".datatable-rows").on('mouseleave.zgrid.row',
					function(event) {// 补充对tr行外判断不足的情况
						if (lastRowIndex
								&& typeof options.callback.onRowOut === 'function') {
							// $(".zgrid-heading").html($(".zgrid-heading").html()+lastRowIndex+'b');
							options.callback.onRowOut();
						}
						lastRowIndex = null;
					});

			/**
			 * 后台排序生成
			 */
			$dataTable.find(".datatable-head .backsort").on("click.zgrid.head",
					function(event) {
						var colName=$(this).attr("colName");
						var sortConf = options.backSort[colName];
						if(Util.isJSONObject(sortConf)){
							sortConf.cur = (sortConf.cur + 1) % 3;
							var param;
							if(typeof sortConf[sortConf.cur]==='function')
								param=sortConf[sortConf.cur](colName);
							if(Util.isJSONObject(param))
								_this.reload(param, 1, null, sortConf.url);
						}
					});
		};

		/**
		 * 创建分页栏 默认分页栏里面组织12个跳转按钮
		 * 
		 * @param {pager}
		 *            数据结果对象
		 */
		var createPager = function(pager) {
			if ($pager) {// 已经生成过,则先删除再生成
				$pager.parent().parent().remove();
			}
			var $outerDiv = $("<div class='zgrid-pager clearfix'></div>");

			var $pagerRightDiv = $("<div class='pull-right'></div>");
			$outerDiv.append($pagerRightDiv);

			$pager = $("<ul id='" + id + Zgrid.pagerId_suffix
					+ "' class='pager pager-loose'></ul>");
			$pager
					.append('<li class="previous" useType="prev"><a href="javascript:void(0);">« 上一页</a></li>');
			
			var pageNavNum=parseInt(options.pageNavNum);
			if (pager.pageCounts === 0) {
				var $pageLi = $('<li useType="normal"><a href="javascript:void(0);">1</a></li>');
				$pager.append($pageLi);
			} else if (pager.pageCounts <= pageNavNum) { // 小于x页全显示
				for (var i = 0; i < pager.pageCounts; i++) {
					var $pageLi = $('<li useType="normal"><a href="javascript:void(0);">'
							+ (parseInt(i) + 1) + '</a></li>');
					if (pager.pageNo === (i + 1)) {
						$pageLi.addClass("active");
					}
					$pager.append($pageLi);
				}
			} else if (pager.pageCounts <= (pageNavNum-2)*2) { // x页分区重点显示
				var left = pageNavNum-2;
				if (pager.pageNo <= left) // 当前页在左半段
				{
					for (var i = 0; i < left; i++) { // 左边重点显示
						var $pageLi = $('<li useType="normal"><a href="javascript:void(0);">'
								+ (parseInt(i) + 1) + '</a></li>');
						if (pager.pageNo === (i + 1)) {
							$pageLi.addClass("active");
						}
						$pager.append($pageLi);
					}

					// 中间做任意跳转
					createPager.createJumpToLi($pager);

					// 右边显示一个
					$pager
							.append('<li useType="normal"><a href="javascript:void(0);">'
									+ pager.pageCounts + '</a></li>');
				} else if (pager.pageNo > left) // 当前页在右半段
				{
					// 左边显示一个
					$pager
							.append('<li useType="normal"><a href="javascript:void(0);">'
									+ 1 + '</a></li>');

					// 中间做任意跳转
					createPager.createJumpToLi($pager);

					for (var i = left; i < pager.pageCounts; i++) { // 右边重点显示
						var $pageLi = $('<li useType="normal"><a href="javascript:void(0);">'
								+ (parseInt(i) + 1) + '</a></li>');
						if (pager.pageNo === (i + 1)) {
							$pageLi.addClass("active");
						}
						$pager.append($pageLi);
					}
				}
			} else { // 页数特别多时
				var left = pageNavNum-3;
				$pager
						.append('<li useType="first"><a href="javascript:void(0);">首页</a></li>');
				if (pager.pageNo <= left) { // 前面N页
					for (var i = 0; i < left; i++) { // 左边重点显示
						var $pageLi = $('<li useType="normal"><a href="javascript:void(0);">'
								+ (parseInt(i) + 1) + '</a></li>');
						if (pager.pageNo === (i + 1)) {
							$pageLi.addClass("active");
						}
						$pager.append($pageLi);
					}

					// 任意跳转
					createPager.createJumpToLi($pager);
				} else if (pager.pageCounts - pager.pageNo < left) { // 最后N页
					// 任意跳转
					createPager.createJumpToLi($pager);

					for (var i = pager.pageCounts - left; i < pager.pageCounts; i++) { // 右边重点显示
						var $pageLi = $('<li useType="normal"><a href="javascript:void(0);">'
								+ (parseInt(i) + 1) + '</a></li>');
						if (pager.pageNo === (i + 1)) {
							$pageLi.addClass("active");
						}
						$pager.append($pageLi);
					}
				} else { // 中间某页
					var middle = left;
					for (var i = pager.pageNo; i < pager.pageNo
							+ middle; i++) { // 左边重点显示
						var $pageLi = $('<li useType="normal"><a href="javascript:void(0);">'
								+ (parseInt(i)) + '</a></li>');
						if (pager.pageNo === i) {
							$pageLi.addClass("active");
						}
						$pager.append($pageLi);
					}

					// 任意跳转
					createPager.createJumpToLi($pager);
				}

				$pager
						.append('<li useType="last"><a href="javascript:void(0);">末页</a></li>');
			}
			$pager
					.append('<li useType="next" class="next"><a href="javascript:void(0);">下一页 »</a></li>');

			$pagerRightDiv.append($pager);

			createPager.bindPagerEvent($pager, pager);

			var $pagerLeftDiv = $("<div class='pull-right'></div>");
			$pagerLeftDiv.html("<ul class='pager pagedes'><li><a>每页"
					+ pager.pageSize + "条，共" + pager.pageCounts + "页，合计"
					+ pager.total + "条</a></li></ul>");
			$outerDiv.append($pagerLeftDiv);

			return $outerDiv;

		};

		/**
		 * 分页控件事件绑定
		 * 
		 * @param {$pager}
		 *            pager element jquery对象
		 * @param {pager}
		 *            数据结果对象
		 */
		createPager.bindPagerEvent = function($pager, pager) {
			$pager.find("li[useType='normal']").click(function() {
						var pageNo = parseInt($(this).find('a').html());
						_this.setPageNo(pageNo);

						_this.reload();
					});

			$pager.find("li[useType='jump']:first").click(function() {
						$(this).hide();
						$(this).next().show();
					});

			$pager.find("li[useType='jump']:last input:first").keyup(
					function(e) {
						this.value = this.value.replace(/[^0-9]*/g, '');
					});
			$pager.find("li[useType='jump']:last input:first").blur(
					function(e) {
						this.value = this.value.replace(/[^0-9]*/g, '');
					});
			$pager.find("li[useType='jump']:last").blur(function() {
						$(this).hide();
						$(this).prev().show();
					});
			$pager.find("li[useType='jump']:last input:last").click(function() {
						var pageNo = parseInt($(this).prev().val());
						if (!pageNo || !pageNo > 0)
							return;
						pageNo = pager.pageCounts < pageNo
								? pager.pageCounts
								: pageNo;
						_this.setPageNo(pageNo);

						_this.reload();
					});

			$pager.find("li[useType='prev']").click(function() {
						if (pager.pageNo > 1) {
							_this.setPageNo(pager.pageNo - 1);

							_this.reload();
						}

					});

			$pager.find("li[useType='next']").click(function() {
						if (pager.pageNo < pager.pageCounts) {
							_this.setPageNo(pager.pageNo + 1);

							_this.reload();
						}

					});

			$pager.find("li[useType='first']").click(function() {
						_this.setPageNo(1);

						_this.reload();
					});

			$pager.find("li[useType='last']").click(function() {
						_this.setPageNo(pager.pageCounts);

						_this.reload();
					});
		};

		/**
		 * 创建一个跳转任意页的element jquery对象
		 */
		createPager.createJumpToLi = function($pager) {
			// 任意跳转
			var $pageJump = $('<li useType="jump"></li>');
			$pageJump.append('<a href="javascript:void(0);">...</a>');
			$pager.append($pageJump);

			var $pageJumpTo = $('<li useType="jump" style="display:none;"></li>');
			$pageJumpTo
					.append('<span style="padding-top:1px;padding-bottom:1px;padding-left:5px;padding-right:5px;background-color:#eeeeee;"><input class="form-control" style="width:4em;display:inline;" type="text"/><input style="margin-left:5px;" type="button" value="跳转到"/></span>');
			$pager.append($pageJumpTo);
		};

		/**
		 * 重置当前分页激活状态
		 */
		createPager.resetActivePage = function($pager) {
			$pager.find("li[useType='normal']").each(function() {
						$(this).removeClass("active");
						var pageNo = parseInt($(this).html());
						if (pageNo === pageInfo.pageNo) {
							$(this).addClass("active");
						}
					});
		};

		var createWait = function($zgrid) {
			var height = parseInt(options.min_height.replace('px', ''));
			$wait = $("<div id='" + id + Zgrid.waiting_suffix
					+ "' class='backdrop-wait' style='display:none;'></div>");
			$wait.append("<div class='wait1'></div>");
			$wait.find(".wait1").css({
						'margin-top' : (height - $wait.height()) / 2
					});
			return $wait;

		};

		var showWait = function() {
			// var $loadingDiv=$wait.find(">div");
			// var top=($wait.height()-$loadingDiv.height())/2;
			// if(top>0)
			// $loadingDiv.css("margin-top",top);
			$wait.show();
		};

		var hideWait = function() {
			$wait.hide();
		};

		/**
		 * 请求数据
		 */
		var ajaxData = function(params, callback) {
			var dataType = "json";
			var ajaxType ="post";
			 if(isDemo){
//			 	dataType="text";
			 	ajaxType="get";
			 }
			 

			showWait();
			$.ajax({
						url : options.url,
						type : ajaxType,
						dataType : dataType,
						cache : false,
						data : params,
						async : options.async
					}).done(function(data, status, xhr) {// 数据的初步处理
						// 数据加载完成事件
						if (typeof options.callback.onloadComplete === 'function') {
							var temp=options.callback.onloadComplete(data);
							if(Util.isJSONObject(temp))
								data=$.extend({},temp);
						}
						resultData = data.rows;
						resultData_datatable = Util.convertData(resultData,
								options.cols, options);
						pageInfo.total = data.total;
						pageInfo.pageCounts = Math.ceil(pageInfo.total
								/ pageInfo.pageSize);
					}).done(function(data, status, xhr) {// 事件产生
						hideWait($zgrid);// 取消等待效果

						callback();// 回调函数

						// 样式效果特别处理
						if ($zgrid.hasClass("zgrid-border")) {
							if (data.total == 0)
								$zgrid.find(".zgrid-table")
										.addClass("table-border-bottom");
							else {
								$zgrid.find(".zgrid-table")
										.removeClass("table-border-bottom");
							}
						}
						// title属性添加
						if (options.needTitle === true) {
							$dataTable.find(".datatable-rows table td").each(
									function() {
										$(this).attr("title",
												$(this)[0].innerText);
									});
						}
						// 渲染结束事件
						if (typeof options.callback.onTableReady === 'function') {
							options.callback.onTableReady();
						}
					}).fail(function() {
						alert("表格加载出错！");
					});
		};

		/**
		 * 重计算表格内容高度，解决 zui datatable 在ie8下面高度出错的BUG
		 */
		var resetCellHeight = function() {
			$dataTable.find("table td,table th").css({
						"height" : "auto",
						"min-height" : "auto"
					});
		};

		/**
		 * 清除控件
		 */
		this.destroy = function() {
			$zgrid.remove();
			Util.deleteEverything(_this);
		};

		/**
		 * 获取toolbar btn jquery对象
		 * 
		 * @param {String}
		 *            key
		 */
		this.getBtn = function(key) {
			return $("#" + id + "_" + key + Zgrid.toolbarBtnId_suffix);
		};

		/**
		 * 设置btn激活状态 不传值反向设置激活状态
		 */
		this.toggleBtn = function(key, bool) {
			if (bool === undefined) {
				var element = $("#" + id + "_" + key
						+ Zgrid.toolbarBtnId_suffix)[0];
				if (element)
					element.disabled = !element.disabled;
			} else {
				var stat = (bool === false ? true : false);
				$("#" + id + "_" + key + Zgrid.toolbarBtnId_suffix)[0].disabled = stat;
			}

		};

		/**
		 * 切换所有按钮激活状态 不传值反向设置
		 */
		this.toggleBtnAll = function(bool) {
			if (bool === undefined) {
				$zgrid.find("[id$='" + Zgrid.toolbarBtnId_suffix + "']").each(
						function() {
							var element = this;
							element.disabled = !element.disabled;
						});
			} else {
				var stat = (bool === false ? true : false);
				$zgrid.find("[id$='" + Zgrid.toolbarBtnId_suffix + "']").each(
						function() {
							var element = this;
							element.disabled = stat;
						});
			}
		}

		/**
		 * 获取查询到的结果
		 * 
		 * @param {Boolean}
		 *            changeable 是否允许修改
		 */
		this.getSearchedData = function(changeable) {
			if (changeable === true)
				return resultData;
			else
				return $.extend({}, resultData);
		};

		/**
		 * 获取用于表格展示的结果
		 * 
		 * @param {Boolean}
		 *            changeable 是否允许修改
		 */
		this.getSearchedShowingData = function(changeable) {
			if (changeable === true)
				return resultData_datatable;
			else
				return $.extend({}, resultData_datatable);
		};

		/**
		 * 获取当前用于查询的request参数 只读
		 */
		this.getRequestParam = function() {
			return $.extend({}, options.requestParam);
		};

		/**
		 * 设置当前用于查询的request参数
		 */
		this.setRequestParam = function(newParam) {
			options.requestParam = newParam;
		};

		/**
		 * 设置当前页数
		 */
		this.setPageNo = function(pageNo) {
			pageInfo.pageNo = pageNo;
		};

		/**
		 * 设置分页大小
		 */
		this.setPageSize = function(pageSize) {
			pageInfo.pageSize = pageSize;
		};

		/**
		 * 设置url
		 */
		this.setUrl = function(url) {
			options.url = url;
		}

		/**
		 * 取得当前页数
		 */
		this.getPageNo = function() {
			return pageInfo.pageNo;
		};
		/**
		 * 重新加载数据
		 */
		this.reload = function(newParam, pageNo, pageSize, url) {
			if (Util.isJSONObject(newParam))
				_this.setRequestParam(newParam);
			if (options.pageable === true && pageNo)
				_this.setPageNo(pageNo);
			if (options.pageable === true && pageSize)
				_this.setPageSize(pageSize);
			if (url)
				_this.setUrl(url);

			var requestParam = $.extend({}, options.requestParam);
			requestParam['pageNo'] = pageInfo.pageNo;
			requestParam['pageSize'] = pageInfo.pageSize;
			ajaxData(requestParam, function() {
						options.data.rows = resultData_datatable;
						$dataTable.datatable('load');
						if (Util.isJSONObject(options.backSort)) {// 是否支持后台排序
							var $sortHead=$dataTable.find(".datatable-head .table th:not(.check-all)");
							$sortHead.each(
									function(i) {
										var oneColConf;
										if (options.rowNumber)
											oneColConf = options.cols[i];
										else
											oneColConf = options.cols[i + 1];
										$(this).attr("colName",oneColConf.name);
										var sortConf=options.backSort[oneColConf.name];
										if(Util.isJSONObject(sortConf)){
											if(!sortConf.cur)
												sortConf.cur=0;
											$(this).unbind("click");
											$(this).addClass("backsort").addClass("backsort-icon-"+sortConf.cur).removeClass("sort-disabled");
										}
									});
						}
						resetCellHeight();
						if (options.pageable)
							$zgrid.append(createPager(pageInfo));// 分页
						createTable.bingTableEvent();
					});
		};

		/**
		 * 获取指定行数据 只读
		 * 
		 * @param {Boolean}
		 *            原始数据true(默认)/表格展示数据false
		 * @param {Number}
		 *            行号，视图中显示的行号
		 */
		this.getRow = function(dataType, rowIndex) {
			var rowData = null;
			if (dataType !== false)
				rowData = $.extend({}, resultData[rowIndex]);
			else {
				var data = $.extend({}, resultData_datatable[rowIndex]);
				rowData = data.data;
			}
			if (rowData != null)// 不返回则是 undefined
				return rowData;
		};
		
		/**
		 * 获取当前页行数
		 */
		this.getRowSize=function(){
			if(!resultData)
				return 0;
			return resultData.length;
		}

		/**
		 * 获取被选中行 只读
		 * 
		 * @param {Boolean}
		 *            原始数据true(默认)/表格展示数据false
		 * @param {Number}
		 *            行号，视图中显示的行号
		 */
		this.getSelectedRows = function(dataType) {
			var dataList = [];
			if(resultData_datatable==null) return false;
			for (var i = 0; i < resultData_datatable.length; i++) {
				if (resultData_datatable[i].checked) {
					if (dataType !== false)
						dataList.push($.extend({}, resultData[i]));
					else {
						var data = $.extend({}, resultData_datatable[i]);
						dataList.push(data.data);
					}
				}
			}
			if (dataList.length > 0)// 不返回则是 undefined
				return dataList;
		};

		/**
		 * 获取被选中行索引
		 */
		this.getSelectedIndexs = function() {
			var dataList = [];
			for (var i = 0; i < resultData_datatable.length; i++) {
				if (resultData_datatable[i].checked) {
					dataList.push(i)
				}
			}
			if (dataList.length > 0)// 不返回则是 undefined
				return dataList;
		};

		/**
		 * 设置选中行
		 * 
		 * @param {Number}
		 *            显示中的表格行号，从0开始
		 * @param {Boolean}
		 *            设置选中状态,选中(默认)/不选中,单选必选中且互斥，多选可取消或叠加选中
		 */
		this.setSelectedRow = function(index, cheked , eventTrigger) {
			cheked = cheked === false ? false : true;
			eventTrigger = eventTrigger === false ? false : true;
			var $tr = $dataTable
					.find(".datatable-rows table:first tr[data-index]:eq('"
							+ index + "')");
			var dataIndex = $tr.attr("data-index");
			if (!dataIndex)
				return;
			if (resultData_datatable[dataIndex].checked === cheked) {// 状态相同则不管
			} else{
				var param=[
					cheked,
					eventTrigger
				];
				$tr.trigger('click', param);
			}
		}

		/**
		 * 设置选中多行
		 * 
		 * @param {Number}
		 *            显示中的表格行号，从0开始 逗号分个 0,1,2
		 * @param {Boolean}
		 *            设置选中状态,选中(默认)/不选中,单选必选中且互斥，多选可取消或叠加选中
		 */
		this.setSelectedRows = function(index, cheked , eventTrigger) {
			cheked = cheked === false ? false : true;
			eventTrigger = eventTrigger === false ? false : true;
			var num = index.split(",");
			try {
				for (var i = 0; i < num.length; i++) {
					var $tr = $dataTable
							.find(".datatable-rows table:first tr[data-index]:eq('"
									+ num[i] + "')");
					var dataIndex = $tr.attr("data-index");
					if (!dataIndex)
						continue;
					if (resultData_datatable[dataIndex].checked === cheked) {// 状态相同则不管
					} else{
						var param=[
							cheked,
							eventTrigger
						];
						$tr.trigger('click', param);
					}
				}
			} catch (e) {
			}
		}

		/**
		 * 表头信息重设
		 */
		this.setCaption=function(caption,captionIcon,captionHtml){
			if(typeof caption==="string")
				options.caption=caption;
			if(typeof captionIcon==="string")
				options.captionIcon=captionIcon;
			if(typeof captionHtml==="function")
				options.captionHtml=captionHtml;
				
			var $gridHeader=$zgrid.find("#"+ id + Zgrid.header_suffix);
			$gridHeader.children().remove();
			$gridHeader.append(createCaption(options.caption,
						options.captionIcon, options.captionHtml));
		};
		
		_init();

		return _this;
	};

	/**
	 * 默认配置参数
	 */
	Zgrid.defualtConf = function() {

		// datatable 所需参数
		var DataTableOptions = {
			// 选中配置
			checkable : false, // 是否允许选中，前置选项
			checkByClickRow : true, // 是否在点击行时就选中
			checkedClass : 'active', // 选中样式
			checkboxName : null, // 为选中的input 指定name

			// 排序配置
			sortable : false, // 是否添加排序

			// 存储配置
			storage : false, // 是否允许本地缓存

			// 事件配置
			ready : null, // 表格内容渲染完毕
			checksChanged : null, // 选中属性变化(多选时)

			// 混合表头配置
			fixedHeader : false, // 允许混合表格，前置选项
			fixedHeaderOffset : 0, // 浮动表头距顶部的偏移量，样式容易出问题，慎用

			fixedLeftWidth : '30%', // 浮动表格左边的偏移量，样式容易出问题，慎用，混合列使用
			fixedRightWidth : '30%', // 浮动表格右边边的偏移量，样式容易出问题，慎用,混合列使用
			flexHeadDrag : true, // 允许拖拽表头实现滚动效果,混合列使用
			scrollPos : 'in', // 滚动条 内置/外置 'in'/'out'

			// 鼠标划过效果配置
			rowHover : true, // 划过行数据是否有效果
			colHover : true, // 划过标题列是否有效果
			hoverClass : 'hover', // 划过行数据的样式效果
			colHoverClass : 'col-hover', // 划过标题列的样式效果

			// 单元格合并配置
			mergeRows : false, // 上下单元格混合，前置

			// 列属性定义（未使用）
			minColWidth : 20, // 最小宽度
			minFixedLeftWidth : 200, // 混合表格左边区域宽度
			minFixedRightWidth : 200, // 混合表格右边边区域宽度
			minFlexAreaWidth : 200
			// 混合表格宽度

		};

		var ZgridOptions = {
			// 分页属性
			pageable : true, // 是否分页,前置属性
			pageNavNum:10,//分页数字导航索引个数
			frontPage : false, // 使用前台分页
			pageNo : 1, // 当前页数
			pageSize : 15, // 当前页面显示数据数

			// 数据显示控制
			linefeed : null, // 是否换行
			needTitle : false, // 是否添加title属性
			theam : null,// 主题样式,自定义的,添加上class的名称,class位于表格控件顶级div中
			// 工具栏定义
			toolbar : null,
			// oneToolConf:{//单个工具按钮配置
			// key:null,
			// title:null,
			// disabled:false,
			// callback:null
			// },
			// 数据定义
			cols : null, // 列属性定义
			oneColConf : {// 列属性默认配置
				name : null, // 字段名
				text : null, // 字段展示名
				flex : false, // 可拖动
				width : 'auto', // 宽度
				cssClass : null,// 表头样式 class
				css : null, // 表头样式
				type : 'string',// 数据类型 string/number/date
				ignore : false,// 不加载此列
				sort : false,// 允许此列排序
				mergeRows : false,// 允许行合并
				formatter : null
				// 对传入值的格式化方法
			},
			rowNumber : false, // 单独列显示行号

			// 基础样式
			min_height : 'auto', // 最低高度
			width : 'auto', // 默认宽度
			needBorder : true, // 默认表格控件带边框
			textAlign : 'left',// 表格数据的对齐方式 left 左/center 中/right 右
			rowNumberWidth : 'auto',// 默认auto

			caption : null, // 显示标题
			captionIcon: null,//标题图标
			captionHtml:null,//替换caption的方法
			
			// 数据请求
			async : true, // 异步
			requestParam : null, // 请求参数

			backSort : null,// 允许后台排序
			// backSort:{
			// "XH":{
			// url: String / Function //响应的url
			// cur:"0" //当前的激活的排序状态
			// 0:json/Function //默认顺序 参数
			// 1:json/Function //排序状态1 参数
			// 2:json/Function //排序状态2 参数
			// }
			// },

			// 回调函数
			callback : {
				onloadComplete : null, // 数据获取完成时
				onClickRow : null, // 单击行对象
				onDblclickRow : null, // 双击行对象
				onRowOver : null,// 鼠标悬停指定行时
				onRowOut : null,// 鼠标离开行时
				onCheckAll : null, // 选中所有行
				onTableReady : null,// 表格内容渲染完毕
				onGenerateComplete : null
				// 控件初始化完毕时
			}
		};

		var baseOptions = $.extend(true, DataTableOptions, ZgridOptions); // 先取得默认的参数

		return baseOptions;
	};

	/**
	 * grid id前缀
	 */
	Zgrid.zgridId_prefix = "zgrid_";
	/**
	 * toolbar id后缀
	 */
	Zgrid.toolbarId_suffix = "_zgrid_toolbar";
	/**
	 * toolbar btn id后缀
	 */
	Zgrid.toolbarBtnId_suffix = "_zgrid_toolbar_btn";
	/**
	 * title id后缀
	 */
	Zgrid.titleId_suffix = "_zgrid_title";
	/**
	 * 等待效果div id后缀
	 */
	Zgrid.waiting_suffix = "_zgrid_wait";
	/**
	 * datatable id后缀
	 */
	Zgrid.dataTable_suffix = "_zgrid_dataTable";
	/**
	 * zgrid id后缀
	 */
	Zgrid.pagerId_suffix = "_zgrid_pager";
	/**
	 * zgrid 序号列name
	 */
	Zgrid.rownumName = "_zgrid_rownum";

	// ↓↓↓ add by liangxj 2015-07-08 根据新需求调整工具栏样式 start
	/**
	 * header id后缀
	 */
	Zgrid.header_suffix = "_zgrid_header";
	Zgrid.searchbox_suffix = "_zgrid_searchbox";
	Zgrid.moreBtn_suffix = "_zgrid_more";
	// ↑↑↑ add by liangxj 2015-07-08 根据新需求调整工具栏样式 end

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
		 * 把数据格式封装成datatable需要的格式
		 * 
		 * @param {JSON}
		 *            data
		 */
		convertData : function(data, cols, options) {
			var convertedData = [];

			if (options.rowNumber === true) {// 显示行号
				cols[0].ignore = false;
			}
			for (var i = 0; i < data.length; i++) {
				convertedData.push({});
				convertedData[i].checked = false;
				convertedData[i].data = [i + 1];// 默认有一个序列元素

				for (var j = 1; j < cols.length; j++) {// 从1开始，cols第一项为默认的序列
					var cssClass = options.linefeed === true
							? "linefeed-on"
							: "linefeed-off";
					convertedData[i].cssClass = cssClass;
					var textAlign = options.textAlign
					if (textAlign === 'left')
						convertedData[i].cssClass += ' text-left';
					else if (textAlign === 'center')
						convertedData[i].cssClass += ' text-center';
					else if (textAlign === 'right')
						convertedData[i].cssClass += ' text-right';

					var name = cols[j].name;
					var value = "";
					if (name.indexOf(".") > -1) {// 使用子对象类型
						var nameArray = name.split("\.");
						var tempValue = null;
						for (var k = 0; k < nameArray.length; k++) {
							if (tempValue)
								tempValue = tempValue[nameArray[k]];
							else
								tempValue = data[i][nameArray[k]];

							if (!Util.isJSONObject(tempValue)
									&& !Util.isNotEmptyStr(tempValue)) {
								tempValue = "";
								break;
							}
						}
						value = Util.isJSONObject(tempValue) ? JSON
								.stringify(tempValue) : tempValue;
					} else {// 正常情况是个字符串
						value = Util.isJSONObject(data[i][name]) ? JSON
								.stringify(tempValue) : data[i][name];
					}
					// if (value || value === 0) {
					if (typeof cols[j].formatter === 'function')
						value = cols[j].formatter(value, i, data);
					// } else
					// value = "";
					if (!value && value !== 0)
						value = "";
					convertedData[i].data.push(value);
				}
			}
			return convertedData;
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
	 * 对外暴露的初始化方法 只获取从jQuery对象筛选到的Element中的第一个
	 * 
	 * @param {JSON}
	 *            options 配置参数
	 */
	$.fn.zgrid = function(options) {
		var $this = this;
		return new Zgrid($this[0], options);
	};

})(jQuery)