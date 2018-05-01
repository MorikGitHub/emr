/**
 * org.vz.product.data.collect.contant
 * @since : jdk 1.8
 */
package org.hwyz.emr.constant;

/**
 * @author Morik
 * @CreateTime 2017年12月4日 下午11:10:00
 * @version 1.0.0
 * @description 生成xml的一些常量
 */
public class XmlContant {
	public final static String XML_XSI = "xmlns:xsi";
	public final static String XML_XSD = "xmlns:xsd";
	public final static String XML_XSI_VALUE = "http://www.w3.org/2001/XMLSchema-instance";
	public final static String XML_XSD_VALUE = "http://www.w3.org/2001/XMLSchema";
	public final static String ROOT_ELEMENT = "M2E_Command";
	public final static String MESSAGES = "Messages";
	public final static String MESSAGE = "Message";
	public final static String KEY = "Key";
	public final static String VALUE = "Value";

	public final static String SEND_EVENT = "send_queue_name";// 要发送的队列名字，不会出现在xml中
	public final static String XML_KEY = "contain_xml_string";// 对应的是xml的 string

}
