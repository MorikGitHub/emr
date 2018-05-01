package org.hwyz.emr.domain.info;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "病例对象", description = "病例操作")
public class CasesInfo extends BaseInfo {
    private static final long serialVersionUID = 1L;
    @ApiModelProperty(value = "patientId", name = "患者id")
    public long patientId;
    @ApiModelProperty(value = "classFicationId", name = "病例分类id")
    public long classFicationId;
}
