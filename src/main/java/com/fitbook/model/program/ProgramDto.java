package com.fitbook.model.program;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProgramDto {
    private String search;
    private int cpu;
    private int gpu;
    private int ram;

    private int rowCnt;
    private int startIdx;
}
