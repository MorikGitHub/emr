package org.hwyz.emr.domain;

import io.swagger.annotations.ApiModelProperty;

public class UPAndDown extends BaseEntity {
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "版本跟新标记",name="id")
	private int id;
	@ApiModelProperty(value = "大版本号",name="versionNo")
	private float versionNo;
	@ApiModelProperty(value = "版本标志",name="versionCode")
	private String versionCode;
	@ApiModelProperty(value = "版本名称",name="versionName")
	private String versionName;
	@ApiModelProperty(value = "版本存放目录",name="versionAddr")
	private String versionAddr;
	@ApiModelProperty(value = "版本更新时间",name="upDataTime")
	private String upDataTime;
	@ApiModelProperty(value = "版本分类",name="upDataTime")
	private byte versionSrc;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public float getVersionNo() {
		return versionNo;
	}
	public void setVersionNo(float versionNo) {
		this.versionNo = versionNo;
	}
	public String getVersionCode() {
		return versionCode;
	}
	public void setVersionCode(String versionCode) {
		this.versionCode = versionCode;
	}
	public String getVersionName() {
		return versionName;
	}
	public void setVersionName(String versionName) {
		this.versionName = versionName;
	}
	public String getVersionAddr() {
		return versionAddr;
	}
	public void setVersionAddr(String versionAddr) {
		this.versionAddr = versionAddr;
	}
	public String getUpDataTime() {
		return upDataTime;
	}
	public void setUpDataTime(String upDataTime) {
		this.upDataTime = upDataTime;
	}
	public byte getVersionSrc() {
		return versionSrc;
	}
	public void setVersionSrc(byte versionSrc) {
		this.versionSrc = versionSrc;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
