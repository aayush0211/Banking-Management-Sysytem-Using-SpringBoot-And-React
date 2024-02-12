package com.bank.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bank.entities.Employee;

public interface EmployeeDao extends JpaRepository<Employee, Long> {
	 Optional<Employee> findByEmail(String email);
}
