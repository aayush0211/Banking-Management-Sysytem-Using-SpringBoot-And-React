package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.req.dto.EmployeeReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	
	@GetMapping
	public ResponseEntity<?> getAllEmployees()
	{
	return	ResponseEntity.status(HttpStatus.OK).body(employeeService.getAllEmployees());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getEmployeeById(@PathVariable long id)
	{
	return	ResponseEntity.status(HttpStatus.OK).body(employeeService.getEmployeeById(id));
	}
	
	
	
	@GetMapping("/admin/{id}")public ResponseEntity<?> getAdminDetails(@PathVariable long id)
	{
	return	ResponseEntity.status(HttpStatus.OK).body(employeeService.getEmployeeById(id));
	}
	
	@GetMapping("/getEmployeeByBranchId/{id}")
	public ResponseEntity<?> getEmployeeByBranchId(@PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(employeeService.getEmployeeByBranchId(id));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable long id)
	{
		return ResponseEntity.status(HttpStatus.OK).body(employeeService.removeEmployee(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable long id ,@RequestBody EmployeeReqDto employee)
	{
	return	ResponseEntity.status(HttpStatus.OK).body(employeeService.updateEmployee(id, employee));
	}
	@PostMapping("/{id}")
	public ResponseEntity<?> changePassword(@PathVariable long id, @RequestBody SigninRequest employee)
	{
		return ResponseEntity.status(HttpStatus.OK).body(employeeService.changePassword(id, employee));
	}
}
