package org.hwyz.emr.web;

import org.springframework.stereotype.Controller;

import java.io.FileNotFoundException;
import java.io.IOException;

@Controller
//@RequestMapping("/upOrDown")
public class BasisAPI {
//    @Autowired
//    UpOrDownLode upOrDownLode;
//    @Autowired
//    UPAndDownService uPAndDownService;
//    @Autowired
//    StringUtil stringUtil;
//    @Autowired
//    LogUtil logUtil;

    /**
     * 下载更新
     *
     * @param fileUrl
     * @param response
     * @return
     * @throws IOException
     */
//    @ApiOperation(value = "指定路径下载文件", tags = {"上传下载"}, notes = "文件下载")
//    @RequestMapping(value = "/downLoad", method = RequestMethod.GET)
//    @ApiImplicitParams({@ApiImplicitParam(paramType = "query", dataType = "String", name = "fileUrl", value = "文件所在服务器地址", required = true)})
//    @ResponseBody
//    public byte[] downLoad(@RequestParam(value = "fileUrl", defaultValue = "-1") String fileUrl, HttpServletResponse response) throws IOException {
//        return uPAndDownService.downLode(response, fileUrl);
//    }

    /**
     * 上传应用
     *
     * @param multipartFile
     * @return
     * @throws FileNotFoundException
     */
//    @ApiImplicitParams({
//            @ApiImplicitParam(paramType = "query", dataType = "byte", name = "versionSrc", value = "app 类型  1 Android  0 苹果", required = true),
//            @ApiImplicitParam(paramType = "query", dataType = "float", name = "versionNo", value = "大的版本号如 1.0", required = true),
//            @ApiImplicitParam(paramType = "query", dataType = "String", name = "versionCode", value = "版本标识如  1.0.1", required = true)})
//    @ApiOperation(value = "图片上传", tags = {"上传下载"}, notes = "文件上传")
//    @RequestMapping(value = "/upLoad", method = RequestMethod.POST)
//    @ResponseBody
//    public BaseResult upLoad(
//            @RequestParam("file") MultipartFile multipartFile,
//            @RequestParam(value = "versionSrc", defaultValue = "1") byte versionSrc,
//            @RequestParam(value = "versionNo", defaultValue = "1.0") float versionNo,
//            @RequestParam(value = "versionCode", defaultValue = "1.0.1") String versionCode)
//            throws FileNotFoundException {
//        return uPAndDownService.updata(multipartFile, versionSrc, versionNo,
//                versionCode);
//    }

    /**
     * 版本检测
     *
     * @param versionSrc
     * @return
     * @throws FileNotFoundException
     */
//    @ApiImplicitParams({@ApiImplicitParam(paramType = "query", dataType = "byte", name = "versionSrc", value = "app 类型  1 Android  0 苹果", required = true)})
//    @ApiOperation(value = "图片检测", tags = {"上传下载"}, notes = "图片检测")
//    @RequestMapping(value = "/getVersion", method = RequestMethod.POST)
//    @ResponseBody
//    public VersionResult getVersion(
//            @RequestParam(value = "versionSrc", defaultValue = "1") byte versionSrc)
//            throws FileNotFoundException {
//        return uPAndDownService.getVersion(versionSrc);
//    }


    /**
     * @param request
     */
    //多文件上传
//    @RequestMapping(value = "/mixedStream", method = RequestMethod.POST)
//    @ResponseBody
//    public String updataLoding(HttpServletRequest request) {
//        MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
//        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
//        String name = params.getParameter("data");
//        System.out.println("data:" + name);
//        String id = params.getParameter("tocken");
//        System.out.println("tocken:" + id);
//        MultipartFile file = null;
//        BufferedOutputStream stream = null;
//
//        for (int i = 0; i < files.size(); ++i) {
//            file = files.get(i);
//            if (!file.isEmpty()) {
//                try {
//                    file.getOriginalFilename();
//                    file.getName();
//                    System.out.println("fileName:" + file.getName() + "tttt" + file.getOriginalFilename());
//                    byte[] bytes = file.getBytes();
//                    stream = new BufferedOutputStream(new FileOutputStream(
//                            new File(file.getOriginalFilename())));
//                    stream.write(bytes);
//                    stream.close();
//                } catch (Exception e) {
//                    return "You failed to upload " + i + " => " + e.getMessage();
//                }
//            } else {
//                return "You failed to upload " + i + " because the file was empty.";
//            }
//        }
//        return "ok";
//    }
}

