package com.dynamous.imoveis.dto;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.enums.Feature;

import javax.persistence.Column;
import javax.persistence.Lob;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;




public class PropertyNewDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    	
    
    	

    @NotEmpty(message = "Preenchimento obrigatório")
    @Length(min=2, max=80, message = "O tamanho deve ser entre 2 e 80 caracteres")
    private String name;
    @NotEmpty(message = "Preenchimento obrigatório")
    
   
   @Length(min=1, max=350, message = "O tamanho deve ser entre 1 e 350 caracteres")
    private String description;
    
    @NotNull 
    private Integer typeProperty;
  
    @NotNull 
    private Integer goal;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String numberRooms;
  
    @NotEmpty(message = "Preenchimento obrigatório")
    private String bathRooms;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String suites;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String area;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String iptu;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String vacancies;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String condominium;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String price;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Column(unique=true)
    private String uf;
    
    @NotEmpty(message = "Preenchimento obrigatório")
    @Column(unique=true)
    private String city;
   
    @NotEmpty(message = "Preenchimento obrigatório")
    private String street;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String number;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String district;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String cep;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String areaTotal;
    	
	
    private MultipartFile file;
    
    private List<FeatureDTO> features;

    @NotEmpty(message = "Preenchimento obrigatório")
    private String	financeable;
    @NotEmpty(message = "Preenchimento obrigatório")
    private String permuta;
  

    public PropertyNewDTO(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTypeProperty() {
        return typeProperty;
    }

    public void setTypeProperty(Integer type) {
        this.typeProperty = type;
    }

    public Integer getGoal() {
        return goal;
    }

    public void setGoal(Integer goal) {
        this.goal = goal;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    
    
	public String getNumberRooms() {
		return numberRooms;
	}

	public void setNumberRooms(String numberRooms) {
		this.numberRooms = numberRooms;
	}

	public String getBathRooms() {
		return bathRooms;
	}

	public void setBathRooms(String bathRooms) {
		this.bathRooms = bathRooms;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getIptu() {
		return iptu;
	}

	public void setIptu(String iptu) {
		this.iptu = iptu;
	}

	public String getVacancies() {
		return vacancies;
	}

	public void setVacancies(String vacancies) {
		this.vacancies = vacancies;
	}

	public String getCondominium() {
		return condominium;
	}

	public void setCondominium(String condominium) {
		this.condominium = condominium;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return uf;
	}

	public void setState(String state) {
		this.uf = state;
	}

	public String getAreaTotal() {
		return areaTotal;
	}

	public void setAreaTotal(String areaTotal) {
		this.areaTotal = areaTotal;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

	public List<FeatureDTO> getFeatures() {
		return features;
	}

	public void setFeatures(List<FeatureDTO> features) {
		this.features = features;
	}

	public String getFinanceable() {
		return financeable;
	}

	public void setFinanceable(String financeable) {
		this.financeable = financeable;
	}

	public String getPermuta() {
		return permuta;
	}

	public void setPermuta(String permuta) {
		this.permuta = permuta;
	}

	public String getSuites() {
		return suites;
	}

	public void setSuites(String suites) {
		this.suites = suites;
	}


	

}

