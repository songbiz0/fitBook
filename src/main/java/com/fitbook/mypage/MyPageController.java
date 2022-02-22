package com.fitbook.mypage;

import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.user.UserEntity;
import com.fitbook.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired private MypageService service;
    @Autowired private UserService userService;
    @Autowired private AuthenticationFacade authenticationFacade;

    static boolean isRightPassword = false;

    @GetMapping("")
    public String mypage() {
        return "redirect:/mypage/orderlist";
    }

    @GetMapping("/orderlist")
    public void orderlist() {}

    @GetMapping("/cancellist")
    public void cancellist() {}

    @GetMapping("/pointhistory")
    public void pointhistory() {}

    @GetMapping("/changeinfo/conf")
    public String changeinfoconf(Model model) {
        model.addAttribute("uid", authenticationFacade.getLoginUser().getUid());
        return "/mypage/changeinfoconf";
    }

    @PostMapping("/changeinfoconf")
    public String changeinfoconfProc(@RequestParam String upw, RedirectAttributes reAttr) {
        isRightPassword = service.confirmPassword(upw);
        if(!isRightPassword) {
            reAttr.addFlashAttribute("err", "err");
            return "redirect:/mypage/changeinfo/conf";
        }
        return "redirect:/mypage/changeinfo";
    }

    @GetMapping("/changeinfo")
    public String changeinfo(Model model) {
        if(isRightPassword) {
            isRightPassword = false;
            model.addAttribute("user", authenticationFacade.getLoginUser());
            return "/mypage/changeinfo";
        } else {
            return "redirect:/mypage/changeinfoconf";
        }
    }

    @PostMapping("/changeinfo")
    public String changeinfoProc(UserEntity entity, RedirectAttributes reAttr) {
        System.out.println(entity);
        int result = userService.updUser(entity);
        if(result == 0) {
            return "redirect:/mypage/changeinfo/fail";
        }
        return "redirect:/mypage/changeinfo/result";
    }

    @GetMapping("/changeinfo/fail")
    public String changeInfoFail() { return "/mypage/change_fail"; }

    @GetMapping("/changeinfo/result")
    public String changeInfoResult() { return "/mypage/change_result"; }

    @GetMapping("/favoritelist")
    public void favoritelist() {}
}
