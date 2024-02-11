package com.bank.resp.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TransactionRespDto {
	
	private long id;

	private String transactionType;
	private LocalDate transactionDate;
	 
	 private double amount;
	 
	 private long accountNo;
	 
	 private long receiverAccountNo;
	 
}
