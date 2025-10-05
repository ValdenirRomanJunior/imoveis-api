package com.dynamous.imoveis.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "asaas_customers")
public class AsaasCustomer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "asaas_customer_id", unique = true, nullable = false)
    private String asaasCustomerId; // ID retornado pelo ASAAS (ex: cus_000005219613)
    
    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "cpf_cnpj", nullable = false)
    private String cpfCnpj;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "mobile_phone")
    private String mobilePhone;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "postal_code")
    private String postalCode;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "address_number")
    private String addressNumber;
    
    @Column(name = "complement")
    private String complement;
    
    @Column(name = "province")
    private String province;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "state")
    private String state;
    
    @Column(name = "country")
    private String country;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "asaasCustomer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<AsaasSubscription> subscriptions = new ArrayList<>();
    
    // Constructors
    public AsaasCustomer() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public AsaasCustomer(String asaasCustomerId, Account account, String name, String cpfCnpj) {
        this();
        this.asaasCustomerId = asaasCustomerId;
        this.account = account;
        this.name = name;
        this.cpfCnpj = cpfCnpj;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAsaasCustomerId() {
        return asaasCustomerId;
    }
    
    public void setAsaasCustomerId(String asaasCustomerId) {
        this.asaasCustomerId = asaasCustomerId;
    }
    
    public Account getAccount() {
        return account;
    }
    
    public void setAccount(Account account) {
        this.account = account;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCpfCnpj() {
        return cpfCnpj;
    }
    
    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getMobilePhone() {
        return mobilePhone;
    }
    
    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getPostalCode() {
        return postalCode;
    }
    
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getAddressNumber() {
        return addressNumber;
    }
    
    public void setAddressNumber(String addressNumber) {
        this.addressNumber = addressNumber;
    }
    
    public String getComplement() {
        return complement;
    }
    
    public void setComplement(String complement) {
        this.complement = complement;
    }
    
    public String getProvince() {
        return province;
    }
    
    public void setProvince(String province) {
        this.province = province;
    }
    
    public String getCity() {
        return city;
    }
    
    public void setCity(String city) {
        this.city = city;
    }
    
    public String getState() {
        return state;
    }
    
    public void setState(String state) {
        this.state = state;
    }
    
    public String getCountry() {
        return country;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public List<AsaasSubscription> getSubscriptions() {
        return subscriptions;
    }
    
    public void setSubscriptions(List<AsaasSubscription> subscriptions) {
        this.subscriptions = subscriptions;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}