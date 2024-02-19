package com.bank.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.dao.BranchDao;
import com.bank.entities.Address;
import com.bank.entities.Branch;
import com.bank.req.dto.BranchReqDto;
import com.bank.resp.dto.AddressDto;
import com.bank.resp.dto.BranchRespDto;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class BranchServiceImp implements BranchService {

	@Autowired
	private BranchDao branchDao;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public String addBranch(BranchReqDto newBranch) {
		
		 Branch branch = mapper.map(newBranch, Branch.class);
		 Address newAddress = mapper.map(newBranch, Address.class); 
		 branch.addAddress(newAddress);
		  branch.setEmployee(null);
		  
		 branchDao.save(branch);
		return "Successfully Added Branch of id: "+ branch.getId();
	}

	@Override
	public String updateBranch(BranchReqDto branch, AddressDto branchAddress, Long id) {
	 Address validBranchAddress = mapper.map(branchAddress, Address.class);
		 Branch validBranch = mapper.map(branch, Branch.class);
//		 validBranch.setAddress(validBranchAddress);
//		 branchDao.(validBranch);
		Branch existBranch = branchDao.findById(id).orElseThrow(()->new BranchNotFoundException("Branch not found, id invalid!!"));
		Address existAddress = existBranch.getAddress();
		existAddress.setCity(validBranchAddress.getCity());
		existAddress.setCountry(validBranchAddress.getCountry());
		existAddress.setState(validBranchAddress.getState());
		existAddress.setStreet(validBranchAddress.getStreet());
		existAddress.setZipCode(validBranchAddress.getZipCode());
		existBranch.setBranchName(validBranch.getBranchName());
		existBranch.setPhoneNumber(validBranch.getPhoneNumber());
		//existBranch.setEmployee(validBranch.getEmployee());
		return "Successfully Updated Branch of id: "+ id;
	}

	@Override
	public List<BranchRespDto> getAllBranches() {
			List<BranchRespDto> lists = new ArrayList<>();
		 List<Branch> branchLists = branchDao.findAll();
		 for(Branch p : branchLists) {
//			 Address addr = p.getAddress();
			BranchRespDto vBranch =  mapper.map(p, BranchRespDto.class);
//			vBranch.setCity(addr.getCity());
//			vBranch.setCountry(addr.getCountry());
//			vBranch.setStreet(addr.getStreet());
//			vBranch.setZipCode(addr.getZipCode());
//			vBranch.setState(addr.getState());
			
			if(p.getEmployee() !=null) {
			vBranch.setEmpId(p.getEmployee().getId());
			vBranch.setEmpName(p.getEmployee().getFirstName().concat(" "+p.getEmployee().getLastName()));
			}
			else {
				vBranch.setEmpId(0);
				vBranch.setEmpName("No employees assigned");
			}
			lists.add(vBranch);
			
		 }
		 return lists;
	}

	@Override
	public BranchRespDto getBranchById(long id) throws BranchNotFoundException {
		
		Branch branch = branchDao.findById(id).orElseThrow(()->new BranchNotFoundException("Invalid id"));
		BranchRespDto vBranch =  mapper.map(branch, BranchRespDto.class);
		vBranch.setCity(branch.getAddress().getCity());
		vBranch.setCountry(branch.getAddress().getCountry());
		vBranch.setStreet(branch.getAddress().getStreet());
		vBranch.setZipCode(branch.getAddress().getZipCode());
		vBranch.setState(branch.getAddress().getState());
		if(branch.getEmployee()!=null) {
		vBranch.setEmpId(branch.getEmployee().getId());
		vBranch.setEmpName(branch.getEmployee().getFirstName().concat(" "+branch.getEmployee().getLastName()));
		}
		else {
			vBranch.setEmpId(0);
			vBranch.setEmpName("No employees assigned");
		}
		return vBranch;
	}

	@Override
	public String removeBranch(long id) {
		String msg = "Branch Deletion failed , Invalid id";
		if(branchDao.existsById(id)) {
			branchDao.deleteById(id);
			msg = "Successfully Branch deleted ";
		}
		return msg;
	}

	@Override
	public Map<Long, String> getBranchesName() {
		Map<Long , String > maps = new HashMap<>();
		 branchDao.findAll().stream().forEach(p-> maps.putIfAbsent(p.getId(), p.getBranchName()));
		return maps; 
	}
	
	
}
