/**
 * org.vz.product.data.collect.dao.impl
 * @since : jdk 1.8
 */
package org.hwyz.emr.dao.impl;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.beetl.sql.core.SQLManager;
import org.beetl.sql.core.db.KeyHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.hwyz.emr.dao.BaseDao;


/**
 * @author      morik is Yongxu.Wang 测试
 * @CreateTime  2017年12月04日 10:54:27
 * @version     1.0.0
 * @param <T> 泛型
 * @description 
 */
public class BaseDaoImpl<T> implements BaseDao<T>{
	private Class<T> clazz;
	@Autowired
	SQLManager sqlManager;//sqlManager是框架sqlManagerFacotryBean初始化交与spring的
	
//	protected LogUtil logger ;
	
	

	/**
	 * 
	 */
	@SuppressWarnings("unchecked")
	public BaseDaoImpl() {
//		logger  = new LogUtil(getClass());
		clazz = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#all()
	 */
	@Override
	public List<T> all() {
		return sqlManager.all(clazz);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#all(int, int)
	 */
	@Override
	public List<T> all(int start, int size) {
		return sqlManager.all(clazz, start, size);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#allCount()
	 */
	@Override
	public long allCount() {
		return sqlManager.allCount(clazz);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#deleteById(java.lang.Object)
	 */
	@Override
	public int deleteById(Object pkValue) {
		return sqlManager.deleteById(clazz, pkValue);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#execute(java.lang.String, java.lang.Object[])
	 */
	@Override
	public List<T> execute(String arg0, Object... arg1) {
		
		return sqlManager.execute(arg0, clazz, arg1);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#executeUpdate(java.lang.String, java.lang.Object[])
	 */
	@Override
	public int executeUpdate(String arg0, Object... arg1) {
		
		return sqlManager.executeUpdate(arg0, arg1);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#getSQLManager()
	 */
	@Override
	public SQLManager getSQLManager() {
		return SQLManager.getSQLManagerByName("sqlManager");
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#insert(java.lang.Object)
	 */
	@Override
	public void insert(T paras) {
		sqlManager.insert(paras);
		
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#insert(java.lang.Object, boolean)
	 */
	@Override
	public void insert(T paras, boolean autoDbAssignKey) {
		sqlManager.insert(paras, autoDbAssignKey);
		
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#insertBatch(java.util.List)
	 */
	@Override
	public void insertBatch(List<T> list) {
		sqlManager.insertBatch(clazz, list);
		
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#insertReturnKey(java.lang.Object)
	 */
	@Override
	public KeyHolder insertReturnKey(T arg0) {
		int key = sqlManager.insert(clazz, arg0);
		KeyHolder keyHolder = new KeyHolder();
		keyHolder.setKey(key);
		return keyHolder;
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#insertTemplate(java.lang.Object)
	 */
	@Override
	public void insertTemplate(T paras) {
		sqlManager.insertTemplate(paras);
		
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#insertTemplate(java.lang.Object, boolean)
	 */
	@Override
	public void insertTemplate(T t, boolean autoDbAssignKey) {
		sqlManager.insertTemplate(t, autoDbAssignKey);
		
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#lock(java.lang.Object)
	 */
	@Override
	public T lock(Object pk) {
		return sqlManager.lock(clazz, pk);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#single(java.lang.Object)
	 */
	@Override
	public T single(Object pk) {
		return sqlManager.single(clazz, pk);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#template(java.lang.Object)
	 */
	@Override
	public List<T> template(T t) {
		return sqlManager.template(t);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#template(java.lang.Object, int, int)
	 */
	@Override
	public List<T> template(T t, int start, int size) {
		return sqlManager.template(t, start, size);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#templateCount(java.lang.Object)
	 */
	@Override
	public long templateCount(T t) {
		return sqlManager.templateCount(t);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#templateOne(java.lang.Object)
	 */
	@SuppressWarnings("hiding")
	@Override
	public <T> T templateOne(T t) {
		return sqlManager.templateOne(t);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#unique(java.lang.Object)
	 */
	@Override
	public T unique(Object pk) {
		return sqlManager.unique(clazz, pk);
	}

	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#updateById(java.lang.Object)
	 */
	@Override
	public int updateById(T obj) {
		return sqlManager.updateById(obj);
	}
	
	/* (non-Javadoc)
	 * @see org.beetl.sql.core.mapper.BaseMapper#updateTemplateById(java.lang.Object)
	 */
	@Override
	public int updateTemplateById(T obj) {
		return sqlManager.updateTemplateById(obj);
	}


	

}
