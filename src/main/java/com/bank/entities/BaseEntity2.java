package com.bank.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.MappedSuperclass;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@MappedSuperclass
@Getter
@ToString
public class BaseEntity2 extends BaseEntity {
	@Column(name = "first_name" , length = 20)
	private String firstName;
	@Column(name = "last_name" , length = 20)
	private String lastName;
	@Column(name = "date_of_birth" , length = 20)
	private LocalDate dob;
	@Column(length = 20)
	private String gender;
	@Column(length = 30, unique = true)
	private String email;
	@Column
	private String password;
	@Column(name = "mobile_number" , length = 30)
	private String mobileNumber;
	@Enumerated(EnumType.STRING)
	private UserRole role;
	@Embedded
	@JoinColumn(name = "aadhar_number")
	private AadharCard aadharCard;
	
	@Embedded
	@JoinColumn(name = "address")
	private Address address;

	private String imagePath;
//	 @Setter(value = AccessLevel.NONE)
//	 @OneToOne(fetch = FetchType.LAZY , cascade = CascadeType.ALL)
//		@JoinColumn(name = "address_id")
//	   	private Address address;
	 
	 public void addAddress(Address adr)
	 {
		 this.address=adr;
	 }
}
