/**
 * org.vz.product.data.collect.sysConfig
 * @since : jdk 1.8
 */
package org.hwyz.emr.config;

import org.springframework.boot.context.properties.ConfigurationProperties;


/**
 * @author      Morik
 * @CreateTime  2017年7月22日 下午2:27:50
 * @version     1.0.0
 * @description datasource的一引起设置，包括阿里云短信发送的重要参数设置;
 */
@ConfigurationProperties(prefix="spring.netease")
public class NeteaseProperties {
	private String appkey;
	private String keyscr;
	private String url;
	private String templateCode;
	private String templateParam;
	private String  severName;
	
	public String getSeverName() {
		return severName;
	}
	public void setSeverName(String severName) {
		this.severName = severName;
	}
	public String getAppkey() {
		return appkey;
	}
	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}
	public String getKeyscr() {
		return keyscr;
	}
	public void setKeyscr(String keyscr) {
		this.keyscr = keyscr;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getTemplateCode() {
		return templateCode;
	}
	public void setTemplateCode(String templateCode) {
		this.templateCode = templateCode;
	}
	public String getTemplateParam() {
		return templateParam;
	}
	public void setTemplateParam(String templateParam) {
		this.templateParam = templateParam;
	}
	
}
