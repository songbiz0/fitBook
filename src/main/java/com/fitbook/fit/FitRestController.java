package com.fitbook.fit;

import com.fitbook.model.program.ProgramEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fit/api")
public class FitRestController {

    @Autowired FitService service;

    @GetMapping("/programlist")
    public List<ProgramEntity> getProgramlist() {
        return service.selProgramList();
    }
}
