package com.dynamous.imoveis.dto;

public class PropertyTypeOptionDTO {

    private Integer value;
    private String label;

    public PropertyTypeOptionDTO() {
    }

    public PropertyTypeOptionDTO(Integer value, String label) {
        this.value = value;
        this.label = label;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
