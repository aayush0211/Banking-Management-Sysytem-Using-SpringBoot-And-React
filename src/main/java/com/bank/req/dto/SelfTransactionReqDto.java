package com.bank.req.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SelfTransactionReqDto {
	@NotNull
	private long accountNo;
	@Min(value = 0)
	private double amount;
	
	
	
}
