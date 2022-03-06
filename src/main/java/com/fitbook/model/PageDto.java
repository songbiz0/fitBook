package com.fitbook.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class PageDto {
    private int iuser;
    private int recordCount;
    private int currentPage;
    private int startIdx;

    private int iproduct;
    private int parent;
    private int iquestion;

    private String sort;
    private String param;

    private List<String> brand;
    private List<String> cpu;
    private List<String> gpu;
    private boolean innerGpu;
    private List<String> size;
    private List<String> ram;
    private List<String> os;
    private List<String> weight;
    private List<String> res;
    private List<String> hz;
    private List<String> battery;
    private List<String> etc;
}
