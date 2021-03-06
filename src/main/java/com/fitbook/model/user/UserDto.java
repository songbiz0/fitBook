package com.fitbook.model.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDto {
    private int iuser;
    private String type;
    private String keyword;
    private String sort;
    private String sortType;
    private int exceptNull;

    //maxPage
    private int page;
    private int recordCount;
    private int startIdx;

    private int startPage;
    private int lastPage;
}
