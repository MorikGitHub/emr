	
	var time=5000;
	function setAddress(obj){
		var ip=$(obj).html();
		$.post("/monitoring/setIp",{"ip":ip},function(data){
			if(data="success"){window.location.reload();}
			}
		,"text");
		
	}
$(function(){
	var address="http://"+$("#defaultIp").val()+"/jolokia";
	
	var j4p = new Jolokia({url:address});
	//window.location.host="localhost:8080";
	
//	var j4p = new Jolokia({url:"http://localhost:8080/jolokia"});	
//	j4p.request(
//            { type: "READ", mbean: "java.lang:type=Memory", attribute: "HeapMemoryUsage"},
//            $.extend({jsonp:true},
//                 {
//                     success: function(resp) {
//                         console.log(resp.value.max);
//                     },
//                     error: function(resp) {
//                        fail("error");
//                         start();
//                     }
//                 })
//              );
	
//	function jsonp_fun(){
//        $.ajax({
//            url:'http://localhost:8080/jolokia',
//            type:'post',
//            data:{'params':'fromjsonp'},
//            dataType: "jsonp",
//            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
//            success: function(data){
//                alert("through jsonp,receive data from other domain : "+data.result);
//            },
//            error: function(){
//                alert('fail');
//            }
//        });
//    }
	
	
	/*var j4p = new Jolokia(jolokiaUrl);
	var value = j4p.getAttribute("java.lang:type=Memory","HeapMemoryUsage","used");
	console.log("Heap Memory used: " + value);  
	
	
	var j4p = new Jolokia({url: "/jolokia"});
	var response = j4p.request({type: "version"},{method: "post"});
	console.log("Agent Version: " + response.value.agent);
	
	
	
	var j4p = new Jolokia(jolokiaUrl);

	// Single request with a single success callback
	j4p.request(
	  { type: "read", mbean: "java.lang:type=Memory", attribute: "HeapMemoryUsage"},
	  { success: function(response) {
	       if (response.value.used / response.value.max > 0.2) {
	    	   console.log("20% of heap memory exceeded");
	       }
	    }, 
	    error: function(response) {
	       alert("Jolokia request failed: " + response.error);
	    } 
	  }
	);

	// Bulk request with multiple callbacks
	j4p.request(
	  [ 
	    { type: "read", mbean: "java.lang:type=Threading", attribute: "ThreadCount"},
	    { type: "read", mbean: "java.lang:type=Runtime", attribute: ["VmName", "VmVendor"]}
	  ],
	  { success: [ 
	               function(response) {
	                  console.log("Number of threads: " + response.value);
	               }, 
	               function(response) {
	                  console.log("JVM: " + response.value.VmName + " -- "
	                                      + response.value.VmVendor);
	               }
	             ],
	    error: function(response) {
	       alert("Jolokia request failed: " + response.error);
	    } 
	  }
	);
	
	var memoryUsed = j4p.getAttribute("java.lang:type=Memory","HeapMemoryUsage","used");
	
	console.log("Heap Memory used2: " + memoryUsed);  */
	
	
	
	
	/*var j4p = new Jolokia(jolokiaUrl);
	j4p.register(
			  {
			    success: function(resp) {
			       console.log("MBean :" + resp.mbean + ", attr:  " + resp.attribute + ", value: " + resp.value);
			    },
			    error: function(resp) {
			       console.log("Error: " + resp.error_text);
			    },
			    config: {
			       serializeException: true
			    },
			    onlyIfModified: true
			  },
			  { type: "LIST", config: { maxDepth: 2}},
			  { type: "READ", mbean: "java.lang:type=Threading", 
			    attribute: "ThreadCount", config: { ignoreErrors: true }},
			  { type: "READ", mbean: "bla.blu:type=foo", attribute: "blubber"});
	j4p.start();*/
	function   formatDate(now,resp)   {     
        var   year=now.getYear();     
        var   month=now.getMonth()+1;     
        var   date=now.getDate();     
        var   hour=now.getHours();     
        var   minute=now.getMinutes();     
        var   second=now.getSeconds();     
        
        
		return   hour+":"+minute+":"+second;  
       }     
	initMemory();
        
		function initMemory(){
			var memory = echarts.init(document.getElementById('memory'));
									 
			option = {
				    title : {
				        text: '堆内存'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['已使用堆内存', '最大堆内存']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    dataZoom : {
				        show : false,
				        start : 0,
				        end : 100
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : true,
				            data : (function (){
				                var now = new Date();
				                var res = [];
				                var len = 10;
				                while (len--) {
				                    res.unshift(now.toLocaleTimeString().replace(/^\D===*==/,''));
				                    now = new Date(now-time);
				                }
				                return res;
				                
				            })()
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            scale: true,
				            name : 'M',
				            min:0
				        }
				    ],
				    series : [
				        {
				            name:'used',
				            type:'line',
				            itemStyle: {normal: {areaStyle: {type: 'default'}}},
				            data:[,,,,,,,,,]
				        },
				        {
				            name:'max',
				            type:'line',
				            itemStyle: {normal: {areaStyle: {type: 'default'}}},
				            data:[,,,,,,,,,]
				        }
				    ]
				};				
			var axisData;
			clearInterval(t);
			var t = setInterval(function(){
			j4p.request(
		            { type: "READ", mbean: "java.lang:type=Memory", attribute: "HeapMemoryUsage"},
		            $.extend({jsonp:true},
		                 {
		                     success: function(resp) {
		                    	 axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
		     				    
		     				    // 动态数据接口 addData
		     				    memory.addData([
		     				        [
		     				            0,        // 系列索引
		     				            Math.ceil(resp.value.used/1024/1024), // 新增数据
		     				            false,     // 新增数据是否从队列头部插入
		     				            true,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		     				            
		     				        ],
		     				        [
		     				            1,        // 系列索引
		     				            Math.ceil(resp.value.max/1024/1024), // 新增数据
		     				            false,    // 新增数据是否从队列头部插入
		     				            true,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
		     				            axisData  // 坐标轴标签
		     				        ]
		     				    ]);
		                     },
		                     error: function(resp) {
		                        fail("error");
		                         start();
		                     }
		                 })
		              );
			},time);
			memory.setOption(option);
		}
		/*var j4p = new Jolokia({url:"http://localhost:8080/jolokia"});
		clearInterval(t);
		var t = setInterval(function(){
		j4p.request(
	            { type: "READ", mbean: "java.lang:type=Memory", attribute: "HeapMemoryUsage"},
	            $.extend({jsonp:true},
	                 {
	                     success: function(resp) {
	                    	
	     				    
	                     },
	                     error: function(resp) {
	                        fail("error");
	                         start();
	                     }
	                 })
	              );
		},time);*/
		initThread();
		function initThread(){
			
			var thread = echarts.init(document.getElementById('thread'));
			option = {
				    title : {
				        text: '线程'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['守护线程', '实时线程']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    dataZoom : {
				        show : false,
				        start : 0,
				        end : 100
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : true,
				            data : (function (){
				                var now = new Date();
				                var res = [];
				                var len = 10;
				                while (len--) {
				                    res.unshift(now.toLocaleTimeString().replace(/^\D*===/,''));
				                    now = new Date(now - time);
				                }
				                return res;
				            })()
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            scale: true,
				            name : '',
				            min:0
				        }
				    ],
				    series : [
				        {
				            name:'守护线程',
				            type:'line',
				            data:[,,,,,,,,,]
				        },
				        {
				            name:'实时线程',
				            type:'line',
				            data:[,,,,,,,,,]
				        }
				    ]
				};
				var axisData;
				clearInterval(t);
				var t = setInterval(function(){
				j4p.request(
						{ type: "READ", mbean: "java.lang:type=Threading"},
			            $.extend({jsonp:true},
			                 {
			                     success: function(resp) {
			                    	 axisData = (new Date()).toLocaleTimeString().replace(/^\D*===/,'');
			     				    
			     				    // 动态数据接口 addData
			     				    thread.addData([
			     				        [
			     				            0,        // 系列索引
			     				            resp.value.DaemonThreadCount, // 新增数据
			     				            false,     // 新增数据是否从队列头部插入
			     				            true     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			     				        ],
			     				        [
			     				            1,        // 系列索引
			     				            resp.value.ThreadCount, // 新增数据
			     				            false,    // 新增数据是否从队列头部插入
			     				            true,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			     				            axisData  // 坐标轴标签
			     				        ]
			     				    ]);
			     				    
			                     },
			                     error: function(resp) {
			                        fail("error");
			                         start();
			                     }
			                 })
			              );
				},time);
				
				thread.setOption(option);
		}
		initClassLoad();
		function initClassLoad(){
			
			var classLoad = echarts.init(document.getElementById('classLoad'));
			option = {
				    title : {
				        text: '类加载'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['已加载类', '已卸载类']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    dataZoom : {
				        show : false,
				        start : 0,
				        end : 100
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : true,
				            data : (function (){
				                var now = new Date();
				                var res = [];
				                var len = 10;
				                while (len--) {
				                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
				                    now = new Date(now - time);
				                }
				                return res;
				            })()
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            scale: true,
				            name : '',
				            min:0
				        }
				    ],
				    series : [
				        {
				            name:'已加载类',
				            type:'line',
				            data:[,,,,,,,,,]
				        },
				        {
				            name:'已卸载类',
				            type:'line',
				            data:[,,,,,,,,,]
				        }
				    ]
				};
			
				var axisData;
				clearInterval(t);
				var t = setInterval(function(){
				j4p.request(
						{ type: "READ", mbean: "java.lang:type=ClassLoading"},
			            $.extend({jsonp:true},
			                 {
			                     success: function(resp) {
			                    	 axisData = (new Date()).toLocaleTimeString().replace(/^\D*==/,'');
			     				    // 动态数据接口 addData
			     				    classLoad.addData([
			     				        [
			     				            0,        // 系列索引
			     				            resp.value.LoadedClassCount, // 新增数据
			     				            false,     // 新增数据是否从队列头部插入
			     				            true     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			     				        ],
			     				        [
			     				            1,        // 系列索引
			     				            resp.value.UnloadedClassCount, // 新增数据
			     				            false,    // 新增数据是否从队列头部插入
			     				            true,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			     				            axisData  // 坐标轴标签
			     				        ]
			     				    ]);
			     				    
			                     },
			                     error: function(resp) {
			                        fail("error");
			                         start();
			                     }
			                 })
			              );
				},time);
			
				classLoad.setOption(option);
		}
		initCpu();
		function initCpu(){
			
			var cpu = echarts.init(document.getElementById('cpu'));
			option = {
				    title : {
				        text: 'cpu'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['cpu占用率']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    dataZoom : {
				        show : false,
				        start : 0,
				        end : 100
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : true,
				            data : (function (){
				                var now = new Date();
				                var res = [];
				                var len = 10;
				                while (len--) {
				                    res.unshift(now.toLocaleTimeString().replace(/^\D*==/,''));
				                    now = new Date(now - time);
				                }
				                return res;
				            })()
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            scale: true,
				            name : '',
				            axisLabel : {
				                formatter: '{value} %'
				            },
				            minInterval: 10,
				            min:0,
				            data:(function (){
				               
				                var res = [];
				                var len = 10;
				                var val=0;
				                while (len--) {
				                    res.push(val);
				                    val=val+10;
				                }
				                return res;
				            })()
				            	
				        }
				    ],
				    series : [
				        {
				            name:'cpu占用',
				            type:'line',
				            data:[,,,,,,,,,]
				        }
				    ]
				};
				var axisData;
				var tempPtime;
				var tempCtime;
				var ProcessCpuTime;
			    var Uptime;
			    var numCpu;
				clearInterval(t);
				j4p.request(
						{ type: "READ", mbean: "java.lang:type=OperatingSystem",attribute: "ProcessCpuTime"},
			            $.extend({jsonp:true},
			                 {
			                     success: function(PCpuTime) {
			                    	 tempPtime=PCpuTime.value;
			                    	 j4p.request(
			     							{ type: "READ", mbean: "java.lang:type=Runtime",attribute: "Uptime"},
			     				            $.extend({jsonp:true},
			     				                 {
			     				                     success: function(UCputime) {
			     				                    	 tempCtime=UCputime.value;
			     				                     },
			     				                     error: function(UCputime) {
			     				                        fail("error");
			     				                         start();
			     				                     }
			     				                 })
			     				              );
			                     },
			                     error: function(PCpuTime) {
			                        fail("error");
			                         start();
			                     }
			                 })
			              );
						
				var t = setInterval(function(){
					
						j4p.request(
								{ type: "READ", mbean: "java.lang:type=OperatingSystem"},
					            $.extend({jsonp:true},
					                 {
					                     success: function(OperatingSystem) {
					                       ProcessCpuTime=OperatingSystem.value.ProcessCpuTime;
					         			   numCpu=OperatingSystem.value.AvailableProcessors;
					         			  j4p.request(
													{ type: "READ", mbean: "java.lang:type=Runtime",attribute: "Uptime"},
										            $.extend({jsonp:true},
										                 {
										                     success: function(UCputime) {
										         			    Uptime=UCputime.value;
										         			   axisData = (new Date()).toLocaleTimeString().replace(/^\D*==/,'');
															   
															    var UseRate = (ProcessCpuTime-tempPtime)/((Uptime-tempCtime)*10000*numCpu);
															    tempPtime=ProcessCpuTime;
															    tempCtime=Uptime;
															 // 动态数据接口 addData
															    cpu.addData([
															        [
															            0,        // 系列索引
															            UseRate.toFixed(1), // 新增数据
															            false,     // 新增数据是否从队列头部插入
															            true,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
															            axisData  // 坐标轴标签
															        ]
															    ]);
										                     },
										                     error: function(UCputime) {
										                        fail("error");
										                         start();
										                     }
										                 })
										              );
					                     },
					                     error: function(OperatingSystem) {
					                        fail("error");
					                         start();
					                     }
					                 })
					              );
						
						
				
				
				},time);
				cpu.setOption(option);
		}
		initGc();
		function initGc(){
			clearInterval(t);
			var t = setInterval(function(){
			j4p.request(
					{ type: "READ", mbean: "java.lang:type=GarbageCollector,*"},
		            $.extend({jsonp:true},
		                 {
		                     success: function(gc) {
		                    	 var gcManager=gc.value;
		         				$("#gcTable").html("");
		         				for(var key in gcManager){
		         					
		         					$("#gcTable").append("<tr>")
		         					$("#gcTable").append("<td>"+gcManager[key].Name+"</td>");
		         					$("#gcTable").append("<td>"+gcManager[key].CollectionCount+"</td>");
		         					$("#gcTable").append("<td>"+gcManager[key].CollectionTime+"</td>");
		         					$("#gcTable").append("</tr>")
		         					  
		         				}
		     				    
		                     },
		                     error: function(OperatingSystem) {
		                        fail("error");
		                         start();
		                     }
		                 })
		              );
			},time);
		}
		initHeapPartition();
		function initHeapPartition(){
			var maxData=new Array();
			var usedData=new Array();
			var heapPartition = echarts.init(document.getElementById('heapPartition'));
			option = {
				    title : {
				        text: '堆栈分区',
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        selectedMode:false,
				        data:['已使用', '最大值']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : ['PS Eden Space','PS Survivor Space','PS Old Gen']
				        },
				        {
				            type : 'category',
				            axisLine: {show:false},
				            axisTick: {show:false},
				            axisLabel: {show:false},
				            splitArea: {show:false},
				            splitLine: {show:false},
				            data : ['PS Eden Space','PS Survivor Space','PS Old Gen']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				        }
				    ],
				    series : [
				              {
				                  name:'已使用',
				                  type:'bar',
				                  zlevel:1,
				                  xAxisIndex:1,
				                  barWidth : 46,
				                  barCategoryGap: '50%',
				                  itemStyle: {
				                      normal: {
				                          color: '#ff9966',
				                          barBorderColor: '#ff9966',
				                          barBorderWidth: 2,
				                          barBorderRadius:0,
				                          label : {
				                              show: true, position: 'top'
				                          }
				                      }
				                  },
				            data:[0,0,0]
				        },
				        {
				            name:'最大值',
				            type:'bar',
				            zlevel:0,
				            barWidth : 50,
				            itemStyle: {
				                normal: {
				                    color: '#fff',
				                    barBorderColor: '#00ff66',
				                    barBorderWidth: 2,
				                    barBorderRadius:0,
				                    label : {
				                        show: true, 
				                        position: 'top',
				                       
				                        textStyle: {
				                            color: '#00ff66'
				                        }
				                    }
				                }
				            },
				            data:[0,0,0]
				        }
				    ]
				};
			heapPartition.setOption(option);
			clearInterval(t);
			var t = setInterval(function(){
			
			j4p.request(
					{ type: "READ", mbean: "java.lang:type=MemoryPool,name=PS Eden Space",attribute: "Usage"},
		            $.extend({jsonp:true},
		                 {
		                     success: function(edenUseage) {
		                    	maxData[0]=((edenUseage.value.max/1024/1024).toFixed(1));
		          			   usedData[0]=((edenUseage.value.used/1024/1024).toFixed(1));
		          			 j4p.request(
		         					{ type: "READ", mbean: "java.lang:type=MemoryPool,name=PS Survivor Space",attribute: "Usage"},
		         		            $.extend({jsonp:true},
		         		                 {
		         		                     success: function(sUseage) {
		         		          			   maxData[1]=((sUseage.value.max/1024/1024).toFixed(1));
		         		          			   usedData[1]=((sUseage.value.used/1024/1024).toFixed(1));
		         		          			j4p.request(
		         		       					{ type: "READ", mbean: "java.lang:type=MemoryPool,name=PS Old Gen",attribute: "Usage"},
		         		       		            $.extend({jsonp:true},
		         		       		                 {
		         		       		                     success: function(oldUseage) {
		         		       		          			   maxData[2]=((oldUseage.value.max/1024/1024).toFixed(1));
		         		       		          			   usedData[2]=((oldUseage.value.used/1024/1024).toFixed(1));
				         		       					   var opt={
				         		       							   series: [{
				         		       						            // 根据名字对应到相应的系列
				         		       						            name: '已使用',
				         		       						            data: usedData
				         		       						        },{
				         		       						            // 根据名字对应到相应的系列
				         		       						            name: '最大值',
				         		       						            data: maxData
				         		       						        }]
				         		       					   };
				         		       					 heapPartition.setOption(opt);
				         		       					 maxData=[];
				         		       					 usedData=[];
		         		       		                     },
		         		       		                     error: function(oldUseage) {
		         		       		                        fail("error");
		         		       		                         start();
		         		       		                     }
		         		       		                 })
		         		       		              );
		         		                     },
		         		                     error: function(sUseage) {
		         		                        fail("error");
		         		                         start();
		         		                     }
		         		                 })
		         		              );
		                     },
		                     error: function(edenUseage) {
		                        fail("error");
		                         start();
		                     }
		                 })
		              );
			
			},time);                 
		}
		                    
});