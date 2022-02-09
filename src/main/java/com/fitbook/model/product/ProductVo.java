package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductVo extends ProductEntity {
    private String nm;
    private String nickname;
    private int spend_point;

}
