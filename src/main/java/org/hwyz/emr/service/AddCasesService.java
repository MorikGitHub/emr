/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import org.hwyz.emr.domain.info.AddCasesTextInfo;
import org.hwyz.emr.domain.info.CasesInfo;
import org.hwyz.emr.domain.result.AddCasesResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author      morik is Yongxu.Wang 新增病例
 * @CreateTime  2018年04月22日 18:43:55
 * @version     1.0.0
 * @description TODO
 */
public interface AddCasesService {
    AddCasesResult addCases(CasesInfo casesInfo, List<MultipartFile> files);
    boolean addCasesPicture(long patientId, long casesId, List<MultipartFile> files);
    AddCasesTextInfo addCasesText(CasesInfo casesInfo);
}
