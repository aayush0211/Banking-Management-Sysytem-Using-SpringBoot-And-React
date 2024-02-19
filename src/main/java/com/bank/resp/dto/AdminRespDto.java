package com.bank.resp.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdminRespDto {
	
	private long id;
	
	private String firstName;

	
	private String lastName;
	
	private String mobileNumber;
	
	private LocalDate dob;
	
	private String gender;
	
	private String email;
	
	private String password;
	


	private String cardNumber;
	//@NotBlank(message = "Location as per aadhar card")
	private String location;
	//@NotNull
	//@Past(message = "Aadhar card must be created in past")
	private LocalDate createdOn;

	//private MultipartFile image;
	
	private String street;
	
	private String city;
	
	private String state;
	
	private String country;
	
	private String zipCode;
}
