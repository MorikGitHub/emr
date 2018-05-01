/**
 * org.hwyz.emr.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.hwyz.emr.dao.RegisterDao;
import org.hwyz.emr.domain.Login;
import org.hwyz.emr.domain.result.RegisterResult;
import org.hwyz.emr.service.RegisterService;

/**
 * @author morik is Yongxu.Wang 用户注册
 * @CreateTime 2018年04月13日 13:54:19
 * @version 1.0.0
 */
@Service
public class RegisterServiceImpl implements RegisterService {
	@Autowired
	RegisterDao registerDao;
	@Override
	public RegisterResult addUser(String code, String phoneNo, String password)
			throws ParseException {
		RegisterResult rr = new RegisterResult();
		Map<String, Object> p = new HashMap<String, Object>();
		p.put("phoneNo", phoneNo);
		List<Login> data = registerDao.getSQLManager().select(
				"baseaction.queryUser", Login.class, p);
		if (data.size() > 0) {
			rr.msg = "号码已被注册！！！";
			rr.status = -3;
		} else {
			Map<String, Object> paras = new HashMap<String, Object>();
			paras.put("account", phoneNo);
			paras.put("phoneNo", phoneNo);
			paras.put("password", password);
			int re = registerDao.getSQLManager().insert("baseaction.addUser",
					paras, null);
			if (re > 0) { // 注册成功
				rr.msg = "注册成功!!!";
				rr.status = 1;
			} else { // 添加失败
				rr.msg = "注册失败!!!";
				rr.status = -2;
			}
		}
		return rr;
	}
}
