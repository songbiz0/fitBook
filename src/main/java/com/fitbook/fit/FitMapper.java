package com.fitbook.fit;

import com.fitbook.ResultVo;
import com.fitbook.model.product.ProductDto;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.question.QuestionDto;
import com.fitbook.model.question.QuestionEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FitMapper {
    int insQuestion(QuestionDto dto);
    int delQuestion(QuestionDto dto);
    QuestionDto selQuestion(int iuser);
    List<QuestionDto> selRequiredPerformance(List<Integer> iprograms);
    List<ProductVo> selProductList();
    ResultVo selFavorite(ProductDto dto);
    ResultVo selRating(ProductDto dto);
    ResultVo isFavorite(ProductDto dto);
    ResultVo isRating(ProductDto dto);
    int insFavorite(ProductDto dto);
    int delFavorite(ProductDto dto);
    void insProgramMapping(int[] iprograms, int iuser);
    List<Integer> selMyProgramList(int iuser);
    void delProgramMapping(int iuser);
}
