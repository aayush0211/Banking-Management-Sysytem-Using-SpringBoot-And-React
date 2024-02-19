package com.bank.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.custom.exception.InvalidPasswordException;
import com.bank.custom.exception.LimitExceededException;
import com.bank.dao.AccountDao;
import com.bank.dao.BranchDao;
import com.bank.dao.CardDao;
import com.bank.dao.TransactionDao;
import com.bank.entities.Account;
import com.bank.entities.Branch;
import com.bank.entities.Card;
import com.bank.entities.Status;
import com.bank.entities.Transaction;
import com.bank.entities.TransactionType;
import com.bank.req.dto.SelfTransactionReqDto;
import com.bank.req.dto.TransactionByCardReqDto;
import com.bank.req.dto.TransactionReqDto;
import com.bank.resp.dto.TransactionRespDto;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	private TransactionDao transactionDao;
	@Autowired
	private AccountDao accountDao;
	@Autowired
	private BranchDao branchDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private CardDao cardDao;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public TransactionRespDto transferMoney(TransactionReqDto transaction) {
		Transaction transactions = mapper.map(transaction, Transaction.class);
		if (transaction.getAccountNo() == transaction.getReceiverAccountNo()) {
			throw new RuntimeException("Senders and receivers account must be different");
		}
		Account senderAccount = accountDao.findById(transaction.getAccountNo())
				.orElseThrow(() -> new BranchNotFoundException("Invlid senders account number"));
		 if(senderAccount.getStatus().equals(Status.CLOSE)) {
	    	   throw new BranchNotFoundException("reciever account not found!!!");
	       }
		if(!senderAccount.getEmail().equals(transaction.getEmail()))
			throw new BranchNotFoundException("email not found,invalid email!!!");
		if(!bCryptPasswordEncoder.matches(transaction.getPassword(), senderAccount.getPassword()))
			throw new InvalidPasswordException("Wrong password!!!");
		if (senderAccount.getBalance() < transaction.getAmount()) {
			throw new LimitExceededException("insufficient balance");
		}
		Account receiverAccount = accountDao.findById(transaction.getReceiverAccountNo())
				.orElseThrow(() -> new BranchNotFoundException("Invalid receivers account number"));
       if(receiverAccount.getStatus().equals(Status.CLOSE)) {
    	   throw new BranchNotFoundException("reciever account not found!!!");
       }
		if (senderAccount.getMaxTransactionAmount() >= transaction.getAmount()) {

			senderAccount.setBalance(senderAccount.getBalance() - transaction.getAmount());
			receiverAccount.setBalance(receiverAccount.getBalance() + transaction.getAmount());
			senderAccount.addDebitTransaction(transactions);
			receiverAccount.addCreditTransactions(transactions);
			transactions.setTransactionType(TransactionType.valueOf("DEBIT"));
			transactions.setTransactionDate(LocalDate.now());
			senderAccount.setUpdateDate(LocalDate.now());
			receiverAccount.setUpdateDate(LocalDate.now());
			transactionDao.saveAndFlush(transactions);
			// TransactionRespDto trans = mapper.map(transactions,
			// TransactionRespDto.class);
			TransactionRespDto trans = new TransactionRespDto(transactions.getId(), transactions.getTransactionType(),
					transactions.getTransactionDate(), transactions.getAmount(), transactions.getAccountNo().getId(),
					transactions.getReceiverAccountNo().getId());
			return trans;
		} else {
			throw new com.bank.custom.exception.LimitExceededException("Transaction Amount Limit Exceeded ");
		}

	}

	@Override
	public TransactionRespDto transferMoneyByCard(TransactionByCardReqDto transaction) {

		Card cd = cardDao.findById(transaction.getId())
				.orElseThrow(() -> new BranchNotFoundException("card not found, invalid crad number!!"));
		if(cd.getAccount().getId() != transaction.getAccountNo()) {
			throw new BranchNotFoundException("sender account not found!!!");
		}
		System.out.println(transaction);
		if (cd.getCVV() == transaction.getCVV() && transaction.getCardNetwork().equals(cd.getCardNetwork().name())
				&& transaction.getAmount() <= cd.getMaxTransactionAmount()
				&& transaction.getTransactionDate().isBefore(cd.getExpiryDate())) {

		Account senderAcc = accountDao.findById(transaction.getAccountNo()).orElseThrow(
				() -> new BranchNotFoundException("Account not found, invalid sender's account number!!!"));

			return transferMoney(new TransactionReqDto(transaction.getAmount(), transaction.getAccountNo(), transaction.getReceiverAccountNo(),senderAcc.getEmail() , transaction.getPassword()));
		
		}
		throw new LimitExceededException("Validation failed, incorrect data!!!!");

	}

	@Override
	public List<TransactionRespDto> getAllTransactions() {
		List<Transaction> transactionslist = transactionDao.findAll();
		List<TransactionRespDto> lists = new ArrayList<>();
		for (Transaction transactions : transactionslist) {
			lists.add(new TransactionRespDto(transactions.getId(), transactions.getTransactionType(),
					transactions.getTransactionDate(), transactions.getAmount(), transactions.getAccountNo().getId(),
					transactions.getReceiverAccountNo().getId()));
		}
		return lists;
	}

	@Override
	public List<TransactionRespDto> getAllTransactionsByAccountId(long accountNumber) {
		Account account = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("Invlid account number"));
		List<Transaction> lists = account.getCreditTransactions();
		lists.addAll(account.getDebitTransactions());
		lists.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : lists) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;

	}

	private static List<Transaction> getTransactions(Account acc) {
		List<Transaction> lists = acc.getCreditTransactions();
		lists.addAll(acc.getDebitTransactions());
		return lists;
	}

	@Override
	public List<TransactionRespDto> getAllTransactionsByBranchId(long branchId) {
		Branch branch = branchDao.findById(branchId).orElseThrow(() -> new BranchNotFoundException("Invlid Branch Id"));
		List<Transaction> tempList = new ArrayList<>();

		branch.getAccounts().forEach(a -> tempList.addAll(getTransactions(a)));
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;
	}

	@Override
	public double getAllInletAmountInBranch(long branchId) {
		Branch branch = branchDao.findById(branchId)
				.orElseThrow(() -> new BranchNotFoundException("Invalid Branch Id"));
		List<Transaction> tempList = new ArrayList<>();
		branch.getAccounts().forEach(a -> tempList.addAll(getTransactions(a)));
		double totalCreditAmount = tempList.stream()
				.filter(t -> t.getReceiverAccountNo().getBranch().getId().equals(branchId))
				.mapToDouble(Transaction::getAmount).sum();
		return totalCreditAmount;
	}

	@Override
	public double getAllOutletBranch(long branchId) {
		Branch branch = branchDao.findById(branchId)
				.orElseThrow(() -> new BranchNotFoundException("Invalid Branch Id"));
		List<Transaction> tempList = new ArrayList<>();
		branch.getAccounts().forEach(a -> tempList.addAll(getTransactions(a))); // Assuming debit transactions represent
																				// outgoing transactions
		double totalDebitAmount = tempList.stream().filter(t -> t.getAccountNo().getBranch().getId().equals(branchId))
				.mapToDouble(Transaction::getAmount).sum();
		return totalDebitAmount;
	}

	@Override
	public double getTotalAmountInBranch(long branchId) {
		Branch branch = branchDao.findById(branchId).orElseThrow(() -> new BranchNotFoundException("Invlid Branch Id"));
		double totalAmount = 0.0;
		List<Account> lists = branch.getAccounts();
		for (Account a : lists) {
			totalAmount += a.getBalance();
		}
		return totalAmount;
	}

	@Override
	public List<TransactionRespDto> getAllTransactionDaily(long branchID, String date) {
		Branch branch = branchDao.findById(branchID).orElseThrow(() -> new BranchNotFoundException("Invlid Branch Id"));
		List<Transaction> tempList = new ArrayList<>();

		// branch.getAccounts().forEach(a -> tempList.addAll(a.getTransactions()));
		for (Account acc : branch.getAccounts()) {
			tempList.addAll(getTransactions(acc));
		}
		tempList = tempList.stream().filter(t -> t.getTransactionDate().equals(LocalDate.parse(date)))
				.collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;

	}

	@Override
	public List<TransactionRespDto> getAllTransactionMonthly(long branchID, int month, int year) {

		Branch branch = branchDao.findById(branchID).orElseThrow(() -> new BranchNotFoundException("Invlid Branch Id"));
		List<Transaction> tempList = new ArrayList<>();

		// branch.getAccounts().forEach(a -> tempList.addAll(a.getTransactions()));
		for (Account acc : branch.getAccounts()) {
			tempList.addAll(getTransactions(acc));
		}
		tempList = tempList.stream().filter(
				t -> t.getTransactionDate().getYear() == year && t.getTransactionDate().getMonthValue() == month)
				.collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;
	}

	@Override
	public List<TransactionRespDto> getAllTransactionYearly(long branchId, int year) {
		Branch branch = branchDao.findById(branchId).orElseThrow(() -> new BranchNotFoundException("Invlid Branch Id"));
		List<Transaction> tempList = new ArrayList<>();

		// branch.getAccounts().forEach(a -> tempList.addAll(a.getTransactions()));
		for (Account acc : branch.getAccounts()) {
			tempList.addAll(getTransactions(acc));
		}
		tempList = tempList.stream().filter(t -> t.getTransactionDate().getYear() == year).collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;
	}

	@Override
	public List<TransactionRespDto> getAllTransactionDaily(String date) {

		List<Transaction> tempList = transactionDao.findAll();
		tempList = tempList.stream().filter(t -> t.getTransactionDate().equals(LocalDate.parse(date)))
				.collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;

	}

	@Override
	public List<TransactionRespDto> getAllTransactionMonthly(int month, int year) {

		List<Transaction> tempList = transactionDao.findAll();

		tempList = tempList.stream().filter(
				t -> t.getTransactionDate().getYear() == year && t.getTransactionDate().getMonthValue() == month)
				.collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;
	}

	@Override
	public List<TransactionRespDto> getAllTransactionYearly(int year) {

		List<Transaction> tempList = transactionDao.findAll();

		tempList = tempList.stream().filter(t -> t.getTransactionDate().getYear() == year).collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;

	}

	@Override
	public List<TransactionRespDto> getAccountAllTransactionsDaily(long accountNumber, String date) {
		Account account = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("Invlid account number"));
		List<Transaction> tempList = new ArrayList<>();

		// branch.getAccounts().forEach(a -> tempList.addAll(a.getTransactions()));
		// for(Account acc : branch) {
		tempList.addAll(getTransactions(account));
		// }
		tempList = tempList.stream().filter(t -> t.getTransactionDate().equals(LocalDate.parse(date)))
				.collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;
	}

	@Override
	public List<TransactionRespDto> getAccountAllTransactionMonthly(long accountNumber, int month, int year) {
		Account account = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("Invlid account number"));
		List<Transaction> tempList = new ArrayList<>();

		// branch.getAccounts().forEach(a -> tempList.addAll(a.getTransactions()));
		// for(Account acc : branch) {
		tempList.addAll(getTransactions(account));
		// }
		tempList = tempList.stream().filter(
				t -> t.getTransactionDate().getYear() == year && t.getTransactionDate().getMonthValue() == month)
				.collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;
	}

	@Override
	public List<TransactionRespDto> getAccountAllTransactionYearly(long accountNumber, int year) {

		Account account = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("Invlid account number"));
		List<Transaction> tempList = new ArrayList<>();

		// branch.getAccounts().forEach(a -> tempList.addAll(a.getTransactions()));
		// for(Account acc : branch) {
		tempList.addAll(getTransactions(account));
		// }
		tempList = tempList.stream().filter(t -> t.getTransactionDate().getYear() == year).collect(Collectors.toList());
		tempList.sort((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()));
		List<TransactionRespDto> allLists = new ArrayList<>();
		for (Transaction t : tempList) {
			allLists.add(new TransactionRespDto(t.getId(), t.getTransactionType(),
					t.getTransactionDate(), t.getAmount(), t.getAccountNo().getId(),
					t.getReceiverAccountNo().getId()));
		}
		return allLists;
	}

	@Override
	public String creditAmount(SelfTransactionReqDto transaction) {
		Transaction transactions = mapper.map(transaction, Transaction.class);
		// transactions.setReceiverAccountNo(null);

		transactions.setTransactionDate(LocalDate.now());
		transactions.setTransactionType(TransactionType.CREDIT);
		Account recieverAccount = accountDao.findById(transaction.getAccountNo())
				.orElseThrow(() -> new BranchNotFoundException("Invlid senders account number"));
		transactions.setReceiverAccountNo(recieverAccount);
		transactions.setTransactionType(TransactionType.CREDIT);
		recieverAccount.setBalance(recieverAccount.getBalance() + transaction.getAmount());
		transactionDao.save(transactions);

		return "successfully credited amount " + transactions.getAmount() + " in account number: "
				+ transactions.getAccountNo();
	}

	@Override
	public String debitAmount(SelfTransactionReqDto transaction) {

		Transaction transactions = mapper.map(transaction, Transaction.class);
		transactions.setReceiverAccountNo(null);
		transactions.setTransactionDate(LocalDate.now());
		transactions.setTransactionType(TransactionType.DEBIT);

		Account senderAccount = accountDao.findById(transaction.getAccountNo())
				.orElseThrow(() -> new BranchNotFoundException("Invlid senders account number"));
		if (senderAccount.getBalance() < transaction.getAmount()) {
			throw new LimitExceededException("insufficient balance");
		}
		senderAccount.setBalance(senderAccount.getBalance() - transaction.getAmount());
		senderAccount.setUpdateDate(LocalDate.now());
		senderAccount.addDebitTransaction(transactions);
		transactionDao.save(transactions);
		return "successfully debited amount " + transactions.getAmount() + " in account number: "
				+ transactions.getAccountNo();
	}
}
