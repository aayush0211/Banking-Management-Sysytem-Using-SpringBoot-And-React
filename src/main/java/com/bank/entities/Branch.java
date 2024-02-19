package com.bank.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "branches")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "address")
public class Branch extends BaseEntity {
	@Column(name = "branch_name" , length = 30)
	private String branchName;
	@Column(name = "phone_number" , length = 15)
	private String phoneNumber;
	
	@Embedded
	@JoinColumn(name = "address_id")
	private Address address;
	
//	@Setter(value = AccessLevel.NONE)
//	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//	@JoinColumn(name = "address_id")
//	private Address address;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "emp_id" , referencedColumnName = "id")
	private Employee employee;
	
	@OneToMany(mappedBy = "branch" , cascade = CascadeType.MERGE)
	private List<Account> accounts = new ArrayList<>();

	
	
	public Branch(String branchName, String phoneNumber) {
		super();
		this.branchName = branchName;
		this.phoneNumber = phoneNumber;
	}
	
	
	public void addAccount(Account newAccount) {
		this.accounts.add(newAccount);
		newAccount.addBranch(this);
	}
	
	public void removeAccount(Account account) {
		this.accounts.remove(account);
		account.addBranch(null);
	}
	
	public void updateAccountBranch(Account account , Branch branch) {
		this.accounts.remove(account);
		branch.accounts.add(account);
		account.addBranch(branch);
	}
	
	public void addAddress(Address adr)
	{
		this.address=adr;
	}
	
}
