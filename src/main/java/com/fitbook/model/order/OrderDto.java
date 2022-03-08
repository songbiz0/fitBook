package com.fitbook.model.order;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class OrderDto {
    // Main 차트
    private String last_year;
    private String last_month;
    private String month_first_day;
    private String today;

    // Mypage orderlist
    private String fromDate;
    private String toDate;
    private int iorder;
    private int iuser;
    private int recordCount;
    private int currentPage;
    private int startIdx;
    private String param;
    private String order_status;
    private String pre_order_status;

    // Admin-Order List
    private String fstDate;
    private String secDate;
    private String status;
    private String search;
    private String select;
    private int statusNo;

    private int rowCnt;


    private String receiver_nm;
    private String receiver_post;
    private String receiver_addr;
    private String receiver_addr_detail;
    private String receiver_phone;
    private String shipment_message;

    private int spent_point;
    private String payment_way;
    List<String> idetailList;

    private String reason;
}
