package com.fitbook.model.program;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProgramDto {
    private String search;
    private String type;
    private int typeNo;
//    private int cpu;
//    private int gpu;
//    private int ram;

    private int rowCnt;
    private int startIdx;
}
