package org.hwyz.emr.domain.info;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "病例对象", description = "病例操作")
public class AddCasesTextInfo extends BaseInfo {
    private static final long serialVersionUID = 1L;
    @ApiModelProperty(value = "patientId", name = "患者id")
    public long patientId;
    @ApiModelProperty(value = "casesId", name = "病例id")
    public long casesId;
}
