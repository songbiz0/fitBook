package com.fitbook.shop;

import com.fitbook.ResultVo;
import com.fitbook.address.AddressMapper;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.fit.FitService;
import com.fitbook.model.PageDto;
import com.fitbook.model.address.AddressDto;
import com.fitbook.model.address.AddressEntity;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.point.PointEntity;
import com.fitbook.model.product.*;
import com.fitbook.model.productReview.ProductReviewEntity;
import com.fitbook.model.productReview.ProductReviewVo;
import com.fitbook.model.productquestion.ProductQuestionEntity;
import com.fitbook.model.productquestion.ProductQuestionVo;
import com.fitbook.order.OrderMapper;
import com.fitbook.user.PointMapper;
import com.fitbook.user.UserMapper;
import com.fitbook.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShopService {

    @Autowired
    private ShopMapper mapper;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private PointMapper pointMapper;
    @Autowired
    private FitService fitService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationFacade authenticationFacade;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    AddressMapper addressMapper;

    public int selMaxPage(PageDto dto) {
        int maxPage = mapper.selMaxPage(dto);
        maxPage = Math.max(1, maxPage);
        return maxPage;
    }

    public ProductVo selProductDetail(int iproduct) {
        ProductVo vo = mapper.selProductDetail(iproduct);

        vo.setColorList(mapper.selColorList(iproduct));
        List<OptionDto> optionList = mapper.selOptionList(iproduct);
        for (OptionDto dto : optionList) {
            StringBuilder sb = new StringBuilder();
            int hdd = dto.getHdd();
            int ssd = dto.getSsd();
            if (0 < hdd && hdd < 1024) {
                sb.append("HDD ").append(hdd).append("GB");
                if (0 < ssd && ssd < 1024) {
                    sb.append(" / SSD ").append(ssd).append("GB");
                } else if (ssd >= 1024) {
                    sb.append(" / SSD ").append(ssd / 1024).append("TB");
                }
            } else if (hdd >= 1024) {
                sb.append("HDD ").append(hdd / 1024).append("TB");
                if (0 < ssd && ssd < 1024) {
                    sb.append(" / SSD ").append(ssd).append("GB");
                } else if (ssd >= 1024) {
                    sb.append(" / SSD ").append(ssd / 1024).append("TB");
                }
            } else if (0 < ssd && ssd < 1024) {
                sb.append("SSD ").append(dto.getSsd()).append("GB");
            } else if (ssd >= 1024) {
                sb.append("SSD ").append(ssd / 1024).append("TB");
            }
            dto.setOption(sb.toString());
        }
        vo.setOptionList(optionList);

        if (fitService.selQuestion() == null) {
            vo.setFitness(-1);
        } else {
            vo.setFitness(fitService.calFitness(fitService.selQuestion(), vo));
        }

        return vo;
    }

    public ResultVo selReviewMaxPage(int iproduct, PageDto dto) {
        dto.setIproduct(iproduct);
        return mapper.selReviewMaxPage(dto);
    }

    public List<ProductReviewVo> selReviewList(int iproduct, PageDto dto) {
        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if (startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);
        dto.setIproduct(iproduct);

        return mapper.selReviewList(dto);
    }

    public ResultVo insReview(ProductReviewEntity entity) {
        ResultVo result = new ResultVo();

        // 별점 체크하지 않은 경우 예외처리
        if (entity.getRating() < 1) {
            result.setResult(0);
            return result;
        }

        // 구매확정 회원이 아닌 경우 예외처리
        PageDto dto = new PageDto();
        dto.setIuser(authenticationFacade.getLoginUserPk());
        dto.setIproduct(entity.getIproduct());
        if (mapper.selOrderCount(dto).getResult() < 1) {
            result.setResult(0);
            return result;
        }

        entity.setIuser(authenticationFacade.getLoginUserPk());
        result.setResult(mapper.insReview(entity));
        return result;
    }

    public ResultVo delReview(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        result.setResult(mapper.delReview(dto));
        return result;
    }

    public ResultVo selOrderCount(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUser() == null ? -1 : authenticationFacade.getLoginUserPk());
        return mapper.selOrderCount(dto);
    }

    public ResultVo selQuestionMaxPage(PageDto dto) {
        return mapper.selQuestionMaxPage(dto);
    }

    public List<ProductQuestionVo> selQuestionList(PageDto dto) {
        int startIdx = (dto.getCurrentPage() - 1) * dto.getRecordCount();
        if (startIdx < 0) {
            startIdx = 0;
        }
        dto.setStartIdx(startIdx);

        List<ProductQuestionVo> questionList = mapper.selQuestionList(dto);
        for (ProductQuestionVo vo : questionList) {
            dto.setParent(vo.getIquestion());
            List<ProductQuestionVo> questionReplyList = mapper.selQuestionList(dto);
            vo.setReplyList(questionReplyList);
        }

        return questionList;
    }

    public ResultVo insQuestion(ProductQuestionEntity entity) {
        ResultVo result = new ResultVo();
        entity.setIuser(authenticationFacade.getLoginUserPk());
        result.setResult(mapper.insQuestion(entity));
        return result;
    }

    public ResultVo delQuestion(PageDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        result.setResult(mapper.delQuestion(dto));
        if(result.getResult() > 0) {
            mapper.delQuestionByParent(dto);
        }
        return result;
    }

    public ResultVo updQuestion(ProductQuestionEntity entity) {
        ResultVo result = new ResultVo();
        entity.setIuser(authenticationFacade.getLoginUserPk());
        result.setResult(mapper.updQuestion(entity));
        return result;
    }

    public List<ProductVo> selProductList(PageDto dto) {
        return mapper.selProductList(dto);
    }

    public ProductVo selPrice(int idetail) {
        return mapper.selPrice(idetail);
    }

    public ListDto selList() {
        ListDto dto = new ListDto();
        dto.setBrandList(mapper.selBrandList());
        dto.setIntelCpuList(mapper.selCpuList("Intel"));
        dto.setAmdCpuList(mapper.selCpuList("AMD"));
        dto.setNvidiaGpuList(mapper.selGpuList("NVIDIA"));
        dto.setAmdGpuList(mapper.selGpuList("AMD"));
        return dto;
    }

    public List<String> fromJSON(List<String> list) {
        for (int i = 0; i < list.size(); i++) {
            list.set(i, list.get(i).replace("\"", "").replace("[", "").replace("]", ""));
        }
        return list;
    }

    public List<ProductDetailVo> selCartList() {
        List<ProductDetailVo> list = mapper.selCartList(authenticationFacade.getLoginUserPk());
        for (ProductDetailVo vo : list) {
            vo.setDiscount(vo.getOriginalPrice() - vo.getPrice());
            vo.setAccumulate((int) Math.round(vo.getPrice() * 0.001));
            vo.setStock(Math.min(vo.getStock(), 9));

            StringBuilder sb = new StringBuilder();
            sb.append(vo.getColor());
            int hdd = vo.getHdd();
            int ssd = vo.getSsd();
            if (0 < hdd && hdd < 1024) {
                sb.append(" / HDD ").append(hdd).append("GB");
            } else if (hdd >= 1024) {
                sb.append(" / HDD ").append(hdd / 1024).append("TB");
            }
            if (0 < ssd && ssd < 1024) {
                sb.append(" / SSD ").append(ssd).append("GB");
            } else if (ssd >= 1024) {
                sb.append(" / SSD ").append(ssd / 1024).append("TB");
            }
            vo.setOption(sb.toString());
        }
        return list;
    }

    public List<ProductDetailVo> selOrderCartList(List<String> list) {
        List<ProductDetailVo> productList = selCartList();
        List<ProductDetailVo> result = new ArrayList<>();
        for (ProductDetailVo vo : productList) {
            for (String idetail : list) {
                if (vo.getIdetail() == Integer.parseInt(idetail)) {
                    result.add(vo);
                }
            }
        }
        return result;
    }

    public ResultVo updCart(ProductDetailDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        ResultVo result = new ResultVo();
        result.setResult(mapper.updCart(dto));
        return result;
    }

    public ResultVo delCart(List<Integer> list) {
        ResultVo result = new ResultVo();
        result.setResult(mapper.delCart(list, authenticationFacade.getLoginUserPk()));
        return result;
    }

    public AddressEntity selAddr(AddressDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        return addressMapper.selAddr(dto);
    }

    public void updOrderMidnight() {
        orderMapper.updOrderMidnight();
        List<PointEntity> list = orderMapper.selOrderMidnight();
        int result = 0;
        if(list.size() != 0) {
            result = pointMapper.insPointHisotryMidnight(list);
            for(PointEntity entity : list) {
                userMapper.updPoint(entity);
            }
        }
        System.out.println("배송 완료 후 2주가 지난 주문이 " + list.size() + "건 구매 확정, " + result + "건에 대해 포인트 지급이 완료되었습니다.");
    }

    @Transactional(rollbackFor = Exception.class)
    public void order(OrderDto dto) {
        Integer isOutOfStock = mapper.selIsOutOfStock(dto.getIdetailList());
        if(isOutOfStock != null) {
            throw new RuntimeException("재고 없는 상품 주문");
        }

        int iuser = authenticationFacade.getLoginUserPk();
        dto.setIuser(iuser);
        dto.setIdetailList(fromJSON(dto.getIdetailList()));

        dto.setPayment_way("무통장입금");

        dto.setOrder_status("입금대기");
        mapper.insOrder(dto);
        if (dto.getResult_price() == 0) {
            dto.setOrder_status("결제완료");
            mapper.updOrder(dto);
        }
        System.out.println(dto);
        mapper.insDetailOrder(dto);
        mapper.insOrderProduct(dto);
        mapper.delCart(dto.getIdetailList().stream().map(Integer::parseInt).collect(Collectors.toList()), iuser);
        userMapper.updPointByOrderDto(dto);
        if(dto.getSpent_point() != 0) {
            dto.setReason("상품 구매로 포인트 사용");
            dto.setSpent_point(dto.getSpent_point() * -1);
            userService.insPointHistory(dto);
        }

        AddressDto addressDto = new AddressDto();
        addressDto.setIuser(iuser);
        addressDto.setParam("latest");
        AddressEntity addressEntity = addressMapper.selAddr(addressDto);

        addressDto.setPost(dto.getReceiver_post());
        addressDto.setAddr(dto.getReceiver_addr());
        addressDto.setAddr_detail(dto.getReceiver_addr_detail());
        addressDto.setPhone(dto.getReceiver_phone());
        addressDto.setAddr_nm("");
        addressDto.setUser_nm(dto.getReceiver_nm());
        addressDto.setIsrep("N");
        addressDto.setIslatest("Y");

        if(addressEntity == null) {
            addressMapper.insAddr(addressDto);
        } else {
            addressDto.setIaddress(addressEntity.getIaddress());
            addressMapper.updAddr(addressDto);
        }
    }
}
