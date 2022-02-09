package com.fitbook.user;

import com.fitbook.model.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired private UserMapper mapper;
    @Autowired private PasswordEncoder passwordEncoder;

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
}