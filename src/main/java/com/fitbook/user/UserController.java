package com.fitbook.user;

import com.fitbook.ResultVo;
import com.fitbook.model.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired private UserService service;

    @GetMapping("/login")
    public void login(@ModelAttribute UserEntity userEntity) {}

    @GetMapping("/join")
    public void join(@ModelAttribute UserEntity userEntity) {}

    @PostMapping("/join")
    public String joinProc(UserEntity userEntity) {
        int result = service.join(userEntity);
        return "redirect:login";
    }

    @GetMapping("/idChk/{uid}")
    @ResponseBody
    public ResultVo idChk(@PathVariable String uid) {
        ResultVo result = new ResultVo();
        UserEntity entity = new UserEntity();
        entity.setUid(uid);
        result.setResult(service.selUser(entity) == null ? 0 : 1);
        return result;
    }
}
