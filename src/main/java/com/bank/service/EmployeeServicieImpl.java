package com.bank.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.dao.BranchDao;
import com.bank.dao.EmployeeDao;
import com.bank.entities.AadharCard;
import com.bank.entities.Address;
import com.bank.entities.Branch;
import com.bank.entities.Employee;
import com.bank.req.dto.EmployeeReqDto;
import com.bank.resp.dto.EmployeeRespDto;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeServicieImpl implements EmployeeService {
	
	@Autowired
	public EmployeeDao employeeDao;
   @Autowired
	private ModelMapper mapper;
   @Autowired
   private BranchDao branchDao;
 
   

	@Override
	public String addEmployee(EmployeeReqDto newEmployee) {
		Address add = mapper.map(newEmployee, Address.class);
		Employee employee = mapper.map(newEmployee, Employee.class);
		AadharCard aadhar = mapper.map(newEmployee, AadharCard.class);
		Branch branch = branchDao.findById(newEmployee.getBranchId()).orElseThrow(()-> new BranchNotFoundException("invalid branch id !!!"));
		employee.setAadharCard(aadhar);
		employee.setAddress(add);
		employee.setBranch(branch);
		employeeDao.save(employee);
		return "Successfully added Employee of id : "+employee.getId();
	}

	@Override
	public String removeEmployee(long id) {
		String msg = "Remove Employee Failed, invalid id!!!!";
		if(employeeDao.existsById(id)) {
			employeeDao.deleteById(id);
			msg = "Delete Employee of id : "+id;
		}
		return msg;
	}

	@Override
	public EmployeeRespDto getEmployeeById(long id) {
		
	Employee e =	employeeDao.findById(id).orElseThrow(()-> new BranchNotFoundException("Invalid Employee id !!!!"));
	EmployeeRespDto emp =	mapper.map(e, EmployeeRespDto.class);
    emp.setBranchId(e.getBranch().getId());
    emp.setBranchName(e.getBranch().getBranchName());
    return emp;
	}

	@Override
	public List<EmployeeRespDto> getAllEmployees() {
		List<EmployeeRespDto> lists = new ArrayList<>();
		//employeeDao.findAll().forEach(e->lists.add(mapper.map(e, EmployeeRespDto.class)));
	for( Employee e : employeeDao.findAll())
	{
	EmployeeRespDto emp =	mapper.map(e, EmployeeRespDto.class);
	     emp.setBranchId(e.getBranch().getId());
	     emp.setBranchName(e.getBranch().getBranchName());
	     lists.add(emp);
	}
	return lists;
	}

	@Override
	public String updateEmployee(long id, EmployeeReqDto employee) {
		Employee emp = employeeDao.findById(id).orElseThrow(()->new BranchNotFoundException("Invalid employee id!!!"));
		emp.setDob(employee.getDob());
		emp.setFirstName(employee.getFirstName());
		emp.setLastName(employee.getLastName());
		emp.setGender(employee.getGender());
		emp.setPassword(employee.getPassword());
		emp.setImagePath(employee.getImagePath());
		Branch changeBranch = branchDao.findById(employee.getBranchId()).orElseThrow(()->new BranchNotFoundException("Invalid Branch Id!!!!"));
		emp.setBranch(changeBranch);
		
		return "Successfully updated employee of id :"+id;
	}

	@Override
	public Employee getEmployeeByBranchId(long branchId) {
	Branch branch =	branchDao.findById(branchId).orElseThrow(()->new BranchNotFoundException("Invalid branch id!!!"));
		
	return branch.getEmployee();
	}
}
