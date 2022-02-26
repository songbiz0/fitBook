package com.fitbook.model.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
}
