package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.service.TransactionService;

@RestController
@RequestMapping("/transaction")
@Validated
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
}
