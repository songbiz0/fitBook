package com.fitbook.model.cpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CpuEntity {
    private int icpu;
    private String nm;
    private int performance;
    private int inner_gpu;
    private int seq;
    private String brand;
}
