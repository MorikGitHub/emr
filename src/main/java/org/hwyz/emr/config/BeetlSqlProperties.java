/**
 * org.vz.product.data.collect.sysConfig
 * @since : jdk 1.8
 */
package org.hwyz.emr.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Primary;

/**
 * @author      Morik
 * @CreateTime  2017年7月24日 上午12:25:54
 * @version     1.0.0
 * @description 从系统配置中读取beelsql的相关属性
 */
@ConfigurationProperties(prefix="spring.beetlsql")
@Primary
public class BeetlSqlProperties {
	private String basePackage;
	private String dbStyle;
	private String root;
	private String suffix;
	/**
	 * @return the basePackage
	 */
	public String getBasePackage() {
		return basePackage;
	}
	/**
	 * @param basePackage the basePackage to set
	 */
	public void setBasePackage(String basePackage) {
		this.basePackage = basePackage;
	}
	/**
	 * @return the dbStyle
	 */
	public String getDbStyle() {
		return dbStyle;
	}
	/**
	 * @param dbStyle the dbStyle to set
	 */
	public void setDbStyle(String dbStyle) {
		this.dbStyle = dbStyle;
	}
	/**
	 * @return the root
	 */
	public String getRoot() {
		return root;
	}
	/**
	 * @param root the root to set
	 */
	public void setRoot(String root) {
		this.root = root;
	}
	/**
	 * @return the suffix
	 */
	public String getSuffix() {
		return suffix;
	}
	/**
	 * @param suffix the suffix to set
	 */
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
	
	
}
