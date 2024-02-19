package com.bank.service;


import org.springframework.web.multipart.MultipartFile;

public interface ImageHandlingService {
	String uploadImage(MultipartFile image);
	byte[] downloadImage(String path);
}
