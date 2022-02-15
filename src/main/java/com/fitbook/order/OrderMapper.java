package com.fitbook.order;

import com.fitbook.ResultVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.product.ProductDetailVo;
import com.fitbook.model.product.ProductVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderMapper {
    List<OrderVo> selOrderList(OrderDto dto);
    List<ProductDetailVo> selProductDetails(OrderDto dto);
    ResultVo selMaxPageVal(OrderDto dto);
}