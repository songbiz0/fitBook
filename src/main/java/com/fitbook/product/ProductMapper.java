package com.fitbook.product;

import com.fitbook.ResultVo;
import com.fitbook.model.PageDto;
import com.fitbook.model.product.ProductVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    ResultVo selFavMaxPageVal(PageDto dto);
    List<ProductVo> selFavList(PageDto dto);
    int delFav(List<Integer> list, int iuser);
    int insCart(List<Integer> list, int iuser);
    int insCartByIdetail(int idetail, int iuser);
}
