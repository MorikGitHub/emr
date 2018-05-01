/**
 * org.hwyz.emr.impl
 *
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import com.aliyun.oss.model.PutObjectResult;
import org.hwyz.emr.config.AliOSSConfig;
import org.hwyz.emr.dao.AdvertisingsDao;
import org.hwyz.emr.domain.QueryCases;
import org.hwyz.emr.domain.QueryCasesPicture;
import org.hwyz.emr.domain.info.AdvertisingInfo;
import org.hwyz.emr.domain.result.GetAdverResult;
import org.hwyz.emr.service.AdvertisingsService;
import org.hwyz.emr.utils.LogUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * @author morik is Yongxu.Wang 广告添加
 * @version 1.0.0
 * @CreateTime 2018年04月26日 14:01:40
 * @description TODO
 */
@Service
public class AdvertisingsServiceImpl implements AdvertisingsService {
    @Autowired
    AdvertisingsDao addAdvertisingsDao;
    @Autowired
    AliOSSConfig aliOSSConfig;
    @Autowired
    LogUtil logUtil;

    @Transactional
    public boolean addAdvertising(long roleId, MultipartFile file, String gotoUrl) {
        try {
            //上传阿里资源服务器
            String uplodingName = file.getOriginalFilename();
            String suffix = uplodingName.substring(uplodingName.lastIndexOf(".") + 1);
            String time = System.currentTimeMillis() + "";
            String archiveName = "advertising-r" + roleId + "-t" + time + "." + suffix;
            String bucketName = "xiaowo-advertising-image";
            PutObjectResult pr = aliOSSConfig.upLoding(bucketName, archiveName, file.getInputStream());
            logUtil.info("上传阿里云结果返回:" + pr.getETag());
            //本地保存
            File srcPath = new File(ResourceUtils.getURL("classpath:").getPath());
            File url = new File(srcPath.getAbsolutePath(), "static/advertising/r" + roleId);
            String path = url.getAbsolutePath() + "\\t" + time + "." + suffix;
            File dest = new File(path);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();// 新建文件夹
            }
            file.transferTo(dest);// 文件写入
            //数据库保存
            Map<String, Object> ps = new HashMap<String, Object>();
            ps.put("localAddr", path);
            ps.put("type", 1);
            ps.put("uplodingName", uplodingName);
            ps.put("archiveName", archiveName);
            ps.put("networkAddr", bucketName);
            ps.put("gotoUrl", gotoUrl);
            ps.put("roleId", roleId);
            addAdvertisingsDao.getSQLManager().insert("casesaction.addAdvertising", ps,null);
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    public  GetAdverResult queryAdvertising(long roleId) {
        GetAdverResult gr=new GetAdverResult();
        List<AdvertisingInfo> ais=new ArrayList<AdvertisingInfo>();
        Map<String, Object> ps = new HashMap<String, Object>();
        ps.put("roleId", roleId);
        ps.put("orDelete", (byte) 1);
        List<QueryCasesPicture> data = addAdvertisingsDao.getSQLManager().select("casesaction.queryAdcertising", QueryCasesPicture.class, ps);
        for (QueryCasesPicture c : data) {
            AdvertisingInfo ai=new AdvertisingInfo();
            ai.url=c.getUrl();
            ai.advertisingId=c.getId();
            Date expiration = new Date(new Date().getTime() + 3600 * 1000*24);
            ai.gotoUrl=aliOSSConfig.getUrl(c.getNetworkAddr(),c.getArchiveName(),expiration);
            ais.add(ai);
        }
        gr.msg="查询成功!!!";
        gr.status=1;
        gr.result=ais;
        return gr;
    }
}
