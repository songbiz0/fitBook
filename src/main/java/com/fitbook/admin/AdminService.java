package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.model.cpu.CpuDto;
import com.fitbook.model.cpu.CpuEntity;
import com.fitbook.model.cpu.CpuListEntity;
import com.fitbook.model.cpu.CpuVo;
import com.fitbook.model.gpu.GpuDto;
import com.fitbook.model.gpu.GpuEntity;
import com.fitbook.model.gpu.GpuListEntity;
import com.fitbook.model.gpu.GpuVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.productquestion.ProductQuestionDto;
import com.fitbook.model.productquestion.ProductQuestionEntity;
import com.fitbook.model.productquestion.ProductQuestionVo;
import com.fitbook.model.program.ProgramDto;
import com.fitbook.model.program.ProgramEntity;
import com.fitbook.model.program.ProgramListVo;
import com.fitbook.model.program.ProgramVo;
import com.fitbook.model.product.*;
import com.fitbook.model.user.UserDto;
import com.fitbook.model.user.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.util.*;

@Service
public class AdminService {
    @Autowired private AdminMapper mapper;

    @Autowired private Utils utils;

    // Main Chart
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
    public List<OrderVo> selOrderList() {
        List<OrderVo> list = mapper.selOrderList();
        for(OrderVo data: list) {
            data.setRdt(data.getRdt().substring(0, 16));
        }
        return list;
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

    public int insGpu(GpuListEntity gpuList) {
        int result = 0;
        for(GpuEntity list : gpuList.getGpuList()) {
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
        System.out.println(mapper.delGpu(dto));
        return vo;
    }

    // Product
    public int insProduct(ProductVo vo, ProductDetailListVo listEntity) {
        // Insert Master
        if(vo.getMfFile() != null) {
            UUID uuid = UUID.randomUUID();
            String fileNm = uuid + ".jpg";
            vo.setImg(fileNm);
        }
        int result1 = mapper.insProductMaster(vo);
        int iproduct = vo.getIproduct();
        System.out.println(iproduct);
        try {
            vo.setImg(utils.uploadFile(vo.getMfFile(), "products\\master", String.valueOf(iproduct)));
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
            String fileNm = uuid + ".jpg";
            item.setImg(fileNm);
            item.setDc_rate(item.getDc_rate() / 100);
            result2 = mapper.insProductDetail(item);
            try {
                utils.uploadFileUUID(item.getMfFile(), fileNm, "products\\detail", String.valueOf(item.getIdetail()));
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
        System.out.println("service : " + dto);
        return mapper.selProductList(dto);
    }

    public List<ProductVo> selProductDetail(ProductDto dto){
        return mapper.selProductDetail(dto);
    }
    public ProductVo selProductDetail2(ProductDto dto){
        return mapper.selProductDetail2(dto);
    }

    public ResultVo selMaxPageVal(ProductDto dto){
        if("nm,product_code".equals(dto.getSelect())){
            String data[] = dto.getSelect().split(",");
            dto.setSelect(data[0]);
            dto.setTotal(data[1]);
        }
        System.out.println("maxpage : " + dto);
        return mapper.selMaxPageVal(dto);
    }

    // Program
    public int insProgram(ProgramListVo list) throws Exception {
        int length = list.getProgramList().size();
        int result = 0;
        for(ProgramVo item : list.getProgramList()) {
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
    public List<UserVo> selUserList() {
        List<UserVo> list = mapper.selUserList();
        return list;
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
        list.get(0).setMaxPage(vo.getResult());

        for(ProductQuestionVo item : list) {
            try {
                item.setCnt(mapper.selCmtCount(item.getIquestion()).getCnt());
                System.out.println(item.getIquestion());
                System.out.println(mapper.selCmtCount(item.getIquestion()).getCnt());
            } catch (Exception e) {
                e.printStackTrace();
                item.setCnt(0);
            }
        }

        return list;
    }
}
