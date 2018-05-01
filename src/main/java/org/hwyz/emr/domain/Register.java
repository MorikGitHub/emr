package org.hwyz.emr.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="用户实例",description="用户资料")
public class Register extends BaseEntity {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "用户唯一标识",name="id",example="1")
	private long id;
	@ApiModelProperty(value = "推送标识",name="userId",example="1")
	private long userId;
	@ApiModelProperty(value = "用户名",name="userName",example="张新明")
	private String userName;
	@ApiModelProperty(value = "用户头像",name="userIcon",example="http://.....*.jpg")
	private String userIcon;
	@ApiModelProperty(value = "登陆名",name="account",example="admin")
	private String account;
	@ApiModelProperty(value = "密码",name="password",example="DFD8798KJ78")
	private String password;
	@ApiModelProperty(value = "账号",name="phoneNo",example="185******89")
	private String phoneNo;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserIcon() {
		return userIcon;
	}
	public void setUserIcon(String userIcon) {
		this.userIcon = userIcon;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
