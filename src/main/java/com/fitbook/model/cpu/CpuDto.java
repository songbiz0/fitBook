package com.fitbook.model.cpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CpuDto {
    private int icpu;

    private int seq; // 세대
    private int perf; // 성능
    private int inner_perf; // 내장그래픽
    private String search; // 검색 한 내용
    private String select; 
    private String type;
    private int typeNo;
    private String parts;
    private int rowCnt;
    private int startIdx;
}
