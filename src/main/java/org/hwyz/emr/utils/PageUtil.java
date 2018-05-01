/**
 * org.vz.product.collect.maintain.util
 * @since : jdk 1.8
 */
package org.hwyz.emr.utils;

import java.io.Serializable;
import java.util.List;

/**
 * @author Morik
 * @CreateTime 2017年12月4日 下午11:10:00
 * @version 1.0.0
 * @description 分页工具类
 */
public class PageUtil implements Serializable {
	private static final long serialVersionUID = 1L;
	// 传参或指定
	private int pageNumber = 1; // 当前页号, 采用自然数计数 1,2,3,...
	private int pageSize = 20; // 页面大小:一个页面显示多少个数据默认20条

	// 需要从数据库中查找出
	private long rowCount;// 数据总数：一共有多少个数据
	private List<?> data;// 数据
	private List<?> colName;
	// 可以根据上面属性：pageNumber,pageSize,rowCount计算出
	private int pageCount = 1; // 页面总数
	private int startRow;// 当前页面开始行, 第一行是0行
	private Object query;// 保存查询条件

	/**
	 * @return the data
	 */
	public List<?> getData() {
		return data;
	}

	/**
	 * @param data
	 *            the data to set
	 */
	public void setData(List<?> data) {
		this.data = data;
	}

	/**
	 * @return the colName
	 */
	public List<?> getColName() {
		return colName;
	}

	/**
	 * @param colName
	 *            the colName to set
	 */
	public void setColName(List<?> colName) {
		this.colName = colName;
	}

	/**
	 * 
	 */
	public PageUtil() {
		super();
	}

	/**
	 * @param pageNumber
	 * @param pageSize
	 */
	public PageUtil(int pageNumber, int pageSize) {
		if (pageNumber <= 0) {
			pageNumber = 1;
		}
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
		this.startRow = (pageNumber - 1) * pageSize;
	}

	/**
	 * @param pageNumber
	 * @param pageSize
	 * @param rowCount
	 */
	public PageUtil(int pageNumber, int pageSize, long rowCount) {
		if (pageNumber <= 0) {
			pageNumber = 1;
		}
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
		this.rowCount = rowCount;
		this.startRow = (pageNumber - 1) * pageSize;
		if (rowCount % this.pageSize == 0) {
			this.pageCount = (int) (rowCount / this.pageSize);
		} else {
			this.pageCount = (int) (rowCount / this.pageSize) + 1;
		}
	}

	/**
	 * @return the pageNumber
	 */
	public int getPageNumber() {
		return pageNumber;
	}

	/**
	 * @param pageNumber
	 *            the pageNumber to set
	 */
	public void setPageNumber(int pageNumber) {
		if (pageNumber <= 0) {
			pageNumber = 1;
		}
		this.pageNumber = pageNumber;
		this.startRow = (pageNumber - 1) * pageSize;
	}

	/**
	 * @return the pageSize
	 */
	public int getPageSize() {
		return pageSize;
	}

	/**
	 * @param pageSize
	 *            the pageSize to set
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
		this.startRow = (pageNumber - 1) * pageSize;
	}

	/**
	 * @return the rowCount
	 */
	public long getRowCount() {
		return rowCount;
	}

	/**
	 * @param rowCount
	 *            the rowCount to set
	 */
	public void setRowCount(long rowCount) {
		this.rowCount = rowCount;
		if (rowCount % this.pageSize == 0) {
			this.pageCount = (int) (rowCount / this.pageSize);
		} else {
			this.pageCount = (int) (rowCount / this.pageSize) + 1;
		}

	}

	/**
	 * @return the pageCount
	 */
	public int getPageCount() {
		return pageCount;
	}

	/**
	 * @param pageCount
	 *            the pageCount to set
	 */
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;

	}

	/**
	 * @return the startRow
	 */
	public int getStartRow() {
		return startRow;
	}

	/**
	 * @param startRow
	 *            the startRow to set
	 */
	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}

	/**
	 * @return the query
	 */
	public Object getQuery() {
		return query;
	}

	/**
	 * @param query
	 *            the query to set
	 */
	public void setQuery(Object query) {
		this.query = query;
	}

}
