package com.fitbook;

import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.fit.FitService;
import com.fitbook.model.PageDto;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.question.QuestionDto;
import com.fitbook.model.user.UserEntity;
import com.fitbook.shop.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    @Autowired private ShopService shopService;
    @Autowired private FitService fitService;
    @Autowired private AuthenticationFacade authenticationFacade;

    @GetMapping("/")
    public String main(Model model) {
        PageDto dto = new PageDto();
        dto.setStartIdx(0);
        dto.setRecordCount(4);
        List<ProductVo> bestList = shopService.selBestProductList(dto);
        List<ProductVo> newList = shopService.selNewProductList(dto);

        if(authenticationFacade.getLoginUser() != null) {
            QuestionDto questionDto = fitService.selQuestion();
            if(questionDto != null) {
                questionDto = fitService.calRequiredPerformance(questionDto);
                List<ProductVo> list = fitService.selProductList();
                for (ProductVo vo : list) {
                    vo.setFitness(fitService.calFitness(questionDto, vo));
                }
                list.sort((o1, o2) -> o2.getFitness() - o1.getFitness());
                model.addAttribute("recommended", list.subList(0, 4));
                for(ProductVo vo : bestList) {
                    vo.setFitness(fitService.calFitness(questionDto, vo));
                }
                for(ProductVo vo : newList) {
                    vo.setFitness(fitService.calFitness(questionDto, vo));
                }
            } else {
                for(ProductVo vo : bestList) {
                    vo.setFitness(-1);
                }
                for(ProductVo vo : newList) {
                    vo.setFitness(-1);
                }
            }
        } else {
            for(ProductVo vo : bestList) {
                vo.setFitness(-1);
            }
            for(ProductVo vo : newList) {
                vo.setFitness(-1);
            }
        }

        model.addAttribute("best", bestList);
        model.addAttribute("newList", newList);

        if(authenticationFacade.getLoginUser() == null) {
            UserEntity user = new UserEntity();
            user.setIuser(0);
            model.addAttribute("user", user);
        } else {
            model.addAttribute("user", authenticationFacade.getLoginUser());
        }

        return "main";
    }
}
