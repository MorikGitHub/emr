package org.hwyz.emr.domain.info;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="用户实例",description="用户资料")
public class UserInfo extends BaseInfo{
	private static final long serialVersionUID = 1L;
	@ApiModelProperty(value = "用户唯一标识",name="userId",example="001")
	public int userId;
//	@ApiModelProperty(value = "用户加密密码",name="userPwd",example="KGYIGU76GHJG")
//	public String userPwd;
	@ApiModelProperty(value = "用户登录名",name="userName",example="morik")
	public String userName;
	@ApiModelProperty(value = "登陆成功生成登陆令牌",name="token",example="GDGRILHRG56HG90BET.")
	public String token;
	
	@ApiModelProperty(value = "头像地址",name="portrait",example="http://www.baidu.touxiang.png")
	public String portrait;
	@ApiModelProperty(value = "用户真实名",name="name",example="康达")
	public String name;
	@ApiModelProperty(value = "用户工作籍贯",name="nativeplace",example="颍川")
	public String nativeplace;
	@ApiModelProperty(value = "研究所名称",name="unitname",example="XXX研究所")
	public String unitname;
	@ApiModelProperty(value = "办公地址",name="offices",example="XXX中心")
	public String offices;
	@ApiModelProperty(value = "用户登录名",name="post",example="主任")
	public String post;
}
