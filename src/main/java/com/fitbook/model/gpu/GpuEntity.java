package com.fitbook.model.gpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GpuEntity {
    private int igpu;
    private String nm;
    private int performance;
    private int seq;
    private String brand;
    private String is_inner_gpu;
}
