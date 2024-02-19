package com.bank.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.custom.exception.LimitExceededException;
import com.bank.dao.AccountDao;
import com.bank.dao.CardDao;
import com.bank.entities.Account;
import com.bank.entities.Card;
import com.bank.entities.CardNetwork;
import com.bank.entities.CardType;
import com.bank.req.dto.CardReqDto;
import com.bank.resp.dto.CardRespDto;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CardServiceImpl implements CardService{
	@Autowired
	private AccountDao accountDao;
	@Autowired
	private CardDao cardDao;
	@Autowired
	private ModelMapper mapper;
	
	
	@Override
	public String addCard(CardReqDto cards, long accountNumber) {

		Account account = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("Invalid Account number"));

		Card card = new Card();
		
		card.setCardType(CardType.valueOf(cards.getCardType()));
		card.setCardNetwork(CardNetwork.valueOf(cards.getCardNetwork()));
		card.setCreationDate(LocalDate.now());
		
		card.setExpiryDate(card.getCreationDate().plusYears(5));

		card.setMaxTransactionAmount(cards.getMaxTransferAmount());
		card.setCVV(100 + new Random().nextInt(900));
		
		account.addCard(card);
		cardDao.save(card);
		return "Successfully registered for card of card number: " + card.getId();
	}

	@Override
	public String removeCard(long cardNumber, long accountNumber) {
		Account account = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("Invalid Account number"));

		Card card = cardDao.findById(cardNumber).orElseThrow(() -> new BranchNotFoundException("Invalid card number!!!"));
		account.removeCard(card);
		return "Successfully remove card of card number : " + cardNumber;
	}
	
	@Override
	public List<CardRespDto> getAllActiveCardsByAccountNumber(long accountNumber) {
		List<Card> tempList = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("account not found, invalid account number!!!"))
				.getCards().stream().filter(c -> c.getExpiryDate().isAfter(LocalDate.now()))
				.collect(Collectors.toList());
		List<CardRespDto> list = new ArrayList<>();
		for (Card c : tempList) {
			
			list.add(mapper.map(c, CardRespDto.class));
			
		}
		return list;
	}
	
	@Override
	public List<CardRespDto> getAllInactiveCardsByAccountNumber(long accountNumber) {
		List<Card> tempList = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("account not found, invalid account number!!!"))
				.getCards().stream().filter(c -> c.getExpiryDate().isBefore(LocalDate.now()))
				.collect(Collectors.toList());
		List<CardRespDto> list = new ArrayList<>();
		for (Card c : tempList)
			list.add(mapper.map(c, CardRespDto.class));
		return list;
	}

	@Override
	public CardRespDto getCardByCardNumber(long cardNumber) {

		return null;
	}

	@Override
	public String updateTransferLimitInCard(long cardNumber, double amount) {
		System.out.println("in cards"+amount);
		if (amount > 50000) {
			throw new LimitExceededException("transfer amount limit must be under 50000!!!");
		}
		Card card = cardDao.findById(cardNumber)
				.orElseThrow(() -> new BranchNotFoundException("Card not found, invalid card number!!"));

		card.setMaxTransactionAmount(amount);
		return "Card amount limit increses to " + amount;
	}

	@Override
	public String renewCard(long cardNumber) {
	Card card =	cardDao.findById(cardNumber).orElseThrow(() -> new BranchNotFoundException("Invalid card number"));
	//	String newDate =LocalDate.now().getYear()+"-"+LocalDate.now().getMonthValue()+"-"+LocalDate.now().getDayOfMonth();
	card.setExpiryDate(LocalDate.now().plusYears(5));
		
	return "Successfully Renew Card of expiry date "+card.getExpiryDate();
	}

	
}

