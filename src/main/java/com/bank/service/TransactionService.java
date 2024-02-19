package com.bank.service;

import java.util.List;

import com.bank.req.dto.SelfTransactionReqDto;
import com.bank.req.dto.TransactionByCardReqDto;
import com.bank.req.dto.TransactionReqDto;
import com.bank.resp.dto.TransactionRespDto;

public interface TransactionService {
	
	
	TransactionRespDto transferMoney(TransactionReqDto transaction) ;
	
	String creditAmount(SelfTransactionReqDto transaction);
	
	String debitAmount(SelfTransactionReqDto transaction);
	
	
	TransactionRespDto transferMoneyByCard(TransactionByCardReqDto transaction);
	
	
	List<TransactionRespDto> getAllTransactions();
	
	List<TransactionRespDto> getAllTransactionsByAccountId(long accountNumber);
	List<TransactionRespDto> getAccountAllTransactionsDaily(long accountNumber, String date);
	
    List<TransactionRespDto> getAccountAllTransactionMonthly(long accountNumber, int month, int year);
	
	List<TransactionRespDto> getAccountAllTransactionYearly(long accountNumber, int year);
	
	
	List<TransactionRespDto> getAllTransactionsByBranchId(long branchId);
	
	List<TransactionRespDto> getAllTransactionDaily(long branchID, String date);
	
	List<TransactionRespDto> getAllTransactionMonthly(long branchID, int month, int year);
	
	List<TransactionRespDto> getAllTransactionYearly(long branchId, int year);
	
	double getAllInletAmountInBranch(long branchId);
	
	double getAllOutletBranch(long branchId);
	
	double getTotalAmountInBranch(long branchId);
	
	List<TransactionRespDto> getAllTransactionDaily(String date);
	
	List<TransactionRespDto> getAllTransactionMonthly(int month, int year);
	
	List<TransactionRespDto> getAllTransactionYearly(int year);
	
	
	

	
	
	
}
