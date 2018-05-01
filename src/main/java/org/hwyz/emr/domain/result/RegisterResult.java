package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import org.hwyz.emr.domain.info.BaseInfo;
@ApiModel(value="注册添加用户返回结果对象",description="返回对象")
public class RegisterResult extends BaseResult {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "接口统一返回数据结构格式",name="result")
	public BaseInfo result= null;
}
