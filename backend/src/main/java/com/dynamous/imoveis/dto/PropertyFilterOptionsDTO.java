package com.dynamous.imoveis.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PropertyFilterOptionsDTO {

    private List<PropertyTypeOptionDTO> types = new ArrayList<>();
    private List<String> cities = new ArrayList<>();
    private List<String> districts = new ArrayList<>();
    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    public List<PropertyTypeOptionDTO> getTypes() {
        return types;
    }

    public void setTypes(List<PropertyTypeOptionDTO> types) {
        this.types = types;
    }

    public List<String> getCities() {
        return cities;
    }

    public void setCities(List<String> cities) {
        this.cities = cities;
    }

    public List<String> getDistricts() {
        return districts;
    }

    public void setDistricts(List<String> districts) {
        this.districts = districts;
    }

    public BigDecimal getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(BigDecimal minPrice) {
        this.minPrice = minPrice;
    }

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(BigDecimal maxPrice) {
        this.maxPrice = maxPrice;
    }
}
