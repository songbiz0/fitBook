package com.fitbook.mypage;

import com.fitbook.ResultVo;
import com.fitbook.model.PageDto;
import com.fitbook.model.address.AddressDto;
import com.fitbook.model.address.AddressEntity;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.point.PointEntity;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.user.UserEntity;
import com.fitbook.user.UserMapper;
import com.fitbook.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage/api")
public class MyPageRestController {

    @Autowired MypageService service;
    @Autowired
    UserService userService;

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

    @PostMapping("/pwchk")
    public ResultVo pwchk(@RequestBody UserEntity entity) {
        ResultVo result = new ResultVo();
        result.setResult(service.confirmPassword(entity.getUpw()) ? 1 : 0);
        return result;
    }

    @PostMapping("/addr")
    public ResultVo addr(@RequestBody AddressDto dto) { return dto.getParam().equals("ins") ? service.insAddr(dto) : service.updAddr(dto); }

    @GetMapping("/addrlist")
    public List<AddressEntity> addrlist() {
        return service.selAddrList();
    }

    @DeleteMapping("/addr")
    public ResultVo delAddr(@RequestParam int iaddress) {
        AddressDto dto = new AddressDto();
        dto.setIaddress(iaddress);
        return service.delAddr(dto);
    }

    @GetMapping("/selpoint")
    public ResultVo selPoint() {
        ResultVo result = new ResultVo();
        result.setResult(userService.selPoint());
        return result;
    }
}