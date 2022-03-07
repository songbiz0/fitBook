package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDto {
    private int iproduct;
    private int recordCount;
    private int currentPage;
    private int startIdx;
    private String search;
    private String select;
    private String total;

    private int iuser;
}
