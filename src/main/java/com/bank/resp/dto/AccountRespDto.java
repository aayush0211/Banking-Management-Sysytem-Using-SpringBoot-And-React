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

public class AccountRespDto {
     private long id;
	@NotBlank(message = "First name data must be required")
    @Length(max = 30,min = 3)
	 private String firstName;
    @Length(max = 30)
	 private String lastName;
	 @NotBlank(message = "phone number data must be required")
    @Length(max = 12)
    private String mobileNumber;
	 @DateTimeFormat(pattern = "dd/MM/yyyy")
	 @NotNull
	 @Past(message = "Date of Birth must be in the past")
	 @AgeConstraint(value = 16, message = "Sorry!! You must be atleast 16 years old")
	 private LocalDate dob;
	 @NotBlank(message = "Gender must required")
	 private String gender;
	 @Email
	 @NotBlank
	 private String email;
	 @Pattern(regexp = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/")
	 private String password;
	 
	 private double balance;
	 @NotBlank(message =  "Account type should not be left blank")
	 private String accountType;
	 @NotNull
	 private long branchId;
	 
	 @NotNull(message = "creation date should not be null")
	 @DateTimeFormat(pattern = "dd/MM/yyyy")
	 private LocalDate creationDate;
	 private LocalDate updateDate;
	 
}
