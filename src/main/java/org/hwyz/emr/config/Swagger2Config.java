package org.hwyz.emr.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
/**
 * 
 * @author Morik
 * 生成自动测试界面
 *
 */
@Configuration
@EnableSwagger2
public class Swagger2Config  extends WebMvcConfigurerAdapter{
	/**
     * 这个地方要重新注入一下资源文件，不然不会注入资源的，也没有注入requestHandlerMappping,相当于xml配置的
     *  <!--swagger资源配置-->
     *  <mvc:resources location="classpath:/META-INF/resources/" mapping="swagger-ui.html"/>
     *  <mvc:resources location="classpath:/META-INF/resources/webjars/" mapping="/webjars/**"/>
     *  不知道为什么，这也是spring boot的一个缺点（菜鸟觉得的）
     * @param registry
     */
     @Override
     public void addResourceHandlers(ResourceHandlerRegistry registry) {
         registry.addResourceHandler("swagger-ui.html")
         .addResourceLocations("classpath:/META-INF/resources/");
         registry.addResourceHandler("/webjars*")
         .addResourceLocations("classpath:/META-INF/resources/webjars/");
     }
	@Bean
	public Docket createRestApi() {
		return new Docket(DocumentationType.SWAGGER_12)
				.apiInfo(apiInfo())
				.select()
				.apis(RequestHandlerSelectors.basePackage("org.hwyz.emr"))    //接口暴露的包名
				.paths(PathSelectors.any())
				.build();
	}
	
	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("华沃医助移动开发平台电子病历图片服务器api接口文档")
				.description("如有疑问请登陆官网，http://www.scxys.com/web/guest/about")
				.termsOfServiceUrl("http://www.baiud.com/")
				.version("1.0")
				.build();
	}
}