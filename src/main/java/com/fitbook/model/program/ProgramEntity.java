package com.fitbook.model.program;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProgramEntity {
    private int iprogram;
    private String nm;
    private int required_cpu;
    private int required_gpu;
    private int required_ram;
    private String img;
}
