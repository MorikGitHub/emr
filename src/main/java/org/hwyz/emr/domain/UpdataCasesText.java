package org.hwyz.emr.domain;

public class UpdataCasesText {
    private long id;
    private long patientId;
    private long classficationId;

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
}
