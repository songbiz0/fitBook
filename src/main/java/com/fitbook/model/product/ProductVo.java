package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class ProductVo extends ProductEntity{
    private MultipartFile mfFile;
    private String year;
    private String month;
    private String day;
}
