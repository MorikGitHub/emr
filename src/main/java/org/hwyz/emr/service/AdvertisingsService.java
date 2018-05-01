/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import org.hwyz.emr.domain.result.GetAdverResult;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author      morik is Yongxu.Wang 广告添加
 * @CreateTime  2018年04月26日 14:01:40
 * @version     1.0.0
 * @description TODO
 */
public interface AdvertisingsService {
    boolean addAdvertising(long roleId, MultipartFile file, String gotoUrl);
    GetAdverResult queryAdvertising(long roleId);
}
