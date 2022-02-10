package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ProductDetailListEntity {
    private List<ProductDetailEntity> productList;
}
