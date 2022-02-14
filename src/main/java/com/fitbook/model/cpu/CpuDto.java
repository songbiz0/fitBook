package com.fitbook.model.cpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CpuDto {
    private int seq;
    private int perf;
    private int inner_perf;
    private String search;
    private String select;
}
