package com.bank.service;

import java.util.List;

import com.bank.entities.Employee;
import com.bank.req.dto.EmployeeReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.EmployeeRespDto;

public interface EmployeeService {
	
	String addEmployee(EmployeeReqDto newEmployee);
	
	String removeEmployee(long id);
	
	EmployeeRespDto getEmployeeById(long id);
	
	List<EmployeeRespDto> getAllEmployees();
	
	String updateEmployee(long id,EmployeeReqDto employee);
	
	String changePassword(long id,SigninRequest employee);
	
	Employee getEmployeeByBranchId(long branchId);
	
	  
	    
	  
}
