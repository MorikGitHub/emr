package org.hwyz.emr.domain;

public class QueryCases extends BaseEntity{
    private long id;
    private long patientId;
    private long classficationId;
    private byte orDelete;
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPatientId() {
        return patientId;
    }

    public void setPatientId(long patientId) {
        this.patientId = patientId;
    }

    public long getClassficationId() {
        return classficationId;
    }

    public void setClassficationId(long classficationId) {
        this.classficationId = classficationId;
    }

    public byte getOrDelete() {
        return orDelete;
    }

    public void setOrDelete(byte orDelete) {
        this.orDelete = orDelete;
    }
}
