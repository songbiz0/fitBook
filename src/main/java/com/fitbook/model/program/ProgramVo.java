package com.fitbook.model.program;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
public class ProgramVo extends ProgramEntity{
    private MultipartFile mfFile;
}
