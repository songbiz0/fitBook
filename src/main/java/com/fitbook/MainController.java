package com.fitbook;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String main() { return "main"; }

    @GetMapping("/minjae")
    public void minjae() {}

    @GetMapping("/doungkyu")
    public void doungkyu(){}

    @GetMapping("/eonsu")
    public void eonsu() {}
}
