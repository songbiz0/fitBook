package com.fitbook.email;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public String mailCheck(String email){
        Random random = new Random(); //난수 생성
        String key=""; // 인증번호

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);

        for(int i=0; i<6; i++) {
            String ran = String.valueOf(random.nextInt(10));
            key += ran;
        }
        message.setSubject("fitBook 회원가입 인증번호는 " + key + "입니다.");
        message.setText("fitBook 회원가입 인증번호는 " + key + "입니다.");

        javaMailSender.send(message);
        return key;
    }

    public String findPw(String email) {
        Random random = new Random(); //난수 생성
        String key=""; // 인증번호

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);

        for(int i=0; i<8; i++) {
            boolean bool = random.nextBoolean();
            String ran = null;
            if(bool) {
                ran = String.valueOf(random.nextInt(10));
            } else {
                char ch = (char)((int)(Math.random()*26)+97);
                ran = String.valueOf(ch);
            }
            key += ran;
        }
        message.setSubject("fitBook 임시 비밀번호는 " + key + "입니다.");
        message.setText("fitBook 임시 비밀번호는 " + key + "입니다.");

        javaMailSender.send(message);
        return key;
    }
}