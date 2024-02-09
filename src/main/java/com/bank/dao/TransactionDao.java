package com.bank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Transaction;

public interface TransactionDao extends JpaRepository<Transaction, Long> {

}
