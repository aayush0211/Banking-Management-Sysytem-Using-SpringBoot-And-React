package com.bank.resp.dto;

import java.time.LocalDate;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class EmployeeRespDto {
	private Long id;
	 
	 private String firstName;
	 
    
	 private String lastName;

     private String mobileNumber;
	
	 private LocalDate dob;
	
	 private String gender;
	
	 private String email;
	
	 private String password;
	 
	 private long branchId;
	 
	 private String branchName;
	 
	 private String cardNumber;
		
		private String location;
		
		private LocalDate createdOn;

		
		 private String street;
         private String city;
         private String state;
         private String country;
         private String zipCode;
         private byte[] image;
}
