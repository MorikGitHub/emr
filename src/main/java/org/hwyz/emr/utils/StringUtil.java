/**
 * org.vz.product.data.collect.util
 * @since : jdk 1.8
 */
package org.hwyz.emr.utils;



import java.io.IOException;
import java.io.StringWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.springframework.stereotype.Component;
import org.hwyz.emr.constant.XmlContant;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * @author Morik
 * @CreateTime 2017年12月4日 下午11:10:00
 * @version 1.0.0
 * @description 先提供转换成json 字符串和json对象的，后再补充
 */
@Component
public class StringUtil {

	/**
	 * 
	 * @description 对象转换为json字符串
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param obj
	 * @return
	 */
	public String toJsonString(Object obj) {
		return JSON.toJSONString(obj, true);
	}

	/**
	 * 
	 * @description 对象转换为json字符串,禁用循环引用
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param obj
	 * @return
	 */
	public String cycleListToString(Object obj) {
		return JSON.toJSONString(obj,
				SerializerFeature.DisableCircularReferenceDetect);
	}

	/**
	 * 
	 * @description 对象转换为List
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param obj
	 * @param clz
	 * @return
	 */
	public <T> List<T> toList(String obj, Class<T> clz) {
		return JSON.parseArray(obj, clz);
	}

	/**
	 * 
	 * @description json字符串转换为对象
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param str
	 * @return
	 */
	public JSONObject parseJSONObject(String str) {
		return JSON.parseObject(str);
	}

	/**
	 * 
	 * @description 字符串转换为日期yyyy-MM-dd HH:mm:ss
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param date
	 *            日期字符串
	 * @return 日期
	 */
	public Date stringToDate(String dateString, String formatModel) {
		SimpleDateFormat sdf = new SimpleDateFormat(formatModel);
		Date d = null;
		try {
			d = sdf.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return d;
	}

	public String dateToString(Date date, String formatModel) {
		SimpleDateFormat sdf = new SimpleDateFormat(formatModel);
		String dateString = sdf.format(date);
		return dateString;
	}

	/**
	 * 
	 * @description 截取最后个分隔符后面的内容，不包括分隔符
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param str
	 *            要处理的字符串
	 * @param sepa
	 *            分隔符
	 * @return
	 */
	public String substringAfterLast(String str, String sepa) {
		String rlt = StringUtils.substringAfterLast(str, sepa);
		return rlt;
	}

	/**
	 * 
	 * @description 统一标准得到的uuid
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @return
	 */
	public String uuid() {
		String uuid = UUID.randomUUID().toString();
		return uuid;
	}

	/**
	 * 
	 * @description 将list加个分隔符变成字符串
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param list
	 * @param separator
	 * @return
	 */
	public String listToString(List<?> list, String separator) {
		String rlt = StringUtils.join(list.toArray(), separator);
		return rlt;

	}

	/**
	 * 
	 * @description 某个字符串是否包含另一个字符串
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param str
	 * @param search
	 * @return
	 */
	public boolean contains(String str, String search) {
		return StringUtils.contains(str, search);
	}

	/**
	 * 
	 * @description 生成不重复的Long
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @return
	 */
	public long randomNoDuplicate() {
		return System.currentTimeMillis() / 1000 - 500;
	}

	/**
	 * 
	 * @description 某个字符串是否以某个字符串开头
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param str
	 * @param prefix
	 * @return
	 */
	public boolean startWith(String str, String prefix) {
		return StringUtils.startsWith(str, prefix);
	}

	public Map<String, String> assembleXml(Map<String, Object> map)
			throws IOException {
		Document doc = DocumentHelper.createDocument();
		Element root = doc.addElement(XmlContant.ROOT_ELEMENT);
		root.addAttribute(XmlContant.XML_XSI, XmlContant.XML_XSI_VALUE);
		root.addAttribute(XmlContant.XML_XSD, XmlContant.XML_XSD_VALUE);

		Element messages = root.addElement(XmlContant.MESSAGES);
		String queKey = null;
		String queVal = null;
		for (Entry<String, Object> e : map.entrySet()) {
			String key = e.getKey();
			String value = e.getValue().toString();
			if (!XmlContant.SEND_EVENT.equals(key)) {// send_queue是要发送的队列的名字
				Element msg = messages.addElement(XmlContant.MESSAGE);
				msg.addElement(XmlContant.KEY).setText(key);
				msg.addElement(XmlContant.VALUE).setText(value);
			} else {
				queKey = key;
				queVal = value;
			}

		}
		OutputFormat format = OutputFormat.createCompactFormat(); // createPrettyPrint()
																	// 层次格式化
		StringWriter writer = new StringWriter();
		XMLWriter output = new XMLWriter(writer, format);

		output.write(doc);
		writer.close();
		output.close();
		Map<String, String> rlt = new HashMap<String, String>();

		rlt.put(queKey, queVal);
		rlt.put(XmlContant.XML_KEY, writer.toString());

		return rlt;
	}

	/**
	 * 
	 * @description 将字符串数组变成List
	 * @author chenhuaijin
	 * @CreateTime 2017年9月14日 上午11:45:47
	 * @param str
	 * @return
	 */
	public List<String> arrayToList(String[] str) {
		return Arrays.asList(str);
	}

	/**
	 * 
	 * @description 截取sep1,sep2间的字符串
	 * @author Morik
	 * @CreateTime 2017年12月4日 下午11:10:00
	 * @version 1.0.0
	 * @param str
	 * @param tag
	 * @return
	 */
	public String substringBetween(String str, String sep1, String sep2) {
		return StringUtils.substringBetween(str, sep1, sep2);
	}

	public boolean stringIsNULL(String str) {
		if ("".equals(str) || str == null) {
			return true;
		}
		return false;
	}

}
