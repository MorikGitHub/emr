/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import org.hwyz.emr.domain.result.AddCasesResult;

/**
 * @author      morik is Yongxu.Wang 删除病例
 * @CreateTime  2018年04月23日 17:58:39
 * @version     1.0.0
 * @description TODO
 */
public interface DelCasesService {
    AddCasesResult del(long id);
}
