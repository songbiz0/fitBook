package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.model.OrderDto;
import com.fitbook.model.OrderVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ajax/admin")
public class AdminRestController {

    @Autowired private AdminService service;

    @GetMapping("/month")
    public List<ResultVo> selMonth(OrderDto dto) {

        return service.selCurrentMonthList(dto);
    }
}
