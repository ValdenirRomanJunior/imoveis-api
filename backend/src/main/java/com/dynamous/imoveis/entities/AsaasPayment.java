package com.dynamous.imoveis.entities;

import com.dynamous.imoveis.enums.AsaasBillingType;
import com.dynamous.imoveis.enums.AsaasPaymentStatus;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "asaas_payments")
public class AsaasPayment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "asaas_payment_id", unique = true, nullable = false)
    private String asaasPaymentId;
    
    @ManyToOne
    @JoinColumn(name = "asaas_subscription_id")
    private AsaasSubscription asaasSubscription;
    
    @ManyToOne
    @JoinColumn(name = "asaas_customer_id", nullable = false)
    private AsaasCustomer asaasCustomer;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "billing_type", nullable = false)
    private AsaasBillingType billingType;
    
    @Column(name = "value", nullable = false, precision = 10, scale = 2)
    private BigDecimal value;
    
    @Column(name = "net_value", precision = 10, scale = 2)
    private BigDecimal netValue;
    
    @Column(name = "original_value", precision = 10, scale = 2)
    private BigDecimal originalValue;
    
    @Column(name = "interest_value", precision = 10, scale = 2)
    private BigDecimal interestValue;
    
    @Column(name = "description")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private AsaasPaymentStatus status;
    
    @Column(name = "due_date")
    private LocalDate dueDate;
    
    @Column(name = "original_due_date")
    private LocalDate originalDueDate;
    
    @Column(name = "payment_date")
    private LocalDate paymentDate;
    
    @Column(name = "client_payment_date")
    private LocalDate clientPaymentDate;
    
    @Column(name = "installment_number")
    private Integer installmentNumber;
    
    @Column(name = "invoice_url")
    private String invoiceUrl;
    
    @Column(name = "bank_slip_url")
    private String bankSlipUrl;
    
    @Column(name = "transaction_receipt_url")
    private String transactionReceiptUrl;
    
    @Column(name = "external_reference")
    private String externalReference;
    
    @Column(name = "nosso_numero")
    private String nossoNumero;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public AsaasPayment() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public AsaasPayment(String asaasPaymentId, AsaasCustomer asaasCustomer, 
                       AsaasBillingType billingType, BigDecimal value, 
                       AsaasPaymentStatus status, LocalDate dueDate) {
        this();
        this.asaasPaymentId = asaasPaymentId;
        this.asaasCustomer = asaasCustomer;
        this.billingType = billingType;
        this.value = value;
        this.status = status;
        this.dueDate = dueDate;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getAsaasPaymentId() {
        return asaasPaymentId;
    }
    
    public void setAsaasPaymentId(String asaasPaymentId) {
        this.asaasPaymentId = asaasPaymentId;
    }
    
    public AsaasSubscription getAsaasSubscription() {
        return asaasSubscription;
    }
    
    public void setAsaasSubscription(AsaasSubscription asaasSubscription) {
        this.asaasSubscription = asaasSubscription;
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
    
    public BigDecimal getNetValue() {
        return netValue;
    }
    
    public void setNetValue(BigDecimal netValue) {
        this.netValue = netValue;
    }
    
    public BigDecimal getOriginalValue() {
        return originalValue;
    }
    
    public void setOriginalValue(BigDecimal originalValue) {
        this.originalValue = originalValue;
    }
    
    public BigDecimal getInterestValue() {
        return interestValue;
    }
    
    public void setInterestValue(BigDecimal interestValue) {
        this.interestValue = interestValue;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public AsaasPaymentStatus getStatus() {
        return status;
    }
    
    public void setStatus(AsaasPaymentStatus status) {
        this.status = status;
    }
    
    public LocalDate getDueDate() {
        return dueDate;
    }
    
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
    
    public LocalDate getOriginalDueDate() {
        return originalDueDate;
    }
    
    public void setOriginalDueDate(LocalDate originalDueDate) {
        this.originalDueDate = originalDueDate;
    }
    
    public LocalDate getPaymentDate() {
        return paymentDate;
    }
    
    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }
    
    public LocalDate getClientPaymentDate() {
        return clientPaymentDate;
    }
    
    public void setClientPaymentDate(LocalDate clientPaymentDate) {
        this.clientPaymentDate = clientPaymentDate;
    }
    
    public Integer getInstallmentNumber() {
        return installmentNumber;
    }
    
    public void setInstallmentNumber(Integer installmentNumber) {
        this.installmentNumber = installmentNumber;
    }
    
    public String getInvoiceUrl() {
        return invoiceUrl;
    }
    
    public void setInvoiceUrl(String invoiceUrl) {
        this.invoiceUrl = invoiceUrl;
    }
    
    public String getBankSlipUrl() {
        return bankSlipUrl;
    }
    
    public void setBankSlipUrl(String bankSlipUrl) {
        this.bankSlipUrl = bankSlipUrl;
    }
    
    public String getTransactionReceiptUrl() {
        return transactionReceiptUrl;
    }
    
    public void setTransactionReceiptUrl(String transactionReceiptUrl) {
        this.transactionReceiptUrl = transactionReceiptUrl;
    }
    
    public String getExternalReference() {
        return externalReference;
    }
    
    public void setExternalReference(String externalReference) {
        this.externalReference = externalReference;
    }
    
    public String getNossoNumero() {
        return nossoNumero;
    }
    
    public void setNossoNumero(String nossoNumero) {
        this.nossoNumero = nossoNumero;
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
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}