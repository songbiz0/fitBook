package com.fitbook.model.program;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ProgramListVo extends ProgramVo{
    private List<ProgramVo> programList;
}
