package com.bank.service;

import com.bank.req.dto.AdminReqDto;
import com.bank.req.dto.SigninRequest;
import com.bank.resp.dto.AdminRespDto;

public interface AdminService {
                String addAdmin(AdminReqDto admin);
                String updateAdmin(long id,AdminReqDto admin);
                AdminRespDto getAdmin(long id);
                String changePassword(long id,SigninRequest admin);
}
