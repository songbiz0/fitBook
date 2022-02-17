package com.fitbook.user;

import com.fitbook.ResultVo;
import com.fitbook.model.email.EmailDto;
import com.fitbook.model.user.UserEntity;
import com.fitbook.mypage.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired private UserService service;
    @Autowired private MypageService mypageService;

    @GetMapping("/login")
    public void login(@ModelAttribute UserEntity userEntity) {}

    @GetMapping("/join")
    public void join(@ModelAttribute UserEntity userEntity) {}

    @PostMapping("/join")
    public String joinProc(UserEntity userEntity) {
        int result = service.join(userEntity);
        return "redirect:join_result";
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

    @PostMapping("/pwChk")
    @ResponseBody
    public ResultVo pwChk(@RequestParam String upw) {
        ResultVo result = new ResultVo();
        result.setResult(mypageService.confirmPassword(upw) ? 1 : 0);
        return result;
    }

    @GetMapping("/emailChk")
    @ResponseBody
    public ResultVo emailChk(@RequestParam String email) {
        UserEntity entity = new UserEntity();
        entity.setEmail(email);
        UserEntity user = service.selUser(entity);
        ResultVo result = new ResultVo();
        result.setResult(user == null ? 1 : 0);
        return result;
    }

    @GetMapping("/join_result")
    public void join_result() {}

    @GetMapping("/find_id")
    public void find_id() {}

    @GetMapping("/find_id/{email}")
    @ResponseBody
    public ResultVo find_id(@PathVariable String email) {
        UserEntity entity = new UserEntity();
        entity.setEmail(email);
        UserEntity user = service.selUser(entity);
        ResultVo result = new ResultVo();
        result.setResultString(user != null ? user.getUid() : null);
        return result;
    }

    @GetMapping("/find_id_result")
    public void find_id_result() {}

    @GetMapping("/find_pw")
    public void find_pw() {}

    @GetMapping("find_pw/find")
    @ResponseBody
    public ResultVo find_pwProc(@RequestParam String uid, @RequestParam String email) {
        UserEntity entity = new UserEntity();
        entity.setUid(uid);
        entity.setEmail(email);

        UserEntity user = service.selUser(entity);
        ResultVo result = new ResultVo();
        result.setResult(user == null ? 0 : 1);
        return result;
    }

    @GetMapping("/find_pw_result")
    public void find_pw_result() {}
}
