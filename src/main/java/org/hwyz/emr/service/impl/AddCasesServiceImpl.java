/**
 * org.hwyz.emr.impl
 *
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import com.aliyun.oss.model.PutObjectResult;
import org.beetl.sql.core.db.KeyHolder;
import org.hwyz.emr.config.AliOSSConfig;
import org.hwyz.emr.dao.AddCasesDao;
import org.hwyz.emr.domain.info.AddCasesTextInfo;
import org.hwyz.emr.domain.info.CasesInfo;
import org.hwyz.emr.domain.result.AddCasesResult;
import org.hwyz.emr.service.AddCasesService;
import org.hwyz.emr.utils.LogUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author morik is Yongxu.Wang 新增病例
 * @version 1.0.0
 * @CreateTime 2018年04月22日 18:43:55
 * @description TODO
 */
@Service
public class AddCasesServiceImpl implements AddCasesService {
    @Autowired
    AddCasesDao addCasesDao;
    @Autowired
    AliOSSConfig aliOSSConfig;
    @Autowired
    LogUtil logUtil;

    @Transactional
    @Override
    public AddCasesResult addCases(CasesInfo casesInfo, List<MultipartFile> files) {
        AddCasesResult addCasesResult = new AddCasesResult();
        //开启事务向病例主表录入有效信息
        long casesId = addCasesText(casesInfo).casesId;
        if (addCasesPicture(casesInfo.patientId, casesId, files)) {
            addCasesResult.status = 1;
            addCasesResult.msg = "添加病例成功!!!";
        } else {
            addCasesResult.status = -1;
            addCasesResult.msg = "添加病例失败!!!";
        }
        return addCasesResult;
    }

    @Transactional
    @Override
    public AddCasesTextInfo addCasesText(CasesInfo casesInfo) {
        AddCasesTextInfo ci=new AddCasesTextInfo();
        Map<String, Object> paras = new HashMap<String, Object>();
        paras.put("patientId", casesInfo.patientId);
        paras.put("classficationId", casesInfo.classFicationId);
        KeyHolder keyHolder = new KeyHolder();
        addCasesDao.getSQLManager().insert("casesaction.addCases", paras, keyHolder, "id");
        ci.patientId= casesInfo.patientId;
        ci.casesId= keyHolder.getLong();
        return ci;
    }

    @Transactional
    @Override
    public boolean addCasesPicture(long patientId, long casesId, List<MultipartFile> files) {
        MultipartFile file = null;
        BufferedOutputStream stream = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    //上传阿里资源服务器
                    String uplodingName = file.getOriginalFilename();
                    String suffix = uplodingName.substring(uplodingName.lastIndexOf(".") + 1);
                    String time = System.currentTimeMillis() + "";
                    String archiveName = "hwyz-p" + patientId + "-c" + casesId + "-t" + time + "." + suffix;
                    String bucketName = "xiaowo-sases-image";
                    PutObjectResult pr = aliOSSConfig.upLoding(bucketName, archiveName, file.getInputStream());

                    logUtil.info("上传阿里云结果返回:" + pr.getETag());
                    //本地保存
                    File srcPath = new File(ResourceUtils.getURL("classpath:").getPath());
                    File url = new File(srcPath.getAbsolutePath(), "static/hwyz/p" + patientId + "/c" + casesId);
                    String path = url.getAbsolutePath() + "\\t" + time + "." + suffix;
                    File dest = new File(path);
                    if (!dest.getParentFile().exists()) {
                        dest.getParentFile().mkdirs();// 新建文件夹
                    }
                    file.transferTo(dest);// 文件写入

                    //数据库保存
                    Map<String, Object> ps = new HashMap<String, Object>();
                    ps.put("casesId", casesId);
                    ps.put("localAddr", path);
                    ps.put("type", 1);
                    ps.put("uplodingName", uplodingName);
                    ps.put("archiveName", archiveName);
                    ps.put("networkAddr", bucketName);
                    addCasesDao.getSQLManager().insert("casesaction.addEnclosure", ps, null);
                } catch (IOException e) {
                    logUtil.info("第" + (i + 1) + "没读取到");
                    return false;
                }
            } else {
                logUtil.info("第" + (i + 1) + "个文件为空");
            }
        }
        return true;
    }

}
