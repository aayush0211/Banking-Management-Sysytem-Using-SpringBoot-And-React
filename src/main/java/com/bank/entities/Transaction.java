package com.bank.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction extends BaseEntity{
	@Column(length = 20)
	private double amount;
	@Enumerated(EnumType.STRING)
	@Column(name = "transaction_type" , length = 20)
	private TransactionType transactionType;
	@Column(name = "transaction_date" , length = 20)
	private LocalDate transactionDate;
	@ManyToOne
	@JoinColumn(name  = "acc_num", nullable = false)
	private Account accountNo;
	@ManyToOne
	@JoinColumn(name = "receiver's_acc_no")
	private Account receiverAccountNo;
	
	@Override
	public String toString() {
		return "Transaction  [id = " + super.getId() + "accountNo=" + accountNo + ", receiverAccountNo=" + receiverAccountNo + ", amount=" + amount
				+ ", transactionType=" + transactionType + ", transactionDate=" + transactionDate + "]";
	}

	public Transaction(double amount, TransactionType transactionType, LocalDate transactionDate, Account accountNo) {
		super();
		this.amount = amount;
		this.transactionType = transactionType;
		this.transactionDate = transactionDate;
		this.accountNo = accountNo;
	}
	
	
	
}
