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
import com.fitbook.model.program.ProgramDto;
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
    List<OrderVo> selOrderList();

    // Parts
    int insCpu(CpuEntity entity);
    int insGpu(GpuEntity entity);
    List<GpuVo> selGpuList(GpuDto dto);
    List<CpuVo> selCpuList(CpuDto dto);
    ResultVo selMaxPage(GpuDto dto);
    ResultVo selMaxPage(CpuDto dto);

    //product_master 상품목록
    List<ProductVo> selProductList(ProductDto dto);
    List<GpuVo> selGpu();
    List<CpuVo> selCpu();

    // Product
    int insProductMaster(ProductEntity entity);
    int insProductDetail(ProductDetailEntity entity);

    ResultVo selMaxPageVal(ProductDto dto);

    // Program
    int insProgram(ProgramVo vo);
    List<ProgramVo> selProgramList(ProgramDto dto);
    ResultVo selProgramMaxPage(ProgramDto dto);

    // Member List
    List<UserVo> selUserList();

    // Member UserSearchList
    List<UserVo> selectUserSearchList(UserDto dto);
}
