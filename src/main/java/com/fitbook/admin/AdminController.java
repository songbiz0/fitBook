package com.fitbook.admin;

import com.fitbook.Const;
import com.fitbook.model.cpu.CpuEntity;
import com.fitbook.model.cpu.CpuListEntity;
import com.fitbook.model.gpu.GpuEntity;
import com.fitbook.model.gpu.GpuListEntity;
import com.fitbook.model.product.ProductDetailListVo;
import com.fitbook.model.product.ProductVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired private AdminService service;

    // 메인
    @GetMapping("")
    public String index() { return "redirect:/admin/main"; }

    @GetMapping("/main")
    public void admin() {
    }

    // 유저
    @GetMapping("/user")
    public void user() {
    }

    @GetMapping("/userinfo")
    public void userinfo () {
    }

    // 주문
    @GetMapping("/order")
    public void order() {
    }

    //상품
    @GetMapping("/product_master")
    public void productmaster(){
    }

    @GetMapping("/insproduct")
    public void insProduct(Model model) {
        model.addAttribute("gpuData", service.selGpu());
        model.addAttribute("cpuData", service.selCpu());
    }

    @PostMapping("/insproduct")
    public String insProductProc(ProductDetailListVo productList, ProductVo vo) {
        int result = service.insProduct(vo, productList);
        return "redirect:/admin/insproduct";
    }

    // CPU
    @GetMapping("/cpuList")
    public void cpuList() {

    }

    @GetMapping("/cpu")
    public void cpu() {

    }

    @PostMapping("/cpu")
    public String cpuProc(CpuListEntity cpuList, Model model) {
        int cpuListLength = cpuList.getCpuList().size();
        int result = service.insCpu(cpuList);

        if(cpuListLength != result) {
            model.addAttribute("msg", (cpuListLength - result) + "개의 파일이 업로드에 실패하였습니다.");
        }

        System.out.println(result);

        return "redirect:/admin/cpu";
    }

    // GPU
    @GetMapping("/gpuList")
    public void gpuList() {

    }

    @GetMapping("/gpu")
    public void gpu() {
    }

    @PostMapping("/gpu")
    public String gpuProc(GpuListEntity gpuList, Model model) {
        int gpuListLength = gpuList.getGpuList().size();
        int result = service.insGpu(gpuList);
        if(gpuListLength != result) {
            model.addAttribute("msg", (gpuListLength - result) + "개의 파일이 업로드에 실패하였습니다.");
        }

        return "redirect:/admin/gpu";
    }

    // 프로그램
    @GetMapping("/program")
    public void program() {
    }

}
