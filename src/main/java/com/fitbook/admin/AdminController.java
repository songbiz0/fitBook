package com.fitbook.admin;

import com.fitbook.Const;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.cpu.CpuListEntity;
import com.fitbook.model.gpu.GpuListEntity;
import com.fitbook.model.product.ProductDetailListVo;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.productquestion.ProductQuestionDto;
import com.fitbook.model.productquestion.ProductQuestionEntity;
import com.fitbook.model.productquestion.ProductQuestionVo;
import com.fitbook.model.program.ProgramListVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired private AdminService service;
    @Autowired private AuthenticationFacade authenticationFacade;

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
    public void product_master(){
    }

    //상품디테일
    @GetMapping("/product_master_detail")
    public void product_master_detail(){

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

    @GetMapping("/cpuDetail")
    public void cpuDetail() {

    }

    @GetMapping("/cpu")
    public void cpu(Model model) {
        model.addAttribute(Const.DATA, service.selInnerGpu());
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

    @GetMapping("/gpuDetail")
    public void gpuDetail() {}

    @GetMapping("/gpu")
    public void gpu() {}

    @PostMapping("/gpu")
    public String gpuProc(GpuListEntity gpuList, Model model) {
        System.out.println(gpuList);
        int gpuListLength = gpuList.getGpuList().size();
        int result = service.insGpu(gpuList);
        if(gpuListLength != result) {
            model.addAttribute("msg", (gpuListLength - result) + "개의 파일이 업로드에 실패하였습니다.");
        }

        return "redirect:/admin/gpu";
    }

    // 프로그램
    @GetMapping("/programList")
    public void programList() {

    }
    @GetMapping("/program")
    public void program() {
    }
    @PostMapping("/program")
    public String programProc(ProgramListVo programList, Model model) throws Exception {
        int programListLength = programList.getProgramList().size();
        int result = service.insProgram(programList);
        if(programListLength != result) {
            model.addAttribute("msg", (programListLength - result) + "개의 파일이 업로드에 실패하였습니다.");
        }
        return "redirect:/admin/program";
    }
    @GetMapping("/programDetail")
    public void programDetail() {}

    // QnA
    @GetMapping("/qna")
    public void qnaList() {

    }
}
