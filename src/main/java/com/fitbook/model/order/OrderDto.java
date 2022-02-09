package com.fitbook.model.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDto {
    private String last_year;
    private String last_month;

    private String month_first_day;
    private String today;
}
