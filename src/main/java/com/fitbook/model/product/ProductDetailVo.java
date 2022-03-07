package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class ProductDetailVo extends ProductDetailEntity {

    private MultipartFile mfFile;

    private String nm;
    private String product_code;
    private String option;
    private int quantity;
    private String brand;
    private int result_price;
    private String rdt;
}
