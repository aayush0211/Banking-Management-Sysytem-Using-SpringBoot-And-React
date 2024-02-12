package com.bank.resp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LogInResp {
             private String email;
             
             private String firstName;
             
             private String lastName;
             
             private String role;
             
             private String jwtToken;
             
             private long id;
             
}
