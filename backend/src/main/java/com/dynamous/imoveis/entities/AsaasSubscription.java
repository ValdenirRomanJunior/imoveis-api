package com.dynamous.imoveis.entities;

import com.dynamous.imoveis.enums.AsaasBillingType;
import com.dynamous.imoveis.enums.AsaasSubscriptionCycle;
import com.dynamous.imoveis.enums.AsaasSubscriptionStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "asaas_subscriptions")
public class AsaasSubscription {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "asaas_subscription_id", unique = true, nullable = false)
    private String asaasSubscriptionId; // ID retornado pelo ASAAS
    
    @ManyToOne
    @JoinColumn(name = "asaas_customer_id", nullable = false)
    private AsaasCustomer asaasCustomer;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "billing_type", nullable = false)
    private AsaasBillingType billingType;
    
    @Column(name = "value", nullable = false, precision = 10, scale = 2)
    private BigDecimal value;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "cycle", nullable = false)
    private AsaasSubscriptionCycle cycle;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "next_due_date")
    private LocalDate nextDueDate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AsaasSubscriptionStatus status;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Column(name = "max_payments")
    private Integer maxPayments;
    
    @Column(name = "external_reference")
    private String externalReference;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "asaasSubscription", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<AsaasPayment> payments = new ArrayList<>();
    
    // Constructors
    public AsaasSubscription() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = AsaasSubscriptionStatus.ACTIVE;
    }
    
    public AsaasSubscription(String asaasSubscriptionId, AsaasCustomer asaasCustomer, 
                           AsaasBillingType billingType, BigDecimal value, 
                           AsaasSubscriptionCycle cycle, String description) {
        this();
        this.asaasSubscriptionId = asaasSubscriptionId;
        this.asaasCustomer = asaasCustomer;
        this.billingType = billingType;
        this.value = value;
        this.cycle = cycle;
        this.description = description;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAsaasSubscriptionId() {
        return asaasSubscriptionId;
    }
    
    public void setAsaasSubscriptionId(String asaasSubscriptionId) {
        this.asaasSubscriptionId = asaasSubscriptionId;
    }
    
    public AsaasCustomer getAsaasCustomer() {
        return asaasCustomer;
    }
    
    public void setAsaasCustomer(AsaasCustomer asaasCustomer) {
        this.asaasCustomer = asaasCustomer;
    }
    
    public AsaasBillingType getBillingType() {
        return billingType;
    }
    
    public void setBillingType(AsaasBillingType billingType) {
        this.billingType = billingType;
    }
    
    public BigDecimal getValue() {
        return value;
    }
    
    public void setValue(BigDecimal value) {
        this.value = value;
    }
    
    public AsaasSubscriptionCycle getCycle() {
        return cycle;
    }
    
    public void setCycle(AsaasSubscriptionCycle cycle) {
        this.cycle = cycle;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDate getNextDueDate() {
        return nextDueDate;
    }
    
    public void setNextDueDate(LocalDate nextDueDate) {
        this.nextDueDate = nextDueDate;
    }
    
    public AsaasSubscriptionStatus getStatus() {
        return status;
    }
    
    public void setStatus(AsaasSubscriptionStatus status) {
        this.status = status;
    }
    
    public LocalDate getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    
    public Integer getMaxPayments() {
        return maxPayments;
    }
    
    public void setMaxPayments(Integer maxPayments) {
        this.maxPayments = maxPayments;
    }
    
    public String getExternalReference() {
        return externalReference;
    }
    
    public void setExternalReference(String externalReference) {
        this.externalReference = externalReference;
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
    
    public List<AsaasPayment> getPayments() {
        return payments;
    }
    
    public void setPayments(List<AsaasPayment> payments) {
        this.payments = payments;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}