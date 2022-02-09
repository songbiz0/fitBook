package com.fitbook.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("")
    public String index() { return "redirect:/admin/main"; }

    @GetMapping("/main")
    public void admin(Model model) {
        model.addAttribute("uri", "main");
    }

    @GetMapping("/user")
    public void user(Model model) {
        model.addAttribute("uri", "user");
    }

    @GetMapping("/userinfo")
    public void userinfo(Model model) {
        model.addAttribute("uri", "userinfo");
    }
}
