package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
    private int iproduct;
    private int recordCount;
    private int currentPage;
    private int startIdx;
}
