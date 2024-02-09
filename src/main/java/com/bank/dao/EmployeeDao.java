package com.bank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Employee;

public interface EmployeeDao extends JpaRepository<Employee, Long> {

}
