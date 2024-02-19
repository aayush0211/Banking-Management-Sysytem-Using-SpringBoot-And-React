package com.bank.service;

import java.io.File;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bank.custom.exception.ApiException;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

import org.apache.commons.io.FileUtils;


@Service("image_folder")
@Transactional
public class ImageHandlingServiceImplFolder implements ImageHandlingService {

	// to inject the value of the property , from app property file 
	//, using Field DI
	// , using SpEL : Spring expr language
	@Value("${folder.location}")
	private String folderLocation;

	@PostConstruct
	public void init() {
		System.out.println("in init " + folderLocation);
		// chk if folder exists --yes --continue
		File folder = new File(folderLocation);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			// no --create a folder
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}


	@Override
	public String uploadImage(MultipartFile image){
		// store the image on server side folder
		try {
		String path = folderLocation.concat(image.getOriginalFilename());
		// Use FileUtils method : writeByte[] --> File
			FileUtils.writeByteArrayToFile(new File(path), image.getBytes());
			
			System.out.println("hii");
			return path;
		} catch (Exception e) {
			throw new RuntimeException("i/o error"+e.getMessage());
		}
		// set image path
		// OR to store the img directly in DB as a BLOB
		// emp.setImage(image.getBytes());
	}

	@Override
	public byte[] downloadImage(String path){
		
		if (path != null) {
			// path ---> File --> byte[]
			try {
				return FileUtils.readFileToByteArray(new File(path));
				
			} catch (IOException e) {
				throw new RuntimeException("i/o error"+e.getMessage());
			}
			//OR from DB : return emp.getImage();
		} else
			throw new ApiException("Image not yet assigned !!!!");
	}
//	   public static MultipartFile convertToMultipartFile(String filePath) throws IOException {
//	        File file = new File(filePath);
//	        FileInputStream input = new FileInputStream(file);
//	        MultipartFile multipartFile = new CommonsMultipartFil(input);\
//	        return multipartFile;


}
