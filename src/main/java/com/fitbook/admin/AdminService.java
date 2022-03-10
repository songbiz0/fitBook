package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.address.AddressEntity;
import com.fitbook.model.cpu.CpuDto;
import com.fitbook.model.cpu.CpuEntity;
import com.fitbook.model.cpu.CpuListEntity;
import com.fitbook.model.cpu.CpuVo;
import com.fitbook.model.gpu.GpuDto;
import com.fitbook.model.gpu.GpuEntity;
import com.fitbook.model.gpu.GpuListEntity;
import com.fitbook.model.gpu.GpuVo;
import com.fitbook.model.order.OrderDetailVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderEntity;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
import com.fitbook.model.point.PointEntity;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.productReview.ProductReviewVo;
import com.fitbook.model.productquestion.ProductQuestionDto;
import com.fitbook.model.productquestion.ProductQuestionEntity;
import com.fitbook.model.productquestion.ProductQuestionVo;
import com.fitbook.model.program.ProgramDto;
import com.fitbook.model.program.ProgramEntity;
import com.fitbook.model.program.ProgramListVo;
import com.fitbook.model.program.ProgramVo;
import com.fitbook.model.product.*;
import com.fitbook.model.user.UserDto;
import com.fitbook.model.user.UserEntity;
import com.fitbook.model.user.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.util.*;

@Service
public class AdminService {
    @Autowired private AdminMapper mapper;
    @Autowired private AuthenticationFacade authenticationFacade;
    @Autowired private Utils utils;

    // Main
    public List<OrderVo> getStatusCnt() {
        List<OrderVo> list = new ArrayList<>();
        String[] statusArr = {
                "입금대기", "결제완료", "배송중", "배송완료"
                , "구매확정", "취소완료", "환불신청", "환불완료"};
        for(int i=0; i<statusArr.length; i++) {
            String order_status = statusArr[i];
            OrderVo vo = mapper.statusCnt(order_status);
            vo.setOrder_status(order_status);
            list.add(vo);
        }
        return list;
    }
    public Map<String, Integer> selCurrentMonthList() {
        OrderDto dto = new OrderDto();
        String yearResult = utils.getDate("year");
        String monthResult = utils.getDate("month");
        dto.setLast_year(yearResult);
        dto.setLast_month(monthResult);

        List<OrderVo> list = mapper.selCurrentMonthList(dto);
        Map<String, Integer> result = new HashMap<>();
            for (OrderVo data : list) {
                String month = data.getRdt().substring(0, 8).replace("-", "");

                result.put(month, data.getResult_price() + result.getOrDefault(month, 0));
            }
        return result;
    }
    public Map<String, Integer> selThisMonthList() {
        OrderDto dto = new OrderDto();
        LocalDate now = LocalDate.now();
        dto.setMonth_first_day(utils.getDate("day"));
        dto.setToday(now.toString());

        List<OrderVo> list = mapper.selThisMonthList(dto);
        Map<String, Integer> result = new HashMap<>();
        for(OrderVo data : list) {
            String day = data.getRdt().replace("-", "").substring(0, 8);
            result.put(day, data.getResult_price() + result.getOrDefault(day, 0));
        }
        return result;
    }
    public Map<String, Integer> selBrandDemandList() {
        List<OrderProductVo> list = mapper.selBrandDemandList();
        Map<String, Integer> result = new HashMap<>();
        for(OrderProductVo data : list) {
            String brand = data.getBrand();
            result.put(brand, data.getQuantity() + result.getOrDefault(brand, 0));
        }
        return result;
    }

    // Order List
    public List<OrderVo> selOrderList(OrderDto dto) {
        String[] statusArr = dto.getStatus().split("-");
        dto.setStatus(statusArr[0]);
        dto.setStatusNo(Integer.parseInt(statusArr[1]));
        List<OrderVo> list = mapper.selOrderList(dto);
        for(OrderVo item : list) {
            item.setRdt(item.getRdt().substring(0, 11));
            if(item.getCdt() != null) {
                item.setCdt(item.getCdt().substring(0, 11));
            }
            String cdt = item.getCdt();
            cdt = cdt == null ? "-" : item.getCdt();
            item.setCdt(cdt);
        }
        return list;
    }
    public ResultVo getOrderMaxPage(OrderDto dto) {
        String[] statusArr = dto.getStatus().split("-");
        dto.setStatus(statusArr[0]);
        dto.setStatusNo(Integer.parseInt(statusArr[1]));
        return mapper.getOrderMaxPage(dto);
    }
    // Order Detail
    public OrderDetailVo selProductDetail(OrderDto dto) {
        OrderDetailVo orderVo = mapper.selOrderDetail(dto);
        // 전화번호
        orderVo.setReceiver_phone(utils.phoneRegex(orderVo.getReceiver_phone()));
        List<ProductDetailVo> list = mapper.selProductDetail(dto);
        for(ProductDetailVo item : list) {
            // 옵션
            StringBuilder option = new StringBuilder(item.getColor());
            option.append(" / HDD ").append(item.getHdd()).append("GB / SSD ").append(item.getSsd()).append("GB");
            item.setOption(option.toString());
        }
        orderVo.setProductDetails(list);
        return orderVo;
    }
    public ResultVo updOrderStatus(OrderEntity entity) {
        ResultVo vo = new ResultVo();
        switch (entity.getOrder_status()) {
            case "환불완료":
                PointEntity entity1 = new PointEntity();
                entity1.setIuser(entity.getIuser());
                entity1.setChanged_point(entity.getSpent_point());
                entity1.setReason("환불완료");
                mapper.returnPoint(entity1);
                mapper.updUserPoint(entity1);
                entity.setCdt("Y");
                break;
        }
        vo.setResult(mapper.updOrderStatus(entity));
        return vo;
    }

    // Parts
    public int insCpu(CpuListEntity cpuList) {
        int result = 0;
        for(CpuEntity list : cpuList.getCpuList()) {
            result += mapper.insCpu(list);
        }
        if(result < cpuList.getCpuList().size()) {
            result = 0;
        }
        return result;
    }
    public List<CpuVo> selCpu() {
        return mapper.selCpu();
    }
    public List<CpuVo> selCpuList(CpuDto dto) {
        dto.setParts("t_product_cpu");
        return mapper.selCpuList(dto);
    }
    public CpuVo selCpuDetail(CpuDto dto) {
        return mapper.selCpuDetail(dto);
    }
    public ResultVo cpuMaxPage(CpuDto dto) {
        dto.setParts("t_product_cpu");
        return mapper.selMaxPage(dto);
    }
    public int updCpu(CpuEntity entity) {
        return mapper.updCpu(entity);
    }
    public int delCpu(CpuDto dto) {
        return mapper.delCpu(dto);
    }
    public CpuVo selInnerGpuFromCpu(CpuDto dto) {
        return mapper.selInnerGpuFromCpu(dto);
    }
    public CpuVo getCpuPerformanceInCpu(CpuDto dto){
        return mapper.getCpuPerformanceInCpu(dto);
    }

    public int insGpu(GpuListEntity gpuList) {
        int result = 0;
        for(GpuEntity list : gpuList.getGpuList()) {
            if(list.getIs_inner_gpu() == null) {
                list.setIs_inner_gpu("N");
            }
            result += mapper.insGpu(list);
        }
        if(result < gpuList.getGpuList().size()) {
            result = 0;
        }
        return result;
    }
    public List<GpuVo> selGpu() {
        return mapper.selGpu();
    }
    public List<GpuVo> selGpuAll() {
        return mapper.selGpuAll();
    }
    public List<GpuVo> selInnerGpu() {
        return mapper.selInnerGpu();
    }
    public List<GpuVo> selGpuList(GpuDto dto) {
        dto.setParts("t_product_gpu");
        return mapper.selGpuList(dto);
    }
    public GpuVo selGpuDetail(GpuDto dto) {
        return mapper.selGpuDetail(dto);
    }
    public ResultVo gpuMaxPage(GpuDto dto) {
        dto.setParts("t_product_gpu");
        return mapper.selMaxPage(dto);
    }
    public int updGpu(GpuEntity entity) {
        return mapper.updGpu(entity);
    }
    public ResultVo delGpu(GpuDto dto) {
        ResultVo vo = new ResultVo();
        vo.setResult(mapper.delGpu(dto));
        return vo;
    }
    public GpuVo selInnerGpuPerformance(GpuDto dto) {
        return mapper.selInnerGpuPerformance(dto);
    };

    // Product
    public int insProduct(ProductVo vo, ProductDetailListVo listEntity) {
        // Insert Master
        if(vo.getIstwoinone() == null || "".equals(vo.getIstwoinone())) {
            vo.setIstwoinone("N");
        }
        String fileMasterNm = "";
        if(vo.getMfFile() != null) {
            UUID uuid = UUID.randomUUID();
            fileMasterNm = uuid + ".jpg";
            vo.setImg(fileMasterNm);
        }
        int result1 = mapper.insProductMaster(vo);
        int iproduct = vo.getIproduct();
        try {
            vo.setImg(utils.uploadFileUUID(vo.getMfFile(), fileMasterNm, "products/master", String.valueOf(iproduct)));
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Insert Detail
        int result2 = 0;
        for(int i=0; i<listEntity.getProductList().size(); i++) {
            if(i == 0) {
                listEntity.getProductList().get(i).setIsrep("Y");
            } else {
                listEntity.getProductList().get(i).setIsrep("N");
            }
        }
        for (ProductDetailVo item : listEntity.getProductList()) {
            item.setIproduct(iproduct);
            UUID uuid = UUID.randomUUID();
            String fileDetailNm = uuid + ".jpg";
            item.setImg(fileDetailNm);
            item.setDc_rate(item.getDc_rate() / 100);
            result2 = mapper.insProductDetail(item);
            try {
                utils.uploadFileUUID(item.getMfFile(), fileDetailNm, "products/detail", String.valueOf(item.getIdetail()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if(result2 < 3) {
            result2 = 0;
        } else {
            result2 = 1;
        }

        if(result1 == result2) {
            return 1;
        }

        return 0;
    }

    //상품목록
    public List<ProductVo> selProductList(ProductDto dto){
        if("nm,product_code".equals(dto.getSelect())){
            String data[] = dto.getSelect().split(",");
            dto.setSelect(data[0]);
            dto.setTotal(data[1]);
        }
        int startIdx = (dto.getCurrentPage() - 1)* dto.getRecordCount();
        if(startIdx < 0) { startIdx = 0; }
        dto.setStartIdx(startIdx);
        if("".equals(dto.getSearch()) || dto.getSearch() == null){
            dto.setSearch("");
        }
        return mapper.selProductList(dto);
    }
    //상품디테일
    public List<ProductVo> selProductMasterDetail(ProductDto dto){
        return mapper.selProductMasterDetail(dto);
    }
    public ProductVo selProductMasterDetail2(ProductDto dto){
        return mapper.selProductMasterDetail2(dto);
    }

    public int delProductDetail(ProductDto dto){
            utils.delFile("products/master", String.valueOf(dto.getIproduct()));
            List<ProductVo> list = mapper.selDetailForDelete(dto);
            for(ProductVo item : list) {
                utils.delFile("products/detail", String.valueOf(item.getIdetail()));
            }

        return mapper.delProductDetail(dto);
    }
    public int updProductDetail(ProductVo vo){
        return mapper.updProductDetail(vo);
    }

    public int updProductDetailGroup(ProductDetailListVo vo){
        for(ProductDetailVo item : vo.getProductList()) {
            mapper.updProductDetailGroup(item);
        }
        return 1;
    }

    public ResultVo selMaxPageVal(ProductDto dto){
        if("nm,product_code".equals(dto.getSelect())){
            String data[] = dto.getSelect().split(",");
            dto.setSelect(data[0]);
            dto.setTotal(data[1]);
        }
        ResultVo vo = mapper.selMaxPageVal(dto);
        return mapper.selMaxPageVal(dto);
    }

    // Program
    public int insProgram(ProgramListVo list) throws Exception {
        int length = list.getProgramList().size();
        int result = 0;
        for(ProgramVo item : list.getProgramList()) {

            // is_mac_sup 관련
            String mac_sup = "Y".equals(item.getIs_mac_sup()) ? "Y" : "N";
            item.setIs_mac_sup(mac_sup);
            // 이미지관련
            UUID uuid = UUID.randomUUID();
            String fileNm = uuid + utils.getExt(item.getMfFile().getOriginalFilename());
            item.setImg(fileNm);
            result += mapper.insProgram(item);
            utils.uploadFileUUID(item.getMfFile(), fileNm, "program", String.valueOf(item.getIprogram()));
        }
        if(result != length) {
            result = 0;
        }
        return result;
    }
    public List<ProgramVo> selProgramList(ProgramDto dto) {
        if("".equals(dto.getSearch()) || dto.getSearch() == null) {
            dto.setSearch("");
        }
        return mapper.selProgramList(dto);
    }
    public ProgramVo selProgramDetail(ProgramDto dto) {
        return mapper.selProgramDetail(dto);
    }
    public ResultVo selProgramMaxPage(ProgramDto dto) {
        return mapper.selProgramMaxPage(dto);
    }
    public int updProgram(ProgramVo vo) throws Exception {
        if(vo.getMfFile() != null || "".equals(vo.getMfFile())) {
            String uuid = utils.uploadFile(vo.getMfFile(), "program", String.valueOf(vo.getIprogram()));
            vo.setImg(uuid);
        }
        return mapper.updProgram(vo);
    }
    public int delProgram(ProgramDto dto) {
        return mapper.delProgram(dto);
    }

    //User List
    public ResultVo insUserPoint(PointEntity entity) {
        ResultVo vo = new ResultVo();
        int result = 0;

        UserEntity selPoint = mapper.selUserPoint(entity);
        if(entity.getChanged_point() + selPoint.getPoint() >= 0) {
            result = mapper.insUserPoint(entity);
            mapper.updUserPoint(entity);
        }


        vo.setResult(result);
        return vo;
    }
    public List<UserVo> selUserList(UserDto dto) {
        if(dto.getSort() != null) {
            String[] sortArr = dto.getSort().split("-");
            dto.setSortType(sortArr[0]);
            dto.setSort(sortArr[1]);
        } else {
            dto.setSort("DESC");
            dto.setSortType("rdt");
        }
        List<UserVo> list = mapper.selUserList(dto);
        return list;
    }
    public UserVo getMaxPageForUser(UserDto dto) {
        return mapper.getMaxPageForUser(dto);
    }

    //User Search List
    public List<UserVo> selectUserSearchList(UserDto dto) throws Exception {
        if("".equals(dto.getKeyword()) || dto.getKeyword() == null) {
            dto.setKeyword("");
        }
        return mapper.selectUserSearchList(dto);
    }

    public ResultVo selUserMaxPage(UserDto dto) {
        return mapper.selUserMaxPageVal(dto);
    }

    // User Detail
    public UserVo selUserDetail(UserDto dto) {
        return mapper.selUserDetail(dto);
    }
    public List<OrderVo> selUserOrderList(UserDto dto) {
        return mapper.selUserOrderList(dto);
    }
    public ResultVo selUserOrderMaxPage(UserDto dto) {
        return mapper.selUserOrderMaxPage(dto);
    }
    public AddressEntity selUserAddress(UserDto dto) {
        return mapper.selUserAddress(dto);
    }
    public List<ProductReviewVo> selUserReviewList(UserDto dto) {
        return mapper.selUserReviewList(dto);
    }
    public ResultVo selUserReviewMaxPage(UserDto dto) {
        return mapper.selUserReviewMaxPage(dto);
    }
    public List<ProductQuestionVo> selUserQuestionList(UserDto dto) {
        return mapper.selUserQuestionList(dto);
    }
    public ResultVo selUserQuestionMaxPage(UserDto dto) {
        return mapper.selUserQuestionMaxPage(dto);
    }

    public OrderVo userOrderCnt(UserDto dto) {
        return mapper.userOrderCnt(dto);
    }
    public ProductReviewVo userReviewCnt(UserDto dto) {
        return mapper.userReviewCnt(dto);
    }
    public ProductQuestionVo userQuestionCnt(UserDto dto) {
        return mapper.userQuestionCnt(dto);
    }

    // QnA
//    int insQuestion(ProductQuestionEntity entity) {
//        return mapper.insQuestion(entity);
//    }
    public List<ProductQuestionVo> selQuestionList(ProductQuestionDto dto) {
        List<ProductQuestionVo> list = mapper.selQuestionAllList(dto);
        ResultVo vo = mapper.qnaAllMaxPage(dto);
        if(dto.getSelect() == 2) {
            list = mapper.selQuestionList(dto);
            vo = mapper.qnaMustMaxPage(dto);
        }
        if(vo.getResult() > 0) {
            list.get(0).setMaxPage(vo.getResult());
        } else {
            ProductQuestionVo item = new ProductQuestionVo();
            item.setMaxPage(0);
            list.add(item);
        }

        for(ProductQuestionVo item : list) {
            try {
                item.setCnt(mapper.selCmtCount(item.getIquestion()).getCnt());
            } catch (Exception e) {
                e.printStackTrace();
                item.setCnt(0);
            }
        }

        return list;
    }
}
