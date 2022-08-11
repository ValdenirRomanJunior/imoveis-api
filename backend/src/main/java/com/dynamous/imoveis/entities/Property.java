package com.dynamous.imoveis.entities;



import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "property")
public class Property implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Integer type;
    private Integer goal;




    @ManyToOne
    @JoinColumn(name="tenant_id")
    private Tenant tenant;

    @OneToOne(mappedBy = "property",cascade=CascadeType.ALL)
    private Address address;

    public Property() {
    }

    public Property(Long id, String name, String description, Integer type, Integer goal) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.goal = goal;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getGoal() {
        return goal;
    }

    public void setGoal(Integer goal) {
        this.goal = goal;
    }



    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenantId) {
        this.tenant = tenantId;
    }

    public void setAddress(Address address) {
        this.address = address;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Property property = (Property) o;
        return Objects.equals(id, property.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


    public Address getAddress() {
        return address;
    }
}
