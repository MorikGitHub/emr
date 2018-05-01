/**
 * org.hwyz.emr.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.hwyz.emr.dao.CodeDao;
import org.hwyz.emr.domain.Code;
import org.hwyz.emr.domain.result.GetCodeResult;
import org.hwyz.emr.service.CodeService;
import org.hwyz.emr.utils.LogUtil;

/**
 * @author morik is Yongxu.Wang 验证码
 * @CreateTime 2018年04月13日 15:41:36
 * @version 1.0.0
 */
@Service
public class CodeServiceImpl implements CodeService {
	@Autowired
	CodeDao codeDao;
	@Autowired
	LogUtil log;
	@Override
	public boolean addCode(String code, String phoneNo, int type, String time,
			long userId) {
		Map<String, Object> paras = new HashMap<String, Object>();
		paras.put("securityCode", code);
		paras.put("phoneNo", phoneNo);
		paras.put("createTime", time);
		paras.put("type", type);
		paras.put("userId", userId);
		int re = codeDao.getSQLManager().insert("baseaction.addCode", paras,
				null);
		if (re > 0) { // 注册成功
			return true;
		} else { // 添加失败
			return false;
		}
	}

	@Override
	public GetCodeResult verifyCode(String code, String phoneNo, int type)
			throws ParseException {
		GetCodeResult br=new GetCodeResult();
		Map<String, Object> ps = new HashMap<String, Object>();
		ps.put("securityCode", code);
		ps.put("phoneNo", phoneNo);
		ps.put("type", type);
		List<Code> codes = codeDao.getSQLManager().select(
				"baseaction.queryCode", Code.class, ps);
		if (codes.size() > 0) { // 有发送过验证码
			if(codes.get(0).getOrUse()==1){  //短信验证过了 
				br.msg="短信已被使用过,请重新获取验证码！！！";
				br.status=-3;
			}else{
				long endTime = System.currentTimeMillis();
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				Date date = simpleDateFormat.parse(codes.get(0).getCreateTime());
				long startTime = date.getTime();
				log.error(codes.get(0).getCreateTime()+"时间:"+(endTime - startTime));
				if ((endTime - startTime) > 5 * 1000 * 60) { // 验证码超时
					br.msg="验证码超时";
					br.status=-4;
				} else {
					Map<String, Object> pas = new HashMap<String, Object>();
					pas.put("orUse", (byte)1);
					pas.put("id", codes.get(0).getId());
					codeDao.getSQLManager().update("baseaction.updataCode", pas);
					br.msg="验证通过";
					br.status=1;
					br.result=null;
				}
			}
		} else {// 系统没发送过验证码
			br.msg="验证码错误";
			br.status=-2;
		}
		return br;
	}
}
