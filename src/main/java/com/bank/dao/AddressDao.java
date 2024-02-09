package com.bank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Address;

public interface AddressDao extends JpaRepository<Address, Long> {

}
