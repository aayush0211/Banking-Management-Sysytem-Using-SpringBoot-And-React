package com.bank.custom.exception;

@SuppressWarnings("serial")
public class LimitExceededException extends RuntimeException {

	public LimitExceededException(String message) {
		super(message);
		
	}
	
	
}
