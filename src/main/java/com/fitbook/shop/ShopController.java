package com.fitbook.shop;

import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.fit.FitService;
import com.fitbook.model.PageDto;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.product.ProductDetailVo;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.question.QuestionDto;
import com.fitbook.model.user.UserEntity;
import com.fitbook.mypage.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/shop")
public class ShopController {

    @Autowired ShopService service;
    @Autowired MypageService mypageService;
    @Autowired FitService fitService;
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

    @GetMapping("/list")
    public void list(Model model, PageDto dto) {
        int iuser = 0;

        dto.setCurrentPage(dto.getCurrentPage() == 0 ? 1 : dto.getCurrentPage());
        dto.setRecordCount(dto.getRecordCount() == 0 ? 20 : dto.getRecordCount());
        dto.setSort(dto.getSort() == null ? "best" : dto.getSort());

        // 답변 여부
        boolean fit = false;
        if(authenticationFacade.getLoginUser() != null) {
            QuestionDto questionDto = fitService.selQuestion();
            iuser = authenticationFacade.getLoginUserPk();
            if (questionDto != null) {
                fit = true;
            }
        }

        model.addAttribute("iuser", iuser);

        if(dto.getBrand() != null) { dto.setBrand(service.fromJSON(dto.getBrand())); }
        if(dto.getCpu() != null) { dto.setCpu(service.fromJSON(dto.getCpu())); }
        if(dto.getGpu() != null) {
            dto.setGpu(service.fromJSON(dto.getGpu()));
            if(dto.getGpu().get(0).equals("innerGpu")) {
                dto.setInnerGpu(true);
            }
        }
        if(dto.getSize() != null) { dto.setSize(service.fromJSON(dto.getSize())); }
        if(dto.getRam() != null) { dto.setRam(service.fromJSON(dto.getRam())); }
        if(dto.getOs() != null) { dto.setOs(service.fromJSON(dto.getOs())); }
        if(dto.getWeight() != null) { dto.setWeight(service.fromJSON(dto.getWeight())); }
        if(dto.getRes() != null) { dto.setRes(service.fromJSON(dto.getRes())); }
        if(dto.getHz() != null) { dto.setHz(service.fromJSON(dto.getHz())); }
        if(dto.getBattery() != null) { dto.setBattery(service.fromJSON(dto.getBattery())); }
        if(dto.getEtc() != null) { dto.setEtc(service.fromJSON(dto.getEtc())); }

        int maxPage = service.selMaxPage(dto);

        model.addAttribute("fit", fit);
        model.addAttribute("pagedto", dto);
        model.addAttribute("maxpage", maxPage);
        model.addAttribute("searchlist", service.selList());

        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if (startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);

        if(dto.getSort().equals("recommendation")) {
            if(fit) {
                QuestionDto questionDto = fitService.selQuestion();
                questionDto = fitService.calRequiredPerformance(questionDto);
                dto.setStartIdx(0);
                dto.setRecordCount(1000000);
                List<ProductVo> list = service.selProductList(dto);
                for (ProductVo vo : list) {
                    vo.setFitness(fitService.calFitness(questionDto, vo));
                }
                dto.setRecordCount(20);
                list.sort((o1, o2) -> o2.getFitness() - o1.getFitness());
                int end = Math.min(list.size(), startIdx + dto.getRecordCount());
                model.addAttribute("list", list.subList(startIdx, end));
            }
        } else {
            List<ProductVo> list = service.selProductList(dto);
            if(fit) {
                QuestionDto questionDto = fitService.selQuestion();
                questionDto = fitService.calRequiredPerformance(questionDto);
                for (ProductVo vo : list) {
                    vo.setFitness(fitService.calFitness(questionDto, vo));
                }
            } else {
                for (ProductVo vo : list) {
                    vo.setFitness(-1);
                }
            }
            model.addAttribute("list", list);
        }
    }

    @GetMapping("/cart")
    public void cart() {}

    @GetMapping("/order")
    public void order(@RequestParam List<String> list, Model model) {
        model.addAttribute("user", authenticationFacade.getLoginUser());
        model.addAttribute("list", service.selOrderCartList(service.fromJSON(list)));
    }

    @PostMapping("/order")
    public String orderProc(OrderDto dto, Model model) {
        int result = 0;
        try {
            service.order(dto);
            model.addAttribute("iorder", dto.getIorder());
            result = 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result == 0 ? "shop/orderfail" : "shop/ordersuccess";
    }
}
