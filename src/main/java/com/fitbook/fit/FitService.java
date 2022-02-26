package com.fitbook.fit;

import com.fitbook.model.program.ProgramEntity;
import com.fitbook.program.ProgramMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FitService {

    @Autowired
    ProgramMapper programMapper;

    public List<ProgramEntity> selProgramList() { return programMapper.selProgramList(); }
}
