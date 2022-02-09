package com.fitbook.admin;

import com.fitbook.ResultVo;
import com.fitbook.model.cpu.CpuEntity;
import com.fitbook.model.gpu.GpuEntity;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.orderproduct.OrderProductVo;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class AdminService {

    @Autowired private AdminMapper mapper;
    // Main Chart
    public String getDate(String type) {
        LocalDate now = LocalDate.now();
        String date = now.toString();
        date = date.replace("-", "");
        String month = date.substring(4,6);
        String year = date.substring(0,4);
        String result = "";
        if("year".equals(type)) {
            result = (Integer.parseInt(year) - 1) + month + "01";
        } else if ("month".equals(type)) {
            if((Integer.parseInt(month) - 1) < 10) {

                if((Integer.parseInt(month) - 1) == 0) {
                    // 12월 일 경우
                    month = "12";
                    year = String.valueOf(Integer.parseInt(year) - 1);
                } else {
                    // 12월이 아니고 10보다 작을 경우
                    month = "0" + (Integer.parseInt(month) - 1);
                }
                result = year + month + "31";
            } else {
                result = year + (Integer.parseInt(month) - 1) + "31";
            }
        } else if("day".equals(type)) {
            result = year + month + "01";
        }
        return result;
    }

    public Map<String, Integer> selCurrentMonthList() {
        OrderDto dto = new OrderDto();
        String yearResult = getDate("year");
        String monthResult = getDate("month");
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
        dto.setMonth_first_day(getDate("day"));
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

    // Parts
    public int insCpu(CpuEntity entity) {
        return mapper.insCpu(entity);
    }
    public int insGpu(GpuEntity entity) {
        return mapper.insGpu(entity);
    }
    // 시발롬아 이거도 불러라
}
