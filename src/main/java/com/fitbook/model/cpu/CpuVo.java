package com.fitbook.model.cpu;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CpuVo extends CpuEntity{
    private String gpuNm;
    private String cpuNm;
    private int igpu;
}
