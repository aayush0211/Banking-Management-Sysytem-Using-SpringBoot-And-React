package com.bank.req.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionReqDto {
	@NotBlank
	private String transactionType;
	 @NotNull(message = "creation date should not be null")
	 @DateTimeFormat(pattern = "dd/MM/yyyy")
	private LocalDate transactionDate;
	 
	 private double amount;
	 @NotNull
	 private long accountNo;
	 @NotNull
	 private long receiverAccountNo;
	 
}
