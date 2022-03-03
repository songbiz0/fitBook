package com.fitbook.shop;

import com.fitbook.ResultVo;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.fit.FitService;
import com.fitbook.model.PageDto;
import com.fitbook.model.product.OptionDto;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.productReview.ProductReviewEntity;
import com.fitbook.model.productReview.ProductReviewVo;
import com.fitbook.model.productquestion.ProductQuestionEntity;
import com.fitbook.model.productquestion.ProductQuestionVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopService {

    @Autowired private ShopMapper mapper;
    @Autowired private FitService fitService;
    @Autowired private AuthenticationFacade authenticationFacade;

    public ProductVo selProductDetail(int iproduct) {
        ProductVo vo = mapper.selProductDetail(iproduct);

        vo.setColorList(mapper.selColorList(iproduct));
        List<OptionDto> optionList = mapper.selOptionList(iproduct);
        for(OptionDto dto : optionList) {
            StringBuilder sb = new StringBuilder();
            if(dto.getHdd() > 0) {
                sb.append("HDD ").append(dto.getHdd()).append("GB");
                if(dto.getSsd() > 0) {
                    sb.append(" / SSD ").append(dto.getSsd()).append("GB");
                }
            } else {
                sb.append("SSD ").append(dto.getSsd()).append("GB");
            }
            dto.setOption(sb.toString());
        }
        vo.setOptionList(optionList);

        if(fitService.selQuestion() == null) {
            vo.setFitness(-1);
        } else {
            vo.setFitness(fitService.calFitness(fitService.selQuestion(), vo));
        }

        return vo;
    }

    public ResultVo selReviewMaxPage(int iproduct, PageDto dto) {
        dto.setIproduct(iproduct);
        return mapper.selReviewMaxPage(dto);
    }

    public List<ProductReviewVo> selReviewList(int iproduct, PageDto dto) {
        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if (startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);
        dto.setIproduct(iproduct);

        return mapper.selReviewList(dto);
    }

    public ResultVo insReview(ProductReviewEntity entity) {
        ResultVo result = new ResultVo();

        // 별점 체크하지 않은 경우 예외처리
        if(entity.getRating() < 1) {
            result.setResult(0);
            return result;
        }

        // 구매확정 회원이 아닌 경우 예외처리
        PageDto dto = new PageDto();
        dto.setIuser(authenticationFacade.getLoginUserPk());
        dto.setIproduct(entity.getIproduct());
        if(mapper.selOrderCount(dto).getResult() < 1) {
            result.setResult(0);
            return result;
        }

        entity.setIuser(authenticationFacade.getLoginUserPk());
        result.setResult(mapper.insReview(entity));
        return result;
    }

    public ResultVo delReview(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        result.setResult(mapper.delReview(dto));
        return result;
    }

    public ResultVo selOrderCount(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        return mapper.selOrderCount(dto);
    }

    public ResultVo selQuestionMaxPage(PageDto dto) {
        return mapper.selQuestionMaxPage(dto);
    }

    public List<ProductQuestionVo> selQuestionList(PageDto dto) {
        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if (startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);

        List<ProductQuestionVo> questionList = mapper.selQuestionList(dto);
        for(ProductQuestionVo vo : questionList) {
            dto.setParent(vo.getIquestion());
            List<ProductQuestionVo> questionReplyList = mapper.selQuestionList(dto);
            vo.setReplyList(questionReplyList);
        }

        return questionList;
    }

    public ResultVo insQuestion(ProductQuestionEntity entity) {
        ResultVo result = new ResultVo();
        entity.setIuser(authenticationFacade.getLoginUserPk());
        result.setResult(mapper.insQuestion(entity));
        return result;
    }

    public ResultVo delQuestion(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        result.setResult(mapper.delQuestion(dto));
        return result;
    }

    public ResultVo updQuestion(ProductQuestionEntity entity) {
        ResultVo result = new ResultVo();
        entity.setIuser(authenticationFacade.getLoginUserPk());
        result.setResult(mapper.updQuestion(entity));
        return result;
    }

    public List<ProductVo> selBestProductList(PageDto dto) {
        return mapper.selBestProductList(dto);
    }

    public List<ProductVo> selNewProductList(PageDto dto) { return mapper.selNewProductList(dto); }
}
