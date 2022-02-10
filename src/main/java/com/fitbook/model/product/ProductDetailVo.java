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
}
