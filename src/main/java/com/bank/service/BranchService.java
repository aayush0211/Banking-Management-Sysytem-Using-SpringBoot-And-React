package com.bank.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.bank.custom.exception.BranchNotFoundException;
import com.bank.entities.Branch;
import com.bank.req.dto.BranchReqDto;
import com.bank.resp.dto.AddressDto;
import com.bank.resp.dto.BranchRespDto;


public interface BranchService {
       
	String addBranch(BranchReqDto newBranch , AddressDto newBranchAddress);
	
	String updateBranch(BranchReqDto branch , AddressDto branchAddress, Long id);
	
	List<BranchRespDto> getAllBranches();
	
		BranchRespDto getBranchById(long id) throws BranchNotFoundException;
	
	String removeBranch(long id); 
	
	Map<Long, String> getBranchesName();
}
