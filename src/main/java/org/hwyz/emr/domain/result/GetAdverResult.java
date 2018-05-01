package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hwyz.emr.domain.UPAndDown;
import org.hwyz.emr.domain.info.AdvertisingInfo;

import java.util.ArrayList;
import java.util.List;

@ApiModel(value="获取广告返回对象",description="返回对象")
public class GetAdverResult extends BaseResult {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "bneer广告具体信息",name="result")
	public List<AdvertisingInfo> result=new ArrayList<AdvertisingInfo>();
}
