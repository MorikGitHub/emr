/**
 * org.hwyz.emr.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.hwyz.emr.dao.LoginDao;
import org.hwyz.emr.domain.Login;
import org.hwyz.emr.domain.result.LoginResult;
import org.hwyz.emr.service.LoginService;

/**
 * @author      morik is Yongxu.Wang 用户登陆
 * @CreateTime  2018年04月16日 10:52:58
 * @version     1.0.0
 * @description TODO
 */
@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	LoginDao loginDao;
	public LoginResult login(String phoneNo,String pwd){
		LoginResult lr=new LoginResult();
		Map<String, Object> paras = new HashMap<String, Object>();
		paras.put("account", phoneNo);
		paras.put("password", pwd);
		List<Login> data = loginDao.getSQLManager().select("baseaction.login", Login.class,paras);
		if(data.size()>0){  //登陆成功过
			lr.msg="登陆成功！！！";
			lr.status=1;
			lr.result=data.get(0);
			lr.result.setUserId(lr.result.getId());
		}else{  //用户名或密码错误
			lr.msg="登陆失败！！！";
			lr.status=-1;
		}
		return lr;
	}
	
}
