package com.fitbook.mypage;

import com.fitbook.ResultVo;
import com.fitbook.model.PageDto;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.point.PointEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage/api")
public class MyPageRestController {

    @Autowired MypageService service;

    @PostMapping("/orderlist")
    List<OrderVo> orderlist(@RequestBody OrderDto dto) { return service.selOrderList(dto); }

    @PostMapping("/maxpage")
    ResultVo maxpage(@RequestBody OrderDto dto) { return service.selMaxPageVal(dto); }

    @PostMapping("/orderchange")
    ResultVo orderchange(@RequestBody OrderDto dto) { return service.updOrder(dto); }

    @PostMapping("/maxpagepoint")
    ResultVo maxpagepoint(@RequestBody PageDto dto) { return service.selMaxPageVal(dto); }

    @PostMapping("/pointhistory")
    List<PointEntity> pointhistory(@RequestBody PageDto dto) { return service.selPointHistoryList(dto); }
}
