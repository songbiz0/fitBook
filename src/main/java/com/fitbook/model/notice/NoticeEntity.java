package com.fitbook.model.notice;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeEntity {
    private int inotice;
    private String ctnt;
    private int iuser;
    private String img;
    private String rdt;
    private int hits;
    private String title;
}
