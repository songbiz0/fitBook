package com.fitbook.mypage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    @GetMapping("")
    public String mypage() {
        return "redirect:/mypage/orderlist";
    }

    @GetMapping("/orderlist")
    public void orderlist() {}
}
