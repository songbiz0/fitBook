package com.fitbook.admin;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.util.UUID;

@Configuration
public class Utils {

    @Value("${spring.servlet.multipart.location}")
    private String path;

    public String phoneRegex(String number) {
        if(number.length() == 0) {
            return "";
        }
        if(number.length() == 8) {
            return number.replaceAll("^(\\d{4})(\\d{4})$", "$1-$2");
        } else {
            return number.replaceAll("(\\d{2,3})(\\d{3,4})(\\d{4})", "$1-$2-$3");
        }
    }

    public String getDate(String type) {
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

    public void delFile(String type, String code) {
        String projectPath = path + "/" + type +"/" + code + "/"; // + 상픔코드
        File file = new File(projectPath);
        if(file.exists()) {
            if(file.isDirectory()) {
                File[] list = file.listFiles();
                for(int i=0; i<list.length; i++) {
                    if(list[i].delete()) {
                        System.out.println("delFile - 삭제성공");
                    } else {
                        System.out.println("delFile - 삭제실패");
                    }
                }
            }
            file.delete();
        }
    }

    public String getExt(String fileNm) {
        int lastIdx = fileNm.lastIndexOf(".");
        return fileNm.substring(lastIdx);
    }

    public String uploadFileUUID(MultipartFile file, String uuid, String type, String code) throws Exception {
        String outPath = path + "/" + type + "/" + code + "/";
        File folder = new File(outPath);
        if(!folder.exists()) {
            folder.mkdirs();
        }

        File saveFile = new File(outPath, uuid);
        file.transferTo(saveFile);

        return uuid;
    }

    // 수정할때 쓰는 업로드 메소드
    public String uploadFile(MultipartFile file, String type, String code) throws Exception {
        String outPath = path + "/" + type + "/" + code + "/";
        File folder = new File(outPath);

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

        String extVal = getExt(file.getOriginalFilename());

        UUID uuid = UUID.randomUUID();
        String fileNm = uuid + extVal;

        File saveFile = new File(outPath, fileNm);
        file.transferTo(saveFile);

        return fileNm;
    }

    public String productImgUpdate(MultipartFile mf, String type, String code) throws Exception {
        // type => master 인지 detail 인지
        String projectPath =  System.getProperty("user.dir") + "\\src\\main\\resources\\static\\images\\products\\" + type + "\\" + code + "\\"; // + 상픔코드
        File file = new File(projectPath);
        //TODO pk 값으로 조회해서 같은 폴더에 있는 이미지 삭제 후 다시 삽입
        if(!file.exists()) {
            return null;
        }
        return null;
    }

    public int getPageNum(String page) {
        int result;
        try {
            result = Integer.parseInt(page);
        } catch (Exception e) {
            e.printStackTrace();
            result = 1;
        }
        return result;
    }
}
