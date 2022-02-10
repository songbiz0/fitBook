package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ProductDetailListVo {
    private List<ProductDetailVo> productList;
}
