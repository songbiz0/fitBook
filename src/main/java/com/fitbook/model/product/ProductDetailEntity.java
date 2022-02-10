package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDetailEntity {
    private int idetail;
    private int iproduct;
    private String color;
    private int hdd;
    private int ssd;
    private int price;
    private int stock;
    private String isrep;
    private float dc_rate;
    private String img;
}
