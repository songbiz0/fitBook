package com.fitbook.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserVo extends UserEntity {
    private int result_price;
    private int recent_price;
    private String recent_rdt;
    private String join_rdt;
    private int maxPage;
}
