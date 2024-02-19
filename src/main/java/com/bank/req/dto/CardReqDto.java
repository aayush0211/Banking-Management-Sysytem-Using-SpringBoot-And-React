package com.bank.req.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardReqDto {
	
	@NotBlank
	private String cardNetwork;
	@NotBlank
	private String cardType;
	@Max(value=50000,message = "Value exceeded. Must be equal to or less than 50000")
	private double maxTransferAmount = 10000.00;
}
