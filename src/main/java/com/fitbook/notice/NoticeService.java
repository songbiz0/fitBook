package com.fitbook.notice;

import com.fitbook.ResultVo;
import com.fitbook.model.notice.NoticeDto;
import com.fitbook.model.notice.NoticeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {
    @Autowired private NoticeMapper mapper;

    public List<NoticeVo> selNoticeList(NoticeDto dto) {
        if("".equals(dto.getSearch()) || dto.getSearch() == null) {
            dto.setSearch(dto.getSearch().trim());
        }
        return mapper.selNoticeList(dto);
    }
    public ResultVo noticeMaxPage(NoticeDto dto) {
        if("".equals(dto.getSearch()) || dto.getSearch() == null) {
            dto.setSearch(dto.getSearch().trim());
        }
        return mapper.noticeMaxPage(dto);
    }
}
