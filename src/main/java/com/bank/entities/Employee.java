package com.bank.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"branch"} , callSuper = true)
public class Employee extends BaseEntity2{
	
	@Setter(value = AccessLevel.NONE)
	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "branch_id")
	private Branch branch;
	
//	@OneToOne(fetch = FetchType.LAZY , cascade = CascadeType.MERGE, orphanRemoval = true)
//	@JoinColumn(name = "address_id")
//	private Address address;
	
	public void addBranch(Branch branche) {
		this.branch = branche;
		branche.setEmployee(this);
	}
	
	public void removeEmployeeBranch(Branch branche) {
		branche.setEmployee(null);
	}
	
//	public void addAddress(Address addr) {
//		this.address = addr; 
//	}
	
	public void updateEmployeeBranch(Branch branche) {
		this.branch.setEmployee(null);
		this.branch = branche;
		branche.setEmployee(this);
	}
//	public void updateAddress(Address address) {
//		
//		this.address = address;
//		
//	}
}
