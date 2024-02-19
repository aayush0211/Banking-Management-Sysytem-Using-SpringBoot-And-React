package com.bank.service;

import java.util.List;

import com.bank.req.dto.CardReqDto;
import com.bank.resp.dto.CardRespDto;

public interface CardService {

	 String addCard(CardReqDto cards, long accountId);
	    
	    String removeCard(long cardNumber, long accountId);
	    
	    List<CardRespDto> getAllActiveCardsByAccountNumber(long accountNumber);
	    
	    List<CardRespDto> getAllInactiveCardsByAccountNumber(long accountNumber);
	    
	    CardRespDto getCardByCardNumber(long cardNumber);
	    
	    String updateTransferLimitInCard(long cardNumber, double amount);
	    
	    String renewCard(long cardNumber);
	    
	
}
