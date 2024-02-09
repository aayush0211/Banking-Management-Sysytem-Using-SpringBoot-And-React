package com.bank.resp.dto;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.bank.customValidator.AgeConstraint;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
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
	 
	 private String password;
	 
	 private double balance;
	
	 private String accountType;

	 private long branchId;
	 
	 private String branchName;
	 
	 private LocalDate creationDate;
	 
	 private LocalDate updateDate;
	 
}
