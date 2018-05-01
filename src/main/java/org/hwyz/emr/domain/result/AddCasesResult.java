package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hwyz.emr.domain.Login;

@ApiModel(value="添加病例结果返回对象",description="返回对象")
public class AddCasesResult extends BaseResult {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "统一数据结构",name="result")
	public Login result= null;
}
