/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import java.text.ParseException;

import org.hwyz.emr.domain.result.GetCodeResult;


/**
 * @author      morik is Yongxu.Wang 验证码
 * @CreateTime  2018年04月13日 15:41:36
 * @version     1.0.0
 * @description TODO
 */
public interface CodeService {

	boolean addCode(String code, String phoneNo, int type, String time,
			long userId);
	
	GetCodeResult verifyCode(String code, String phoneNo, int type) throws ParseException;
}
