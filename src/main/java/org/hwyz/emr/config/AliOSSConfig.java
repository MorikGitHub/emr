package org.hwyz.emr.config;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Date;

import com.aliyun.oss.model.PutObjectResult;
import org.springframework.context.annotation.Configuration;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.OSSObjectSummary;
import com.aliyun.oss.model.ObjectListing;

/**
 * @author Morik 阿里云资源服务器配置
 */
@Configuration
public class AliOSSConfig {

    // 创建ClientConfiguration实例
    // ClientConfiguration conf = new ClientConfiguration();
    // public OSSClient getClient() {
    // 设置OSSClient使用的最大连接数，默认1024
    // conf.setMaxConnections(200);
    // 设置请求超时时间，默认50秒
    // conf.setSocketTimeout(10000);
    // 设置失败请求重试次数，默认3次
    // conf.setMaxErrorRetry(5);
    // 创建OSSClient实例
    // client = new OSSClient(endpoint, accessKeyId, accessKeySecret, conf);
    // return client;
    // }

    public String getUrl(String bucketName, String fileName, Date date) {
        // endpoint以杭州为例，其它region请按实际情况填写
        String endpoint = "http://oss-cn-beijing.aliyuncs.com/";
        // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用RAM子账号进行API访问或日常运维，请登录
        // https://ram.console.aliyun.com 创建
        String accessKeyId = "LTAIZMstyhUpgq19";
        String accessKeySecret = "kOy0rTL5EH1x7kjNoRfe178gSjhWPY";
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        // 设置URL过期时间为1小时
//        Date expiration = new Date(new Date().getTime() + 3600 * 1000);
        // 生成URL
        URL url = client.generatePresignedUrl(bucketName, fileName, date);
        return url + "";
    }

    public PutObjectResult upLoding(String bucketName, String fileName, InputStream data) {
        // endpoint以杭州为例，其它region请按实际情况填写
        String endpoint = "http://oss-cn-beijing.aliyuncs.com/";
        // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用RAM子账号进行API访问或日常运维，请登录
        // https://ram.console.aliyun.com 创建
        String accessKeyId = "LTAIZMstyhUpgq19";
        String accessKeySecret = "kOy0rTL5EH1x7kjNoRfe178gSjhWPY";
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        PutObjectResult re = client.putObject(bucketName, fileName, data);
        client.shutdown();
        return re;
    }

    public void downLoding(String bucketName, String fileName) throws IOException {
        // endpoint以杭州为例，其它region请按实际情况填写
        String endpoint = "http://oss-cn-beijing.aliyuncs.com/";
        // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用RAM子账号进行API访问或日常运维，请登录
        // https://ram.console.aliyun.com 创建
        String accessKeyId = "LTAIZMstyhUpgq19";
        String accessKeySecret = "kOy0rTL5EH1x7kjNoRfe178gSjhWPY";
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        OSSObject ossObject = client.getObject(bucketName, fileName);
        InputStream content = ossObject.getObjectContent();
        if (content != null) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(content));
            while (true) {
                String line = reader.readLine();
                if (line == null) break;
                System.out.println("\n" + line);
            }
            content.close();
        }
        client.shutdown();
    }

    public void getSpassSize() {
        // endpoint以杭州为例，其它region请按实际情况填写
        String endpoint = "http://oss-cn-beijing.aliyuncs.com/";
        // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用RAM子账号进行API访问或日常运维，请登录
        // https://ram.console.aliyun.com 创建
        String accessKeyId = "LTAIZMstyhUpgq19";
        String accessKeySecret = "kOy0rTL5EH1x7kjNoRfe178gSjhWPY";
        OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ObjectListing objectListing = client.listObjects("<bucketName>");
        for (OSSObjectSummary objectSummary : objectListing.getObjectSummaries()) {
            System.out.println(" - " + objectSummary.getKey() + "  " + "(size = " + objectSummary.getSize() + ")");
        }
    }
}