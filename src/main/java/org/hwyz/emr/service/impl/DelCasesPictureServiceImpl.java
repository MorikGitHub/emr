/**
 * org.hwyz.emr.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import org.hwyz.emr.dao.DelCasesPictureDao;
import org.hwyz.emr.domain.result.ChangePasswordResult;
import org.hwyz.emr.service.DelCasesPictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author      morik is Yongxu.Wang 病例详情图片删除标记
 * @CreateTime  2018年04月24日 16:18:52
 * @version     1.0.0
 * @description TODO
 */
@Service
public class DelCasesPictureServiceImpl implements DelCasesPictureService{
	@Autowired
	DelCasesPictureDao delCasesPictureDao;
	public ChangePasswordResult delCasePicture(long id){
		ChangePasswordResult cr=new ChangePasswordResult();
		Map<String,Object> pr=new HashMap<String,Object>();
		pr.put("orDelete",(byte)1);
		pr.put("id",id);
		int mark=delCasesPictureDao.getSQLManager().update("casesaction.delCasesPicture",pr);
		if(mark>0){
			cr.msg="删除操作成功!!!";
			cr.status=1;
		}else {
			cr.msg="删除操作失败!!!";
			cr.status=-1;
		}
		return cr;
	}

}
