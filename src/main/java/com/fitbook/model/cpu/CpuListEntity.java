package com.fitbook.model.cpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CpuListEntity {
    private List<CpuEntity> cpuList;
}
