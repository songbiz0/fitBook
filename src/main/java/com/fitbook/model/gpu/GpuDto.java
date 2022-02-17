package com.fitbook.model.gpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GpuDto {
    private String type;
    private int typeNo;
    private String search;
    private String select;
    private String parts;

    private int startIdx;
    private int rowCnt;
}
