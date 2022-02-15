package com.fitbook.mypage;

import com.fitbook.ResultVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mypage/api")
public class MyPageRestController {

    @Autowired MypageService service;

    @PostMapping("/orderlist")
    List<OrderVo> orderlist(@RequestBody OrderDto dto) { return service.selOrderList(dto); }

    @PostMapping("/maxpage")
    ResultVo maxpage(@RequestBody OrderDto dto) { return service.selMaxPageVal(dto); }
}
