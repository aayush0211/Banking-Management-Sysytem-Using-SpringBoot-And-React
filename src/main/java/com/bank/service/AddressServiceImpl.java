package com.bank.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dao.AddressDao;
import com.bank.dao.EmployeeDao;
import com.bank.entities.Address;
import com.bank.entities.Employee;
import com.bank.resp.dto.AddressDto;
import com.bank.response.Apiresponse;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	private AddressDao addrDao;
	@Autowired
	private EmployeeDao empDao;
	@Autowired
	private ModelMapper mapper;
	
//	public Apiresponse assignEmpAddress(Long empId, AddressDto adr) {
//				Employee emp=empDao.getReferenceById(empId);
//				Address addressEntity = mapper.map(adr, Address.class);
//				addressEntity.setEmployee(emp);;//assigning a placeholder : proxy
//				addrDao.save(addressEntity);
//				return new  Apiresponse("address assigned to emp....");
//	}
}
