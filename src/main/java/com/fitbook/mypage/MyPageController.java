package com.fitbook.mypage;

import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.order.OrderDetailVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.user.UserEntity;
import com.fitbook.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

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

    @GetMapping("/order/detail")
    public String orderDetail(@RequestParam int iorder, Model model) {
        OrderDto dto = new OrderDto();
        dto.setIorder(iorder);
        OrderDetailVo vo = service.selOrderDetail(dto);
        model.addAttribute("data", vo);
        if(vo.getOrder_status().equals("취소완료")) {
            return "/mypage/canceldetail";
        } else {
            return "/mypage/orderdetail";
        }
    }

    @GetMapping("/leave")
    public void leave(Model model) {
        model.addAttribute("uid", authenticationFacade.getLoginUser().getUid());
    }

    @PostMapping("/leave")
    public String leaveProc(UserEntity entity, HttpServletResponse res) throws IOException {
        PrintWriter writer = res.getWriter();
        if(userService.delUser(entity) == 0) {
            writer.println("<script>alert('회원 탈퇴에 실패하였습니다.')</script>");
            return "redirect:/";
        } else {
            writer.println("<script>alert('회원 탈퇴에 성공했습니다.\n홈으로 이동합니다.')</script>");
            return "redirect:/user/logout";
        }
    }

    @GetMapping("/addr")
    public void addr() {}
}
