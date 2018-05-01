package org.hwyz.emr.web;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.hwyz.emr.domain.result.*;
import org.hwyz.emr.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/case")
public class AdvertisingAPI {
    @Autowired
    AdvertisingsService addAdvertisingsService;


    @ApiImplicitParams({@ApiImplicitParam(paramType = "query", dataType = "long", name = "roleId", value = "角色ID", required = true), @ApiImplicitParam(paramType = "query", dataType = "String", name = "url", value = "点击跳转地址", required = true), @ApiImplicitParam(paramType = "query", dataType = "int", name = "type", value = "1:image 2:excel 3:word  4:wpf 5:其他 ", required = true)})

    @ApiOperation(value = "单一添加app banner广告", tags = {"广告"}, notes = "广告添加")
    @RequestMapping(value = "/addAdvertising", method = RequestMethod.POST)
    @ResponseBody
    public RegisterResult addAdvertising(@RequestParam(value = "roleId", defaultValue = "-1") long roleId, @RequestParam(value = "url", defaultValue = "-1") String url, @RequestParam(value = "type", defaultValue = "-1") String type, @RequestParam("file") MultipartFile file) {
        RegisterResult re = new RegisterResult();
        if (addAdvertisingsService.addAdvertising(roleId, file, url)) {
            re.msg = "添加成功";
            re.status = 1;
        } else {
            re.msg = "添加失败";
            re.status = -1;
        }
        return re;
    }

    @ApiImplicitParams({@ApiImplicitParam(paramType = "query", dataType = "long", name = "roleId", value = "角色ID", required = true)})
    @ApiOperation(value = "获取广告", tags = {"广告"}, notes = "广告获取")
    @RequestMapping(value = "/getAdvertising", method = RequestMethod.POST)
    @ResponseBody
    public GetAdverResult getAdvertising(@RequestParam(value = "roleId", defaultValue = "-1") long roleId) {
        return addAdvertisingsService.queryAdvertising(roleId);
    }
}

