package org.hwyz.emr;

/**
 * @since : jdk 1.8
 */


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;

/**
 * @author      Morik
 * @CreateTime  2017年7月30日 上午11:45:12
 * @version     1.0.0
 * @description TODO
 */
public class GenCode {
	
	public void genSourceCode(String className,String author) throws IOException, TemplateException{
		

		Configuration cfg = configurationSet("src/test/java/");
		
		Template tempDao = cfg.getTemplate("dao.ftl");
		Template tempDaoImp = cfg.getTemplate("daoImpl.ftl");
		Template tempService = cfg.getTemplate("service.ftl");
		Template tempServiceImp = cfg.getTemplate("serviceImpl.ftl");
		
        
        Map<String, Object> root = new HashMap<String, Object>();
        root.put("className", className);
        root.put("author", author);
        root.put("lower", className.substring(0, 1).toLowerCase()+className.substring(1));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        Date date = new Date();
        
        root.put("date", formatter.format(date));
       

		String step2 = getClass().getPackage().getName().replace(".", "/");
		String middle = "src/test/java/";
		String usrDir = System.getProperty("user.dir") + "/";
		String templateDir = usrDir + middle + step2;
		
        File dir = new File(templateDir);
        OutputStream fos = new  FileOutputStream( new File(dir+"/Dao", className+"Dao.java")); //java文件的生成目录   
        Writer out = new OutputStreamWriter(fos);
        tempDao.process(root, out);

        fos.flush();  
        fos.close();
        
       
        fos = new  FileOutputStream( new File(dir+"/dao/impl", className+"DaoImpl.java")); //java文件的生成目录   
        out = new OutputStreamWriter(fos);
        tempDaoImp.process(root, out);

        fos.flush();  
        fos.close();
        
        fos = new  FileOutputStream( new File(dir+"/Service", className+"Service.java")); //java文件的生成目录   
        out = new OutputStreamWriter(fos);
        tempService.process(root, out);

        fos.flush();  
        fos.close();
        
        fos = new  FileOutputStream( new File(dir+"/service/impl", className+"ServiceImpl.java")); //java文件的生成目录   
        out = new OutputStreamWriter(fos);
        tempServiceImp.process(root, out);

        fos.flush();  
        fos.close();
		
        
        
        
        
        System.out.println("gen code success!");
	}
	
	public Configuration configurationSet(String rPath) throws IOException{
		Configuration cfg = new Configuration(Configuration.VERSION_2_3_26);

		String step2 = getClass().getPackage().getName().replace(".", "/");
		String usrDir = System.getProperty("user.dir") + "/";
		String middle = "src/test/java/";
		System.out.println(usrDir + middle + step2);
		String templateDir = usrDir + middle + step2;
		File file = new File(templateDir);
		cfg.setDirectoryForTemplateLoading(file);
		cfg.setDefaultEncoding("UTF-8");
		cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
		
		return cfg;
	}
	
	public void flusIntoFile(String templateDir,String suffix,String className,Template tem,Map<String,Object> root) throws TemplateException, IOException{
        File dir = new File(templateDir);
        OutputStream fos = new  FileOutputStream( new File(dir, className+suffix)); //java文件的生成目录   
        Writer out = new OutputStreamWriter(fos);
        tem.process(root, out);

        fos.flush();  
        fos.close();
	}
}
