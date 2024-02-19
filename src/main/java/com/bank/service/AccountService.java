package com.bank.service;

import java.util.List;

import com.bank.req.dto.AccountReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.AccountRespDto;
import com.bank.resp.dto.AccountRespDto2;

public interface AccountService {
	
	String addAccount(AccountReqDto newAccount) ;
	
	String removeAccount(long id);
	
	String updateAccount(long id, AccountReqDto account);
	
	List<AccountRespDto> getAllAccounts();
	
	List<AccountRespDto> getAllActiveAccountsByBranchId(long branchId);
	
	List<AccountRespDto> getAllSuspendedAccountsByBranchId(long branchId);
	
	List<AccountRespDto> getAllCloseAccountsByBranchId(long branchId);
	
    AccountRespDto2 getAccountById(long id);
    
    List<AccountRespDto> getAllAccountsByBranchId(long branchId);
    

    
    double checkBalance(long accountNumber);
    
    String updateTransactionAmountLimit(long accountNumber ,double amount);
    
    List<AccountRespDto> getAllInActiveAccounts(long id);
    
    String toSuspendAccount(long id);
    
    String changePassword(long id,SigninRequest account);
    
    
}
