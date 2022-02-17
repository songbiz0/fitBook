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
import com.fitbook.model.program.ProgramDto;
import com.fitbook.model.program.ProgramListVo;
import com.fitbook.model.program.ProgramVo;
import org.apache.tomcat.jni.Local;
import com.fitbook.model.product.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.util.*;

@Service
public class AdminService {
    @Autowired private AdminMapper mapper;

    // Main Chart
    public Map<String, Integer> selCurrentMonthList() {
        OrderDto dto = new OrderDto();
        String yearResult = Utils.getDate("year");
        String monthResult = Utils.getDate("month");
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
        dto.setMonth_first_day(Utils.getDate("day"));
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
    public List<CpuVo> selCpu() {
        return mapper.selCpu();
    }
    public List<GpuVo> selGpuList(GpuDto dto) {
        return mapper.selGpuList(dto);
    }
    public List<CpuVo> selCpuList(CpuDto dto) {
        return mapper.selCpuList(dto);
    }

    // Product
    public int insProduct(ProductVo vo, ProductDetailListVo listEntity) {
        // Insert Master
        try {
            vo.setImg(Utils.uploadFile(vo.getMfFile(), "products\\master", vo.getProduct_code()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        int result1 = mapper.insProductMaster(vo);
        int iproduct = vo.getIproduct();
        System.out.println(iproduct);

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
            try {
                item.setImg(Utils.uploadFile(item.getMfFile(), "products\\detail", String.valueOf(item.getIproduct())));
            } catch (Exception e) {
                e.printStackTrace();
            }
            item.setDc_rate(item.getDc_rate() / 100);
            result2 = mapper.insProductDetail(item);
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
        if("nm,product_code".equals(dto.getSelect())) {
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
    public ResultVo selMaxPageVal(ProductDto dto){
        return mapper.selMaxPageVal(dto);
    }

    // Program
    public int insProgram(ProgramListVo list) throws Exception {
        int length = list.getProgramList().size();
        int result = 0;
        for(ProgramVo item : list.getProgramList()) {
            String img = Utils.uploadFile(item.getMfFile(), "program", item.getNm());
            item.setImg(img);
            result += mapper.insProgram(item);
        }
        if(result != length) {
            result = 0;
        }
        return result;
    }

    public List<ProgramVo> selProgramList(ProgramDto dto) {
        return mapper.selProgramList(dto);
    }
}
