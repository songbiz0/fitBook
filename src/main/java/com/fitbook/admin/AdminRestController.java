package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
import com.fitbook.model.product.ProductDto;
import com.fitbook.model.product.ProductVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;
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

    //주문목록
    @GetMapping("/order")
    public List<OrderVo> selOrderList() {
        return service.selOrderList();
    }

    //상품목록
    @GetMapping("/product_master")
    public List<ProductVo>  selProductList(ProductDto dto){
        return service.selProductList(dto);
    }

    @GetMapping("/maxpage")
    public ResultVo selMaxPageVal(ProductDto dto){
        return service.selMaxPageVal(dto);
    }

}
