package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    private int price;

    private int cpuPerformance;
    private int gpuPerformance;
    private int fitness;
    private String cpuNm;
    private String gpuNm;
    private int originalPrice;
    private int favorite;
    private float rating;
    private int ratingCount;
    private String detailImg;
    private String is_inner_gpu;

    private List<ColorDto> colorList;
    private List<OptionDto> optionList;
}
