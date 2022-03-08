package com.fitbook.shop;

import com.fitbook.ResultVo;
import com.fitbook.model.PageDto;
import com.fitbook.model.address.AddressDto;
import com.fitbook.model.address.AddressEntity;
import com.fitbook.model.product.ProductDetailDto;
import com.fitbook.model.product.ProductDetailVo;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.productReview.ProductReviewEntity;
import com.fitbook.model.productReview.ProductReviewVo;
import com.fitbook.model.productquestion.ProductQuestionEntity;
import com.fitbook.model.productquestion.ProductQuestionVo;
import com.fitbook.mypage.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shop/api")
public class ShopRestController {

    @Autowired private MypageService mypageService;
    @Autowired private ShopService service;

    @GetMapping("/inscart")
    public ResultVo instCart(@RequestParam int idetail) {
        return mypageService.insCartByIdetail(idetail);
    }

    @PostMapping("/reviewmaxpage")
    public ResultVo reviewMaxPage(@RequestParam int iproduct, @RequestBody PageDto dto) {
        return service.selReviewMaxPage(iproduct, dto);
    }

    @PostMapping("/reviewlist")
    public List<ProductReviewVo> reviewList(@RequestParam int iproduct, @RequestBody PageDto dto) {
        return service.selReviewList(iproduct, dto);
    }

    @PostMapping("/review")
    public ResultVo insReview(@RequestBody ProductReviewEntity entity) {
        return service.insReview(entity);
    }

    @DeleteMapping("/review")
    public ResultVo delReview(@RequestParam int iproduct) {
        PageDto dto = new PageDto();
        dto.setIproduct(iproduct);
        return service.delReview(dto);
    }

    @GetMapping("/selordercount")
    public ResultVo selOrderCount(@RequestParam int iproduct) {
        PageDto dto = new PageDto();
        dto.setIproduct(iproduct);
        return service.selOrderCount(dto);
    }

    @PostMapping("/questionmaxpage")
    public ResultVo selQuestionMaxPage(@RequestBody PageDto dto) {
        return service.selQuestionMaxPage(dto);
    }

    @PostMapping("/questionlist")
    public List<ProductQuestionVo> selQuestionList(@RequestBody PageDto dto) {
        return service.selQuestionList(dto);
    }

    @PostMapping("/question")
    public ResultVo insQuestion(@RequestBody ProductQuestionEntity entity) {
        return service.insQuestion(entity);
    }

    @DeleteMapping("/question")
    public ResultVo delQuestion(@RequestParam int iproduct, @RequestParam int iquestion) {
        PageDto dto = new PageDto();
        dto.setIproduct(iproduct);
        dto.setIquestion(iquestion);
        return service.delQuestion(dto);
    }

    @PutMapping("/question")
    public ResultVo updQuestion(@RequestBody ProductQuestionEntity entity) {
        return service.updQuestion(entity);
    }

    @GetMapping("/selprice")
    public ProductVo selPrice(@RequestParam int idetail) { return service.selPrice(idetail); }

    @GetMapping("selcart")
    public List<ProductDetailVo> selCart() { return service.selCartList(); }

    @GetMapping("/updcart")
    public ResultVo updCart(ProductDetailDto dto) {
        return service.updCart(dto);
    }

    @PostMapping("/delcart")
    public ResultVo delCart(@RequestBody List<Integer> list) {
        for(int a : list) {
            System.out.println(a);
        }
        return service.delCart(list);
    }

    @GetMapping("/seladdr")
    public AddressEntity selAddr(AddressDto dto) {
        return service.selAddr(dto);
    }

    @GetMapping("/seladdrlist")
    public List<AddressEntity> selAddrList() {
        return mypageService.selAddrList();
    }
}
