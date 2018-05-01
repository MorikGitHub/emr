/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import org.hwyz.emr.domain.result.GetCasesResult;

/**
 * @author      morik is Yongxu.Wang 病例详情
 * @CreateTime  2018年04月24日 14:31:02
 * @version     1.0.0
 * @description TODO
 */
public interface QueryCasesService {
    GetCasesResult getCases(long patientId);
}
