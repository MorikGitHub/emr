package org.hwyz.emr.domain.entity;

import org.apache.tomcat.util.http.fileupload.RequestContext;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;

public class MyRequestCotext implements RequestContext {
    /**
     * The request for which the context is being provided.
     * 提供上下文的请求。
     */
    private HttpServletRequest request;

    /**
     * Construct a context for this request.
     * @param request The request to which this context applies.
     */
    public MyRequestCotext(HttpServletRequest request) {
        this.request = request;
    }

    public String getCharacterEncoding() {
        return request.getCharacterEncoding();
    }

    public String getContentType() {
        return request.getContentType();
    }

    public int getContentLength() {
        return request.getContentLength();
    }

    /**
     * 从请求对象中获取上传文件的输入流
     *
     */
    public InputStream getInputStream() throws IOException {
        return request.getInputStream();
    }

    public String toString() {
        return "ContentLength=" + this.getContentLength() + ", ContentType=" + this.getContentType();
    }
}
