package com.fitbook.user;

import com.fitbook.ResultVo;
import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.PageDto;
import com.fitbook.model.user.UserEntity;
import com.fitbook.mypage.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired private UserMapper mapper;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationFacade authenticationFacade;
    @Autowired private MypageService mypageService;

    public int join(UserEntity entity) {
        System.out.println("upw : " + entity.getUpw());
        entity.setUpw(passwordEncoder.encode(entity.getUpw()));
        int result = 0;
        try {
            result = mapper.insUser(entity);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public UserEntity selUser(UserEntity entity) {
        return mapper.selUser(entity);
    }

    public int updUser(UserEntity entity) {
        entity.setIuser(authenticationFacade.getLoginUserPk());
        if(entity.getUpw() != null && !entity.getUpw().equals("")) {
            entity.setUpw(passwordEncoder.encode(entity.getUpw()));
        }
        return mapper.updUser(entity);
    }

    public int delUser(UserEntity entity) {
        int result = 0;
        if(mypageService.confirmPassword(entity.getUpw())) {
            entity.setIuser(authenticationFacade.getLoginUserPk());
            entity.setUid(authenticationFacade.getLoginUser().getUid());
            result = mapper.delUser(entity);
        }
        return result;
    }
}
