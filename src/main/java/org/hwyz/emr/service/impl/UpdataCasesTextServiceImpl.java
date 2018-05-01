/**
 * org.hwyz.emr.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import org.hwyz.emr.dao.UpdataCasesTextDao;
import org.hwyz.emr.domain.UpdataCasesText;
import org.hwyz.emr.domain.result.RegisterResult;
import org.hwyz.emr.service.UpdataCasesTextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author      morik is Yongxu.Wang 病例纯文本更新
 * @CreateTime  2018年04月24日 16:42:25
 * @version     1.0.0
 * @description TODO
 */
@Service
public class UpdataCasesTextServiceImpl implements UpdataCasesTextService{
	@Autowired
	UpdataCasesTextDao updataCasesTextDao;
	public RegisterResult updata(UpdataCasesText updataCasesText){
		RegisterResult rr=new RegisterResult();
		int mark=updataCasesTextDao.updateById(updataCasesText);
		if(mark>0){
			rr.status=1;
			rr.msg="更新成功!!";
		}else{
			rr.status=-1;
			rr.msg="更新失败!!";
		}
		return rr;
	}
}
