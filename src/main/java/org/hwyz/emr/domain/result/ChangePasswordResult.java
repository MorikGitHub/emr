package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import org.hwyz.emr.domain.info.BaseInfo;
@ApiModel(value="修改密码返回对象",description="返回对象")
public class ChangePasswordResult extends BaseResult {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "接口统一返回数据结构格式",name="result")
	public BaseInfo result= null;
}
