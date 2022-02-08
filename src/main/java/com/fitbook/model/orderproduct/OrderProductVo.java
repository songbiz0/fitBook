package com.fitbook.model.orderproduct;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProductVo extends OrderProductEntity{
    private String brand;
    private int quantity;
}
