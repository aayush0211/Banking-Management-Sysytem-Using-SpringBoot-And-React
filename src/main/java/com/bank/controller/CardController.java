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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.req.dto.CardReqDto;
import com.bank.req.dto.TransactionReqDto;
import com.bank.service.CardService;

import jakarta.validation.Valid;

@RestController
@Valid
@RequestMapping("/cards")
@CrossOrigin(origins = "http//localhost:3000")
public class CardController {
	@Autowired
	private CardService cardService;
	
	
	
	@PostMapping("/{id}")
	public ResponseEntity<?> addCardToAccount(@PathVariable long id,@RequestBody CardReqDto card){
		return ResponseEntity.status(HttpStatus.CREATED).body(cardService.addCard(card, id));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> removeCardFromAccount(@PathVariable long cardNumber, @PathVariable long accountNumber){
		return ResponseEntity.status(HttpStatus.CREATED).body(cardService.removeCard(cardNumber,accountNumber));
	}
	@GetMapping("/getAllActiveCardsByAccountNumber/{id}")
	public ResponseEntity<?> getAllActiveCardsByAccountNumber(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.OK).body(cardService.getAllActiveCardsByAccountNumber(id));
	}
	
	@GetMapping("/getAllInactiveCardsByAccountNumber/{id}")
	public ResponseEntity<?> getAllInactiveCardsByAccountNumber(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.OK).body(cardService.getAllInactiveCardsByAccountNumber(id));
	}
	@GetMapping("/getCardByCardNumber/{id}")
	public ResponseEntity<?> getCardByCardNumber(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.OK).body(cardService.getCardByCardNumber(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<?> updateTransferLimitInCard(@PathVariable long id , @RequestBody TransactionReqDto transactionlimit){
		System.out.println("id: "+id+"amoungt:" +transactionlimit.getAmount());
		return ResponseEntity.status(HttpStatus.OK).body(cardService.updateTransferLimitInCard(id, transactionlimit.getAmount() ));
	}
	@PutMapping("/renewCard/{id}")
	public ResponseEntity<?> renewCard(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(cardService.renewCard(id));
	}
	
}
