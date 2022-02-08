package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.model.OrderDto;
import com.fitbook.model.OrderVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired private AdminMapper mapper;

    public List<ResultVo> selCurrentMonthList(OrderDto dto) {
        ResultVo vo = new ResultVo();
        List<ResultVo> list = new ArrayList<>();

        List<OrderVo> result = mapper.selCurrentMonthList(dto);
        for(OrderVo data : result) {
            
        }
        return null;
    }
}
