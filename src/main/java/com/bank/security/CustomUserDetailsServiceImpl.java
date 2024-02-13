package com.bank.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.dao.AccountDao;
import com.bank.entities.Account;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	// dep user dao
	@Autowired
	private AccountDao accountDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws BranchNotFoundException {
		// invoke dao's method to get uer details form DB
		System.out.println("in loadUserByUsername of CustomDetailsServiceImpl");
		Account user = accountDao.findByEmail(email)
				.orElseThrow(() ->
				new BranchNotFoundException("Invalid Email !!!!!"));
		//=> user email exists
		return new CustomUserDetails(user);
	}

}
