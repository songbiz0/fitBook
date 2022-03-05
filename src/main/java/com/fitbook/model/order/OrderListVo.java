package com.fitbook.model.order;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderListVo extends OrderVo{
    private List<OrderVo> orderList;
}
