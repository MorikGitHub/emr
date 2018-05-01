/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import org.hwyz.emr.domain.UpdataCasesText;
import org.hwyz.emr.domain.result.RegisterResult;

/**
 * @author      morik is Yongxu.Wang 病例纯文本更新
 * @CreateTime  2018年04月24日 16:42:25
 * @version     1.0.0
 * @description TODO
 */
public interface UpdataCasesTextService {
    RegisterResult updata(UpdataCasesText updataCasesText);
}
