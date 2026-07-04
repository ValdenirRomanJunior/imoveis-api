package com.dynamous.imoveis.dto;

import java.io.Serializable;

public class OpportunityLPDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long landingPageId;
    private String name;
    private String phone;
    private String lpPayload;

    public OpportunityLPDTO() {
    }

    public Long getLandingPageId() {
        return landingPageId;
    }

    public void setLandingPageId(Long landingPageId) {
        this.landingPageId = landingPageId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLpPayload() {
        return lpPayload;
    }

    public void setLpPayload(String lpPayload) {
        this.lpPayload = lpPayload;
    }
}
