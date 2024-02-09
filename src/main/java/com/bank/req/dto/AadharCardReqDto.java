package com.bank.req.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AadharCardReqDto {
	
	@NotBlank(message  = "Must be filled") 
	@Pattern(regexp = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")
	private String cardNumber;
	@NotBlank(message = "Location as per aadhar card")
	private String location;
	@NotNull
	@Past(message = "Aadhar card must be created in past")
	private LocalDate createdOn;
}
