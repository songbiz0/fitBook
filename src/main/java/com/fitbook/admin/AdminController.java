package com.fitbook.admin;

import com.fitbook.Const;
import com.fitbook.model.cpu.CpuEntity;
import com.fitbook.model.gpu.GpuEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired private AdminService service;

    @GetMapping("")
    public String index() { return "redirect:/admin/main"; }

    @GetMapping("/main")
    public void admin(Model model) {
        model.addAttribute(Const.URI, Const.MAIN);
    }

    @GetMapping("/user")
    public void user(Model model) {
        model.addAttribute(Const.URI, Const.USER);
    }

    @GetMapping("/userinfo")
    public void userinfo(Model model) {
        model.addAttribute(Const.URI, "userinfo");
    }

    @GetMapping("/order")
    public void order(Model model) {
        model.addAttribute(Const.URI, Const.ORDER);
    }

    @GetMapping("/insproduct")
    public void product(Model model) {
        model.addAttribute(Const.URI, Const.INS_PRODUCT);
    }

    @GetMapping("/cpu")
    public void cpu(Model model) {
        model.addAttribute(Const.URI, "cpu");
    }

    @PostMapping("/cpu")
    public String cpuProc(CpuEntity entity, RedirectAttributes attr) {
        int result = service.insCpu(entity);
        attr.addFlashAttribute("msg", "CPU 등록 성공");
        if(result == 0) {
            attr.addFlashAttribute("msg", "CPU 등록 실패");
        }
        return "redirect:/admin/cpu";
    }

    @GetMapping("/gpu")
    public void gpu(Model model) {
        model.addAttribute(Const.URI, "gpu");
    }

    @PostMapping("/gpu")
    public String gpuProc(GpuEntity entity, RedirectAttributes attr) {
        int result = service.insGpu(entity);
        attr.addFlashAttribute("msg", "GPU 등록 성공");
        if(result == 0) {
            attr.addFlashAttribute("msg", "GPU 등록 실패");
        }
        return "redirect:/admin/gpu";
    }

}
