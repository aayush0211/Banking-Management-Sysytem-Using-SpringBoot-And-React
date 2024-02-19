package com.bank.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.custom.exception.InvalidPasswordException;
import com.bank.dao.BranchDao;
import com.bank.dao.EmployeeDao;
import com.bank.entities.AadharCard;
import com.bank.entities.Address;
import com.bank.entities.Branch;
import com.bank.entities.Employee;
import com.bank.entities.UserRole;
import com.bank.req.dto.EmployeeReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.EmployeeRespDto;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeServicieImpl implements EmployeeService {
	
	@Autowired
	public EmployeeDao employeeDao;
	@Autowired
	public ImageHandlingService imageService;
   @Autowired
	private ModelMapper mapper;
   @Autowired
   private BranchDao branchDao;
   @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

   

	@Override
	public String addEmployee(EmployeeReqDto newEmployee) {
		Employee employee = mapper.map(newEmployee, Employee.class);
		employee.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));
		Address addr = mapper.map(newEmployee, Address.class);
		employee.addAddress(addr);
		employee.setRole(UserRole.MANAGER);
		AadharCard aadhar = mapper.map(newEmployee, AadharCard.class);
		Branch branch = branchDao.findById(newEmployee.getBranchId()).orElseThrow(()-> new BranchNotFoundException("invalid branch id !!!"));
		employee.setAadharCard(aadhar);
		if(newEmployee.getImage() != null)
		employee.setImagePath(imageService.uploadImage(newEmployee.getImage()));
		
		employee.addBranch(branch);
		employeeDao.save(employee);
		return "Successfully added Employee of id : "+employee.getId();
	}

	@Override
	public String removeEmployee(long id) {
		String msg = "Remove Employee Failed, invalid id!!!!";
		if(employeeDao.existsById(id)) {
			Employee emp = employeeDao.findById(id).orElseThrow();
			emp.removeEmployeeBranch(emp.getBranch());
			employeeDao.deleteById(id);
			msg = "Delete Employee of id : "+id;
		}
		return msg;
	}

	@Override
	public EmployeeRespDto getEmployeeById(long id) {
		
	Employee e =	employeeDao.findById(id).orElseThrow(()-> new BranchNotFoundException("Invalid Employee id !!!!"));
	EmployeeRespDto emp =	mapper.map(e, EmployeeRespDto.class);
	if(e.getImagePath()!=null)
	emp.setImage(imageService.downloadImage(e.getImagePath()));
    emp.setBranchId(e.getBranch().getId());
    emp.setBranchName(e.getBranch().getBranchName());
    return emp;
	}

	@Override
	public List<EmployeeRespDto> getAllEmployees() {
		System.out.println("in employee service");
		List<EmployeeRespDto> lists = new ArrayList<>();
		//employeeDao.findAll().forEach(e->lists.add(mapper.map(e, EmployeeRespDto.class)));
	for( Employee e : employeeDao.findAll())
	{
	EmployeeRespDto emp =	mapper.map(e, EmployeeRespDto.class);
	if(e.getBranch()!=null) {
	     emp.setBranchId(e.getBranch().getId());
	     emp.setBranchName(e.getBranch().getBranchName());
	     
	     lists.add(emp);
	}
	}
	return lists;
	}

	@Override
	public String updateEmployee(long id, EmployeeReqDto employee) {
		Employee emp = employeeDao.findById(id).orElseThrow(()->new BranchNotFoundException("Invalid employee id!!!"));
		//emp.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));

		emp.setDob(employee.getDob());
		emp.setFirstName(employee.getFirstName());
		emp.setLastName(employee.getLastName());
		emp.setGender(employee.getGender());
		if(employee.getImage() != null)
		emp.setImagePath(imageService.uploadImage(employee.getImage()));
		Employee e = mapper.map(employee, Employee.class);
		if(e.getAadharCard()!=null)
		emp.setAadharCard(e.getAadharCard());
		Branch changeBranch = branchDao.findById(employee.getBranchId()).orElseThrow(()->new BranchNotFoundException("Invalid Branch Id!!!!"));
		emp.updateEmployeeBranch(changeBranch);;
		Address adr = mapper.map(employee, Address.class);
		adr.setCity(employee.getCity());
		adr.setStreet(employee.getStreet());
		adr.setState(employee.getState());
		adr.setCountry(employee.getCountry());
		adr.setZipCode(employee.getZipCode());
		
		
		return "Successfully updated employee of id :"+id;
	}

	
	@Override
	public String changePassword(long id, SigninRequest employee) {
	Employee emp =    employeeDao.findById(id).orElseThrow(()-> new BranchNotFoundException("employee not found, invalid id!!!"));
		if(!bCryptPasswordEncoder.matches(employee.getPassword(), emp.getPassword())) {
			throw new InvalidPasswordException("wrong password!!!");
		}
		emp.setPassword(bCryptPasswordEncoder.encode(employee.getNewPassword()));
	    return "Successfully change password of employee id : "+id;
	}

	@Override
	public Employee getEmployeeByBranchId(long branchId) {
	Branch branch =	branchDao.findById(branchId).orElseThrow(()->new BranchNotFoundException("Invalid branch id!!!"));
		
	return branch.getEmployee();
	}

	

	
}
