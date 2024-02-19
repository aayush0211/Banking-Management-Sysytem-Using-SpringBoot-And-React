package com.bank.resp.dto;

import java.time.LocalDate;


import com.bank.entities.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRespDto {
	
	private long id;

	private TransactionType transactionType;
	private LocalDate transactionDate;
	 
	 private double amount;
	 
	 private long accountNo;
	 
	 private long receiverAccountNo;
	 
}
