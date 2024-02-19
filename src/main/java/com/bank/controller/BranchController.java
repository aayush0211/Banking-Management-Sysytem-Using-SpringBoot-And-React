package com.bank.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.req.dto.BranchReqDto;
import com.bank.resp.dto.AddressDto;
import com.bank.service.BranchService;

import jakarta.validation.Valid;





@RestController
@RequestMapping("/branches")
@CrossOrigin(origins = "http//localhost:3000")
@Valid
public class BranchController {
	
	@Autowired
	private BranchService branchService;
	@Autowired
	private ModelMapper mapper;
	
	@GetMapping
	public ResponseEntity<?> getAllBranches()
	{
	return ResponseEntity.status(HttpStatus.OK).body(branchService.getAllBranches());
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateBranch(@RequestBody BranchReqDto branch,@PathVariable long id){
		AddressDto address = mapper.map(branch, AddressDto.class);
		return ResponseEntity.status(HttpStatus.OK).body(branchService.updateBranch(branch, address,id));
	}
	

	@GetMapping("/{id}")
	public ResponseEntity<?> getBranch(@PathVariable long id) throws BranchNotFoundException
	{
	return ResponseEntity.status(HttpStatus.OK).body(branchService.getBranchById(id));
	}
	
	@GetMapping("/getBranchesName")
	public ResponseEntity<?> getBranchesIdAndName() throws BranchNotFoundException
	{
	return ResponseEntity.status(HttpStatus.OK).body(branchService.getBranchesName());
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> removeBranch(@PathVariable long id){
		return ResponseEntity.status(HttpStatus.OK).body(branchService.removeBranch(id));
	}
	
	
}
