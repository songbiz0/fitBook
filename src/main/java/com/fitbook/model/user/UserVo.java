package com.fitbook.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserVo extends UserEntity {
    private int iaddress;
    private String post;
    private String addr;
    private String addr_detail;
    private String isrep;
}
