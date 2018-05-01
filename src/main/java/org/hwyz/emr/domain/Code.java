package org.hwyz.emr.domain;
/**
 * 
 * @author morik 
 * 数据库 验证码
 *
 */
public class Code extends BaseEntity{
	private static final long serialVersionUID = 1L;
	private long id;
	private String securityCode;
	private String  phoneNo;
	private String createTime;
	private long userId;
	private int type;
	private int orUse;
	
	

	public int getOrUse() {
		return orUse;
	}
	public void setOrUse(int orUse) {
		this.orUse = orUse;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getSecurityCode() {
		return securityCode;
	}
	public void setSecurityCode(String securityCode) {
		this.securityCode = securityCode;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
