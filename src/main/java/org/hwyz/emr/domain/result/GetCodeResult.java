package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;

import org.hwyz.emr.domain.info.CodeInfo;

@ApiModel(value = "获取验证码结果返回对象", description = "获取验证码返回对象")
public class GetCodeResult extends BaseResult {
	private static final long serialVersionUID = 1L;
	public CodeInfo result = new CodeInfo();
}



