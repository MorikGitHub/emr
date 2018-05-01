package org.hwyz.emr.domain.info;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "验证码对象", description = "获取验证码返回对象")
public class CodeInfo extends BaseInfo{
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "验证码", name = "code")
	public String code;
	@ApiModelProperty(value = "1 注册  2 修改密码  3忘记密码  4解绑验证手机号  5绑定验证手机号", name = "type")
	public int type;
}
