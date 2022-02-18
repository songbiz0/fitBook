package com.fitbook.model.productquestion;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductQuestionVo extends ProductQuestionEntity {
    private String nm;
    private int idetail;
    private String img;
    private String uid;
    private String rdt;
    private int cnt;
}
