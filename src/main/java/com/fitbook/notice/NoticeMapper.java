package com.fitbook.notice;

import com.fitbook.ResultVo;
import com.fitbook.model.notice.NoticeDto;
import com.fitbook.model.notice.NoticeVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {

    List<NoticeVo> selNoticeList(NoticeDto dto);
    ResultVo noticeMaxPage(NoticeDto dto);
}
