package com.fitbook.email;

import com.fitbook.ResultVo;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.email.EmailDto;
import com.fitbook.model.user.UserEntity;
import com.fitbook.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired EmailService service;
    @Autowired UserService userService;
    @Autowired AuthenticationFacade authenticationFacade;

    @PostMapping("/email")
    public ResultVo email(@RequestBody EmailDto email) {
        ResultVo result = new ResultVo();
        result.setResultString(service.mailCheck(email.getEmail()));
        return result;
    }

    @PostMapping("/findPw")
    public ResultVo findPw(@RequestBody UserEntity entity) {
        ResultVo result = new ResultVo();

        String pw = service.findPw(entity.getEmail());

        UserEntity user = new UserEntity();
        user.setUid(entity.getUid());
        user.setUpw(pw);
        int queryResult = userService.updUser(user);

        result.setResult(queryResult);
        return result;
    }
}
