package com.fitbook.email;

import com.fitbook.ResultVo;
import com.fitbook.model.email.EmailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired EmailService service;

    @PostMapping("/email")
    public ResultVo email(@RequestBody EmailDto email) {
        ResultVo result = new ResultVo();
        result.setResultString(service.mailCheck(email.getEmail()));
        return result;
    }
}
