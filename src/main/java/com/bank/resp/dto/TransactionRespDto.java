package com.bank.resp.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TransactionRespDto {
	@NotNull
	private long id;
	@NotBlank
	private String transactionType;
	 @NotNull(message = "creation date should not be null")
	 @DateTimeFormat(pattern = "dd/MM/yyyy")
	private LocalDate transactionDate;
	 @NotNull
	 private double balance;
	 @NotNull
	 private long accountNo;
	 @NotNull
	 private long receiverAccountNo;
}
