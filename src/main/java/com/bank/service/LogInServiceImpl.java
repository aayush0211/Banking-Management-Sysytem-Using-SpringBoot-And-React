package com.bank.service;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.custom.exception.InvalidPasswordException;
import com.bank.dao.AccountDao;
import com.bank.dao.EmployeeDao;
import com.bank.entities.Account;
import com.bank.entities.Employee;
import com.bank.entities.Status;
import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.LogInResp;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LogInServiceImpl implements LogInService {
	@Autowired
	private AccountDao accountDao;
	@Autowired
	private EmployeeDao empDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
    
	@Override
	public LogInResp accountLogin(SigninRequest req) {
		System.out.println(req);
	Account acc =	accountDao.findByEmail(req.getEmail()).orElseThrow(()-> new BranchNotFoundException("Account not found, Invalid Email!!!"));
	//System.out.println(req.getPassword());
	//System.out.println("Hash : "+req.getPassword().hashCode());
	//String password = bCryptPasswordEncoder.encode(req.getPassword());
	//String password = String.valueOf(req.getPassword().hashCode());	
	//System.out.println("Given pass: "+password);
	//System.out.println("available pass: "+acc.getPassword());
	//System.out.println(bCryptPasswordEncoder.matches(req.getPassword(), acc.getPassword()));
	if(acc.getStatus().equals(Status.CLOSE)) {
		throw new BranchNotFoundException("account deleted,again to open account!!!");
	}
	System.out.println("Entered Password: " + req.getPassword());
    System.out.println("Retrieved Hashed Password from Database: " + acc.getPassword());
//    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
//    String result = encoder.encode("myPassword");
//    System.out.println((encoder.matches("myPassword", result)));
    String enteredPassword = req.getPassword().trim();
    boolean passwordMatch = bCryptPasswordEncoder.matches(enteredPassword, acc.getPassword());
    System.out.println("Password Match: " + passwordMatch);

	if(bCryptPasswordEncoder.matches(req.getPassword(), acc.getPassword())) {
		System.out.println("password Match: " );
	return mapper.map(acc, LogInResp.class);
	}
	else
	throw new InvalidPasswordException("wrong password");
		
	}

	@Override
	public LogInResp employeeLogin(SigninRequest req) {
		Employee emp = empDao.findByEmail(req.getEmail()).orElseThrow(()-> new BranchNotFoundException("Email not found!!!"));
		//String password = bCryptPasswordEncoder.encode(req.getPassword());

		if(bCryptPasswordEncoder.matches(req.getPassword(), emp.getPassword())) {
			System.out.println("password Match: " );
		return mapper.map(emp, LogInResp.class);
		}
		else
		throw new InvalidPasswordException("wrong password");
			
	}
	
	

}
