package com.fitbook.fit;

import com.fitbook.ResultVo;
import com.fitbook.model.product.ProductDto;
import com.fitbook.model.product.ProductVo;
import com.fitbook.model.program.ProgramEntity;
import com.fitbook.model.question.QuestionDto;
import com.fitbook.model.question.QuestionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/fit/api")
public class FitRestController {

    @Autowired FitService service;

    @GetMapping("/programlist")
    public List<ProgramEntity> getProgramlist() {
        return service.selProgramList();
    }

    @GetMapping("/question")
    public QuestionDto selQuestion() {
        QuestionDto dto = service.selQuestion();
        if(dto == null) {
            dto = new QuestionDto();
            dto.setNotAnswered("not");
        }
        return dto;
    }

    @PostMapping("/question")
    public ResultVo insQuestion(@RequestBody QuestionDto dto) {
        return service.insQuestion(dto);
    }

    @DeleteMapping("/question")
    public ResultVo delQuestion() { return service.delQuestion(); }

    @PostMapping("/topfour")
    public List<ProductVo> topFour(@RequestBody QuestionDto dto) {
        dto = service.calRequiredPerformance(dto);
        List<ProductVo> list = service.selProductList();
        for(ProductVo vo : list) {
            vo.setFitness(service.calFitness(dto, vo));
        }
        list.sort((o1, o2) -> o2.getFitness() - o1.getFitness());
        return list.subList(0, 4);
    }

    @GetMapping("/selfavorite")
    public ResultVo selFavorite(@RequestParam int iproduct) {
        ProductDto dto = new ProductDto();
        dto.setIproduct(iproduct);
        return service.selFavorite(dto);
    }

    @GetMapping("/selrating")
    public ResultVo selRating(@RequestParam int iproduct) {
        ProductDto dto = new ProductDto();
        dto.setIproduct(iproduct);
        return service.selRating(dto);
    }

    @GetMapping("/isfavorite")
    public ResultVo isFavorite(@RequestParam int iproduct) {
        ProductDto dto = new ProductDto();
        dto.setIproduct(iproduct);
        return service.isFavorite(dto);
    }

    @GetMapping("/israting")
    public ResultVo isRating(@RequestParam int iproduct) {
        ProductDto dto = new ProductDto();
        dto.setIproduct(iproduct);
        return service.isRating(dto);
    }

    @GetMapping("/clickfavorite")
    public ResultVo clickFavorite(@RequestParam int iproduct) {
        ProductDto dto = new ProductDto();
        dto.setIproduct(iproduct);
        return service.clickFavorite(dto);
    }
}
