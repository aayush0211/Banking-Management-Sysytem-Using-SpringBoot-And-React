package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.service.AccountService;

@RestController
@RequestMapping("/account")
@Validated
public class AccountController {
	
	@Autowired
	private AccountService account;
}
