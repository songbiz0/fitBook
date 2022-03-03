package com.fitbook.shop;

import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.fit.FitService;
import com.fitbook.model.user.UserEntity;
import com.fitbook.mypage.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/shop")
public class ShopController {

    @Autowired ShopService service;
    @Autowired MypageService mypageService;
    @Autowired AuthenticationFacade authenticationFacade;

    @GetMapping("/detail")
    public void detail(@RequestParam int iproduct, Model model) {
        model.addAttribute("data", service.selProductDetail(iproduct));
        if(authenticationFacade.getLoginUser() == null) {
            UserEntity user = new UserEntity();
            user.setIuser(0);
            model.addAttribute("user", user);
        } else {
            model.addAttribute("user", authenticationFacade.getLoginUser());
        }
    }
}
