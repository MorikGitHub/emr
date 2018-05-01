package org.hwyz.emr;

import java.io.IOException;

import freemarker.template.TemplateException;

public class Run {
	public static void main(String[] args) throws IOException, TemplateException {
		new GenCode().genSourceCode("AddAdvertisings", "morik is Yongxu.Wang 广告添加");
	}
}
