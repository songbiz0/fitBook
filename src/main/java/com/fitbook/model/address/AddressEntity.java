package com.fitbook.model.address;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddressEntity {
    private int iaddress;
    private int iuser;
    private String post;
    private String addr;
    private String addr_detail;
    private String phone;
    private String addr_nm;
    private String user_nm;
    private String isrep;
}
