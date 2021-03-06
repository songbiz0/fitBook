package com.fitbook.shop;

import com.fitbook.ResultVo;
import com.fitbook.model.PageDto;
import com.fitbook.model.address.AddressDto;
import com.fitbook.model.address.AddressEntity;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.product.*;
import com.fitbook.model.productReview.ProductReviewEntity;
import com.fitbook.model.productReview.ProductReviewVo;
import com.fitbook.model.productquestion.ProductQuestionEntity;
import com.fitbook.model.productquestion.ProductQuestionVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ShopMapper {

    ProductVo selProductDetail(int iproduct);
    List<ColorDto> selColorList(int iproduct);
    List<OptionDto> selOptionList(int iproduct);
    ResultVo selReviewMaxPage(PageDto dto);
    List<ProductReviewVo> selReviewList(PageDto dto);
    int insReview(ProductReviewEntity sntity);
    int delReview(PageDto dto);
    ResultVo selOrderCount(PageDto dto);

    ResultVo selQuestionMaxPage(PageDto dto);
    List<ProductQuestionVo> selQuestionList(PageDto dto);
    int insQuestion(ProductQuestionEntity entity);
    int delQuestion(PageDto dto);
    int delQuestionByParent(PageDto dto);
    int updQuestion(ProductQuestionEntity entity);

    List<ProductVo> selProductList(PageDto dto);
    int selMaxPage(PageDto dto);

    ProductVo selPrice(int idetail);

    List<String> selBrandList();
    List<String> selCpuList(String brand);
    List<String> selGpuList(String brand);

    List<ProductDetailVo> selCartList(int iuser);
    int updCart(ProductDetailDto dto);
    int delCart(List<Integer> list, int iuser);

    int insOrder(OrderDto dto);
    int insDetailOrder(OrderDto dto);
    int insOrderProduct(OrderDto dto);
    int updOrder(OrderDto dto);

    Integer selIsOutOfStock(List<String> list);
}
