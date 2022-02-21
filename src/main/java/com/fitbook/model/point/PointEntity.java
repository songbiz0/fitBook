package com.fitbook.model.point;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointEntity {
    private int ipoint;
    private int iuser;
    private int changed_point;
    private String rdt;
    private String reason;
}
