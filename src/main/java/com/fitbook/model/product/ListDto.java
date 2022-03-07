package com.fitbook.model.product;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListDto {
    List<String> brandList;
    List<String> intelCpuList;
    List<String> amdCpuList;
    List<String> nvidiaGpuList;
    List<String> amdGpuList;
}
