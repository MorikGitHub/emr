package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

@ApiModel(value = "返回结果的基础类", description = "返回对象的基础类")
public  class BaseResult implements Serializable {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "返回状态码->  -1:失败  1:成功", name = "status", example = "-1")
	public int status = -1;
	@ApiModelProperty(value = "返回状态描述", name = "status", example = "操作失败!!!")
	public  String msg = "操作失败!!!";
	@ApiModelProperty(value = "统一返回参数",name="result")
	public Result result= new Result();
}
