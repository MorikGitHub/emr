package org.hwyz.emr.domain;

public class AddAdvertisings {
    private long id;
    private String roleId;
    private String url;
    private String localAddr;
    private byte orDelete;
    private int type;
    private String uplodingName;
    private String archiveName;
    private String networkAddr;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLocalAddr() {
        return localAddr;
    }

    public void setLocalAddr(String localAddr) {
        this.localAddr = localAddr;
    }

    public byte getOrDelete() {
        return orDelete;
    }

    public void setOrDelete(byte orDelete) {
        this.orDelete = orDelete;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getUplodingName() {
        return uplodingName;
    }

    public void setUplodingName(String uplodingName) {
        this.uplodingName = uplodingName;
    }

    public String getArchiveName() {
        return archiveName;
    }

    public void setArchiveName(String archiveName) {
        this.archiveName = archiveName;
    }

    public String getNetworkAddr() {
        return networkAddr;
    }

    public void setNetworkAddr(String networkAddr) {
        this.networkAddr = networkAddr;
    }
}
