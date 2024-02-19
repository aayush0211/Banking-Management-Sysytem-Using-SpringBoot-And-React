package com.bank.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users_accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account extends BaseEntity2 {
	
	
     
   
	
	@Setter(value = AccessLevel.NONE)
	@ManyToOne
	@JoinColumn(name = "branch_id")
	private Branch branch;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "account_type" , length = 20)
	private AccountType accountType;
    
	
	
	@Column(length = 30)
	private double balance;
	@Column(name = "max_transaction_amount")
	private double maxTransactionAmount;
	@Column(name  = "creation_date" , length = 20)
	private LocalDate creationDate;
	@Column(name  = "update_date" , length = 20)
	private LocalDate updateDate;
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private Status status;
	
	@OneToMany(mappedBy = "account" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Card> cards = new ArrayList<>();
	
	
	@OneToMany(mappedBy = "accountNo" , cascade = CascadeType.ALL , orphanRemoval = false)
	private List<Transaction> creditTransactions = new ArrayList<>();
	
	@OneToMany(mappedBy = "receiverAccountNo" , cascade = CascadeType.ALL , orphanRemoval = false)
	private List<Transaction> debitTransactions = new ArrayList<>();
		
	public void addBranch(Branch branch) {
		this.branch = branch;
		
	}
	
	public void addCreditTransactions(Transaction t) {
		this.creditTransactions.add(t);
		
		//t.setReceiverAccountNo(receiverAccount);
		t.setReceiverAccountNo(this);
		
	}
	
	public void removeCreditTransactions(Transaction t) {
		this.creditTransactions.remove(t);
		//t.setReceiverAccountNo(null);
		t.setReceiverAccountNo(this);
	}
	public void addDebitTransaction(Transaction t)
	{
		this.debitTransactions.add(t);
		t.setAccountNo(this);
		
	}
	public void removeDeditTransactions(Transaction t) {
		this.debitTransactions.remove(t);
		//t.setReceiverAccountNo(null);
		t.setAccountNo(this);
	}

	public void addCard(Card c) {
		this.cards.add(c);
		c.setAccount(this);
	}
	public void removeCard(Card c) {
		this.cards.remove(c);
		c.setAccount(null);
	}
	@Override
	public String toString() {
		
		return "Account  [id = " +super.getId()+" branch=" + branch + ", accountType=" + accountType + ", address=" + this.getAddress() + ", balance="
				+ balance + ", creationDate=" + creationDate + ", updateDate=" + updateDate + "]";
	}
	
	public void creditMoney(double amt)
	{
		this.balance = this.balance+amt;
	}
	public void debitMoney(double amt)
	{
		this.balance = this.balance-amt;
	}
}
