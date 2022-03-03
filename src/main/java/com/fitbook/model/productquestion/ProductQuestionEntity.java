package com.fitbook.model.productquestion;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductQuestionEntity {
    private int iquestion;
    private int iproduct;
    private int iuser;
    private String ctnt;
    private String rdt;
    private int parent;
}
