package com.bank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Card;

public interface CardDao extends JpaRepository<Card, Long> {
       
	
}
