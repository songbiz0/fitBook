package com.fitbook.model.cpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CpuDto {
    private int icpu;

    private String type;
    private int typeNo;
    private String search;
    private String select;
    private String parts;

    private int rowCnt;
    private int startIdx;
}
