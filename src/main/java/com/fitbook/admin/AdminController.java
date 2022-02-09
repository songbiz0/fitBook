package com.fitbook.admin;

import com.fitbook.Const;
import com.fitbook.model.order.OrderVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired AdminService service;

    @GetMapping("")
    public String index() { return "redirect:/admin/main"; }

    @GetMapping("/main")
    public void admin(Model model) {
        model.addAttribute(Const.URI, Const.MAIN);
    }

    @GetMapping("/user")
    public void user(Model model) {model.addAttribute(Const.URI, Const.USER);}

    @GetMapping("/userinfo")
    public void userinfo(Model model) {
        model.addAttribute(Const.URI, "userinfo");
    }

    @GetMapping("/order")
    public void order(Model model) {
        model.addAttribute(Const.URI, Const.ORDER);
    }

    @GetMapping("/product")
    public void product(Model model) {model.addAttribute(Const.URI, Const.PRODUCT);}

}
