package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class ProductVo extends ProductEntity{
    // 상품등록
    private MultipartFile mfFile;

    // 상품목록
    private int stock;
    private int idetail;
    private float dc_rate;
}
