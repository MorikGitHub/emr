/**
 * org.hwyz.emr.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import org.hwyz.emr.dao.DelCasesDao;
import org.hwyz.emr.domain.result.AddCasesResult;
import org.hwyz.emr.service.DelCasesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author      morik is Yongxu.Wang 删除病例
 * @CreateTime  2018年04月23日 17:58:39
 * @version     1.0.0
 * @description TODO
 */
@Service
public class DelCasesServiceImpl implements DelCasesService{
	@Autowired
	DelCasesDao delCasesDao;
	public AddCasesResult del(long id){
		AddCasesResult addCasesResult=new AddCasesResult();
		Map<String,Object> p=new HashMap<String,Object>();
		p.put("orDelete",(byte)1);
		p.put("id",id);
		int i=delCasesDao.getSQLManager().update("casesaction.delCases",p);
		if(i>0){
			addCasesResult.status=1;
			addCasesResult.msg="删除病例成功!!";
		}else{
			addCasesResult.status=-1;
			addCasesResult.msg="删除病例失败!!!";
		}
		return addCasesResult;
	}
}
