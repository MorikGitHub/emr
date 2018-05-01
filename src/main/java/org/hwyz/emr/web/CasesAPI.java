package org.hwyz.emr.web;

import com.google.gson.Gson;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.hwyz.emr.domain.UpdataCasesText;
import org.hwyz.emr.domain.info.CasesInfo;
import org.hwyz.emr.domain.result.*;
import org.hwyz.emr.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import springfox.documentation.spring.web.json.Json;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@Controller
@RequestMapping("/case")
public class CasesAPI {
    @Autowired
    AddCasesService addCasesService;
    @Autowired
    DelCasesService delCasesService;
    @Autowired
    QueryCasesService queryCasesService;
    @Autowired
    DelCasesPictureService delCasesPictureService;
    @Autowired
    UpdataCasesTextService updataCasesTextService;

    @ApiImplicitParams({@ApiImplicitParam(paramType = "query", dataType = "String", name = "casesInfo", value = "病例json对象字符串", required = true)})
    @ApiOperation(value = "病例文字修改", tags = {"病例"}, notes = "修改病例存文本")
    @RequestMapping(value = "/setCasesText", method = RequestMethod.POST)
    @ResponseBody
    public RegisterResult setCasesText(@RequestParam(value = "casesInfo", defaultValue = "-1") String casesInfo) {
        return updataCasesTextService.updata(new Gson().fromJson(casesInfo,UpdataCasesText.class));
    }

    @ApiImplicitParams({@ApiImplicitParam(paramType = "query", dataType = "long", name = "patientId", value = "病人id", required = true)})
    @ApiOperation(value = "病例查询", tags = {"病例"}, notes = "查询病例")
    @RequestMapping(value = "/getCases", method = RequestMethod.POST)
    @ResponseBody
    public GetCasesResult getCases(@RequestParam(value = "patientId", defaultValue = "-1") long patientId) {
        return queryCasesService.getCases(patientId);
    }

    @ApiImplicitParams({@ApiImplicitParam(paramType = "query", dataType = "long", name = "pictureId", value = "图片id", required = true)})
    @ApiOperation(value = "图片删除", tags = {"病例"}, notes = "删除病例图片标记")
    @RequestMapping(value = "/delCasesPicture", method = RequestMethod.POST)
    @ResponseBody
    public ChangePasswordResult delCasesPicture(@RequestParam(value = "patientId", defaultValue = "-1") long pictureId) {
        return delCasesPictureService.delCasePicture(pictureId);
    }
    /**
     * 病例删除标记
     *
     * @param casesId 病例id
     * @return
     */
    @ApiImplicitParams({@ApiImplicitParam(paramType = "query", dataType = "long", name = "casesId", value = "病例id", required = true)})
    @ApiOperation(value = "病例标记删除", tags = {"病例"}, notes = "删除病例")
    @RequestMapping(value = "/delCases", method = RequestMethod.POST)
    @ResponseBody
    public AddCasesResult delCases(@RequestParam(value = "casesId", defaultValue = "-1") long casesId) {
        return delCasesService.del(casesId);
    }

    /**
     * 表单提交 添加文字和图片信息
     *
     * @param request
     * @return
     */
    @ApiOperation(value = "病例图文混传：tocken->String + data->json + 图片->file", tags = {"上传下载"}, notes = "图文混合表单提交")
    @RequestMapping(value = "/addCases", method = RequestMethod.POST)
    @ResponseBody
    public AddCasesResult addCases(HttpServletRequest request) {
        MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String tocken = params.getParameter("tocken");
        String data = params.getParameter("data");
        CasesInfo gi = new Gson().fromJson(data, CasesInfo.class);
        return addCasesService.addCases(gi, files);
    }

    /**
     * 表单提交 添加用户病例文字信息
     *
     * @param request
     * @return
     */
    @ApiOperation(value = "病例文字表单提交：data->json", tags = {"上传下载"}, notes = "文字表单提交")
    @RequestMapping(value = "/addCasesText", method = RequestMethod.POST)
    @ResponseBody
    public AddCasesTextResult addCasesText(HttpServletRequest request) {
        AddCasesTextResult actr = new AddCasesTextResult();
        MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
        String tocken = params.getParameter("tocken");
        String data = params.getParameter("data");
        CasesInfo gi = new Gson().fromJson(data, CasesInfo.class);
        actr.result = addCasesService.addCasesText(gi);
        actr.status = 1;
        actr.msg = "操作成功！！！";
        return actr;
    }

    /**
     * 表单提交 添加用户病例图片信息
     *
     * @param request
     * @return
     */
    @ApiOperation(value = "病例图片表单提交：图片->file", tags = {"上传下载"}, notes = "图片表单提交")
    @RequestMapping(value = "/addCasesPicture", method = RequestMethod.POST)
    @ResponseBody
    public AddCasesResult addCasesPicture(HttpServletRequest request) {
        AddCasesResult acr = new AddCasesResult();
        MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String tocken = params.getParameter("tocken");
        long patientId = Long.parseLong(params.getParameter("patientId"));
        long casesId = Long.parseLong(params.getParameter("casesId"));

        if (addCasesService.addCasesPicture(patientId, casesId, files)) {
            acr.status = 1;
            acr.msg = "上传成功！！！";
        } else {
            acr.status = -1;
            acr.msg = "上传失败！！！";
        }
        return acr;
    }


}

