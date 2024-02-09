package com.bank.resp.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BranchRespDto {
             private Long id;
             private String branchName;
             private String phoneNumber;
             private String street;
             private String city;
             private String state;
             private String country;
             private String zipCode;
             private long empId=0;
             private String empName="";
}

