package com.fitbook.user;

import com.fitbook.model.order.OrderDto;
import com.fitbook.model.point.PointEntity;
import com.fitbook.model.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insUser(UserEntity entity);
    UserEntity selUser(UserEntity user);
    int updUser(UserEntity entity);
    int delUser(UserEntity entity);
    int updPointByOrderDto(OrderDto dto);
    int updPoint(PointEntity entity);
}
