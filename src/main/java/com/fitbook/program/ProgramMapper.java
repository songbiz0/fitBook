package com.fitbook.program;

import com.fitbook.model.program.ProgramEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProgramMapper {
    List<ProgramEntity> selProgramList();
}
