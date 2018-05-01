/**
 * org.hwyz.emr.service
 * @since : jdk 1.8
 */
package org.hwyz.emr.service;

import java.io.FileNotFoundException;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.hwyz.emr.domain.result.BaseResult;
import org.hwyz.emr.domain.result.VersionResult;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author      morik is Yongxu.Wang 上传下载
 * @CreateTime  2018年04月03日 09:31:18
 * @version     1.0.0
 */
public interface UPAndDownService {
	public BaseResult updata(MultipartFile multipartFile,byte versionSrc,float versionNo,String versionCode) throws FileNotFoundException;
	public byte[] downLode(HttpServletResponse response,String versionSrc) throws IOException;
	public VersionResult getVersion(byte versionSrc);
}
