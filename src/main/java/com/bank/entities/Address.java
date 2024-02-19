package com.bank.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Embeddable
//@Entity
//@Table(name = "address")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Address  {
	@Column(length = 50)
	private String street;
	@Column(name = "city", length = 30)
	private String city;
	@Column(length = 30)
	private String state;
	@Column(name = "zip_code", length = 10)
	private String zipCode;
	@Column(length=30)
	private String country;
	
	
//	@OneToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "branch_id" , nullable = false)
//	private Branch branch;
//	
//	@OneToOne(mappedBy = "address" , cascade = CascadeType.ALL)
//	@JoinColumn(name = "emp_id")
//	private Employee employee;
//	
//	@OneToOne(mappedBy = "address" , cascade = CascadeType.ALL)
//	@JoinColumn(name = "acc_id")
//	private Account account;
//	
	public Address(String street, String city, String state, String zipCode, String country) {
		super();
		this.street = street;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.country = country;
	}
	
	
}
