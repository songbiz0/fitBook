package com.fitbook.notice;

import com.fitbook.ResultVo;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.notice.NoticeDto;
import com.fitbook.model.notice.NoticeEntity;
import com.fitbook.model.notice.NoticeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {
    @Autowired private NoticeMapper mapper;
    @Autowired private AuthenticationFacade authenticationFacade;

    int insNotice(NoticeEntity entity) {
        entity.setIuser(authenticationFacade.getLoginUserPk());
        String plainTitle = entity.getTitle();
        String title =  plainTitle.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        entity.setTitle(title);
        return mapper.insNotice(entity);
    }

    public NoticeVo selNotice(NoticeDto dto) {
        favNotice(dto);
        return mapper.selNotice(dto);
    }

    public List<NoticeVo> selNoticeList(NoticeDto dto) {
        if("".equals(dto.getSearch()) || dto.getSearch() == null) {
            dto.setSearch("");
        }
        return mapper.selNoticeList(dto);
    }
    public ResultVo noticeMaxPage(NoticeDto dto) {
        if("".equals(dto.getSearch()) || dto.getSearch() == null) {
            dto.setSearch(dto.getSearch().trim());
        }
        return mapper.noticeMaxPage(dto);
    }
    public int favNotice(NoticeDto dto) {
        return mapper.favNotice(dto);
    }
    public int updNotice(NoticeEntity entity) {
        entity.setIuser(authenticationFacade.getLoginUserPk());
        return mapper.updNotice(entity);
    }
    public int delNotice(NoticeDto dto) {
        dto.setIuser(authenticationFacade.getLoginUserPk());
        return mapper.delNotice(dto);
    }
}
