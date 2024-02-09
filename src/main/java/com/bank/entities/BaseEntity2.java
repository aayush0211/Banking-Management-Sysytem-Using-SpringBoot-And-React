package com.bank.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
	@Column(length = 30)
	private String email;
	@Column(length = 30)
	private String password;
	@Column(name = "mobile_number" , length = 30)
	private String mobileNumber;
	
	@Embedded
	@JoinColumn(name = "aadhar_number")
	private AadharCard aadharCard;
	
	private String imagePath;
}
