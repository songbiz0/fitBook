package com.fitbook.address;

import com.fitbook.ResultVo;
import com.fitbook.model.address.AddressDto;
import com.fitbook.model.address.AddressEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AddressMapper {
    List<AddressEntity> selAddrList(int iuser);
    int insAddr(AddressDto dto);
    void updIsrep(AddressDto dto);
    int delAddr(AddressDto dto);
    int updAddr(AddressDto dto);
}
