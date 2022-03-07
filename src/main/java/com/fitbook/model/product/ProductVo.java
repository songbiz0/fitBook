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
    private String cpu;
    private String gpu;
    private int ssd;
    private int hdd;
    private int price;
    private String color;
    private String total;
    private float dc_rate;
    private int master_total;
    private int total_price;
    private int detail_total;
    private int month_total;
    private int detail_month_total;

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

    private List<ColorDto> colorList;
    private List<OptionDto> optionList;
}
