package com.fitbook.model.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderEntity {
    private int iorder;
    private int iuser;
    private int spent_point;
    private String payment_way;
    private int result_price;
    private String order_status;
    private String rdt;
    private String cdt;
    private String pre_order_status;
}
