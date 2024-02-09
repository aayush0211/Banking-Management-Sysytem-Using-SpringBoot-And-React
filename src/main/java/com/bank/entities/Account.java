package com.bank.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account extends BaseEntity2 {
	
	

	@OneToOne(fetch = FetchType.LAZY , cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;
	
	@ManyToOne
	@JoinColumn(name = "branch_id")
	private Branch branch;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "account_type" , length = 20)
	private AccountType accountType;
	
	@Column(length = 30)
	private double balance;
	@Column(name  = "creation_date" , length = 20)
	private LocalDate creationDate;
	@Column(name  = "update_date" , length = 20)
	private LocalDate updateDate;
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private Status status;
	
	@OneToMany(mappedBy = "account" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Card> cards = new ArrayList<>();
	
	
	@OneToMany(mappedBy = "receiverAccountNo" , cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Transaction> creditTransaction = new ArrayList<>();
	@OneToMany(mappedBy = "accountNo" , cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Transaction> debitTransaction = new ArrayList<>();
	
	public void addCreditedTransaction(Transaction t) {
		this.creditTransaction.add(t);
		t.setReceiverAccountNo(this);
		
	}
	public void removeCreditedTransaction(Transaction t) {
		this.creditTransaction.remove(t);
		t.setReceiverAccountNo(null);
	}
	public void addDebitTransaction(Transaction t) {
		this.debitTransaction.add(t);
		t.setAccountNo(this);
	}
	public void removeDebitTransaction(Transaction t) {
		this.debitTransaction.remove(t);
		t.setAccountNo(null);
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
		
		return "Account  [id = " +super.getId()+" branch=" + branch + ", accountType=" + accountType + ", address=" + address + ", balance="
				+ balance + ", creationDate=" + creationDate + ", updateDate=" + updateDate + "]";
	}
}
