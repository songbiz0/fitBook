package com.fitbook.admin;

import com.fitbook.model.cpu.CpuEntity;
import com.fitbook.model.cpu.CpuVo;
import com.fitbook.model.gpu.GpuEntity;
import com.fitbook.model.gpu.GpuVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
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
            data.setCdt(data.getCdt().substring(0, 16));
        }
        return list;
    }

    // 시발롬아 이거도 불러라
    // Parts
    public int insCpu(CpuEntity entity) {
        return mapper.insCpu(entity);
    }
    public int insGpu(GpuEntity entity) {
        return mapper.insGpu(entity);
    }

    public List<GpuVo> selGpu() {
        return mapper.selGpu();
    }

    public List<CpuVo> selCpu() {
        return mapper.selCpu();
    }

    // Product
    public int insProduct(ProductVo vo, ProductDetailListVo listEntity) {
        // Insert Master
        try {
            vo.setImg(Utils.uploadFile(vo.getMfFile(), "master", vo.getProduct_code()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        String rdt = vo.getYear() + vo.getMonth() + vo.getDay();
        vo.setRdt(rdt);
        int result1 = mapper.insProductMaster(vo);
        int iproduct = vo.getIproduct();
        System.out.println(iproduct);

        // Insert Detail
        int result2 = 0;
        for (ProductDetailVo item : listEntity.getProductList()) {
            item.setIproduct(iproduct);
            try {
                item.setImg(Utils.uploadFile(item.getMfFile(), "detail", String.valueOf(item.getIproduct())));
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
}
