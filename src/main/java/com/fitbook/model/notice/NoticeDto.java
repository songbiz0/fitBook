package com.fitbook.model.notice;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class NoticeDto {
    private int startIdx;
    private int rowCnt;
    private int select;
    private String search;
    private int inotice;
}
