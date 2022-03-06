package com.fitbook.shop;

import com.fitbook.ResultVo;
import com.fitbook.model.PageDto;
import com.fitbook.model.product.ColorDto;
import com.fitbook.model.product.OptionDto;
import com.fitbook.model.product.ProductVo;
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
    int updQuestion(ProductQuestionEntity entity);

    List<ProductVo> selProductList(PageDto dto);
    int selMaxPage(PageDto dto);

    ProductVo selPrice(int idetail);

    List<String> selBrandList();
    List<String> selCpuList(String brand);
    List<String> selGpuList(String brand);
}
