/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import org.hwyz.emr.domain.result.LoginResult;

/**
 * @author      morik is Yongxu.Wang 用户登陆
 * @CreateTime  2018年04月16日 10:52:58
 * @version     1.0.0
 * @description TODO
 */
public interface LoginService {
	LoginResult login(String phoneNo,String pwd);
}
