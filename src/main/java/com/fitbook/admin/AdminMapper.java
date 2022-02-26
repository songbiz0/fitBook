package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.model.cpu.CpuDto;
import com.fitbook.model.cpu.CpuEntity;
import com.fitbook.model.cpu.CpuVo;
import com.fitbook.model.gpu.GpuDto;
import com.fitbook.model.gpu.GpuEntity;
import com.fitbook.model.gpu.GpuVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
import com.fitbook.model.product.*;
import com.fitbook.model.productquestion.ProductQuestionDto;
import com.fitbook.model.productquestion.ProductQuestionEntity;
import com.fitbook.model.productquestion.ProductQuestionVo;
import com.fitbook.model.program.ProgramDto;
import com.fitbook.model.program.ProgramEntity;
import com.fitbook.model.program.ProgramVo;
import com.fitbook.model.user.UserDto;
import com.fitbook.model.user.UserVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {
    // Main 차트
    List<OrderVo> selCurrentMonthList(OrderDto dto);
    List<OrderVo> selThisMonthList(OrderDto dto);
    List<OrderProductVo> selBrandDemandList();

    // Order List
    List<OrderVo> selOrderList(OrderDto dto);
    ResultVo getOrderMaxPage(OrderDto dto);

    // Parts
    int insCpu(CpuEntity entity);
    List<CpuVo> selCpuList(CpuDto dto);
    CpuVo selCpuDetail(CpuDto dto);
    ResultVo selMaxPage(CpuDto dto);
    int updCpu(CpuEntity entity);
    int delCpu(CpuDto dto);
    CpuVo selInnerGpuFromCpu(CpuDto dto);
    CpuVo getCpuPerformanceInCpu(CpuDto dto);

    int insGpu(GpuEntity entity);
    List<GpuVo> selGpuList(GpuDto dto);
    GpuVo selGpuDetail(GpuDto dto);
    ResultVo selMaxPage(GpuDto dto);
    int updGpu(GpuEntity entity);
    int delGpu(GpuDto dto);
    GpuVo selInnerGpuPerformance(GpuDto dto);
    List<GpuVo> selInnerGpu();


    //product_master 상품목록
    List<ProductVo> selProductList(ProductDto dto);
    List<GpuVo> selGpu();
    List<GpuVo> selGpuAll();
    List<CpuVo> selCpu();

    //product_master_detail 상품디테일
    List<ProductVo> selProductDetail(ProductDto dto);
    ProductVo selProductDetail2(ProductDto dto);

    // Product
    int insProductMaster(ProductEntity entity);
    int insProductDetail(ProductDetailEntity entity);
    ResultVo selMaxPageVal(ProductDto dto);

    // Program
    int insProgram(ProgramVo vo);
    List<ProgramVo> selProgramList(ProgramDto dto);
    ProgramVo selProgramDetail(ProgramDto dto);
    ResultVo selProgramMaxPage(ProgramDto dto);
    int updProgram(ProgramVo vo);
    int delProgram(ProgramDto dto);

    // Member List
    List<UserVo> selUserList();

    // Member UserSearchList
    List<UserVo> selectUserSearchList(UserDto dto);
    ResultVo selUserMaxPageVal(UserDto dto);


    // QnA
    int insQuestion(ProductQuestionEntity entity);
    List<ProductQuestionVo> selQuestionList(ProductQuestionDto dto);
    List<ProductQuestionVo> selQuestionAllList(ProductQuestionDto dto);
    ResultVo qnaAllMaxPage(ProductQuestionDto dto);
    ResultVo qnaMustMaxPage(ProductQuestionDto dto);
    ProductQuestionVo selCmtCount(int iquestion);
}
