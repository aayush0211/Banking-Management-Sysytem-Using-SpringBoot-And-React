package com.bank.req.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CardReqDto {
	
	@NotBlank
	private String cardNetwork;
	@NotBlank
	private String cardType;
	
}
