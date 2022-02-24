package com.fitbook.model.order;

import com.fitbook.model.product.ProductDetailVo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDetailVo extends OrderVo {
    private String buyer_nm;
    private String buyer_phone;
    private String buyer_email;
    private String receiver_nm;
    private String receiver_post;
    private String receiver_addr;
    private String receiver_addr_detail;
    private String receiver_phone;
    private String shipment_message;

    private List<ProductDetailVo> productDetails;
}
