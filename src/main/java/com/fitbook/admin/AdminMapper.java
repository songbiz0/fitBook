package com.fitbook.admin;

import com.fitbook.model.OrderDto;
import com.fitbook.model.OrderVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {
    List<OrderVo> selCurrentMonthList(OrderDto dto);
}
