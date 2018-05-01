package org.hwyz.emr.domain.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hwyz.emr.domain.info.AddCasesTextInfo;
import org.hwyz.emr.domain.info.CasesInfo2;
import org.hwyz.emr.domain.info.PictureInfo;

import java.util.ArrayList;
import java.util.List;

@ApiModel(value="病历详情",description="返回对象")
public class GetCasesResult extends BaseResult {
	private static final long serialVersionUID = 1L;
	public List<CasesInfo2> result=new ArrayList<CasesInfo2>();
}
