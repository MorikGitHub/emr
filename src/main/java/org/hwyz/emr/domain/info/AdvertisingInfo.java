package org.hwyz.emr.domain.info;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="广告返回实例",description="广告信息")
public class AdvertisingInfo extends BaseInfo{
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "广告位移标记",name="advertisingId",example="001")
	public long advertisingId;
	@ApiModelProperty(value = "广告图片地址",name="url",example="https://......jpg")
	public String url;
	@ApiModelProperty(value = "广告图片点击跳转地址",name="gotoUrl",example="https://......com")
	public String gotoUrl;
}
