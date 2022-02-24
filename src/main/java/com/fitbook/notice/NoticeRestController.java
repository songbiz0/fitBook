package com.fitbook.notice;

import com.fitbook.ResultVo;
import com.fitbook.model.notice.NoticeDto;
import com.fitbook.model.notice.NoticeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ajax/notice")
public class NoticeRestController {
    @Autowired NoticeService service;

    @GetMapping("/list")
    public List<NoticeVo> selNoticeList(NoticeDto dto) {
        System.out.println(dto);
        return service.selNoticeList(dto);
    }
    @GetMapping("/maxPage")
    public ResultVo noticeMaxPage(NoticeDto dto) {
        return service.noticeMaxPage(dto);
    }
    @DeleteMapping("/del")
    public int delNotice(NoticeDto dto) {
        return service.delNotice(dto);
    }
}
