package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductEntity {
    private int iproduct;
    private String nm;
    private String product_code;
    private String rdt;
    private int icpu;
    private int igpu;
    private int ram;
    private int num;
    private float size;
    private float weight;
    private String brand;
    private String os;
    private int battery;
    private String istwoinone;
    private int hz;
    private String resolution;
    private String img;
}