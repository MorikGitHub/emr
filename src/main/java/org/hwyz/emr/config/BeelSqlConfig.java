/**
 * org.vz.product.data.collect.sysConfig
 * @since : jdk 1.8
 */
package org.hwyz.emr.config;


import javax.sql.DataSource;

import org.beetl.sql.core.ClasspathLoader;
import org.beetl.sql.core.Interceptor;
import org.beetl.sql.core.UnderlinedNameConversion;
import org.beetl.sql.core.db.MySqlStyle;
import org.beetl.sql.core.db.OracleStyle;
import org.beetl.sql.core.db.SqlServerStyle;
import org.beetl.sql.ext.DebugInterceptor;
import org.beetl.sql.ext.spring4.BeetlSqlDataSource;
import org.beetl.sql.ext.spring4.BeetlSqlScannerConfigurer;
import org.beetl.sql.ext.spring4.SqlManagerFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.hwyz.emr.constant.BeetlSqlConstant;

/**
 * @author      Morik
 * @CreateTime  2017年7月24日 上午12:17:41
 * @version     1.0.0
 * @description 持久化框架beetlsql的一些设置
 */
@Configuration
public class BeelSqlConfig {

	@Bean(name = "beetlSqlScannerConfigurer")
	public BeetlSqlScannerConfigurer beetlSqlScannerConfigurer() {
		BeetlSqlProperties beetlSqlProp = new BeetlSqlProperties();
		beetlSqlProp.setBasePackage(BeetlSqlConstant.BASE_PACKAGE);
		beetlSqlProp.setSuffix(BeetlSqlConstant.SUFFIX);
		BeetlSqlScannerConfigurer config = new BeetlSqlScannerConfigurer();
		config.setBasePackage(beetlSqlProp.getBasePackage());
		config.setDaoSuffix(beetlSqlProp.getSuffix());
		config.setSqlManagerFactoryBeanName("sqlManagerFactoryBean");
		return config;
	}
	
	/**
	 * 
	 * beetlSql 扫描SQL模版. <br/>
	 */
	@Bean(name = "sqlManagerFactoryBean")
	@Primary
	public SqlManagerFactoryBean sqlManagerFactoryBean(@Autowired DataSource datasource) {
		
		SqlManagerFactoryBean factory = new SqlManagerFactoryBean();

		BeetlSqlDataSource source = new BeetlSqlDataSource();
		source.setMasterSource(datasource);
		factory.setCs(source);
		String dbStyle = BeetlSqlConstant.DB_STYLE.toLowerCase();
		if("mysql".equals(dbStyle)){
			factory.setDbStyle(new MySqlStyle());
		}else if("sqlserver".equals(dbStyle)){
			factory.setDbStyle(new SqlServerStyle());
		}else if("oracle".equals(dbStyle)){
			factory.setDbStyle(new OracleStyle());
		}
		
			
		factory.setInterceptors(new Interceptor[] { new DebugInterceptor() });
		factory.setNc(new UnderlinedNameConversion());
	
		factory.setSqlLoader(new ClasspathLoader(BeetlSqlConstant.ROOT));
		return factory;
	}
    @Bean(name="txManager")  
    public DataSourceTransactionManager dataSourceTransactionManager(@Autowired DataSource datasource) {  
    	DataSourceTransactionManager dsm = new DataSourceTransactionManager();
    	dsm.setDataSource(datasource);
    	return dsm;
    }



}
