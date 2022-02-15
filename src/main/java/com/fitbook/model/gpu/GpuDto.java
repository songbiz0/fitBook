package com.fitbook.model.gpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GpuDto {
    private int seq;
    private int perf;
    private String search;
    private String select;
}
