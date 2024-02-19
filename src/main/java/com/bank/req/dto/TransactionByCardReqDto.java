package com.bank.req.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransactionByCardReqDto {

	
	 @NotNull(message = "creation date should not be null")
	 @DateTimeFormat(pattern = "dd/MM/yyyy")
	private LocalDate transactionDate;
	 @Max(value=50000,message = "Value exceeded. Must be equal to or less than 50000")
	 @Min(value = 0)
	 private double amount;
	 @NotNull
	 private long accountNo;
	 @NotNull
	 private long receiverAccountNo;
	 
	 @NotNull
	 private long id;
//	 @NotNull
//	 private String password;
	 @NotNull
	 private int CVV;
	 @NotBlank
		private String cardNetwork;
		@NotBlank
		private String cardType;
		 @NotBlank
		 @Pattern(regexp = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/")
		private String password;
}
