package com.bank.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
public class Apiresponse {
	private LocalDateTime timeStamp;
	private String message;
	public Apiresponse(String message) {
		super();
		this.message = message;
		this.timeStamp=LocalDateTime.now();
}
}
