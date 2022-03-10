package com.fitbook;

import com.fitbook.shop.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.filter.CharacterEncodingFilter;

import javax.servlet.Filter;
import java.nio.charset.Charset;
import java.util.Date;

@EnableTransactionManagement
@EnableScheduling
@SpringBootApplication
public class FitBookApplication {

    @Autowired private ShopService shopService;

    public static void main(String[] args) {
        SpringApplication.run(FitBookApplication.class, args);
    }

    @Scheduled(cron = "1 0 0 * * ?")
    public void updateOrder() {
        shopService.updOrderMidnight();
    }
}
