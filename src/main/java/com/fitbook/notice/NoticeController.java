package com.fitbook.notice;

import com.fitbook.Const;
import com.fitbook.model.notice.NoticeDto;
import com.fitbook.model.notice.NoticeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeController {

    @Autowired private NoticeService service;

    @GetMapping("/list")
    public String noticeList() {

        return "notice/notice";
    }

    @GetMapping("/writenotice")
    public String insNotice() {
        return "notice/writenotice";
    }
    @GetMapping("/detail")
    public String detailNotice(Model model, NoticeDto dto) {
        model.addAttribute("data", service.selNotice(dto));
        return "notice/noticeDetail";
    }
    @PostMapping("/writenotice")
    public String insNoticeProc(NoticeEntity entity) {
        service.insNotice(entity);
        return "redirect:/notice/list";
    }
    @GetMapping("/modify")
    public String modNotice(@RequestParam int inotice, Model model) {
        NoticeDto dto = new NoticeDto();
        dto.setInotice(inotice);
        model.addAttribute(Const.DATA, service.selNotice(dto));
        return "notice/modnotice";
    }
    @PostMapping("/modify")
    public String modNoticeProc(NoticeEntity entity) {
        service.updNotice(entity);
        return "redirect:/notice/detail?inotice=" + entity.getInotice();
    }
}
