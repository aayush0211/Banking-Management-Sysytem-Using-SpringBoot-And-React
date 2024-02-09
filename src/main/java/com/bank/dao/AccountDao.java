package com.bank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Account;

public interface AccountDao extends JpaRepository<Account, Long> {

}
