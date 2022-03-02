package com.fitbook.model.productquestion;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductQuestionVo extends ProductQuestionEntity {
    // user
    private String nm;
    private String uid;

    // product
    private String productNm;
    private int idetail;
    private String img;
    private String product_code;

    // qna
    private int cnt;
    private int maxPage;

}
