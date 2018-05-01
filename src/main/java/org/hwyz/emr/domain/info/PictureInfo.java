package org.hwyz.emr.domain.info;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="病历图片实例",description="用户资料")
public class PictureInfo extends BaseInfo{
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "病历图片唯一标识",name="id",example="001")
	public long id;
	@ApiModelProperty(value = "病历图片地址",name="url",example="https://xiaowo-sases-image.oss-cn-beijing.aliyuncs.com/hwyz-p2-c17-t1524412369078.jpg")
	public String url;
}
