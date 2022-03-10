package com.fitbook.user;

import com.fitbook.auth.AuthenticationFacade;
import com.fitbook.model.order.OrderDto;
import com.fitbook.model.user.UserEntity;
import com.fitbook.mypage.MypageService;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired private UserMapper mapper;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationFacade authenticationFacade;
    @Autowired private MypageService mypageService;
    @Autowired private PointMapper pointMapper;

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

    public String getReturnAccessToken(String code) {
        // https://hdhdeveloper.tistory.com/47
        String access_token = "";
        String refresh_token = "";
        String reqUrl = "https://kauth.kakao.com/oauth/token";
        try {
            URL url = new URL(reqUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            con.setRequestMethod("POST");
            con.setDoOutput(true);
            System.out.println("code : " + code);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(con.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=7ef8b6fe4cd24c17564a5b169caba23f");  //앱 KEY VALUE
            sb.append("&redirect_uri=http://localhost:8090/user/kakao_callback"); // 앱 CALLBACK 경로
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String br_line = "";
            String result = "";

            while((br_line = br.readLine()) != null) {
                result += br_line;
            }

            JsonParser ps = new JsonParser();
            JsonElement elem = ps.parse(result);

            access_token = elem.getAsJsonObject().get("access_token").getAsString();
            refresh_token = elem.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return access_token;
    }

    public Map<String,Object> getUserInfo(String access_token) {
        Map<String,Object> resultMap =new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            //요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + access_token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String br_line = "";
            String result = "";

            while ((br_line = br.readLine()) != null) {
                result += br_line;
            }
            System.out.println("response:" + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
//            String profile_image = properties.getAsJsonObject().get("profile_image").getAsString();
            resultMap.put("nickname", nickname);
//            resultMap.put("profile_image", profile_image);

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return resultMap;
    }

    public int insPointHistory(OrderDto dto) {
        return pointMapper.insPointHistoryByOrderDto(dto);
    }

    public int selPoint() { return mapper.selPoint(authenticationFacade.getLoginUserPk()); }
}
