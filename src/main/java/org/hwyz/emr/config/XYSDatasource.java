/**
 * org.vz.product.data.collect.sysConfig
 * @since : jdk 1.8
 */
package org.hwyz.emr.config;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.hwyz.emr.utils.LogUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.alibaba.druid.pool.DruidDataSource;

/**
 * @author      Morik
 * @CreateTime  2017年7月22日 下午3:55:45
 * @version     1.0.0
 * @description 系统配置的VzDatasource数据源，用druid的连接池
 */
@Configuration
@EnableConfigurationProperties({DatasourceProperties.class,NeteaseProperties.class}) 
public class XYSDatasource {
	@Autowired
	DatasourceProperties datasourceProp;

	@Autowired
	NeteaseProperties neteaseProperties;
	
	private LogUtil log = new LogUtil(getClass());

	@Bean(initMethod="init",destroyMethod="close")
	@Primary
	public DataSource dataSource(){
        DruidDataSource datasource = new DruidDataSource();  
        datasource.setUrl(datasourceProp.getUrl());  
        datasource.setUsername(datasourceProp.getUsername());  
        datasource.setPassword(datasourceProp.getPassword());  
        datasource.setDriverClassName(datasourceProp.getDriverClassName());  
          
        //configuration  
        datasource.setInitialSize(datasourceProp.getInitialSize());  
        datasource.setMinIdle(datasourceProp.getMinIdle());  
        datasource.setMaxActive(datasourceProp.getMaxActive());  
        datasource.setMaxWait(datasourceProp.getMaxWait());  
        datasource.setTimeBetweenEvictionRunsMillis(datasourceProp.getTimeBetweenEvictionRunsMillis());  
        datasource.setMinEvictableIdleTimeMillis(datasourceProp.getMinEvictableIdleTimeMillis());  
        datasource.setValidationQuery(datasourceProp.getValidationQuery());  
        datasource.setTestWhileIdle(datasourceProp.isTestWhileIdle());  
        datasource.setTestOnBorrow(datasourceProp.isTestOnBorrow());  
        datasource.setTestOnReturn(datasourceProp.isTestOnReturn());  
        datasource.setPoolPreparedStatements(datasourceProp.isPoolPreparedStatements());  
        datasource.setMaxPoolPreparedStatementPerConnectionSize(datasourceProp.getMaxPoolPreparedStatementPerConnectionSize());
        try {  
            datasource.setFilters(datasourceProp.getFilters());  
        } catch (SQLException e) {  
        	log.error("druid初始加载配置文件出错，信息为:", e);  
        }  
        
          
        return datasource; 
		
	}

	


}