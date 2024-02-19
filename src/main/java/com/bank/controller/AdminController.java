package com.bank.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.req.dto.AdminReqDto;
import com.bank.req.dto.BranchReqDto;
import com.bank.req.dto.EmployeeReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.service.AdminService;
import com.bank.service.BranchService;
import com.bank.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@Valid
@RequestMapping("/admin")
@CrossOrigin(origins = "http//localhost:3000")
public class AdminController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private EmployeeService employeeService;
	
	
	@Autowired
	private BranchService branchService;
	
	@PostMapping("/branches")
	public ResponseEntity<?> addBranch(@RequestBody BranchReqDto newBranch){
		 
		return ResponseEntity.status(HttpStatus.CREATED).body(branchService.addBranch(newBranch));
	}
	
	@PostMapping("/employees")
	public ResponseEntity<?> addNewEmployee(@RequestBody EmployeeReqDto newEmployee)
	{
		System.out.println("in admin controller add new employee");
		return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.addEmployee(newEmployee));
	}
	
	@PostMapping("/{id}")
	ResponseEntity<?> changePassword(@PathVariable long id, @RequestBody SigninRequest admin)
	{
		return ResponseEntity.status(HttpStatus.OK).body(adminService.changePassword(id, admin));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateAdmin(@PathVariable long id,@RequestBody AdminReqDto admin)
	{
return	ResponseEntity.status(HttpStatus.OK).body(adminService.updateAdmin(id, admin));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getAdmin(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.OK).body(adminService.getAdmin(id));
	}
	

}
