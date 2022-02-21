package com.fitbook.model.notice;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeVo extends NoticeEntity {
    private String writerNm;
    private String uid;
    private String role;
}
