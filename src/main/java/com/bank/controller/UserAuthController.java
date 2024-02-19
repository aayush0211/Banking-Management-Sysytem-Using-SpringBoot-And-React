package com.bank.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bank.req.dto.AccountReqDto;
import com.bank.req.dto.AdminReqDto;

import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.LogInResp;
import com.bank.service.AccountService;
import com.bank.service.AdminService;
import com.bank.service.BranchService;
import com.bank.service.LogInService;
import com.bank.utils.JwtUtils;

import jakarta.validation.Valid;


@RestController
@CrossOrigin(origins = "http//localhost:3000")
@Valid
public class UserAuthController {
//dep :
	
	@Autowired
	private JwtUtils utils;

	@Autowired
	private LogInService loginService;
	
	
    @Autowired
    private BranchService branchService;

	
	@Autowired
	private AccountService accountservice;
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/signup/admin")
	public ResponseEntity<?> addNewEmployee(@RequestBody AdminReqDto newEmployee)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addAdmin(newEmployee));
	}
	
	@PostMapping("/signup/account")
	public ResponseEntity<?> addNewAccount(@RequestBody AccountReqDto newAccount)
	{
		
		return ResponseEntity.status(HttpStatus.CREATED).body(accountservice.addAccount(newAccount));
	
	}
	@GetMapping("/signin/getAllBranches")
	public ResponseEntity<?> getAllBranches()
	{
	return ResponseEntity.status(HttpStatus.OK).body(branchService.getAllBranches());
	}
	
	// add end point for user registration
//	@PostMapping("/signup")
//	public ResponseEntity<?> userRegistration(@RequestBody AccountReqDto request) {
//		System.out.println("in user reg " + request);
//		return ResponseEntity.ok(loginService.addAccount(request));
//	}
	

	/*
	 * request payload : Auth req DTO : email n password resp payload : In case of
	 * success : Auth Resp DTO : mesg + JWT token + SC 200 IN case of failure : SC
	 * 401
	 */
	@PostMapping("/signin/account")
	public ResponseEntity<?> signInAccount(@RequestBody  SigninRequest request) {
		System.out.println("in sign in " + request);
		// invoke autheticate(...) of Authenticate for auth
		//Authentication principal = mgr
		//		.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
	LogInResp resp =	loginService.accountLogin(request);
		// generate JWTS
		String jwtToken = utils.generateJwtToken(resp);
		resp.setJwtToken(jwtToken);
		//return ResponseEntity.ok(new SigninResponse(jwtToken, "User authentication success!!!"));
		return ResponseEntity.status(HttpStatus.OK).body(resp);
	}
	@PostMapping("/signin/employee")
	public ResponseEntity<?> signInEmployee(@RequestBody @Valid SigninRequest request) {
		System.out.println("in sign in " + request);
		// invoke autheticate(...) of Authenticate for auth
//		Authentication principal = mgr
//				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
	LogInResp resp =	loginService.employeeLogin(request);
		// generate JWTS
		String jwtToken = utils.generateJwtToken(resp);
		resp.setJwtToken(jwtToken);
		//return ResponseEntity.ok(new SigninResponse(jwtToken, "User authentication success!!!"));
		return ResponseEntity.status(HttpStatus.OK).body(resp);
	}
}
