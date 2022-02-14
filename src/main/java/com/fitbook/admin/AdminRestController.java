package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.model.cpu.CpuDto;
import com.fitbook.model.cpu.CpuVo;
import com.fitbook.model.gpu.GpuDto;
import com.fitbook.model.gpu.GpuVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
import com.fitbook.model.product.ProductVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ajax/admin")
public class AdminRestController {

    @Autowired private AdminService service;

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

    @GetMapping("/order")
    public List<OrderVo> selOrderList() {
        return service.selOrderList();
    }

    @GetMapping("/product_master")
    public List<ProductVo> selProductList(){
        return service.selProductList();
    }

    @GetMapping("/gpuSearch")
    public List<GpuVo> selGpuList(GpuDto dto) {
        System.out.println(dto);
        return service.selGpuList(dto);
    }

    @GetMapping("/cpuSearch")
    public List<CpuVo> selCpuList(CpuDto dto) {
        System.out.println(dto);
        return service.selCpuList(dto);
    }
}
