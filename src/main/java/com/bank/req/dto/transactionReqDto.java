package com.bank.req.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionReqDto {

	 @Max(value=25000,message = "Value exceeded. Must be equal to or less than 50000")
	 @Min(value = 0)
	 private double amount;
	 @NotNull
	 private long accountNo;
	 
	 private long receiverAccountNo;
	 @Email
	 @NotBlank
	 private String email;
 @NotBlank
 @Pattern(regexp = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/")
	 private String password;
}
