package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.req.dto.AccountReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.service.AccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "http//localhost:3000")
@Valid
public class AccountController {
	
	@Autowired
	private AccountService accountservice;
	
//	@PostMapping
//	public ResponseEntity<?> addNewAccount(@RequestBody AccountReqDto newAccount)
//	{
//		return ResponseEntity.status(HttpStatus.CREATED).body(accountservice.addAccount(newAccount));
//	}
	
	@GetMapping
	public ResponseEntity<?> getAllAccounts(){
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.getAllAccounts());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getAccountsById(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.getAccountById(id));
	}
	@GetMapping("/balance/{id}")
	public ResponseEntity<?> checkAccountBalance(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.checkBalance(id));
	}
	
	@GetMapping("/getAllAccountsByBranchId/{id}")
	public ResponseEntity<?> getAllAccountsByBranchId(@PathVariable long id) {
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.getAllAccountsByBranchId(id));
	}
	
	@GetMapping("/getAllActiveAccountsByBranchId/{id}")
	public ResponseEntity<?> getAllActiveAccountsByBranchId(@PathVariable long id) {
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.getAllActiveAccountsByBranchId(id));
	}
	
	@GetMapping("/getAllSuspendedAccountsByBranchId/{id}")
	public ResponseEntity<?> getAllSuspendedActiveAccountsByBranchId(@PathVariable long id) {
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.getAllSuspendedAccountsByBranchId(id));
	}
	
	@GetMapping("/getAllCloseAccountsByBranchId/{id}")
	public ResponseEntity<?> getAllCloseAccountsByBranchId(@PathVariable long id) {
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.getAllCloseAccountsByBranchId(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateAccount(@PathVariable long id ,@RequestBody AccountReqDto updateAccount){
		return	ResponseEntity.status(HttpStatus.OK).body(accountservice.updateAccount(id, updateAccount));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> removeAccount(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.removeAccount(id));
	}
	
	
	@GetMapping("/getAllInactiveAccounts/{id}")
	public ResponseEntity<?> getAllInactiveAccounts(@PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.getAllInActiveAccounts(id));
	}
	
	@GetMapping("/toSuspendAccount/{id}")
	public ResponseEntity<?> toSuspendAccount(long id)
	{
	return	ResponseEntity.status(HttpStatus.OK).body(accountservice.toSuspendAccount(id));
	
	}
	@PostMapping("/{id}")
	public ResponseEntity<?> changePassword(@PathVariable long id, @RequestBody SigninRequest account)
	{
		return ResponseEntity.status(HttpStatus.OK).body(accountservice.changePassword(id, account));
	}
}
