package com.bank.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Account;

public interface AccountDao extends JpaRepository<Account, Long> {

 Optional<Account> findByEmail(String email);

}
