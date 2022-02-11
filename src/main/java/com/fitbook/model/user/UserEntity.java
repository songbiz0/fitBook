package com.fitbook.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEntity {
    private int iuser;
    private String uid;
    private String upw;
    private String nm;
    private String email;
    private String rdt;
    private int point;
    private String role;
}
