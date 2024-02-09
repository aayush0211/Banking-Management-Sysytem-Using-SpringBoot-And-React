package com.bank.service;

import org.springframework.stereotype.Service;

import com.bank.dao.AccountDao;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService{
	
	private AccountDao accountDao;
}
