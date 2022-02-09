package com.fitbook.model.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderVo extends OrderEntity{
    private String uid;
    private String nm;
    private String nickname;
    private String addr;
    private String addr_detail;
    private String post;
}
