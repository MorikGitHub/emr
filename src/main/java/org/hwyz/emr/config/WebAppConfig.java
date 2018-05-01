package org.hwyz.emr.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebAppConfig extends WebMvcConfigurerAdapter{
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	 registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");//将所有根目录下的内容映射到static对应的目录下
        super.addResourceHandlers(registry);
    } 
}

