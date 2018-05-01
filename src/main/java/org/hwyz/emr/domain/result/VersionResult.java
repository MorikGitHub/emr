package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import org.hwyz.emr.domain.UPAndDown;
@ApiModel(value="登陆结果返回对象",description="返回对象")
public class VersionResult extends BaseResult {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "版本具体信息",name="result")
	public UPAndDown result= new UPAndDown();
}
