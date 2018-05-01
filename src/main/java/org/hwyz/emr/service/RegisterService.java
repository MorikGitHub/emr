/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import java.text.ParseException;

import org.hwyz.emr.domain.result.RegisterResult;


/**
 * @author      morik is Yongxu.Wang 用户注册
 * @CreateTime  2018年04月13日 13:54:19
 * @version     1.0.0
 * @description TODO
 */
public interface RegisterService {
	public RegisterResult addUser(String code,String phoneNo,String password) throws ParseException;
}
