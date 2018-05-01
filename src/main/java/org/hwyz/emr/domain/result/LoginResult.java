package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import org.hwyz.emr.domain.Login;
@ApiModel(value="登陆结果返回对象",description="返回对象")
public class LoginResult extends BaseResult {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "登陆返回用户的具体信息",name="result")
	public Login result= new Login();
}
