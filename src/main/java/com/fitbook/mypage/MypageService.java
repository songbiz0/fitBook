package com.fitbook.mypage;

import com.fitbook.ResultVo;
import com.fitbook.address.AddressMapper;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.PageDto;
import com.fitbook.model.address.AddressDto;
import com.fitbook.model.address.AddressEntity;
import com.fitbook.model.order.OrderDetailVo;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.order.OrderVo;
import com.fitbook.model.point.PointEntity;
import com.fitbook.model.product.ProductDetailVo;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.user.UserEntity;
import com.fitbook.order.OrderMapper;
import com.fitbook.product.ProductMapper;
import com.fitbook.user.PointMapper;
import com.fitbook.user.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MypageService {

    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private PointMapper pointMapper;
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private AuthenticationFacade authenticationFacade;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AddressMapper addressMapper;

    public List<OrderVo> selOrderList(OrderDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());

        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if (startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);

        List<OrderVo> list = orderMapper.selOrderList(dto);
        for (OrderVo vo : list) {
            OrderDto iorderDto = new OrderDto();
            iorderDto.setIorder(vo.getIorder());
            List<ProductDetailVo> productDetails = orderMapper.selProductDetails(iorderDto);

            // 옵션
            for (ProductDetailVo vo2 : productDetails) {
                StringBuilder sb = new StringBuilder();
                sb.append(vo2.getColor());
                if (vo2.getHdd() > 0) {
                    sb.append(" / HDD ").append(vo2.getHdd()).append("GB");
                }
                if (vo2.getSsd() > 0) {
                    sb.append(" / SSD ").append(vo2.getSsd()).append("GB");
                }
                vo2.setOption(sb.toString());
            }
            vo.setProductDetails(productDetails);

            // 년월일만 나오게
            vo.setRdt(vo.getRdt().substring(0, 10));
        }
        return list;
    }

    public ResultVo selMaxPageVal(OrderDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        return orderMapper.selMaxPageVal(dto);
    }

    public boolean confirmPassword(String upw) {
        return passwordEncoder.matches(upw, authenticationFacade.getLoginUser().getUpw());
    }

    public ResultVo updOrder(OrderDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        result.setResult(orderMapper.updOrder(dto));
        return result;
    }

    public ResultVo selMaxPageVal(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        return pointMapper.selMaxPageVal(dto);
    }

    public List<PointEntity> selPointHistoryList(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if (startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);

        return pointMapper.selPointHistoryList(dto);
    }

    public ResultVo selFavMaxPageVal(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        return productMapper.selFavMaxPageVal(dto);
    }

    public List<ProductVo> selFavList(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if (startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);

        return productMapper.selFavList(dto);
    }

    public ResultVo delFav(List<Integer> list) {
        ResultVo result = new ResultVo();
        result.setResult(productMapper.delFav(list, authenticationFacade.getLoginUserPk()));
        return result;
    }

    public ResultVo insCart(List<Integer> list) {
        ResultVo result = new ResultVo();
        int insCartResult = productMapper.insCart(list, authenticationFacade.getLoginUserPk());
        result.setResult(insCartResult);
        return result;
    }

    public ResultVo insCartByIdetail(int idetail) {
        ResultVo result = new ResultVo();
        int insCartResult = productMapper.insCartByIdetail(idetail, authenticationFacade.getLoginUserPk());
        result.setResult(insCartResult);
        return result;
    }

    public OrderDetailVo selOrderDetail(OrderDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        OrderDetailVo vo = orderMapper.selOrderDetail(dto);
        List<ProductDetailVo> productDetails = orderMapper.selProductDetails(dto);
        vo.setReceiver_phone(phone_format(vo.getReceiver_phone()));

        for (ProductDetailVo vo2 : productDetails) {
            StringBuilder sb = new StringBuilder();
            sb.append(vo2.getColor());
            if (vo2.getHdd() > 0) {
                sb.append(" / HDD ").append(vo2.getHdd()).append("GB");
            }
            if (vo2.getSsd() > 0) {
                sb.append(" / SSD ").append(vo2.getSsd()).append("GB");
            }
            vo2.setOption(sb.toString());
        }
        vo.setProductDetails(productDetails);
        return vo;
    }

    public String phone_format(String number) {
        String regEx = "(\\d{3})(\\d{3,4})(\\d{4})";
        return number.replaceAll(regEx, "$1-$2-$3");
    }

    public List<AddressEntity> selAddrList() {
        return addressMapper.selAddrList(authenticationFacade.getLoginUserPk());
    }

    public ResultVo insAddr(AddressDto dto) {
        if(selAddrList().size() >= 5) {
            ResultVo result = new ResultVo();
            result.setResult(0);
            return result;
        }

        dto.setIuser(authenticationFacade.getLoginUserPk());

        if(dto.getIsrep().equals("Y")) {
            addressMapper.updIsrep(dto);
        }

        ResultVo result = new ResultVo();
        result.setResult(addressMapper.insAddr(dto));
        return result;
    }

    public ResultVo delAddr(AddressDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());

        ResultVo result = new ResultVo();
        result.setResult(addressMapper.delAddr(dto));
        return result;
    }

    public ResultVo updAddr(AddressDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());

        if(dto.getIsrep().equals("Y")) {
            addressMapper.updIsrep(dto);
        }

        ResultVo result = new ResultVo();
        result.setResult(addressMapper.updAddr(dto));
        return result;
    }
}
