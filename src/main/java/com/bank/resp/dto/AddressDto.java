package com.bank.resp.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
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
public class AddressDto {
	             @NotBlank(message = "street data must be required")
	             @Length(max = 30,min = 3)
                 private String street;
	             @NotBlank(message = "city data must be required")
	             @Length(max = 10,min = 3)
                 private String city;
	             @NotBlank(message = "state data must be required")
	             @Length(max = 10,min = 3)
                 private String state;
	             @NotBlank(message = "country data must be required")
	             @Length(max = 10,min = 3)
                 private String country;
	             @NotBlank
	             @Pattern(regexp = "^\\d{6}(?:[-\\s]\\d{4})?$")
	             private String zipCode;
}
