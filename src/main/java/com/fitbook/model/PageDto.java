package com.fitbook.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageDto {
    private int iuser;
    private int recordCount;
    private int currentPage;
    private int startIdx;

    private int iproduct;
    private int parent;
    private int iquestion;
}
