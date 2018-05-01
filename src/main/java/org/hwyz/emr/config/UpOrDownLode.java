package org.hwyz.emr.config;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hwyz.emr.domain.result.BaseResult;
import org.hwyz.emr.utils.LogUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Component
public class UpOrDownLode {
	@Autowired
	LogUtil logger;

	/**
	 * 单个文件上传
	 * 
	 * @param file
	 * @return
	 */
	public BaseResult singleUpload(MultipartFile file) {
		BaseResult br=new BaseResult();
		try {
			if (file.isEmpty()) {
				br.msg="文件不能为空!!!";
				return br;
			}
			// 获取文件名
			String fileName = file.getOriginalFilename();
			File srcPath = new File(ResourceUtils.getURL("classpath:").getPath());
			// 如果上传目录为test/，则可以如下获取：
			File down = new File(srcPath.getAbsolutePath(), "static/test");			
			String path = down.getAbsolutePath() + "\\"+fileName;
			File dest = new File(path);
			// 检测是否存在目录
			if (!dest.getParentFile().exists()) {
				dest.getParentFile().mkdirs();// 新建文件夹
			}
			file.transferTo(dest);// 文件写入
			br.status=1;
			br.msg="上传成功!!!";
		} catch (IOException e) {
			e.printStackTrace();
			br.msg="上传异常!!!";
		}
		return br;
	}

	/**
	 * 多个文件上传
	 * 
	 * @param request
	 * @return
	 */
	public String moreUpload(HttpServletRequest request) {
		List<MultipartFile> files = ((MultipartHttpServletRequest) request)
				.getFiles("file");
		MultipartFile file = null;
		BufferedOutputStream stream = null;
		for (int i = 0; i < files.size(); ++i) {
			file = files.get(i);
			String filePath = "d:\\";
			if (!file.isEmpty()) {
				try {
					byte[] bytes = file.getBytes();
					stream = new BufferedOutputStream(new FileOutputStream(
							new File(filePath + file.getOriginalFilename())));// 设置文件路径及名字
					stream.write(bytes);// 写入
					stream.close();
				} catch (Exception e) {
					stream = null;
					return "第 " + i + " 个文件上传失败  ==> " + e.getMessage();
				}
			} else {
				return "第 " + i + " 个文件上传失败因为文件为空";
			}
		}
		return "上传成功";
	}
    
	public String download(HttpServletRequest request,
			HttpServletResponse response) {
		String fileName = "上传下载.txt";// 设置文件名，根据业务需要替换成要下载的文件名
		if (fileName != null) {
			// 设置文件路径
			String realPath = "classpath:/test/";
			File file = new File(realPath, fileName);
			if (file.exists()) {
				response.setContentType("application/force-download");// 设置强制下载不打开
				response.addHeader("Content-Disposition",
						"attachment;fileName=" + fileName);// 设置文件名
				byte[] buffer = new byte[1024];
				FileInputStream fis = null;
				BufferedInputStream bis = null;
				try {
					fis = new FileInputStream(file);
					bis = new BufferedInputStream(fis);
					OutputStream os = response.getOutputStream();
					int i = bis.read(buffer);
					while (i != -1) {
						os.write(buffer, 0, i);
						i = bis.read(buffer);
					}
					System.out.println("success");
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					if (bis != null) {
						try {
							bis.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
					if (fis != null) {
						try {
							fis.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		return "下载没报错";
	}
}
