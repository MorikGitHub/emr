/**
 * org.hwyz.emr.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import org.beetl.sql.core.db.KeyHolder;
import org.hwyz.emr.config.AliOSSConfig;
import org.hwyz.emr.config.UpOrDownLode;
import org.hwyz.emr.domain.result.BaseResult;
import org.hwyz.emr.domain.result.VersionResult;
import org.hwyz.emr.service.UPAndDownService;
import org.hwyz.emr.utils.LogUtil;
import org.hwyz.emr.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author morik is Yongxu.Wang 上传下载
 * @CreateTime 2018年04月03日 09:31:18
 * @version 1.0.0
 * @description TODO
 */
@Service
public class UPAndDownServiceImpl implements UPAndDownService {
//	@Autowired
//	UPAndDownDao uPAndDownDao;  //图片表
	@Autowired
	UpOrDownLode upOrDownLode;
	@Autowired
	LogUtil log;
	@Autowired
	StringUtil stringUtil;
	@Autowired
	AliOSSConfig AliOSSConfig;
//	@Autowired
//	AddCasesDao addCasesDao;  //病例表

	@Override
	@Transactional
	public BaseResult updata(MultipartFile multipartFile, byte versionSrc,
			float versionNo, String versionCode) throws FileNotFoundException {
		BaseResult br = new BaseResult();
		if (multipartFile.isEmpty()) {
			br.status=-1;
			br.msg = "文件不能为空!!!";
			return br;
		}
		
		multipartFile.getContentType();
		// 获取文件名
		String fileName = multipartFile.getOriginalFilename();
		File srcPath = new File(ResourceUtils.getURL("classpath:").getPath());
		// 如果上传目录为test/，则可以如下获取：
		File down = new File(srcPath.getAbsolutePath(), "static/test");
		String path = down.getAbsolutePath() + "\\" + fileName;
		File dest = new File(path);
		try {
			// 检测是否存在目录
			if (!dest.getParentFile().exists()) {
				dest.getParentFile().mkdirs();// 新建文件夹
			}
			multipartFile.transferTo(dest);// 文件写入
			br.status = 1;
			br.msg = "上传成功!!!";
			//归档名称
			String arn="HW"+System.currentTimeMillis()+"."+(fileName.substring(fileName.lastIndexOf(".")+1));
			String networkAddr="xiaowo-sases-image";
			AliOSSConfig.upLoding(networkAddr, arn, multipartFile.getInputStream());
			
			KeyHolder keyHolder = new KeyHolder();
			// 病例中添加纯文本信息
			Map<String, Object> pa = new HashMap<String, Object>();
			pa.put("patientId", 2);
			pa.put("classificationId", 2);
//			AddCasesDao.getSQLManager().insert("casesaction.addCases", pa, keyHolder,"id");

			Map<String, Object> p = new HashMap<String, Object>();
			p.put("medicalId", keyHolder.getLong());
			p.put("localAddr", path);
			p.put("type", (byte)1);
			p.put("uplodingName", fileName);
			
			p.put("archiveName", arn);
			p.put("networkAddr", networkAddr);
//			AddCasesDao.getSQLManager().insert("casesaction.addEnclosure", p, null);
			
			
		} catch (IOException e) {
			br.msg = "上传异常!!!";
			e.printStackTrace();
		}

//		Map<String, Object> paras = new HashMap<String, Object>();
//		paras.put("versionNo", versionNo);
//		paras.put("versionCode", versionCode);
//		paras.put("versionName", fileName);
//		paras.put("versionAddr", path);
//		paras.put("upDataTime",
//				stringUtil.dateToString(new Date(), "yyyy-MM-dd HH:mm:ss"));
//		paras.put("versionSrc", (byte) versionSrc);
//		uPAndDownDao.getSQLManager().insert("baseaction.addVersionLog", paras,
//				null);
		return br;
	}

	@Override
	public byte[] downLode(HttpServletResponse response, String versionType)
			throws IOException {
		response.setContentType("appliction/octet-stream");
		Map<String, Object> paras = new HashMap<String, Object>();
		paras.put("versionSrc", versionType);
//		List<UPAndDown> version = uPAndDownDao.getSQLManager().select(
//				"baseaction.downLode", UPAndDown.class, paras);
//		if (version.size() > 0) {
//			UPAndDown data = version.get(0);
//			String fn = URLEncoder.encode(data.getVersionName(), "utf-8");
//			response.setHeader("Content-disposition", "attachment;filename="
//					+ fn);
//			Path path = Paths.get(data.getVersionAddr());
//			return Files.readAllBytes(path);
//		} else {
			return null;
//		}
	}

	@Override
	public VersionResult getVersion(byte versionSrc) {
		VersionResult vr = new VersionResult();
		Map<String, Object> paras = new HashMap<String, Object>();
		paras.put("versionSrc", versionSrc);
//		List<UPAndDown> version = uPAndDownDao.getSQLManager().select(
//				"baseaction.downLode", UPAndDown.class, paras);
//		vr.status = 1;
//		vr.msg = "查询成功!!!";
//		if (version.size() > 0) {
//			vr.result = version.get(0);
//		} else {
//			vr.msg = "服务器上没有最新app!!!";
//		}
		return vr;
	}
}
