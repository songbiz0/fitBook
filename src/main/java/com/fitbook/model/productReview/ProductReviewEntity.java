package com.fitbook.model.productReview;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductReviewEntity {
    private int iproduct;
    private int iuser;
    private float rating;
    private String ctnt;
    private String rdt;
}
