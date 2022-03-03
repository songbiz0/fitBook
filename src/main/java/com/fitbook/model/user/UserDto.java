package com.fitbook.model.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDto {
    private String type;
    private String keyword;

    //maxPage
    private int page;
    private int recordCount;
    private int startIdx;

    private int startPage;
    private int lastPage;
}
