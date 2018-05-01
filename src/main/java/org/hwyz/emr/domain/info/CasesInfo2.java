package org.hwyz.emr.domain.info;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.ArrayList;
import java.util.List;

@ApiModel(value = "病例对象", description = "病例操作")
public class CasesInfo2 extends BaseInfo {
    private static final long serialVersionUID = 1L;
    @ApiModelProperty(value = "病历唯一标示",name="id")
    public long id;
    @ApiModelProperty(value = "图片信息",name="result")
    public List<PictureInfo> pictures= new ArrayList<PictureInfo>();
}
