package com.fitbook.admin;

import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
import com.fitbook.model.user.UserVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {
    // Main 차트
    List<OrderVo> selCurrentMonthList(OrderDto dto);
    List<OrderVo> selThisMonthList(OrderDto dto);
    List<OrderProductVo> selBrandDemandList();

    // Order List
    List<OrderVo> selOrderList();

    // User List
    List<UserVo> selUserList();

}
