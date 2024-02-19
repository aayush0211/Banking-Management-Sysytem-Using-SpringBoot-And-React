package com.bank.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.custom.exception.InvalidPasswordException;
import com.bank.dao.AccountDao;
import com.bank.dao.BranchDao;
import com.bank.entities.Account;
import com.bank.entities.AccountType;
import com.bank.entities.Address;
import com.bank.entities.Branch;
import com.bank.entities.Employee;
import com.bank.entities.Status;
import com.bank.entities.Transaction;
import com.bank.entities.TransactionType;
import com.bank.entities.UserRole;
import com.bank.req.dto.AccountReqDto;
import com.bank.req.dto.SelfTransactionReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.AccountRespDto;
import com.bank.resp.dto.AccountRespDto2;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

	@Autowired
	private BranchDao branchDao;
	@Autowired
	private AccountDao accountDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ImageHandlingService imageService;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	

	@Override
	public String addAccount(AccountReqDto newAccount) {
		List<Account> list =accountDao.findAll().stream().filter(a->a.getEmail().equals(newAccount.getEmail())).collect(Collectors.toList());
		if(list.size()!=0){
			long id=0;
			for(Account acc : list) {
				Branch selectedBranch = branchDao.findById(newAccount.getBranchId())
						.orElseThrow(() -> new BranchNotFoundException("Invalid branch Id"));
				
				selectedBranch.addAccount(acc);
				acc.setAccountType(AccountType.valueOf(newAccount.getAccountType()));
				acc.setStatus(Status.valueOf("ACTIVE"));
				acc.setBalance(newAccount.getBalance());
				
				id = acc.getId();
			}
		 updateAccount(id, newAccount);
		 return "Successfully reopen account of account number : "+id;
		}
		Account account = mapper.map(newAccount, Account.class);
		
		account.setPassword(bCryptPasswordEncoder.encode(account.getPassword()));
		if(newAccount.getImage() !=null) {
		String path = imageService.uploadImage(newAccount.getImage());
		account.setImagePath(path);
		}
		//account.setPassword(String.valueOf(newAccount.getPassword().hashCode()));
		System.out.println("encode Pass: "+account.getPassword());
		Address adr = mapper.map(newAccount, Address.class);
		account.addAddress(adr);
		account.setRole(UserRole.USER);
		Branch selectedBranch = branchDao.findById(newAccount.getBranchId())
				.orElseThrow(() -> new BranchNotFoundException("Invalid branch Id"));
		
		selectedBranch.addAccount(account);
		account.setAccountType(AccountType.valueOf(newAccount.getAccountType()));
		account.setStatus(Status.valueOf("ACTIVE"));

		account.setCreationDate(LocalDate.now());
		account.setUpdateDate(LocalDate.now());
		System.out.println(account.getPassword());
		
		accountDao.save(account);
		//SelfTransactionReqDto selfT = new SelfTransactionReqDto(account.getId(), newAccount.getBalance());
		//transactionService.creditAmount(selfT);	
//		Transaction transaction = new Transaction(account.getBalance(), TransactionType.CREDIT, LocalDate.now(), account);
//		account.addCreditTransactions(transaction);
		
		return "Successfully registered account with account number: " + account.getId();
	}

	@Override
	public String removeAccount(long id) {
		Account account = accountDao.findById(id).orElseThrow(() -> new BranchNotFoundException("Invalid branch Id"));

		account.setStatus(Status.CLOSE);

		return "Successfully Removed Account of Account Number: " + id;
	}

	@Override
	public String updateAccount(long id, AccountReqDto updateAccount) {
		Account account = accountDao.findById(id)
				.orElseThrow(() -> new BranchNotFoundException("Invalid account Number"));
		if(updateAccount.getImage()!= null) {
		String path = imageService.uploadImage(updateAccount.getImage());
		account.setImagePath(path);
		}
		//account.setPassword(bCryptPasswordEncoder.encode(updateAccount.getPassword()));

		account.setFirstName(updateAccount.getFirstName());
		account.setLastName(updateAccount.getLastName());
		account.setDob(updateAccount.getDob());
		Address addr = account.getAddress();
		addr.setCity(updateAccount.getCity());
		addr.setCountry(updateAccount.getCountry());
		addr.setState(updateAccount.getState());
		addr.setStreet(updateAccount.getStreet());
		addr.setZipCode(updateAccount.getZipCode());
		account.setMobileNumber(updateAccount.getMobileNumber());

		return "Successfully update account of account number : " + id;
	}

	@Override
	public List<AccountRespDto> getAllAccounts() {
		List<AccountRespDto> lists = new ArrayList<>();
		List<Account> tempList = accountDao.findAll().stream().filter(p -> p.getStatus().equals(Status.ACTIVE))
				.collect(Collectors.toList());
		for (Account account : tempList) {
			AccountRespDto acc = mapper.map(account, AccountRespDto.class);
			acc.setBranchId(account.getBranch().getId());
			acc.setBranchName(account.getBranch().getBranchName());
			lists.add(acc);
		}
		return lists;
	}

	@Override
	public AccountRespDto2 getAccountById(long id) {
		Account account = accountDao.findById(id)
				.orElseThrow(() -> new BranchNotFoundException("Invalid account Number"));

		AccountRespDto2 acc = mapper.map(account, AccountRespDto2.class);
		if(account.getImagePath() != null)
		acc.setImage(imageService.downloadImage(account.getImagePath()));
		return acc;
	}

	@Override
	public List<AccountRespDto> getAllAccountsByBranchId(long branchId) {
		Branch branch = branchDao.findById(branchId)
				.orElseThrow(() -> new BranchNotFoundException("Invalid branch id"));
		List<AccountRespDto> lists = new ArrayList<>();
		List<Account> tempList = branch.getAccounts().stream()
				.sorted((p1, p2) -> p1.getStatus().compareTo(p2.getStatus())).collect(Collectors.toList());

		for (Account account : tempList) {
			AccountRespDto acc = mapper.map(account, AccountRespDto.class);
			acc.setBranchId(account.getBranch().getId());
			acc.setBranchName(account.getBranch().getBranchName());
			lists.add(acc);
		}
		return lists;
	}

	public List<AccountRespDto> getAllActiveAccountsByBranchId(long branchId) {
		Branch branch = branchDao.findById(branchId)
				.orElseThrow(() -> new BranchNotFoundException("Invalid branch id"));
		List<AccountRespDto> lists = new ArrayList<>();
		List<Account> tempList = branch.getAccounts().stream().filter(p -> p.getStatus().equals(Status.ACTIVE))
				.collect(Collectors.toList());

		for (Account account : tempList) {
			AccountRespDto acc = mapper.map(account, AccountRespDto.class);
			acc.setBranchId(account.getBranch().getId());
			acc.setBranchName(account.getBranch().getBranchName());
			lists.add(acc);
		}
		return lists;
	}

	public List<AccountRespDto> getAllSuspendedAccountsByBranchId(long branchId) {
		Branch branch = branchDao.findById(branchId)
				.orElseThrow(() -> new BranchNotFoundException("Invalid branch id"));
		List<AccountRespDto> lists = new ArrayList<>();
		List<Account> tempList = branch.getAccounts().stream().filter(p -> p.getStatus().equals(Status.SUSPENDED))
				.collect(Collectors.toList());

		for (Account account : tempList) {
			AccountRespDto acc = mapper.map(account, AccountRespDto.class);
			acc.setBranchId(account.getBranch().getId());
			acc.setBranchName(account.getBranch().getBranchName());
			lists.add(acc);
		}
		return lists;
	}

	public List<AccountRespDto> getAllCloseAccountsByBranchId(long branchId) {
		Branch branch = branchDao.findById(branchId)
				.orElseThrow(() -> new BranchNotFoundException("Invalid branch id"));
		List<AccountRespDto> lists = new ArrayList<>();
		List<Account> tempList = branch.getAccounts().stream().filter(p -> p.getStatus().equals(Status.CLOSE))
				.collect(Collectors.toList());

		for (Account account : tempList) {
			AccountRespDto acc = mapper.map(account, AccountRespDto.class);
			acc.setBranchId(account.getBranch().getId());
			acc.setBranchName(account.getBranch().getBranchName());
			lists.add(acc);
		}
		return lists;
	}

	
	@Override
	public double checkBalance(long accountNumber) {
		Account account = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("Invalid Account number"));

		return account.getBalance();
	}

	@Override
	public String updateTransactionAmountLimit(long accountNumber, double amount) {
		Account account = accountDao.findById(accountNumber)
				.orElseThrow(() -> new BranchNotFoundException("Invalid Account number"));
		if (amount > 25000) {
			throw new com.bank.custom.exception.LimitExceededException(
					"Amount limit exceeded. Must be less than 25000");
		}
		account.setMaxTransactionAmount(amount);
		return null;
	}

	@Override
	public List<AccountRespDto> getAllInActiveAccounts(long id) {
		List<Account> tempList = accountDao.findAll().stream().filter(a->a.getBranch().getId()==id)
				.filter(a -> Period.between(a.getUpdateDate(), LocalDate.now()).getMonths() > 12)
				.collect(Collectors.toList());
		List<AccountRespDto> lists = new ArrayList<>();
		for (Account account : tempList) {
			AccountRespDto acc = mapper.map(account, AccountRespDto.class);
			acc.setBranchId(account.getBranch().getId());
			acc.setBranchName(account.getBranch().getBranchName());
			lists.add(acc);
		}
		return lists;
	}

	@Override
	public String toSuspendAccount(long id) {
		
		Account acc = accountDao.findById(id).orElseThrow(() -> new BranchNotFoundException("invalid id!!!"));
		acc.setStatus(Status.SUSPENDED);
		return "Successfully suspended account of id " + id;
	}

	@Override
	public String changePassword(long id, SigninRequest account) {
		Account acc =    accountDao.findById(id).orElseThrow(()-> new BranchNotFoundException("user not found, invalid id!!!"));

		if(!bCryptPasswordEncoder.matches(account.getPassword(), acc.getPassword())) {
			throw new InvalidPasswordException("wrong password!!!");
		}
		acc.setPassword(bCryptPasswordEncoder.encode(account.getNewPassword()));
	    return "Successfully change password of user, id : "+id;
		
	}

	

}
