/**
 * org.hwyz.emr.impl
 *
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import org.hwyz.emr.config.AliOSSConfig;
import org.hwyz.emr.dao.QueryCasesDao;
import org.hwyz.emr.domain.QueryCases;
import org.hwyz.emr.domain.QueryCasesPicture;
import org.hwyz.emr.domain.info.CasesInfo2;
import org.hwyz.emr.domain.info.PictureInfo;
import org.hwyz.emr.domain.result.GetCasesResult;
import org.hwyz.emr.service.QueryCasesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * @author morik is Yongxu.Wang 病例详情
 * @version 1.0.0
 * @CreateTime 2018年04月24日 14:31:02
 * @description TODO
 */
@Service
public class QueryCasesServiceImpl implements QueryCasesService {
    @Autowired
    QueryCasesDao queryCasesDao;
    @Autowired
    AliOSSConfig aliOSSConfig;
    @Transactional
    public GetCasesResult getCases(long patientId) {
        GetCasesResult gcr=new GetCasesResult();
        Map<String, Object> pr = new HashMap<String, Object>();
        pr.put("patientId",patientId);
        pr.put("orDelete",(byte)1);
        List<QueryCases> cases = queryCasesDao.getSQLManager().select("casesaction.queryCases", QueryCases.class, pr);
        List<CasesInfo2> cif2s=new ArrayList<CasesInfo2>();
        for (QueryCases c : cases) {
            CasesInfo2 cif2=new CasesInfo2();
            cif2.id=c.getId();
            List<PictureInfo> pis=new ArrayList<PictureInfo>();
            Map<String, Object> pr2 = new HashMap<String, Object>();
            pr2.put("casesId",c.getId());
            pr2.put("orDelete",(byte)1);
            List<QueryCasesPicture> pictures = queryCasesDao.getSQLManager().select("casesaction.queryCasesPicture", QueryCasesPicture.class, pr2);
            for (QueryCasesPicture qcp : pictures) {
                PictureInfo pi = new PictureInfo();
                pi.id=qcp.getId();
                Date expiration = new Date(new Date().getTime() + 3600 * 1000*24);
                pi.url=aliOSSConfig.getUrl(qcp.getNetworkAddr(),qcp.getArchiveName(),expiration);
//                pi.url="http://"+qcp.getNetworkAddr()+".oss-cn-beijing.aliyuncs.com/"+qcp.getArchiveName()+"?Expires=1524556984&OSSAccessKeyId=TMP.AQHl1WYybBsEbDjhiSNlmip0HTmBU6997iZd1zYPuU0JpgIBoCFLwWOiEFpdMC4CFQCG7f55pFVMsyP1olcP9NTjAoVkoAIVALZXGk00KUpH_9RfuuRrZmtOk2E4&Signature=KrL7X8GChuA0YfHoCjO%2BlsXe3OA%3D";
                pis.add(pi);
            }
            cif2.pictures=pis;
            cif2s.add(cif2);
        }
        gcr.msg="查询成功!!!";
        gcr.status=1;
        gcr.result=cif2s;
        return gcr;
    }
}
