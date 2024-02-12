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
public class AccountRespDto {
     private long id;
	
	 private String firstName;
    
	 private String lastName;
	 
    private String mobileNumber;
	
	 private LocalDate dob;
	 
	 private String gender;
	 
	 private String email;
	 
	 private double balance;
	
	 private String accountType;

	 private long branchId;
	 
	 private String branchName;
	 
	 private String status;
	 
	 private LocalDate creationDate;
	 
	 private LocalDate updateDate;
	 
	 private double maxTransferAmount;
	 
	 
}
