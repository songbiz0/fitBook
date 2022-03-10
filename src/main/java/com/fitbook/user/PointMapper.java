package com.fitbook.user;

import com.fitbook.ResultVo;
import com.fitbook.model.PageDto;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.point.PointEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PointMapper {
    ResultVo selMaxPageVal(PageDto dto);
    List<PointEntity> selPointHistoryList(PageDto dto);
    int insPointHistoryByOrderDto(OrderDto dto);
    int insPointHistory(PointEntity entity);
    int insPointHisotryMidnight(List<PointEntity> list);
}
