package com.fitbook.model.order;

import com.fitbook.model.product.ProductDetailVo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderVo extends OrderEntity{
    private String uid;
    private String nm;
    private String nickname;
    private String addr;
    private String addr_detail;
    private String post;

    // 주문목록 (List)
    private int idetail;
    private String detailNm;
    private int cnt;

    private List<ProductDetailVo> productDetails;
}
