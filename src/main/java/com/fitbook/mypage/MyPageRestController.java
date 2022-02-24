package com.fitbook.mypage;

import com.fitbook.ResultVo;
import com.fitbook.model.PageDto;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.point.PointEntity;
import com.fitbook.model.product.ProductVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage/api")
public class MyPageRestController {

    @Autowired MypageService service;

    @PostMapping("/orderlist")
    public List<OrderVo> orderlist(@RequestBody OrderDto dto) { return service.selOrderList(dto); }

    @PostMapping("/maxpage")
    public ResultVo maxpage(@RequestBody OrderDto dto) { return service.selMaxPageVal(dto); }

    @PostMapping("/orderchange")
    public ResultVo orderchange(@RequestBody OrderDto dto) { return service.updOrder(dto); }

    @PostMapping("/maxpagepoint")
    public ResultVo maxpagepoint(@RequestBody PageDto dto) { return service.selMaxPageVal(dto); }

    @PostMapping("/pointhistory")
    public List<PointEntity> pointhistory(@RequestBody PageDto dto) { return service.selPointHistoryList(dto); }

    @PostMapping("/maxpagefav")
    public ResultVo maxpagefav(@RequestBody PageDto dto) { return service.selFavMaxPageVal(dto); }

    @PostMapping("/favlist")
    public List<ProductVo> favlist(@RequestBody PageDto dto) { return service.selFavList(dto); }

    @PostMapping("/delfav")
    public ResultVo delfav(@RequestBody List<Integer> list) { return service.delFav(list); }

    @PostMapping("/inscart")
    public ResultVo inscart(@RequestBody List<Integer> list) { return service.insCart(list); }

}