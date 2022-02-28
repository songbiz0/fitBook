package com.fitbook.model.question;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionDto {
    private int iuser;
    private int budget;
    private int weight;
    private int size;
    private int os;
    private int as;
    private int battery;
    private String twoinone;
    private String macbook;
    private String highhz;
    private String highresolution;

    private String programs;
    private int requiredCpu;
    private int requiredGpu;
    private int requiredRam;
    private boolean supportMac;
}
