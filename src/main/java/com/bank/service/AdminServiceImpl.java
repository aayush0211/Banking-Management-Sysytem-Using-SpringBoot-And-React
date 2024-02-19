package com.bank.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.dao.EmployeeDao;
import com.bank.entities.AadharCard;
import com.bank.entities.Address;

import com.bank.entities.Employee;
import com.bank.entities.UserRole;
import com.bank.req.dto.AdminReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.AdminRespDto;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private EmployeeDao employeeDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private LogInService logInService;
	@Override
	public String addAdmin(AdminReqDto admin) {
		// TODO Auto-generated method stub
	Employee employee =	mapper.map(admin, Employee.class);
	Address adr = mapper.map(admin,  Address.class);
	employee.addAddress(adr);
	employee.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
	employee.setRole(UserRole.ADMIN);
	AadharCard aadhar = mapper.map(admin, AadharCard.class);
	//Branch branch = branchDao.findById(newEmployee.getBranchId()).orElseThrow(()-> new BranchNotFoundException("invalid branch id !!!"));
	employee.setAadharCard(aadhar);
	//employee.setImagePath(imageService.uploadImage(newEmployee.getImage()));
	//employee.addBranch(branch);
	employeeDao.save(employee);
		return "Successfully admin registered of id "+employee.getId();
	}
	
	

	@Override
	public String changePassword(long id,SigninRequest admin) {
		logInService.employeeLogin(admin);
		Employee emp = employeeDao.findById(id).orElseThrow(()-> new BranchNotFoundException("invalid id!!!"));
		emp.setPassword(bCryptPasswordEncoder.encode(admin.getNewPassword()));
		return "Successfully change password of admin id : "+id;
	}



	@Override
	public String updateAdmin(long id, AdminReqDto admin) {
	Employee emp = employeeDao.findById(id).orElseThrow(()-> new BranchNotFoundException("invalid id!!!"));
	emp.setDob(admin.getDob());
	emp.setFirstName(admin.getFirstName());
	emp.setLastName(admin.getLastName());
	emp.setGender(admin.getGender());
//	if(admin.getPassword()!=null) {
//		
//		logInService.employeeLogin(new SigninRequest(admin.getEmail(),admin.getPassword()));
//	emp.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
//	}
	Address addr = emp.getAddress();
	addr.setCity(admin.getCity());
	addr.setCountry(admin.getCountry());
	addr.setState(admin.getState());
	addr.setStreet(admin.getStreet());
	emp.setDob(admin.getDob());
	emp.setMobileNumber(admin.getMobileNumber());
	Employee newAdmin = mapper.map(admin, Employee.class);
	if(newAdmin.getAadharCard()!=null)
	emp.setAadharCard(newAdmin.getAadharCard());
		return "Successfully updated admin of id "+id;
	}
	

	@Override
	public AdminRespDto getAdmin(long id) {
		// TODO Auto-generated method stub
	Employee emp =	employeeDao.findById(id).orElseThrow(()-> new BranchNotFoundException("Admin profile not found, invalid id!!!"));
		
	AdminRespDto admin = mapper.map(emp, AdminRespDto.class);
	return admin;
	}

}
