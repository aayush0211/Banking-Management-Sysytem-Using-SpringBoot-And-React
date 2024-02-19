package com.bank.service;



import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.LogInResp;

public interface LogInService {
	
	 LogInResp accountLogin(SigninRequest req);
	
	LogInResp employeeLogin(SigninRequest req); 
	
}
