package com.bank.custom.exception;


@SuppressWarnings("serial")
public class BranchNotFoundException extends RuntimeException  {

	 	public BranchNotFoundException(String msg) {
	 		super(msg);
	 	}

}
