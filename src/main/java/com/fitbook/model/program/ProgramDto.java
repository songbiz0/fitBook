package com.fitbook.model.program;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProgramDto {
    private int iprogram;

    private String search;
    private String type;
    private int typeNo;

    private int rowCnt;
    private int startIdx;
}
