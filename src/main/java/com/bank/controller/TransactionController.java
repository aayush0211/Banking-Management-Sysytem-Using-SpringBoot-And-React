package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.req.dto.TransactionByCardReqDto;
import com.bank.req.dto.TransactionReqDto;
import com.bank.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http//localhost:3000")
@Valid
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	@PostMapping
	public ResponseEntity<?> transferMoney(@RequestBody TransactionReqDto newTransaction){
		return ResponseEntity.status(HttpStatus.CREATED).body(transactionService.transferMoney(newTransaction));
	}
	@GetMapping
	public ResponseEntity<?> getAllTransactions(){
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactions());
	}
	@GetMapping("/{accountNumber}")
	public ResponseEntity<?> getAllTransactionsByAccountId(@PathVariable long accountNumber){
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactionsByAccountId(accountNumber));
	}
	@GetMapping("/getAllTransactionByBranch/{branchId}")
	public ResponseEntity<?> getAllTransactionsByBranchId(@PathVariable long branchId){
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactionsByBranchId(branchId));
	}
	@GetMapping("/getAllInletAmountInBranch/{branchId}")
	public ResponseEntity<?> getAllInletAmountInBranch(@PathVariable long branchId){
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllInletAmountInBranch(branchId));
	}
	@GetMapping("/getAllOutletAmountInBranch/{branchId}")
	public ResponseEntity<?> getAllOutletAmountInBranch(@PathVariable long branchId){
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllOutletBranch(branchId));
	}
	@GetMapping("/getTotalAmountInBranch/{branchId}")
	public ResponseEntity<?> getTotalAmountInBranch(@PathVariable long branchId){
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getTotalAmountInBranch(branchId));
	}
	@GetMapping("/date/{id}")
	public ResponseEntity<?> getAllTransactionByBranchIdAndDate(@RequestParam String date, @PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactionDaily(id, date));
	}
	@GetMapping("/account/date/{id}")
	public ResponseEntity<?> getAllTransactionByAccountIdAndDate(@RequestParam String date, @PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAccountAllTransactionsDaily(id, date));
	}
	@GetMapping("/date")
	public ResponseEntity<?> getAllTransactionByDate(@RequestParam String date)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactionDaily(date));
	}
	@GetMapping("/monthly/{id}")
	public ResponseEntity<?> getAllTransactionByBranchIdAndMonth(@RequestParam int month,@RequestParam int year, @PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactionMonthly(id, month, year));
	}
	@GetMapping("/account/monthly/{id}")
	public ResponseEntity<?> getAllTransactionByAccountIdAndMonth(@RequestParam int month,@RequestParam int year, @PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAccountAllTransactionMonthly(id, month, year));
	}
	@GetMapping("/monthly")
	public ResponseEntity<?> getAllTransactionByMonthly(@RequestParam int month,@RequestParam int year)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactionMonthly(month, year));
	}
	@GetMapping("/yearly/{id}")
	public ResponseEntity<?> getAllTransactionByBranchIdAndYearly(@RequestParam int year, @PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactionYearly(id, year));
	}
	@GetMapping("/account/yearly/{id}")
	public ResponseEntity<?> getAllTransactionByAccountIdAndYearly(@RequestParam int year, @PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAccountAllTransactionYearly(id, year));
	}
	@GetMapping("/yearly")
	public ResponseEntity<?> getAllTransactionByyearly(@RequestParam int year)
	{
		return ResponseEntity.status(HttpStatus.OK).body(transactionService.getAllTransactionYearly(year));
	}
	@PostMapping("/transferMoneyByCard/{cvv}")
	public ResponseEntity<?> transferMoneyByCard(@PathVariable int cvv,@RequestBody TransactionByCardReqDto transaction){
		System.out.println(transaction+"  "+cvv);
		transaction.setCVV(cvv);
		return ResponseEntity.status(HttpStatus.CREATED).body(transactionService.transferMoneyByCard(transaction));
	}
}
