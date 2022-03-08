package com.fitbook.model.productReview;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductReviewVo extends ProductReviewEntity {
    private String userNm;
    private String color;
    private String nm;
    private int maxPage;
    private int cnt;
}
