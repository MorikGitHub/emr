/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import org.hwyz.emr.domain.result.ChangePasswordResult;

/**
 * @author      morik is Yongxu.Wang 病例详情图片删除标记
 * @CreateTime  2018年04月24日 16:18:52
 * @version     1.0.0
 * @description TODO
 */
public interface DelCasesPictureService {
    ChangePasswordResult delCasePicture(long id);
}
