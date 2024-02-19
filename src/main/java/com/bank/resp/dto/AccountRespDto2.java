package com.bank.resp.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountRespDto2 {
	 private long id;
		
	 private String firstName;
    
	 private String lastName;
	 
    private String mobileNumber;
	
	 private LocalDate dob;
	 
	 private String gender;
	 
	 private String email;
	 
	 private String password;
	 
	 private double balance;
	
	 private String accountType;

	 private long branchId;
	 
	 private String branchName;
	 
	 private LocalDate creationDate;
	 
	 private String status;
	 private String cardNumber;
	 	
	 	private String location;
	 	
	 	private LocalDate createdOn;
	 private LocalDate updateDate;
	 private String street;
     private String city;
     private String state;
     private String country;
     private String zipCode;
     private byte[] image;
}
