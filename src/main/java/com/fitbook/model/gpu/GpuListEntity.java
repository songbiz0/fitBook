package com.fitbook.model.gpu;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class GpuListEntity {
    private List<GpuEntity> gpuList;
}
