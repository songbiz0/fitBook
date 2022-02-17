package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.model.cpu.CpuDto;
import com.fitbook.model.cpu.CpuVo;
import com.fitbook.model.gpu.GpuDto;
import com.fitbook.model.gpu.GpuVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
import com.fitbook.model.product.ProductDto;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.program.ProgramDto;
import com.fitbook.model.program.ProgramVo;
import com.fitbook.model.user.UserDto;
import com.fitbook.model.user.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ajax/admin")
public class AdminRestController {

    @Autowired
    private AdminService service;

    @GetMapping("/month")
    public Map<String, Integer> selMonth() {
        return service.selCurrentMonthList();
    }

    @GetMapping("/daily")
    public Map<String, Integer> selDaily() {
        return service.selThisMonthList();
    }

    @GetMapping("/brand")
    public Map<String, Integer> selBrandDemand() {
        return service.selBrandDemandList();
    }

    //주문목록
    @GetMapping("/order")
    public List<OrderVo> selOrderList() {
        return service.selOrderList();
    }

    //상품목록
    @GetMapping("/product_master")
    public List<ProductVo>  selProductList(ProductDto dto) {
        System.out.println(dto);
        return service.selProductList(dto);
    }
    
    @GetMapping("/maxpage")
    public ResultVo selMaxPageVal(ProductDto dto) {
        return service.selMaxPageVal(dto);
    }

    // Parts
    @GetMapping("/gpuMaxPage")
    public ResultVo selPartsMaxPage(GpuDto dto) {
        return service.gpuMaxPage(dto);
    }
    @GetMapping("/gpuSearch")
    public List<GpuVo> selGpuList(GpuDto dto) {
        return service.selGpuList(dto);
    }

    @GetMapping("/cpuMaxPage")
    public ResultVo selPartsMaxPage(CpuDto dto) {
        System.out.println("maxPage : " + dto);
        return service.cpuMaxPage(dto);
    }
    @GetMapping("/cpuSearch")
    public List<CpuVo> selCpuList(CpuDto dto) {
        System.out.println("search : " + dto);
        return service.selCpuList(dto);
    }

    @GetMapping("/programSearch")
    public List<ProgramVo> programList(ProgramDto dto) {
        return service.selProgramList(dto);
    }
    @GetMapping("/programMaxPage")
    public ResultVo programMaxPage(ProgramDto dto) {
        return service.selProgramMaxPage(dto);
    }

    @GetMapping("/user")
    public List<UserVo> selUserList() {
        return service.selUserList();
    }

    @GetMapping("/selectUserSearchList")
    private List<UserVo> selectUserSearchList(@RequestParam String type, @RequestParam String keyword) throws Exception {
        System.out.println(type);
        System.out.println(keyword);
        UserDto dto = new UserDto();
        dto.setType(type);
        dto.setKeyword(keyword);
        return service.selectUserSearchList(dto);
    }
}
