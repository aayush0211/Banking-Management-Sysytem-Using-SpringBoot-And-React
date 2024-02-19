package com.bank.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.resp.dto.AddressDto;
import com.bank.response.Apiresponse;

import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/address")
@Validated
public class AddressController {

	
	@PostMapping("/{empId}")
	public Apiresponse assignAddressToEmp(@PathVariable 
			@NotNull(message = "Emp id is required !!!")  Long empId, @RequestBody AddressDto adr) {
		System.out.println("in assign adr " + adr);
		try {
			return null;
		} catch (Exception e) {
			System.out.println(e);
			return new Apiresponse(e.getMessage());
		}
	}
	
}
