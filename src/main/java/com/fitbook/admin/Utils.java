package com.fitbook.admin;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.util.UUID;

public class Utils {
    public static String getDate(String type) {
        LocalDate now = LocalDate.now();
        String date = now.toString();
        date = date.replace("-", "");
        String month = date.substring(4,6);
        String year = date.substring(0,4);
        String result = "";
        if("year".equals(type)) {
            result = (Integer.parseInt(year) - 1) + month + "01";
        } else if ("month".equals(type)) {
            if((Integer.parseInt(month) - 1) < 10) {

                if((Integer.parseInt(month) - 1) == 0) {
                    // 12월 일 경우
                    month = "12";
                    year = String.valueOf(Integer.parseInt(year) - 1);
                } else {
                    // 12월이 아니고 10보다 작을 경우
                    month = "0" + (Integer.parseInt(month) - 1);
                }
                result = year + month + "31";
            } else {
                result = year + (Integer.parseInt(month) - 1) + "31";
            }
        } else if("day".equals(type)) {
            result = year + month + "01";
        }
        return result;
    }

    public static String uploadFile(MultipartFile file, String uuid, String type, String code) throws Exception {
        String projectPath =  System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images\\" + type +"\\" + code + "\\"; // + 상픔코드
        File folder = new File(projectPath);
        if(!folder.exists()) {
            folder.mkdirs();
        }

        File saveFile = new File(projectPath, uuid);
        file.transferTo(saveFile);

        return uuid;
    }

    // 수정할때 쓰는 업로드 메소드
    public static String uploadFile(MultipartFile file, String type, String code) throws Exception {
        String projectPath =  System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images\\" + type +"\\" + code + "\\"; // + 상픔코드
        File folder = new File(projectPath);

        if(folder.exists()) {
            if(folder.isDirectory()) {
                File[] files = folder.listFiles();
                for(int i=0; i< files.length; i++) {
                    if(files[i].delete()) {
                        System.out.println("삭제성공");
                    } else {
                        System.out.println("삭제실패");
                    }
                }
            }
        } else {
            folder.mkdirs();
        }

        UUID uuid = UUID.randomUUID();
        String fileNm = uuid + "_" + file.getOriginalFilename();

        File saveFile = new File(projectPath, fileNm);
        file.transferTo(saveFile);

        return fileNm;
    }

    public static String productImgUpdate(MultipartFile mf, String type, String code) throws Exception {
        // type => master 인지 detail 인지
        String projectPath =  System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images\\products\\" + type + "\\" + code + "\\"; // + 상픔코드
        File file = new File(projectPath);
        //TODO pk 값으로 조회해서 같은 폴더에 있는 이미지 삭제 후 다시 삽입
        if(!file.exists()) {
            return null;
        }
        return null;
    }
}
