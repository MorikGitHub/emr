/**
 * org.hwyz.emr.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.hwyz.emr.dao.${className}Dao;
import org.hwyz.emr.domain.${className};
import org.hwyz.emr.service.${className}Service;

/**
 * @author      ${author}
 * @CreateTime  ${date}
 * @version     1.0.0
 * @description TODO
 */
@Service
public class ${className}ServiceImpl implements ${className}Service{
	@Autowired
	${className}Dao ${lower}Dao;
}
